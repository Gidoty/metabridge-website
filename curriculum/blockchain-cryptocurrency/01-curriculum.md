# MetaBridge Academy — Blockchain & Cryptocurrency
## Document 1: Curriculum (Part 1 — Modules 1–4)
### Course Duration: 8 Modules | Certification: MetaBridge Blockchain Fundamentals Certificate

---

## COURSE OVERVIEW

**Course Title:** Blockchain & Cryptocurrency: From Foundations to DeFi
**Course Code:** MBA-BC-201
**Duration:** 8 weeks (2 sessions per week, 3 hours per session) | 48 contact hours
**Delivery:** Hybrid (in-person + online) | Lagos, Abuja, Port Harcourt and Remote
**Certification:** MetaBridge Blockchain Fundamentals Certificate (Blockchain-Verified)
**Reference Textbook:** *The Age of Decentralization* — MetaBridge Academy (available at metabridgeacademy.com)
**Prerequisite:** None (foundational digital literacy recommended)
**Level:** Beginner to Intermediate

---

## COURSE DESCRIPTION

Blockchain technology is rewriting the rules of trust, ownership, and value transfer — removing intermediaries from finance, identity, supply chains, and governance. This course equips students with a comprehensive, practical understanding of how blockchain and cryptocurrency work, why they matter, and how to engage with them confidently and safely.

From Nigeria's crypto adoption story (Africa's largest by volume) to global DeFi protocols managing billions in assets, students will move from fundamentals to fluency — understanding wallets, smart contracts, DeFi protocols, NFTs, Web3, and the regulatory landscape shaping the industry's future.

---

## COURSE LEARNING OUTCOMES

Upon completing this course, students will be able to:

1. **Explain** the technical architecture of blockchain — distributed ledgers, consensus mechanisms, cryptographic hashing, and Merkle trees
2. **Compare** proof-of-work and proof-of-stake consensus, and evaluate the trade-offs between major blockchains
3. **Operate** a cryptocurrency wallet safely, execute real transactions on testnets, and understand private key security
4. **Analyse** smart contracts, understand their capabilities and limitations, and read basic Solidity code
5. **Navigate** DeFi protocols including DEXs, lending, yield farming, and staking
6. **Evaluate** cryptocurrency investment fundamentals, tokenomics, and on-chain analysis
7. **Assess** the Nigerian and African blockchain ecosystem including CBN policy, CBDC (eNaira), and leading local projects
8. **Apply** Web3 tools including MetaMask, Etherscan, Remix IDE, and testnets to practical tasks
9. **Evaluate** NFTs, digital ownership, and the creator economy within the blockchain context
10. **Articulate** the regulatory landscape, risks, and future trajectory of blockchain globally and in Nigeria

---

## MODULE STRUCTURE OVERVIEW

| Module | Title | Duration | Key Focus |
|--------|-------|----------|-----------|
| 1 | Blockchain Foundations: History, Technology & Trust | 6 hrs | Why blockchain, how it works, cryptographic foundations |
| 2 | Bitcoin & Cryptocurrency Fundamentals | 6 hrs | Bitcoin mechanics, wallets, transactions, UTXO model |
| 3 | Ethereum & Smart Contracts | 6 hrs | Ethereum architecture, EVM, Solidity basics, dApps |
| 4 | DeFi — Decentralised Finance | 6 hrs | DEXs, AMMs, lending, yield, stablecoins |
| 5 | NFTs, Digital Ownership & the Creator Economy | 6 hrs | NFT standards, marketplaces, use cases beyond art |
| 6 | Blockchain in Africa & Nigeria | 6 hrs | eNaira, CBN policy, local projects, remittances |
| 7 | Crypto Investment, Trading & Risk Management | 6 hrs | Tokenomics, on-chain analysis, risk, portfolio |
| 8 | Web3, Future of Blockchain & Capstone | 6 hrs | Web3 architecture, future trends, capstone projects |

---

## MODULE 1: BLOCKCHAIN FOUNDATIONS — HISTORY, TECHNOLOGY & TRUST

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain the historical context that led to the invention of Bitcoin and blockchain
- Define blockchain as a distributed ledger and explain its core properties
- Describe how cryptographic hashing, digital signatures, and Merkle trees work
- Distinguish between public, private, and consortium blockchains
- Explain consensus mechanisms (PoW, PoS) at a conceptual level
- Identify real-world blockchain use cases beyond cryptocurrency

### Core Concepts

**1.1 The Problem Blockchain Solves: The Trust Problem**

Every transaction in the modern world depends on a trusted third party:
- Banks verify you have money before a transfer
- Notaries verify document authenticity
- Governments verify your identity
- Exchanges verify that a traded asset exists

These intermediaries create costs, delays, single points of failure, exclusion, and the possibility of corruption or error. In 2008, a global financial crisis revealed what happens when trusted institutions fail.

On 31 October 2008 — amid the worst financial crisis in 80 years — a pseudonymous developer named Satoshi Nakamoto published a 9-page whitepaper titled: *"Bitcoin: A Peer-to-Peer Electronic Cash System."*

The core proposition: **What if two people could transact with each other directly — without any trusted third party — and have mathematical certainty that the transaction is valid and cannot be reversed?**

**1.2 What Is a Blockchain?**

A blockchain is a **distributed, append-only ledger** shared across a network of computers (nodes), where:

- **Distributed:** No single entity controls the database; thousands of copies exist simultaneously
- **Append-only:** Records can be added but not deleted or modified
- **Linked:** Each block references the previous block cryptographically — forming a chain
- **Consensus-governed:** All participants follow the same rules for validating new entries

**The core properties:**
1. **Decentralisation** — no single point of control or failure
2. **Immutability** — confirmed records cannot be altered
3. **Transparency** — all transactions are publicly visible (on public chains)
4. **Security** — cryptographic techniques make fraud computationally impractical
5. **Trustlessness** — parties don't need to trust each other, only the code and math

**1.3 Cryptographic Foundations**

**Hashing:**
A cryptographic hash function takes any input and produces a fixed-length output (the "hash" or "digest"). Properties:
- Deterministic: same input always produces same hash
- One-way: cannot reverse-engineer the input from the hash
- Avalanche effect: tiny input change produces completely different hash
- Collision-resistant: virtually impossible to find two inputs with the same hash

Bitcoin uses SHA-256 (Secure Hash Algorithm, 256-bit output).

