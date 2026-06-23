import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg">
      <header
        className="flex items-center justify-between px-6 py-4 border-b shrink-0"
        style={{ borderColor: 'rgba(34,211,238,0.12)' }}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center font-heading font-bold text-white text-sm">
            MA
          </div>
          <span className="font-heading font-bold text-white">
            Metabridge <span className="text-orange">Academy</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/labs"
            className="text-gray-400 hover:text-white text-sm font-mono transition-colors"
          >
            Labs
          </Link>
          <Link
            href="/"
            className="text-gray-400 hover:text-white text-sm font-mono transition-colors"
          >
            ← Back to site
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 container-custom py-10">{children}</main>
    </div>
  )
}
