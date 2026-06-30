import { NextRequest, NextResponse } from 'next/server'
import { BOOK_CATALOG, getBookDownloadUrl } from '@/lib/products'
import type { BookId } from '@/lib/products'

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference')

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference.' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      cache: 'no-store',
    })

    const data = await res.json()

    if (!data.status || data.data?.status !== 'success') {
      return NextResponse.json({ success: false, error: 'Payment not confirmed.' }, { status: 200 })
    }

    const tx = data.data
    const meta = tx.metadata ?? {}
    const purchaseType: 'course' | 'book' = meta.purchase_type ?? 'course'
    const itemIds: string[] = meta.items ?? []

    // For books: generate download URLs
    let downloadLinks: { name: string; url: string }[] = []
    if (purchaseType === 'book') {
      downloadLinks = itemIds
        .filter(id => id in BOOK_CATALOG)
        .map(id => {
          const book = BOOK_CATALOG[id as BookId]
          return { name: book.name, url: getBookDownloadUrl(book.supabasePath) }
        })
    }

    return NextResponse.json({
      success: true,
      purchaseType,
      itemIds,
      customerName: meta.customer_name ?? tx.customer?.first_name ?? '',
      customerEmail: tx.customer?.email ?? '',
      customerPhone: meta.customer_phone ?? '',
      amountNGN: tx.amount / 100,
      downloadLinks,
    })
  } catch (err) {
    console.error('Verify error:', err)
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 })
  }
}
