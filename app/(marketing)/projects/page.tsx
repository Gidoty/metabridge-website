import type { Metadata } from 'next'
import ProjectsExplorer from '@/components/ProjectsExplorer'

export const metadata: Metadata = {
  title: 'Student Portfolio Projects',
  description:
    'Browse the real-world portfolio projects every Metabridge Academy student must build before graduating — across Cybersecurity, Data Analytics, AI, Blockchain, and Web Development.',
  openGraph: {
    title: 'Student Portfolio Projects | Metabridge Academy',
    description: 'Real projects. Real industries. Browse by course and belt level.',
    url: 'https://metabridgeacademy.com/projects',
  },
}

export default function ProjectsPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-20 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-white/80 text-sm font-medium">🏗️ Student Portfolio Projects</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
            You Don&apos;t Just Graduate.{' '}
            <span className="text-orange">You Ship Something.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every Metabridge Academy student must build and defend a real-world project before graduating.
            Select your course and belt level below to explore what you will build.
          </p>
        </div>
      </section>

      {/* EXPLORER */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <ProjectsExplorer />
        </div>
      </section>
    </>
  )
}
