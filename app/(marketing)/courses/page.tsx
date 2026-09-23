import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import { WHATSAPP_ENROLL } from '@/lib/data'
import CourseExplorer from '@/components/CourseExplorer'

export const metadata: Metadata = {
  title: 'Courses & Programmes',
  description:
    'Explore Metabridge Academy belt-based programmes in Cybersecurity, Data Analytics, Artificial Intelligence, Blockchain, and Web Development. Green Belt, Blue Belt, and Black Belt certifications for every level.',
  openGraph: {
    title: 'Courses & Programmes | Metabridge Academy',
    description:
      'Three belt levels. Five courses. One career transformation. Choose your path at Metabridge Academy.',
    url: 'https://metabridgeacademy.com/courses',
  },
}

export default function CoursesPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-24 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-white/80 text-sm font-medium">3 Levels of Mastery · 5 Courses · Special Domains</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
              Choose Your Belt.{' '}
              <span className="text-orange">Own Your Future.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Every course follows a three-tier belt progression: Green Belt foundations, Blue Belt professional skills, and Black Belt expert mastery. Select a course below to explore its full curriculum, projects, and career outcomes.
            </p>
            {/* Belt legend */}
            <div className="inline-flex flex-wrap justify-center gap-4">
              {[
                { emoji: '🟢', name: 'Green Belt', sub: 'Foundation', color: '#4ade80' },
                { emoji: '🔵', name: 'Blue Belt', sub: 'Professional', color: '#93c5fd' },
                { emoji: '⚫', name: 'Black Belt', sub: 'Expert Mastery', color: '#fbbf24' },
              ].map(b => (
                <div
                  key={b.name}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2"
                >
                  <span className="text-lg">{b.emoji}</span>
                  <div className="text-left">
                    <p style={{ color: b.color }} className="text-xs font-bold leading-none">{b.name}</p>
                    <p className="text-white/50 text-xs">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* COURSE EXPLORER */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <CourseExplorer />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
      >
        <div className="container-custom text-center">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Belt to Start With?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our admissions team will help you find the right level and course for your goals and background. No sales pressure.
            </p>
            <a
              href={WHATSAPP_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-navy font-bold px-8 py-4 rounded-xl hover:bg-orange hover:text-white transition-colors text-lg"
            >
              💬 Chat with Us on WhatsApp
            </a>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
