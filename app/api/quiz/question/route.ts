import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel } = await request.json() as { channel: string }

  const { data: session, error: fetchError } = await supabase
    .from('quiz_sessions')
    .select('current_question_index, phase')
    .eq('channel', channel)
    .single()

  if (fetchError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const newIndex = session.phase === 'countdown' ? 0 : session.current_question_index + 1
  const now = new Date().toISOString()

  const { error } = await supabase
    .from('quiz_sessions')
    .update({ phase: 'question', current_question_index: newIndex, question_started_at: now })
    .eq('channel', channel)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ questionIndex: newIndex, questionStartedAt: now })
}
