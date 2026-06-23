'use client'

import type { ClassReportRow, QuizQuestion } from '@/lib/types/quiz'

interface ClassReportProps {
  rows: ClassReportRow[]
  questions: QuizQuestion[]
  onClose: () => void
}

export function ClassReport({ rows, questions, onClose }: ClassReportProps) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: '#0F1E35', border: '1px solid rgba(244,137,31,0.25)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'rgba(244,137,31,0.15)' }}
        >
          <div>
            <p className="font-mono text-orange text-xs tracking-widest uppercase mb-0.5">
              {'// class_report'}
            </p>
            <h3 className="font-heading text-white font-bold text-lg">Session Results</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors font-mono text-sm"
          >
            ✕ Close
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th className="text-left px-6 py-3 font-mono text-gray-500 text-xs uppercase tracking-wider">Student</th>
                <th className="text-right px-4 py-3 font-mono text-gray-500 text-xs uppercase tracking-wider">Score</th>
                <th className="text-right px-4 py-3 font-mono text-gray-500 text-xs uppercase tracking-wider">Correct</th>
                <th className="text-left px-4 py-3 font-mono text-gray-500 text-xs uppercase tracking-wider">Missed Qs</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.student_name}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600 text-xs w-5">{i + 1}</span>
                      <span className="text-white font-semibold">{row.student_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-heading font-bold text-white">
                    {row.total_points}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="font-mono text-sm"
                      style={{ color: row.correct_count >= questions.length * 0.7 ? '#4ADE80' : row.correct_count >= questions.length * 0.4 ? '#FFA602' : '#F87171' }}
                    >
                      {row.correct_count}/{questions.length}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {row.missed_questions.length === 0 ? (
                      <span className="text-green-400 font-mono text-xs">Perfect!</span>
                    ) : (
                      <span className="text-gray-400 font-mono text-xs">
                        Q{row.missed_questions.map((q) => q + 1).join(', Q')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 font-mono text-sm">
                    No submissions recorded for this session.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        {rows.length > 0 && (
          <div
            className="flex items-center gap-6 px-6 py-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="font-mono text-gray-500 text-xs uppercase tracking-wider">Total Students</p>
              <p className="font-heading font-bold text-white text-lg">{rows.length}</p>
            </div>
            <div>
              <p className="font-mono text-gray-500 text-xs uppercase tracking-wider">Avg Score</p>
              <p className="font-heading font-bold text-white text-lg">
                {Math.round(rows.reduce((s, r) => s + r.total_points, 0) / rows.length)}
              </p>
            </div>
            <div>
              <p className="font-mono text-gray-500 text-xs uppercase tracking-wider">Avg Correct</p>
              <p className="font-heading font-bold text-white text-lg">
                {(rows.reduce((s, r) => s + r.correct_count, 0) / rows.length).toFixed(1)}/{questions.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
