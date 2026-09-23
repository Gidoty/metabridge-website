import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Metabridge Academy. Read the terms governing your use of our platform, courses, and digital products.',
  openGraph: {
    title: 'Terms of Service | Metabridge Academy',
    url: 'https://metabridgeacademy.com/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="bg-light-bg min-h-screen">
      {/* Header */}
      <div className="bg-navy py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-white/60">
            Effective Date: September 2026 &mdash; Metabridge Academy, Port Harcourt, Nigeria
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom max-w-3xl py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-slate max-w-none">
          <p className="text-gray-500 leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Metabridge Academy website,
            online platform, courses, textbooks, and related services (collectively, the
            &ldquo;Services&rdquo;). By accessing or using our Services, you agree to be bound by these Terms. If you
            do not agree, please do not use our Services.
          </p>

          {/* 1 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">1. About Us</h2>
          <p className="text-gray-500 leading-relaxed">
            Metabridge Academy is a digital skills training institution registered in Nigeria under the
            Corporate Affairs Commission (CAC). Our registered address is in Port Harcourt, Rivers State,
            Nigeria. You can contact us at{' '}
            <a href="mailto:info@metabridgeacademy.com" className="text-teal hover:underline">
              info@metabridgeacademy.com
            </a>{' '}
            or via WhatsApp at +234 812 422 8730.
          </p>

          {/* 2 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">2. Eligibility</h2>
          <p className="text-gray-500 leading-relaxed">
            Our Services are open to individuals aged 16 and above. By enrolling in a course or purchasing a
            product, you confirm that the information you provide is accurate and that you have the legal
            capacity to enter into these Terms.
          </p>

          {/* 3 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">3. Enrolment and Payment</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>
              Enrolment is confirmed only after full payment (or the agreed instalment as communicated via
              WhatsApp) has been received and acknowledged by Metabridge Academy.
            </li>
            <li>
              Prices are denominated in Nigerian Naira (NGN) and are subject to change. The price displayed
              at the time of your enrolment confirmation is the binding price.
            </li>
            <li>
              Payment is processed securely via Paystack. Metabridge Academy does not store your card
              details.
            </li>
            <li>
              Instalment payment plans, where offered, are agreed individually via WhatsApp. Late payments
              may result in access suspension until the balance is settled.
            </li>
          </ul>

          {/* 4 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">4. Course Access and Conduct</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>
              Upon confirmed enrolment you will be granted access to live classes, study materials, and the
              student WhatsApp community for the duration of your programme.
            </li>
            <li>
              You agree to engage respectfully with instructors and fellow students. Harassment, plagiarism,
              or disruptive behaviour may result in removal from the programme without a refund.
            </li>
            <li>
              Course materials (slides, recordings, notes, and projects) are provided for your personal
              learning only. Redistribution, resale, or public sharing of Metabridge Academy materials
              without written permission is prohibited.
            </li>
            <li>
              Access credentials (login details, WhatsApp group links) are personal and must not be shared
              with others.
            </li>
          </ul>

          {/* 5 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">5. Certificates</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>
              A certificate of completion is issued to students who attend the required minimum number of
              sessions and successfully complete and present their capstone project.
            </li>
            <li>
              Certificates are blockchain-anchored on the Polygon PoS network for permanent verifiability.
            </li>
            <li>
              Metabridge Academy certificates are proprietary credentials issued by Metabridge Academy.
              They are not awarded by, endorsed by, or equivalent to qualifications from any government
              education authority or internationally recognised awarding body unless explicitly stated.
            </li>
          </ul>

          {/* 6 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">6. Refunds and Cancellations</h2>
          <p className="text-gray-500 leading-relaxed">
            Refunds are governed by our separate{' '}
            <a href="/refund-policy" className="text-teal hover:underline">
              Refund &amp; Cancellation Policy
            </a>
            , which forms part of these Terms. Please read it carefully before enrolling.
          </p>

          {/* 7 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">7. Digital Textbooks</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-sm">
            <li>
              Digital textbooks are delivered as downloadable PDF files. Purchases are final; no refunds
              are issued on digital products once delivered.
            </li>
            <li>
              You may print a copy for personal study. Redistribution, uploading to file-sharing platforms,
              or commercial use is prohibited.
            </li>
          </ul>

          {/* 8 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">8. Intellectual Property</h2>
          <p className="text-gray-500 leading-relaxed">
            All content on the Metabridge Academy website and platform — including text, graphics, course
            materials, curricula, logos, and software — is owned by or licensed to Metabridge Academy. You
            may not reproduce, distribute, or create derivative works from our content without prior written
            consent.
          </p>

          {/* 9 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">9. Privacy</h2>
          <p className="text-gray-500 leading-relaxed">
            Your use of our Services is also governed by our{' '}
            <a href="/privacy-policy" className="text-teal hover:underline">
              Privacy Policy
            </a>
            , which describes how we collect, use, and protect your personal data in compliance with the
            Nigeria Data Protection Act 2023 (NDPA).
          </p>

          {/* 10 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">10. Limitation of Liability</h2>
          <p className="text-gray-500 leading-relaxed">
            Metabridge Academy provides training and educational content in good faith. We do not guarantee
            specific employment outcomes, salary levels, or career results. Our 85% employment rate figure
            is based on self-reported data from graduate surveys and is not a guarantee of individual
            outcomes. To the fullest extent permitted by Nigerian law, our liability for any claim arising
            from use of our Services is limited to the amount you paid for the relevant programme.
          </p>

          {/* 11 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">11. Changes to These Terms</h2>
          <p className="text-gray-500 leading-relaxed">
            We may update these Terms from time to time. We will post the revised version on this page
            with an updated effective date. Continued use of our Services after any change constitutes
            acceptance of the new Terms.
          </p>

          {/* 12 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">12. Governing Law</h2>
          <p className="text-gray-500 leading-relaxed">
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be
            subject to the exclusive jurisdiction of the courts of Rivers State, Nigeria.
          </p>

          {/* 13 */}
          <h2 className="font-heading text-xl font-bold text-navy mt-10 mb-4">13. Contact Us</h2>
          <p className="text-gray-500 leading-relaxed">
            For questions about these Terms, please contact us:
          </p>
          <ul className="list-none pl-0 space-y-1 text-gray-500 text-sm mt-3">
            <li>
              <strong className="text-navy">Email:</strong>{' '}
              <a href="mailto:info@metabridgeacademy.com" className="text-teal hover:underline">
                info@metabridgeacademy.com
              </a>
            </li>
            <li>
              <strong className="text-navy">WhatsApp:</strong> +234 812 422 8730
            </li>
            <li>
              <strong className="text-navy">Address:</strong> Port Harcourt, Rivers State, Nigeria
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
