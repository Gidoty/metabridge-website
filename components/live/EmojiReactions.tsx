'use client'

import { useState, useCallback } from 'react'

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
}

const REACTIONS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '💡', label: 'Idea' },
  { emoji: '❤️', label: 'Love' },
]

export function EmojiReactions() {
  const [floaters, setFloaters] = useState<FloatingEmoji[]>([])
  const [counter, setCounter] = useState(0)

  const react = useCallback((emoji: string) => {
    const id = counter + 1
    setCounter(id)
    setFloaters((prev) => [...prev, { id, emoji, x: 20 + Math.random() * 60 }])
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id))
    }, 2000)
  }, [counter])

  return (
    <div
      className="relative flex items-center justify-center gap-3"
      style={{ height: '15vh', background: '#0A0E1A' }}
    >
      {floaters.map((f) => (
        <span
          key={f.id}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${f.x}%`,
            bottom: '100%',
            animation: 'floatUp 2s ease-out forwards',
          }}
        >
          {f.emoji}
        </span>
      ))}
      {REACTIONS.map(({ emoji, label }) => (
        <button
          key={emoji}
          onClick={() => react(emoji)}
          aria-label={label}
          className="text-2xl hover:scale-125 transition-transform active:scale-110 select-none"
        >
          {emoji}
        </button>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(1.4); }
        }
      `}</style>
    </div>
  )
}
