import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateRoom, createMeetingToken } from '@/lib/daily'
import { VideoPlayer } from '@/components/live/VideoPlayer'
import { SlideViewer } from '@/components/live/SlideViewer'
import { LiveBadge } from '@/components/live/LiveBadge'
import { QuizOverlay } from '@/components/quiz/QuizOverlay'
import type { LectureSession } from '@/lib/types/lecture'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pro — Live Session' }

export default async function PaidProfessionalLivePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: session } = await supabase
    .from('lecture_sessions')
    .select('*')
    .eq('channel', 'paid')
    .single()

  const lectureSession = session as LectureSession | null

  if (!lectureSession?.is_live) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-gray-500 text-xs mb-4 tracking-widest uppercase">
          {'// session_offline'}
        </p>
        <h1 className="font-heading text-2xl font-bold text-white mb-3">
          No Live Session Right Now
        </h1>
        <p className="text-gray-400 text-sm mb-6 max-w-md">
          The facilitator has not started a broadcast yet. Your cohort schedule will notify you.
        </p>
        {lectureSession?.youtube_replay_url && (
          <a
            href={lectureSession.youtube_replay_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl font-mono text-sm font-semibold"
            style={{ background: 'rgba(34,211,238,0.15)', color: '#22D3EE' }}
          >
            Watch Replay →
          </a>
        )}
      </div>
    )
  }

  let roomUrl = lectureSession.daily_room_url ?? ''
  let token = ''

  try {
    const room = await getOrCreateRoom('metabridge-paid-professional', true)
    roomUrl = room.url
    token = await createMeetingToken('metabridge-paid-professional', false)
  } catch {
    // Daily.co not configured — show slide-only view
  }

  return (
    <div>
      {/* Layout breakout to fill viewport width */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-10">
        {roomUrl && token ? (
          <VideoPlayer roomUrl={roomUrl} token={token} />
        ) : (
          <div
            className="flex items-center justify-center"
            style={{ height: '85vh', background: '#0A0E1A' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">📡</div>
              <p className="text-gray-400 font-mono text-sm">
                Video not configured — slides syncing live
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slide viewer */}
      <div className="py-6">
        <div className="flex items-center gap-3 mb-4">
          <LiveBadge />
          <p className="text-gray-500 font-mono text-xs">Pro Session — Live Slides</p>
        </div>
        <SlideViewer initialSession={lectureSession} />
      </div>

      <QuizOverlay channel="paid" studentName={user.email ?? 'Student'} />
    </div>
  )
}
