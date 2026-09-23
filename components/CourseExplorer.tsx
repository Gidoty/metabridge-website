'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatNGN } from '@/lib/products'
import { WHATSAPP_ENROLL } from '@/lib/data'
import PortfolioProjectsTabs from '@/components/PortfolioProjectsTabs'
import SpecialDomainAccordion from '@/components/SpecialDomainAccordion'
import { SPECIAL_DOMAINS } from '@/lib/specialDomains'

type BeltLevel = 'green' | 'blue' | 'black'

interface BeltData {
  level: BeltLevel
  label: string
  weeks: number
  price: number
  prerequisite: string
  topics: string[]
  tools: string[]
  careers: string[]
  certAlign: string
}

interface CourseData {
  id: string
  icon: string
  name: string
  tagline: string
  globalAlign: string
  cardColor: string
  belts: BeltData[]
}

const COURSES: CourseData[] = [
  {
    id: 'cybersecurity',
    icon: '🛡️',
    name: 'Cybersecurity',
    tagline: 'From Foundations to Expert Penetration Tester',
    globalAlign: 'CompTIA Security+ · CEH v13 · CISSP · OSCP',
    cardColor: '#6B0000',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        price: 35000,
        prerequisite: 'None required',
        topics: [
          'CIA Triad and the Global Threat Landscape',
          'Networking Fundamentals: OSI Model, TCP/IP, Wireshark',
          'Cyber Threats, Malware Taxonomy and Social Engineering',
          'Authentication, MFA and Access Control Principles',
          'Cryptography: AES, RSA, Hashing and SSL/TLS',
          'Firewalls, IDS/IPS and Defensive Security Tools',
          'Nigerian Cybercrimes Act 2015 and NDPA 2023',
          'Capstone: Cybersecurity Risk Assessment Report',
        ],
        tools: ['Wireshark', 'CyberChef', 'Bitwarden', 'OpenVAS'],
        careers: ['Security Analyst', 'IT Risk Officer', 'Compliance Associate'],
        certAlign: 'CompTIA Security+ Foundations',
      },
      {
        level: 'blue',
        label: 'Professional Level',
        weeks: 8,
        price: 55000,
        prerequisite: 'Green Belt or equivalent foundational knowledge',
        topics: [
          'Linux and Kali Linux for Security Professionals',
          'Network Scanning and Enumeration (Nmap, Masscan)',
          'Web App Security: Full OWASP Top 10 with Lab Exploitation',
          'Password Attacks with Hashcat, John the Ripper and Hydra',
          'Exploitation with Metasploit Framework and Meterpreter',
          'Post-Exploitation and Privilege Escalation (LinPEAS, WinPEAS)',
          'SOC Operations, SIEM Analysis and Splunk SPL',
          'Digital Forensics, Incident Response and Cloud Security',
        ],
        tools: ['Kali Linux', 'Nmap', 'Metasploit', 'Burp Suite', 'Hashcat', 'Splunk', 'Nessus'],
        careers: ['Junior Penetration Tester', 'SOC Analyst', 'Security Consultant'],
        certAlign: 'CEH v13 · CompTIA CySA+ · CompTIA PenTest+',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 12,
        price: 300000,
        prerequisite: 'Blue Belt plus one documented real-world security application',
        topics: [
          'Active Directory Attacks: Kerberoasting, DCSync and Golden Ticket',
          'Advanced Web Exploitation (SSTI, JWT Attacks, HTTP Smuggling)',
          'Binary Exploitation and Reverse Engineering with Ghidra',
          'Malware Analysis and Full MITRE ATT&CK Framework Mapping',
          'Cloud Penetration Testing: AWS, Azure and CloudGoat Scenarios',
          'Red Team Operations, Adversary Simulation and C2 Frameworks',
          'ISO 27001:2022 Gap Assessment and Security Risk Management',
          'Expert Pentest Report Writing and External Panel Defence',
        ],
        tools: ['BloodHound', 'Mimikatz', 'Ghidra', 'Volatility', 'Sliver C2', 'OpenSSL'],
        careers: ['Senior Penetration Tester', 'Red Team Operator', 'Security Architect', 'CISO Advisor'],
        certAlign: 'CISSP · OSCP/OSCP+ · GIAC GPEN · ISACA CISM',
      },
    ],
  },
  {
    id: 'data-analytics',
    icon: '📊',
    name: 'Data Analytics',
    tagline: 'From Excel to Enterprise Data Engineering',
    globalAlign: 'Microsoft Power BI PL-300 · Tableau · Advanced SQL · Python Analytics',
    cardColor: '#0D4F5C',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        price: 30000,
        prerequisite: 'None required',
        topics: [
          'Data Types, Sources and the Analytics Lifecycle',
          'Excel Fundamentals: SUM, IF, VLOOKUP, COUNTIFS and SUMIFS',
          'Data Cleaning and Handling Missing or Duplicate Values',
          'PivotTables and PivotCharts for Business Reporting',
          'Data Visualization Principles and Choosing the Right Chart',
          'Power BI Introduction: Your First Interactive Dashboard',
          'Real-World Nigerian Business Dataset Analysis',
          'Capstone: End-to-End Business Analytics Report',
        ],
        tools: ['Microsoft Excel', 'Power BI (Free)', 'Google Sheets'],
        careers: ['Reporting Officer', 'Operations Analyst', 'Data Entry Specialist'],
        certAlign: 'Microsoft Excel Associate Preparation',
      },
      {
        level: 'blue',
        label: 'Professional Level',
        weeks: 8,
        price: 45000,
        prerequisite: 'Green Belt or solid intermediate Excel skills',
        topics: [
          'XLOOKUP, Dynamic Arrays and Advanced Excel Functions',
          'Financial Functions: NPV, IRR and PMT for Business Analysis',
          'Power Query: ETL Transformations and Data Shaping',
          'Power Pivot and DAX: Calculated Measures, KPIs and Time Intelligence',
          'SQL from SELECT through JOINs to Window Functions',
          'Advanced Power BI: Data Models, Relationships and Bookmarks',
          'Data Storytelling: Presenting Insights to Executives and Stakeholders',
          'Sector-Specific Analytics for Nigerian Industries and Capstone',
        ],
        tools: ['Excel Advanced', 'Power Query', 'Power Pivot', 'SQL', 'Power BI'],
        careers: ['Data Analyst', 'Business Intelligence Analyst', 'Financial Analyst'],
        certAlign: 'Microsoft Power BI Data Analyst PL-300',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 12,
        price: 120000,
        prerequisite: 'Blue Belt plus a documented analytics portfolio',
        topics: [
          'Advanced SQL: Window Functions, CTEs and Query Optimisation',
          'Stored Procedures, Views and Database Design (Normal Forms)',
          'Power Query M Language: Custom Functions and Complex Transforms',
          'Advanced DAX: CALCULATE, ALLSELECTED and Time Intelligence Patterns',
          'Python for Analytics: Pandas, NumPy, Matplotlib and Seaborn',
          'ETL Pipeline Design and Microsoft Fabric Introduction',
          'Data Governance: NDPA 2023 Compliance for Analytics Teams',
          'Analytics Leadership, Capstone Project and Panel Defence',
        ],
        tools: ['Python', 'Pandas', 'SQL Server', 'Microsoft Fabric', 'Tableau Advanced', 'SSMS'],
        careers: ['Senior Data Analyst', 'Data Engineer', 'Analytics Manager', 'BI Lead'],
        certAlign: 'Microsoft Fabric Analytics DP-600 · Advanced SQL Certification',
      },
    ],
  },
  {
    id: 'artificial-intelligence',
    icon: '🤖',
    name: 'Artificial Intelligence',
    tagline: 'From AI Novice to AI Solutions Architect',
    globalAlign: 'Google AI Essentials · DeepLearning.AI · AWS ML Specialty',
    cardColor: '#3B1060',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        price: 7000,
        prerequisite: 'None required',
        topics: [
          'What AI, Machine Learning and Deep Learning Are',
          'How Large Language Models Work: Tokens, Context and Hallucination',
          'Prompt Engineering: The CRISP Framework for Professional Outputs',
          'Advanced Prompting: Chain-of-Thought, Few-Shot and Persona Techniques',
          'AI Tools Stack: ChatGPT, Claude, Gemini, Copilot and Perplexity',
          'Image and Video AI: Canva AI, DALL-E 3 and Adobe Firefly',
          'AI Ethics, Bias Detection and the SAFE Responsible Use Framework',
          'Capstone: Nigerian Sector AI Application Brief and Reflection Paper',
        ],
        tools: ['ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'Canva AI', 'Perplexity'],
        careers: ['AI-Augmented Professional (any field)', 'AI Content Creator', 'Productivity Specialist'],
        certAlign: 'Google AI Essentials · Microsoft Azure AI-900',
      },
      {
        level: 'blue',
        label: 'Professional Level',
        weeks: 8,
        price: 25000,
        prerequisite: 'Green Belt or basic AI familiarity',
        topics: [
          'AI Automation Workflows with n8n, Make.com and Zapier AI',
          'Building AI-Powered Business Chatbots: Dify.ai and Botpress',
          'Retrieval-Augmented Generation (RAG): Concepts and No-Code Implementation',
          'AI Content Creation and Automated Publishing Pipelines',
          'ChatGPT and Claude API: Basic Integration Without Coding',
          'Multimodal AI: Combining Text, Image, Audio and Video in Workflows',
          'AI for Nigerian Industries: Fintech, Healthcare, Education and Agriculture',
          'AI Product Development, Monetisation and Capstone Build',
        ],
        tools: ['n8n', 'Make.com', 'Dify.ai', 'Botpress', 'Midjourney', 'ElevenLabs', 'HeyGen'],
        careers: ['AI Workflow Architect', 'Prompt Engineer', 'AI Chatbot Developer', 'AI Content Strategist'],
        certAlign: 'DeepLearning.AI Prompt Engineering · Azure AI Fundamentals',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 12,
        price: 50000,
        prerequisite: 'Blue Belt plus Python programming experience (minimum 6 months)',
        topics: [
          'Transformer Architecture and How Large Language Models Actually Work',
          'LLM Fine-Tuning with LoRA and QLoRA on Hugging Face (Google Colab)',
          'Vector Databases and Embeddings: Pinecone, Chroma and Weaviate',
          'Full RAG Architecture: Document Ingestion, Retrieval and Generation Pipelines',
          'Multi-Agent AI Systems with LangChain and CrewAI',
          'AI Safety, RLHF and Constitutional AI (Anthropic Approach)',
          'Enterprise AI Governance and NDPA 2023 Compliance for AI Builders',
          'AI Startup Architecture, Investor Pitching and Panel Defence',
        ],
        tools: ['Python', 'Hugging Face', 'LangChain', 'CrewAI', 'Pinecone', 'Docker', 'AWS/GCP/Azure'],
        careers: ['AI Engineer', 'AI Solutions Architect', 'Chief AI Officer (CAIO)', 'AI Startup Founder'],
        certAlign: 'AWS ML Specialty · Google Professional ML Engineer · Databricks Associate',
      },
    ],
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    name: 'Blockchain & Cryptocurrency',
    tagline: 'From Crypto Literacy to Protocol Engineering',
    globalAlign: 'Ethereum Developer Certification · Certified Blockchain Professional · CSCA',
    cardColor: '#5C3D00',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        price: 20000,
        prerequisite: 'None required',
        topics: [
          'How Blockchain Works: Blocks, Hashing, Consensus and Immutability',
          'Bitcoin and Ethereum: History, Purpose and Architecture',
          'Wallets, Keys and Self-Custody with MetaMask and Seed Phrases',
          'Decentralised Finance (DeFi), Smart Contracts and AMMs',
          'NFTs, Web3 and the Decentralised Internet',
          'Cryptocurrency Safety: Identifying and Avoiding Scams',
          'Nigerian Regulatory Landscape: SEC Nigeria and CBN Digital Asset Guidelines',
          'Capstone: Crypto Project Evaluation Using the 6-Point Framework',
        ],
        tools: ['MetaMask', 'Etherscan', 'CoinGecko', 'Uniswap (UI)', 'Binance P2P'],
        careers: ['Crypto-Literate Professional', 'Web3 Community Manager', 'Digital Asset Investor'],
        certAlign: 'Certified Blockchain Professional (CBP)',
      },
      {
        level: 'blue',
        label: 'Professional Level',
        weeks: 8,
        price: 30000,
        prerequisite: 'Green Belt or proven blockchain knowledge via entry assessment',
        topics: [
          'Solidity Smart Contract Development from Scratch (Remix IDE)',
          'ERC-20 Token Creation, Tokenomics Design and Vesting Mechanics',
          'ERC-721 NFT Collections with IPFS Metadata and OpenSea Deployment',
          'Hardhat Professional Development Environment, Testing and Deployment',
          'DeFi Protocol Integration: Uniswap V3 and Aave V3 with Ethers.js',
          'Web3 Frontend Development: React, Ethers.js and Wagmi',
          'Smart Contract Security: Top 10 Vulnerabilities and Auditing Basics',
          'DAO Governance, Nigerian Blockchain Regulation and Blue Belt Capstone',
        ],
        tools: ['Remix IDE', 'Hardhat', 'Solidity', 'Ethers.js', 'OpenZeppelin', 'Alchemy', 'IPFS/Pinata'],
        careers: ['Solidity Developer', 'Web3 Product Manager', 'DeFi Analyst', 'Tokenomics Designer'],
        certAlign: 'Ethereum Developer Certification (EF) · Web3 Solidity Dev (Alchemy University)',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 12,
        price: 50000,
        prerequisite: 'Blue Belt plus a Solidity portfolio of at least 3 deployed contracts',
        topics: [
          'Advanced Solidity: Gas Optimisation, Assembly and Storage Layout Patterns',
          'Foundry: Professional Smart Contract Testing, Fuzzing and Invariant Tests',
          'Smart Contract Security Auditing with Slither, Echidna and Formal Verification',
          'DeFi Protocol Engineering: AMM Mathematics, Lending Protocols and Flash Loans',
          'MEV, Flash Loan Attacks and Protocol Defence Engineering',
          'Zero-Knowledge Proofs: ZK-SNARKs, Circom and ZK-EVM Architecture',
          'Cross-Chain Bridges: LayerZero, Wormhole and Chainlink CCIP',
          'Enterprise Blockchain with Hyperledger Fabric and Capstone Panel Defence',
        ],
        tools: ['Foundry', 'Slither', 'Echidna', 'Circom', 'LayerZero', 'Hyperledger Fabric'],
        careers: ['Smart Contract Auditor', 'DeFi Protocol Engineer', 'Blockchain Architect', 'Web3 CTO'],
        certAlign: 'Certified Smart Contract Auditor (CSCA) · Hyperledger Certified Admin (HLCA)',
      },
    ],
  },
  {
    id: 'web-development',
    icon: '💻',
    name: 'Web Development',
    tagline: 'From Your First HTML Page to Full-Stack Engineer',
    globalAlign: 'Meta Front-End Developer · AWS Developer · freeCodeCamp Certifications',
    cardColor: '#064e3b',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        price: 25000,
        prerequisite: 'None required — a smartphone or basic computer is sufficient',
        topics: [
          'How the Web Works: Browsers, Servers, HTTP and DNS',
          'HTML5: Structure, Semantics, Forms and Accessibility',
          'CSS3: Selectors, Box Model, Flexbox and Grid Layouts',
          'Responsive Design: Mobile-First Approach and Media Queries',
          'JavaScript Basics: Variables, Functions and DOM Manipulation',
          'Git and GitHub: Version Control and Collaboration Workflow',
          'Deploying Websites with Netlify and Vercel',
          'Capstone: Build and Deploy a Personal Portfolio Website',
        ],
        tools: ['VS Code', 'Chrome DevTools', 'GitHub', 'Netlify', 'Figma (Wireframes)'],
        careers: ['Junior Web Developer', 'Freelance Web Designer', 'Front-End Intern'],
        certAlign: 'freeCodeCamp Responsive Web Design · HTML & CSS Foundations',
      },
      {
        level: 'blue',
        label: 'Professional Level',
        weeks: 8,
        price: 50000,
        prerequisite: 'Green Belt or demonstrated proficiency in HTML, CSS and basic JavaScript',
        topics: [
          'Advanced JavaScript: ES6+, Promises, Async/Await and the Fetch API',
          'React.js: Components, Props, State Management and Hooks',
          'Tailwind CSS and Modern UI Component Libraries',
          'Single-Page Applications with React Router and Dynamic Routing',
          'REST API Integration: Authentication, Error Handling and Loading States',
          'Supabase and Firebase: Real-Time Database and User Authentication',
          'Progressive Web Apps (PWA) and Mobile-Optimised Experiences',
          'Blue Belt Capstone: Full-Featured React Web Application',
        ],
        tools: ['React', 'Tailwind CSS', 'Supabase', 'Firebase', 'Vercel', 'VS Code', 'Postman'],
        careers: ['Front-End Developer', 'React Developer', 'Full-Stack Intern', 'Freelance Developer'],
        certAlign: 'Meta Front-End Developer (Coursera) · React Developer Certification',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 16,
        price: 150000,
        prerequisite: 'Blue Belt plus a portfolio of at least 2 deployed React projects',
        topics: [
          'Node.js and Express: Building RESTful APIs, Middleware and Auth Systems',
          'Database Design: PostgreSQL and MongoDB with ORM and Query Optimisation',
          'Authentication: JWT, OAuth 2.0 and Role-Based Access Control',
          'Next.js: Server-Side Rendering, Static Generation and the App Router',
          'TypeScript: Type Safety, Interfaces, Generics and Advanced Patterns',
          'DevOps Fundamentals: Docker, CI/CD Pipelines and Cloud Deployment',
          'Web Security: OWASP Top 10, Rate Limiting, CORS and Input Validation',
          'Black Belt Capstone: Production SaaS Application with Panel Defence',
        ],
        tools: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Next.js', 'TypeScript', 'Docker', 'AWS/GCP'],
        careers: ['Full-Stack Developer', 'Back-End Engineer', 'SaaS Founder', 'Web Architect'],
        certAlign: 'AWS Developer Associate · Meta Full-Stack Developer · W3Schools Certification',
      },
    ],
  },
]

