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
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleOpen() {
    onOpen?.()
    if (onOpen) {
      // Wait for drawer close animation before opening modal
      setTimeout(() => setOpen(true), 320)
    } else {
      setOpen(true)
    }
  }

  const triggerClass =
    variant === 'hero'
      ? 'flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white text-sm border border-white/25 hover:bg-white/10 transition-colors backdrop-blur-sm w-full text-center'
      : 'inline-flex items-center gap-2 border-2 border-navy text-navy font-bold px-8 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors text-base'

  return (
    <>
      <button onClick={handleOpen} className={triggerClass}>
        💬 Student Testimonials
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[200] flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal panel — fills most of the screen, starts below the nav */}
          <div
            className="relative z-10 bg-white w-full mx-auto flex flex-col overflow-hidden shadow-2xl"
            style={{
              maxWidth: '900px',
              marginTop: '64px',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: 'calc(100vh - 80px)',
              borderRadius: '1rem 1rem 0 0',
            }}
          >
            {/* Sticky header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
              <div>
                <h2 className="font-heading text-base sm:text-xl font-bold text-navy">
                  Student Testimonials
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  Real words from graduates and students — unedited
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-600 font-bold text-lg shrink-0 ml-3"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-8">
                {QUOTE_TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border border-gray-200 bg-gray-50 flex flex-col"
                  >
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <span
                          key={si}
                          className={`text-sm ${si < t.rating ? 'text-orange' : 'text-gray-200'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 italic text-sm leading-relaxed flex-1 mb-3">
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
        </div>,
        document.body
      )}
    </>
  )
}
