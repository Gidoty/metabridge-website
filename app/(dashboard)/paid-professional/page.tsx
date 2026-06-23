import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pro Dashboard',
}

const PRO_COURSES = [
  {
    title: 'Cybersecurity Professional',
    modules: 22,
    description: 'From threat modelling to SOC operations. Prepares you for CompTIA Security+.',
    color: '#EF4444',
    badge: 'ENROLLED',
  },
  {
    title: 'Data Analytics Professional',
    modules: 20,
    description: 'Excel → SQL → Power BI pipeline, capstone project, and portfolio building.',
    color: '#22D3EE',
    badge: 'ENROLLED',
  },
  {
    title: 'AI & Prompt Engineering Pro',
    modules: 18,
    description: 'Advanced prompt frameworks, AI tool mastery, and workflow automation.',
    color: '#A855F7',
    badge: 'ENROLLED',
  },
  {
    title: 'Blockchain & Crypto Pro',
    modules: 20,
    description: 'DeFi, smart contracts, NFT fundamentals, and Web3 career pathways.',
    color: '#F4891F',
    badge: 'ENROLLED',
  },
]

export default async function PaidProfessionalPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const isAdmin = user?.app_metadata?.role === 'admin'

  const { data: session } = await supabase
    .from('lecture_sessions')
    .select('is_live')
    .eq('channel', 'paid')
    .single()
  const isLive = session?.is_live ?? false

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-cyber-cyan text-xs mb-2 tracking-widest uppercase">
          {'// pro_session active'}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
          Pro Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-gray-400 text-sm font-mono">{user.email}</p>
          {isLive && (
            <a
              href="/paid-professional/live"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded-md transition-all hover:-translate-y-0.5"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Join Live Session
            </a>
          )}
          {isAdmin && (
            <a
              href="/admin"
              className="text-xs font-mono px-2.5 py-1 rounded-md"
              style={{ background: 'rgba(244,137,31,0.15)', color: '#F4891F' }}
            >
              ADMIN PANEL →
            </a>
          )}
        </div>
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PRO_COURSES.map((course) => (
          <div
            key={course.title}
            className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: '#0F1E35',
              borderColor: 'rgba(34,211,238,0.15)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-2 h-2 rounded-full mt-1"
                style={{ background: course.color }}
              />
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: 'rgba(34,211,238,0.08)', color: '#22D3EE' }}
              >
                {course.badge}
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1">{course.title}</h3>
            <p className="text-gray-500 text-xs font-mono mb-3">{course.modules} modules</p>
            <p className="text-gray-400 text-sm leading-relaxed">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
