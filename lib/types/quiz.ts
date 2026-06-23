export type QuizPhase =
  | 'idle'
  | 'countdown'
  | 'question'
  | 'reveal'
  | 'leaderboard'
  | 'attendance'
  | 'ended'

export interface QuizQuestion {
  id: string
  text: string
  options: [string, string, string, string]
  correctOption: 0 | 1 | 2 | 3
}

export interface QuizSession {
  id: string
  channel: 'free' | 'paid'
  phase: QuizPhase
  current_question_index: number
  question_started_at: string | null
  questions: QuizQuestion[]
  created_at: string
}

export interface QuizStateEvent {
  phase: QuizPhase
  questionIndex?: number
  questionStartedAt?: string
  correctOption?: number
  topScores?: StudentScore[]
  sessionId?: string
}

export interface StudentScore {
  student_name: string
  total_points: number
  correct_count: number
}

export interface ClassReportRow extends StudentScore {
  missed_questions: number[]
}
