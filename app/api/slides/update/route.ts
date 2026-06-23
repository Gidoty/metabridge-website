import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Slide } from '@/lib/types/lecture'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel, slides } = await request.json() as { channel: string; slides: Slide[] }

  if (!channel || !Array.isArray(slides)) {
    return NextResponse.json({ error: 'channel and slides required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('lecture_sessions')
    .update({ slides })
    .eq('channel', channel)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