*Example:*
- Input: "Hello, Nigeria!" → SHA-256 → `a3f4b2c...` (64 hex characters)
- Input: "Hello, Nigeria." (period instead of !) → SHA-256 → `9d12e7f...` (completely different)

Every block contains: the hash of ALL its transaction data + the hash of the PREVIOUS block. If anyone changes a transaction in an old block, its hash changes → the next block's reference breaks → every subsequent block becomes invalid → the network rejects the chain.

**Digital Signatures (Asymmetric Cryptography):**

Each blockchain user has two mathematically linked keys:
- **Private Key:** Your secret — only you know it. Used to SIGN transactions (prove ownership)
- **Public Key:** Derived from private key. Shared freely. Used to VERIFY signatures

When you send cryptocurrency:
1. You create a transaction message (recipient address, amount)
2. You sign it with your private key — producing a digital signature
3. The network verifies the signature using your public key — confirming YOU authorised it
4. The transaction is broadcast to all nodes

**Warning:** If you lose your private key, you lose access to your funds forever. There is no "forgot password" in blockchain.

**Merkle Trees:**
A Merkle tree is a binary tree of hashes where:
- Each leaf node = hash of individual transaction
- Each branch node = hash of its two child nodes
- Root = single hash representing ALL transactions in the block

The "Merkle Root" stored in a block header represents the fingerprint of all transactions. This allows lightweight verification — a node can verify a specific transaction is in a block without downloading all transactions.

**1.4 Block Structure**

A Bitcoin block contains:
```
Block Header:
  - Version
  - Previous Block Hash
  - Merkle Root (hash of all transactions)
  - Timestamp
  - Difficulty Target
  - Nonce (the puzzle answer)

Block Body:
  - Transaction count
  - List of transactions (coinbase + others)
```

**1.5 Consensus Mechanisms**

The fundamental question: if there's no central authority, how do thousands of nodes agree on which transactions are valid and which blocks to add?

**Proof of Work (PoW) — Bitcoin's mechanism:**

Miners compete to solve a computationally difficult puzzle:
- Find a number ("nonce") such that SHA-256(block data + nonce) starts with enough zeroes
- This is pure trial and error — can require billions of guesses
- First miner to find the answer broadcasts the block to the network
- Other nodes verify (verification is instant and cheap)
- Winner receives block reward (Bitcoin) + transaction fees

*Why it works:* Attacking the network requires controlling 51% of all mining hashpower globally. At Bitcoin's scale, this is prohibitively expensive. An attacker would spend more on electricity than they could steal.

*Criticism:* Enormous energy consumption. Bitcoin uses more electricity than many countries.

**Proof of Stake (PoS) — Ethereum's mechanism (since 2022):**

Instead of computational work, validators lock up ("stake") cryptocurrency as collateral:
- Validators are chosen pseudo-randomly, weighted by their stake
- They propose and attest to new blocks
- Dishonest validators lose their staked funds ("slashing")
- More energy-efficient than PoW (Ethereum reduced energy use by ~99.95% post-Merge)

**Other Consensus Variants:**
- **Delegated PoS (DPoS):** Token holders vote for delegates who validate (EOS, Tron)
- **Proof of Authority (PoA):** Known, trusted validators — used in private enterprise blockchains
- **Proof of History (PoH):** Solana's mechanism — cryptographic timestamps for speed

**1.6 Types of Blockchains**

| Type | Description | Examples | Use Case |
|------|-------------|---------|----------|
| Public | Open, permissionless, fully decentralised | Bitcoin, Ethereum | Cryptocurrency, DeFi, NFTs |
| Private | Controlled by one organisation, permissioned | Hyperledger Fabric | Enterprise internal records |
| Consortium | Controlled by a group of organisations | R3 Corda, Quorum | Banking consortia, supply chains |
| Hybrid | Mix of public and private elements | Dragonchain | Regulated industries |

**1.7 Historical Timeline**

| Year | Event |
|------|-------|
| 1976 | Diffie-Hellman: Public-key cryptography invented |
| 1991 | Haber & Stornetta: First blockchain-like structure (timestamping) |
| 2008 | Satoshi Nakamoto publishes Bitcoin whitepaper (October 31) |
| 2009 | Bitcoin genesis block mined (January 3) — "Chancellor on brink of second bailout for banks" |
| 2010 | First real-world Bitcoin transaction: 10,000 BTC for 2 pizzas (~$25) |
| 2011 | Bitcoin reaches $1 USD |
| 2013 | Bitcoin reaches $1,000; Ethereum whitepaper published by Vitalik Buterin |
| 2015 | Ethereum mainnet launches |
| 2017 | ICO boom; Bitcoin reaches $20,000; CryptoKitties launch |
| 2018 | Crypto bear market; institutional interest begins |
| 2020 | DeFi summer; Ethereum 2.0 beacon chain launches |
| 2021 | Bitcoin all-time high $69,000; NFT explosion; El Salvador adopts Bitcoin as legal tender |
| 2022 | The Merge (Ethereum → PoS); Terra/Luna collapse; FTX collapse |
| 2023 | Bitcoin ETF applications; crypto regulatory clarity emerging globally |
| 2024 | Bitcoin spot ETFs approved (US); Bitcoin 4th halving; Bitcoin surpasses $100,000 |
| 2025+ | Institutional adoption accelerating; blockchain integration in traditional finance |

### Labs — Module 1

**Lab 1.1: Hash Explorer**
- Tool: SHA-256 online hash calculator (tools.keycdn.com/sha256-online or similar)
- Task: Hash your full name. Change one letter. Compare outputs. Document the avalanche effect.
- Deliverable: Screenshot of both hashes with written explanation

**Lab 1.2: Blockchain Simulation**
- Tool: andersbrownworth.com/blockchain (interactive blockchain demo)
- Task: Create a 5-block chain. Mine each block. Then modify data in Block 2 and observe what happens to Blocks 3, 4, 5.
- Deliverable: Screenshots showing the chain before and after modification, with written explanation

**Lab 1.3: Etherscan Exploration**
- Tool: etherscan.io
- Task: Search any public Ethereum address. Identify: balance, transaction count, recent transactions, gas fees paid. Find a specific transaction and decode: from, to, value, block number, timestamp, hash.
- Deliverable: Annotated screenshot of a transaction with explanation of each field

### Assignments — Module 1

