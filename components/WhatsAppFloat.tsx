'use client'

import { FaWhatsapp } from 'react-icons/fa6'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2348124228730?text=Hello%20Metabridge%20Academy%2C%20I%20have%20a%20question."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Metabridge Academy on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-105"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
