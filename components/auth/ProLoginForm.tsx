'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function ProLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/paid-professional')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-cyber-cyan mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-black/30 border border-cyber-cyan/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 font-mono text-sm transition-all"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-cyber-cyan mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-black/30 border border-cyber-cyan/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 font-mono text-sm transition-all"
          autoComplete="current-password"
          required
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
        {loading ? 'Authenticating...' : 'Access Pro Dashboard →'}
      </button>
    </form>
  )
}