1. **Research Essay (500 words):** "Why did Bitcoin emerge in 2008? What specific failures of traditional financial systems did it respond to?" Reference *The Age of Decentralization* Chapter 1.
2. **Comparison Table:** Create a comparison of Bitcoin, Ethereum, and Solana covering: consensus mechanism, transaction speed, energy use, primary use case, and founding year.
3. **Case Study:** Research one real-world non-financial blockchain use case (supply chain, healthcare, voting, identity). Write 400 words explaining how blockchain is applied and what problem it solves.
4. **Practical Task:** Find the Bitcoin genesis block on blockchain.com/explorer. Screenshot the coinbase transaction. What does the embedded message say? What does it signify?
5. **Critical Analysis (300 words):** "What are the limitations of blockchain? Identify three problems blockchain does NOT solve well."

### Critical Thinking Questions

**CTQ 1:** Satoshi Nakamoto remains anonymous. Is this a feature or a bug? What are the implications — positive and negative — of the creator of a $1 trillion+ asset being unknown?

*Guidance:* Consider: removes central target for legal/political pressure (feature), but no accountability, no ability to fix fundamental protocol issues without community consensus, cult-like dynamics, and questions of whether Nakamoto holds enough BTC to manipulate markets (bug).

**CTQ 2:** Bitcoin uses as much electricity as Argentina. Is this "waste" or is it the cost of trustlessness? Compare to the energy footprint of the global banking system.

*Guidance:* Traditional banking includes: thousands of data centres, billions of ATMs, branch buildings, employee transportation, armoured car fleets, interbank messaging systems. Estimates suggest banking uses 2–3× more energy than Bitcoin. The question is whether decentralised trustlessness is worth the cost.

**CTQ 3:** If blockchain is transparent and immutable, does this create privacy problems? Can blockchain and privacy coexist?

*Guidance:* Bitcoin is pseudonymous, not anonymous — transaction chains can be traced. Privacy coins (Monero, Zcash) address this. Enterprise blockchains use private channels. Zero-knowledge proofs (ZKPs) enable verification without revealing data. Regulators are increasingly demanding blockchain analytics for AML compliance.

---

## MODULE 2: BITCOIN & CRYPTOCURRENCY FUNDAMENTALS

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain Bitcoin's monetary policy — supply cap, halving schedule, and inflation model
- Describe the UTXO (Unspent Transaction Output) model for tracking bitcoin ownership
- Distinguish between different types of cryptocurrency wallets
- Set up and use a cryptocurrency wallet safely
- Execute and verify transactions on a Bitcoin or Ethereum testnet
- Explain the Lightning Network and Bitcoin's layer-2 scaling solutions
- Identify and avoid common security threats in cryptocurrency

### Core Concepts

**2.1 Bitcoin's Monetary Policy**

Unlike fiat currencies (Naira, Dollar, Euro) which can be printed in unlimited quantities by central banks, Bitcoin has a mathematically enforced supply cap:

**Supply Cap:** Maximum 21 million BTC — ever. Hardcoded in the protocol.

**Halving:**
- Every 210,000 blocks (~4 years), the block reward for miners is cut in half
- Genesis (2009): 50 BTC per block
- First halving (2012): 25 BTC
- Second halving (2016): 12.5 BTC
- Third halving (2020): 6.25 BTC
- Fourth halving (2024): 3.125 BTC
- The last Bitcoin will be mined around 2140

**Implications:**
- Deflationary design — opposite of central bank monetary policy
- As supply growth slows and demand grows, price appreciation is incentivised
- After all Bitcoin is mined, miners will be rewarded only by transaction fees
- Halvings have historically preceded major bull market cycles (though not guaranteed)

**Why this matters for Nigerians:** The Naira lost over 70% of its value against the dollar between 2020–2024 due to currency devaluation. Bitcoin's fixed supply is philosophically designed as a hedge against exactly this type of monetary policy.

**2.2 The UTXO Model**

Bitcoin does not maintain "balances" like a bank account. Instead, it uses **Unspent Transaction Outputs (UTXOs):**

*Analogy:* Think of UTXOs like physical notes in your wallet. When you spend ₦500 but only have ₦1,000 notes, you hand over ₦1,000 and receive ₦500 change. Bitcoin works the same way.

When you receive Bitcoin:
- You receive a UTXO locked to your address (like a note locked in a box only you can open)
- Your "balance" = sum of all UTXOs locked to your address

When you spend Bitcoin:
- You select UTXOs as inputs (unlocking them with your private key signature)
- You create new UTXOs: one to the recipient, one "change" output back to yourself
- The difference between inputs and outputs = miner transaction fee

**2.3 Cryptocurrency Wallets**

Contrary to popular belief, crypto wallets don't store cryptocurrency — they store **private keys**. The cryptocurrency always lives on the blockchain; the wallet gives you access to it.

**Wallet Types:**

| Type | Description | Security | Convenience | Examples |
|------|-------------|----------|-------------|---------|
| **Hot Wallet (Software)** | App/browser extension, connected to internet | Lower | High | MetaMask, Trust Wallet, Coinbase Wallet |
| **Cold Wallet (Hardware)** | Physical device, never connects to internet | Highest | Lower | Ledger, Trezor |
| **Exchange Wallet (Custodial)** | Exchange holds your keys | Lowest (you trust exchange) | Highest | Binance, Coinbase, Quidax |
| **Paper Wallet** | Private key printed on paper | Very high (if stored safely) | Very low | DIY |
| **Multi-sig** | Requires multiple keys to sign | Very high | Medium | Gnosis Safe |

**The Golden Rule:** "Not your keys, not your coins."
If an exchange controls your private keys, your assets could be lost if the exchange is hacked, goes bankrupt, or is shut down by regulators. The collapse of FTX in 2022 wiped out billions of dollars of customers' funds held in exchange wallets.

**Seed Phrase (Recovery Phrase):**
Most modern wallets generate a **12 or 24-word seed phrase** (BIP-39 standard). This is a human-readable representation of your master private key. With this phrase, your wallet can be restored on any compatible device.

**Storage Rules:**
- Write on paper — never photograph or store digitally
- Keep multiple physical copies in separate secure locations
- Never share with anyone — not customer support, not MetaBridge instructors, not anyone
- Consider fireproof/waterproof storage (metal seed plate)

**2.4 Transaction Mechanics**

When you send cryptocurrency:

