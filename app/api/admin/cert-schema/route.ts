import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Diagnostic endpoint — reveals actual certificates table schema and sample codes.
// Visit /api/admin/cert-schema to diagnose verify-page issues.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const result: Record<string, unknown> = {}

  // 1. Count rows in certificates table
  const { count: certCount, error: countErr } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })
  result.certificates_row_count = countErr ? `ERROR: ${countErr.message}` : certCount

  // 2. Fetch one real row — this reveals the actual column names Supabase returns
  const { data: oneRow, error: rowErr } = await supabase
    .from('certificates')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (rowErr) {
    result.certificates_actual_columns = `ERROR fetching row: ${rowErr.message}`
  } else if (oneRow) {
    result.certificates_actual_columns = Object.keys(oneRow)
    result.sample_certificate_code = (oneRow as Record<string, unknown>).certificate_code
      ?? (oneRow as Record<string, unknown>).code
      ?? '(no code column found)'
    result.sample_row_keys_and_types = Object.fromEntries(
      Object.entries(oneRow as Record<string, unknown>).map(([k, v]) => [k, typeof v])
    )
  } else {
    result.certificates_actual_columns = 'TABLE IS EMPTY — 0 rows'
  }

  // 3. Try the "Certificate" table (singular, capital C) — check if it exists and has rows
  const { count: capCount, error: capErr } = await supabase
    .from('Certificate')
    .select('*', { count: 'exact', head: true })
  result.Capital_Certificate_table = capErr
    ? `Does not exist or error: ${capErr.message}`
    : `EXISTS with ${capCount} rows`

  // 4. Confirm what the verify page is currently querying
  result.verify_page_queries = {
    table: 'certificates',
    column: 'certificate_code',
    transform: '.toUpperCase() then .trim()',
  }

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
