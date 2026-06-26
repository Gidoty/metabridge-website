import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server-admin'

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { id, email } = await req.json()
  if (!id || !email) {
    return NextResponse.json({ error: 'id and email required' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  const { error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metabridgeacademy.com'}/login`,
  })

  if (inviteError && !inviteError.message.includes('already been registered')) {
    return NextResponse.json({ error: inviteError.message }, { status: 500 })
  }

  const { error: updateError } = await adminClient
    .from('student_registrations')
    .update({ status: 'approved', approved_at: new Date().toISOString() })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
