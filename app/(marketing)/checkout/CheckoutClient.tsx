'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { COURSE_CATALOG, BOOK_CATALOG, BELT_PRICING, BELT_LABEL, formatNGN } from '@/lib/products'
import type { CourseId, BookId, BeltLevel } from '@/lib/products'

type Tab = 'course' | 'book'

export default function CheckoutClient() {
  const searchParams = useSearchParams()

  const initType = searchParams.get('type') === 'book' ? 'book' : ('course' as Tab)
  const initItem = searchParams.get('item') ?? ''
  const initBelt = (searchParams.get('belt') ?? '') as BeltLevel | ''

  // Belt mode: a specific course + belt was chosen from the courses page
  const isBeltMode =
    initType === 'course' &&
    initItem in COURSE_CATALOG &&
    (initBelt === 'green' || initBelt === 'blue' || initBelt === 'black')

  const beltPrice = isBeltMode ? (BELT_PRICING[initItem]?.[initBelt as BeltLevel] ?? 0) : 0

  const [tab, setTab] = useState<Tab>(initType)
  const [selectedCourses, setSelectedCourses] = useState<Set<CourseId>>(() => {
    if (initType === 'course' && !isBeltMode && initItem in COURSE_CATALOG) {
      return new Set<CourseId>([initItem as CourseId])
    }
    return new Set<CourseId>()
  })
  const [selectedBooks, setSelectedBooks] = useState<Set<BookId>>(() => {
    if (initType === 'book' && initItem in BOOK_CATALOG) {
      return new Set<BookId>([initItem as BookId])
    }
    return new Set<BookId>()
  })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleCourse = (id: CourseId) => {
    setSelectedCourses(prev => {
      const next = new Set<CourseId>(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleBook = (id: BookId) => {
    setSelectedBooks(prev => {
      const next = new Set<BookId>(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const courses = Object.values(COURSE_CATALOG)
  const booksArr = Object.values(BOOK_CATALOG)

  const courseIds = Array.from(selectedCourses)
  const bookIds = Array.from(selectedBooks)

  const courseTotal = courseIds.reduce((sum, id) => sum + COURSE_CATALOG[id].price, 0)
  const bookTotal = bookIds.reduce((sum, id) => sum + BOOK_CATALOG[id].price, 0)

  const total = isBeltMode ? beltPrice : tab === 'course' ? courseTotal : bookTotal

  const selectedItems = isBeltMode
    ? [{ id: initItem, type: 'course' as const, belt: initBelt as BeltLevel }]
    : tab === 'course'
      ? courseIds.map(id => ({ id, type: 'course' as const, belt: undefined }))
      : bookIds.map(id => ({ id, type: 'book' as const, belt: undefined }))

  const isReady = selectedItems.length > 0 && name.trim() && phone.trim() && email.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isReady) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          items: selectedItems,
        }),
      })
      const data = await res.json()

      if (!data.authorization_url) {
        setError(data.error ?? 'Payment initialization failed. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.authorization_url
    } catch {
      setError('A network error occurred. Please try again.')
      setLoading(false)
    }
  }

  const beltColors: Record<BeltLevel, string> = {
    green: '#15803d',
    blue: '#1d4ed8',
    black: '#111827',
  }

  return (
    <div className="min-h-screen bg-light-bg py-12 px-4">
      <div className="container-custom max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href={tab === 'course' ? '/courses' : '/books'}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-8 transition-colors"
        >
          Back to {tab === 'course' ? 'Courses' : 'Books'}
        </Link>

        <h1 className="font-heading text-3xl font-bold text-navy mb-1">Complete Your Purchase</h1>
        <p className="text-gray-500 text-sm mb-8">
          Secure payment via Paystack · Card, bank transfer, USSD &amp; more
        </p>

        {/* Tab switcher — only show if not in belt mode */}
        {!isBeltMode && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {(['course', 'book'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  tab === t
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy border border-gray-200 hover:border-navy'
                }`}
              >
                {t === 'course' ? '🎓 Course Enrolment' : '📚 Book Purchase'}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Item selection */}
          <div className="lg:col-span-3">
            {isBeltMode ? (
              /* Belt mode: show the selected course + belt as a locked card */
              <div>
                <h2 className="font-heading font-bold text-navy text-lg mb-4">Your Selected Programme</h2>
                <div
                  className="rounded-2xl overflow-hidden border-2 border-navy/20"
                >
                  <div
                    style={{ background: `linear-gradient(135deg, ${beltColors[initBelt as BeltLevel]} 0%, #0a0a0a 100%)` }}
                    className="p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {COURSE_CATALOG[initItem as CourseId]?.icon}
                      </span>
                      <div>
                        <p className="font-bold text-white text-base">
                          {COURSE_CATALOG[initItem as CourseId]?.name}
                        </p>
                        <p className="text-white/70 text-sm">
                          {BELT_LABEL[initBelt as BeltLevel]}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-5 py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Programme fee</span>
                    <span className="font-bold text-orange text-lg">{formatNGN(beltPrice)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Want a different level?{' '}
                  <Link href="/courses" className="text-navy hover:text-teal underline">
                    Return to courses
                  </Link>{' '}
                  and choose another belt.
                </p>
              </div>
            ) : (
              /* Normal multi-select mode */
              <div>
                <h2 className="font-heading font-bold text-navy text-lg mb-4">
                  {tab === 'course' ? 'Select Course(s)' : 'Select Book(s)'}
                </h2>
                <div className="space-y-3">
                  {tab === 'course'
                    ? courses.map(course => {
                        const id = course.id as CourseId
                        const selected = selectedCourses.has(id)
                        return (
                          <button
                            key={id}
                            onClick={() => toggleCourse(id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              selected
                                ? 'border-navy bg-navy/5'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  selected ? 'border-navy bg-navy' : 'border-gray-300'
                                }`}
                              >
                                {selected && (
                                  <span className="text-white text-xs leading-none">✓</span>
                                )}
                              </div>
                              <span className="text-2xl">{course.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-navy">{course.name}</p>
                                <p className="text-xs text-gray-500">Starting from {formatNGN(course.price)}</p>
                              </div>
                            </div>
                          </button>
                        )
                      })
                    : booksArr.map(book => {
                        const id = book.id as BookId
                        const selected = selectedBooks.has(id)
                        return (
                          <button
                            key={id}
                            onClick={() => toggleBook(id)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              selected
                                ? 'border-navy bg-navy/5'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  selected ? 'border-navy bg-navy' : 'border-gray-300'
                                }`}
                              >
                                {selected && (
                                  <span className="text-white text-xs leading-none">✓</span>
                                )}
                              </div>
                              <span className="text-2xl">📖</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-navy text-sm">{book.name}</p>
                                <p className="text-xs text-gray-500 truncate">{book.subtitle}</p>
                              </div>
                              <span className="font-bold text-orange flex-shrink-0">
                                {formatNGN(book.price)}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary + form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-heading font-bold text-navy text-lg mb-4">Order Summary</h2>

              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-sm mb-5">No items selected yet.</p>
              ) : (
                <div className="space-y-2 mb-5">
                  {isBeltMode ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {COURSE_CATALOG[initItem as CourseId]?.name}{' '}
                        <span className="text-gray-400">({BELT_LABEL[initBelt as BeltLevel]})</span>
                      </span>
                      <span className="font-semibold text-navy">{formatNGN(beltPrice)}</span>
                    </div>
                  ) : tab === 'course' ? (
                    courseIds.map(id => (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{COURSE_CATALOG[id].name}</span>
                        <span className="font-semibold text-navy">
                          {formatNGN(COURSE_CATALOG[id].price)}
                        </span>
                      </div>
                    ))
                  ) : (
                    bookIds.map(id => (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{BOOK_CATALOG[id].name}</span>
                        <span className="font-semibold text-navy">
                          {formatNGN(BOOK_CATALOG[id].price)}
                        </span>
                      </div>
                    ))
                  )}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span className="text-navy">Total</span>
                    <span className="text-orange text-lg">{formatNGN(total)}</span>
                  </div>
                </div>
              )}

              <hr className="my-5 border-gray-100" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isReady || loading}
                  className="w-full bg-orange text-white font-bold py-3.5 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading
                    ? 'Redirecting to payment…'
                    : total > 0
                      ? `Pay ${formatNGN(total)} →`
                      : 'Select items to continue'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Secured by Paystack · Your card details are never shared with us
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
