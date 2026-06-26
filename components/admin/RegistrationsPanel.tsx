'use client'

import { useState } from 'react'
import type { StudentRegistration } from '@/lib/types/progress'

interface RegistrationsPanelProps {
  initialRegistrations: StudentRegistration[]
}

function RegistrationCard({
  reg,
  onApprove,
  onReject,
}: {
  reg: StudentRegistration
  onApprove: (id: string, email: string) => Promise<void>
  onReject: (id: string) => Promise<void>
}) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)

  async function handleApprove() {
    setLoading('approve')
    await onApprove(reg.id, reg.email)
    setLoading(null)
  }

  async function handleReject() {
    if (!confirm(`Reject registration for ${reg.full_name}?`)) return
    setLoading('reject')
    await onReject(reg.id)
    setLoading(null)
  }

  const statusColor = reg.status === 'approved' ? '#4ADE80' : reg.status === 'rejected' ? '#EF4444' : '#F4891F'

  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: '#0F1E35', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{reg.full_name}</p>
          <p className="text-gray-400 font-mono text-xs truncate">{reg.email}</p>
        </div>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-full flex-shrink-0 capitalize"
          style={{ background: `${statusColor}22`, color: statusColor }}
        >
          {reg.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-mono">
        <div>
          <span className="text-gray-600 uppercase tracking-wider">WhatsApp</span>
          <p className="text-gray-300 mt-0.5">{reg.whatsapp}</p>
        </div>
        <div>
          <span className="text-gray-600 uppercase tracking-wider">Course</span>
          <p className="text-gray-300 mt-0.5">{reg.course}</p>
        </div>
        <div className="col-span-2">
          <span className="text-gray-600 uppercase tracking-wider">Submitted</span>
          <p className="text-gray-300 mt-0.5">
            {new Date(reg.submitted_at).toLocaleDateString('en-NG', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
      </div>

      {reg.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={!!loading}
            className="flex-1 py-2 rounded-xl font-mono text-xs font-semibold transition-all disabled:opacity-50"
            style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.3)' }}
          >
            {loading === 'approve' ? 'Sending…' : '✓ Approve & Invite'}
          </button>
          <button
            onClick={handleReject}
            disabled={!!loading}
            className="flex-1 py-2 rounded-xl font-mono text-xs font-semibold transition-all disabled:opacity-50"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            {loading === 'reject' ? 'Rejecting…' : '✗ Reject'}
          </button>
        </div>
      )}

      {reg.status === 'approved' && reg.approved_at && (
        <p className="text-green-400 font-mono text-xs">
          ✓ Approved & invite sent · {new Date(reg.approved_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
        </p>
      )}
    </div>
  )
}

export function RegistrationsPanel({ initialRegistrations }: RegistrationsPanelProps) {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(initialRegistrations)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const pending  = registrations.filter((r) => r.status === 'pending')
  const approved = registrations.filter((r) => r.status === 'approved')
  const rejected = registrations.filter((r) => r.status === 'rejected')
  const [showApproved, setShowApproved] = useState(false)
  const [showRejected, setShowRejected] = useState(false)

  async function handleApprove(id: string, email: string) {
    setError('')
    try {
      const res = await fetch('/api/registration/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Approval failed')
      setRegistrations((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: 'approved', approved_at: new Date().toISOString() } : r)
      )
      setSuccess(`✓ Invite sent to ${email}`)
      setTimeout(() => setSuccess(''), 4000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    }
  }

  async function handleReject(id: string) {
    setError('')
    try {
      const res = await fetch('/api/registration/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Rejection failed')
      setRegistrations((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: 'rejected' } : r)
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    }
  }

  return (
    <div>
      {(error || success) && (
        <p className={`font-mono text-xs mb-4 ${error ? 'text-red-400' : 'text-green-400'}`}>
          {error || success}
        </p>
      )}

      {/* Pending */}
      <div className="mb-6">
        <p className="font-mono text-orange text-xs tracking-widest uppercase mb-3">
          {'// pending'} <span className="text-gray-500">({pending.length})</span>
        </p>
        {pending.length === 0 ? (
          <p className="text-gray-600 font-mono text-sm">No pending registrations.</p>
        ) : (
          <div className="space-y-3">
            {pending.map((r) => (
              <RegistrationCard key={r.id} reg={r} onApprove={handleApprove} onReject={handleReject} />
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      {approved.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowApproved((v) => !v)}
            className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"
          >
            {'// approved'} ({approved.length}) {showApproved ? '▲' : '▼'}
          </button>
          {showApproved && (
            <div className="space-y-3">
              {approved.map((r) => (
                <RegistrationCard key={r.id} reg={r} onApprove={handleApprove} onReject={handleReject} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rejected */}
      {rejected.length > 0 && (
        <div>
          <button
            onClick={() => setShowRejected((v) => !v)}
            className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"
          >
            {'// rejected'} ({rejected.length}) {showRejected ? '▲' : '▼'}
          </button>
          {showRejected && (
            <div className="space-y-3">
              {rejected.map((r) => (
                <RegistrationCard key={r.id} reg={r} onApprove={handleApprove} onReject={handleReject} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
