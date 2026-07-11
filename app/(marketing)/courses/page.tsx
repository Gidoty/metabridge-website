import type { Metadata } from 'next'
import Link from 'next/link'
import FadeInSection from '@/components/FadeInSection'
import { formatNGN } from '@/lib/products'
import { WHATSAPP_ENROLL } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Courses & Programmes',
  description:
    'Explore Metabridge Academy belt-based programmes in Cybersecurity, Data Analytics, AI and Prompt Engineering, and Blockchain. Green Belt, Blue Belt, and Black Belt certifications for every level.',
  openGraph: {
    title: 'Courses & Programmes | Metabridge Academy',
    description:
      'Three belt levels. Four courses. One career transformation. Choose your path at Metabridge Academy.',
    url: 'https://metabridgeacademy.com/courses',
  },
}

type BeltLevel = 'green' | 'blue' | 'black'

interface BeltData {
  level: BeltLevel
  label: string
  weeks: number
  hours: number
  sessions: number
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
  belts: BeltData[]
}

const COURSES: CourseData[] = [
  {
    id: 'cybersecurity',
    icon: '🛡️',
    name: 'Cybersecurity',
    tagline: 'From Foundations to Expert Penetration Tester',
    globalAlign: 'CompTIA Security+ · CEH v13 · CISSP · OSCP',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        hours: 16,
        sessions: 8,
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
        hours: 32,
        sessions: 16,
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
        hours: 48,
        sessions: 24,
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
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        hours: 16,
        sessions: 8,
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
        hours: 32,
        sessions: 16,
        price: 45000,
        prerequisite: 'Green Belt or solid intermediate Excel skills',
        topics: [
          'XLOOKUP, Dynamic Arrays and Advanced Excel Functions',
          'Financial Functions: NPV, IRR and PMT for Business Analysis',
          'Power Query: ETL Transformations and Data Shaping',
          'Power Pivot and DAX: Calculated Measures, KPIs and Time Intelligence',
          'SQL from SELECT through JOINs to Window Functions',
          'Advanced Power BI: Data Models, Relationships and Bookmarks',
          'Tableau: Dashboards, LOD Expressions and Data Storytelling',
          'Sector-Specific Analytics for Nigerian Industries and Capstone',
        ],
        tools: ['Excel Advanced', 'Power Query', 'Power Pivot', 'SQL', 'Power BI', 'Tableau'],
        careers: ['Data Analyst', 'Business Intelligence Analyst', 'Financial Analyst'],
        certAlign: 'Microsoft Power BI Data Analyst PL-300 · Tableau Desktop Specialist',
      },
      {
        level: 'black',
        label: 'Expert Mastery',
        weeks: 12,
        hours: 48,
        sessions: 24,
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
    name: 'Artificial Intelligence & Prompt Engineering',
    tagline: 'From AI Novice to AI Solutions Architect',
    globalAlign: 'Google AI Essentials · DeepLearning.AI · AWS ML Specialty',
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        hours: 16,
        sessions: 8,
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
        hours: 32,
        sessions: 16,
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
        hours: 48,
        sessions: 24,
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
    belts: [
      {
        level: 'green',
        label: 'Foundation Level',
        weeks: 4,
        hours: 16,
        sessions: 8,
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
        hours: 32,
        sessions: 16,
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
        hours: 48,
        sessions: 24,
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
      {/* Colored header */}
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
            {belt.hours} Hours
          </span>
          <span className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
            {belt.sessions} Sessions
          </span>
        </div>
        <div style={{ color: cfg.priceColor }} className="text-3xl font-bold font-heading">
          {formatNGN(belt.price)}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white flex-1 flex flex-col p-6">
        {/* Prerequisite */}
        <div className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2.5 mb-5 text-xs text-gray-600">
          <span className="font-semibold text-gray-400 uppercase tracking-wide flex-shrink-0 mt-0.5">
            Prereq:
          </span>
          <span>{belt.prerequisite}</span>
        </div>

        {/* Curriculum */}
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

        {/* Tools */}
        <div className="mb-4">
          <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">
            Tools &amp; Labs
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {belt.tools.map(tool => (
              <span
                key={tool}
                className="bg-navy/5 text-navy text-xs px-2.5 py-1 rounded-full font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Career outcomes */}
        <div className="mb-4">
          <h4 className="font-semibold text-navy text-xs uppercase tracking-wide mb-2">
            Career Outcomes
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {belt.careers.map(career => (
              <span
                key={career}
                className="bg-orange/10 text-orange text-xs px-2.5 py-1 rounded-full font-medium"
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* Certificate and global alignment */}
        <div className="bg-light-bg rounded-lg px-3 py-2.5 mb-5 text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-navy">🏆 QR-Verified Certificate</span>
          <br />
          Aligns with: {belt.certAlign}
        </div>

        {/* CTA buttons */}
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

const courseBgColors: Record<string, string> = {
  cybersecurity: 'bg-white',
  'data-analytics': 'bg-light-bg',
  'artificial-intelligence': 'bg-white',
  blockchain: 'bg-light-bg',
}

export default function CoursesPage() {
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
              <span className="text-white/80 text-sm font-medium">3 Levels of Mastery · 4 Courses</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
              Choose Your Belt.{' '}
              <span className="text-orange">Own Your Future.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Every course follows a three-tier belt progression: Green Belt foundations, Blue Belt professional skills, and Black Belt expert mastery. Start where you are. Go as far as you want.
            </p>
            {/* Belt legend */}
            <div className="inline-flex flex-wrap justify-center gap-4">
              {[
                { emoji: '🟢', name: 'Green Belt', sub: 'Foundation', color: '#4ade80' },
                { emoji: '🔵', name: 'Blue Belt', sub: 'Professional', color: '#93c5fd' },
                { emoji: '⚫', name: 'Black Belt', sub: 'Expert Mastery', color: '#fbbf24' },
              ].map(b => (
                <div
                  key={b.name}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2"
                >
                  <span className="text-lg">{b.emoji}</span>
                  <div className="text-left">
                    <p style={{ color: b.color }} className="text-xs font-bold leading-none">{b.name}</p>
                    <p className="text-white/50 text-xs">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* STICKY COURSE NAV */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <nav className="flex gap-0 overflow-x-auto">
            {COURSES.map(course => (
              <a
                key={course.id}
                href={`#${course.id}`}
                className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-gray-500 hover:text-navy hover:border-b-2 hover:border-orange whitespace-nowrap transition-colors flex-shrink-0"
              >
                <span>{course.icon}</span>
                <span>{course.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* COURSE SECTIONS */}
      {COURSES.map((course, idx) => (
        <section
          key={course.id}
          id={course.id}
          className={`section-padding ${courseBgColors[course.id] ?? 'bg-white'}`}
        >
          <div className="container-custom">
            {/* Course header */}
            <FadeInSection>
              <div className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-navy">{course.name}</h2>
                    <p className="text-gray-500 text-sm mt-0.5">{course.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-navy/5 text-navy text-xs px-3 py-1.5 rounded-full font-medium">
                    4 + 8 + 12 Weeks · Three Belt Levels
                  </span>
                  <span className="bg-teal/10 text-teal text-xs px-3 py-1.5 rounded-full font-medium">
                    Global Alignment: {course.globalAlign}
                  </span>
                </div>
              </div>
            </FadeInSection>

            {/* Belt cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {course.belts.map((belt, bi) => (
                <FadeInSection key={belt.level} delay={bi * 120}>
                  <BeltCard courseId={course.id} belt={belt} />
                </FadeInSection>
              ))}
            </div>

            {idx < COURSES.length - 1 && (
              <div className="mt-16 border-b border-gray-200" />
            )}
          </div>
        </section>
      ))}

      {/* BOTTOM CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2B8A9C 100%)' }}
      >
        <div className="container-custom text-center">
          <FadeInSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Belt to Start With?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our admissions team will help you find the right level and course for your goals and background. No sales pressure.
            </p>
            <a
              href={WHATSAPP_ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-navy font-bold px-8 py-4 rounded-xl hover:bg-orange hover:text-white transition-colors text-lg"
            >
              💬 Chat with Us on WhatsApp
            </a>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
