import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const form = await request.formData()
  const file = form.get('file') as File | null
  const slideId = form.get('slideId') as string | null

  if (!file || !slideId) {
    return NextResponse.json({ error: 'file and slideId required' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'png'
  const path = `slides/${slideId}.${ext}`
  const bytes = await file.arrayBuffer()

  // Ensure bucket exists (no-op if already present)
  await supabase.storage.createBucket('slides', { public: true }).catch(() => null)

  const { error: uploadError } = await supabase.storage
    .from('slides')
    .upload(path, bytes, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from('slides').getPublicUrl(path)

  return NextResponse.json({ imageUrl: publicUrl })
}
