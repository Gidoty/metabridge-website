import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import CertVerifyClient from '@/components/CertVerifyClient'

export const metadata: Metadata = {
  title: 'Verify Certificate',
  description:
    'Instantly verify the authenticity of a Metabridge Academy certificate using the unique certificate code.',
  openGraph: {
    title: 'Certificate Verification | Metabridge Academy',
    description: 'Verify the authenticity of any Metabridge Academy certificate instantly.',
    url: 'https://metabridgeacademy.com/verify',
  },
}

interface PageProps {
  params: { code: string }
}

export default function VerifyPage({ params }: PageProps) {
  const code = decodeURIComponent(params.code)
  const isLookupPage = code === 'lookup'

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-20 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Certificate <span className="text-orange">Verification</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Every Metabridge Academy certificate carries a unique QR-verified code. Enter it below to
              confirm its authenticity.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* VERIFY PANEL */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom max-w-2xl">
          <CertVerifyClient initialCode={isLookupPage ? '' : code} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <FadeInSection className="text-center mb-10">
            <h2 className="section-heading">How Certificate Verification Works</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: '📄',
                title: 'Find the Code',
                desc: 'Every Metabridge Academy certificate includes a unique alphanumeric verification code printed on it.',
              },
              {
                step: '2',
                icon: '🔍',
                title: 'Enter the Code',
                desc: 'Type or paste the code into the verification field above and click Verify.',
              },
              {
                step: '3',
                icon: '✅',
                title: 'Instant Result',
                desc: 'The system confirms whether the certificate is authentic and displays the graduate\'s details.',
              },
            ].map((item) => (
              <FadeInSection key={item.step}>
                <div className="bg-light-bg rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
