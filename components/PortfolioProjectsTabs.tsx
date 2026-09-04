'use client'

import { useState } from 'react'
import { PORTFOLIO_PROJECTS } from '@/lib/portfolioProjects'
import PortfolioProjects from './PortfolioProjects'

const BELTS = [
  { key: 'green', label: 'Green Belt', emoji: '🟢', color: '#16a34a' },
  { key: 'blue',  label: 'Blue Belt',  emoji: '🔵', color: '#2563eb' },
  { key: 'black', label: 'Black Belt', emoji: '⚫', color: '#1e1e2e' },
] as const

type BeltKey = 'green' | 'blue' | 'black'

interface Props {
  courseId: string
}

export default function PortfolioProjectsTabs({ courseId }: Props) {
  const [active, setActive] = useState<BeltKey>('green')

  const portfolio = PORTFOLIO_PROJECTS[courseId]
  if (!portfolio) return null

  const activeBelt = BELTS.find((b) => b.key === active)!
  const projects = portfolio[active]

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-lg font-heading font-bold text-navy">Portfolio Projects</span>
        <span className="text-xs bg-orange/10 text-orange font-semibold px-2.5 py-1 rounded-full">
          10 per Belt · Choose 1
        </span>
      </div>

      {/* Belt tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {BELTS.map((belt) => {
          const isActive = active === belt.key
          return (
            <button
              key={belt.key}
              onClick={() => setActive(belt.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={
                isActive
                  ? { background: belt.color, color: '#fff', boxShadow: `0 2px 12px ${belt.color}40` }
                  : { background: '#f3f4f6', color: '#374151' }
              }
            >
              <span>{belt.emoji}</span>
              {belt.label}
            </button>
          )
        })}
      </div>

      <PortfolioProjects projects={projects} beltColor={activeBelt.color} />
    </div>
  )
}
