import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import FadeInSection from '@/components/FadeInSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import type { TestimonialItem } from '@/components/TestimonialsCarousel'
import CertVerifyBar from '@/components/CertVerifyBar'
import { books, WHATSAPP_BOOK, WHATSAPP_ENROLL } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Metabridge Academy | Gateway to Digital Literacy | Port Harcourt',
  description:
    "Africa's leading digital skills academy. Cybersecurity, Data Analytics, AI, and Blockchain training with globally-verified certificates. Based in Port Harcourt, Nigeria.",
  openGraph: {
    title: 'Metabridge Academy | Gateway to Digital Literacy',
    description:
      "Africa's leading digital skills academy. Globally-verified certificates in Cybersecurity, Data Analytics, AI & Blockchain.",
    url: 'https://metabridgeacademy.com',
  },
}

const stats = [
  { value: '5,000+', label: 'Graduates Trained',      icon: '🎓', accent: '#2B8A9C' },
  { value: '4',      label: 'Specialised Programmes', icon: '📚', accent: '#E87722' },
  { value: '15+',    label: 'Countries Represented',  icon: '🌍', accent: '#15803d' },
  { value: '85%',    label: 'Employment Rate',        icon: '💼', accent: '#7C3AED' },
]

const courses = [
  {
    icon: '🛡️',
    title: 'Cybersecurity',
    tag: 'Green · Blue · Black Belt',
    brief: 'Master the principles, tools, and techniques that protect digital systems. Hands-on training from foundations to advanced practice.',
    href: '/courses#cybersecurity',
    headerBg: 'linear-gradient(135deg, #6B0000 0%, #1B2A4A 100%)',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    tag: 'Green · Blue · Black Belt',
    brief: "Transform raw data into powerful business decisions. Learn tools used by analysts at the world's leading companies.",
    href: '/courses#data-analytics',
    headerBg: 'linear-gradient(135deg, #0D4F5C 0%, #1E3A6E 100%)',
  },
  {
    icon: '🤖',
    title: 'Artificial Intelligence',
    tag: 'Green · Blue · Black Belt',
    brief: 'Harness AI to automate work, generate content, and drive business growth. The skill every modern professional needs.',
    href: '/courses#artificial-intelligence',
    headerBg: 'linear-gradient(135deg, #3B1060 0%, #1A1A6E 100%)',
  },
  {
    icon: '⛓️',
    title: 'Blockchain & Cryptocurrency',
    tag: 'Green · Blue · Black Belt',
    brief: 'Understand blockchain from the ground up. Built specifically for the African market with global Web3 context.',
    href: '/courses#blockchain',
    headerBg: 'linear-gradient(135deg, #5C3D00 0%, #1B2A4A 100%)',
  },
  {
    icon: '💻',
    title: 'Web Development',
    tag: 'Green · Blue · Black Belt',
    brief: 'Build professional websites and full-stack applications. From your first HTML page to deploying production-grade software.',
    href: '/courses#web-development',
    headerBg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
  },
]

const specialDomains = [
  {
    icon: '📱',
    title: 'Digital Marketing & Growth',
    price: '₦20,000',
    duration: '3 Weeks',
    desc: 'Social media strategy, SEO, Google Ads, Meta Ads, email campaigns, and content marketing for Nigerian businesses.',
    tools: ['Meta Ads Manager', 'Google Ads', 'Mailchimp', 'Canva', 'Google Analytics'],
    color: '#E87722',
    illust: 'marketing',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    price: '₦30,000',
    duration: '4 Weeks',
    desc: 'User research, wireframing, prototyping in Figma, design systems, and usability testing for digital products.',
    tools: ['Figma', 'FigJam', 'Maze', 'Miro', 'Lottie'],
    color: '#7C3AED',
    illust: 'design',
  },
  {
    icon: '🐍',
    title: 'Python Programming',
    price: '₦25,000',
    duration: '4 Weeks',
    desc: 'Python syntax, data structures, automation scripts, web scraping, file handling, and an introduction to data science libraries.',
    tools: ['Python', 'VS Code', 'Jupyter', 'Pandas', 'Requests'],
    color: '#2563EB',
    illust: 'python',
  },
  {
    icon: '☁️',
    title: 'Cloud Computing Fundamentals',
    price: '₦35,000',
    duration: '4 Weeks',
    desc: 'AWS, Azure and GCP basics, cloud storage, virtual machines, serverless functions, and cloud cost management.',
    tools: ['AWS Console', 'Azure Portal', 'GCP', 'Terraform (Intro)', 'Docker Basics'],
    color: '#0891B2',
    illust: 'cloud',
  },
  {
    icon: '📑',
    title: 'Microsoft Office Mastery',
    price: '₦15,000',
    duration: '2 Weeks',
    desc: 'Advanced Word, Excel formulas, PowerPoint for executive presentations, and Outlook productivity workflows.',
    tools: ['Microsoft Word', 'Excel Advanced', 'PowerPoint', 'Outlook', 'OneDrive'],
    color: '#15803d',
    illust: 'office',
  },
  {
    icon: '📲',
    title: 'Mobile App Development',
    price: '₦45,000',
    duration: '5 Weeks',
    desc: 'Flutter basics, UI components, navigation, state management, and publishing to the Google Play Store and Apple App Store.',
    tools: ['Flutter', 'Dart', 'Firebase', 'Android Studio', 'VS Code'],
    color: '#BE123C',
    illust: 'mobile',
  },
]

