'use client'

import type { QualityLevel } from '@/lib/types/lecture'

interface QualityToggleProps {
  quality: QualityLevel
  onChange: (q: QualityLevel) => void
}

const OPTIONS: { value: QualityLevel; label: string }[] = [
  { value: 'hd', label: 'HD' },
  { value: 'auto', label: 'Auto' },
  { value: 'data-saver', label: 'Data Saver' },
]

export function QualityToggle({ quality, onChange }: QualityToggleProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1"
      style={{ background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(8px)' }}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="text-xs font-mono px-2.5 py-1 rounded-md transition-colors"
          style={{
            background: quality === opt.value ? 'rgba(34,211,238,0.2)' : 'transparent',
            color: quality === opt.value ? '#22D3EE' : '#6B7280',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
