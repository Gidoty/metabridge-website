'use client'

import { useEffect, useState } from 'react'
import { subscribeToQuizState, broadcastQuizState } from '@/lib/supabase/realtime'
import type { QuizPhase, QuizSession, ClassReportRow, QuizQuestion } from '@/lib/types/quiz'
import { ClassReport } from '@/components/quiz/ClassReport'

interface QuizControllerProps {
  channel: 'free' | 'paid'
  quizSession: QuizSession
}

export function QuizController({ channel, quizSession }: QuizControllerProps) {
  const [phase, setPhase] = useState<QuizPhase>(quizSession.phase)
  const [sessionId, setSessionId] = useState<string>(quizSession.id)
  const [questionIndex, setQuestionIndex] = useState(quizSession.current_question_index)
  const [totalQuestions, setTotalQuestions] = useState(quizSession.questions.length)
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizSession.questions)
  const [classReport, setClassReport] = useState<ClassReportRow[] | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsub = subscribeToQuizState(channel, (event) => {
      setPhase(event.phase)
      if (event.questionIndex !== undefined) setQuestionIndex(event.questionIndex)
      if (event.sessionId !== undefined) setSessionId(event.sessionId)
    })
    return unsub
  }, [channel])

  async function callApi(endpoint: string, extra?: Record<string, unknown>) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, ...extra }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
      return data
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
      return null
    } finally {
      setBusy(false)
    }
  }

  async function handleLaunch() {
    const data = await callApi('/api/quiz/launch')
    if (!data) return
    const sid = data.sessionId ?? sessionId
    setSessionId(sid)
    setQuestionIndex(0)
    setTotalQuestions(data.totalQuestions ?? 0)
    setClassReport(null)
    setPhase('countdown')
    await broadcastQuizState(channel, { phase: 'countdown', sessionId: sid })
  }

  async function handleShowQuestion() {
    const data = await callApi('/api/quiz/question')
    if (!data) return
    const idx = data.questionIndex
    const startedAt = data.questionStartedAt
    setQuestionIndex(idx)
    setPhase('question')
    await broadcastQuizState(channel, {
      phase: 'question',
      sessionId,
      questionIndex: idx,
      questionStartedAt: startedAt,
    })
  }

  async function handleReveal() {
    const data = await callApi('/api/quiz/reveal')
    if (!data) return
    setPhase('reveal')
    await broadcastQuizState(channel, {
      phase: 'reveal',
      questionIndex: data.questionIndex,
      correctOption: data.correctOption,
    })
  }

  async function handleLeaderboard() {
    const data = await callApi('/api/quiz/leaderboard')
    if (!data) return
    setPhase('leaderboard')
    if (data.classReport) setClassReport(data.classReport)
    await broadcastQuizState(channel, {
      phase: 'leaderboard',
      topScores: data.topScores ?? [],
    })
  }

  async function handleAttendance() {
    const data = await callApi('/api/quiz/attendance')
    if (!data) return
    setPhase('attendance')
    await broadcastQuizState(channel, { phase: 'attendance' })
  }

  async function handleEnd() {
    const data = await callApi('/api/quiz/end')
    if (!data) return
    setPhase('idle')
    setQuestionIndex(0)
    await broadcastQuizState(channel, { phase: 'idle' })
  }

  const phaseLabel: Record<QuizPhase, string> = {
    idle: 'IDLE',
    countdown: 'COUNTDOWN',
    question: 'QUESTION',
    reveal: 'REVEAL',
    leaderboard: 'LEADERBOARD',
    attendance: 'ATTENDANCE',
    ended: 'ENDED',
  }

  const accentColor = channel === 'free' ? '#22D3EE' : '#F4891F'

  return (
    <>
      <div
        className="rounded-2xl p-5"
        style={{ background: '#0F1E35', border: `1px solid ${accentColor}33` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-0.5" style={{ color: accentColor }}>
              {'// quiz_controller'}
            </p>
            <h4 className="font-heading font-bold text-white text-sm capitalize">
              {channel} Channel Quiz
            </h4>
          </div>
          <div
            className="px-3 py-1 rounded-full font-mono text-xs"
            style={{
              background: phase === 'idle' ? 'rgba(107,114,128,0.2)' : `${accentColor}22`,
              color: phase === 'idle' ? '#6B7280' : accentColor,
              border: `1px solid ${phase === 'idle' ? '#374151' : `${accentColor}44`}`,
            }}
          >
            {phaseLabel[phase]}
          </div>
        </div>

        {/* Progress */}
        {phase !== 'idle' && phase !== 'countdown' && totalQuestions > 0 && (
          <div className="mb-4">
            <div className="flex justify-between font-mono text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>Q{questionIndex + 1} / {totalQuestions}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%`, background: accentColor }}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-400 font-mono text-xs mb-3">{error}</p>}

        {/* Action Buttons */}
        <div className="space-y-2">
          {phase === 'idle' && (
            <CtaButton onClick={handleLaunch} busy={busy} color={accentColor}>
              ▶ Launch Module Quiz
            </CtaButton>
          )}

          {phase === 'countdown' && (
            <CtaButton onClick={handleShowQuestion} busy={busy} color={accentColor}>
              ▶ Show Question 1
            </CtaButton>
          )}

          {phase === 'question' && (
            <CtaButton onClick={handleReveal} busy={busy} color="#E21B3C">
              ◉ Reveal Answer
            </CtaButton>
          )}

          {phase === 'reveal' && (
            <>
              {questionIndex + 1 < totalQuestions ? (
                <CtaButton onClick={handleShowQuestion} busy={busy} color={accentColor}>
                  ▶ Next Question ({questionIndex + 2}/{totalQuestions})
                </CtaButton>
              ) : (
                <CtaButton onClick={handleLeaderboard} busy={busy} color="#F4891F">
                  🏆 Show Leaderboard
                </CtaButton>
              )}
            </>
          )}

          {phase === 'leaderboard' && (
            <>
              <CtaButton onClick={handleAttendance} busy={busy} color="#22D3EE">
                ✓ Trigger Attendance
              </CtaButton>
              {classReport && (
                <button
                  onClick={() => setShowReport(true)}
                  className="w-full py-2.5 rounded-xl font-mono text-sm transition-all hover:opacity-80"
                  style={{ background: 'rgba(244,137,31,0.1)', color: '#F4891F', border: '1px solid rgba(244,137,31,0.3)' }}
                >
                  📋 View Class Report
                </button>
              )}
            </>
          )}

          {(phase === 'attendance' || phase === 'ended') && (
            <CtaButton onClick={handleEnd} busy={busy} color="#6B7280">
              ■ End Quiz Session
            </CtaButton>
          )}
        </div>
      </div>

      {showReport && classReport && (
        <ClassReport
          rows={classReport}
          questions={questions.length > 0 ? questions : Array.from({ length: totalQuestions }, (_, i) => ({
            id: String(i),
            text: `Question ${i + 1}`,
            options: ['', '', '', ''] as [string, string, string, string],
            correctOption: 0 as 0 | 1 | 2 | 3,
          }))}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  )
}

function CtaButton({
  children,
  onClick,
  busy,
  color,
}: {
  children: React.ReactNode
  onClick: () => void
  busy: boolean
  color: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {busy ? 'Working…' : children}
    </button>
  )
}
