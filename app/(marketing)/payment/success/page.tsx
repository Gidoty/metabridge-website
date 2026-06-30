import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const metadata = {
  title: 'Payment Successful',
  robots: { index: false },
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-light-bg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading…</div>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  )
}
