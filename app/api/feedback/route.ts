import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      candidate_name,
      display_name,
      location,
      course_name,
      belt_level,
      rating_overall,
      rating_content,
      rating_instructor,
      rating_practical,
      rating_support,
      would_recommend,
      enjoyed_most,
      suggestions,
      message_for_future,
      consent,
    } = body

    if (!candidate_name?.trim() || !course_name || !belt_level || !rating_overall || !enjoyed_most?.trim() || !message_for_future?.trim()) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 })
    }

    if (!consent) {
      return NextResponse.json({ error: 'Consent is required to submit.' }, { status: 400 })
    }

    const { error } = await supabase.from('testimonials').insert({
      candidate_name: candidate_name.trim(),
      display_name: display_name?.trim() || null,
      location: location?.trim() || null,
      course_name,
      belt_level,
      rating_overall: Number(rating_overall),
      rating_content:   rating_content   ? Number(rating_content)   : null,
      rating_instructor: rating_instructor ? Number(rating_instructor) : null,
      rating_practical:  rating_practical  ? Number(rating_practical)  : null,
      rating_support:    rating_support    ? Number(rating_support)    : null,
      would_recommend: would_recommend === 'yes' ? true : would_recommend === 'no' ? false : null,
      enjoyed_most: enjoyed_most.trim(),
      suggestions: suggestions?.trim() || null,
      message_for_future: message_for_future.trim(),
      approved: false,
    })

    if (error) {
      console.error('Supabase testimonial insert error:', error)
      return NextResponse.json({ error: 'Failed to save your feedback. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Feedback submit exception:', e)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
