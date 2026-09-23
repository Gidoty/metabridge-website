'use client'

import { useState } from 'react'
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

export default function ProjectsExplorer() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedBelt, setSelectedBelt] = useState<string | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const currentCourse = COURSES.find(c => c.id === selectedCourse)
  const currentBelt = BELTS.find(b => b.id === selectedBelt)
  const projects: PortfolioProject[] =
    selectedCourse && selectedBelt
      ? PORTFOLIO_PROJECTS[selectedCourse][selectedBelt as 'green' | 'blue' | 'black']
      : []

  return (
    <div className="space-y-10">

      {/* Step 1 — Course */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          Step 1 — Select Your Course
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COURSES.map(course => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course.id)
                setSelectedBelt(null)
                setExpandedIdx(null)
              }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center"
              style={{
                borderColor: selectedCourse === course.id ? course.color : '#e5e7eb',
                background: selectedCourse === course.id ? `${course.color}14` : 'white',
              }}
            >
              <span className="text-3xl">{course.icon}</span>
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
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Step 2 — Select Your Belt Level
          </p>
          <div className="grid grid-cols-3 gap-4">
            {BELTS.map(belt => (
              <button
                key={belt.id}
                onClick={() => {
                  setSelectedBelt(belt.id)
                  setExpandedIdx(null)
                }}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: selectedBelt === belt.id ? belt.color : '#e5e7eb',
                  background: selectedBelt === belt.id ? `${belt.color}18` : 'white',
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex-shrink-0"
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Step 3 — Your Projects
              </p>
              <p className="text-sm text-navy font-semibold">
                {currentCourse?.icon} {currentCourse?.label} &mdash;{' '}
                <span style={{ color: currentBelt?.color }}>{currentBelt?.label}</span>
                {' '}({projects.length} projects)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {projects.map((project, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
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
                  <div className="px-4 pb-6 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
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
                    <div className="bg-white border border-gray-200 rounded-xl p-3">
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

      {!selectedCourse && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🏗️</p>
          <p className="font-semibold">Select a course above to browse its projects</p>
        </div>
      )}
    </div>
  )
}