1. **Construct** the transaction: specify inputs (UTXOs to spend), outputs (recipient address + change address), fee
2. **Sign** with private key → produces digital signature (proving you authorise the spend)
3. **Broadcast** to the network (mempool — a waiting room of unconfirmed transactions)
4. **Miners select** transactions from the mempool (prioritising higher fees)
5. **Include** in a block, mined and confirmed
6. **Confirmed** — after 6 confirmations on Bitcoin (~1 hour), considered irreversible

**Gas Fees (Ethereum):**
On Ethereum, transaction fees are called "gas." You pay:
- **Gas units** (amount of computation required)
- **Gas price** (in Gwei — 1 Gwei = 0.000000001 ETH) — determined by network demand

High network activity = high gas prices. Simple ETH transfers use 21,000 gas. Complex smart contract interactions use much more.

**2.5 Other Major Cryptocurrencies**

| Cryptocurrency | Ticker | Consensus | Key Purpose | Notable Feature |
|---------------|--------|-----------|-------------|-----------------|
| Bitcoin | BTC | PoW | Digital gold, store of value | First, most secure, most decentralised |
| Ethereum | ETH | PoS | Smart contracts, DeFi, NFTs | Programmable blockchain, largest developer ecosystem |
| Binance Smart Chain | BNB | DPoS | Fast, cheap DeFi | Centralised but popular; Binance ecosystem |
| Solana | SOL | PoH + PoS | High-speed dApps | 65,000 TPS, sub-second finality |
| Cardano | ADA | PoS | Research-driven blockchain | Academic peer-reviewed development |
| Ripple/XRP | XRP | Federated | Cross-border payments | Used by banks for settlement |
| Tether | USDT | N/A (stablecoin) | Price-stable USD equivalent | Most traded crypto by volume |
| USDC | USDC | N/A (stablecoin) | Regulated USD stablecoin | Circle/regulated, transparency reports |

**2.6 Bitcoin Layer 2: The Lightning Network**

Bitcoin's main chain processes ~7 transactions per second (vs Visa's ~24,000). The Lightning Network is a layer-2 payment protocol built on top of Bitcoin:

- Opens **payment channels** between parties with a small on-chain transaction
- Transactions between parties happen **off-chain, instantly, near-zero fees**
- Channel is closed with a final on-chain settlement

*Nigerian Context:* El Salvador adopted Bitcoin as legal tender and uses Lightning for everyday transactions. This model is being studied in Africa as a financial inclusion tool — enabling micropayments too small to make economic sense with traditional transfer fees.

**2.7 Security Threats**

Common attacks and how to avoid them:

| Threat | Description | Protection |
|--------|-------------|-----------|
| Phishing | Fake websites/emails impersonating exchanges | Always verify URL; use bookmarks; enable 2FA |
| SIM Swap | Attacker hijacks your phone number to bypass 2FA | Use authenticator app, not SMS 2FA |
| Seed Phrase Theft | Social engineering to steal recovery words | Never share; distrust anyone asking |
| Clipboard Hijacking | Malware replaces copied wallet address | Always double-check pasted addresses |
| Rug Pull | Project creators abandon and steal funds | DYOR; verify team identity; audit contracts |
| Ponzi/MLM Schemes | Promises of guaranteed returns | No investment guarantees fixed returns |

**2.8 Nigerian Crypto Context**

Nigeria is one of the world's largest crypto markets by peer-to-peer trading volume:
- Estimated 22 million+ crypto users (2024)
- Largest P2P Bitcoin trading volumes in Africa
- High adoption driven by: Naira depreciation, remittance needs, dollar access, youthful population
- CBN banned banks from serving crypto exchanges (2021) → reversed (2023) → regulated framework emerging
- Local exchanges: Quidax, Buycoins (now Yellow Card), Patricia
- Global exchanges dominant: Binance (banned/restricted), Bybit, Kraken

### Labs — Module 2

**Lab 2.1: Wallet Setup & Testnet Transaction**
- Tools: MetaMask (browser extension), Ethereum Sepolia testnet, Sepolia faucet
- Task: Install MetaMask. Create a new wallet. SECURELY record seed phrase (paper only). Switch to Sepolia testnet. Request testnet ETH from faucet. Send testnet ETH to classmate's address. View transaction on Sepolia Etherscan.
- Deliverable: Screenshots of wallet creation, testnet transaction sent, and Etherscan confirmation

**Lab 2.2: Transaction Analysis on Etherscan**
- Tool: etherscan.io
- Task: Find and analyse three different types of Ethereum transactions: (1) Simple ETH transfer, (2) ERC-20 token transfer, (3) Smart contract interaction. For each: record hash, from, to, value, gas used, gas price, total fee in USD.
- Deliverable: Comparison table of the three transaction types

**Lab 2.3: Wallet Security Audit**
- Tool: Checklist provided by instructor
- Task: Evaluate your personal crypto security posture using the class security checklist covering: 2FA type, seed phrase storage, exchange vs self-custody balance, phishing awareness, use of hardware wallet.
- Deliverable: Completed security audit with personal security improvement plan

### Assignments — Module 2

1. **Research (400 words):** What happened to FTX in 2022? What were the key failures? What would have protected users? Reference security principles from this module.
2. **Practical Task:** Using a Bitcoin block explorer (blockchain.com), trace a single Bitcoin UTXO through 3 transactions. Document the flow: inputs → outputs → next spend.
3. **Comparative Analysis:** Compare the Naira/USD exchange rate vs Bitcoin/USD price over the past 3 years. What observations can you make? (Use TradingView or CoinGecko data)
4. **Lightning Network Research:** How does the Lightning Network work? Give a step-by-step example of two businesses using Lightning for daily payments. What are the adoption barriers in Nigeria?
5. **Security Scenario (300 words):** You receive a WhatsApp message from "Binance Support" saying your account is at risk and asking for your seed phrase to "verify your wallet." What do you do? What are the red flags?

### Critical Thinking Questions

**CTQ 1:** Bitcoin was designed to be a "peer-to-peer electronic cash system." But today it's mostly held as "digital gold" for investment, not spent. Has Bitcoin failed its original purpose, or evolved beyond it?

*Guidance:* Consider: Bitcoin's slow transaction speed (7 TPS) and volatility make it impractical for daily payments. BUT Lightning Network addresses speed/cost. Store of value thesis argues gold isn't "used" either — scarcity is the value. Nigerian context: in hyperinflationary environments, people DO use Bitcoin as a savings vehicle even if not for transactions.

