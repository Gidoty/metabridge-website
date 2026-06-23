'use client'

import { createClient } from '@/lib/supabase/client'
import type { SlideChangeEvent } from '@/lib/types/lecture'
import type { QuizStateEvent } from '@/lib/types/quiz'

export function subscribeToSlideChanges(
  channel: string,
  onEvent: (event: SlideChangeEvent) => void
): () => void {
  const supabase = createClient()
  const sub = supabase
    .channel(`lecture:${channel}`)
    .on('broadcast', { event: 'slide_change' }, ({ payload }) => {
      onEvent(payload as SlideChangeEvent)
    })
    .subscribe()

  return () => {
    supabase.removeChannel(sub)
  }
}

export async function broadcastSlideChange(channel: string, slideIndex: number): Promise<void> {
  const supabase = createClient()
  const ch = supabase.channel(`lecture:${channel}`)
  await ch.send({
    type: 'broadcast',
    event: 'slide_change',
    payload: { slideIndex } satisfies SlideChangeEvent,
  })
  await supabase.removeChannel(ch)
}

export function subscribeToQuizState(
  channel: string,
  onEvent: (event: QuizStateEvent) => void
): () => void {
  const supabase = createClient()
  const sub = supabase
    .channel(`quiz:${channel}`)
    .on('broadcast', { event: 'quiz_state' }, ({ payload }) => {
      onEvent(payload as QuizStateEvent)
    })
    .subscribe()

  return () => {
    supabase.removeChannel(sub)
  }
}

export async function broadcastQuizState(channel: string, state: QuizStateEvent): Promise<void> {
  const supabase = createClient()
  const ch = supabase.channel(`quiz:${channel}`)
  await ch.send({
    type: 'broadcast',
    event: 'quiz_state',
    payload: state,
  })
  await supabase.removeChannel(ch)
}
