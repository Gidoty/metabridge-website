export const COURSE_CATALOG = {
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    duration: '14 Weeks Intensive',
    price: 100000,
    icon: '🛡️',
    description: 'Penetration testing, incident response, SOC, and professional security frameworks.',
  },
  'data-analytics': {
    id: 'data-analytics',
    name: 'Data Analytics',
    duration: '12 Weeks Intensive',
    price: 75000,
    icon: '📊',
    description: 'SQL, Excel, dashboards, and data-driven decision making for professionals.',
  },
  'artificial-intelligence': {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    duration: '5 Weeks Intensive',
    price: 30000,
    icon: '🤖',
    description: 'Prompt engineering, AI workflow automation, and tools for modern professionals.',
  },
  blockchain: {
    id: 'blockchain',
    name: 'Blockchain & Cryptocurrency',
    duration: '6 Weeks Intensive',
    price: 50000,
    icon: '⛓️',
    description: 'DeFi, Web3, Nigerian regulatory context, and real-world blockchain careers.',
  },
} as const

export const BOOK_CATALOG = {
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Cybersecurity Sefer',
    subtitle: 'A Comprehensive Guide from Foundations to Advanced Practice',
    price: 5000,
    supabasePath: 'cybersecurity.pdf',
  },
  'data-analytics': {
    id: 'data-analytics',
    name: 'Mastering Data Analytics',
    subtitle: 'A Practical Guide to Data-Driven Decision Making',
    price: 5000,
    supabasePath: 'data-analytics.pdf',
  },
  'artificial-intelligence': {
    id: 'artificial-intelligence',
    name: 'The Complete AI Sefer',
    subtitle: 'A Complete Guide to Prompt Engineering and Real-World AI Applications',
    price: 3000,
    supabasePath: 'artificial-intelligence.pdf',
  },
  blockchain: {
    id: 'blockchain',
    name: 'Age of Decentralization',
    subtitle: 'The Complete Guide to Decentralisation, DeFi, and Web3',
    price: 3000,
    supabasePath: 'blockchain.pdf',
  },
} as const

export type CourseId = keyof typeof COURSE_CATALOG
export type BookId = keyof typeof BOOK_CATALOG

export function formatNGN(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG')
}

export function getBookDownloadUrl(supabasePath: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/books/${supabasePath}`
}
