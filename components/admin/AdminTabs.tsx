'use client'

import { useState } from 'react'
import type { CapstoneSubmission, StudentRegistration } from '@/lib/types/progress'
import type { Slide } from '@/lib/types/lecture'
import { AlertsPanel } from './AlertsPanel'
import { ContentManager } from './ContentManager'
import { RegistrationsPanel } from './RegistrationsPanel'

type Tab = 'live' | 'alerts' | 'content' | 'registrations'

interface AdminTabsProps {
  pendingCount: number
  capstoneSubmissions: CapstoneSubmission[]
  freeSlides: Slide[]
  paidSlides: Slide[]
  liveControls: React.ReactNode
  pendingRegistrations: number
  registrations: StudentRegistration[]
}

export function AdminTabs({
  pendingCount,
  capstoneSubmissions,
  freeSlides,
  paidSlides,
  liveControls,
  pendingRegistrations,
  registrations,
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('live')

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'live', label: 'Live Controls' },
    { id: 'alerts', label: 'Alerts', badge: pendingCount },
    { id: 'registrations', label: 'Registrations', badge: pendingRegistrations },
    { id: 'content', label: 'Content' },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-2xl mb-6"
        style={{ background: 'rgba(15,30,53,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-mono text-xs transition-all"
            style={{
              background: activeTab === tab.id ? '#0F1E35' : 'transparent',
              color: activeTab === tab.id ? '#22D3EE' : '#6B7280',
              border: activeTab === tab.id ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
            }}
          >
            {tab.label}
            {tab.badge && tab.badge > 0 ? (
              <span
                className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(244,137,31,0.3)', color: '#F4891F' }}
              >
                {tab.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'live' && liveControls}
      {activeTab === 'alerts' && <AlertsPanel initialSubmissions={capstoneSubmissions} />}
      {activeTab === 'registrations' && <RegistrationsPanel initialRegistrations={registrations} />}
      {activeTab === 'content' && (
        <ContentManager freeSessions={freeSlides} paidSessions={paidSlides} />
      )}
    </div>
  )
}
