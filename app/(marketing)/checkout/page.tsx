import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export const metadata = {
  title: 'Checkout',
  robots: { index: false },
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-light-bg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading checkout…</div>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  )
}
