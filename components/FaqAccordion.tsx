'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <button
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-navy text-sm leading-snug group-hover:text-teal transition-colors duration-200">
              {faq.question}
            </span>
            <FiChevronDown
              size={18}
              className={`text-teal flex-shrink-0 transition-transform duration-300 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-5 border-t border-gray-100">
              <p className="text-gray-500 text-sm leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
