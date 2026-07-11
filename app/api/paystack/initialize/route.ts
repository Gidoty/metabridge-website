import { NextRequest, NextResponse } from 'next/server'
import { COURSE_CATALOG, BOOK_CATALOG, getBeltPrice, BELT_LABEL } from '@/lib/products'
import type { CourseId, BookId, BeltLevel } from '@/lib/products'

type LineItem =
  | { id: CourseId; type: 'course'; belt?: BeltLevel }
  | { id: BookId; type: 'book'; belt?: undefined }

export async function POST(req: NextRequest) {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    console.error('PAYSTACK_SECRET_KEY is not set in environment variables.')
    return NextResponse.json(
      { error: 'Payment is not configured. Please contact admissions@metabridgeacademy.com.' },
      { status: 503 }
    )
  }

  try {
    const { name, email, phone, items } = (await req.json()) as {
      name: string
      email: string
      phone: string
      items: LineItem[]
    }

    if (!name || !email || !phone || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    let totalNGN = 0
    const lineDescriptions: string[] = []

    for (const item of items) {
      if (item.type === 'course') {
        const course = COURSE_CATALOG[item.id as CourseId]
        if (!course) continue
        const price = item.belt ? getBeltPrice(item.id, item.belt) : course.price
        if (price === 0) continue
        totalNGN += price
        const beltSuffix = item.belt ? ` (${BELT_LABEL[item.belt]})` : ''
        lineDescriptions.push(`${course.name}${beltSuffix}`)
      } else {
        const book = BOOK_CATALOG[item.id as BookId]
        if (!book) continue
        totalNGN += book.price
        lineDescriptions.push(book.name)
      }
    }

    if (totalNGN === 0) {
      return NextResponse.json({ error: 'No valid items selected.' }, { status: 400 })
    }

    const purchaseType = items[0].type
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metabridgeacademy.com'}/payment/callback`

    const beltField = items[0].type === 'course' && items[0].belt
      ? [{ display_name: 'Belt Level', variable_name: 'belt', value: BELT_LABEL[items[0].belt as BeltLevel] }]
      : []

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: totalNGN * 100,
        callback_url: callbackUrl,
        metadata: {
          custom_fields: [
            { display_name: 'Full Name', variable_name: 'name', value: name },
            { display_name: 'WhatsApp', variable_name: 'phone', value: phone },
            { display_name: 'Purchase', variable_name: 'purchase', value: lineDescriptions.join(', ') },
            ...beltField,
          ],
          purchase_type: purchaseType,
          items: items.map(i => i.id),
          belt: items[0].type === 'course' ? (items[0].belt ?? null) : null,
          customer_name: name,
          customer_phone: phone,
        },
      }),
    })

    const paystackData = await paystackRes.json()

    if (!paystackData.status || !paystackData.data?.authorization_url) {
      console.error('Paystack init error:', JSON.stringify(paystackData))
      const paystackMessage: string = paystackData.message ?? 'Unknown error from payment provider.'
      return NextResponse.json(
        { error: `Payment provider error: ${paystackMessage}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ authorization_url: paystackData.data.authorization_url })
  } catch (err) {
    console.error('Initialize error:', err)
    return NextResponse.json({ error: 'Internal error. Please try again.' }, { status: 500 })
  }
}
