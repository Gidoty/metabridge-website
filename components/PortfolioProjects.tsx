'use client'

import { useState } from 'react'
import type { PortfolioProject } from '@/lib/portfolioProjects'

interface Props {
  projects: PortfolioProject[]
  beltColor: string
}

export default function PortfolioProjects({ projects, beltColor }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="mt-8">
      {/* Intro callout */}
      <div
        className="rounded-2xl p-6 mb-6 border"
        style={{ borderColor: beltColor + '40', background: beltColor + '08' }}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl shrink-0">🏗️</span>
          <div>
            <h4 className="font-heading font-bold text-navy text-lg mb-2">
              Real-World Portfolio Projects
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every MetaBridge Academy student must build and present a real-world project before graduation. During your training, you choose any one project from the 10 options below to research, execute, and showcase in your portfolio. This is how we ensure you are not just certified, but genuinely job-ready and globally competitive. We do not only teach and issue certificates: we give you real, demonstrable skills you can apply, deploy, and build with.
            </p>
          </div>
        </div>
      </div>

      {/* Project accordion */}
      <div className="space-y-3">
        {projects.map((project, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: beltColor }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy text-sm leading-snug">{project.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{project.industry}</p>
                </div>
                <span
                  className="shrink-0 transition-transform duration-200 text-gray-400"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-100">
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{project.brief}</p>

                  <div className="mb-4">
                    <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">How to Execute</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.howTo}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: beltColor + '18', color: beltColor }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">Deliverable</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{project.artifact}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
