import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'

export const metadata: Metadata = {
  title: 'Gallery & Credentials',
  description:
    'View Metabridge Academy training sessions, cohort photos, and official accreditation credentials including CAC and SCUML certification.',
  openGraph: {
    title: 'Gallery & Credentials | Metabridge Academy',
    description: 'Official credentials and training gallery of Metabridge Academy, Port Harcourt.',
    url: 'https://metabridgeacademy.com/gallery',
  },
}

const credentials = [
  {
    id: 'cac',
    label: 'CAC Certificate',
    description: 'Corporate Affairs Commission — Registered Business in Nigeria',
    imagePath: null,
    icon: '🏗️',
    color: 'border-teal',
    badge: 'bg-teal/10 text-teal',
  },
  {
    id: 'scuml',
    label: 'SCUML Certificate',
    description: 'Special Control Unit Against Money Laundering — Federal Compliance',
    imagePath: null,
    icon: '🔏',
    color: 'border-navy',
    badge: 'bg-navy/10 text-navy',
  },
]

export default function GalleryPage() {
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
              Gallery &amp; <span className="text-orange">Credentials</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Our accreditations, training sessions, and the community we are building across Africa.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">Official Accreditations</h2>
            <p className="section-subheading">
              Metabridge Academy is a fully registered and compliant institution in Nigeria.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {credentials.map((cred, i) => (
              <FadeInSection key={cred.id} delay={i * 150}>
                <div
                  className={`bg-white rounded-2xl shadow-md border-t-4 ${cred.color} overflow-hidden h-full`}
                >
                  {cred.imagePath ? (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cred.imagePath}
                        alt={cred.label}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center aspect-[4/3] bg-gray-50 border-b border-gray-100">
                      <span className="text-5xl mb-3">{cred.icon}</span>
                      <span className="text-gray-400 text-sm font-medium">Certificate Image Coming Soon</span>
                    </div>
                  )}
                  <div className="p-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${cred.badge} inline-block mb-3`}>
                      Official Document
                    </span>
                    <h3 className="font-heading text-lg font-bold text-navy mb-1">{cred.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{cred.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING GALLERY */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-12">
            <h2 className="section-heading">Training Gallery</h2>
            <p className="section-subheading">
              Real students. Real sessions. Real transformation.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <FadeInSection key={i} delay={i * 60}>
                <div className="aspect-square rounded-2xl bg-light-bg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                  <span className="text-3xl mb-2">📸</span>
                  <span className="text-gray-400 text-xs text-center px-2">Photo coming soon</span>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="bg-navy/5 rounded-2xl p-8 text-center border border-navy/10">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-heading text-lg font-bold text-navy mb-2">
                We are constantly growing
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Training photos and cohort moments are added regularly as new graduates complete their
                programmes. Follow us on social media to see our community in action.
              </p>
              <div className="flex justify-center gap-4 mt-5">
                <a
                  href="https://www.instagram.com/metabridgea?igsh=NXMyemIzbml2cXk0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-teal hover:underline"
                >
                  Instagram →
                </a>
                <a
                  href="https://www.facebook.com/share/1BLRau146A/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-teal hover:underline"
                >
                  Facebook →
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-14 bg-gradient-to-r from-teal to-navy">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Graduates Trained' },
              { value: '4', label: 'Programmes' },
              { value: '15+', label: 'Countries' },
              { value: '85%', label: 'Employment Rate' },
            ].map((stat) => (
              <FadeInSection key={stat.label}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
