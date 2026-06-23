import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { channel, studentName, studentEmail, driveUrl } = await request.json() as {
    channel: string
    studentName: string
    studentEmail: string
    driveUrl: string
  }

  if (!channel || !studentName || !studentEmail || !driveUrl) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  if (!driveUrl.startsWith('https://')) {
    return NextResponse.json({ error: 'Drive URL must start with https://' }, { status: 400 })
  }

  const { error } = await supabase.from('capstone_submissions').insert({
    user_id: user?.id ?? null,
    channel,
    student_name: studentName,
    student_email: studentEmail,
    drive_url: driveUrl,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
