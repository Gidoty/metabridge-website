import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { QuizQuestion } from '@/lib/types/quiz'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel } = await request.json() as { channel: string }

  const { data: session, error: fetchError } = await supabase
    .from('quiz_sessions')
    .select('current_question_index, questions')
    .eq('channel', channel)
    .single()

  if (fetchError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const questions = session.questions as QuizQuestion[]
  const currentQuestion = questions[session.current_question_index]
  if (!currentQuestion) return NextResponse.json({ error: 'No current question' }, { status: 400 })

  const { error } = await supabase
    .from('quiz_sessions')
    .update({ phase: 'reveal' })
    .eq('channel', channel)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    questionIndex: session.current_question_index,
    correctOption: currentQuestion.correctOption,
  })
}
