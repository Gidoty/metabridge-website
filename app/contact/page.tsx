import type { Metadata } from 'next'
import FadeInSection from '@/components/FadeInSection'
import ContactForm from '@/components/ContactForm'
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
} from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Metabridge Academy. Enroll in a course, purchase a textbook, or ask any question via WhatsApp, email, or our contact form.',
  openGraph: {
    title: 'Contact Metabridge Academy',
    description: 'Reach us via WhatsApp, email, or our contact form. Based in Port Harcourt, Nigeria.',
    url: 'https://metabridgeacademy.com/contact',
  },
}

const socialLinks = [
  {
    icon: FaFacebook,
    href: 'https://www.facebook.com/share/1BLRau146A/',
    label: 'Facebook',
    color: 'bg-blue-600',
  },
  {
    icon: FaXTwitter,
    href: 'https://x.com/MetabridgeA',
    label: 'X (Twitter)',
    color: 'bg-black',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/metabridge-academy/',
    label: 'LinkedIn',
    color: 'bg-blue-700',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/metabridgea?igsh=NXMyemIzbml2cXk0',
    label: 'Instagram',
    color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
  },
]

export default function ContactPage() {
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
              Get in <span className="text-orange">Touch</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We&apos;re here to help you start your journey. Reach out any way you prefer.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* WhatsApp */}
            <FadeInSection>
              <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border-t-4 border-green-500 text-center h-full">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FaWhatsapp size={28} color="white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-2">WhatsApp</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  For course enrollment, book purchases, and general enquiries
                </p>
                <a
                  href="https://wa.me/2348124228730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-green-600 transition-colors text-sm"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-gray-400 text-xs mt-3">+234 812 422 8730</p>
              </div>
            </FadeInSection>

            {/* Email */}
            <FadeInSection delay={100}>
              <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border-t-4 border-teal text-center h-full">
                <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FaEnvelope size={24} color="white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-2">Email Us</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  For detailed enquiries, course applications, and business partnerships
                </p>
                <a
                  href="mailto:info@metabridgeacademy.com"
                  className="inline-block bg-teal text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal/90 transition-colors text-sm"
                >
                  Send Email
                </a>
                <p className="text-gray-400 text-xs mt-3">info@metabridgeacademy.com</p>
              </div>
            </FadeInSection>

            {/* Location */}
            <FadeInSection delay={200}>
              <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border-t-4 border-orange text-center h-full">
                <div className="w-14 h-14 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FaLocationDot size={24} color="white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-2">Our Location</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Proudly based in Nigeria&apos;s oil capital — serving professionals across Africa and beyond
                </p>
                <div className="bg-orange/10 text-orange font-semibold px-6 py-2.5 rounded-xl text-sm inline-block">
                  🇳🇬 Port Harcourt, Nigeria
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* CONTACT FORM + SOCIAL */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeInSection>
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="font-heading text-2xl font-bold text-navy mb-2">Send a Message</h2>
                  <p className="text-gray-500 text-sm mb-8">
                    Fill in the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </div>
              </FadeInSection>
            </div>

            {/* Social */}
            <div className="lg:col-span-2">
              <FadeInSection delay={150}>
                <div className="bg-navy rounded-2xl p-8 h-full">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    Follow Metabridge Academy
                  </h3>
                  <p className="text-white/60 text-sm mb-8">
                    Stay updated with course launches, tips, and success stories.
                  </p>
                  <div className="space-y-4">
                    {socialLinks.map(({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} flex-shrink-0`}
                        >
                          <Icon size={18} color="white" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-orange transition-colors">
                            {label}
                          </p>
                          <p className="text-white/40 text-xs">@MetabridgeA</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-white/60 text-xs leading-relaxed">
                      The fastest way to reach us is via WhatsApp. We typically respond within a few
                      hours during business days.
                    </p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
