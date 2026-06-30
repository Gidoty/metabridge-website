'use client'

import { useState, FormEvent, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Certificate {
  id: string
  certificate_code: string
  certificate_type: string
  candidate_name: string
  course_name: string
  cohort: string
  serial_number: number | string
  year_issued: string
  date_issued: string
}

interface CertVerifyClientProps {
  initialCode: string
}

export default function CertVerifyClient({ initialCode }: CertVerifyClientProps) {
  const [code, setCode] = useState(initialCode)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Certificate | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const verify = async (codeToVerify: string) => {
    const trimmed = codeToVerify.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setResult(null)
    setSearched(true)

    try {
      const { data, error: dbError } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_code', trimmed.toUpperCase())
        .maybeSingle()

      if (dbError) {
        console.error('Supabase cert lookup error:', dbError)
        setError(
          `Database error — please try again. If this persists, contact info@metabridgeacademy.com. (${dbError.code}: ${dbError.message})`
        )
      } else if (!data) {
        setError(
          'No certificate found with this code. Please double-check the code exactly as printed on your certificate and try again.'
        )
      } else {
        setResult(data as Certificate)
      }
    } catch (e) {
      console.error('Cert verify exception:', e)
      setError('A network error occurred. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialCode && initialCode !== 'lookup') {
      verify(initialCode)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    verify(code)
    if (typeof window !== 'undefined') {
      // Encode each slash-separated segment individually so /verify/MA/C1/26/0001 routes correctly
      const segments = code.trim().split('/').map(encodeURIComponent).join('/')
      window.history.pushState({}, '', `/verify/${segments}`)
    }
  }

  const formatDate = (dateStr: string) => {
    // Handle DD/MM/YYYY (common in Nigerian Google Sheets) by reordering to YYYY-MM-DD
    let normalized = dateStr.trim()
    const dmyMatch = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (dmyMatch) {
      normalized = `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`
    }
    const d = new Date(normalized)
    if (isNaN(d.getTime())) return dateStr // fall back to raw value if still unparseable
    return d.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div>
      {/* Search form */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy mb-2">Enter Certificate Code</h2>
        <p className="text-gray-500 text-sm mb-6">
          The certificate code is printed on your Metabridge Academy certificate document.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. MA/C1/26/0001"
            className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-teal focus:outline-none text-navy font-mono text-lg placeholder-gray-300 transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-teal transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? '⏳ Verifying...' : '🔍 Verify Now'}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-md">
          <div className="text-4xl mb-4 animate-pulse">🔐</div>
          <p className="text-navy font-semibold">Checking certificate database...</p>
          <p className="text-gray-500 text-sm mt-2">This will only take a moment.</p>
        </div>
      )}

      {/* Valid certificate */}
      {!loading && result && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal to-navy p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl">
              ✅
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Certificate Verified</h3>
              <p className="text-white/75 text-sm">This certificate is authentic and valid.</p>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Candidate Name', value: result.candidate_name },
                { label: 'Course', value: result.course_name },
                { label: 'Certificate Type', value: result.certificate_type },
                { label: 'Cohort', value: result.cohort },
                { label: 'Certificate Code', value: result.certificate_code },
                { label: 'Serial Number', value: result.serial_number },
                { label: 'Year Issued', value: result.year_issued },
                { label: 'Date Issued', value: result.date_issued ? formatDate(result.date_issued) : '' },
                { label: 'Status', value: '✅ Valid & Authentic' },
              ].filter(f => f.value).map(({ label, value }) => (
                <div key={label} className="bg-light-bg rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="font-semibold text-navy">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal/5 rounded-xl border border-teal/20">
              <p className="text-sm text-gray-500">
                This certificate was issued by Metabridge Academy, Port Harcourt, Nigeria. For
                employer verification enquiries, contact{' '}
                <a href="mailto:info@metabridgeacademy.com" className="text-teal font-medium">
                  info@metabridgeacademy.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Not found */}
      {!loading && searched && error && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gray-700 p-6 flex items-center gap-4">
            <div className="text-3xl">❌</div>
            <div>
              <h3 className="font-bold text-white text-lg">Certificate Not Found</h3>
              <p className="text-white/75 text-sm">No matching certificate was found in our records.</p>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-500 leading-relaxed text-sm mb-3">{error}</p>
            <a
              href="mailto:support@metabridgeacademy.com"
              className="text-teal font-medium text-sm hover:underline"
            >
              support@metabridgeacademy.com
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
