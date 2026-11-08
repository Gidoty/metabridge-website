export interface BlogSection {
  heading?: string
  paragraphs?: string[]
  list?: string[]
  callout?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  categoryColor: string
  readTime: number
  publishedAt: string
  tags: string[]
  heroEmoji: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-start-cybersecurity-career-nigeria',
    title: 'How to Start a Career in Cybersecurity in Nigeria (2025 Guide)',
    description:
      'Everything you need to know about starting a cybersecurity career in Nigeria — job roles, salaries, required skills, and a step-by-step path to your first job.',
    category: 'Cybersecurity',
    categorySlug: 'cybersecurity',
    categoryColor: 'bg-red-100 text-red-700',
    readTime: 7,
    publishedAt: '2025-10-15',
    tags: ['cybersecurity', 'career', 'Nigeria', 'tech jobs'],
    heroEmoji: '🔐',
    sections: [
      {
        paragraphs: [
          'Cybersecurity is one of the fastest-growing career fields in the world — and Nigeria is no exception. As more businesses move online and digital fraud increases, organisations urgently need professionals who can protect their systems, data, and customers.',
          'The good news? You do not need a computer science degree to get into cybersecurity. What you need is the right training, hands-on practice, and a willingness to keep learning. This guide walks you through everything — from understanding what cybersecurity actually is, to landing your first job.',
        ],
      },
      {
        heading: 'What Does a Cybersecurity Professional Actually Do?',
        paragraphs: [
          'Cybersecurity professionals protect computer systems, networks, and data from attacks, breaches, and unauthorised access. The work ranges from setting up firewalls and monitoring network traffic, to investigating incidents after a breach occurs.',
          'Some roles are more technical (like a penetration tester who ethically hacks systems to find weaknesses), while others are more analytical (like a security analyst who monitors logs and responds to alerts).',
        ],
        list: [
          'Security Analyst — monitors systems for threats and responds to incidents',
          'Penetration Tester (Ethical Hacker) — tests systems to find vulnerabilities before attackers do',
          'SOC Analyst — works in a Security Operations Centre, handling live alerts',
          'Cybersecurity Consultant — advises organisations on improving their security posture',
          'Digital Forensics Analyst — investigates cyber incidents and recovers evidence',
        ],
      },
      {
        heading: 'Is Cybersecurity in Demand in Nigeria?',
        paragraphs: [
          'Absolutely. Nigerian banks, telecoms, fintechs, and government agencies are actively hiring cybersecurity professionals. The Central Bank of Nigeria (CBN) now mandates strict cybersecurity policies for all financial institutions, which has created thousands of compliance-driven roles.',
          'Beyond local jobs, cybersecurity is one of the most remote-work-friendly professions. Many Nigerians now work remotely for UK, US, and European firms — earning in pounds or dollars while living in Port Harcourt, Lagos, or Abuja.',
        ],
        callout:
          'One of our graduates, Chukwuma Obi, landed a remote cybersecurity contract with a UK firm four months after completing his training at Metabridge Academy — earning in pounds sterling.',
      },
      {
        heading: 'What Skills Do You Need?',
        paragraphs: [
          'A solid cybersecurity foundation covers both theory and practical skills. You will need to understand networking (how data moves between computers), operating systems (especially Linux), and how common attacks work so you can defend against them.',
        ],
        list: [
          'Networking fundamentals (TCP/IP, DNS, firewalls)',
          'Linux command line basics',
          'Understanding of common attack types (phishing, SQL injection, malware)',
          'Tools: Wireshark, Nmap, Metasploit (for ethical hacking practice)',
          'Security frameworks like NIST and ISO 27001',
          'Incident response and log analysis',
        ],
      },
      {
        heading: 'Do You Need a Degree?',
        paragraphs: [
          "No. Cybersecurity is one of the few tech fields where certifications and practical skills carry more weight than a university degree. Employers care whether you can protect their systems — not whether you have a 2:1 in Computer Science.",
          'Globally recognised certifications like CompTIA Security+, Certified Ethical Hacker (CEH), and CISSP are what hiring managers look for. A strong training programme will prepare you for these exams while giving you real-world projects to put in your portfolio.',
        ],
      },
      {
        heading: 'How Long Does It Take?',
        paragraphs: [
          'With focused training, you can build foundational cybersecurity skills in 3–6 months. Most entry-level roles require you to demonstrate practical skills and hold at least one certification.',
          "The key is not just watching videos or reading theory — it's building things. Set up a home lab, complete capture-the-flag (CTF) challenges, and work on projects you can show to employers.",
        ],
      },
      {
        heading: 'What Can You Earn?',
        paragraphs: [
          'Entry-level cybersecurity analysts in Nigeria typically earn between ₦150,000 and ₦400,000 per month. Mid-level professionals earn ₦500,000–₦1,000,000, and senior professionals or those on remote foreign contracts can earn significantly more.',
          'Remote roles with international companies pay in dollars or pounds. Even at modest international rates, that is well above the local market — and the demand is high.',
        ],
      },
      {
        heading: 'Your Step-by-Step Path',
        list: [
          'Step 1: Get trained — structured training beats self-teaching for most beginners',
          'Step 2: Build a home lab — practice on real tools and virtual environments',
          'Step 3: Complete portfolio projects — document what you have built',
          'Step 4: Pursue a certification — CompTIA Security+ is a great starting point',
          'Step 5: Apply and network — LinkedIn, tech communities, and referrals all matter',
        ],
        callout:
          'Metabridge Academy\'s Cybersecurity programme covers all of these steps, from zero to portfolio-ready, with industry professional instructors and hands-on projects.',
      },
    ],
  },

  {
    slug: 'what-is-blockchain-web3-beginners-guide-nigeria',
    title: 'Blockchain and Web3 Explained: A Beginner\'s Guide for Nigerians',
    description:
      'What is blockchain technology and Web3? This guide explains the basics in plain language — including real opportunities for Nigerians in the Web3 economy.',
    category: 'Blockchain & Web3',
    categorySlug: 'blockchain',
    categoryColor: 'bg-yellow-100 text-yellow-700',
    readTime: 6,
    publishedAt: '2025-10-20',
    tags: ['blockchain', 'Web3', 'cryptocurrency', 'DeFi', 'Nigeria'],
    heroEmoji: '⛓️',
    sections: [
      {
        paragraphs: [
          'If you have heard the words "blockchain", "Web3", or "NFT" and wondered what any of it actually means — you are not alone. These technologies are genuinely new and genuinely confusing at first. But once you understand the basics, you will see why billions of dollars are flowing into this space and why it represents real career opportunities for Nigerians.',
        ],
      },
      {
        heading: 'What is a Blockchain?',
        paragraphs: [
          'A blockchain is a type of database — but instead of being controlled by one company (like a bank or government), it is maintained by thousands of computers around the world simultaneously. No single person owns it. No single authority can change it.',
          'Every transaction or piece of data added to a blockchain is grouped into a "block". Each block is linked (chained) to the one before it, creating a permanent, unalterable record. Once something is written to a blockchain, it cannot be deleted or edited.',
          'This makes blockchain ideal for situations where you need to verify something without trusting a central authority — like sending money across borders without needing a bank, or proving you own a digital asset.',
        ],
      },
      {
        heading: 'Bitcoin vs Blockchain: What is the Difference?',
        paragraphs: [
          'Bitcoin is a cryptocurrency that runs on a blockchain. The blockchain is the technology; Bitcoin is one application of it. Think of the internet as the technology and email as one application — there are thousands of others.',
          'Ethereum is another blockchain, but it goes further than Bitcoin. It allows developers to build applications (called "decentralised applications" or dApps) on top of it. This opened up an entire new world of possibilities.',
        ],
      },
      {
        heading: 'What is Web3?',
        paragraphs: [
          'Web3 is a vision for the next version of the internet — one where users own their data, their money, and their digital assets, rather than handing control to corporations like Google, Facebook, or banks.',
          'Web1 was the early internet: static pages you could only read. Web2 is the internet today: interactive platforms (social media, apps) where companies own your data and earn money from it. Web3 uses blockchain to give that ownership back to users.',
        ],
      },
      {
        heading: 'Key Concepts You Need to Know',
        list: [
          'Smart Contracts — self-executing code stored on a blockchain; they run automatically when conditions are met, with no middleman',
          'DeFi (Decentralised Finance) — financial services (lending, trading, saving) that run on blockchains instead of banks',
          'NFTs (Non-Fungible Tokens) — unique digital assets verified on a blockchain; used for digital art, tickets, and more',
          'Wallets — software that holds your cryptocurrency and allows you to interact with blockchain applications',
          'Gas Fees — the transaction fees you pay to use the Ethereum network',
          'Tokens — digital assets issued on a blockchain, often representing ownership or voting rights in a project',
        ],
      },
      {
        heading: 'Why Should Nigerians Care About Web3?',
        paragraphs: [
          'Nigeria has one of the highest cryptocurrency adoption rates in Africa, partly driven by the need to send remittances, protect savings from naira devaluation, and access global markets without depending on traditional banks.',
          'Web3 also creates new income streams: developers can build dApps and earn fees, creators can sell directly to global audiences without platforms taking large cuts, and community managers can earn tokens for growing Web3 projects.',
        ],
        callout:
          'Nigeria consistently ranks among the top five countries globally for peer-to-peer crypto trading volume — the ecosystem here is real and growing.',
      },
      {
        heading: 'Career Opportunities in Web3',
        list: [
          'Blockchain Developer — writes smart contracts and builds dApps (high demand, high pay)',
          'Web3 Community Manager — grows and manages communities for Web3 projects',
          'Smart Contract Auditor — reviews code for security vulnerabilities',
          'Tokenomics Designer — designs the economic systems of tokens and projects',
          'Web3 Content Writer — creates educational content, whitepapers, and documentation',
          'DeFi Analyst — researches and advises on decentralised finance protocols',
        ],
      },
      {
        heading: 'How to Get Started',
        paragraphs: [
          'The best starting point is understanding how to use Web3 tools yourself: set up a wallet, buy a small amount of crypto, interact with a decentralised app. Hands-on experience teaches you more than any video.',
          'From there, focus on either the technical side (learning to build with Solidity, the main smart contract language) or the non-technical side (community management, content, research). Both paths have strong career prospects.',
        ],
        callout:
          "Metabridge Academy's Blockchain and Web3 programme takes you from complete beginner to building your own smart contracts and navigating the Web3 ecosystem.",
      },
    ],
  },

  {
    slug: 'data-analytics-career-nigeria',
    title: 'Data Analytics Career in Nigeria: Tools, Salaries, and How to Get Started',
    description:
      'Everything you need to know about starting a data analytics career in Nigeria — from the tools employers want to salary ranges and how to build a portfolio.',
    category: 'Data Analytics',
    categorySlug: 'data-analytics',
    categoryColor: 'bg-teal-100 text-teal-700',
    readTime: 7,
    publishedAt: '2025-10-28',
    tags: ['data analytics', 'Power BI', 'SQL', 'Excel', 'Nigeria', 'career'],
    heroEmoji: '📊',
    sections: [
      {
        paragraphs: [
          'Data is now one of the most valuable resources in the world — and organisations everywhere need people who can make sense of it. Data analytics is the skill of collecting, cleaning, analysing, and presenting data to help businesses make better decisions.',
          'In Nigeria, the demand for data analysts has grown significantly as banks, telecoms, e-commerce companies, and government agencies all try to use their data more intelligently. If you are detail-oriented and enjoy finding patterns and answers in numbers, data analytics might be your best career move.',
        ],
      },
      {
        heading: 'What Does a Data Analyst Actually Do?',
        paragraphs: [
          'A data analyst collects data from various sources, cleans it (removing errors and inconsistencies), analyses it using statistical methods and tools, and then presents findings through charts, dashboards, and reports.',
          'The job is about answering business questions: Why did sales drop last quarter? Which customer segment is most profitable? What products are likely to run out of stock? A data analyst turns raw numbers into actionable answers.',
        ],
        list: [
          'Collect and clean data from databases, spreadsheets, and APIs',
          'Analyse trends and patterns using Excel, SQL, or Python',
          'Build dashboards and reports in Power BI or Tableau',
          'Present findings and recommendations to managers and stakeholders',
          'Work with business teams to define what data needs to be tracked',
        ],
      },
      {
        heading: 'Tools Every Data Analyst Should Know',
        paragraphs: [
          'The core toolkit for data analytics in Nigeria (and globally) consists of a few key tools. You do not need to master all of them immediately, but developing competence in each will make you a strong candidate.',
        ],
        list: [
          'Microsoft Excel — still the most widely used tool for data analysis in Nigerian organisations; pivot tables, VLOOKUP, and data visualisation basics are essential',
          'SQL — the standard language for querying databases; almost every data role requires SQL',
          'Power BI — Microsoft\'s business intelligence tool, hugely popular in Nigerian corporates for dashboards and reports',
          'Python or R — for more advanced analysis and automation (optional for entry-level, increasingly required for mid-level)',
          'Google Sheets — for smaller organisations and collaborative analysis',
        ],
      },
      {
        heading: 'Is Data Analytics in Demand in Nigeria?',
        paragraphs: [
          'Yes — and the demand is growing fast. Banks like GTBank, Zenith, and Access, telecoms like MTN and Airtel, and fintechs like Flutterwave and Paystack all hire data analysts. The oil and gas sector in Rivers State, healthcare organisations, and logistics companies are also hiring.',
          'Beyond Nigeria, data analytics is fully remote-compatible. Many Nigerian analysts work for international companies, consulting remotely while based in Nigeria.',
        ],
      },
      {
        heading: 'What Can a Data Analyst Earn in Nigeria?',
        paragraphs: [
          'Entry-level data analysts in Nigeria typically earn between ₦150,000 and ₦350,000 per month. Mid-level analysts with 2–4 years of experience earn ₦400,000–₦800,000. Senior analysts and data scientists can earn above ₦1,000,000 per month.',
          'Remote roles for international companies pay significantly more — many Nigerian data analysts earn in dollars, with salaries ranging from $1,500 to $5,000 per month depending on experience and employer.',
        ],
        callout:
          'The gap between local and international salaries makes upskilling in data analytics one of the highest-ROI career investments a Nigerian professional can make.',
      },
      {
        heading: 'Do You Need a Mathematics Background?',
        paragraphs: [
          'Not necessarily. While a comfort with numbers helps, modern data analytics tools handle most of the heavy mathematical lifting. What matters more is logical thinking, attention to detail, and the ability to tell a clear story with data.',
          'Many successful data analysts come from non-technical backgrounds — business, economics, healthcare, even the arts. The tools are learnable. The critical thinking mindset is what differentiates good analysts from great ones.',
        ],
      },
      {
        heading: 'How to Build a Portfolio as a Data Analyst',
        paragraphs: [
          'Employers want proof that you can do the work, not just that you completed a course. A portfolio of two to four projects is often the difference between getting an interview and being ignored.',
        ],
        list: [
          'Sales analysis dashboard — take a public retail dataset and build a Power BI report',
          'SQL analysis project — query a public database and answer specific business questions',
          'Excel business report — build a comprehensive analysis with pivot tables and charts',
          'Case study — pick a real Nigerian business problem and analyse it with available data',
        ],
        callout:
          "Metabridge Academy's Data Analytics programme is built around portfolio projects. You graduate with real work to show, not just a certificate.",
      },
    ],
  },

  {
    slug: 'ai-tools-nigerians-earn-more-2025',
    title: 'How AI Tools Are Helping Nigerians Earn More in 2025',
    description:
      'Practical ways Nigerians are using AI tools to work faster, deliver better results, and earn more — whether freelancing, running a business, or in employment.',
    category: 'Artificial Intelligence',
    categorySlug: 'ai',
    categoryColor: 'bg-purple-100 text-purple-700',
    readTime: 6,
    publishedAt: '2025-11-01',
    tags: ['AI tools', 'ChatGPT', 'freelancing', 'Nigeria', 'make money'],
    heroEmoji: '🤖',
    sections: [
      {
        paragraphs: [
          'Artificial intelligence is no longer a future technology — it is here, and Nigerians who know how to use it effectively are already earning more, working faster, and delivering results that impress clients and employers.',
          'This is not about AI replacing jobs (at least not the way most people fear). It is about AI tools making skilled individuals dramatically more productive. The person who knows how to use AI well can do the work of three people. That is what employers and clients are paying for.',
        ],
      },
      {
        heading: 'The AI Tools That Are Actually Useful',
        paragraphs: [
          'There are hundreds of AI tools, but only a handful are genuinely transforming how Nigerians work. Here are the ones that matter most right now.',
        ],
        list: [
          'ChatGPT / Claude — for writing, research, coding assistance, customer service drafts, and brainstorming; daily tools for writers, marketers, and developers',
          'Midjourney / Leonardo AI — for generating images and visual content; used by graphic designers, marketers, and social media managers',
          'GitHub Copilot — AI coding assistant that dramatically speeds up software development',
          'Notion AI / Gamma — for creating presentations, documents, and structured content in minutes',
          'ElevenLabs — for voice generation and cloning; used for content creation, YouTube, and podcasting',
          'Canva AI — for rapid design and marketing material creation',
        ],
      },
      {
        heading: 'How Nigerians Are Using AI to Earn More',
        paragraphs: [
          'The clearest applications are in freelancing and content creation. A copywriter who used to deliver 3 articles a day can now deliver 10 with AI assistance — meaning more clients, more income. A graphic designer who spent hours on a concept can now explore dozens of directions in an hour.',
        ],
        list: [
          'AI-powered copywriting and content marketing — writing faster, charging the same (or more)',
          'AI-assisted web development — delivering projects in half the time using tools like GitHub Copilot',
          'AI content creation — building YouTube channels, newsletters, and social media with AI-generated drafts',
          'AI customer service automation — building WhatsApp and web chatbots for small businesses',
          'AI prompt engineering — specialist skill in writing effective prompts for AI tools; companies hire for this',
          'AI consulting — helping Nigerian SMEs integrate AI tools into their workflows',
        ],
      },
      {
        heading: 'The Skill That Separates AI Users from AI Experts',
        paragraphs: [
          'Anyone can type a question into ChatGPT. But getting genuinely useful, high-quality output — the kind you can send to a client or publish — requires understanding how to write effective prompts, how to chain AI outputs together, and how to integrate multiple tools.',
          'This is what people mean by "prompt engineering" and "AI workflow design". These are learnable skills, and they dramatically increase what you can produce with AI tools.',
        ],
        callout:
          'One of our graduates built a WhatsApp group management agent using AI automation tools — a project that now earns him a recurring fee for managing community groups for clients.',
      },
      {
        heading: 'What AI Cannot Replace (Yet)',
        paragraphs: [
          'AI tools are powerful but not omniscient. They produce confident-sounding text that is sometimes wrong. They lack genuine creativity and strategic thinking. They cannot build relationships or exercise nuanced judgement in complex situations.',
          'The winning formula is: strong domain expertise + AI tools. An accountant who knows accounting deeply will use AI to do better work, faster. A developer who understands software architecture will use AI coding tools to ship better products. AI amplifies skills — it does not replace them.',
        ],
      },
      {
        heading: 'How to Get Started',
        paragraphs: [
          'The best way to learn AI tools is to use them on real work immediately. Pick one tool (ChatGPT is the best starting point) and commit to using it every day for your actual tasks — writing, research, planning, coding. Notice where it helps and where it falls short.',
          'Then go deeper: take a structured AI training programme that covers how these tools work under the hood, how to build AI-powered applications, and how to use AI in real business contexts.',
        ],
        callout:
          "Metabridge Academy's Artificial Intelligence programme covers AI tools, prompt engineering, automation workflows, and how to build AI-powered applications — all with hands-on projects.",
      },
    ],
  },

  {
    slug: 'earn-dollars-from-nigeria-tech-skills',
    title: '5 Tech Skills That Can Help You Earn in Dollars from Nigeria',
    description:
      'The tech skills with the strongest remote work potential for Nigerians — and what it realistically takes to land your first international client or remote job.',
    category: 'Career',
    categorySlug: 'career',
    categoryColor: 'bg-green-100 text-green-700',
    readTime: 6,
    publishedAt: '2025-11-05',
    tags: ['remote work', 'freelancing', 'dollar income', 'Nigeria', 'tech skills'],
    heroEmoji: '💵',
    sections: [
      {
        paragraphs: [
          'The devaluation of the naira has pushed many Nigerians to look for ways to earn in foreign currency — particularly dollars. The good news is that tech skills are one of the most reliable pathways to dollar income, and the barrier to entry has never been lower.',
          'This guide covers five tech skills with strong remote work and freelancing potential, what earning them realistically requires, and how to position yourself to land your first international opportunity.',
        ],
      },
      {
        heading: '1. Cybersecurity',
        paragraphs: [
          'Cybersecurity professionals are in short supply globally. The UK, US, Canada, and Australia all face significant gaps between the number of roles available and qualified people to fill them. This creates a strong incentive for companies to hire remotely.',
          'Nigerian cybersecurity professionals with solid skills and certifications (CompTIA Security+, CEH) are actively landing remote contracts with international companies. Entry-level remote roles typically pay $1,500–$3,000 per month.',
        ],
      },
      {
        heading: '2. Software Development',
        paragraphs: [
          'Software developers have always been among the most sought-after remote workers. Full-stack developers who know JavaScript, Python, or mobile development frameworks can find work on platforms like Toptal, Andela, and direct LinkedIn applications.',
          'Web development is the most common entry point. Building a portfolio of real applications, contributing to open source, and becoming proficient in modern frameworks are the keys to standing out.',
        ],
      },
      {
        heading: '3. Data Analytics and Business Intelligence',
        paragraphs: [
          'Remote data analytics roles are growing rapidly. Companies need analysts who can work asynchronously, communicate clearly in writing, and deliver accurate dashboards and reports. These roles are well-suited to remote work because the deliverables are digital and the work is largely independent.',
          'Power BI, SQL, and Python proficiency are the most valued. Specialising in a particular industry (fintech, e-commerce, logistics) can further increase your earning potential.',
        ],
      },
      {
        heading: '4. UI/UX Design',
        paragraphs: [
          'UI/UX designers are in demand globally, and design is one of the easiest skills to demonstrate remotely — your portfolio is entirely visual and can be shared with anyone, anywhere. Platforms like Dribbble and Behance let Nigerian designers attract international clients directly.',
          'Figma is the dominant tool, and freelance rates for good UI/UX designers range from $30–$100 per hour internationally.',
        ],
      },
      {
        heading: '5. Blockchain Development',
        paragraphs: [
          'Blockchain developers are among the best-paid in tech globally. The Web3 ecosystem has significant demand for Solidity developers, smart contract auditors, and backend developers who understand blockchain infrastructure.',
          'Web3 projects are often fully remote by nature (the teams are globally distributed). Nigerian blockchain developers who build a credible portfolio and engage with Web3 communities can find work and even earn in cryptocurrency.',
        ],
      },
      {
        heading: 'What It Realistically Takes',
        paragraphs: [
          'Dollar-earning tech roles do not come without effort. Here is what most successful Nigerians who make the transition have in common:',
        ],
        list: [
          'A portfolio of real, demonstrable work — not just a certificate',
          'At least one strong certification or proof of skill',
          'An English communication ability that instils confidence in international clients',
          'A LinkedIn profile that clearly positions you as a professional',
          'Patience — the first international role usually takes 3–9 months of focused job searching',
          'The right banking setup (Domiciliary account or fintech like Grey, Geegpay) to receive foreign currency',
        ],
      },
      {
        heading: 'Where to Find Dollar-Paying Work',
        list: [
          'Toptal — high-bar platform for top-tier developers and designers',
          'Andela — focused on African tech talent for international companies',
          'Upwork — large freelance marketplace with many tech categories',
          'Fiverr — better for packaged services (design, writing, WordPress)',
          'LinkedIn — direct applications for remote roles at international companies',
          'Remote.co, We Work Remotely — job boards focused on fully remote roles',
        ],
        callout:
          'The skills you need to earn internationally are the same skills we teach at Metabridge Academy. The difference is that we build your portfolio alongside your knowledge, so you have proof of ability when you start applying.',
      },
    ],
  },

  {
    slug: 'web-development-nigeria-2025',
    title: 'Is Web Development Still Worth Learning in Nigeria in 2025?',
    description:
      'Is the web development market too crowded? We look honestly at job demand, freelance opportunities, salaries, and how to stand out in Nigeria in 2025.',
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    readTime: 7,
    publishedAt: '2025-11-08',
    tags: ['web development', 'programming', 'Nigeria', 'career', 'JavaScript'],
    heroEmoji: '💻',
    sections: [
      {
        paragraphs: [
          '"Is web development too saturated?" is one of the most common questions from Nigerians considering a career in tech. It is a fair question. Web development courses are everywhere, and many people have learned to code. So is it still worth it?',
          'The honest answer: yes — but with important nuances. The floor of web development has become crowded, but the ceiling remains very high. This guide explains what that means and how to position yourself on the right side of that divide.',
        ],
      },
      {
        heading: 'What is the Current State of Web Development in Nigeria?',
        paragraphs: [
          'Demand for web developers in Nigeria remains strong. Every startup, every SME, every government agency moving online needs web development work done. The Nigerian digital economy is growing, and that growth requires developers.',
          'At the same time, many people have learned basic HTML, CSS, and even React — but not at a professional level. This has created a gap: there are many people who can build simple websites, but fewer who can build production-quality applications. The latter are still very much in demand.',
        ],
      },
      {
        heading: 'What Technologies Should You Learn?',
        paragraphs: [
          'The core of modern web development is JavaScript. Everything else builds on it. Here is a practical learning path for 2025:',
        ],
        list: [
          'HTML and CSS fundamentals — still essential for every web developer',
          'JavaScript — the most important language for web development',
          'React.js — the most widely used frontend framework; dominant in job postings',
          'Node.js — for backend development with JavaScript',
          'SQL databases — PostgreSQL and MySQL remain essential',
          'Git and GitHub — version control is non-negotiable for professional work',
          'TypeScript — increasingly required for professional React and Node.js work',
          'Next.js — the leading framework for production React applications',
        ],
      },
      {
        heading: 'Freelancing vs Employment: Which Path?',
        paragraphs: [
          'Many Nigerian web developers start by freelancing — building websites for local businesses, schools, churches, and SMEs. This is a good way to earn while you learn, but it has a ceiling if you stay at the basic website level.',
          'Employment with a tech company (startup, agency, or corporate digital team) tends to offer more structured growth, exposure to larger codebases, and faster career development. Many developers do both — freelance initially, then move to employment, then sometimes return to freelancing at higher rates.',
        ],
      },
      {
        heading: 'How Much Can a Web Developer Earn in Nigeria?',
        paragraphs: [
          'Entry-level developers (0–2 years) typically earn ₦100,000–₦300,000 per month in employment. Mid-level developers with 2–5 years of experience earn ₦400,000–₦800,000. Senior developers and tech leads earn above ₦1,000,000.',
          'Freelance earnings vary enormously. Basic local websites pay little, but complex web applications for businesses or international freelance work can pay significantly more. A good mid-level Nigerian developer on Upwork or Toptal can earn $3,000–$6,000 per month.',
        ],
      },
      {
        heading: 'What Makes a Developer Stand Out in 2025?',
        paragraphs: [
          'The developers who struggle are those who learned the basics and stopped. The developers who thrive are those who kept going — mastering TypeScript, learning to work with APIs and databases, understanding performance and security, and building projects that solve real problems.',
        ],
        list: [
          'Build real projects with real users — not just tutorial clones',
          'Contribute to open-source projects — it signals commitment and builds your GitHub profile',
          'Specialise in an industry (fintech, edtech, e-commerce) — domain knowledge multiplies your value',
          'Learn to test your code properly — a differentiator that many Nigerian developers skip',
          'Write about what you build — a blog or LinkedIn presence builds your reputation',
        ],
        callout:
          'At Metabridge Academy, our web development programme goes beyond the basics — you graduate with a production-quality project in your portfolio, not just a knowledge of syntax.',
      },
      {
        heading: 'Should You Learn Web Development?',
        paragraphs: [
          'If you enjoy building things, solving problems, and you are willing to invest 6–12 months in serious learning, web development is still one of the best career decisions you can make in Nigeria in 2025.',
          'The key is to not stop at "I can build a website." Aim for "I can build a production-quality application that businesses trust with their data and customers." That level of skill is in high demand and is very well compensated.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getRelatedPosts(current: BlogPost, count = 2): BlogPost[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== current.slug && p.categorySlug === current.categorySlug
  )
    .concat(BLOG_POSTS.filter((p) => p.slug !== current.slug && p.categorySlug !== current.categorySlug))
    .slice(0, count)
}
