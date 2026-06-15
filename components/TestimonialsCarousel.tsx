'use client'

import { useState, useEffect, useCallback } from 'react'
import { testimonials } from '@/lib/data'

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1

  const getVisible = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length])
    }
    return items
  }

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {getVisible().map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-teal hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="flex text-orange mb-3">
              {'★★★★★'.split('').map((star, si) => (
                <span key={si} className="text-lg">{star}</span>
              ))}
            </div>
            <p className="text-gray-600 italic leading-relaxed mb-4 flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-navy">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
              <p className="text-sm text-teal">{t.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center hover:bg-teal transition-colors"
          aria-label="Previous testimonials"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i * 3)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                Math.floor(current / 3) === i ? 'bg-teal' : 'bg-gray-300'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center hover:bg-teal transition-colors"
          aria-label="Next testimonials"
        >
          ›
        </button>
      </div>
    </div>
  )
}
