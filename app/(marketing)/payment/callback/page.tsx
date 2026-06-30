import { redirect } from 'next/navigation'

interface Props {
  searchParams: { reference?: string }
}

export default async function CallbackPage({ searchParams }: Props) {
  const reference = searchParams.reference

  if (!reference) {
    redirect('/payment/failed?reason=no_reference')
  }

  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metabridgeacademy.com'
    const res = await fetch(`${base}/api/paystack/verify?reference=${reference}`, {
      cache: 'no-store',
    })
    const data = await res.json()

    if (!data.success) {
      redirect(`/payment/failed?reason=not_verified&ref=${reference}`)
    }

    const params = new URLSearchParams({
      ref: reference,
      type: data.purchaseType,
      name: data.customerName,
      email: data.customerEmail,
      items: (data.itemIds ?? []).join(','),
      amount: String(data.amountNGN),
    })

    redirect(`/payment/success?${params.toString()}`)
  } catch {
    redirect(`/payment/failed?reason=error&ref=${reference}`)
  }
}
