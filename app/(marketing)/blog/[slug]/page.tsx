import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from '@/lib/blog'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Metabridge Academy Blog`,
      description: post.description,
      url: `https://metabridgeacademy.com/blog/${post.slug}`,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const WHATSAPP_ENROLL =
  'https://wa.me/2348124228730?text=I%20want%20to%20enroll%20in%20a%20Metabridge%20Academy%20course.'

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) return notFound()

  const related = getRelatedPosts(post, 2)

  const toc = post.sections.filter((s) => s.heading)

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom max-w-3xl">
          <div className="mb-6">
            <Link href="/blog" className="text-white/60 hover:text-white text-sm transition-colors">
              ← Back to Blog
            </Link>
          </div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${post.categoryColor}`}>
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            {post.title}
          </h1>
          <p className="text-white/70 text-lg mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* ARTICLE */}
      <div className="container-custom max-w-3xl py-14">
        <div className="lg:flex gap-12">
          {/* TOC sidebar — desktop only */}
          {toc.length > 2 && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">In this article</p>
                <nav className="flex flex-col gap-2">
                  {toc.map((s, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="text-sm text-gray-500 hover:text-navy transition-colors leading-snug"
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main content */}
          <article className="flex-1 min-w-0">
            {post.sections.map((section, si) => {
              const headingIndex = toc.findIndex((t) => t === section)
              return (
                <div key={si} className="mb-10">
                  {section.heading && (
                    <h2
                      id={`section-${headingIndex}`}
                      className="font-heading text-xl md:text-2xl font-bold text-navy mb-4 mt-2"
                    >
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs?.map((p, pi) => (
                    <p key={pi} className="text-gray-600 leading-relaxed mb-4 text-[1.0625rem]">
                      {p}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="mt-3 mb-4 space-y-2">
                      {section.list.map((item, li) => (
                        <li key={li} className="flex gap-3 text-gray-600 text-[1.0625rem]">
                          <span className="text-teal font-bold mt-0.5 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="bg-teal/5 border-l-4 border-teal rounded-r-xl p-5 my-5">
                      <p className="text-navy font-medium text-sm leading-relaxed italic">
                        &ldquo;{section.callout}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Enroll CTA */}
            <div className="mt-12 bg-gradient-to-br from-navy to-teal rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Ready to Build This Skill?
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
                Metabridge Academy offers structured, practical training with industry professionals
                in {post.category} and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/courses"
                  className="bg-white text-navy font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Explore Courses
                </Link>
                <a
                  href={WHATSAPP_ENROLL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange/90 transition-colors text-sm"
                >
                  Enroll via WhatsApp
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="font-heading text-xl font-bold text-navy mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal/5 transition-all duration-200"
                >
                  <span className="text-3xl shrink-0">{r.heroEmoji}</span>
                  <div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.categoryColor} inline-block mb-1`}>
                      {r.category}
                    </span>
                    <p className="font-semibold text-navy text-sm group-hover:text-teal transition-colors leading-snug">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{r.readTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
