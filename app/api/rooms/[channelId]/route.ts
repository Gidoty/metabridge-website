import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateRoom, createMeetingToken } from '@/lib/daily'

const ROOM_NAMES: Record<string, string> = {
  free: 'metabridge-free-cohort',
  paid: 'metabridge-paid-professional',
}

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  const { channelId } = params
  const roomName = ROOM_NAMES[channelId]
  if (!roomName) {
    return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const role = request.nextUrl.searchParams.get('role')
  const isAdmin = role === 'admin' && user?.app_metadata?.role === 'admin'
  const isPrivate = channelId === 'paid'

  if (isPrivate && !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (isAdmin && !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const room = await getOrCreateRoom(roomName, isPrivate)
    const token = await createMeetingToken(roomName, isAdmin)

    if (isAdmin) {
      await supabase
        .from('lecture_sessions')
        .update({ is_live: true, daily_room_url: room.url })
        .eq('channel', channelId)
    }

    return NextResponse.json({ url: room.url, token, roomName })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
