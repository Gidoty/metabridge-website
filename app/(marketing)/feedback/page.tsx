import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import FeedbackFormClient from './FeedbackFormClient'

export const metadata: Metadata = {
  title: 'Share Your Experience',
  description:
    'Tell us about your Metabridge Academy journey. Your feedback helps future students and makes our programmes better.',
  openGraph: {
    title: 'Share Your Experience | Metabridge Academy',
    url: 'https://metabridgeacademy.com/feedback',
  },
}

export default function FeedbackPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-20 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-white/80 text-sm font-medium">Graduate Feedback</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
              Tell Us About Your{' '}
              <span className="text-orange">Metabridge Journey</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Your honest feedback helps us improve our programmes and helps future students make the right choice. Thank you for taking a few minutes to share your experience.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FORM */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FeedbackFormClient />
        </div>
      </section>
    </>
  )
}
