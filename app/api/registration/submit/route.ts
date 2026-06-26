import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const { full_name, email, whatsapp, course } = await req.json()

  if (!full_name || !email || !whatsapp || !course) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabase = createClient()
  const { error } = await supabase.from('student_registrations').insert({
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    whatsapp: whatsapp.trim(),
    course: course.trim(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
