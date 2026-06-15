'use client'

import { useState, FormEvent } from 'react'

const subjects = [
  'Course Enrollment Enquiry',
  'Book Purchase',
  'Certificate Verification Help',
  'Corporate Training',
  'Partnership Opportunity',
  'General Question',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Submit to WhatsApp as fallback (form message formatted for WhatsApp)
      const message = encodeURIComponent(
        `*New Contact Form Submission — Metabridge Academy*\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
      )
      // Open WhatsApp with the form data
      window.open(`https://wa.me/2348124228730?text=${message}`, '_blank')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal focus:outline-none text-gray-800 transition-colors placeholder-gray-300 text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Subject</label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select a subject...</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          rows={5}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-teal transition-colors disabled:opacity-60 text-base"
      >
        {status === 'loading' ? '⏳ Sending...' : '📨 Send Message via WhatsApp'}
      </button>

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm text-center">
          ✅ Your message has been opened in WhatsApp. Thank you!
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm text-center">
          Something went wrong. Please try again or message us directly on WhatsApp.
        </div>
      )}
    </form>
  )
}
