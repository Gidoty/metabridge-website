'use client'

import { useState } from 'react'

type Channel = 'free' | 'paid'

interface SessionState {
  isLive: boolean
  recording: boolean
  streaming: boolean
}

export function FacilitatorPanel() {
  const [channel, setChannel] = useState<Channel>('free')
  const [state, setState] = useState<SessionState>({ isLive: false, recording: false, streaming: false })
  const [rtmpKey, setRtmpKey] = useState('')
  const [replayUrl, setReplayUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function api(url: string, body: object) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error ?? `HTTP ${res.status}`)
    }
    return res.json()
  }

  async function toggleBroadcast() {
    setBusy(true)
    setError('')
    try {
      if (!state.isLive) {
        await fetch(`/api/rooms/${channel}?role=admin`)
        setState((s) => ({ ...s, isLive: true }))
      } else {
        await fetch(`/api/rooms/${channel}`, { method: 'DELETE' }).catch(() => null)
        setState((s) => ({ ...s, isLive: false, recording: false, streaming: false }))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  async function toggleRecording() {
    setBusy(true)
    setError('')
    try {
      await api('/api/broadcast/record', { channel, action: state.recording ? 'stop' : 'start' })
      setState((s) => ({ ...s, recording: !s.recording }))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  async function toggleStreaming() {
    setBusy(true)
    setError('')
    try {
      if (!state.streaming) {
        await api('/api/broadcast/stream', { channel, action: 'start', rtmpKey })
      } else {
        await api('/api/broadcast/stream', { channel, action: 'stop', youtubeReplayUrl: replayUrl || undefined })
      }
      setState((s) => ({ ...s, streaming: !s.streaming }))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-6 border space-y-6"
      style={{ background: '#0F1E35', borderColor: 'rgba(244,137,31,0.18)' }}
    >
      <p className="font-mono text-orange text-xs tracking-widest uppercase">
        {'// facilitator_panel'}
      </p>

      {/* Channel selector */}
      <div>
        <p className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider">Channel</p>
        <div className="flex gap-2">
          {(['free', 'paid'] as Channel[]).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannel(ch)}
              disabled={state.isLive}
              className="flex-1 py-2 rounded-xl font-mono text-sm font-semibold capitalize transition-all disabled:opacity-50"
              style={{
                background: channel === ch ? 'rgba(244,137,31,0.2)' : 'rgba(15,30,53,0.8)',
                border: `1px solid ${channel === ch ? 'rgba(244,137,31,0.4)' : 'rgba(244,137,31,0.1)'}`,
                color: channel === ch ? '#F4891F' : '#6B7280',
              }}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Start/Stop broadcast */}
      <div>
        <p className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider">Broadcast</p>
        <button
          onClick={toggleBroadcast}
          disabled={busy}
          className="w-full py-3 rounded-xl font-mono text-sm font-bold transition-all disabled:opacity-50"
          style={{
            background: state.isLive ? 'rgba(239,68,68,0.2)' : 'rgba(34,211,238,0.15)',
            color: state.isLive ? '#EF4444' : '#22D3EE',
            border: `1px solid ${state.isLive ? 'rgba(239,68,68,0.3)' : 'rgba(34,211,238,0.25)'}`,
          }}
        >
          {state.isLive ? '⏹ Stop Broadcast' : '▶ Start Broadcast'}
        </button>
      </div>

      {/* Recording */}
      <div>
        <p className="text-gray-500 text-xs font-mono mb-2 uppercase tracking-wider">Cloud Recording</p>
        <button
          onClick={toggleRecording}
          disabled={busy || !state.isLive}
          className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-40"
          style={{
            background: state.recording ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
            color: state.recording ? '#EF4444' : '#9CA3AF',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {state.recording ? '● Recording…' : '⏺ Start Recording'}
        </button>
      </div>

      {/* YouTube RTMP */}
      <div className="space-y-2">
        <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">YouTube RTMP</p>
        {!state.streaming && (
          <input
            value={rtmpKey}
            onChange={(e) => setRtmpKey(e.target.value)}
            placeholder="Stream key from YouTube Studio"
            className="w-full rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none"
            style={{
              background: 'rgba(10,14,26,0.6)',
              border: '1px solid rgba(34,211,238,0.15)',
            }}
          />
        )}
        {state.streaming && (
          <input
            value={replayUrl}
            onChange={(e) => setReplayUrl(e.target.value)}
            placeholder="YouTube replay URL (optional)"
            className="w-full rounded-lg px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none"
            style={{
              background: 'rgba(10,14,26,0.6)',
              border: '1px solid rgba(168,85,247,0.15)',
            }}
          />
        )}
        <button
          onClick={toggleStreaming}
          disabled={busy || !state.isLive || (!state.streaming && !rtmpKey)}
          className="w-full py-2.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-40"
          style={{
            background: state.streaming ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.05)',
            color: state.streaming ? '#A855F7' : '#9CA3AF',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {state.streaming ? '⏹ Stop Stream' : '📺 Go Live on YouTube'}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-xs font-mono">{error}</p>
      )}
    </div>
  )
}
