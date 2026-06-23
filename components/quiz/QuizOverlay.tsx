'use client'

import { useEffect, useState } from 'react'
import { subscribeToQuizState } from '@/lib/supabase/realtime'
import type { QuizPhase, QuizStateEvent, StudentScore } from '@/lib/types/quiz'
import { CountdownReady } from './CountdownReady'
import { QuestionDisplay } from './QuestionDisplay'
import { RevealDisplay } from './RevealDisplay'
import { Leaderboard } from './Leaderboard'
import { AttendancePopup } from './AttendancePopup'

interface QuizOverlayProps {
  channel: string
  studentName: string
}

interface QuizClientState {
  phase: QuizPhase
  sessionId: string | null
  questionIndex: number
  questionStartedAt: string | null
  correctOption: number | null
  topScores: StudentScore[]
  myAnswer: number | null
  pointsThisQuestion: number
  totalPoints: number
}

const INITIAL_STATE: QuizClientState = {
  phase: 'idle',
  sessionId: null,
  questionIndex: 0,
  questionStartedAt: null,
  correctOption: null,
  topScores: [],
  myAnswer: null,
  pointsThisQuestion: 0,
  totalPoints: 0,
}

export function QuizOverlay({ channel, studentName }: QuizOverlayProps) {
  const [state, setState] = useState<QuizClientState>(INITIAL_STATE)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const unsub = subscribeToQuizState(channel, (event: QuizStateEvent) => {
      setState((prev) => {
        const next = { ...prev }

        next.phase = event.phase

        if (event.sessionId !== undefined) next.sessionId = event.sessionId
        if (event.questionIndex !== undefined) {
          if (event.questionIndex !== prev.questionIndex) {
            next.myAnswer = null
            next.pointsThisQuestion = 0
          }
          next.questionIndex = event.questionIndex
        }
        if (event.questionStartedAt !== undefined) next.questionStartedAt = event.questionStartedAt
        if (event.correctOption !== undefined) next.correctOption = event.correctOption
        if (event.topScores !== undefined) next.topScores = event.topScores

        if (event.phase === 'countdown' || event.phase === 'idle') {
          next.myAnswer = null
          next.pointsThisQuestion = 0
          if (event.phase === 'idle') {
            next.totalPoints = 0
            next.sessionId = null
          }
        }

        return next
      })
    })

    return unsub
  }, [channel])

  async function handleSubmit(selectedOption: number, timeTakenMs: number) {
    if (submitting || state.myAnswer !== null || !state.sessionId) return
    setSubmitting(true)

    setState((prev) => ({ ...prev, myAnswer: selectedOption }))

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizSessionId: state.sessionId,
          channel,
          studentName,
          questionIndex: state.questionIndex,
          selectedOption,
          timeTakenMs,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setState((prev) => ({
          ...prev,
          pointsThisQuestion: data.points ?? 0,
          totalPoints: prev.totalPoints + (data.points ?? 0),
        }))
      }
    } catch {
      // submission failed — answer is still locked locally
    } finally {
      setSubmitting(false)
    }
  }

  if (state.phase === 'idle') return null

  // Fetch current question from the session questions
  // Questions are embedded in the event payload via sessionId — we need them from the DB
  // For the overlay we trust the question data comes through the realtime event or we re-fetch
  // The simplest approach: keep a local questions array populated on launch
  return (
    <QuizOverlayInner
      state={state}
      channel={channel}
      studentName={studentName}
      onSubmit={handleSubmit}
    />
  )
}

// Inner component that also fetches questions when session becomes active
function QuizOverlayInner({
  state,
  channel,
  studentName,
  onSubmit,
}: {
  state: QuizClientState
  channel: string
  studentName: string
  onSubmit: (option: number, timeTakenMs: number) => void
}) {
  const [questions, setQuestions] = useState<import('@/lib/types/quiz').QuizQuestion[]>([])

  useEffect(() => {
    if (!state.sessionId) return
    fetch(`/api/quiz/questions?sessionId=${state.sessionId}`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d.questions)) setQuestions(d.questions) })
      .catch(() => {})
  }, [state.sessionId])

  const currentQuestion = questions[state.questionIndex] ?? null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: '#0A0E1A' }}
    >
      {state.phase === 'countdown' && <CountdownReady />}

      {state.phase === 'question' && currentQuestion && state.questionStartedAt && (
        <QuestionDisplay
          question={currentQuestion}
          questionIndex={state.questionIndex}
          totalQuestions={questions.length}
          startedAt={state.questionStartedAt}
          onSubmit={onSubmit}
          submitted={state.myAnswer !== null}
          myAnswer={state.myAnswer}
        />
      )}

      {state.phase === 'reveal' && currentQuestion && state.correctOption !== null && (
        <RevealDisplay
          question={currentQuestion}
          questionIndex={state.questionIndex}
          totalQuestions={questions.length}
          correctOption={state.correctOption}
          myAnswer={state.myAnswer}
          pointsEarned={state.pointsThisQuestion}
          totalPoints={state.totalPoints}
        />
      )}

      {state.phase === 'leaderboard' && (
        <Leaderboard topScores={state.topScores} myName={studentName} />
      )}

      {state.phase === 'attendance' && (
        <AttendancePopup channel={channel} studentName={studentName} />
      )}

      {/* Fallback for phases with no dedicated UI (ended, etc.) */}
      {(state.phase === 'ended' || (state.phase === 'question' && !currentQuestion)) && (
        <div className="flex items-center justify-center h-full">
          <p className="font-mono text-gray-400 text-sm">Loading…</p>
        </div>
      )}
    </div>
  )
}
