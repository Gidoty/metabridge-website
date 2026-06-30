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
    "Africa's leading digital skills academy. Cybersecurity, Data Analytics, AI, and Blockchain training with globally-verified certificates. Based in Port Harcourt, Nigeria.",
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