const bookGradients: Record<string, string> = {
  cybersecurity: 'linear-gradient(135deg, #0D4F5C 0%, #1B2A4A 100%)',
  'data-analytics': 'linear-gradient(135deg, #1E3A6E 0%, #4A1472 100%)',
  'artificial-intelligence': 'linear-gradient(135deg, #3B1060 0%, #1A1A6E 100%)',
  blockchain: 'linear-gradient(135deg, #1B2A4A 0%, #5C3D00 100%)',
}

async function getLiveTestimonials(): Promise<TestimonialItem[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase
      .from('testimonials')
      .select('display_name, candidate_name, location, course_name, belt_level, message_for_future, rating_overall')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(18)

    if (!data || data.length < 3) return []

    return data.map((t) => ({
      name: t.display_name || t.candidate_name.split(' ')[0],
      role: `${t.belt_level} Graduate, ${t.course_name}`,
      location: t.location || 'Nigeria',
      quote: t.message_for_future,
      rating: t.rating_overall,
    }))
  } catch {
    return []
  }
}

export default async function HomePage() {
  const liveTestimonials = await getLiveTestimonials()
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom relative z-10 pt-28 pb-20 lg:pt-32 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="text-base">🌍</span>
                <span className="text-white/90 text-sm font-medium">Africa&apos;s Digital Skills Academy</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Where Africa&apos;s Next Digital Leaders{' '}
                <span className="text-orange">Are Made.</span>
              </h1>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Over 5,000 professionals have built in-demand skills, earned blockchain-verified certificates, and launched new careers through Metabridge Academy. Our three-belt curriculum takes you from foundation to global mastery. You are next.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/courses" className="btn-primary text-base px-7 py-3.5">
                  Start Learning Today
                </Link>
                <Link href="/books" className="btn-secondary text-base px-7 py-3.5">
                  Explore Our Books
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-sm">
                <span>🎓 5,000+ Graduates</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span>🌍 15+ Countries</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <span>💼 85% Job Placement Rate</span>
              </div>
            </div>

            {/* Right: Certificate mockup card (desktop only) */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* 5000+ graduates badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-orange text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                5,000+ Graduates
              </div>

              {/* Certificate preview card */}
              <div className="relative w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-7 shadow-2xl">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
                  <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0">
                    MA
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm">Metabridge Academy</p>
                    <p className="text-white/50 text-xs">Certificate of Completion</p>
                  </div>
                </div>

                {/* Certificate body */}
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-white/40 text-xs mb-1">Graduate</p>
                    <p className="text-white font-semibold text-sm">Chukwuma Obi</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Programme</p>
                    <p className="text-white font-semibold text-sm">Cybersecurity</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Belt Level</p>
                    <span className="inline-flex items-center gap-1.5 bg-[#1d4ed8]/30 border border-[#1d4ed8]/40 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-[#1d4ed8]" />
                      Blue Belt
                    </span>
                  </div>
                </div>

                {/* Blockchain verification badge */}
                <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/25 rounded-full px-3 py-1.5">
                  <span className="text-xs">⛓️</span>
                  <span className="text-purple-200 text-xs font-medium">Verified on Polygon Blockchain</span>
                </div>
              </div>

              {/* Belt level badges floating below */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {[
                  { bg: '#15803d', label: 'Green Belt' },
                  { bg: '#1d4ed8', label: 'Blue Belt' },
                  { bg: '#111827', label: 'Black Belt' },
                ].map((belt) => (
                  <div
                    key={belt.label}
                    className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-white text-xs"
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: belt.bg }} />
                    {belt.label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white py-5 border-b border-gray-100">
        <div className="container-custom">
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-4 font-medium">Our graduates work in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: '🏦', label: 'Banking & Fintech' },
              { icon: '🛢️', label: 'Oil & Gas' },
              { icon: '🏥', label: 'Healthcare' },
              { icon: '📡', label: 'Telecoms' },
              { icon: '🌐', label: 'UK & US (Remote)' },
              { icon: '⛓️', label: 'Web3 & Crypto' },
              { icon: '🏗️', label: 'Engineering' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <FadeInSection key={stat.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: `${stat.accent}18` }}
                >
                  {stat.icon}
                </div>
                <p className="font-heading text-4xl md:text-5xl font-bold text-navy mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-14">
            <h2 className="section-heading">Why Metabridge Academy?</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Industry-Relevant Curriculum',
                desc: 'Our programmes are built around what employers actually hire for — not outdated theory.',
              },
              {
                icon: '🌍',
                title: 'African Context, Global Standards',
                desc: 'We are the only academy that teaches digital skills through the lens of African markets, regulations, and real-world scenarios.',
              },
              {
                icon: '⛓️',
                title: 'Blockchain-Verified on Polygon',
                desc: 'Every graduate receives a certificate permanently recorded on the Polygon blockchain. Employers worldwide can verify authenticity instantly by scanning a QR code.',
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 150} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">Our Programmes</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">Green Belt to Black Belt. Foundation to mastery.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
            {courses.map((course, i) => (
              <FadeInSection key={course.title} delay={i * 100}>
                <div className="card h-full flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {/* Gradient header */}
                  <div
                    className="px-6 py-7 flex flex-col items-start"
                    style={{ background: course.headerBg }}
                  >
                    <div className="text-4xl mb-3">{course.icon}</div>
                    <h3 className="font-heading text-lg font-bold text-white leading-snug">{course.title}</h3>
                    <span className="text-xs font-medium text-white/65 mt-1.5">{course.tag}</span>
                  </div>
                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{course.brief}</p>
                    <Link
                      href={course.href}
                      className="text-teal font-semibold text-sm hover:text-navy transition-colors inline-flex items-center gap-1"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="text-center">
            <a
              href={WHATSAPP_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              Enroll Today
            </a>
          </div>
        </div>
      </section>

      {/* SPECIAL DOMAINS */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-white/80 text-sm font-medium">Focused Skill Programmes</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Special Domains</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="text-white/65 text-lg max-w-2xl mx-auto">
              Want to master a specific skill fast? Our Special Domains are focused programmes for professionals who know exactly what they need.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {specialDomains.map((domain, i) => (
              <FadeInSection key={domain.title} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  {/* Illustration header */}
                  <div
                    className="px-6 py-6 flex items-center gap-4"
                    style={{ background: `linear-gradient(135deg, ${domain.color}22 0%, ${domain.color}08 100%)`, borderBottom: `1px solid ${domain.color}30` }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ background: `${domain.color}25`, border: `1px solid ${domain.color}40` }}
                    >
                      {domain.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white leading-snug">{domain.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold" style={{ color: domain.color }}>{domain.price}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-white/50 text-xs">{domain.duration}</span>
                      </div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-white/65 text-sm leading-relaxed mb-5 flex-1">{domain.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {domain.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: `${domain.color}15`, color: domain.color }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <a
                      href={WHATSAPP_ENROLL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center text-sm font-bold py-2.5 rounded-xl transition-colors"
                      style={{ background: `${domain.color}20`, color: domain.color, border: `1px solid ${domain.color}40` }}
                    >
                      Enrol in This Domain →
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center">
            <p className="text-white/50 text-sm">
              All Special Domains include a Certificate of Completion verified on the Polygon blockchain.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* BOOKS PREVIEW */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">Our Textbooks</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">Written in Port Harcourt. Read across the world.</p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {books.map((book, i) => (
              <FadeInSection key={book.id} delay={i * 100}>
                <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {/* Book cover */}
                  <div
                    className="relative p-8 flex flex-col items-center justify-center text-center min-h-[220px]"
                    style={{ background: bookGradients[book.id] }}
                  >
                    <p className="font-heading text-lg font-bold text-white mb-2 leading-tight">{book.title}</p>
                    <p className="text-white/70 text-xs italic leading-relaxed">{book.subtitle}</p>
                    <p className="text-white/50 text-xs mt-4">By Metabridge Academy</p>
                  </div>
                  {/* Info below */}
                  <div className="p-5">
                    <div className="inline-block bg-orange text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                      {book.price}
                    </div>
                    <a
                      href={WHATSAPP_BOOK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-navy text-white font-semibold py-2.5 rounded-lg hover:bg-teal transition-colors text-sm"
                    >
                      Buy via WhatsApp
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="text-center">
            <Link href="/books" className="btn-outline text-base px-8 py-3">
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-3">
            <h2 className="section-heading">What Our Graduates Say</h2>
          </FadeInSection>
          <FadeInSection className="text-center mb-12">
            <p className="section-subheading">Real people. Real results. Real careers.</p>
          </FadeInSection>
          <TestimonialsCarousel items={liveTestimonials.length >= 3 ? liveTestimonials : undefined} />
        </div>
      </section>

      {/* AFRICA CONTEXT SECTION */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Built for Africa.{' '}
                <span className="text-orange">Ready for the World.</span>
              </h2>
              <p className="text-white/75 leading-relaxed text-lg">
                Nigeria is among the top countries globally for grassroots digital adoption — and demand for
                skilled tech professionals has never been higher. Yet access to quality, affordable,
                context-relevant digital education remains a gap. Metabridge Academy was founded to close that
                gap — equipping Nigerians and Africans with the exact skills that open doors locally and
                internationally.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: '🇳🇬', label: 'Nigeria-first curriculum' },
                  { icon: '🌍', label: 'Globally recognised' },
                  { icon: '⛓️', label: 'Blockchain-verified on Polygon' },
                  { icon: '💼', label: '85% employment rate' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              {/* Abstract Africa illustration */}
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Stylized globe/map */}
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4">🌍</div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Lagos', 'Abuja', 'PH', 'London', 'USA', 'Ghana'].map((city) => (
                          <span
                            key={city}
                            className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full text-center"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* NEXT COHORT BANNER */}
      <section className="py-14 bg-light-bg">
        <div className="container-custom">
          <FadeInSection>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left — cohort cadence */}
                <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
                  <span className="inline-block bg-orange/10 text-orange text-xs font-bold px-3 py-1 rounded-full mb-4">
                    ADMISSIONS OPEN
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-navy mb-3">
                    Four Cohorts Per Year — Start Every Quarter
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Metabridge Academy runs four cohorts annually — one every quarter. No matter when
                    you are ready, the next intake is never far away.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { quarter: 'Q1', label: 'January Intake' },
                      { quarter: 'Q2', label: 'April Intake' },
                      { quarter: 'Q3', label: 'July Intake' },
                      { quarter: 'Q4', label: 'October Intake' },
                    ].map(({ quarter, label }) => (
                      <div key={quarter} className="flex items-center gap-3 bg-light-bg rounded-xl px-4 py-3">
                        <span className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center text-navy text-xs font-bold flex-shrink-0">
                          {quarter}
                        </span>
                        <p className="font-semibold text-navy text-sm leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right — notify me */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">
                    Secure Your Spot in the Next Cohort
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    Spaces in each cohort are limited. Send us a WhatsApp message today and our
                    admissions team will guide you through enrolment for your chosen programme.
                  </p>
                  <a
                    href="https://wa.me/2348124228730?text=Hello%20Metabridge%20Academy%2C%20please%20notify%20me%20when%20the%20next%20cohort%20opens."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-green-600 transition-colors self-start text-sm"
                  >
                    💬 Notify Me on WhatsApp
                  </a>
                  <p className="text-gray-400 text-xs mt-4">
                    We typically respond within a few hours on business days.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CERTIFICATE VERIFY CTA */}
      <section className="py-14 bg-gradient-to-r from-teal to-navy">
        <div className="container-custom text-center">
          <FadeInSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
              Every Certificate Is Blockchain-Verified on Polygon
            </h2>
            <p className="text-white/70 mb-8">Scan the QR code or enter the certificate code below. Tamper-proof. Globally trusted.</p>
            <CertVerifyBar />
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
