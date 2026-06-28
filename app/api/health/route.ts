import { NextResponse } from 'next/server'

export async function GET() {
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  return NextResponse.json({
    anthropic_key: anthropicKey
      ? `SET — starts with: ${anthropicKey.slice(0, 12)}...`
      : 'NOT SET',
    supabase_service_key: serviceKey
      ? `SET — starts with: ${serviceKey.slice(0, 12)}...`
      : 'NOT SET',
    supabase_url: supabaseUrl ?? 'NOT SET',
  })
}
