import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { channel, studentName, userId, moduleTitle } = await request.json() as {
    channel: string
    studentName: string
    userId?: string
    moduleTitle?: string
  }

  if (!studentName?.trim()) {
    return NextResponse.json({ error: 'studentName required' }, { status: 400 })
  }

  const supabase = createClient()

  const { data: session } = await supabase
    .from('quiz_sessions')
    .select('id')
    .eq('channel', channel)
    .single()

  const { error } = await supabase.from('attendance_logs').insert({
    channel,
    quiz_session_id: session?.id ?? null,
    student_name: studentName.trim(),
    user_id: userId ?? null,
    module_title: moduleTitle ?? null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
