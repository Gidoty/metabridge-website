import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ClassReportRow } from '@/lib/types/quiz'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { channel } = await request.json() as { channel: string }

  const { data: session, error: sessionError } = await supabase
    .from('quiz_sessions')
    .select('id, questions')
    .eq('channel', channel)
    .single()

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const { data: submissions, error: subError } = await supabase
    .from('quiz_submissions')
    .select('student_name, question_index, is_correct, points')
    .eq('quiz_session_id', session.id)

  if (subError) return NextResponse.json({ error: subError.message }, { status: 500 })

  // Aggregate per student
  const byStudent = new Map<string, { total_points: number; correct_count: number; missed: number[] }>()
  for (const row of submissions ?? []) {
    const existing = byStudent.get(row.student_name) ?? { total_points: 0, correct_count: 0, missed: [] }
    existing.total_points += row.points
    if (row.is_correct) {
      existing.correct_count += 1
    } else {
      existing.missed.push(row.question_index)
    }
    byStudent.set(row.student_name, existing)
  }

  const classReport: ClassReportRow[] = Array.from(byStudent.entries())
    .map(([student_name, agg]) => ({
      student_name,
      total_points: agg.total_points,
      correct_count: agg.correct_count,
      missed_questions: agg.missed,
    }))
    .sort((a, b) => b.total_points - a.total_points)

  const topScores = classReport.slice(0, 10).map(({ student_name, total_points, correct_count }) => ({
    student_name,
    total_points,
    correct_count,
  }))

  await supabase
    .from('quiz_sessions')
    .update({ phase: 'leaderboard' })
    .eq('channel', channel)

  return NextResponse.json({ topScores, classReport })
}
