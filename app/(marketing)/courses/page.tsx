import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'
import { WHATSAPP_ENROLL } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Courses & Programmes',
  description:
    'Explore Metabridge Academy programmes in Cybersecurity, Data Analytics, Artificial Intelligence, and Blockchain. Free foundations and paid professional certifications available.',
  openGraph: {
    title: 'Courses & Programmes | Metabridge Academy',
    description:
      'Free and paid digital skills programmes with globally-verified certificates. Port Harcourt, Nigeria.',
    url: 'https://metabridgeacademy.com/courses',
  },
}

const freePrograms = [
  {
    id: 'cybersecurity-free',
    icon: '🛡️',
    title: 'Cybersecurity Foundations',
    brief:
      'Build a solid foundation in cybersecurity concepts, terminology, and best practices. Understand threats, defences, and the tools that security professionals use every day.',
  },
  {
    id: 'data-free',
    icon: '📊',
    title: 'Data Analytics Foundations',
    brief:
      'Learn what data analytics is, how organisations use it, and what tools power the profession. Perfect first step before the full professional programme.',
  },
  {
    id: 'ai-free',
    icon: '🤖',
    title: 'Artificial Intelligence Foundations',
    brief:
      'Understand how AI works, what large language models are, and how AI is transforming industries. No technical background required.',
  },
  {
    id: 'blockchain-free',
    icon: '⛓️',
    title: 'Blockchain Fundamentals',
    brief:
      'Grasp the core concepts behind blockchain, cryptocurrency, and decentralisation — and why these technologies matter for African economies.',
  },
]

const paidPrograms = [
  {
    id: 'cybersecurity',
    icon: '🛡️',
    title: 'Cybersecurity',
    duration: '14 Weeks Intensive',
    cert: 'Certificate of Achievement',
    verified: 'QR-Verified Certificate',
    price: '$75 (NGN 100,000)',
    outcomes: [
      'Understand cryptographic principles and how blockchain security works',
      'Identify and defend against the most common cyberattacks',
      'Perform basic penetration testing and vulnerability assessment',
      'Implement cybersecurity frameworks in organizational settings',
      'Build and document a personal cybersecurity incident response plan',
    ],
    anchorId: 'cybersecurity',
    color: 'border-teal',
    badge: 'bg-teal/10 text-teal',
  },
  {
    id: 'data-analytics',
    icon: '📊',
    title: 'Data Analytics',
    duration: '12 Weeks Intensive',
    cert: 'Certificate of Achievement',
    verified: 'QR-Verified Certificate',
    price: '$50 (NGN 75,000)',
    outcomes: [
      'Clean, analyse, and visualize data using industry-standard tools',
      'Build dashboards that communicate insights to decision-makers',
      'Apply statistical thinking to solve business problems',
      'Work with Excel, SQL, and data visualization tools professionally',
      'Translate data findings into strategic business recommendations',
    ],
    anchorId: 'data-analytics',
    color: 'border-blue-500',
    badge: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'artificial-intelligence',
    icon: '🤖',
    title: 'Artificial Intelligence',
    duration: '5 Weeks Intensive',
    cert: 'Certificate of Achievement',
    verified: 'QR-Verified Certificate',
    price: '$20 (NGN 30,000)',
    outcomes: [
      'Write high-performance prompts for any AI model',
      'Automate professional workflows using AI tools',
      'Build AI-powered content and marketing systems',
      'Evaluate and compare AI models for specific business tasks',
      'Apply responsible AI principles in professional contexts',
    ],
    anchorId: 'artificial-intelligence',
    color: 'border-purple-500',
    badge: 'bg-purple-50 text-purple-700',
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: 'Blockchain & Cryptocurrency',
    duration: '6 Weeks Intensive',
    cert: 'Certificate of Achievement',
    verified: 'QR-Verified Certificate',
    price: '$35 (NGN 50,000)',
    outcomes: [
      'Understand how blockchain technology works at a technical level',
      'Evaluate cryptocurrencies, DeFi protocols, and digital assets',
      'Navigate the Nigerian and African crypto regulatory landscape',
      'Understand wallets, security, and self-custody principles',
      'Identify professional opportunities in the Web3 ecosystem',
    ],
    anchorId: 'blockchain',
    color: 'border-orange',
    badge: 'bg-orange/10 text-orange',
  },
]

export default function CoursesPage() {
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
              Find Your <span className="text-orange">Programme</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Start free or go professional. Every path leads to a verified certificate and a better career.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FREE TRAINING */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          {/* Banner */}
          <FadeInSection>
            <div className="bg-gradient-to-r from-teal to-teal/80 rounded-2xl p-7 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  FREE TRAINING
                </span>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Start Free — Build Real Skills
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  Certificate of Completion · No payment required
                </p>
              </div>
              <a
                href={WHATSAPP_ENROLL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-teal font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
              >
                Enroll Free →
              </a>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freePrograms.map((prog, i) => (
              <FadeInSection key={prog.id} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">{prog.icon}</div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit mb-3">
                    FREE
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy mb-3">{prog.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{prog.brief}</p>
                  <a
                    href={WHATSAPP_ENROLL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-teal text-white font-semibold py-2.5 rounded-lg hover:bg-teal/90 transition-colors text-sm"
                  >
                    Enroll Free
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PAID PROGRAMMES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Banner */}
          <FadeInSection>
            <div className="bg-gradient-to-r from-navy to-navy-dark rounded-2xl p-7 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block bg-orange/20 text-orange text-xs font-bold px-3 py-1 rounded-full mb-2">
                  PROFESSIONAL CERTIFICATION
                </span>
                <h2 className="font-heading text-2xl font-bold text-white">
                  Professional Certification — Employer Recognised
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  QR-Verified Certificate of Achievement · Textbook Included
                </p>
              </div>
              <a
                href={WHATSAPP_ENROLL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors text-sm whitespace-nowrap"
              >
                Enroll Now →
              </a>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {paidPrograms.map((prog, i) => (
              <FadeInSection key={prog.id} delay={i * 100}>
                <div
                  id={prog.anchorId}
                  className={`bg-white rounded-2xl shadow-md border-t-4 ${prog.color} overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col`}
                >
                  <div className="p-7 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{prog.icon}</div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.badge}`}>
                        {prog.cert}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-navy mb-2">{prog.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        ⏱️ {prog.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        🔐 {prog.verified}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        🎯 Capstone Project
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        💼 Build Portfolio
                      </span>
                    </div>

                    <div className="bg-orange/10 rounded-xl px-4 py-3 mb-5 inline-block">
                      <span className="text-orange font-bold text-lg">{prog.price}</span>
                    </div>

                    <h4 className="font-semibold text-navy text-sm mb-3">Learning Outcomes:</h4>
                    <ul className="space-y-2">
                      {prog.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-7 pt-0 space-y-2">
                    <Link
                      href={`/checkout?type=course&item=${prog.id}`}
                      className="block w-full text-center bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors"
                    >
                      Pay &amp; Enrol →
                    </Link>
                    <a
                      href={WHATSAPP_ENROLL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-navy/5 text-navy font-semibold py-2.5 rounded-xl hover:bg-navy/10 transition-colors text-sm"
                    >
                      💬 Chat with Us First
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-gradient-to-r from-teal to-navy text-center">
        <div className="container-custom">
          <FadeInSection>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Message us on WhatsApp and our team will guide you to the right programme.
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
