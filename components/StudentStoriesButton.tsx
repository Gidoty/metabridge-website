'use client'

import { useState, useEffect } from 'react'

const CHAT_TESTIMONIALS = [
  {
    name: 'Obudu Precious',
    initial: 'O',
    color: '#E87722',
    course: 'Graduate',
    time: '10:42',
    message:
      'Abeg, this training came at the right time for me. I was tired of doing the same thing and wanted to learn something different. The projects made me take the training seriously because omo, I was tired of bagging certificates. I needed to build something and add to my portfolio, and Metabridge Academy gave me exactly that. I am grateful.',
  },
  {
    name: 'Anonymous',
    initial: 'A',
    color: '#2B8A9C',
    course: 'Cybersecurity Student',
    time: '11:15',
    message:
      'Make I talk true, I no expect say I go understand this Cybersecurity stuff this much. At first I dey lost small small. But as classes dey go, I start getting it. The project part sweet me because you go actually build something wey you fit show person.',
  },
  {
    name: 'Anonymous',
    initial: 'A',
    color: '#7C3AED',
    course: 'AI Student',
    time: '13:28',
    message:
      'Make ona help me thank Metabridge Academy. For me na that project aspect sweet me pass. I build agent wey dey manage WhatsApp group, omo I no believe am 😂. The instructors are good and their curriculum is very rich.',
  },
]

const QUOTE_TESTIMONIALS = [
  {
    name: 'Chukwuma Obi',
    role: 'Cybersecurity Analyst (Remote, UK Contract)',
    location: 'Port Harcourt, Nigeria',
    course: 'Cybersecurity',
    rating: 5,
    quote:
      "When I enrolled in the Metabridge Cybersecurity training, I genuinely did not know if anything would come of it. Four months later, I was negotiating a remote contract with a cybersecurity firm in the United Kingdom, from Port Harcourt. The first month's pay arrived in pounds sterling. I sat there and cried. My family cried. Metabridge Academy did not just give me a skill. It gave me a life I had stopped believing I could have.",
  },
  {
    name: 'Blessing Okafor',
    role: 'Data Analyst, Oil and Gas Services',
    location: 'Port Harcourt, Nigeria',
    course: 'Data Analytics',
    rating: 5,
    quote:
      'I am a single mother. Every investment I make has to be justified. Within six months of the Metabridge Data Analytics training, I moved from an administrative position into a junior data analyst role at an oil and gas services company, with a salary increase that covered the full cost of the training within my first week. My children now watch their mother build something.',
  },
  {
    name: 'Damilola Israel',
    role: 'Cybersecurity Student',
    location: 'Nigeria',
    course: 'Cybersecurity',
    rating: 5,
    quote:
      'When I started this Cybersecurity training I was actually skeptical. I just knew it as "computer security" 😂. But after the training, everything started making sense. The practical aspect really helped me. Now I am applying for jobs with more confidence, and once I get that offer, I will come back to testify. Thank you very much.',
  },
  {
    name: 'Ifeanyi F. Blessing',
    role: 'Data Analytics Student',
    location: 'Nigeria',
    course: 'Data Analytics',
    rating: 5,
    quote:
      'Honestly, I am grateful I took a chance on you. The instructors are truly industry professionals, as you promised. I have taken Data Analytics training before, but I got something entirely different here. Excel, Power BI, SQL dashboards, and business analytics used to confuse me. Now I can actually work with data and build dashboards. I am still learning, but I can see myself doing this professionally.',
  },
  {
    name: 'Michael Godspower',
    role: 'AI Student and Small Business Owner',
    location: 'Nigeria',
    course: 'Artificial Intelligence',
    rating: 5,
    quote:
      'AI was the main reason I joined MetaBridge. I wanted to know how people are using AI to make money and solve real problems. The training opened my eyes. I have already started applying what I learnt to my own small business.',
  },
  {
    name: 'Ufom Francis',
    role: 'Blockchain Student',
    location: 'Nigeria',
    course: 'Blockchain and Web3',
    rating: 4,
    quote:
      'Before this training, anything blockchain was just crypto to me. I honestly thought blockchain was only about cryptocurrency. Now I understand it is much bigger than that. The Web3 part really interested me. I am still learning, but at least now I know how to build something and navigate the Web3 space.',
  },
  {
    name: 'Omonigho Happiness',
    role: 'Graduate',
    location: 'Nigeria',
    course: 'Metabridge Academy',
    rating: 5,
    quote:
      'I am not going to say MetaBridge just gave me a job, because that is not what happened. But the training helped me prepare better. I now have projects to show and something meaningful to put in my portfolio. I have started getting better responses when I apply for jobs and other opportunities.',
  },
  {
    name: 'Amadi Rose',
    role: 'Graduate',
    location: 'Nigeria',
    course: 'Metabridge Academy',
    rating: 4,
    quote:
      'I used to think I needed a lot of money before I could start using my digital skills. The training changed that mindset completely. I have started doing small jobs with what I learnt. It is not big money yet, but something has started.',
  },
  {
    name: 'Naomi Winifred',
    role: 'Graduate and Referrer',
    location: 'Nigeria',
    course: 'Metabridge Academy',
    rating: 5,
    quote:
      'I attended their training and also referred someone to register with Metabridge. The one thing I always mention is their consistency with excellence and practicals. You genuinely get what you paid for.',
  },
]

