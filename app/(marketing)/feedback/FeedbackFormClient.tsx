'use client'

import { useState, FormEvent } from 'react'

const COURSES = [
  'Cybersecurity',
  'Data Analytics',
  'Artificial Intelligence',
  'Blockchain & Cryptocurrency',
]

const BELTS = [
  { value: 'Green Belt', label: 'Green Belt (Foundation)' },
  { value: 'Blue Belt', label: 'Blue Belt (Professional)' },
  { value: 'Black Belt', label: 'Black Belt (Expert Mastery)' },
]

const RATING_ASPECTS = [
  { key: 'rating_content',    label: 'Course Content Quality' },
  { key: 'rating_instructor', label: 'Instructor Support' },
  { key: 'rating_practical',  label: 'Practical Application' },
  { key: 'rating_support',    label: 'Overall Support & Communication' },
]

interface Ratings {
  rating_content: number
  rating_instructor: number
  rating_practical: number
  rating_support: number
  rating_overall: number
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 leading-none"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <span className={n <= (hovered || value) ? 'text-orange-400' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  )
}

export default function FeedbackFormClient() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    candidate_name: '',
    display_name: '',
    location: '',
    course_name: '',
    belt_level: '',
    would_recommend: '' as '' | 'yes' | 'no',
    enjoyed_most: '',
    suggestions: '',
    message_for_future: '',
    consent: false,
  })

  const [ratings, setRatings] = useState<Ratings>({
    rating_content: 0,
    rating_instructor: 0,
    rating_practical: 0,
    rating_support: 0,
    rating_overall: 0,
  })

  const setRating = (key: keyof Ratings, value: number) =>
    setRatings((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (ratings.rating_overall === 0) {
      setError('Please give an overall star rating before submitting.')
      return
    }
    if (!form.consent) {
      setError('Please tick the consent box before submitting.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...ratings }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      setSubmitted(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-heading text-2xl font-bold text-navy mb-3">Thank You!</h2>
        <p className="text-gray-600 mb-3">Your feedback has been submitted successfully.</p>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Our team will review your response. If approved, your message will appear on the Metabridge Academy website as a testimonial.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">

      {/* Section 1: About You */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-7 py-4 text-white"
          style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
        >
          <h3 className="font-heading font-bold">About You</h3>
        </div>
        <div className="p-7 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.candidate_name}
              onChange={(e) => setForm((f) => ({ ...f, candidate_name: e.target.value }))}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Display Name{' '}
              <span className="text-gray-400 font-normal">(how your name appears publicly)</span>
            </label>
            <input
              type="text"
              value={form.display_name}
              onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
              placeholder='e.g. "Prince N." — leave blank to use your first name only'
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              City & Country{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="e.g. Port Harcourt, Nigeria"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Course Completed <span className="text-orange-500">*</span>
              </label>
              <select
                required
                value={form.course_name}
                onChange={(e) => setForm((f) => ({ ...f, course_name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors bg-white"
              >
                <option value="">Select course</option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Belt Level <span className="text-orange-500">*</span>
              </label>
              <select
                required
                value={form.belt_level}
                onChange={(e) => setForm((f) => ({ ...f, belt_level: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors bg-white"
              >
                <option value="">Select belt</option>
                {BELTS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Rate Your Experience */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-7 py-4 text-white"
          style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
        >
          <h3 className="font-heading font-bold">Rate Your Experience</h3>
        </div>
        <div className="px-7 py-4">
          <div className="divide-y divide-gray-100">
            {RATING_ASPECTS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-4 gap-4">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <StarInput
                  value={ratings[key as keyof Ratings]}
                  onChange={(v) => setRating(key as keyof Ratings, v)}
                />
              </div>
            ))}
          </div>
          <div className="py-5 border-t-2 border-orange-100 mt-2">
            <div className="flex items-center justify-between gap-4">
              <p className="font-heading font-bold text-navy">
                Overall Rating <span className="text-orange-500">*</span>
              </p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating('rating_overall', n)}
                    className="text-3xl transition-transform hover:scale-110 leading-none"
                    aria-label={`${n} overall star${n > 1 ? 's' : ''}`}
                  >
                    <span className={n <= ratings.rating_overall ? 'text-orange-400' : 'text-gray-200'}>★</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Quick Questions */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-7 py-4 text-white"
          style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
        >
          <h3 className="font-heading font-bold">Quick Questions</h3>
        </div>
        <div className="p-7">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Would you recommend Metabridge Academy to a friend or colleague?
          </p>
          <div className="flex gap-3">
            {(['yes', 'no'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setForm((f) => ({ ...f, would_recommend: v }))}
                className={`px-8 py-2.5 rounded-xl font-semibold text-sm border-2 transition-colors ${
                  form.would_recommend === v
                    ? 'bg-navy border-navy text-white'
                    : 'border-gray-200 text-gray-600 hover:border-navy'
                }`}
              >
                {v === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Your Story */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div
          className="px-7 py-4 text-white"
          style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
        >
          <h3 className="font-heading font-bold">Your Story</h3>
        </div>
        <div className="p-7 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              What did you enjoy most about the programme? <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={form.enjoyed_most}
              onChange={(e) => setForm((f) => ({ ...f, enjoyed_most: e.target.value }))}
              placeholder="Tell us what stood out for you..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              A message for future students <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={form.message_for_future}
              onChange={(e) => setForm((f) => ({ ...f, message_for_future: e.target.value }))}
              placeholder="What would you say to someone considering enrolling at Metabridge Academy?"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              This is the quote that may appear on our website as a testimonial.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Any suggestions for how we can improve?{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={form.suggestions}
              onChange={(e) => setForm((f) => ({ ...f, suggestions: e.target.value }))}
              placeholder="Honest feedback helps us get better..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-navy transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Consent + Submit */}
      <div className="bg-white rounded-2xl shadow-sm p-7">
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-teal-600"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            I agree that my feedback and message for future students may be reviewed and published on the Metabridge Academy website as a testimonial. Only my display name (not my full name) will be shown publicly.
          </span>
        </label>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange text-white font-bold py-4 rounded-xl hover:bg-orange/90 transition-colors disabled:opacity-60 text-lg"
        >
          {submitting ? '⏳ Submitting...' : '✉️ Submit My Feedback'}
        </button>
        <p className="text-center text-gray-400 text-xs mt-3">
          Your response is reviewed by our team before it is published publicly.
        </p>
      </div>
    </form>
  )
}