const beltConfig = {
  green: {
    bg: 'linear-gradient(135deg, #15803d 0%, #0c4a22 100%)',
    badgeColor: '#4ade80',
    badgeBg: 'rgba(74,222,128,0.18)',
    priceColor: '#ffffff',
    emoji: '🟢',
    label: 'GREEN BELT',
  },
  blue: {
    bg: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
    badgeColor: '#93c5fd',
    badgeBg: 'rgba(147,197,253,0.18)',
    priceColor: '#ffffff',
    emoji: '🔵',
    label: 'BLUE BELT',
  },
  black: {
    bg: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(251,191,36,0.18)',
    priceColor: '#fbbf24',
    emoji: '⚫',
    label: 'BLACK BELT',
  },
}

function BeltCard({ courseId, belt }: { courseId: string; belt: BeltData }) {
  const cfg = beltConfig[belt.level]
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div style={{ background: cfg.bg }} className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{cfg.emoji}</span>
          <span
            style={{ background: cfg.badgeBg, color: cfg.badgeColor }}
            className="text-xs font-bold px-3 py-1 rounded-full tracking-wide"
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">{belt.label}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
            {belt.weeks} Weeks
          </span>
          <span className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
            📹 Live Classes
          </span>
          <span className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
            🗓️ Flexible Timetable
          </span>
        </div>
        <div style={{ color: cfg.priceColor }} className="text-3xl font-bold font-heading">
          {formatNGN(belt.price)}
        </div>
      </div>

      <div className="bg-white flex-1 flex flex-col p-6">
        <div className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2.5 mb-5 text-xs text-gray-600">
          <span className="font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0 mt-0.5">
            Prereq:
          </span>
          <span>{belt.prerequisite}</span>
        </div>

        <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-3">
          Curriculum Highlights
        </h4>
        <ul className="space-y-2 mb-5 flex-1">
          {belt.topics.map(topic => (
            <li key={topic} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-teal font-bold flex-shrink-0 mt-0.5">✓</span>
              {topic}
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">
            Tools &amp; Labs
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {belt.tools.map(tool => (
              <span key={tool} className="bg-navy/5 text-navy text-xs px-2.5 py-1 rounded-full font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">
            Career Outcomes
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {belt.careers.map(career => (
              <span key={career} className="bg-orange/10 text-orange text-xs px-2.5 py-1 rounded-full font-medium">
                {career}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-light-bg rounded-lg px-3 py-2.5 mb-5 text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-navy">🏆 QR-Verified Certificate</span>
          <br />
          Aligns with: {belt.certAlign}
        </div>

        <Link
          href={`/checkout?type=course&item=${courseId}&belt=${belt.level}`}
          className="block w-full text-center bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange/90 transition-colors mb-2 text-sm"
        >
          Enrol Now →
        </Link>
        <a
          href={WHATSAPP_ENROLL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-navy/5 text-navy font-semibold py-2.5 rounded-xl hover:bg-navy/10 transition-colors text-sm"
        >
          💬 Chat with Us First
        </a>
      </div>
    </div>
  )
}

const COURSE_CARD_META = [
  { id: 'cybersecurity',           icon: '🛡️', name: 'Cybersecurity',           color: '#6B0000', desc: 'Defence, Ethical Hacking & SOC Operations' },
  { id: 'data-analytics',          icon: '📊', name: 'Data Analytics',           color: '#0D4F5C', desc: 'Excel, Power BI, SQL & Python' },
  { id: 'artificial-intelligence', icon: '🤖', name: 'Artificial Intelligence',  color: '#3B1060', desc: 'Prompt Engineering, AI Automation & LLMs' },
  { id: 'blockchain',              icon: '⛓️', name: 'Blockchain & Web3',         color: '#5C3D00', desc: 'Crypto, Solidity & DeFi Engineering' },
  { id: 'web-development',         icon: '💻', name: 'Web Development',           color: '#064e3b', desc: 'HTML to Full-Stack & SaaS Apps' },
  { id: 'special-domains',         icon: '⭐', name: 'Special Domains',           color: '#1B2A4A', desc: 'Focused Intensive Skill Programmes' },
]

export default function CourseExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const course = COURSES.find(c => c.id === selectedId)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    setTimeout(scrollToTop, 50)
  }

  function handleBack() {
    setSelectedId(null)
    setTimeout(scrollToTop, 50)
  }

  // ── SPECIAL DOMAINS ──────────────────────────────────────────────
  if (selectedId === 'special-domains') {
    return (
      <div className="space-y-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors"
        >
          ← All Courses
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">⭐</span>
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy">Special Domains</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Intensive, focused programmes for professionals who want to master one specific skill area fast.
            </p>
          </div>
        </div>

        <SpecialDomainAccordion domains={SPECIAL_DOMAINS} enrollHref={WHATSAPP_ENROLL} />
      </div>
    )
  }

  // ── COURSE DETAIL ─────────────────────────────────────────────────
  if (course) {
    const meta = COURSE_CARD_META.find(m => m.id === course.id)
    const totalWeeks = course.belts.reduce((acc, b) => acc + b.weeks, 0)

    return (
      <div className="space-y-10">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors"
        >
          ← All Courses
        </button>

        {/* Course header */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy">{course.name}</h2>
              <p className="text-gray-500 text-sm mt-0.5">{course.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-navy/5 text-navy text-xs px-3 py-1.5 rounded-full font-medium">
              {course.belts.map(b => `${b.weeks} Wks`).join(' + ')} · Live Classes · Flexible Timetable
            </span>
            <span className="bg-teal/10 text-teal text-xs px-3 py-1.5 rounded-full font-medium">
              {course.globalAlign}
            </span>
          </div>
        </div>

        {/* Cybersecurity ethical-use notice */}
        {course.id === 'cybersecurity' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">⚖️</span>
            <div>
              <p className="font-semibold text-amber-900 text-sm mb-1">Responsible Use Statement</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                All cybersecurity skills taught at Metabridge Academy are for <strong>defensive and authorised testing purposes only</strong>.
                Students are trained in the legal and ethical use of security tools under the Nigerian Cybercrimes (Prohibition, Prevention, etc.) Act 2015.
                Applying these skills against systems you do not own or have explicit written permission to test is illegal and will result in immediate removal from the programme.
              </p>
            </div>
          </div>
        )}

        {/* Belt cards */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            Belt Progression — 3 Levels of Mastery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.belts.map(belt => (
              <BeltCard key={belt.level} courseId={course.id} belt={belt} />
            ))}
          </div>
        </div>

        {/* Portfolio projects */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
            Portfolio Projects — What You Will Build
          </p>
          <PortfolioProjectsTabs courseId={course.id} />
        </div>
      </div>
    )
  }

  // ── COURSE SELECTION GRID ─────────────────────────────────────────
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
        Select a course to explore its full curriculum, belt progression, and portfolio projects
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {COURSE_CARD_META.map(meta => (
          <button
            key={meta.id}
            onClick={() => handleSelect(meta.id)}
            className="group relative flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: 'transparent',
              outline: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = meta.color }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent' }}
          >
            <span
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-sm group-hover:scale-110 transition-transform duration-300"
              style={{ background: `${meta.color}18` }}
            >
              {meta.icon}
            </span>
            <div>
              <p
                className="font-heading font-bold text-base md:text-lg leading-tight mb-1"
                style={{ color: meta.color }}
              >
                {meta.name}
              </p>
              <p className="text-gray-400 text-xs leading-snug hidden sm:block">{meta.desc}</p>
            </div>

            {/* Belt progression dots */}
            {meta.id !== 'special-domains' && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-green-500" title="Green Belt" />
                <span className="text-gray-300 text-xs">→</span>
                <span className="w-3 h-3 rounded-full bg-blue-500" title="Blue Belt" />
                <span className="text-gray-300 text-xs">→</span>
                <span className="w-3 h-3 rounded-full bg-gray-800" title="Black Belt" />
              </div>
            )}
            {meta.id === 'special-domains' && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Intensive Programmes</span>
              </div>
            )}

            <span
              className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 text-white"
              style={{ background: meta.color }}
            >
              Explore →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
