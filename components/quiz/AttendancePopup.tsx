'use client'

import { useState } from 'react'

interface AttendancePopupProps {
  channel: string
  studentName: string
}

export function AttendancePopup({ channel, studentName }: AttendancePopupProps) {
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function markPresent() {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, studentName }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? `HTTP ${res.status}`)
      }
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div
        className="w-full max-w-sm rounded-2xl p-8 text-center"
        style={{
          background: '#0F1E35',
          border: '1px solid rgba(34,211,238,0.25)',
          boxShadow: '0 0 40px rgba(34,211,238,0.08)',
        }}
      >
        {submitted ? (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Attendance Recorded</h3>
            <p className="text-gray-400 text-sm font-mono">
              {studentName} — marked present for this session.
            </p>
          </>
        ) : (
          <>
            <p className="font-mono text-cyber-cyan text-xs mb-4 tracking-widest uppercase">
              {'// attendance_check'}
            </p>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Mark Your Attendance</h3>
            <p className="text-gray-400 text-sm mb-6">
              Confirm you were present for today&apos;s live session.
            </p>

            <div
              className="rounded-xl px-4 py-3 mb-6 text-left"
              style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.15)' }}
            >
              <p className="font-mono text-gray-500 text-xs mb-1">Name</p>
              <p className="text-white font-semibold">{studentName}</p>
            </div>

            {error && <p className="text-red-400 text-xs font-mono mb-4">{error}</p>}

            <button
              onClick={markPresent}
              disabled={busy}
              className="w-full py-3 rounded-xl font-semibold font-heading transition-all hover:-translate-y-0.5 disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
                color: '#0A0E1A',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
              }}
            >
              {busy ? 'Recording…' : 'Mark as Present ✓'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
