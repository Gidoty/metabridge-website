import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { startRtmpStreaming, stopRtmpStreaming } from '@/lib/daily'

const ROOM_NAMES: Record<string, string> = {
  free: 'metabridge-free-cohort',
  paid: 'metabridge-paid-professional',
}

const RTMP_BASE = 'rtmp://a.rtmp.youtube.com/live2/'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel, action, rtmpKey, youtubeReplayUrl } = await request.json() as {
    channel: string
    action: 'start' | 'stop'
    rtmpKey?: string
    youtubeReplayUrl?: string
  }
  const roomName = ROOM_NAMES[channel]
  if (!roomName) return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })

  try {
    if (action === 'start') {
      if (!rtmpKey) return NextResponse.json({ error: 'rtmpKey required' }, { status: 400 })
      await startRtmpStreaming(roomName, `${RTMP_BASE}${rtmpKey}`)
      await supabase
        .from('lecture_sessions')
        .update({ streaming_active: true, youtube_rtmp_key: rtmpKey })
        .eq('channel', channel)
    } else {
      await stopRtmpStreaming(roomName)
      await supabase
        .from('lecture_sessions')
        .update({
          streaming_active: false,
          youtube_replay_url: youtubeReplayUrl ?? null,
        })
        .eq('channel', channel)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
