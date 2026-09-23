import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://metabridgeacademy.com'),
  title: {
    default: 'Metabridge Academy | Gateway to Digital Literacy | Port Harcourt',
    template: '%s | Metabridge Academy',
  },
  description:
    "Nigeria's digital skills academy. Cybersecurity, Data Analytics, AI, and Blockchain training with globally-verified, blockchain-anchored certificates. Based in Port Harcourt.",
  openGraph: {
    type: 'website',
    siteName: 'Metabridge Academy',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MetabridgeA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0E1A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Metabridge Academy',
              url: 'https://metabridgeacademy.com',
              logo: 'https://metabridgeacademy.com/icons/icon-192.png',
              description: "Nigeria's digital skills academy offering Cybersecurity, Data Analytics, AI, and Blockchain training with blockchain-verified certificates.",
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Port Harcourt',
                addressRegion: 'Rivers State',
                addressCountry: 'NG',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+2348124228730',
                contactType: 'customer service',
                availableLanguage: 'English',
              },
              sameAs: [
                'https://www.facebook.com/share/1BLRau146A/',
                'https://x.com/MetabridgeA',
                'https://www.linkedin.com/company/metabridge-academy/',
                'https://www.instagram.com/metabridgea',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  )
}
