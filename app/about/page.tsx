import type { Metadata } from 'next'
import Image from 'next/image'
import FadeInSection from '@/components/FadeInSection'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Metabridge Academy — founded in Port Harcourt to equip African professionals with world-class digital skills in Cybersecurity, Data Analytics, AI, and Blockchain.',
  openGraph: {
    title: 'About Metabridge Academy',
    description: 'Founded in Port Harcourt. Built for Africa. Recognised worldwide.',
    url: 'https://metabridgeacademy.com/about',
  },
}

const team = [
  {
    name: 'Gideon Owhonda',
    title: 'Founder & CEO, Metabridge Academy',
    initials: 'GO',
    photo: '/team/gideon-owhonda.jpg',
    color: '#1B2A4A',
    bio: `Gideon Owhonda is a Chemical Engineer and Certified Environmental Specialist (NREP, USA), holding an MSc in Gas, Refining & Petrochemical Engineering from the University of Port Harcourt, where he is currently pursuing a PhD in Chemical Engineering.

With five years of experience spanning blockchain technology, cybersecurity, and cryptocurrency research — including serving as Head of Research at DefiLab — he brings an engineer's precision to the world of digital assets.

As Founder and CEO of Metabridge Academy, Gideon is building Africa's next generation of digital-asset-literate professionals, equipping young people with the knowledge and tools to thrive in a digital-driven economy.

A Tony Elumelu Foundation alumnus, Agip Oil Company Scholar, YALI alumnus, and delegate to the International Youth Diplomacy Conference at the University of Ghana, his work bridges energy innovation, environmental compliance, and Web3 education across Nigeria and beyond.`,
    badges: ['Tony Elumelu Alumnus', 'YALI Alumnus', 'PhD Candidate (UNIPORT)', 'NREP Certified'],
  },
  {
    name: 'Bright G. O',
    title: 'Lead Instructor, Metabridge Academy',
    initials: 'BG',
    photo: '/team/bright-go.jpg',
    color: '#2B8A9C',
    bio: `Bright G. O. is a Data Analytics professional and Business Intelligence specialist, a graduate of the University of Port Harcourt currently advancing her expertise through an MBA programme at Miva Open University, where her research sits at the intersection of data analytics and the oil and gas sector.

A skilled facilitator with a talent for translating complex data into clear, actionable insight, Bright brings both technical rigour and genuine passion for learning to every Metabridge Academy session.

As Lead Instructor, she designs and delivers training programmes that equip students with globally applicable digital skills — from data fundamentals to business intelligence applications.`,
    badges: ['Data Analytics Professional', 'MBA Candidate (Miva)', 'Business Intelligence Specialist', 'UNIPORT Graduate'],
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative py-24 circuit-bg"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1E35 100%)' }}
      >
        <div className="container-custom text-center relative z-10">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-white/80 text-sm font-medium">Our Story</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
              Bridging the Gap Between{' '}
              <span className="text-orange">Ambition and Opportunity</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Founded in Port Harcourt. Built for Africa. Recognised worldwide.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="section-heading text-center">Our Story</h2>
              <div className="w-16 h-1 bg-orange mx-auto mb-10 rounded-full" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Metabridge Academy was born from a simple but urgent conviction: that Africa&apos;s young
                professionals deserve access to world-class digital education that speaks their language,
                reflects their context, and equips them for the careers of tomorrow.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in Port Harcourt, we have grown into a platform that has trained graduates now
                working remotely for UK firms, consulting for US startups, and leading digital
                transformation in companies across Nigeria and West Africa.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are not a foreign programme adapted for Africa — we are an African institution built to
                global standards.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section-padding bg-light-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeInSection>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full border-t-4 border-teal">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Mission</h3>
                <p className="text-gray-500 leading-relaxed">
                  To equip every African professional with the digital skills needed to compete, create, and
                  lead in a technology-driven world.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full border-t-4 border-orange">
                <div className="text-3xl mb-4">🔭</div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Our Vision</h3>
                <p className="text-gray-500 leading-relaxed">
                  To be Africa&apos;s most trusted and impactful digital skills academy — known for quality,
                  context, and career outcomes.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInSection className="text-center mb-14">
            <h2 className="section-heading">Meet the Team</h2>
            <p className="section-subheading">The people behind Africa&apos;s digital skills revolution</p>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <FadeInSection key={member.name} delay={i * 150}>
                <div className="card h-full overflow-hidden">
                  {/* Avatar area */}
                  <div
                    className="p-8 flex items-center gap-5"
                    style={{ background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}CC 100%)` }}
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.title}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-white/75 text-sm mt-1">{member.title}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="p-8">
                    <div className="space-y-4">
                      {member.bio.split('\n\n').map((para, pi) => (
                        <p key={pi} className="text-gray-500 leading-relaxed text-sm">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {member.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs bg-light-bg text-navy px-3 py-1 rounded-full font-medium border border-gray-200"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI MAP / GLOBAL REACH */}
      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Graduates Are Everywhere
            </h2>
            <p className="text-white/70 text-lg mb-12">
              Our graduates work in 15+ countries across 4 continents.
            </p>

            {/* Map representation */}
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
              <div className="text-7xl mb-6">🌍</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { flag: '🇳🇬', country: 'Nigeria' },
                  { flag: '🇬🇧', country: 'United Kingdom' },
                  { flag: '🇺🇸', country: 'United States' },
                  { flag: '🇬🇭', country: 'Ghana' },
                  { flag: '🇨🇲', country: 'Cameroon' },
                  { flag: '🇮🇳', country: 'India' },
                  { flag: '🇿🇦', country: 'South Africa' },
                  { flag: '🇰🇪', country: 'Kenya' },
                  { flag: '🇸🇳', country: 'Senegal' },
                  { flag: '🇦🇪', country: 'UAE' },
                  { flag: '🇨🇦', country: 'Canada' },
                  { flag: '🇩🇪', country: 'Germany' },
                ].map(({ flag, country }) => (
                  <div
                    key={country}
                    className="bg-white/10 rounded-xl p-3 flex flex-col items-center gap-1"
                  >
                    <span className="text-2xl">{flag}</span>
                    <span className="text-white/60 text-xs">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
