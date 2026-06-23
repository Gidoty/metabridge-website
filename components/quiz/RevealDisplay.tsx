'use client'

import type { QuizQuestion } from '@/lib/types/quiz'

const OPTION_COLORS = ['#E21B3C', '#1368CE', '#26890C', '#FFA602']
const OPTION_SHAPES = ['▲', '◆', '●', '■']

interface RevealDisplayProps {
  question: QuizQuestion
  questionIndex: number
  totalQuestions: number
  correctOption: number
  myAnswer: number | null
  pointsEarned: number
  totalPoints: number
}

export function RevealDisplay({
  question,
  questionIndex,
  totalQuestions,
  correctOption,
  myAnswer,
  pointsEarned,
  totalPoints,
}: RevealDisplayProps) {
  const isCorrect = myAnswer === correctOption
  const didAnswer = myAnswer !== null

  return (
    <div className="flex flex-col h-full">
      {/* Result banner */}
      <div
        className="flex items-center justify-center py-5 font-heading font-bold text-2xl"
        style={{
          background: !didAnswer ? 'rgba(107,114,128,0.2)' : isCorrect ? 'rgba(38,137,12,0.2)' : 'rgba(226,27,60,0.2)',
          borderBottom: `2px solid ${!didAnswer ? '#6B7280' : isCorrect ? '#26890C' : '#E21B3C'}`,
        }}
      >
        <span style={{ color: !didAnswer ? '#9CA3AF' : isCorrect ? '#4ADE80' : '#F87171' }}>
          {!didAnswer ? 'Time\'s Up!' : isCorrect ? 'Correct! +' + pointsEarned + ' pts' : 'Incorrect'}
        </span>
      </div>

      {/* Question */}
      <div className="flex items-center justify-center px-6 py-4">
        <div
          className="w-full max-w-2xl rounded-2xl p-5 text-center"
          style={{ background: '#0F1E35', border: '1px solid rgba(34,211,238,0.15)' }}
        >
          <p className="font-mono text-gray-500 text-xs mb-2">
            Q{questionIndex + 1} / {totalQuestions}
          </p>
          <p className="font-heading text-white text-lg font-bold">{question.text}</p>
        </div>
      </div>

      {/* Options with reveal */}
      <div className="grid grid-cols-2 gap-3 px-4 md:px-6">
        {question.options.map((option, i) => {
          const isCorrectOption = i === correctOption
          const isMyAnswer = i === myAnswer

          let border = '2px solid transparent'
          let opacity = 0.4
          if (isCorrectOption) { border = '2px solid #4ADE80'; opacity = 1 }
          else if (isMyAnswer && !isCorrect) { border = '2px solid #F87171'; opacity = 0.9 }

          return (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: `${OPTION_COLORS[i]}88`,
                border,
                opacity,
              }}
            >
              <span className="text-white font-bold flex-shrink-0">{OPTION_SHAPES[i]}</span>
              <span className="text-white font-semibold text-sm leading-tight">{option}</span>
              {isCorrectOption && <span className="ml-auto text-green-400 font-bold">✓</span>}
              {isMyAnswer && !isCorrect && <span className="ml-auto text-red-400 font-bold">✗</span>}
            </div>
          )
        })}
      </div>

      {/* Score */}
      <div className="flex items-center justify-center gap-6 mt-6 px-6">
        <div className="text-center">
          <p className="font-mono text-gray-500 text-xs uppercase tracking-wider mb-1">This Round</p>
          <p className="font-heading text-2xl font-bold" style={{ color: isCorrect ? '#4ADE80' : '#6B7280' }}>
            +{pointsEarned}
          </p>
        </div>
        <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="text-center">
          <p className="font-mono text-gray-500 text-xs uppercase tracking-wider mb-1">Total Score</p>
          <p className="font-heading text-2xl font-bold text-white">{totalPoints}</p>
        </div>
      </div>

      <p className="text-center font-mono text-gray-600 text-xs mt-4 pb-4">
        Waiting for next question…
      </p>
    </div>
  )
}
