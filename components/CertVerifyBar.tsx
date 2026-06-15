'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function CertVerifyBar() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = code.trim()
    if (trimmed) {
      router.push(`/verify/${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter certificate code"
        className="flex-1 px-5 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange backdrop-blur-sm"
        required
      />
      <button
        type="submit"
        className="bg-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange/90 transition-colors whitespace-nowrap"
      >
        Verify Now
      </button>
    </form>
  )
}
