'use client'

import { useEffect, useRef, useState } from 'react'
import DailyIframe, { type DailyCall } from '@daily-co/daily-js'
import { DailyProvider, DailyVideo, useActiveSpeakerId, useParticipantIds } from '@daily-co/daily-react'
import { QualityToggle } from './QualityToggle'
import { EmojiReactions } from './EmojiReactions'
import type { QualityLevel } from '@/lib/types/lecture'

const QUALITY_KEY = 'mb-video-quality'

function SpeakerView({ quality }: { quality: QualityLevel }) {
  const activeSpeakerId = useActiveSpeakerId()
  const participantIds = useParticipantIds()

  const speakerId = activeSpeakerId ?? participantIds[0]

  if (!speakerId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500 font-mono text-sm">Waiting for facilitator…</p>
        </div>
      </div>
    )
  }

  if (quality === 'data-saver') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-5xl mb-4">🎧</div>
          <p className="text-gray-400 font-mono text-sm">Audio only — Data Saver mode</p>
          <DailyVideo sessionId={speakerId} type="video" style={{ display: 'none' }} />
        </div>
      </div>
    )
  }

  return (
    <DailyVideo
      sessionId={speakerId}
      type="video"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

interface VideoPlayerInnerProps {
  roomUrl: string
  token: string
}

export default function VideoPlayerInner({ roomUrl, token }: VideoPlayerInnerProps) {
  const callRef = useRef<DailyCall | null>(null)
  const [callObject, setCallObject] = useState<DailyCall | null>(null)
  const [quality, setQuality] = useState<QualityLevel>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(QUALITY_KEY) as QualityLevel) ?? 'auto'
    }
    return 'auto'
  })

  useEffect(() => {
    const co = DailyIframe.createCallObject()
    callRef.current = co
    co.join({ url: roomUrl, token }).catch(console.error)
    setCallObject(co)

    return () => {
      co.leave().then(() => co.destroy()).catch(console.error)
    }
  }, [roomUrl, token])

  useEffect(() => {
    if (!callObject) return
    localStorage.setItem(QUALITY_KEY, quality)
    if (quality === 'data-saver') {
      callObject.updateReceiveSettings({ '*': { video: { layer: -1 } } })
    } else if (quality === 'hd') {
      callObject.updateReceiveSettings({ '*': { video: { layer: 2 } } })
    } else {
      callObject.updateReceiveSettings({ '*': { video: { layer: 0 } } })
    }
  }, [quality, callObject])

  return (
    <div className="flex flex-col" style={{ background: '#0A0E1A' }}>
      {callObject && (
        <DailyProvider callObject={callObject}>
          {/* 85vh video area */}
          <div className="relative overflow-hidden" style={{ height: '85vh', background: '#000' }}>
            <SpeakerView quality={quality} />
            {/* Quality toggle overlay */}
            <div className="absolute bottom-4 right-4 z-10">
              <QualityToggle quality={quality} onChange={setQuality} />
            </div>
          </div>
          {/* 15vh emoji reactions */}
          <EmojiReactions />
        </DailyProvider>
      )}
      {!callObject && (
        <div className="flex items-center justify-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 font-mono text-sm">Connecting…</p>
          </div>
        </div>
      )}
    </div>
  )
}
