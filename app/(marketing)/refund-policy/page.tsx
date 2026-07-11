import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'Metabridge Academy refund and cancellation policy for course enrolments and book purchases.',
  openGraph: {
    title: 'Refund & Cancellation Policy | Metabridge Academy',
    url: 'https://metabridgeacademy.com/refund-policy',
  },
}

const policies = [
  {
    icon: '🎓',
    title: 'Course Enrolments',
    color: 'border-teal',
    items: [
      {
        heading: 'Full refund',
        detail:
          'You are entitled to a full refund if you cancel your enrolment before the first live class of your cohort. Contact us at least 24 hours before the session begins.',
      },
      {
        heading: '50% refund',
        detail:
          'If you cancel after attending the first class but before the third session, you will receive a 50% refund of your enrolment fee.',
      },
      {
        heading: 'No refund',
        detail:
          'Refunds are not available once you have attended three or more sessions. At this point the programme content has been substantially delivered.',
      },
      {
        heading: 'Cohort transfer (free)',
        detail:
          'If you are unable to continue, you may transfer your enrolment to an upcoming cohort at no additional charge, provided you request the transfer before your third session.',
      },
      {
        heading: 'Enrolment transfer to another person',
        detail:
          'You may transfer your enrolment to a colleague or family member at no charge, as long as the class has not yet started. Contact us to arrange this.',
      },
    ],
  },
  {
    icon: '📚',
    title: 'Book Purchases',
    color: 'border-orange',
    items: [
      {
        heading: 'No refunds on digital downloads',
        detail:
          'All book purchases are digital PDF downloads. Because the file is delivered immediately upon payment confirmation, we are unable to offer refunds once the download link has been accessed.',
      },
      {
        heading: 'Download issues',
        detail:
          'If you experience a technical problem accessing your download, contact us within 48 hours and we will resolve it or re-send your file promptly.',
      },
    ],
  },
  {
    icon: '⚠️',
    title: 'Exceptional Circumstances',
    color: 'border-blue-400',
    items: [
      {
        heading: 'Medical or family emergencies',
        detail:
          'We review exceptional circumstances on a case-by-case basis. If a serious medical or family emergency prevents you from continuing, contact us with relevant documentation and we will do our best to accommodate you with a refund or transfer.',
      },
      {
        heading: 'Programme cancellation by Metabridge Academy',
        detail:
          'In the unlikely event that we cancel a cohort, all affected students will receive a full refund or the option to transfer to the next available cohort.',
      },
    ],
  },
]

export default function RefundPolicyPage() {
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
              <span className="text-white/80 text-sm font-medium">Policies</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Refund &amp; Cancellation <span className="text-orange">Policy</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We want every student to enrol with confidence. Here is exactly what to expect if your plans change.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="space-y-8">
            {policies.map((policy, i) => (
              <FadeInSection key={policy.title} delay={i * 100}>
                <div className={`bg-white rounded-2xl shadow-sm border-t-4 ${policy.color} overflow-hidden`}>
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">{policy.icon}</span>
                      <h2 className="font-heading text-xl font-bold text-navy">{policy.title}</h2>
                    </div>
                    <div className="space-y-5">
                      {policy.items.map(item => (
                        <div key={item.heading} className="flex gap-4">
                          <span className="text-teal font-bold mt-0.5 flex-shrink-0">✓</span>
                          <div>
                            <p className="font-semibold text-navy text-sm mb-1">{item.heading}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* HOW TO REQUEST */}
          <FadeInSection delay={300}>
            <div className="mt-10 bg-navy rounded-2xl p-8 text-center">
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                How to Request a Refund or Transfer
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                Send an email to our admissions team with your full name, payment reference number, and the reason for your request. We respond within 5 business days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:admissions@metabridgeacademy.com"
                  className="inline-flex items-center gap-2 bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors text-sm"
                >
                  ✉️ admissions@metabridgeacademy.com
                </a>
                <a
                  href="https://wa.me/2348124228730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={350}>
            <p className="text-center text-gray-400 text-xs mt-8">
              Last updated: July 2026. Questions?{' '}
              <Link href="/contact" className="text-teal hover:underline">
                Contact us
              </Link>.
            </p>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