**CTQ 2:** If a cryptocurrency exchange like Binance is licensed and regulated in Nigeria and stores your crypto for you (custodial), what is the actual difference from using a traditional bank?

*Guidance:* Similar: both hold your money, both can freeze accounts, both are regulated entities you must trust. Different: crypto deposits are not insured (NDIC insures banks up to ₦500k), exchange-held crypto can be lost to hacks, blockchain enables actual self-custody which banks cannot offer, and crypto has no physical branches. The philosophical case for self-custody is strong but carries personal responsibility.

**CTQ 3:** Nigeria's SEC has introduced regulatory frameworks for digital assets. Is regulation good or bad for Nigerian crypto users? Who benefits and who is harmed?

*Guidance:* Benefits: consumer protection, institutional capital, legitimacy, employment, innovation. Harms: compliance costs reduce accessibility for small players, KYC requirements exclude those without formal ID, global exchanges may exit small markets. Overall trajectory: regulated markets tend to mature and grow, but transition periods can be disruptive.

---

## MODULE 3: ETHEREUM & SMART CONTRACTS

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain how Ethereum differs from Bitcoin architecturally and philosophically
- Define smart contracts and explain how they execute on the Ethereum Virtual Machine (EVM)
- Read and understand basic Solidity smart contract code
- Identify dApp categories and explain how they interact with smart contracts
- Deploy a simple smart contract on the Remix IDE to a testnet
- Evaluate the trade-offs of different EVM-compatible blockchains
- Explain common smart contract vulnerabilities and how they lead to hacks

### Core Concepts

**3.1 Ethereum's Vision: The World Computer**

Bitcoin asked: "What if we didn't need banks for money transfers?"
Vitalik Buterin (age 19, 2013) asked: "What if we didn't need any intermediary for ANY type of agreement?"

Ethereum is a **programmable blockchain** — a global, decentralised computer where any application can run without servers, downtime, censorship, or a central operator.

*Key philosophical difference:*
- Bitcoin: narrow scripting language, intentionally limited, optimised for security and simplicity
- Ethereum: Turing-complete programming language (Solidity), intentionally general-purpose

**Ethereum's core components:**
1. **Ether (ETH):** The native currency — used to pay gas fees for all computation
2. **EVM (Ethereum Virtual Machine):** The decentralised computer that executes code
3. **Smart Contracts:** Self-executing programs deployed on the EVM
4. **dApps:** Decentralised applications with smart contract backends
5. **Layer 2s:** Scaling solutions that batch transactions off-chain (Arbitrum, Optimism, Polygon)

**3.2 Smart Contracts**

A smart contract is a **self-executing program** stored on the blockchain that:
- Runs automatically when predetermined conditions are met
- Cannot be modified once deployed (immutable)
- Executes exactly as coded — no possibility of bias, human error, or corruption
- Eliminates the need for intermediaries in agreement enforcement

*Classic Analogy:* A vending machine is a smart contract — insert money, press button, get product. No human intervention. No trust required. Rules are transparent and automatic.

*Financial Example:*
Traditional escrow: Buyer → sends money to bank → bank holds until seller ships goods → bank releases payment
Smart contract escrow: Buyer → sends to smart contract → contract auto-releases when shipping proof is submitted

**3.3 Solidity — The Language of Ethereum**

Solidity is Ethereum's primary smart contract programming language. It is:
- Statically typed (variable types must be declared)
- Influenced by JavaScript, C++, and Python syntax
- Compiled to EVM bytecode

