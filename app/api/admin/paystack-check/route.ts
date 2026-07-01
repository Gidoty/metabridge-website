import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.PAYSTACK_SECRET_KEY ?? ''

  const result: Record<string, unknown> = {
    key_set: !!key,
    key_length: key.length,
    key_prefix: key.slice(0, 12),        // safe — shows format without exposing the secret
    key_starts_correctly: key.startsWith('sk_live_') || key.startsWith('sk_test_'),
    key_has_whitespace: key !== key.trim(),
    key_has_quotes: key.startsWith('"') || key.startsWith("'"),
  }

  if (!key) {
    return NextResponse.json({ ...result, verdict: 'PAYSTACK_SECRET_KEY is not set.' })
  }

  // Actually call Paystack to confirm the key works
  try {
    const res = await fetch('https://api.paystack.co/transaction?perPage=1', {
      headers: { Authorization: `Bearer ${key.trim()}` },
    })
    const data = await res.json()
    result.paystack_http_status = res.status
    result.paystack_response_status = data.status
    result.paystack_message = data.message
    result.verdict = data.status === true ? 'KEY IS VALID ✅' : `KEY REJECTED: ${data.message}`
  } catch (err) {
    result.verdict = `Network error reaching Paystack: ${err}`
  }

  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
}
