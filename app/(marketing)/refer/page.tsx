import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'

export const metadata: Metadata = {
  title: 'Refer a Friend',
  description:
    'Refer a friend to Metabridge Academy and earn a reward for every successful enrolment. Share the opportunity, get rewarded.',
  openGraph: {
    title: 'Refer a Friend | Metabridge Academy',
    description: 'Earn ₦3,000 cash for every person you refer who successfully enrols at Metabridge Academy.',
    url: 'https://metabridgeacademy.com/refer',
  },
}

const WHATSAPP_REFER = 'https://wa.me/2348124228730?text=Hello%2C%20I%20would%20like%20to%20refer%20someone%20to%20Metabridge%20Academy.'

const steps = [
  {
    number: '01',
    icon: '📣',
    title: 'Tell Someone About Metabridge',
    detail:
      'Share the website, describe a course, or forward our WhatsApp number to a friend, colleague, or family member who would benefit from our programmes.',
  },
  {
    number: '02',
    icon: '🗣️',
    title: 'They Mention Your Name',
    detail:
      'When your contact enrols or makes a payment, they simply mention your full name in their enrollment form or tell our admissions team you referred them.',
  },
  {
    number: '03',
    icon: '💸',
    title: 'You Receive Your Reward',
    detail:
      'Once their payment is confirmed, we contact you within 2 business days to send your reward via bank transfer or as a discount credit on your next belt programme.',
  },
]

const rewards = [
  {
    icon: '💵',
    title: '₦3,000 Cash',
    detail: 'Paid directly to your Nigerian bank account within 2 business days of your referral\'s payment confirmation.',
  },
  {
    icon: '🎓',
    title: 'Belt Discount Credit',
    detail: 'Prefer to put it towards your own learning? We can apply your reward as a ₦3,000 discount on your next belt enrolment instead.',
  },
]

const faqs = [
  {
    q: 'Is there a limit on how many people I can refer?',
    a: 'No limit at all. Refer as many people as you like and earn a reward for every successful enrolment.',
  },
  {
    q: 'Does the person I refer need to enrol in a specific course or belt?',
    a: 'No. The reward applies to any paid belt programme: Green Belt, Blue Belt, or Black Belt, across all four courses.',
  },
  {
    q: 'What if the person I refer already knows about Metabridge Academy?',
    a: 'The reward is credited to whoever is mentioned at the point of payment. If your contact names you when they enrol, the reward is yours.',
  },
  {
    q: 'How do I know when my referral has been confirmed?',
    a: 'We will send you a WhatsApp message or call you as soon as your referral\'s payment is verified, usually within 24 to 48 hours.',
  },
  {
    q: 'Does my referral get any benefit?',
    a: 'Your referral benefits from joining a world-class programme. We are also happy to offer them a warm welcome message and priority onboarding when they mention your name.',
  },
]

export default function ReferPage() {
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
              <span className="text-white/80 text-sm font-medium">Referral Programme</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
              Share the Opportunity.{' '}
              <span className="text-orange">Get Rewarded.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Earn <strong className="text-white">₦3,000 cash</strong> for every person you refer who successfully enrols in a Metabridge Academy paid programme. No forms, no tracking links, no limit.
            </p>
            <a
              href={WHATSAPP_REFER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-orange/90 transition-colors text-lg"
            >
              💬 Start Referring Today
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Three steps. No apps. No codes. Just a name.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <FadeInSection key={step.number} delay={i * 120}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-sm h-full flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-orange text-lg">{step.number}</span>
                  </div>
                  <span className="text-4xl mb-3 block">{step.icon}</span>
                  <h3 className="font-heading font-bold text-navy mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.detail}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR REWARD */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">Your Reward Options</h2>
            <p className="section-subheading">Choose whichever reward suits you best.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {rewards.map((reward, i) => (
              <FadeInSection key={reward.title} delay={i * 120}>
                <div className="bg-light-bg rounded-2xl p-7 text-center h-full flex flex-col items-center border-2 border-transparent hover:border-orange/30 transition-colors">
                  <span className="text-5xl mb-4 block">{reward.icon}</span>
                  <h3 className="font-heading font-bold text-navy text-xl mb-3">{reward.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{reward.detail}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={250}>
            <div className="mt-8 bg-teal/5 border border-teal/20 rounded-2xl p-6 max-w-2xl mx-auto text-center">
              <p className="text-teal font-semibold text-sm mb-1">No upper limit</p>
              <p className="text-gray-500 text-sm">
                Refer 10 people and earn ₦30,000. Refer 50 and earn ₦150,000. There is no cap on how much you can earn.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom max-w-3xl mx-auto">
          <FadeInSection className="text-center mb-10">
            <h2 className="section-heading">Common Questions</h2>
          </FadeInSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={faq.q} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-heading font-bold text-navy mb-2 text-sm">{faq.q}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
      >
        <div className="container-custom">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Know Someone Ready to Level Up?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Send them our way. Once they enrol, message us on WhatsApp with your name and theirs to claim your reward.
            </p>
            <a
              href={WHATSAPP_REFER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-navy font-bold px-8 py-4 rounded-xl hover:bg-orange hover:text-white transition-colors text-lg"
            >
              💬 WhatsApp Us to Claim
            </a>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
