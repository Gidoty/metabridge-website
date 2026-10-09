'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { QUOTE_TESTIMONIALS } from '@/lib/testimonials'

interface Props {
  variant?: 'hero' | 'section'
  onOpen?: () => void
}

export default function StudentStoriesButton({ variant = 'hero', onOpen }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const triggerClass =
    variant === 'hero'
      ? 'flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white text-sm border border-white/25 hover:bg-white/10 transition-colors backdrop-blur-sm w-full text-center'
      : 'inline-flex items-center gap-2 border-2 border-navy text-navy font-bold px-8 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors text-base'

  return (
    <>
      <button onClick={() => { onOpen?.(); setOpen(true) }} className={triggerClass}>
        💬 Student Testimonials
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-3 pt-12 sm:pt-16">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal panel */}
          <div
            className="relative z-10 bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Sticky header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">
                  Testimonials from Our Students
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                  Real feedback from real graduates and students, in their own words
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-600 font-bold text-base shrink-0 ml-4"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-10">

              {/* ── Quote cards ── */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                    Student Stories
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  Graduates and students sharing the impact of their Metabridge Academy training.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUOTE_TESTIMONIALS.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5 border border-gray-200 bg-gray-50 flex flex-col"
                    >
                      <div className="flex mb-3">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span
                            key={si}
                            className={`text-base ${si < t.rating ? 'text-orange' : 'text-gray-200'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 italic text-sm leading-relaxed flex-1 mb-4">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="border-t border-gray-200 pt-3">
                        <p className="font-semibold text-navy text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                        <span className="inline-block mt-1.5 text-xs font-medium text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                          {t.course}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
