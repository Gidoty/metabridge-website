import Link from 'next/link'
import { COURSE_CATALOG, BOOK_CATALOG, formatNGN, getBookDownloadUrl } from '@/lib/products'
import type { CourseId, BookId } from '@/lib/products'

interface Props {
  searchParams: {
    ref?: string
    type?: string
    name?: string
    email?: string
    items?: string
    amount?: string
  }
}

export const metadata = {
  title: 'Payment Successful',
  robots: { index: false },
}

export default function SuccessPage({ searchParams }: Props) {
  const { ref, type, name, email, items, amount } = searchParams
  const purchaseType = type === 'book' ? 'book' : 'course'
  const itemIds = items ? items.split(',').filter(Boolean) : []
  const amountNGN = amount ? Number(amount) : 0

  const bookDownloads =
    purchaseType === 'book'
      ? itemIds
          .filter(id => id in BOOK_CATALOG)
          .map(id => ({
            bookName: BOOK_CATALOG[id as BookId].name,
            url: getBookDownloadUrl(BOOK_CATALOG[id as BookId].supabasePath),
          }))
      : []

  const courseNames =
    purchaseType === 'course'
      ? itemIds
          .filter(id => id in COURSE_CATALOG)
          .map(id => COURSE_CATALOG[id as CourseId].name)
      : []

  const plural = courseNames.length > 1
  const waText = courseNames.length > 0
    ? `Hello Metabridge Academy, I have completed payment for the ${courseNames.join(' & ')} programme${plural ? 's' : ''}. My name is ${name ?? ''}. Reference: ${ref ?? ''}.`
    : `Hello Metabridge Academy, I have completed payment. My name is ${name ?? ''}. Reference: ${ref ?? ''}.`

  const waUrl = `https://wa.me/2348124228730?text=${encodeURIComponent(waText)}`

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">✅</span>
        </div>

        <h1 className="font-heading text-2xl font-bold text-navy mb-2">Payment Successful!</h1>
        <p className="text-gray-500 text-sm mb-1">
          Thank you{name ? `, ${name}` : ''}. Your payment
          {amountNGN > 0 ? ` of ${formatNGN(amountNGN)}` : ''} has been confirmed.
        </p>
        {ref && <p className="text-xs text-gray-400 mb-6">Reference: {ref}</p>}

        {purchaseType === 'course' ? (
          <>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-5 mb-6 text-left">
              <p className="text-sm font-semibold text-teal mb-2">What happens next?</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>✓ A receipt has been sent to {email ?? 'your email'}</li>
                <li>✓ Our admissions team will contact you within 24 hours</li>
                <li>✓ Tap the button below to notify us on WhatsApp</li>
              </ul>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-colors mb-3"
            >
              💬 Notify Metabridge on WhatsApp
            </a>
            <p className="text-xs text-gray-400 mb-6">
              This opens a pre-filled WhatsApp message to our admissions team.
            </p>
          </>
        ) : (
          <>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-5 mb-6 text-left">
              <p className="text-sm font-semibold text-teal mb-2">
                Your {bookDownloads.length === 1 ? 'book is' : 'books are'} ready to download
              </p>
              <p className="text-xs text-gray-500">
                A receipt has also been sent to {email ?? 'your email'}.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {bookDownloads.length > 0 ? (
                bookDownloads.map(({ bookName, url }) => (
                  <a
                    key={bookName}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full bg-navy text-white font-semibold py-3 px-5 rounded-xl hover:bg-teal transition-colors"
                  >
                    <span>📥</span>
                    <span className="flex-1 text-left text-sm">Download {bookName}</span>
                    <span className="text-xs opacity-70">PDF</span>
                  </a>
                ))
              ) : (
                <div className="bg-orange/10 text-orange text-sm rounded-xl p-4">
                  Please email{' '}
                  <a
                    href="mailto:admissions@metabridgeacademy.com"
                    className="underline"
                  >
                    admissions@metabridgeacademy.com
                  </a>{' '}
                  with your reference to receive your download link.
                </div>
              )}
            </div>
          </>
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-navy text-sm font-semibold hover:text-teal transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
