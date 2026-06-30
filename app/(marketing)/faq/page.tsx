import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import FaqAccordion from '@/components/FaqAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Got questions about Metabridge Academy? Find answers about enrolment, payment, training format, certificates, and more.',
  openGraph: {
    title: 'FAQ | Metabridge Academy',
    description: 'Everything you need to know before you enrol — payment, training format, certificates, and more.',
    url: 'https://metabridgeacademy.com/faq',
  },
}

const faqCategories = [
  {
    category: 'Payment & Enrolment',
    icon: '💳',
    faqs: [
      {
        question: 'Can I pay in instalments?',
        answer:
          'Yes. Metabridge Academy offers flexible instalment payment plans. You can begin your training immediately and pay off your balance progressively — you do not need to pay in full before you start learning. Contact us on WhatsApp to discuss a payment plan that works for your situation.',
      },
      {
        question: 'How do I enrol in a programme?',
        answer:
          'Enrolment is straightforward — message us on WhatsApp at +234 812 422 8730 or click any “Enrol Now” button on this website. Our admissions team will confirm your chosen programme, share payment details, and get you started within 24 hours.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept bank transfers and other convenient local payment options. Our admissions team will provide full payment details when you reach out via WhatsApp or email at admissions@metabridgeacademy.com.',
      },
      {
        question: 'Do you offer discounts for groups or organisations?',
        answer:
          'Yes. We offer special pricing for organisations enrolling multiple staff members and for referred students. Contact our admissions team at admissions@metabridgeacademy.com for a tailored group training proposal.',
      },
      {
        question: 'When does the next cohort start?',
        answer:
          'Metabridge Academy runs four cohorts per year — one every quarter. New intakes begin in January (Q1), April (Q2), July (Q3), and October (Q4). This means you never have to wait long before the next cohort opens. Contact us on WhatsApp and our admissions team will confirm the exact start date for your chosen programme.',
      },
    ],
  },
  {
    category: 'Training Format',
    icon: '🖥️',
    faqs: [
      {
        question: 'Is the training online or in-person?',
        answer:
          'All programmes are delivered online through live interactive sessions with your instructor and cohort. Every class is recorded and made available to enrolled students, so you can revisit any lesson at any time — ideal for working professionals managing busy schedules.',
      },
      {
        question: 'What if I miss a live class?',
        answer:
          'No problem at all. Every live session is recorded and shared with enrolled students. You can watch the recording at your own pace, catch up on any content you missed, and continue your programme without falling behind.',
      },
      {
        question: 'How many hours per week does the training require?',
        answer:
          'Our programmes are designed to fit around professional schedules. Expect to invest approximately 4–6 hours per week across live sessions, recorded content, and practical assignments. The exact commitment varies slightly by programme.',
      },
      {
        question: 'How many students are in each cohort?',
        answer:
          'We keep cohort sizes intentionally manageable to ensure every student receives quality attention from instructors. This gives you a genuinely interactive learning experience — not a passive lecture hall.',
      },
      {
        question: 'Can I take more than one course?',
        answer:
          'Absolutely. Many students combine programmes — for example, pairing the AI course with Data Analytics, or Blockchain with Cybersecurity. Contact us to discuss the best learning path for your career goals.',
      },
    ],
  },
  {
    category: 'Prerequisites & Curriculum',
    icon: '📚',
    faqs: [
      {
        question: 'Do I need any prior experience or qualifications to enrol?',
        answer:
          'None at all. Every Metabridge Academy programme starts from the absolute basics and takes you progressively to a professional level. No technical background, prior degree, or qualifications are required — just commitment and a willingness to learn.',
      },
      {
        question: 'How long is each programme?',
        answer:
          'Cybersecurity: 14 weeks (including Capstone Project). Data Analytics: 12 weeks (including Capstone Project). Artificial Intelligence: 5 weeks (including Capstone Project). Blockchain & Cryptocurrency: 6 weeks (including Capstone Project). All durations include structured labs, assessments, and the final Capstone.',
      },
      {
        question: 'Does the training include practical hands-on sessions?',
        answer:
          'Yes — 100%. Every programme is fully lab-based and uses the exact tools and technologies that real companies use in the field. Our curriculum is built to industry standards, not theoretical content alone. You will leave with skills you can apply on day one of your new role.',
      },
      {
        question: 'What tools and software will I learn to use?',
        answer:
          'The tools depend on your programme. Cybersecurity students work with professional penetration testing and security frameworks. Data Analytics students master Excel, SQL, and business intelligence visualisation tools. AI students work with leading language models and workflow automation platforms. Blockchain students use real wallets, DeFi protocols, and smart contract environments.',
      },
      {
        question: 'What is a Capstone Project?',
        answer:
          'The Capstone Project is a hands-on, real-world project completed at the end of each programme. It brings everything you have learned together into a practical deliverable — the exact type of work you would present to an employer. It forms the centrepiece of your professional portfolio and is a key part of your assessment.',
      },
    ],
  },
  {
    category: 'Certificates & Credentials',
    icon: '🏆',
    faqs: [
      {
        question: 'How does Metabridge Academy certificate verification work?',
        answer:
          "Every certificate carries a unique QR code. Scanning the QR code — or entering the certificate number on our Verify Certificate page at metabridgeacademy.com/verify — instantly displays the graduate's verified details. This system makes our certificates impossible to forge and trusted by employers globally.",
      },
      {
        question: 'Is the Metabridge Academy certificate internationally recognised?',
        answer:
          'Yes. Our graduates have used their certificates to secure roles and contracts in the UK, USA, UAE, Ghana, India, and across Africa. The QR-verification system gives any employer worldwide a reliable, instant way to confirm the authenticity of your credential.',
      },
      {
        question: 'When will I receive my certificate after completing the programme?',
        answer:
          'Certificates are issued upon successful completion of your programme, including the Capstone Project. Your QR-Verified Certificate of Achievement will be provided in digital format and can be used immediately for job applications, LinkedIn profiles, and employer verification.',
      },
      {
        question: 'What is the difference between the free and paid programme certificates?',
        answer:
          'Completing any of our free foundation courses earns you a Certificate of Completion — a recognised credential confirming your foundational knowledge. The paid professional programmes award a QR-Verified Certificate of Achievement, which carries greater weight with employers and includes full online verification.',
      },
    ],
  },
  {
    category: 'After Your Programme',
    icon: '🚀',
    faqs: [
      {
        question: 'Is there support available after I complete the programme?',
        answer:
          'Yes. Metabridge Academy graduates join our alumni network and gain access to career support resources, community connections, and ongoing updates. We are invested in your success long after graduation — not just during the programme.',
      },
      {
        question: 'Do you offer corporate or group training?',
        answer:
          "Yes. We work with organisations seeking to upskill teams in Cybersecurity, Data Analytics, Artificial Intelligence, and Blockchain. Corporate programmes can be tailored to your team's specific needs and schedule. Reach out at admissions@metabridgeacademy.com for a bespoke proposal.",
      },
    ],
  },
]

