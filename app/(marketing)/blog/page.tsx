import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Tech Career Guides for Nigerians',
  description:
    'Practical guides on cybersecurity, data analytics, AI, blockchain, and web development careers in Nigeria. Learn what it really takes to break into tech.',
  openGraph: {
    title: 'Blog | Metabridge Academy',
    description:
      'Tech career guides for Nigerians — cybersecurity, data analytics, AI, blockchain, and web development.',
    url: 'https://metabridgeacademy.com/blog',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const featured = BLOG_POSTS[0]
  const rest = BLOG_POSTS.slice(1)

  return (
    <>
      {/* HERO */}
      <section
        className="relative py-20 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange mb-4 px-3 py-1 rounded-full bg-orange/10 border border-orange/20">
              Resources
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Tech Career <span className="text-orange">Guides</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Practical articles on breaking into tech, earning in dollars, and building a career in Nigeria.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="md:flex">
                {/* Visual panel */}
                <div
                  className="md:w-2/5 h-56 md:h-auto flex items-center justify-center text-8xl"
                  style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
                >
                  {featured.heroEmoji}
                </div>
                {/* Content */}
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${featured.categoryColor}`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400">Featured</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span>·</span>
                    <span>{featured.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* ALL POSTS GRID */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="mb-10">
            <h2 className="section-heading">All Articles</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <FadeInSection key={post.slug} delay={i * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  {/* Emoji banner */}
                  <div
                    className="h-32 flex items-center justify-center text-6xl"
                    style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
                  >
                    {post.heroEmoji}
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-8rem)]">
                    <span className={`self-start text-xs font-bold px-3 py-1 rounded-full mb-3 ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-navy mb-2 group-hover:text-teal transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <FadeInSection>
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="font-heading text-3xl font-bold text-white mb-3">
              Ready to Start Your Tech Career?
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">
              Reading about tech is one thing. Building real skills with real projects is another. Metabridge Academy
              offers structured training with industry professionals.
            </p>
            <Link
              href="/courses"
              className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-xl hover:bg-orange/90 transition-colors"
            >
              Explore Our Courses →
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
