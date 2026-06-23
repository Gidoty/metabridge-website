'use client'

import { useState } from 'react'
import type { Lab, Track } from '@/lib/data/labs'
import { LabCard } from './LabCard'

interface TrackTabsProps {
  labs: Lab[]
}

const TRACKS: { id: Track; label: string; icon: string; color: string }[] = [
  { id: 'cybersecurity', label: 'Cybersecurity', icon: '🛡️', color: '#E21B3C' },
  { id: 'data', label: 'Data & SQL', icon: '📊', color: '#22D3EE' },
  { id: 'ai', label: 'AI & Prompting', icon: '🤖', color: '#A855F7' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️', color: '#F4891F' },
]

export function TrackTabs({ labs }: TrackTabsProps) {
  const [activeTrack, setActiveTrack] = useState<Track>('cybersecurity')
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({ 1: true })

  const trackLabs = labs.filter((l) => l.track === activeTrack)
  const modules = Array.from(new Set(trackLabs.map((l) => l.module))).sort((a, b) => a - b)
  const activeColor = TRACKS.find((t) => t.id === activeTrack)?.color ?? '#22D3EE'

  function toggleModule(mod: number) {
    setOpenModules((prev) => ({ ...prev, [mod]: !prev[mod] }))
  }

  return (
    <div>
      {/* Track tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TRACKS.map((track) => {
          const isActive = track.id === activeTrack
          return (
            <button
              key={track.id}
              onClick={() => {
                setActiveTrack(track.id)
                setOpenModules({ 1: true })
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm transition-all"
              style={{
                background: isActive ? `${track.color}22` : 'rgba(255,255,255,0.04)',
                color: isActive ? track.color : '#9CA3AF',
                border: `1px solid ${isActive ? `${track.color}44` : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <span>{track.icon}</span>
              <span>{track.label}</span>
            </button>
          )
        })}
      </div>

      {/* Modules accordion */}
      <div className="space-y-4">
        {modules.map((mod) => {
          const modLabs = trackLabs.filter((l) => l.module === mod)
          const isOpen = openModules[mod] ?? false

          return (
            <div
              key={mod}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${activeColor}22` }}
            >
              <button
                onClick={() => toggleModule(mod)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                style={{ background: 'rgba(15,30,53,0.8)' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ background: `${activeColor}22`, color: activeColor }}
                  >
                    MOD {mod}
                  </span>
                  <span className="font-heading font-semibold text-white text-sm">
                    Module {mod} Labs
                  </span>
                  <span className="font-mono text-gray-500 text-xs">{modLabs.length} lab{modLabs.length !== 1 ? 's' : ''}</span>
                </div>
                <span className="text-gray-500 font-mono text-sm">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" style={{ background: 'rgba(10,14,26,0.4)' }}>
                  {modLabs.map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {modules.length === 0 && (
          <p className="text-center text-gray-500 font-mono text-sm py-12">
            No labs available for this track yet.
          </p>
        )}
      </div>
    </div>
  )
}
