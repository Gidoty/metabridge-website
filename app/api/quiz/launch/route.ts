import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { FREE_QUIZ_QUESTIONS, PAID_QUIZ_QUESTIONS } from '@/lib/data/quiz-questions'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel } = await request.json() as { channel: string }
  if (channel !== 'free' && channel !== 'paid') {
    return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })
  }

  const questions = channel === 'free' ? FREE_QUIZ_QUESTIONS : PAID_QUIZ_QUESTIONS

  const { data, error } = await supabase
    .from('quiz_sessions')
    .update({
      phase: 'countdown',
      current_question_index: 0,
      question_started_at: null,
      questions,
    })
    .eq('channel', channel)
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ sessionId: data.id, totalQuestions: questions.length })
}
