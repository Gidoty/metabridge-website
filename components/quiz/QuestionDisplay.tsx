'use client'

import { useEffect, useRef, useState } from 'react'
import type { QuizQuestion } from '@/lib/types/quiz'

const OPTION_COLORS = ['#E21B3C', '#1368CE', '#26890C', '#FFA602']
const OPTION_SHAPES = ['▲', '◆', '●', '■']

interface QuestionDisplayProps {
  question: QuizQuestion
  questionIndex: number
  totalQuestions: number
  startedAt: string
  onSubmit: (option: number, timeTakenMs: number) => void
  submitted: boolean
  myAnswer: number | null
}

export function QuestionDisplay({
  question,
  questionIndex,
  totalQuestions,
  startedAt,
  onSubmit,
  submitted,
  myAnswer,
}: QuestionDisplayProps) {
  const [timeLeftPct, setTimeLeftPct] = useState(1)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const startMs = new Date(startedAt).getTime()
    const duration = 15000

    const tick = () => {
      const pct = Math.max(0, 1 - (Date.now() - startMs) / duration)
      setTimeLeftPct(pct)
      if (pct > 0 && !submitted) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [startedAt, submitted])

  const timeLeftSeconds = Math.ceil(timeLeftPct * 15)

  function handleSelect(option: number) {
    if (submitted) return
    const timeTakenMs = Date.now() - new Date(startedAt).getTime()
    onSubmit(option, timeTakenMs)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="h-2 w-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full transition-none"
          style={{
            width: `${timeLeftPct * 100}%`,
            background: timeLeftPct > 0.4 ? '#22D3EE' : timeLeftPct > 0.2 ? '#FFA602' : '#E21B3C',
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-mono text-gray-500 text-xs uppercase tracking-wider">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <span
          className="font-heading font-bold text-2xl"
          style={{ color: timeLeftPct > 0.4 ? '#22D3EE' : timeLeftPct > 0.2 ? '#FFA602' : '#E21B3C' }}
        >
          {timeLeftSeconds}s
        </span>
      </div>

      {/* Question text */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div
          className="w-full max-w-2xl rounded-2xl p-6 text-center"
          style={{ background: '#0F1E35', border: '1px solid rgba(34,211,238,0.15)' }}
        >
          <p className="font-heading text-white text-xl md:text-2xl font-bold leading-snug">
            {question.text}
          </p>
        </div>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3 p-4 md:p-6">
        {question.options.map((option, i) => {
          const isSelected = myAnswer === i
          const isDisabled = submitted

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isDisabled}
              className="relative flex items-center gap-3 p-4 md:p-5 rounded-2xl text-left transition-all active:scale-95 disabled:cursor-not-allowed"
              style={{
                background: isSelected
                  ? OPTION_COLORS[i]
                  : `${OPTION_COLORS[i]}CC`,
                opacity: isDisabled && !isSelected ? 0.6 : 1,
                transform: isSelected ? 'scale(1.02)' : undefined,
                boxShadow: isSelected ? `0 0 20px ${OPTION_COLORS[i]}66` : undefined,
              }}
            >
              <span className="text-white text-lg font-bold flex-shrink-0">{OPTION_SHAPES[i]}</span>
              <span className="text-white font-semibold text-sm md:text-base leading-tight">{option}</span>
            </button>
          )
        })}
      </div>

      {submitted && (
        <p className="text-center font-mono text-gray-400 text-xs pb-4">
          Answer locked — waiting for facilitator to reveal…
        </p>
      )}
    </div>
  )
}
