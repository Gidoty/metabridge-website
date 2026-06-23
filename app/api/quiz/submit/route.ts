import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { QuizQuestion } from '@/lib/types/quiz'

export async function POST(request: NextRequest) {
  const {
    quizSessionId,
    channel,
    studentName,
    userId,
    questionIndex,
    selectedOption,
    timeTakenMs,
  } = await request.json() as {
    quizSessionId: string
    channel: string
    studentName: string
    userId?: string
    questionIndex: number
    selectedOption: number
    timeTakenMs: number
  }

  const supabase = createClient()

  const { data: session, error: sessionError } = await supabase
    .from('quiz_sessions')
    .select('questions')
    .eq('id', quizSessionId)
    .single()

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const questions = session.questions as QuizQuestion[]
  const question = questions[questionIndex]
  if (!question) return NextResponse.json({ error: 'Invalid question index' }, { status: 400 })

  const is_correct = selectedOption === question.correctOption
  const clampedMs = Math.max(0, Math.min(timeTakenMs, 15000))
  const points = is_correct
    ? 1000 + Math.round(500 * (1 - clampedMs / 15000))
    : 0

  const { error } = await supabase.from('quiz_submissions').upsert(
    {
      quiz_session_id: quizSessionId,
      channel,
      student_name: studentName,
      user_id: userId ?? null,
      question_index: questionIndex,
      selected_option: selectedOption,
      is_correct,
      time_taken_ms: clampedMs,
      points,
    },
    { onConflict: 'quiz_session_id,student_name,question_index' }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ isCorrect: is_correct, points })
}
