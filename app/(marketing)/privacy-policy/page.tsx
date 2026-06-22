import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Metabridge Academy. Learn how we collect, use, and protect your personal data in line with Nigerian law.',
  openGraph: {
    title: 'Privacy Policy | Metabridge Academy',
    url: 'https://metabridgeacademy.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-light-bg min-h-screen">
      {/* Header */}
      <div className="bg-navy py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60">Effective Date: June 2026 | Metabridge Academy, Port Harcourt, Nigeria</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom max-w-3xl py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-slate max-w-none">
          <p className="text-gray-500 leading-relaxed">
            Metabridge Academy (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of every individual
            who interacts with our platform. This Policy explains what personal data we collect, how we use
            it, and your rights in relation to it.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">1. Information We Collect</h2>
          <p className="text-gray-500 leading-relaxed">We may collect the following personal data:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>
              <strong className="text-navy">Contact form submissions:</strong> Name, email address, and any
              message content you choose to send us.
            </li>
            <li>
              <strong className="text-navy">Course enrollment data:</strong> Name, email address, phone
              number, and selected programme, collected when you enroll via WhatsApp or our platform.
            </li>
            <li>
              <strong className="text-navy">Certificate verification queries:</strong> Certificate codes
              submitted for verification. No personal data is collected from the person verifying;
              only the code is processed.
            </li>
            <li>
              <strong className="text-navy">Usage data:</strong> Anonymous page-view data collected via
              analytics tools to improve our platform. This data is not linked to any individual.
            </li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">2. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>To process your course enrollment and manage your training</li>
            <li>To issue and verify certificates of completion and achievement</li>
            <li>To respond to enquiries submitted via our contact form or WhatsApp</li>
            <li>To send programme updates and course announcements (only if you have opted in)</li>
            <li>To improve our website and training programmes</li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">3. Data Sharing</h2>
          <p className="text-gray-500 leading-relaxed">
            We do <strong className="text-navy">not</strong> sell, rent, or share your personal data
            with third parties for marketing or commercial purposes. Your data is never shared with any
            external party except:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm mt-3">
            <li>Service providers who assist us in operating our platform (e.g. database providers), bound by confidentiality agreements</li>
            <li>Where required by Nigerian law or a valid legal process</li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">4. Data Retention</h2>
          <p className="text-gray-500 leading-relaxed">
            We retain personal data only as long as necessary for the purpose it was collected. Certificate
            records are retained indefinitely to support ongoing verification. Contact form data is retained
            for up to 12 months. You may request deletion at any time.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">5. Your Rights</h2>
          <p className="text-gray-500 leading-relaxed">
            Under the Nigeria Data Protection Act (NDPA) 2023, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm mt-3">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Object to processing of your data for certain purposes</li>
          </ul>
          <p className="text-gray-500 text-sm mt-3">
            To exercise any of these rights, email us at{' '}
            <a href="mailto:info@metabridgeacademy.com" className="text-teal font-medium">
              info@metabridgeacademy.com
            </a>
            .
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">6. Cookies</h2>
          <p className="text-gray-500 leading-relaxed">
            Our website uses essential cookies only — those required for the site to function correctly.
            We do not use advertising or tracking cookies. Anonymous analytics data may be collected to
            help us understand how the site is used.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-500 leading-relaxed">
            Our website may contain links to external platforms such as WhatsApp and social media. We are
            not responsible for the privacy practices of those third parties and encourage you to review
            their privacy policies.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">8. Governing Law</h2>
          <p className="text-gray-500 leading-relaxed">
            This Privacy Policy is governed by the laws of the Federal Republic of Nigeria, including
            the Nigeria Data Protection Act (NDPA) 2023. Any disputes arising from this policy shall
            be subject to the jurisdiction of Nigerian courts.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-500 leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, the effective date at the
            top of this page will be updated. We encourage you to review this page periodically.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">10. Contact</h2>
          <p className="text-gray-500 leading-relaxed">
            For any privacy-related questions or requests, contact us at:
          </p>
          <div className="bg-light-bg rounded-xl p-5 mt-4">
            <p className="text-navy font-semibold">Metabridge Academy</p>
            <p className="text-gray-500 text-sm">Port Harcourt, Nigeria</p>
            <a href="mailto:info@metabridgeacademy.com" className="text-teal text-sm font-medium">
              info@metabridgeacademy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
