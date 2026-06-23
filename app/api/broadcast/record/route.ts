import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { startCloudRecording, stopCloudRecording } from '@/lib/daily'

const ROOM_NAMES: Record<string, string> = {
  free: 'metabridge-free-cohort',
  paid: 'metabridge-paid-professional',
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel, action } = await request.json() as { channel: string; action: 'start' | 'stop' }
  const roomName = ROOM_NAMES[channel]
  if (!roomName) return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })

  try {
    if (action === 'start') {
      await startCloudRecording(roomName)
      await supabase.from('lecture_sessions').update({ recording_active: true }).eq('channel', channel)
    } else {
      await stopCloudRecording(roomName)
      await supabase.from('lecture_sessions').update({ recording_active: false }).eq('channel', channel)
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
