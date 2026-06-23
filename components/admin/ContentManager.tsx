'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Slide } from '@/lib/types/lecture'

interface ContentManagerProps {
  freeSessions: Slide[]
  paidSessions: Slide[]
}

type Channel = 'free' | 'paid'
type SlideType = 'content' | 'question' | 'assignment'

export function ContentManager({ freeSessions, paidSessions }: ContentManagerProps) {
  const [channel, setChannel] = useState<Channel>('free')
  const [slides, setSlides] = useState<Record<Channel, Slide[]>>({
    free: freeSessions,
    paid: paidSessions,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Slide>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const currentSlides = slides[channel]

  function startEdit(slide: Slide) {
    setEditingId(slide.id)
    setDraft({ title: slide.title, content: slide.content, type: slide.type, imageUrl: slide.imageUrl })
    setError('')
    setSuccess('')
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft({})
  }

  async function saveEdit(slideId: string) {
    setSaving(true)
    setError('')
    const updated = currentSlides.map((s) =>
      s.id === slideId ? { ...s, ...draft } : s
    ) as Slide[]

    try {
      const res = await fetch('/api/slides/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, slides: updated }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Save failed')
      setSlides((prev) => ({ ...prev, [channel]: updated }))
      setEditingId(null)
      setDraft({})
      setSuccess('Saved!')
      setTimeout(() => setSuccess(''), 2000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setSaving(false)
    }
  }

  async function uploadImage(slideId: string, file: File) {
    setUploading(slideId)
    setError('')
    const form = new FormData()
    form.append('file', file)
    form.append('slideId', slideId)

    try {
      const res = await fetch('/api/slides/upload', { method: 'POST', body: form })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')
      const { imageUrl } = await res.json()
      setDraft((prev) => ({ ...prev, imageUrl }))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload error')
    } finally {
      setUploading(null)
    }
  }

  function addSlide() {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      content: '',
      type: 'content',
    }
    const updated = [...currentSlides, newSlide]
    setSlides((prev) => ({ ...prev, [channel]: updated }))
    startEdit(newSlide)
  }

  async function deleteSlide(slideId: string) {
    if (!confirm('Delete this slide?')) return
    const updated = currentSlides.filter((s) => s.id !== slideId)
    setSaving(true)
    try {
      const res = await fetch('/api/slides/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, slides: updated }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Delete failed')
      setSlides((prev) => ({ ...prev, [channel]: updated }))
      if (editingId === slideId) cancelEdit()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Channel selector */}
      <div className="flex gap-2 mb-6">
        {(['free', 'paid'] as Channel[]).map((ch) => (
          <button
            key={ch}
            onClick={() => { setChannel(ch); cancelEdit() }}
            className="flex-1 py-2 rounded-xl font-mono text-sm font-semibold capitalize transition-all"
            style={{
              background: channel === ch ? 'rgba(244,137,31,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${channel === ch ? 'rgba(244,137,31,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: channel === ch ? '#F4891F' : '#6B7280',
            }}
          >
            {ch} cohort
          </button>
        ))}
      </div>

      {(error || success) && (
        <p className={`font-mono text-xs mb-4 ${error ? 'text-red-400' : 'text-green-400'}`}>
          {error || success}
        </p>
      )}

      {/* Slide list */}
      <div className="space-y-3">
        {currentSlides.map((slide, i) => (
          <div
            key={slide.id}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Slide header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: '#0F1E35' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-gray-600 text-xs w-5 flex-shrink-0">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{slide.title}</p>
                  <span
                    className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}
                  >
                    {slide.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => editingId === slide.id ? cancelEdit() : startEdit(slide)}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}
                >
                  {editingId === slide.id ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Edit form */}
            {editingId === slide.id && (
              <div className="px-4 pb-4 space-y-3" style={{ background: 'rgba(10,14,26,0.4)' }}>
                <div>
                  <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Title</label>
                  <input
                    value={draft.title ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                    style={{ background: 'rgba(15,30,53,0.8)', border: '1px solid rgba(34,211,238,0.2)' }}
                  />
                </div>

                <div>
                  <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Type</label>
                  <select
                    value={draft.type ?? 'content'}
                    onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as SlideType }))}
                    className="w-full rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none"
                    style={{ background: 'rgba(15,30,53,0.8)', border: '1px solid rgba(34,211,238,0.2)' }}
                  >
                    <option value="content">Content</option>
                    <option value="question">Question</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Content</label>
                  <textarea
                    value={draft.content ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none resize-none"
                    style={{ background: 'rgba(15,30,53,0.8)', border: '1px solid rgba(34,211,238,0.2)' }}
                  />
                </div>

                <div>
                  <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Slide Image</label>
                  {draft.imageUrl && (
                    <div className="mb-2 flex items-center gap-2">
                      <Image src={draft.imageUrl} alt="slide" width={64} height={64} className="h-16 rounded-lg object-cover" unoptimized />
                      <button
                        onClick={() => setDraft((d) => ({ ...d, imageUrl: undefined }))}
                        className="text-red-400 font-mono text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <label
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-mono text-sm cursor-pointer transition-all hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', color: '#9CA3AF' }}
                  >
                    {uploading === slide.id ? 'Uploading…' : '↑ Upload Image (PNG/JPG/PDF)'}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      disabled={uploading === slide.id}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) uploadImage(slide.id, file)
                      }}
                    />
                  </label>
                </div>

                <button
                  onClick={() => saveEdit(slide.id)}
                  disabled={saving}
                  className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-50"
                  style={{ background: 'rgba(34,211,238,0.15)', color: '#22D3EE', border: '1px solid rgba(34,211,238,0.3)' }}
                >
                  {saving ? 'Saving…' : '✓ Save Changes'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addSlide}
        className="mt-4 w-full py-3 rounded-xl font-mono text-sm transition-all hover:opacity-80"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', color: '#6B7280' }}
      >
        + Add New Slide
      </button>
    </div>
  )
}
