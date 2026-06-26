/**
 * Bulk import paid students into Supabase Auth.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key_here node scripts/import-students.js
 *
 * Requirements:
 *   - students.csv in the project root (export from Google Sheets)
 *   - CSV must have a header row with at least: email, name
 *   - @supabase/supabase-js already installed (it's in package.json)
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const SUPABASE_URL = 'https://feffbsxusdctdsalhlrq.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DEFAULT_PASSWORD = 'metabridge'
const CSV_PATH = path.join(__dirname, '..', 'students.csv')

if (!SERVICE_ROLE_KEY) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is not set.')
  console.error('Run: SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/import-students.js')
  process.exit(1)
}

if (!fs.existsSync(CSV_PATH)) {
  console.error('ERROR: students.csv not found in project root.')
  console.error('Export your Google Sheet as CSV and save it as students.csv')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function importStudents() {
  const raw = fs.readFileSync(CSV_PATH, 'utf-8')
  const lines = raw.trim().split('\n').filter(Boolean)

  if (lines.length < 2) {
    console.error('ERROR: CSV has no data rows (only header or empty).')
    process.exit(1)
  }

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase())
  const emailIdx = headers.indexOf('email')
  const nameIdx = headers.indexOf('name')

  if (emailIdx === -1) {
    console.error('ERROR: CSV must have an "email" column in the header row.')
    console.error('Found columns:', headers.join(', '))
    process.exit(1)
  }

  console.log(`\nImporting ${lines.length - 1} students with password "${DEFAULT_PASSWORD}"...\n`)

  let success = 0
  let skipped = 0
  let failed = 0

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''))
    const email = cols[emailIdx]?.toLowerCase()
    const name = nameIdx !== -1 ? cols[nameIdx] : ''

    if (!email || !email.includes('@')) {
      console.log(`  Row ${i + 1}: skipped (invalid or missing email)`)
      skipped++
      continue
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: DEFAULT_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: name },
    })

    if (error) {
      if (error.message.includes('already been registered')) {
        console.log(`  ⚠  ${email} — already exists, skipped`)
        skipped++
      } else {
        console.log(`  ✗  ${email} — ${error.message}`)
        failed++
      }
    } else {
      console.log(`  ✓  ${email}${name ? ` (${name})` : ''} — created`)
      success++
    }
  }

  console.log(`\nDone! ✓ ${success} created  ⚠ ${skipped} skipped  ✗ ${failed} failed`)
  console.log(`\nStudents can now log in at metabridgeacademy.com/login`)
  console.log(`  Email: their email address`)
  console.log(`  Password: ${DEFAULT_PASSWORD}`)
}

importStudents().catch((err) => {
  console.error('Unexpected error:', err.message)
  process.exit(1)
})
