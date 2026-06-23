'use client'

import { useState } from 'react'
import type { CapstoneSubmission } from '@/lib/types/progress'

interface AlertsPanelProps {
  initialSubmissions: CapstoneSubmission[]
}

export function AlertsPanel({ initialSubmissions }: AlertsPanelProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function approve(id: string) {
    setBusy(id)
    setError('')
    try {
      const res = await fetch('/api/capstone/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? `HTTP ${res.status}`)
      }
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, approved: true, approved_at: new Date().toISOString() } : s))
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(null)
    }
  }

  const pending = submissions.filter((s) => !s.approved)
  const approved = submissions.filter((s) => s.approved)

  return (
    <div className="space-y-6">
      {/* Pending */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <p className="font-mono text-orange text-xs tracking-widest uppercase">{'// pending_review'}</p>
          {pending.length > 0 && (
            <span
              className="px-2 py-0.5 rounded-full font-mono text-xs font-bold"
              style={{ background: 'rgba(244,137,31,0.2)', color: '#F4891F' }}
            >
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: '#0F1E35', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-gray-500 font-mono text-sm">✓ No pending capstone submissions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((s) => (
              <SubmissionCard key={s.id} s={s} onApprove={approve} busy={busy === s.id} />
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

      {/* Approved */}
      {approved.length > 0 && (
        <div>
          <p className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-3">{'// approved'}</p>
          <div className="space-y-2">
            {approved.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)' }}
              >
                <div>
                  <p className="text-white font-semibold text-sm">{s.student_name}</p>
                  <p className="text-gray-500 font-mono text-xs">{s.student_email}</p>
                </div>
                <span className="font-mono text-green-400 text-xs">✓ Approved</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SubmissionCard({
  s,
  onApprove,
  busy,
}: {
  s: CapstoneSubmission
  onApprove: (id: string) => void
  busy: boolean
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: '#0F1E35', border: '1px solid rgba(244,137,31,0.2)' }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-heading font-bold text-white">{s.student_name}</p>
          <p className="text-gray-400 font-mono text-xs">{s.student_email}</p>
          <p className="font-mono text-orange text-xs mt-0.5 uppercase">
            {s.channel} cohort
          </p>
        </div>
        <p className="text-gray-500 font-mono text-xs flex-shrink-0">
          {new Date(s.submitted_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
        </p>
      </div>

      <a
        href={s.drive_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-xs mb-4 hover:opacity-80 transition-opacity"
        style={{ color: '#22D3EE' }}
      >
        📄 View Project →
      </a>

      <button
        onClick={() => onApprove(s.id)}
        disabled={busy}
        className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-50"
        style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.3)' }}
      >
        {busy ? 'Approving…' : '✓ Approve for Certification'}
      </button>
    </div>
  )
}
