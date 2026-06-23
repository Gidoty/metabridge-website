'use client'

import dynamic from 'next/dynamic'

const VideoPlayerInner = dynamic(() => import('./VideoPlayerInner'), { ssr: false })

interface VideoPlayerProps {
  roomUrl: string
  token: string
}

export function VideoPlayer({ roomUrl, token }: VideoPlayerProps) {
  return <VideoPlayerInner roomUrl={roomUrl} token={token} />
}