const WA_SCREENSHOTS = [
  { src: '/testimonials/wa-screenshot-1.jpg', alt: 'Community testimonials screenshot 1' },
  { src: '/testimonials/wa-screenshot-2.jpg', alt: 'Community testimonials screenshot 2' },
  { src: '/testimonials/wa-screenshot-3.jpg', alt: 'Community testimonials screenshot 3' },
]

interface Props {
  variant?: 'hero' | 'section'
}

export default function StudentStoriesButton({ variant = 'hero' }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const triggerClass =
    variant === 'hero'
      ? 'flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white text-sm border border-white/25 hover:bg-white/10 transition-colors backdrop-blur-sm w-full text-center'
      : 'inline-flex items-center gap-2 border-2 border-navy text-navy font-bold px-8 py-3 rounded-xl hover:bg-navy hover:text-white transition-colors text-base'

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClass}>
        💬 Student Testimonials
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-3 pt-12 sm:pt-16">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal panel */}
          <div className="relative z-10 bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
               style={{ maxHeight: 'calc(100vh - 80px)' }}>

            {/* Sticky header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-navy">
                  Testimonials from Our Students
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                  Real feedback from real graduates and students
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-600 font-bold text-base shrink-0 ml-4"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-10">

              {/* ── Section 1: WhatsApp community screenshots ── */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📱</span>
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                    From the Community
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  What members of Gideon&apos;s crypto community say about MetaBridge Academy and its founder.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {WA_SCREENSHOTS.map((shot, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                      style={{ maxHeight: 420 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="w-full block"
                        style={{ marginTop: '-78px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section 2: WhatsApp chat bubbles ── */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💬</span>
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                    In Their Own Words
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  Unedited feedback sent directly by students and graduates.
                </p>
                <div
                  className="rounded-2xl p-4 space-y-5"
                  style={{ background: '#ECE5DD' }}
                >
                  {CHAT_TESTIMONIALS.map((t, i) => (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[90%] sm:max-w-[75%]">
                        <p
                          className="text-xs font-semibold mb-1 text-right pr-1"
                          style={{ color: t.color }}
                        >
                          {t.name} &middot; {t.course}
                        </p>
                        <div
                          className="rounded-tl-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3 shadow-sm"
                          style={{ background: '#DCF8C6' }}
                        >
                          <p className="text-gray-800 text-sm leading-relaxed">{t.message}</p>
                          <p className="text-right text-xs mt-2" style={{ color: '#8B9EA8' }}>
                            {t.time} ✓✓
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section 3: Quote cards ── */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                    Student Stories
                  </h3>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  Graduates sharing the impact of their Metabridge Academy training.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUOTE_TESTIMONIALS.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5 border border-gray-200 bg-gray-50 flex flex-col"
                    >
                      <div className="flex mb-3">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span
                            key={si}
                            className={`text-base ${si < t.rating ? 'text-orange' : 'text-gray-200'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 italic text-sm leading-relaxed flex-1 mb-4">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="border-t border-gray-200 pt-3">
                        <p className="font-semibold text-navy text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                        <span className="inline-block mt-1.5 text-xs font-medium text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                          {t.course}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
