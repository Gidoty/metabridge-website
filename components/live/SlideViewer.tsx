'use client'

import { useEffect, useState } from 'react'
import { subscribeToSlideChanges } from '@/lib/supabase/realtime'
import type { LectureSession, Slide } from '@/lib/types/lecture'

interface SlideViewerProps {
  initialSession: LectureSession
}

export function SlideViewer({ initialSession }: SlideViewerProps) {
  const [slideIndex, setSlideIndex] = useState(initialSession.current_slide_index)
  const slides = initialSession.slides as Slide[]
  const slide = slides[slideIndex]

  useEffect(() => {
    const cleanup = subscribeToSlideChanges(initialSession.channel, ({ slideIndex: idx }) => {
      setSlideIndex(idx)
    })
    return cleanup
  }, [initialSession.channel])

  if (!slide) return null

  return (
    <div
      className="rounded-2xl p-8 border"
      style={{ background: '#0F1E35', borderColor: 'rgba(34,211,238,0.15)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-cyber-cyan text-xs tracking-widest uppercase">
          {slide.type === 'question' ? '// question' : slide.type === 'assignment' ? '// assignment' : '// slide'}
        </p>
        <span className="font-mono text-gray-600 text-xs">
          {slideIndex + 1} / {slides.length}
        </span>
      </div>

      <h2 className="font-heading text-xl font-bold text-white mb-4">{slide.title}</h2>
      <p className="text-gray-300 leading-relaxed mb-6">{slide.content}</p>

      {slide.question && (
        <div
          className="rounded-xl p-5 border"
          style={{
            background: slide.type === 'assignment'
              ? 'rgba(168,85,247,0.08)'
              : 'rgba(34,211,238,0.08)',
            borderColor: slide.type === 'assignment'
              ? 'rgba(168,85,247,0.2)'
              : 'rgba(34,211,238,0.2)',
          }}
        >
          <p className="font-mono text-xs mb-2 tracking-wider uppercase"
            style={{ color: slide.type === 'assignment' ? '#A855F7' : '#22D3EE' }}>
            {slide.type === 'assignment' ? '// take-home' : '// discussion'}
          </p>
          <p className="text-white text-sm leading-relaxed">{slide.question.text}</p>
          {slide.question.isOpenEnded && (
            <textarea
              className="w-full mt-4 rounded-lg p-3 text-sm font-mono text-gray-300 resize-none focus:outline-none"
              style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.15)' }}
              rows={3}
              placeholder="Type your answer here…"
            />
          )}
        </div>
      )}
    </div>
  )
}
