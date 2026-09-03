'use client'

import { useState } from 'react'
import type { SpecialDomain } from '@/lib/specialDomains'

interface Props {
  domains: SpecialDomain[]
  enrollHref: string
  variant?: 'dark' | 'light'
}

export default function SpecialDomainAccordion({ domains, enrollHref, variant = 'dark' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const isDark = variant === 'dark'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {domains.map((domain, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={domain.title}
            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark
                ? 'bg-white/5 border border-white/10 hover:bg-white/8'
                : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Always-visible header — click to toggle */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center gap-4 group"
              aria-expanded={isOpen}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${domain.color}20`, border: `1px solid ${domain.color}35` }}
              >
                {domain.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-heading text-base font-bold leading-snug mb-0.5 ${isDark ? 'text-white' : 'text-navy'}`}
                >
                  {domain.title}
                </h3>
                <p className={`text-sm leading-snug line-clamp-2 ${isDark ? 'text-white/55' : 'text-gray-500'}`}>
                  {domain.teaser}
                </p>
              </div>

              {/* Chevron */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen
                    ? 'rotate-180'
                    : 'rotate-0'
                }`}
                style={{
                  background: isOpen ? `${domain.color}25` : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: isOpen ? domain.color : (isDark ? 'rgba(255,255,255,0.5)' : '#6b7280') }}
                >
                  <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* Expandable body */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div
                className="px-6 pb-6 pt-1"
                style={{ borderTop: `1px solid ${domain.color}25` }}
              >
                {/* Description */}
                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/65' : 'text-gray-500'}`}>
                  {domain.desc}
                </p>

                {/* Curriculum */}
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  Curriculum Highlights
                </h4>
                <ul className="space-y-1.5 mb-5">
                  {domain.curriculum.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/65' : 'text-gray-600'}`}>
                      <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: domain.color }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  Tools You Will Use
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {domain.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: `${domain.color}15`, color: domain.color }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Career outcomes */}
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  Career Outcomes
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {domain.careers.map((career) => (
                    <span
                      key={career}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        isDark ? 'bg-white/10 text-white/70' : 'bg-navy/5 text-navy'
                      }`}
                    >
                      {career}
                    </span>
                  ))}
                </div>

                {/* Certificate note + CTA */}
                <div className={`text-xs mb-4 rounded-xl px-4 py-2.5 ${isDark ? 'bg-white/5 text-white/45' : 'bg-gray-50 text-gray-500'}`}>
                  🏆 Blockchain-verified Certificate of Completion on every domain
                </div>
                <a
                  href={enrollHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-opacity hover:opacity-90"
                  style={{ background: domain.color, color: '#fff' }}
                >
                  Enrol in This Domain →
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
