import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import CertVerifyBar from '@/components/CertVerifyBar'
import { books, WHATSAPP_BOOK, WHATSAPP_ENROLL } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Metabridge Academy | Gateway to Digital Literacy | Port Harcourt',
  description:
    "Africa's leading digital skills academy. Cybersecurity, Data Analytics, AI, and Blockchain training with globally-verified certificates. Based in Port Harcourt, Nigeria.",
  openGraph: {
    title: 'Metabridge Academy | Gateway to Digital Literacy',
    description:
      "Africa's leading digital skills academy. Globally-verified certificates in Cybersecurity, Data Analytics, AI & Blockchain.",
    url: 'https://metabridgeacademy.com',
  },
}

const stats = [
  { value: '500+', label: 'Graduates Trained' },
  { value: '4', label: 'Specialised Programmes' },
  { value: '15+', label: 'Countries Represented' },
  { value: '85%', label: 'Employment Rate' },
]

const courses = [
  {
    icon: '🛡️',
    title: 'Cybersecurity',
    tag: 'Certificate of Achievement',
    brief:
      'Master the principles, tools, and techniques that protect digital systems. Hands-on training from foundations to advanced practice.',
    href: '/courses#cybersecurity',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    tag: 'Certificate of Achievement',
    brief:
      'Transform raw data into powerful business decisions. Learn tools used by analysts at the world\'s leading companies.',
    href: '/courses#data-analytics',
  },
  {
    icon: '🤖',
    title: 'Artificial Intelligence',
    tag: 'Certificate of Achievement',
    brief:
      'Harness AI to automate work, generate content, and drive business growth. The skill every modern professional needs.',
    href: '/courses#artificial-intelligence',
  },
  {
    icon: '⛓️',
    title: 'Blockchain & Cryptocurrency',
    tag: 'Certificate of Achievement',
    brief:
      'Understand blockchain from the ground up. Built specifically for the African market with global Web3 context.',
    href: '/courses#blockchain',
  },
]

const bookGradients: Record<string, string> = {
  cybersecurity: 'linear-gradient(135deg, #0D4F5C 0%, #1B2A4A 100%)',
  'data-analytics': 'linear-gradient(135deg, #1E3A6E 0%, #4A1472 100%)',
  'artificial-intelligence': 'linear-gradient(135deg, #3B1060 0%, #1A1A6E 100%)',
  blockchain: 'linear-gradient(135deg, #1B2A4A 0%, #5C3D00 100%)',
}

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-[88vh] flex items-center circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="text-base">🌍</span>
              <span className="text-white/90 text-sm font-medium">Africa&apos;s Digital Skills Academy</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Become the Tech Professional{' '}
              <span className="text-orange">Every Employer Wants</span>
            </h1>

            <p className="text-white/85 text-lg max-w-2xl mb-8 leading-relaxed">
              At Metabridge Academy, we don&apos;t just teach technology — we transform careers. Join thousands
              of professionals across Africa and beyond who have built real skills, landed real jobs, and
              created real impact through our hands-on digital programmes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/courses" className="btn-primary text-base px-7 py-3.5">
                Start Learning Today
              </Link>
              <Link href="/books" className="btn-secondary text-base px-7 py-3.5">
                Explore Our Books
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70 text-sm">
              <span>🎓 500+ Graduates</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>🌍 15+ Countries</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>💼 85% Job Placement Rate</span>
            </div>
          </div>
        </div>

        {/* Decorative gradient blob */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <FadeInSection key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-navy mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-14">
            <h2 className="section-heading">Why Metabridge Academy?</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Industry-Relevant Curriculum',
                desc: 'Our programmes are built around what employers actually hire for — not outdated theory.',
              },
              {
                icon: '🌍',
                title: 'African Context, Global Standards',
                desc: 'We are the only academy that teaches digital skills through the lens of African markets, regulations, and real-world scenarios.',
              },
              {
                icon: '🏆',
                title: 'Certified. Verified. Recognised.',
                desc: 'Every graduate receives a digitally-verified certificate with QR authentication — trusted by employers worldwide.',
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 150} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">Our Programmes</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">From foundations to professional mastery</p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {courses.map((course, i) => (
              <FadeInSection key={course.title} delay={i * 100}>
                <div className="card h-full flex flex-col p-6 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-4xl mb-4">{course.icon}</div>
                  <span className="text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full w-fit mb-3">
                    {course.tag}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy mb-3">{course.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{course.brief}</p>
                  <Link
                    href={course.href}
                    className="text-teal font-semibold text-sm hover:text-navy transition-colors inline-flex items-center gap-1"
                  >
                    Learn More →
                  </Link>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="text-center">
            <a
              href={WHATSAPP_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Enroll Today
            </a>
          </div>
        </div>
      </section>

      {/* BOOKS PREVIEW */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">Our Textbooks</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">Written in Port Harcourt. Read across the world.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {books.map((book, i) => (
              <FadeInSection key={book.id} delay={i * 100}>
                <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {/* Book cover */}
                  <div
                    className="relative p-8 flex flex-col items-center justify-center text-center min-h-[220px]"
                    style={{ background: bookGradients[book.id] }}
                  >
                    <p className="font-heading text-lg font-bold text-white mb-2 leading-tight">{book.title}</p>
                    <p className="text-white/70 text-xs italic leading-relaxed">{book.subtitle}</p>
                    <p className="text-white/50 text-xs mt-4">By Metabridge Academy</p>
                  </div>
                  {/* Info below */}
                  <div className="p-5">
                    <div className="inline-block bg-orange text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                      {book.price}
                    </div>
                    <a
                      href={WHATSAPP_BOOK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-navy text-white font-semibold py-2.5 rounded-lg hover:bg-teal transition-colors text-sm"
                    >
                      Buy via WhatsApp
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="text-center">
            <Link href="/books" className="btn-outline text-base px-8 py-3">
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">What Our Graduates Say</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">Real people. Real results. Real careers.</p>
          </FadeInSection>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* AFRICA CONTEXT SECTION */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Built for Africa.{' '}
                <span className="text-orange">Ready for the World.</span>
              </h2>
              <p className="text-white/75 leading-relaxed text-lg">
                Nigeria is among the top countries globally for grassroots digital adoption — and demand for
                skilled tech professionals has never been higher. Yet access to quality, affordable,
                context-relevant digital education remains a gap. Metabridge Academy was founded to close that
                gap — equipping Nigerians and Africans with the exact skills that open doors locally and
                internationally.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: '🇳🇬', label: 'Nigeria-first curriculum' },
                  { icon: '🌍', label: 'Globally recognised' },
                  { icon: '📜', label: 'QR-verified certificates' },
                  { icon: '💼', label: '85% employment rate' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              {/* Abstract Africa illustration */}
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Stylized globe/map */}
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">🌍</div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Lagos', 'Abuja', 'PH', 'London', 'USA', 'Ghana'].map((city) => (
                          <span
                            key={city}
                            className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full text-center"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CERTIFICATE VERIFY CTA */}
      <section className="py-14 bg-gradient-to-r from-teal to-navy">
        <div className="container-custom text-center">
          <FadeInSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
              Is your certificate authentic?
            </h2>
            <p className="text-white/70 mb-8">Verify it instantly.</p>
            <CertVerifyBar />
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
