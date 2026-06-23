import type { QuizQuestion } from '@/lib/types/quiz'

export const FREE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'f1',
    text: 'What does "HTTPS" stand for?',
    options: [
      'HyperText Transfer Protocol Secure',
      'High Transfer Protocol System',
      'Hyper Terminal Protocol Service',
      'HyperText Transmission Process Secure',
    ],
    correctOption: 0,
  },
  {
    id: 'f2',
    text: 'Which of these is an example of phishing?',
    options: [
      'A software update notification from your OS',
      'An email pretending to be your bank asking for your password',
      'A pop-up ad for a product you viewed',
      'A friend request on a social network',
    ],
    correctOption: 1,
  },
  {
    id: 'f3',
    text: 'What is a "firewall" in cybersecurity?',
    options: [
      'A physical wall that protects server rooms',
      'Software that deletes viruses automatically',
      'A system that monitors and controls incoming/outgoing network traffic',
      'A tool for encrypting email messages',
    ],
    correctOption: 2,
  },
  {
    id: 'f4',
    text: 'Which password is the most secure?',
    options: [
      'password123',
      'MyName1990',
      'Tr@ff1c-L!ght-9#Blue',
      'qwerty',
    ],
    correctOption: 2,
  },
  {
    id: 'f5',
    text: 'What does "2FA" mean?',
    options: [
      'Two-Factor Authentication',
      'Two-File Access',
      'Dual-Form Authorisation',
      'Two-Firewall Architecture',
    ],
    correctOption: 0,
  },
  {
    id: 'f6',
    text: 'What is malware?',
    options: [
      'A type of hardware that slows down computers',
      'A programming language used for security',
      'Software designed to disrupt, damage, or gain unauthorised access to systems',
      'An internet service provider tool',
    ],
    correctOption: 2,
  },
  {
    id: 'f7',
    text: 'What is the purpose of encryption?',
    options: [
      'To speed up internet connections',
      'To convert data into a coded form to prevent unauthorised access',
      'To compress files for storage',
      'To back up data to the cloud',
    ],
    correctOption: 1,
  },
  {
    id: 'f8',
    text: 'Which of the following is NOT a type of malware?',
    options: [
      'Ransomware',
      'Spyware',
      'Firmware',
      'Trojan Horse',
    ],
    correctOption: 2,
  },
  {
    id: 'f9',
    text: 'What does VPN stand for?',
    options: [
      'Virtual Private Network',
      'Very Protected Node',
      'Verified Public Network',
      'Virtual Protocol Number',
    ],
    correctOption: 0,
  },
  {
    id: 'f10',
    text: 'What is "social engineering" in cybersecurity?',
    options: [
      'Building social media applications',
      'Engineering better social platforms',
      'Manipulating people into divulging confidential information',
      'A technique for writing better code',
    ],
    correctOption: 2,
  },
  {
    id: 'f11',
    text: 'Which of these is a good data analytics practice?',
    options: [
      'Deleting outliers immediately without investigation',
      'Sharing raw personal data publicly for transparency',
      'Cleaning and validating data before analysis',
      'Using the first result you find as your conclusion',
    ],
    correctOption: 2,
  },
  {
    id: 'f12',
    text: 'What is a "hash" in computing?',
    options: [
      'A type of database query',
      'A fixed-size output generated from input data by a hash function',
      'A method of sorting arrays',
      'A network protocol for secure transfer',
    ],
    correctOption: 1,
  },
  {
    id: 'f13',
    text: 'What does "AI" stand for in technology?',
    options: [
      'Automated Instructions',
      'Artificial Intelligence',
      'Advanced Integration',
      'Automated Input',
    ],
    correctOption: 1,
  },
  {
    id: 'f14',
    text: 'What is a blockchain?',
    options: [
      'A type of computer processor',
      'A programming language for mobile apps',
      'A distributed ledger that records transactions across multiple computers',
      'A secure email protocol',
    ],
    correctOption: 2,
  },
  {
    id: 'f15',
    text: 'Which action best protects your online accounts?',
    options: [
      'Using the same strong password everywhere',
      'Writing passwords on paper near your computer',
      'Using unique passwords and a password manager',
      'Only logging in from public Wi-Fi',
    ],
    correctOption: 2,
  },
]

