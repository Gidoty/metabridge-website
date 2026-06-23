'use client'

import { useState } from 'react'
import type { Lab } from '@/lib/data/labs'

const DIFFICULTY_COLORS = {
  Beginner: '#4ADE80',
  Intermediate: '#FFA602',
  Advanced: '#F87171',
}

const TRACK_COLORS = {
  cybersecurity: '#E21B3C',
  data: '#22D3EE',
  ai: '#A855F7',
  blockchain: '#F4891F',
}

interface LabCardProps {
  lab: Lab
}

export function LabCard({ lab }: LabCardProps) {
  const [iframeOpen, setIframeOpen] = useState(false)
  const trackColor = TRACK_COLORS[lab.track]

  return (
    <div
      className="rounded-2xl p-5 flex flex-col"
      style={{
        background: '#0F1E35',
        border: `1px solid ${trackColor}33`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-heading font-bold text-white text-sm leading-snug flex-1">{lab.title}</h3>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: `${DIFFICULTY_COLORS[lab.difficulty]}22`, color: DIFFICULTY_COLORS[lab.difficulty] }}
        >
          {lab.difficulty}
        </span>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{lab.description}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-gray-500 text-xs">⏱ {lab.duration}</span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{ background: `${trackColor}15`, color: trackColor }}
        >
          {lab.type === 'iframe' ? 'In-Browser' : 'External Tool'}
        </span>
      </div>

      {/* Action */}
      {lab.type === 'external' ? (
        <a
          href={lab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2.5 rounded-xl font-mono text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: `${trackColor}22`, color: trackColor, border: `1px solid ${trackColor}44` }}
        >
          Open Lab ↗
        </a>
      ) : (
        <button
          onClick={() => setIframeOpen((o) => !o)}
          className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: `${trackColor}22`, color: trackColor, border: `1px solid ${trackColor}44` }}
        >
          {iframeOpen ? '▲ Close Lab' : '▼ Launch Lab'}
        </button>
      )}

      {/* Inline iframe */}
      {lab.type === 'iframe' && iframeOpen && (
        <div className="mt-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${trackColor}33` }}>
          <iframe
            src={lab.url}
            className="w-full h-96"
            title={lab.title}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      )}
    </div>
  )
}
