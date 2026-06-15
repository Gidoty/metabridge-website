import Link from 'next/link'
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaLocationDot,
} from 'react-icons/fa6'

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/share/1BLRau146A/', label: 'Facebook' },
  { icon: FaXTwitter, href: 'https://x.com/MetabridgeA', label: 'X (Twitter)' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/metabridge-academy/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/metabridgea?igsh=NXMyemIzbml2cXk0', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center font-heading font-bold text-white text-sm">
                MA
              </div>
              <span className="font-heading font-bold text-xl">
                Metabridge <span className="text-orange">Academy</span>
              </span>
            </div>
            <p className="text-white/60 text-sm mb-3 max-w-xs leading-relaxed">
              Gateway to Digital Literacy. Africa&apos;s premier EdTech platform equipping professionals with globally-recognised digital skills.
            </p>
            <div className="flex items-center gap-1.5 text-white/60 text-sm mb-6">
              <FaLocationDot size={14} className="text-orange flex-shrink-0" />
              <span>Port Harcourt, Nigeria</span>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/verify/lookup', label: 'Verify Certificate' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-orange text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Programmes</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/courses#cybersecurity', label: 'Cybersecurity' },
                { href: '/courses#data-analytics', label: 'Data Analytics' },
                { href: '/courses#artificial-intelligence', label: 'Artificial Intelligence' },
                { href: '/courses#blockchain', label: 'Blockchain & Crypto' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-orange text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/2348124228730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-orange text-sm transition-colors duration-200"
                >
                  <FaWhatsapp size={14} className="text-green-400" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@metabridgeacademy.com"
                  className="text-white/60 hover:text-orange text-sm transition-colors duration-200"
                >
                  info@metabridgeacademy.com
                </a>
              </li>
              <li>
                <Link href="/books" className="text-white/60 hover:text-orange text-sm transition-colors duration-200">
                  Our Textbooks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            © 2026 Metabridge Academy. All rights reserved. Gateway to Digital Literacy.
          </p>
          <Link href="/privacy-policy" className="text-white/50 hover:text-orange text-sm transition-colors duration-200">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
