import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import BooksClient from '@/components/BooksClient'
import { books } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Textbooks',
  description:
    'Professional-grade textbooks in Cybersecurity, Data Analytics, AI, and Blockchain — written for African professionals, globally relevant. Buy via WhatsApp.',
  openGraph: {
    title: 'Metabridge Academy Textbooks',
    description:
      'Professional-grade. African-context. Globally relevant. Written in Port Harcourt, read across the world.',
    url: 'https://metabridgeacademy.com/books',
  },
}

export default function BooksPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-20 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-orange">Textbooks</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Professional-grade. African-context. Globally relevant.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* BOOKS GRID + PREVIEWS */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <BooksClient books={books} />
        </div>
      </section>
    </>
  )
}
