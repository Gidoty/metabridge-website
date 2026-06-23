'use client'

import { useEffect, useState } from 'react'

interface Module {
  title: string
  color: string
}

interface ProgressBarProps {
  type: 'guest' | 'user'
  totalModules: number
  modules: Module[]
  channel?: 'free' | 'paid'
  userId?: string
  initialCompleted?: number[]
  studentName?: string
  studentEmail?: string
}

export function ProgressBar({
  type,
  totalModules,
  modules,
  channel = 'paid',
  initialCompleted = [],
  studentName = '',
  studentEmail = '',
}: ProgressBarProps) {
  const [completed, setCompleted] = useState<number[]>(initialCompleted)
  const [showCapstone, setShowCapstone] = useState(false)
  const [driveUrl, setDriveUrl] = useState('')
  const [capstoneSubmitted, setCapstoneSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (type === 'guest') {
      try {
        const stored = localStorage.getItem('mb_free_progress')
        if (stored) setCompleted(JSON.parse(stored).completedModules ?? [])
      } catch {
        // ignore
      }
    }
  }, [type])

  const pct = Math.round((completed.length / totalModules) * 100)
  const isComplete = completed.length >= totalModules

  async function markComplete(idx: number) {
    if (completed.includes(idx)) return
    const next = [...completed, idx]
    setCompleted(next)

    if (type === 'guest') {
      localStorage.setItem('mb_free_progress', JSON.stringify({ completedModules: next }))
    } else {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, completedModules: next }),
      }).catch(() => null)
    }
  }

  async function submitCapstone() {
    if (!driveUrl.trim().startsWith('https://')) {
      setError('Please enter a valid https:// Google Drive link.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/capstone/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          studentName: studentName || 'Student',
          studentEmail: studentEmail || 'unknown@student.com',
          driveUrl: driveUrl.trim(),
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? `HTTP ${res.status}`)
      }
      setCapstoneSubmitted(true)
      setShowCapstone(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div
        className="rounded-2xl p-5 mb-8"
        style={{ background: '#0F1E35', border: '1px solid rgba(34,211,238,0.15)' }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-cyber-cyan text-xs tracking-widest uppercase mb-0.5">
              {'// module_progress'}
            </p>
            <p className="font-heading font-bold text-white text-sm">
              {isComplete ? '🎓 Course Complete!' : `${completed.length} of ${totalModules} modules done`}
            </p>
          </div>
          <span
            className="font-heading font-bold text-2xl"
            style={{ color: isComplete ? '#4ADE80' : '#22D3EE' }}
          >
            {pct}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: isComplete
                ? 'linear-gradient(90deg, #4ADE80, #22D3EE)'
                : 'linear-gradient(90deg, #22D3EE, #3B82F6)',
              boxShadow: isComplete ? '0 0 12px rgba(74,222,128,0.4)' : '0 0 12px rgba(34,211,238,0.3)',
            }}
          />
        </div>

        {/* Module checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {modules.map((mod, i) => {
            const done = completed.includes(i)
            return (
              <button
                key={i}
                onClick={() => markComplete(i)}
                disabled={done}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all hover:opacity-80 disabled:cursor-default"
                style={{
                  background: done ? `${mod.color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${done ? `${mod.color}44` : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span
                  className="text-xs font-bold flex-shrink-0"
                  style={{ color: done ? mod.color : '#4B5563' }}
                >
                  {done ? '✓' : '○'}
                </span>
                <span
                  className="font-mono text-xs truncate"
                  style={{ color: done ? mod.color : '#6B7280' }}
                >
                  {mod.title.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Capstone CTA */}
        {isComplete && !capstoneSubmitted && (
          <button
            onClick={() => setShowCapstone(true)}
            className="mt-4 w-full py-3 rounded-xl font-heading font-bold text-sm transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #4ADE80, #22D3EE)',
              color: '#0A0E1A',
              boxShadow: '0 0 20px rgba(74,222,128,0.3)',
            }}
          >
            🎓 Submit Capstone Project
          </button>
        )}

        {capstoneSubmitted && (
          <div
            className="mt-4 rounded-xl py-3 px-4 text-center"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
          >
            <p className="font-heading font-bold text-green-400 text-sm">✓ Capstone Submitted!</p>
            <p className="text-gray-400 text-xs font-mono mt-0.5">Awaiting admin review for certification.</p>
          </div>
        )}
      </div>

      {/* Capstone Modal */}
      {showCapstone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6"
            style={{ background: '#0F1E35', border: '1px solid rgba(74,222,128,0.3)' }}
          >
            <p className="font-mono text-green-400 text-xs tracking-widest uppercase mb-1">
              {'// capstone_submission'}
            </p>
            <h3 className="font-heading text-white font-bold text-xl mb-2">Submit Your Capstone</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Upload your project to Google Drive and share the link below. Make sure sharing is set to <span className="text-white">&ldquo;Anyone with the link&rdquo;</span>.
            </p>

            <div className="mb-4">
              <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-2">
                Google Drive Link
              </label>
              <input
                type="url"
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.2)' }}
              />
            </div>

            {error && <p className="text-red-400 font-mono text-xs mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowCapstone(false); setError('') }}
                className="flex-1 py-2.5 rounded-xl font-mono text-sm text-gray-400 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Cancel
              </button>
              <button
                onClick={submitCapstone}
                disabled={submitting || !driveUrl.trim()}
                className="flex-1 py-2.5 rounded-xl font-heading font-bold text-sm transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #4ADE80, #22D3EE)', color: '#0A0E1A' }}
              >
                {submitting ? 'Submitting…' : 'Submit →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
