import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FacilitatorPanel } from '@/components/facilitator/FacilitatorPanel'
import { SlideController } from '@/components/facilitator/SlideController'
import { QuizController } from '@/components/facilitator/QuizController'
import { AdminTabs } from '@/components/admin/AdminTabs'
import type { LectureSession } from '@/lib/types/lecture'
import type { QuizSession } from '@/lib/types/quiz'
import type { CapstoneSubmission } from '@/lib/types/progress'

export const metadata: Metadata = {
  title: 'Admin Panel',
}

export default async function AdminPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  if (user?.app_metadata?.role !== 'admin') redirect('/paid-professional')

  const { data: sessions } = await supabase
    .from('lecture_sessions')
    .select('*')
    .order('channel')

  const freeSession = (sessions ?? []).find((s: LectureSession) => s.channel === 'free') as LectureSession | undefined
  const paidSession = (sessions ?? []).find((s: LectureSession) => s.channel === 'paid') as LectureSession | undefined

  const { data: quizSessions } = await supabase
    .from('quiz_sessions')
    .select('*')
    .order('channel')

  const freeQuizSession = (quizSessions ?? []).find((s: QuizSession) => s.channel === 'free') as QuizSession | undefined
  const paidQuizSession = (quizSessions ?? []).find((s: QuizSession) => s.channel === 'paid') as QuizSession | undefined

  const { count: studentCount } = await supabase
    .from('attendance_logs')
    .select('student_name', { count: 'exact', head: true })

  const { count: certCount } = await supabase
    .from('capstone_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)

  const { data: capstoneSubmissions } = await supabase
    .from('capstone_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })

  const pendingCount = (capstoneSubmissions ?? []).filter((s: CapstoneSubmission) => !s.approved).length
  const isAnyLive = (sessions ?? []).some((s: LectureSession) => s.is_live)

  const freeSlides = freeSession?.slides ?? []
  const paidSlides = paidSession?.slides ?? []

  const liveControls = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <FacilitatorPanel />
      <div className="space-y-5">
        {freeSession && (
          <div>
            <p className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider">Free Cohort Slides</p>
            <SlideController session={freeSession} />
          </div>
        )}
        {paidSession && (
          <div>
            <p className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider">Pro Session Slides</p>
            <SlideController session={paidSession} />
          </div>
        )}
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {freeQuizSession && (
          <QuizController channel="free" quizSession={freeQuizSession} />
        )}
        {paidQuizSession && (
          <QuizController channel="paid" quizSession={paidQuizSession} />
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cyber-bg">
      {/* Topbar */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'rgba(244,137,31,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center font-heading font-bold text-white text-sm">
            MA
          </div>
          <span className="font-heading font-bold text-white">
            Metabridge <span className="text-orange">Admin</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/paid-professional"
            className="text-gray-400 hover:text-white text-sm font-mono transition-colors"
          >
            ← Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container-custom py-10">
        <div className="mb-10">
          <p className="font-mono text-orange text-xs mb-2 tracking-widest uppercase">
            {'// admin_panel'}
          </p>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400 text-sm font-mono">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { label: 'Total Attendances', value: studentCount ?? 0, note: 'from quiz attendance logs' },
            { label: 'Live Sessions', value: isAnyLive ? 'ACTIVE' : 'OFFLINE', note: isAnyLive ? 'session in progress' : 'no active session' },
            { label: 'Certificates Issued', value: certCount ?? 0, note: 'approved capstones' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-6 border"
              style={{
                background: '#0F1E35',
                borderColor: 'rgba(244,137,31,0.18)',
              }}
            >
              <p className="text-gray-500 text-xs font-mono mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-white text-2xl font-bold font-heading">{stat.value}</p>
              <p className="text-gray-600 text-xs font-mono mt-1">{stat.note}</p>
            </div>
          ))}
        </div>

        <AdminTabs
          pendingCount={pendingCount}
          capstoneSubmissions={(capstoneSubmissions ?? []) as CapstoneSubmission[]}
          freeSlides={freeSlides}
          paidSlides={paidSlides}
          liveControls={liveControls}
        />
      </div>
    </div>
  )
}
