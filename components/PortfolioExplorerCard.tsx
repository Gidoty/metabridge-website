'use client'

import { useState, useEffect } from 'react'
import { PORTFOLIO_PROJECTS, PortfolioProject } from '@/lib/portfolioProjects'

const COURSES = [
  { id: 'cybersecurity',           label: 'Cybersecurity',          icon: '🛡️', color: '#6B0000' },
  { id: 'data-analytics',          label: 'Data Analytics',          icon: '📊', color: '#0D4F5C' },
  { id: 'artificial-intelligence', label: 'Artificial Intelligence', icon: '🤖', color: '#3B1060' },
  { id: 'blockchain',              label: 'Blockchain & Web3',        icon: '⛓️', color: '#5C3D00' },
  { id: 'web-development',         label: 'Web Development',          icon: '💻', color: '#064e3b' },
]

const BELTS = [
  { id: 'green', label: 'Green Belt', subtitle: 'Foundation',     color: '#16a34a' },
  { id: 'blue',  label: 'Blue Belt',  subtitle: 'Professional',   color: '#2563eb' },
  { id: 'black', label: 'Black Belt', subtitle: 'Expert Mastery', color: '#1e1e2e' },
]

const SAMPLE_INDUSTRIES = ['Healthcare', 'Finance & Banking', 'Oil & Gas', 'Agriculture', 'Retail & E-commerce']

export default function PortfolioExplorerCard() {
  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedBelt, setSelectedBelt] = useState<string | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleClose() {
    setOpen(false)
    setSelectedCourse(null)
    setSelectedBelt(null)
    setExpandedIdx(null)
  }

  const currentCourse = COURSES.find(c => c.id === selectedCourse)
  const currentBelt = BELTS.find(b => b.id === selectedBelt)
  const projects: PortfolioProject[] =
    selectedCourse && selectedBelt
      ? PORTFOLIO_PROJECTS[selectedCourse][selectedBelt as 'green' | 'blue' | 'black']
      : []

  return (
    <>
      {/* ── Card in the "Why Metabridge Academy" grid ── */}
      <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        <div className="text-4xl mb-4">🏗️</div>
        <h3 className="font-heading text-xl font-semibold text-navy mb-3">
          Real-World Portfolio Projects
        </h3>
        <p className="text-gray-500 leading-relaxed mb-5">
          Every student must build and present a real-world project before graduating. You do not just earn a certificate — you ship something.
        </p>

        {/* Industry tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {SAMPLE_INDUSTRIES.map(ind => (
            <span
              key={ind}
              className="text-xs font-medium bg-light-bg text-navy px-3 py-1 rounded-full border border-gray-200"
            >
              {ind}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-sm font-semibold text-teal hover:text-navy transition-colors inline-flex items-center gap-1 mt-auto"
        >
          Education, Telecoms &amp; 5 more industries — Browse All Projects →
        </button>
      </div>

      {/* ── Full-screen explorer modal ── */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-3 pt-12 sm:pt-16">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div
            className="relative z-10 bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">
                  Student Portfolio Projects
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                  Select your course and belt to browse your real-world project briefs
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-600 font-bold text-base shrink-0 ml-4"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-7">

              {/* Step 1 — Course */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Step 1 — Select Your Course
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {COURSES.map(course => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course.id)
                        setSelectedBelt(null)
                        setExpandedIdx(null)
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center"
                      style={{
                        borderColor: selectedCourse === course.id ? course.color : '#e5e7eb',
                        background: selectedCourse === course.id ? `${course.color}14` : 'white',
                      }}
                    >
                      <span className="text-2xl">{course.icon}</span>
                      <span
                        className="text-xs font-semibold leading-tight"
                        style={{ color: selectedCourse === course.id ? course.color : '#374151' }}
                      >
                        {course.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — Belt */}
              {selectedCourse && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Step 2 — Select Your Belt Level
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {BELTS.map(belt => (
                      <button
                        key={belt.id}
                        onClick={() => {
                          setSelectedBelt(belt.id)
                          setExpandedIdx(null)
                        }}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                        style={{
                          borderColor: selectedBelt === belt.id ? belt.color : '#e5e7eb',
                          background: selectedBelt === belt.id ? `${belt.color}18` : 'white',
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{ background: belt.color }}
                        />
                        <span
                          className="font-bold text-sm"
                          style={{ color: selectedBelt === belt.id ? belt.color : '#374151' }}
                        >
                          {belt.label}
                        </span>
                        <span className="text-xs text-gray-400">{belt.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Projects */}
              {selectedCourse && selectedBelt && projects.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Step 3 — Your Projects
                  </p>
                  <p className="text-sm text-navy font-semibold mb-4">
                    {currentCourse?.icon} {currentCourse?.label} &mdash;{' '}
                    <span style={{ color: currentBelt?.color }}>{currentBelt?.label}</span>
                    {' '}({projects.length} projects)
                  </p>
                  <div className="space-y-2">
                    {projects.map((project, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                          className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: currentBelt?.color ?? '#1B2A4A' }}
                          >
                            {idx + 1}
                          </span>
                          <span className="flex-1 font-semibold text-navy text-sm leading-snug">
                            {project.title}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 hidden sm:block">
                            {project.industry}
                          </span>
                          <span className="text-gray-400 text-xs ml-2 shrink-0">
                            {expandedIdx === idx ? '▲' : '▼'}
                          </span>
                        </button>

                        {expandedIdx === idx && (
                          <div className="px-4 pb-5 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                            <p className="text-gray-600 text-sm leading-relaxed">{project.brief}</p>
                            <div>
                              <p className="text-xs font-bold text-navy mb-1">How to Execute</p>
                              <p className="text-gray-500 text-sm leading-relaxed">{project.howTo}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-navy mb-2">Tools</p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.tools.map(tool => (
                                  <span
                                    key={tool}
                                    className="text-xs font-medium px-2.5 py-0.5 rounded-full text-white"
                                    style={{ background: currentBelt?.color ?? '#1B2A4A' }}
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3">
                              <p className="text-xs font-bold text-navy mb-1">Deliverable</p>
                              <p className="text-gray-500 text-sm">{project.artifact}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}
