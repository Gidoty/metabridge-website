'use client'

import type { StudentScore } from '@/lib/types/quiz'

interface LeaderboardProps {
  topScores: StudentScore[]
  myName: string
}

const PODIUM = [
  { rank: 1, height: 'h-36', color: '#F4891F', badge: '🥇' },
  { rank: 2, height: 'h-24', color: '#22D3EE', badge: '🥈' },
  { rank: 3, height: 'h-16', color: '#A855F7', badge: '🥉' },
]

export function Leaderboard({ topScores, myName }: LeaderboardProps) {
  const top3 = [topScores[0], topScores[1], topScores[2]]
  const rest = topScores.slice(3)

  return (
    <div className="flex flex-col items-center h-full overflow-y-auto py-6 px-4">
      <p className="font-mono text-orange text-xs mb-2 tracking-widest uppercase">
        {'// quiz_complete'}
      </p>
      <h2 className="font-heading text-3xl font-bold text-white mb-8 text-center">Leaderboard</h2>

      {/* Podium — display order: 2nd | 1st | 3rd */}
      <div className="flex items-end justify-center gap-4 mb-8 w-full max-w-sm">
        {[1, 0, 2].map((scoreIdx) => {
          const podium = PODIUM[scoreIdx === 0 ? 0 : scoreIdx === 1 ? 1 : 2]
          const score = top3[scoreIdx]
          if (!score) return <div key={scoreIdx} className="flex-1" />

          const isMe = score.student_name === myName

          return (
            <div key={scoreIdx} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-2xl">{podium.badge}</span>
              <p
                className="font-semibold text-sm text-center truncate w-full px-1"
                style={{ color: isMe ? podium.color : '#E5E7EB' }}
              >
                {score.student_name}
              </p>
              <p className="font-heading text-white font-bold text-sm">{score.total_points} pts</p>
              <div
                className={`w-full ${podium.height} rounded-t-xl flex items-start justify-center pt-2`}
                style={{ background: `${podium.color}33`, border: `2px solid ${podium.color}` }}
              >
                <span className="font-heading font-bold text-xl" style={{ color: podium.color }}>
                  {scoreIdx === 1 ? '2' : scoreIdx === 0 ? '1' : '3'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 4th–10th */}
      {rest.length > 0 && (
        <div className="w-full max-w-sm space-y-2">
          {rest.map((score, i) => {
            const isMe = score.student_name === myName
            return (
              <div
                key={score.student_name}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{
                  background: isMe ? 'rgba(244,137,31,0.1)' : '#0F1E35',
                  border: `1px solid ${isMe ? 'rgba(244,137,31,0.3)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gray-500 text-sm w-5">{i + 4}</span>
                  <span className="text-white font-semibold text-sm">{score.student_name}</span>
                </div>
                <span className="font-heading font-bold text-white text-sm">{score.total_points}</span>
              </div>
            )
          })}
        </div>
      )}

      {topScores.length === 0 && (
        <p className="text-gray-500 font-mono text-sm">No submissions recorded.</p>
      )}

      <p className="text-gray-600 font-mono text-xs mt-8">Attendance check coming up…</p>
    </div>
  )
}
