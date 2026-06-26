'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COURSES = [
  'Cybersecurity',
  'Data Analytics',
  'AI & Prompt Engineering',
  'Blockchain & Web3',
]

export function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({ full_name: '', email: '', whatsapp: '', course: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.email || !form.whatsapp || !form.course) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/registration/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: '#0F1E35', border: '1px solid rgba(74,222,128,0.3)' }}
      >
        <div className="text-4xl mb-4">🎉</div>
        <p className="font-mono text-green-400 text-xs tracking-widest uppercase mb-2">
          {'// registration_received'}
        </p>
        <h2 className="font-heading text-white font-bold text-xl mb-3">You&apos;re on the list!</h2>
        <p className="text-gray-400 text-sm font-mono leading-relaxed">
          Your registration has been submitted. Once the admin approves it, you&apos;ll receive an email
          to set your password and access the platform.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="mt-6 font-mono text-sm text-cyber-cyan hover:text-white transition-colors"
        >
          ← Back to login
        </button>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#0F1E35', border: '1px solid rgba(34,211,238,0.15)' }}
    >
      <p className="font-mono text-cyber-cyan text-xs tracking-widest uppercase mb-1">
        {'// student_registration'}
      </p>
      <h2 className="font-heading text-white font-bold text-xl mb-6">Register for Access</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            placeholder="e.g. Chukwuemeka Eze"
            className="w-full rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
            style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.2)' }}
          />
        </div>

        <div>
          <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
            style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.2)' }}
          />
        </div>

        <div>
          <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            placeholder="e.g. 08012345678"
            className="w-full rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
            style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.2)' }}
          />
        </div>

        <div>
          <label className="font-mono text-gray-500 text-xs uppercase tracking-wider block mb-1.5">
            Course Interested In
          </label>
          <select
            value={form.course}
            onChange={(e) => update('course', e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
            style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.2)' }}
          >
            <option value="">Select a course…</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-400 font-mono text-xs">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-heading font-bold text-sm transition-all disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
            color: '#0A0E1A',
            boxShadow: '0 0 20px rgba(34,211,238,0.25)',
          }}
        >
          {loading ? 'Submitting…' : 'Submit Registration →'}
        </button>
      </form>

      <p className="text-center text-gray-600 text-xs font-mono mt-5">
        Already have an account?{' '}
        <button onClick={() => router.push('/login')} className="text-cyber-cyan hover:text-white transition-colors">
          Login here
        </button>
      </p>
    </div>
  )
}
