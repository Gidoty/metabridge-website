'use client'

import { createClient } from '@/lib/supabase/client'
import type { SlideChangeEvent } from '@/lib/types/lecture'

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
