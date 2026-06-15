import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getAnnouncements() {
  return client.fetch(`*[_type == "announcement" && visible == true] | order(date desc) {
    _id, title, body, date
  }`)
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, role, location, quote, stars, programme
  }`)
}

export async function getCourses() {
  return client.fetch(`*[_type == "course"] | order(_createdAt asc) {
    _id, title, type, description, "outcomes": outcomes[], price
  }`)
}

export async function getBooks() {
  return client.fetch(`*[_type == "book"] | order(_createdAt asc) {
    _id, title, subtitle, price, color, previewText
  }`)
}

export async function getTeam() {
  return client.fetch(`*[_type == "team"] | order(_createdAt asc) {
    _id, name, title, bio, image
  }`)
}
