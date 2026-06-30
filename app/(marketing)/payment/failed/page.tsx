import Link from 'next/link'

interface Props {
  searchParams: {
    reason?: string
    ref?: string
  }
}

export const metadata = {
  title: 'Payment Failed',
  robots: { index: false },
}

const REASON_MESSAGES: Record<string, string> = {
  no_reference: 'We could not identify your payment session.',
  not_verified: 'Your payment could not be verified. If you were charged, please contact us.',
  error: 'An error occurred while processing your payment.',
}

export default function FailedPage({ searchParams }: Props) {
  const { reason, ref } = searchParams
  const message =
    reason && reason in REASON_MESSAGES
      ? REASON_MESSAGES[reason]
      : 'Your payment was not completed or was cancelled.'

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">❌</span>
        </div>

        <h1 className="font-heading text-2xl font-bold text-navy mb-2">
          Payment Not Completed
        </h1>
        <p className="text-gray-500 text-sm mb-2">{message}</p>
        {ref && <p className="text-xs text-gray-400 mb-6">Reference: {ref}</p>}
        {!ref && <div className="mb-6" />}

        <div className="space-y-3 mb-6">
          <Link
            href="/checkout"
            className="block w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors"
          >
            Try Again
          </Link>
          <a
            href="https://wa.me/2348124228730"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-colors"
          >
            💬 Get Help on WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-400">
          If you were charged but landed here, email us at{' '}
          <a
            href="mailto:admissions@metabridgeacademy.com"
            className="text-orange hover:underline"
          >
            admissions@metabridgeacademy.com
          </a>
        </p>
      </div>
    </div>
  )
}
