'use client'

import { useEffect, useState } from 'react'

interface CountdownReadyProps {
  onComplete?: () => void
}

export function CountdownReady({ onComplete }: CountdownReadyProps) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onComplete?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, onComplete])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div>
        <p className="font-mono text-cyber-cyan text-xs tracking-widest uppercase text-center mb-2">
          {'// quiz_starting'}
        </p>
        <h2 className="font-heading text-3xl font-bold text-white text-center">
          Get Ready!
        </h2>
      </div>

      <div
        className="flex items-center justify-center w-32 h-32 rounded-full"
        style={{
          background: 'rgba(34,211,238,0.1)',
          border: '3px solid #22D3EE',
          boxShadow: '0 0 40px rgba(34,211,238,0.3)',
        }}
      >
        {count > 0 ? (
          <span
            className="font-heading font-bold text-white"
            style={{ fontSize: '4rem', lineHeight: 1 }}
          >
            {count}
          </span>
        ) : (
          <span className="font-heading font-bold text-cyber-cyan text-2xl">GO!</span>
        )}
      </div>

      <p className="text-gray-500 font-mono text-sm">15 questions • 15 seconds each</p>
    </div>
  )
}
