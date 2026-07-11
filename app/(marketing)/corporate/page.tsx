import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'

export const metadata: Metadata = {
  title: 'Corporate & Team Training',
  description:
    'Upskill your team with Metabridge Academy. Group training in Cybersecurity, Data Analytics, AI, and Blockchain for companies across Nigeria and Africa.',
  openGraph: {
    title: 'Corporate & Team Training | Metabridge Academy',
    description:
      'Practical digital skills training for organisations. Group enrolments, flexible scheduling, and team discounts available.',
    url: 'https://metabridgeacademy.com/corporate',
  },
}

const WHATSAPP_CORPORATE = 'https://wa.me/2348124228730?text=Hello%2C%20I%20am%20interested%20in%20corporate%20training%20for%20my%20team.'
const EMAIL_CORPORATE = 'mailto:admissions@metabridgeacademy.com?subject=Corporate%20Training%20Enquiry'

const benefits = [
  {
    icon: '📅',
    title: 'Flexible Scheduling',
    detail:
      'We adapt to your team\'s working hours. Classes can run on weekday evenings, weekends, or in intensive formats to minimise disruption to operations.',
  },
  {
    icon: '💰',
    title: 'Team Discounts',
    detail:
      '5% off for groups of 5 to 10 staff. 10% off for groups of 11 to 20. Custom pricing available for organisations enrolling 21 or more people.',
  },
  {
    icon: '📋',
    title: 'Progress Reports',
    detail:
      'HR and L&D managers receive regular attendance and assessment reports so you can track how your team is progressing through the programme.',
  },
  {
    icon: '🏆',
    title: 'Branded Certificates',
    detail:
      'Each staff member who completes a belt programme receives a QR-verified Metabridge Academy certificate, which can be shared on LinkedIn and added to their professional profile.',
  },
  {
    icon: '👨‍🏫',
    title: 'Dedicated Instructor Support',
    detail:
      'Your team gets a dedicated instructor contact for questions outside of class time, ensuring no one falls behind.',
  },
  {
    icon: '🎯',
    title: 'Customised Content Focus',
    detail:
      'We can tailor examples, case studies, and capstone projects to your industry, whether that is oil and gas, banking, healthcare, telecoms, or logistics.',
  },
]

const industries = [
  { icon: '🛢️', name: 'Oil & Gas' },
  { icon: '🏦', name: 'Banking & Fintech' },
  { icon: '📡', name: 'Telecoms' },
  { icon: '🏥', name: 'Healthcare' },
  { icon: '🏫', name: 'Education' },
  { icon: '📦', name: 'Logistics' },
  { icon: '⚖️', name: 'Legal & Compliance' },
  { icon: '🏗️', name: 'Construction & Engineering' },
]

const courses = [
  { icon: '🛡️', name: 'Cybersecurity', note: 'For IT teams, compliance officers, and risk managers' },
  { icon: '📊', name: 'Data Analytics', note: 'For analysts, finance teams, and operations staff' },
  { icon: '🤖', name: 'AI & Prompt Engineering', note: 'For all staff, regardless of technical background' },
  { icon: '⛓️', name: 'Blockchain & Cryptocurrency', note: 'For finance, legal, and strategy professionals' },
]

const steps = [
  {
    number: '01',
    title: 'Get in Touch',
    detail:
      'Send us a WhatsApp message or email with your organisation name, the number of staff you want to train, and the course(s) of interest.',
  },
  {
    number: '02',
    title: 'Receive Your Proposal',
    detail:
      'We will send a tailored proposal within 24 hours, covering the recommended belt level, schedule options, pricing, and any customisation for your sector.',
  },
  {
    number: '03',
    title: 'Enrol Your Team',
    detail:
      'Confirm the cohort, make payment, and we handle everything from there. Your team will receive onboarding details and class schedule directly.',
  },
]

export default function CorporatePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-24 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-white/80 text-sm font-medium">For Organisations</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Upskill Your Team.{' '}
                <span className="text-orange">Transform Your Organisation.</span>
              </h1>
              <p className="text-white/70 text-lg mb-8 max-w-2xl leading-relaxed">
                Metabridge Academy delivers practical, job-ready digital skills training directly to your workforce. From a team of five to an entire department, we build programmes around your schedule, your industry, and your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_CORPORATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-7 py-4 rounded-xl hover:bg-orange/90 transition-colors"
                >
                  💬 Enquire on WhatsApp
                </a>
                <a
                  href={EMAIL_CORPORATE}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/20 transition-colors"
                >
                  ✉️ Send an Email
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">Industries We Serve</h2>
            <p className="section-subheading">
              We have delivered training to professionals across these sectors and understand the unique context of each.
            </p>
          </FadeInSection>
          <FadeInSection>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {industries.map(ind => (
                <div
                  key={ind.name}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl block mb-2">{ind.icon}</span>
                  <p className="font-semibold text-navy text-sm">{ind.name}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">What Corporate Training Includes</h2>
            <p className="section-subheading">
              Everything your organisation needs for a smooth, measurable upskilling programme.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <FadeInSection key={b.title} delay={i * 80}>
                <div className="bg-light-bg rounded-2xl p-6 h-full">
                  <span className="text-3xl block mb-3">{b.icon}</span>
                  <h3 className="font-heading font-bold text-navy mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.detail}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE COURSES */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">Available Programmes</h2>
            <p className="section-subheading">
              All four courses are available for group delivery at Green Belt, Blue Belt, or Black Belt level.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {courses.map((course, i) => (
              <FadeInSection key={course.name} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4 h-full">
                  <span className="text-3xl flex-shrink-0">{course.icon}</span>
                  <div>
                    <h3 className="font-heading font-bold text-navy mb-1">{course.name}</h3>
                    <p className="text-gray-500 text-sm">{course.note}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={300}>
            <p className="text-center text-gray-400 text-sm mt-6">
              Not sure which course fits your team?{' '}
              <a href={WHATSAPP_CORPORATE} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline font-medium">
                Ask us on WhatsApp
              </a>{' '}
              and we will recommend the right programme and belt level.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Three simple steps from enquiry to your team in class.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <FadeInSection key={step.number} delay={i * 120}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading font-bold text-orange text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SUMMARY */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
              <div
                className="p-8 text-white"
                style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
              >
                <h3 className="font-heading text-2xl font-bold mb-2">Group Discount Structure</h3>
                <p className="text-white/70 text-sm">Applied automatically to all course fees based on group size.</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { range: '5 to 10 Staff', discount: '5% off', note: 'Contact us to arrange a group invoice' },
                  { range: '11 to 20 Staff', discount: '10% off', note: 'Dedicated cohort with flexible scheduling' },
                  { range: '21+ Staff', discount: 'Custom discount', note: 'Tailored programme, bespoke schedule and reporting' },
                ].map(row => (
                  <div key={row.range} className="px-8 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-navy text-sm">{row.range}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{row.note}</p>
                    </div>
                    <span className="font-bold text-orange text-sm whitespace-nowrap">{row.discount}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build a Digitally Skilled Team?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Send us your team size and preferred course. We will put together a proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_CORPORATE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-orange/90 transition-colors text-lg"
              >
                💬 Enquire on WhatsApp
              </a>
              <a
                href={EMAIL_CORPORATE}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
              >
                ✉️ Send an Email
              </a>
            </div>
            <p className="text-white/40 text-sm mt-6">
              Or call/WhatsApp: <span className="text-white/60">+234 812 422 8730</span>
            </p>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
