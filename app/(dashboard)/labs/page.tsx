import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LABS } from '@/lib/data/labs'
import { TrackTabs } from '@/components/labs/TrackTabs'

export const metadata = {
  title: 'Labs & Simulators | Metabridge Academy',
}

export default async function LabsPage() {
  const cookieStore = cookies()
  const guestCookie = cookieStore.get('guest_user')

  let hasAccess = !!guestCookie

  if (!hasAccess) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) hasAccess = true
  }

  if (!hasAccess) {
    redirect('/login')
  }

  return (
    <div className="py-10">
      <div className="mb-10">
        <p className="font-mono text-cyber-cyan text-xs tracking-widest uppercase mb-2">
          {'// labs_and_simulators'}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
          Hands-On Labs
        </h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Interactive simulators and real-world tools organised by track and module.
          Complete labs to reinforce what you learn in each live session.
        </p>
      </div>

      <TrackTabs labs={LABS} />
    </div>
  )
}
