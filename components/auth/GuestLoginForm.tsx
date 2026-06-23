'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function GuestLoginForm() {
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!displayName.trim()) {
      setError('Please enter your display name')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/guest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: displayName.trim() }),
    })

    if (res.ok) {
      router.push('/free-cohort')
    } else {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-cyber-cyan mb-1.5 uppercase tracking-wider">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="e.g. Chukwuma_Dev"
          maxLength={50}
          className="w-full bg-black/30 border border-cyber-cyan/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 font-mono text-sm transition-all"
          autoComplete="username"
        />
        {error && <p className="text-red-400 text-xs mt-1.5 font-mono">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-sm text-cyber-bg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
          boxShadow: '0 0 20px rgba(34,211,238,0.25)',
        }}
      >
        {loading ? 'Entering...' : 'Enter Free Cohort →'}
      </button>
      <p className="text-gray-500 text-xs text-center font-mono">
        No account required. Free access to foundation modules.
      </p>
    </form>
  )
}
