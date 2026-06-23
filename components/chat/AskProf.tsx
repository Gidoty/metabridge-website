'use client'

import { useEffect, useRef, useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AskProfProps {
  studentName?: string
}

export function AskProf({ studentName }: AskProfProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText, open])

  async function send() {
    const text = input.trim()
    if (!text || streaming) return

    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, studentName }),
      })

      if (!res.ok || !res.body) {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, the AI tutor is unavailable right now.' }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setStreamingText(accumulated)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: accumulated }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    } finally {
      setStreaming(false)
      setStreamingText('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
          color: '#0A0E1A',
          boxShadow: '0 0 30px rgba(34,211,238,0.4)',
        }}
        aria-label="Ask Prof AI Tutor"
      >
        {open ? '✕' : '🎓'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: '#0F1E35',
            border: '1px solid rgba(34,211,238,0.25)',
            boxShadow: '0 0 60px rgba(34,211,238,0.1)',
            maxHeight: '70vh',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(34,211,238,0.15)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #22D3EE, #3B82F6)', color: '#0A0E1A' }}
            >
              P
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm">Ask Prof</p>
              <p className="font-mono text-xs text-cyber-cyan">Metabridge AI Facilitator</p>
            </div>
            <div
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.length === 0 && !streaming && (
              <div className="text-center py-6">
                <p className="text-gray-500 font-mono text-xs leading-relaxed">
                  {'// ask_prof_online'}<br />
                  Ask me anything about your Metabridge curriculum — cybersecurity, data, AI, or blockchain.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.06)',
                    color: msg.role === 'user' ? '#22D3EE' : '#E5E7EB',
                    borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  }}
                >
                  <MessageContent content={msg.content} />
                </div>
              </div>
            ))}

            {streaming && streamingText && (
              <div className="flex justify-start">
                <div
                  className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: '#E5E7EB',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                  }}
                >
                  <MessageContent content={streamingText} />
                  <span className="inline-block w-1 h-4 ml-0.5 bg-cyan-400 animate-pulse align-middle" />
                </div>
              </div>
            )}

            {streaming && !streamingText && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2 rounded-2xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#6B7280' }}
                >
                  <span className="font-mono">thinking…</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 border-t flex-shrink-0"
            style={{ borderColor: 'rgba(34,211,238,0.1)' }}
          >
            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{ background: 'rgba(10,14,26,0.6)', border: '1px solid rgba(34,211,238,0.15)' }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                rows={1}
                className="flex-1 bg-transparent text-white text-sm resize-none focus:outline-none placeholder-gray-600 font-mono"
                style={{ maxHeight: '96px' }}
                disabled={streaming}
              />
              <button
                onClick={send}
                disabled={!input.trim() || streaming}
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all disabled:opacity-30"
                style={{ background: 'rgba(34,211,238,0.2)', color: '#22D3EE' }}
              >
                ↑
              </button>
            </div>
            <p className="text-gray-600 font-mono text-xs mt-1.5 text-center">
              Enter to send · Shift+Enter for newline
            </p>
          </div>
        </div>
      )}
    </>
  )
}

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const lines = part.slice(3).split('\n')
          lines.pop()
          const code = lines.slice(1).join('\n') || lines.join('\n')
          return (
            <pre
              key={i}
              className="my-1 p-2 rounded-lg text-xs overflow-x-auto"
              style={{ background: 'rgba(0,0,0,0.3)', color: '#22D3EE' }}
            >
              <code>{code}</code>
            </pre>
          )
        }
        return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>
      })}
    </>
  )
}
