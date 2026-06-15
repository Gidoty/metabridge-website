'use client'

import { useState, FormEvent, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Certificate {
  id: string
  code: string
  graduate_name: string
  programme: string
  issue_date: string
  grade?: string
  status: 'valid' | 'revoked' | 'expired'
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
        .eq('code', trimmed.toUpperCase())
        .single()

      if (dbError || !data) {
        setError(
          'No certificate found with this code. Please check the code and try again. If you believe this is an error, contact info@metabridgeacademy.com.'
        )
      } else {
        setResult(data as Certificate)
      }
    } catch {
      setError('An error occurred while verifying the certificate. Please try again.')
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
    // Update URL without full navigation
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/verify/${encodeURIComponent(code.trim())}`)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-NG', {
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
            placeholder="e.g. MBA-2026-CYB-00123"
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
      {!loading && result && result.status === 'valid' && (
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
                { label: 'Graduate Name', value: result.graduate_name },
                { label: 'Programme', value: result.programme },
                { label: 'Certificate Code', value: result.code },
                { label: 'Issue Date', value: formatDate(result.issue_date) },
                ...(result.grade ? [{ label: 'Grade', value: result.grade }] : []),
                { label: 'Status', value: '✅ Valid & Authentic' },
              ].map(({ label, value }) => (
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

      {/* Revoked / Expired */}
      {!loading && result && result.status !== 'valid' && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-red-500 p-6 flex items-center gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="font-bold text-white text-lg">Certificate {result.status === 'revoked' ? 'Revoked' : 'Expired'}</h3>
              <p className="text-white/80 text-sm">
                This certificate has been {result.status}. Contact us for details.
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
            <p className="text-gray-500 leading-relaxed text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