**Basic Solidity Structure:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // State variable stored on blockchain
    uint256 private storedNumber;
    
    // Event emitted when number changes
    event NumberChanged(uint256 newNumber);
    
    // Function to store a number
    function storeNumber(uint256 _number) public {
        storedNumber = _number;
        emit NumberChanged(_number);
    }
    
    // Function to retrieve the number
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }
}
```

**Key Solidity Concepts:**
- **State Variables:** Data stored permanently on the blockchain (costs gas to write)
- **Functions:** Logic that can be called (public, private, internal, external)
- **Modifiers:** Conditions that must be met before a function runs (e.g., `onlyOwner`)
- **Events:** Logs that applications can listen to for blockchain activity
- **Mappings:** Key-value stores (like a dictionary/hashtable)
- **msg.sender:** The address of whoever called the function
- **require():** Reverts transaction if condition is false

**ERC Standards:**
- **ERC-20:** Fungible token standard (most cryptocurrencies: USDT, USDC, UNI)
- **ERC-721:** Non-fungible token (NFT) standard — each token is unique
- **ERC-1155:** Multi-token standard (supports both fungible and non-fungible in one contract)

**3.4 The Ethereum Virtual Machine (EVM)**

The EVM is a sandboxed runtime environment that:
- Executes smart contract bytecode identically on every node in the network
- Measures computation in "gas units" — prevents infinite loops and spam
- Is deterministic — same inputs always produce same outputs on every node

**EVM Compatibility:**
Many blockchains have built EVM-compatible environments, meaning Ethereum dApps can run on them with minimal code changes:
- Binance Smart Chain (BNB Chain)
- Polygon
- Avalanche C-Chain
- Arbitrum
- Optimism
- Fantom

**3.5 Types of dApps and the Web3 Stack**

**dApp Categories:**
- **DeFi:** Uniswap, Aave, Compound, Curve
- **NFT Marketplaces:** OpenSea, Blur, Foundation
- **Gaming:** Axie Infinity, Gods Unchained, The Sandbox
- **DAOs:** Compound Governance, MakerDAO, Uniswap DAO
- **Identity:** ENS (Ethereum Name Service), Worldcoin
- **Social:** Lens Protocol, Farcaster

**How a dApp Works:**
1. **Frontend:** Standard web app (React, Next.js)
2. **Web3 Provider:** User's wallet (MetaMask) connects frontend to blockchain
3. **Smart Contract:** Business logic deployed on blockchain
4. **Blockchain:** State stored and transactions confirmed
5. **Storage:** IPFS or Arweave for large files (images, metadata)

**3.6 Common Smart Contract Vulnerabilities**

Smart contracts are immutable — bugs can never be patched, only worked around with upgrade patterns.

| Vulnerability | Description | Famous Hack |
|---------------|-------------|------------|
| **Reentrancy** | Malicious contract re-enters function before state updates | The DAO Hack (2016) — $60M lost |
| **Integer Overflow/Underflow** | Math exceeds variable limits | BECToken (2018) — $900M created out of thin air |
| **Flash Loan Attacks** | Borrow millions with no collateral in one transaction to manipulate prices | Multiple DeFi protocols |
| **Access Control** | Functions callable by anyone when they should be restricted | Parity Wallet freeze (2017) — $150M frozen |
| **Price Oracle Manipulation** | Attacker manipulates price feeds smart contracts rely on | Mango Markets (2022) — $114M stolen |

**The DAO Hack (2016):**
An early Ethereum project (The DAO) raised $150M. A reentrancy bug allowed a hacker to drain $60M. This led to the controversial decision to hard fork Ethereum — creating Ethereum (ETH) and Ethereum Classic (ETC). It remains one of the most significant events in blockchain history.

**3.7 Gas Optimisation and Layer 2 Solutions**

**The Scalability Problem:**
Ethereum mainnet can process ~15–30 transactions per second (TPS). At peak demand, gas fees have reached $200+ per simple transaction — making it inaccessible for small transactions.

**Layer 2 Solutions:**

| Solution | Type | TPS | Approach |
|----------|------|-----|---------|
| Arbitrum | Optimistic Rollup | 4,500+ | Batches transactions off-chain, assumes valid unless challenged |
| Optimism | Optimistic Rollup | 2,000+ | Similar to Arbitrum |
| Polygon zkEVM | ZK Rollup | 2,000+ | Uses zero-knowledge proofs for instant finality |
| StarkNet | ZK Rollup | High | Validity proofs for scalability |

**Sidechains:**
- **Polygon PoS:** EVM-compatible sidechain with its own validators; bridges assets from Ethereum
- Lower security guarantees than Ethereum mainnet but significantly cheaper

### Labs — Module 3

**Lab 3.1: Deploy a Smart Contract on Remix IDE**
- Tool: remix.ethereum.org (in-browser Solidity IDE)
- Task: Open Remix IDE. Load the SimpleStorage contract from the module. Compile it. Deploy to JavaScript VM (in-browser). Call storeNumber(42). Call getNumber(). Verify the stored value.
- Extension: Modify the contract to add a mapping of addresses to stored numbers. Test it.
- Deliverable: Screenshots of compiled contract, deployment transaction, and function calls

**Lab 3.2: Read a Real Smart Contract on Etherscan**
- Tool: etherscan.io
- Task: Find the USDT (Tether) smart contract on Ethereum mainnet. Navigate to the "Contract" tab and view the source code. Identify: the contract owner, the total supply function, and the transfer function. Explain in plain English what the transfer function does.
- Deliverable: Annotated screenshot with explanation of contract code sections

**Lab 3.3: MetaMask dApp Interaction**
- Tool: MetaMask + Uniswap interface (or testnet equivalent)
- Task: Connect MetaMask to a dApp (using Sepolia testnet version if available). Initiate a token swap (testnet tokens). Observe the gas fee estimate. Sign the transaction. Track it on Etherscan.
- Deliverable: Step-by-step documented interaction with screenshots

### Assignments — Module 3

1. **Technical Writing (500 words):** Explain how a smart contract replaces a traditional escrow service for a Nigerian real estate transaction. What are the benefits and risks? What are the barriers to adoption in Nigeria?
2. **Solidity Code Reading:** Analyse the provided ERC-20 token contract (given by instructor). Identify: the transfer function, the approve function, the allowance function. Explain each in plain English.
3. **Vulnerability Research:** Research the Poly Network hack (2021 — $611M stolen, later returned). How did the hack work? What vulnerability was exploited? What happened afterwards?
4. **dApp Exploration:** Use DeFiLlama (defillama.com) to research the Top 5 dApps by Total Value Locked (TVL). For each: name, blockchain, TVL, and what the dApp does.
5. **Critical Analysis (400 words):** "Smart contracts are only as smart as their programmers." Evaluate this statement. What are the limitations of smart contract automation in high-trust domains?

### Critical Thinking Questions

**CTQ 1:** The DAO hack led to a hard fork that split Ethereum into two chains. Critics say this violated blockchain's immutability principle ("code is law"). Supporters say protecting users from theft was the right choice. Who was right?

*Guidance:* "Code is law" argues the hack was valid — the attacker exploited a feature, not a bug. Social contract view argues the broader community can decide to correct catastrophic bugs. The fork created a governance precedent — human decisions override code when stakes are high enough. Ethereum Classic represents the "pure" immutability position. Neither is entirely right — it's a philosophical debate about governance.

**CTQ 2:** Gas fees during peak Ethereum usage exceeded $200 per transaction. Does this make Ethereum a tool only for the wealthy? How does this affect the promise of "financial inclusion"?

*Guidance:* Layer 2 solutions (Arbitrum, Optimism) bring fees below $0.01. But user experience requires technical sophistication. In Nigeria and Africa, most users access DeFi through centralised exchanges (which batch transactions). The real financial inclusion play is L2s + account abstraction (removing seed phrase complexity). Gas fees are a transitional problem, not a permanent one.

**CTQ 3:** If smart contracts cannot be modified once deployed, how do major protocols like Uniswap or Aave update their code? Is "immutability" actually immutable?

*Guidance:* Upgrade patterns exist: Proxy contracts point to implementation contracts which can be swapped. Timelock contracts introduce delays before changes. DAO governance votes on upgrades. The immutability guarantee is about deployed bytecode at a specific address — but proxy patterns allow "upgradeable" dApps while maintaining a consistent interface. This is a trade-off between security (true immutability) and functionality (ability to fix bugs).

---

## MODULE 4: DEFI — DECENTRALISED FINANCE

### Module Learning Objectives
By the end of this module, students will be able to:
- Define DeFi and explain how it differs from traditional finance (TradFi)
- Explain Automated Market Makers (AMMs) and the constant product formula
- Describe decentralised exchanges (DEXs) and execute a token swap
- Explain lending and borrowing protocols and calculate collateralisation ratios
- Define and evaluate yield farming and liquidity mining
- Distinguish between types of stablecoins (algorithmic, fiat-backed, crypto-backed)
- Assess the risks of DeFi (smart contract risk, impermanent loss, liquidation risk)
- Connect DeFi concepts to opportunities and risks in the Nigerian and African context

### Core Concepts

**4.1 What is DeFi?**

Decentralised Finance (DeFi) is a system of financial services built on blockchain smart contracts — eliminating banks, brokers, and intermediaries.

**Traditional Finance vs DeFi:**

| Aspect | Traditional Finance (TradFi) | DeFi |
|--------|------------------------------|------|
| Access | Requires ID, credit history, bank account | Anyone with a wallet and internet |
| Hours | 9am–5pm, business days | 24/7/365, never closes |
| Settlement | T+2 (days) | Near-instant (seconds) |
| Custody | Bank holds your money | You hold your own keys |
| Transparency | Opaque (bank decides internally) | Full code visible on blockchain |
| Counterparty | Trusted institution | Smart contract (trustless) |
| Permission | Bank can freeze/reject | Permissionless |
| Geographic limit | Often country-specific | Global by default |
| Minimum balance | Often ₦5,000–₦50,000 | No minimum |

**DeFi's total value locked (TVL)** reached $180 billion+ at peak (2021). Even in bear markets, DeFi protocols continued operating 24/7 without interruption.

**Nigerian Relevance:**
- 38% of adult Nigerians are unbanked
- Remittance fees to Nigeria average 6–8% (World Bank)
- DeFi stablecoins enable dollar-denominated savings without a US bank account
- Cross-border business payments can bypass expensive correspondent banking

**4.2 Decentralised Exchanges (DEXs) and AMMs**

A DEX allows direct peer-to-peer token trading without a central exchange.

**Traditional Order Book Model (CEX):**
- Buyers place bid orders at specific prices
- Sellers place ask orders at specific prices
- Exchange matches orders when prices align
- Works well with high liquidity; fails with thin markets

**Automated Market Maker (AMM) — How Uniswap Works:**

Instead of matching buyers and sellers, AMMs use **liquidity pools** — reserves of two tokens held in a smart contract.

**Constant Product Formula:**
```
x × y = k
```
- x = reserve of Token A
- y = reserve of Token B
- k = constant (never changes during normal trades)

*Example:* Pool has 100 ETH and 200,000 USDC (k = 20,000,000)
- You want to buy ETH with 10,000 USDC
- New USDC reserve: 210,000
- New ETH reserve: 20,000,000 ÷ 210,000 = 95.24 ETH
- You receive: 100 - 95.24 = 4.76 ETH
- Effective price: 10,000 ÷ 4.76 = $2,101 per ETH
- Original price was $2,000 → you paid a premium (price impact / slippage)

**Price Moves Automatically With Trading:**
As more USDC enters the pool and ETH exits, ETH becomes more expensive within the pool — naturally reflecting market demand without order matching.

**Liquidity Providers (LPs):**
- Deposit equal values of both tokens into the pool
- Receive LP tokens representing their share
- Earn trading fees (0.3% per swap on Uniswap v2)
- Can withdraw at any time by returning LP tokens

**Major DEXs:**
- **Uniswap:** Largest DEX; Ethereum + L2s; invented AMM model
- **PancakeSwap:** BNB Chain; similar to Uniswap; lower fees
- **Curve Finance:** Optimised for stablecoin swaps (minimal slippage)
- **dYdX:** Perpetual futures DEX (order book model)
- **Orca:** Solana's leading DEX

**4.3 Impermanent Loss**

The most misunderstood DeFi concept. When you provide liquidity to an AMM pool and the price ratio of the two tokens changes, you may end up with less total value than if you had simply held the tokens.

*Why it's "impermanent":* If the price ratio returns to the original ratio when you deposited, the loss disappears entirely.

*When it becomes permanent:* When you withdraw from the pool while prices are at a different ratio than when you deposited.

**Simplified Example:**
- Deposit: 1 ETH ($2,000) + 2,000 USDC = $4,000 total
- ETH price rises to $4,000
- Arbitrageurs buy ETH from pool until pool price = $4,000
- Your pool share now: 0.707 ETH + 2,828 USDC = $5,656
- If you had just HELD: 1 ETH ($4,000) + 2,000 USDC = $6,000
- Impermanent loss: $6,000 - $5,656 = $344 (5.7%)
- Trading fees might compensate for IL in high-volume pools

**4.4 Lending and Borrowing Protocols**

**Aave and Compound** are the leading DeFi lending protocols:

**How Lending Works:**
1. Lenders deposit USDC (or other assets) into the protocol
2. Protocol issues interest-bearing tokens (aUSDC on Aave)
3. Interest accrues in real time (every Ethereum block)
4. Lender withdraws original deposit + interest at any time

**How Borrowing Works:**
1. Borrower deposits collateral (e.g., ETH — overcollateralised to protect the protocol)
2. Borrower draws a loan in a different asset (e.g., USDC) up to a Loan-to-Value (LTV) ratio
3. Borrower pays variable or stable interest rate
4. If collateral value drops below the liquidation threshold → position is liquidated

**Why Over-Collateralisation?**
DeFi cannot do credit checks (borrowers are anonymous wallet addresses). To guarantee repayment without trust, collateral must exceed the loan value.

*Example:*
- ETH LTV on Aave: 82.5%
- Deposit: $10,000 ETH
- Maximum borrow: $8,250 USDC
- Liquidation threshold: 85% ($8,500 position value)
- If ETH falls and your position reaches 85% LTV → liquidation

**Flash Loans:**
Borrow millions of dollars in one Ethereum transaction — with zero collateral — as long as you return the full amount within the same transaction. Used for arbitrage, liquidations, and (unfortunately) attacks.

**4.5 Yield Farming and Liquidity Mining**

**Yield Farming:** Moving assets between DeFi protocols to optimise returns.

**Liquidity Mining:** Protocols reward LPs with governance tokens in addition to trading fees.

*Example — Compound Liquidity Mining (2020):*
- Compound began distributing COMP tokens to users who lent or borrowed
- This launched "DeFi Summer" — TVL exploded from $1B to $10B+ in weeks
- The COMP token gave holders governance rights + speculative value

**Yield Sources:**
1. Lending interest (variable, supply/demand driven)
2. DEX trading fees (LP share of swap fees)
3. Governance token rewards (liquidity mining)
4. Staking rewards (PoS validator returns)

**APY vs APR:**
- **APR:** Simple interest rate (no compounding)
- **APY:** Compound interest rate (interest on interest)
- High advertised APYs often include inflationary token rewards that decrease over time

**4.6 Stablecoins**

Stablecoins are cryptocurrencies designed to maintain a stable value (typically $1 USD).

| Type | Examples | Mechanism | Risk |
|------|---------|-----------|------|
| **Fiat-Backed** | USDT, USDC | 1:1 reserves held in banks/treasuries | Centralisation; issuer can freeze |
| **Crypto-Backed** | DAI (MakerDAO) | Overcollateralised by ETH/WBTC | Liquidation risk in extreme volatility |
| **Algorithmic** | UST (Terra/Luna — FAILED) | Algorithm maintains peg via seigniorage | Extremely high — death spiral risk |
| **Commodity-Backed** | PAXG | Backed by physical gold | Counterparty risk (gold storage) |

**The Terra/Luna Collapse (May 2022):**
UST was an algorithmic stablecoin pegged to USD. It maintained the peg via an algorithm that could mint/burn LUNA tokens. In May 2022, a coordinated attack triggered a death spiral:
- UST depegged slightly → algorithm minted massive LUNA → LUNA price crashed → confidence lost → more depegging → hyperinflationary LUNA supply → complete collapse
- $40 billion+ wiped out in 72 hours. Both LUNA and UST went to near zero.
- Lesson: Algorithmic stablecoins without adequate collateral backing are existential risk.

**4.7 DeFi Risks**

| Risk Type | Description | Mitigation |
|-----------|-------------|-----------|
| Smart Contract Risk | Bugs in contract code → hacks/exploits | Use only audited protocols; spread exposure |
| Liquidity Risk | Pool has insufficient liquidity for large swaps | Check TVL; use pools with high volume |
| Oracle Risk | Price feed manipulation → wrong liquidations | Use protocols with decentralised oracles (Chainlink) |
| Liquidation Risk | Collateral price drops below threshold | Monitor positions; use conservative LTV |
| Impermanent Loss | Price divergence reduces LP value | Choose stable pairs; calculate IL before providing |
| Regulatory Risk | Government restrictions on DeFi access | Stay informed on CBN and SEC regulations |
| Rug Pull / Exit Scam | Developer withdraws liquidity and disappears | DYOR; verify team; check for audit reports |

### Labs — Module 4

**Lab 4.1: DEX Swap on Testnet**
- Tool: Uniswap interface on Sepolia testnet (or PancakeSwap BSC testnet)
- Task: Connect MetaMask to testnet. Obtain testnet tokens from faucet. Execute a token swap on the DEX. Record: input token, output token, price, slippage, gas fee. View the transaction on the block explorer.
- Deliverable: Annotated screenshots of the swap process

**Lab 4.2: DeFi Protocol Research**
- Tool: DeFiLlama (defillama.com), Aave docs, Compound docs
- Task: Compare Aave vs Compound. For each protocol: TVL, supported assets, current lending APY for USDC, current borrowing APY for ETH, security audit status, governance model.
- Deliverable: Side-by-side comparison table with analysis paragraph

**Lab 4.3: Impermanent Loss Calculator**
- Tool: IL Calculator (dailydefi.org/tools/impermanent-loss-calculator/)
- Task: Model 5 different scenarios: (1) 25% price increase of Token A, (2) 50% increase, (3) 100% increase (2x), (4) 200% increase (3x), (5) 50% decrease. Calculate IL for each. At what point does IL become significant? When do trading fees typically compensate?
- Deliverable: IL table with analysis of at what divergence LP positions become unprofitable

### Assignments — Module 4

1. **Protocol Analysis (500 words):** Research Uniswap's governance (UNI token). Who controls Uniswap? How are protocol changes made? Is this truly "decentralised"? What controversies has Uniswap governance faced?
2. **Case Study (400 words):** The Terra/Luna collapse wiped out billions. Research an African investor who lost money in this event. How did the algorithmic stablecoin design fail? What should investors have recognised as warning signs?
3. **DeFi for Nigeria (400 words):** How could DeFi stablecoins (USDC on Polygon, for example) serve as a practical financial tool for a Nigerian freelancer who is paid in dollars but lives on Naira? Map out the complete workflow from dollar receipt to Naira conversion.
4. **Yield Farming Research:** Find a current yield farming opportunity on a major protocol (Aave, Curve, Convex). Document: protocol, pool, APY breakdown (fees + rewards), risks, required assets, and whether the yield is sustainable.
5. **Critical Assessment (300 words):** Is DeFi genuinely "decentralised"? Research Uniswap's front-end blocking of certain tokens/countries. Does this undermine the decentralisation claim?

### Critical Thinking Questions

**CTQ 1:** DeFi lending requires overcollateralisation — you must deposit $10,000 to borrow $8,000. Traditional banks can lend you money based on your income and credit history. Which system is more financially inclusive and why?

*Guidance:* Traditional credit enables people with income but few assets to borrow (e.g., first-time home buyers). DeFi serves the opposite — wealthy crypto holders who want to access liquidity without selling assets. True DeFi financial inclusion requires credit infrastructure that doesn't exist yet (decentralised credit scoring using on-chain history). Both systems have limitations for the poor. The unbanked don't benefit from DeFi without first acquiring crypto assets.

**CTQ 2:** USDC and USDT are the most used DeFi stablecoins, but both are controlled by centralised companies (Circle and Tether) that can blacklist addresses. Is a centrally controlled stablecoin compatible with the DeFi philosophy?

*Guidance:* Circle has frozen thousands of addresses under law enforcement requests. Tether has similar powers. This means the most widely used DeFi infrastructure has a centralised failure point. DAI (crypto-backed) and emerging algorithmic designs attempt true decentralisation but carry higher risk. The practical winner (USDC/USDT) won over the ideological winner (decentralised stablecoins). Regulators increasingly want this — they want identifiable liability for stablecoin issuers.

**CTQ 3:** DeFi protocols have been hacked for billions of dollars. Is the DeFi ecosystem secure enough for ordinary Nigerian users to trust with their savings?

*Guidance:* Most hacks target complex protocols (bridges, new experimental projects). Battle-tested protocols like Aave, Uniswap, Compound have operated safely for years with billions in TVL. Risk management matters — spread across audited protocols, don't chase maximum yield in unaudited new protocols. The risk is real but manageable with education. Compare to: Nigerian banking system has also experienced fraud (EFCC). The question is informed risk management, not zero-risk.

---

*[End of Part 1 — Modules 1–4]*
*Continues in 01-curriculum-part2.md — Modules 5–8, Capstone & Certification Exam*
