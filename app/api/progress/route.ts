import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('student_progress')
    .select('completed_modules')
    .eq('user_id', user.id)
    .eq('channel', 'paid')
    .single()

  return NextResponse.json({ completedModules: data?.completed_modules ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { channel, completedModules } = await request.json() as {
    channel: string
    completedModules: number[]
  }

  if (!channel || !Array.isArray(completedModules)) {
    return NextResponse.json({ error: 'channel and completedModules required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('student_progress')
    .upsert(
      { user_id: user.id, channel, completed_modules: completedModules },
      { onConflict: 'user_id,channel' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
