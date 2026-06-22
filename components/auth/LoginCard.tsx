'use client'

import { useState } from 'react'
import { GuestLoginForm } from '@/components/auth/GuestLoginForm'
import { ProLoginForm } from '@/components/auth/ProLoginForm'

type Tab = 'guest' | 'pro'

export function LoginCard() {
  const [tab, setTab] = useState<Tab>('guest')

  return (
    <div
      className="rounded-2xl p-7"
      style={{
        background: '#0F1E35',
        border: '1px solid rgba(34,211,238,0.18)',
        boxShadow: '0 0 60px rgba(34,211,238,0.06)',
      }}
    >
      {/* Tab switcher */}
      <div
        className="flex rounded-xl overflow-hidden mb-6 text-xs font-mono"
        style={{ border: '1px solid rgba(34,211,238,0.18)' }}
      >
        {(['guest', 'pro'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 transition-all duration-200 ${
              tab === t
                ? 'bg-cyber-cyan text-cyber-bg font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'guest' ? '// GUEST_ACCESS' : '// PRO_ACCESS'}
          </button>
        ))}
      </div>

      {/* Tab description */}
      <p className="text-gray-500 text-xs font-mono mb-5">
        {tab === 'guest'
          ? '> Free foundation modules — no account needed'
          : '> Full professional curriculum — email + password required'}
      </p>

      {tab === 'guest' ? <GuestLoginForm /> : <ProLoginForm />}
    </div>
  )
}