export const PAID_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'p1',
    text: 'In the STRIDE threat model, what does "T" stand for?',
    options: ['Tampering', 'Tracking', 'Theft', 'Tunneling'],
    correctOption: 0,
  },
  {
    id: 'p2',
    text: 'Which SQL clause is used to filter groups after aggregation?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'FILTER'],
    correctOption: 1,
  },
  {
    id: 'p3',
    text: 'What is the primary use of a "prompt" in generative AI?',
    options: [
      'To train the model on new data',
      'To provide natural-language input that guides the model\'s output',
      'To increase the model\'s processing speed',
      'To compress the model\'s weights',
    ],
    correctOption: 1,
  },
  {
    id: 'p4',
    text: 'What is a smart contract?',
    options: [
      'A legal document stored on a cloud server',
      'Self-executing code stored on a blockchain that runs when conditions are met',
      'An AI-generated contract for business agreements',
      'A secured email between two parties',
    ],
    correctOption: 1,
  },
  {
    id: 'p5',
    text: 'What does CVSS stand for?',
    options: [
      'Common Vulnerability Scoring System',
      'Cyber Vulnerability Security Standard',
      'Critical Vulnerability Summary Score',
      'Centralised Vulnerability Scanning Service',
    ],
    correctOption: 0,
  },
  {
    id: 'p6',
    text: 'In Power BI, what is a "measure"?',
    options: [
      'A unit of storage for datasets',
      'A calculated field defined using DAX that computes dynamically based on filters',
      'A visual component for displaying bar charts',
      'A connector for importing Excel data',
    ],
    correctOption: 1,
  },
  {
    id: 'p7',
    text: 'What is "hallucination" in the context of LLMs?',
    options: [
      'When the model runs too slowly due to large input',
      'When the model confidently generates false or fabricated information',
      'When the model refuses to answer a question',
      'When the model repeats the prompt verbatim',
    ],
    correctOption: 1,
  },
  {
    id: 'p8',
    text: 'What is the ERC-20 standard?',
    options: [
      'A European cybersecurity regulation',
      'A token standard on the Ethereum blockchain defining a common set of rules',
      'An encryption algorithm for blockchain wallets',
      'A consensus mechanism used by Ethereum',
    ],
    correctOption: 1,
  },
  {
    id: 'p9',
    text: 'What is a "zero-day vulnerability"?',
    options: [
      'A vulnerability that takes zero days to patch',
      'A flaw that has existed for zero days since discovery',
      'A security flaw unknown to the vendor with no patch available',
      'A vulnerability that only affects zero-trust networks',
    ],
    correctOption: 2,
  },
  {
    id: 'p10',
    text: 'In data analytics, what does ETL stand for?',
    options: [
      'Export, Transform, Load',
      'Extract, Transform, Load',
      'Extract, Transfer, Log',
      'Encode, Transform, Link',
    ],
    correctOption: 1,
  },
  {
    id: 'p11',
    text: 'What is "few-shot prompting"?',
    options: [
      'Using very short prompts with a language model',
      'Providing a small number of examples in the prompt to guide the model\'s output',
      'A technique to reduce model response length',
      'Running the model with limited compute resources',
    ],
    correctOption: 1,
  },
  {
    id: 'p12',
    text: 'What is DeFi?',
    options: [
      'Decentralised Finance — financial services built on blockchain without traditional intermediaries',
      'Digital Finance — the use of digital tools in traditional banking',
      'Deferred Finance — a payment model for tech companies',
      'Defensive Finance — a strategy for protecting financial assets',
    ],
    correctOption: 0,
  },
  {
    id: 'p13',
    text: 'What is a penetration test?',
    options: [
      'Testing internet connection speed',
      'An authorised simulated cyberattack to identify vulnerabilities',
      'A method for compressing encrypted files',
      'A test to measure database query performance',
    ],
    correctOption: 1,
  },
  {
    id: 'p14',
    text: 'Which Python library is most commonly used for data manipulation and analysis?',
    options: ['NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
    correctOption: 2,
  },
  {
    id: 'p15',
    text: 'What does "RAG" stand for in AI systems?',
    options: [
      'Retrieval-Augmented Generation',
      'Randomised Answer Generation',
      'Rapid AI Grounding',
      'Recursive Attention Gradient',
    ],
    correctOption: 0,
  },
]