export default function FaqPage() {
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
              Frequently Asked <span className="text-orange">Questions</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Everything you need to know before you enrol. Can&apos;t find your answer?{' '}
              <a
                href="https://wa.me/2348124228730"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange hover:underline"
              >
                Ask us on WhatsApp.
              </a>
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom max-w-4xl mx-auto">
          {faqCategories.map((cat, ci) => (
            <FadeInSection key={cat.category} delay={ci * 80} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-heading text-xl font-bold text-navy">{cat.category}</h2>
              </div>
              <FaqAccordion faqs={cat.faqs} />
            </FadeInSection>
          ))}

          {/* Still have questions CTA */}
          <FadeInSection>
            <div className="bg-navy rounded-2xl p-8 text-center mt-6">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Still have a question?
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Our team responds within a few hours on business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/2348124228730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors text-sm"
                >
                  💬 Ask on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
                >
                  📧 Send a Message
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 bg-gradient-to-r from-teal to-navy text-center">
        <div className="container-custom">
          <FadeInSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to take the first step?
            </h2>
            <p className="text-white/70 mb-7 max-w-lg mx-auto">
              Join hundreds of professionals across Africa and beyond who have transformed their careers with Metabridge Academy.
            </p>
            <a
              href="https://wa.me/2348124228730?text=I%20want%20to%20enroll%20in%20a%20Metabridge%20Academy%20course."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-navy font-bold px-8 py-4 rounded-xl hover:bg-orange hover:text-white transition-colors"
            >
              💬 Enrol via WhatsApp
            </a>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
