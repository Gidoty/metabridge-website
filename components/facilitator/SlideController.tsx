'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { broadcastSlideChange } from '@/lib/supabase/realtime'
import type { LectureSession } from '@/lib/types/lecture'

interface SlideControllerProps {
  session: LectureSession
}

export function SlideController({ session }: SlideControllerProps) {
  const [slideIndex, setSlideIndex] = useState(session.current_slide_index)
  const [busy, setBusy] = useState(false)
  const total = (session.slides as unknown[]).length

  async function goTo(newIndex: number) {
    if (busy || newIndex < 0 || newIndex >= total) return
    setBusy(true)
    try {
      const supabase = createClient()
      await supabase
        .from('lecture_sessions')
        .update({ current_slide_index: newIndex })
        .eq('channel', session.channel)
      await broadcastSlideChange(session.channel, newIndex)
      setSlideIndex(newIndex)
    } catch (err) {
      console.error('SlideController error:', err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-6 border"
      style={{ background: '#0F1E35', borderColor: 'rgba(244,137,31,0.18)' }}
    >
      <p className="font-mono text-orange text-xs mb-4 tracking-widest uppercase">
        {'// slide_controller'}
      </p>
      <div className="flex items-center justify-between">
        <button
          onClick={() => goTo(slideIndex - 1)}
          disabled={busy || slideIndex === 0}
          className="px-5 py-2 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-40"
          style={{ background: 'rgba(244,137,31,0.15)', color: '#F4891F' }}
        >
          ← Prev
        </button>
        <span className="font-mono text-gray-400 text-sm">
          {slideIndex + 1} / {total}
        </span>
        <button
          onClick={() => goTo(slideIndex + 1)}
          disabled={busy || slideIndex === total - 1}
          className="px-5 py-2 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-40"
          style={{ background: 'rgba(244,137,31,0.15)', color: '#F4891F' }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
