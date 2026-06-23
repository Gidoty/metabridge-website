export type LabType = 'iframe' | 'external'
export type Track = 'cybersecurity' | 'data' | 'ai' | 'blockchain'

export interface Lab {
  id: string
  track: Track
  module: number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  type: LabType
  url: string
}

export const LABS: Lab[] = [
  // Cybersecurity
  {
    id: 'cs1',
    track: 'cybersecurity',
    module: 1,
    title: 'SHA-256 Hash Generator',
    description: 'Generate and compare SHA-256 hashes in real time. Understand how hashing is used in password storage and data integrity verification.',
    difficulty: 'Beginner',
    duration: '10 min',
    type: 'iframe',
    url: 'https://emn178.github.io/online-tools/sha256.html',
  },
  {
    id: 'cs2',
    track: 'cybersecurity',
    module: 1,
    title: 'Base64 Encoder / Decoder',
    description: 'Encode and decode Base64 strings — commonly used in authentication tokens, email attachments, and API payloads.',
    difficulty: 'Beginner',
    duration: '10 min',
    type: 'iframe',
    url: 'https://www.base64decode.org',
  },
  {
    id: 'cs3',
    track: 'cybersecurity',
    module: 2,
    title: 'TryHackMe',
    description: 'Gamified, guided penetration testing rooms for all skill levels. Complete hands-on labs in a safe virtual environment.',
    difficulty: 'Intermediate',
    duration: '60+ min',
    type: 'external',
    url: 'https://tryhackme.com',
  },
  {
    id: 'cs4',
    track: 'cybersecurity',
    module: 2,
    title: 'HaveIBeenPwned',
    description: 'Check if an email address or password has appeared in known data breaches. Essential awareness tool for any security professional.',
    difficulty: 'Beginner',
    duration: '5 min',
    type: 'external',
    url: 'https://haveibeenpwned.com',
  },
  {
    id: 'cs5',
    track: 'cybersecurity',
    module: 3,
    title: 'VirusTotal',
    description: 'Upload and analyse suspicious files, URLs, and IP addresses using 70+ antivirus scanners and threat intelligence tools.',
    difficulty: 'Intermediate',
    duration: '15 min',
    type: 'external',
    url: 'https://www.virustotal.com',
  },

  // Data Analytics
  {
    id: 'da1',
    track: 'data',
    module: 1,
    title: 'SQL Online IDE',
    description: 'Write and run SQL queries in an interactive online editor with pre-loaded sample databases. Perfect for practicing SELECT, JOIN, GROUP BY, and more.',
    difficulty: 'Beginner',
    duration: '20 min',
    type: 'external',
    url: 'https://sqliteonline.com',
  },
  {
    id: 'da2',
    track: 'data',
    module: 1,
    title: 'Regex Tester',
    description: 'Build and test regular expressions used in data cleaning and validation. Live match highlighting with detailed explanations.',
    difficulty: 'Beginner',
    duration: '15 min',
    type: 'external',
    url: 'https://regex101.com',
  },
  {
    id: 'da3',
    track: 'data',
    module: 2,
    title: 'Google Colab',
    description: 'Run Python and Pandas notebooks in the cloud — no installation needed. Use for data cleaning, EDA, and visualisation exercises.',
    difficulty: 'Intermediate',
    duration: '30 min',
    type: 'external',
    url: 'https://colab.research.google.com',
  },
  {
    id: 'da4',
    track: 'data',
    module: 3,
    title: 'Kaggle Datasets',
    description: 'Explore thousands of real-world datasets for your capstone project. Filter by size and topic to find suitable datasets for your analysis.',
    difficulty: 'Intermediate',
    duration: '20 min',
    type: 'external',
    url: 'https://www.kaggle.com/datasets',
  },

  // AI & Prompt Engineering
  {
    id: 'ai1',
    track: 'ai',
    module: 1,
    title: 'HuggingFace Spaces',
    description: 'Run live AI demos — sentiment analysis, text generation, image classification — directly in your browser. No account needed for most demos.',
    difficulty: 'Beginner',
    duration: '15 min',
    type: 'external',
    url: 'https://huggingface.co/spaces',
  },
  {
    id: 'ai2',
    track: 'ai',
    module: 2,
    title: 'PromptPerfect',
    description: 'Test and refine your prompts with AI-powered scoring and suggestions. Learn chain-of-thought and few-shot prompting techniques.',
    difficulty: 'Intermediate',
    duration: '20 min',
    type: 'external',
    url: 'https://promptperfect.jina.ai',
  },
  {
    id: 'ai3',
    track: 'ai',
    module: 3,
    title: 'OpenAI Tokenizer',
    description: 'Visualise how language models tokenise text. Essential for understanding context windows, token costs, and prompt efficiency.',
    difficulty: 'Intermediate',
    duration: '10 min',
    type: 'external',
    url: 'https://platform.openai.com/tokenizer',
  },

  // Blockchain
  {
    id: 'bc1',
    track: 'blockchain',
    module: 1,
    title: 'Remix IDE',
    description: 'Write, compile, and deploy Solidity smart contracts in your browser. The industry-standard tool for Ethereum development.',
    difficulty: 'Intermediate',
    duration: '45 min',
    type: 'external',
    url: 'https://remix.ethereum.org',
  },
  {
    id: 'bc2',
    track: 'blockchain',
    module: 2,
    title: 'Etherscan',
    description: 'Explore Ethereum transactions, blocks, wallet addresses, and smart contracts on the live mainnet. Real blockchain data, zero cost.',
    difficulty: 'Beginner',
    duration: '15 min',
    type: 'external',
    url: 'https://etherscan.io',
  },
  {
    id: 'bc3',
    track: 'blockchain',
    module: 3,
    title: 'Sepolia Testnet Faucet',
    description: 'Get free test ETH on the Sepolia testnet to experiment with MetaMask transactions and smart contract deployments without real money.',
    difficulty: 'Intermediate',
    duration: '20 min',
    type: 'external',
    url: 'https://sepoliafaucet.com',
  },
]

export const TRACK_META: Record<Track, { label: string; color: string; description: string }> = {
  cybersecurity: {
    label: 'Cybersecurity',
    color: '#EF4444',
    description: 'Hands-on security tools, vulnerability analysis, and threat simulation environments.',
  },
  data: {
    label: 'Data Analytics',
    color: '#22D3EE',
    description: 'SQL playgrounds, Python notebooks, and real-world datasets for analysis practice.',
  },
  ai: {
    label: 'AI & Prompt Engineering',
    color: '#A855F7',
    description: 'Live AI model demos, prompt testing tools, and tokenisation visualisers.',
  },
  blockchain: {
    label: 'Blockchain & Crypto',
    color: '#F4891F',
    description: 'Smart contract IDEs, live blockchain explorers, and testnet environments.',
  },
}
