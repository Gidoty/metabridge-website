const DAILY_API_BASE = 'https://api.daily.co/v1'

function getApiKey(): string {
  const key = process.env.DAILY_API_KEY
  if (!key) throw new Error('DAILY_API_KEY is not set')
  return key
}

async function dailyFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${DAILY_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Daily.co API error ${res.status}: ${text}`)
  }
  return res.json()
}

export async function getOrCreateRoom(roomName: string, isPrivate = false) {
  try {
    return await dailyFetch(`/rooms/${roomName}`)
  } catch {
    return await dailyFetch('/rooms', {
      method: 'POST',
      body: JSON.stringify({
        name: roomName,
        privacy: isPrivate ? 'private' : 'public',
        properties: {
          enable_screenshare: true,
          enable_chat: false,
          start_video_off: false,
          start_audio_off: false,
          max_participants: 200,
        },
      }),
    })
  }
}

export async function createMeetingToken(roomName: string, isOwner: boolean) {
  const data = await dailyFetch('/meeting-tokens', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        room_name: roomName,
        is_owner: isOwner,
        enable_recording: isOwner ? 'local' : undefined,
      },
    }),
  })
  return data.token as string
}

export async function startCloudRecording(roomName: string) {
  return dailyFetch(`/rooms/${roomName}/recordings`, { method: 'POST' })
}

export async function stopCloudRecording(roomName: string) {
  return dailyFetch(`/rooms/${roomName}/recordings/stop`, { method: 'POST' })
}

export async function startRtmpStreaming(roomName: string, rtmpUrl: string) {
  return dailyFetch(`/rooms/${roomName}/live-streaming`, {
    method: 'POST',
    body: JSON.stringify({ rtmpUrl }),
  })
}

export async function stopRtmpStreaming(roomName: string) {
  return dailyFetch(`/rooms/${roomName}/live-streaming/stop`, { method: 'POST' })
}
