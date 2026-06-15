'use client'

import { useState } from 'react'
import { books as BookType, WHATSAPP_BOOK } from '@/lib/data'

type Book = typeof BookType[0]

const bookGradients: Record<string, string> = {
  cybersecurity: 'linear-gradient(135deg, #0D4F5C 0%, #1B2A4A 100%)',
  'data-analytics': 'linear-gradient(135deg, #1E3A6E 0%, #4A1472 100%)',
  'artificial-intelligence': 'linear-gradient(135deg, #3B1060 0%, #1A1A6E 100%)',
  blockchain: 'linear-gradient(135deg, #1B2A4A 0%, #5C3D00 100%)',
}

function BookCard({ book, onPreview }: { book: Book; onPreview: (id: string) => void }) {
  return (
    <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      {/* Book cover */}
      <div
        className="relative p-8 flex flex-col items-center justify-center text-center"
        style={{ background: bookGradients[book.id], minHeight: '260px' }}
      >
        {/* Spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 rounded-l" />
        <p className="font-heading text-xl font-bold text-white mb-3 leading-tight px-4">
          {book.title}
        </p>
        <p className="text-white/70 text-xs italic leading-relaxed px-2">{book.subtitle}</p>
        <p className="text-white/40 text-xs mt-5">By Metabridge Academy</p>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="inline-block bg-orange text-white text-sm font-bold px-3 py-1.5 rounded-full self-start">
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
        <button
          onClick={() => onPreview(book.id)}
          className="block w-full text-center border-2 border-navy text-navy font-semibold py-2.5 rounded-lg hover:bg-navy hover:text-white transition-colors text-sm"
        >
          Preview Book
        </button>
      </div>
    </div>
  )
}

function BookPreview({ book }: { book: Book }) {
  const [tocExpanded, setTocExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Header */}
      <div
        className="p-6 flex items-center gap-4"
        style={{ background: bookGradients[book.id] }}
      >
        <div>
          <h3 className="font-heading text-xl font-bold text-white">{book.title}</h3>
          <p className="text-white/70 text-sm">{book.subtitle}</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TOC */}
        <div>
          <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
            📚 Table of Contents
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            22 Chapters covering everything from foundations to advanced professional application
          </p>
          <div className="space-y-1">
            {(tocExpanded ? book.toc : book.toc.slice(0, 8)).map((chapter, i) => (
              <div
                key={i}
                className={`text-sm py-1.5 px-3 rounded-lg ${
                  i < 8 ? 'text-gray-700' : 'text-gray-400'
                } hover:bg-gray-50`}
              >
                {chapter}
              </div>
            ))}
            {!tocExpanded && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
                <button
                  onClick={() => setTocExpanded(true)}
                  className="w-full text-center text-sm text-teal font-semibold py-2 hover:text-navy transition-colors mt-2"
                >
                  Show all {book.toc.length} chapters ↓
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nigerian Context + Learning Objective + Stats */}
        <div className="space-y-6">
          {/* Nigerian Context */}
          <div className="border-l-4 border-orange bg-orange/5 rounded-r-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>🇳🇬</span>
              <span className="text-xs font-bold text-orange uppercase tracking-wide">
                Written for Nigeria. Relevant Globally.
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{book.nigerianContext}</p>
          </div>

          {/* Sample Learning Objective */}
          <div className="bg-navy/5 rounded-xl p-4">
            <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">
              🎯 Sample Learning Objective
            </p>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              &ldquo;{book.learningObjective}&rdquo;
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { n: '22', label: 'Chapters' },
              { n: '100+', label: 'Tables & Diagrams' },
              { n: '✓', label: 'Hands-on Labs' },
              { n: '✓', label: 'Nigerian Context' },
            ].map(({ n, label }) => (
              <div
                key={label}
                className="bg-light-bg rounded-xl p-3 text-center"
              >
                <p className="font-bold text-navy text-lg">{n}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          {/* Learning outcomes */}
          <div>
            <h4 className="font-semibold text-navy text-sm mb-3">Key Learning Outcomes:</h4>
            <ul className="space-y-2">
              {book.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={WHATSAPP_BOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors"
          >
            Buy via WhatsApp — {book.price}
          </a>
        </div>
      </div>
    </div>
  )
}

interface BooksClientProps {
  books: Book[]
}

export default function BooksClient({ books }: BooksClientProps) {
  const [activePreview, setActivePreview] = useState<string | null>(null)

  const handlePreview = (id: string) => {
    setActivePreview(activePreview === id ? null : id)
    // Scroll to preview
    setTimeout(() => {
      document.getElementById(`preview-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      {/* Book cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {books.map((book, i) => (
          <div key={book.id} style={{ animationDelay: `${i * 100}ms` }}>
            <BookCard book={book} onPreview={handlePreview} />
          </div>
        ))}
      </div>

      {/* Preview sections */}
      <div className="mb-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
          What&apos;s Inside
        </h2>
        <p className="text-gray-500 mb-8">
          Click &ldquo;Preview Book&rdquo; above, or explore any book below.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => handlePreview(book.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePreview === book.id
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy border border-gray-200 hover:border-navy'
              }`}
            >
              {book.title}
            </button>
          ))}
        </div>

        {/* Preview panels */}
        {books.map((book) => (
          <div
            key={book.id}
            id={`preview-${book.id}`}
            className={activePreview === book.id ? 'block' : 'hidden'}
          >
            <BookPreview book={book} />
          </div>
        ))}

        {!activePreview && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-dashed border-gray-200">
            Select a book above to preview its contents
          </div>
        )}
      </div>
    </>
  )
}
