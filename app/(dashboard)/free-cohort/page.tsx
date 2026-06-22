import { cookies } from 'next/headers'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Cohort Dashboard',
}

const FREE_MODULES = [
  {
    title: 'Cybersecurity Foundations',
    description: 'Introduction to threat landscapes, basic network security, and safe digital practices.',
    color: '#EF4444',
  },
  {
    title: 'Data Analytics Foundations',
    description: 'Excel basics, data types, and introductory SQL — no coding experience needed.',
    color: '#22D3EE',
  },
  {
    title: 'AI & Prompt Engineering Foundations',
    description: 'What is AI, how LLMs work, and crafting effective prompts for productivity.',
    color: '#A855F7',
  },
  {
    title: 'Blockchain & Crypto Foundations',
    description: 'Distributed ledger basics, wallets, and how cryptocurrencies work.',
    color: '#F4891F',
  },
]

export default function FreeCohortPage() {
  const cookieStore = cookies()
  const guestCookie = cookieStore.get('guest_user')
  let displayName = ''
  try {
    const data = guestCookie ? JSON.parse(guestCookie.value) : null
    displayName = data?.displayName ?? ''
  } catch {
    displayName = ''
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-cyber-cyan text-xs mb-2 tracking-widest uppercase">
          {'// guest_session active'}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
          Welcome{displayName ? `, ${displayName}` : ' to Metabridge'}
        </h1>
        <p className="text-gray-400">
          You have free access to all foundation modules below.
        </p>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {FREE_MODULES.map((module) => (
          <div
            key={module.title}
            className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: '#0F1E35',
              borderColor: 'rgba(34,211,238,0.15)',
              boxShadow: '0 0 0 0 transparent',
            }}
          >
            <div
              className="w-2 h-2 rounded-full mb-4"
              style={{ background: module.color }}
            />
            <h3 className="font-semibold text-white mb-2">{module.title}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{module.description}</p>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-md"
              style={{ background: 'rgba(34,211,238,0.08)', color: '#22D3EE' }}
            >
              FREE ACCESS
            </span>
          </div>
        ))}
      </div>

      {/* Upgrade CTA */}
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #0F1E35 0%, #0A1628 100%)',
          border: '1px solid rgba(34,211,238,0.25)',
          boxShadow: '0 0 40px rgba(34,211,238,0.04)',
        }}
      >
        <p className="font-mono text-cyber-cyan text-xs mb-3 tracking-widest uppercase">
          {'// upgrade_available'}
        </p>
        <h2 className="font-heading text-2xl font-bold text-white mb-3">
          Ready for the Full Programme?
        </h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          Unlock 22-chapter professional courses, live sessions, globally-verified certificates,
          and dedicated career support.
        </p>
        <Link
          href="/courses"
          className="inline-block py-3 px-8 rounded-xl font-semibold text-sm text-cyber-bg transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
            boxShadow: '0 0 20px rgba(34,211,238,0.3)',
          }}
        >
          View Pro Courses →
        </Link>
      </div>
    </div>
  )
}
