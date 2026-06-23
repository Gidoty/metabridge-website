import type { Metadata } from 'next'
import { LoginCard } from '@/components/auth/LoginCard'

export const metadata: Metadata = {
  title: 'Access Portal | Metabridge Academy',
  description: 'Sign in to your Metabridge Academy learning portal.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center relative overflow-hidden px-4">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, #22D3EE 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center font-heading font-bold text-white">
              MA
            </div>
            <span className="font-heading font-bold text-white text-xl">
              Metabridge <span className="text-orange">Academy</span>
            </span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1">Access Portal</h1>
          <p className="text-gray-400 text-sm font-mono">Select your access tier</p>
        </div>

        <LoginCard />

        <p className="text-center text-gray-600 text-xs font-mono mt-5">
          © Metabridge Academy · Port Harcourt, Nigeria
        </p>
      </div>
    </div>
  )
}
