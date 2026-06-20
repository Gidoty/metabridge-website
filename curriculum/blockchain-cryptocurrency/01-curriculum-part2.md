# MetaBridge Academy — Blockchain & Cryptocurrency
## Document 1: Curriculum (Part 2 — Modules 5–8, Capstone & Certification Exam)

---

## MODULE 5 [ADVANCED]: NFTs, DIGITAL OWNERSHIP & THE CREATOR ECONOMY

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain what NFTs are and how they work technically (ERC-721, ERC-1155 standards)
- Distinguish between NFT metadata and the token itself
- Evaluate NFT use cases across art, gaming, music, identity, and ticketing
- Create a basic NFT metadata structure
- Navigate OpenSea and understand NFT marketplace mechanics
- Assess the Nigerian/African NFT creator economy
- Critically evaluate NFT speculation vs. genuine utility

### Core Concepts

**5.1 What Is an NFT?**

An NFT (Non-Fungible Token) is a unique digital asset recorded on a blockchain. "Non-fungible" means each token is unique and not interchangeable — unlike cryptocurrencies where one Bitcoin equals any other Bitcoin.

**Fungible vs. Non-Fungible:**
- ₦1,000 note = any other ₦1,000 note (fungible)
- Your birth certificate ≠ anyone else's birth certificate (non-fungible)
- 1 ETH = any other 1 ETH (fungible)
- CryptoPunk #7804 ≠ CryptoPunk #7805 (non-fungible)

**5.2 How NFTs Work Technically**

An NFT is a smart contract (ERC-721) that:
- Assigns a unique token ID to each item
- Records the current owner (a wallet address) on-chain
- Contains a `tokenURI` function that returns a metadata URL

**The metadata trap — what most people misunderstand:**

Most NFTs do NOT store the actual image/video on the blockchain. What's on-chain is:
```json
Token ID: 1234
Owner: 0x7F9a...
tokenURI: "ipfs://QmXo3k.../1234.json"
```

The JSON file at that URI contains:
```json
{
  "name": "Nigerian Heritage #1234",
  "description": "A digital artwork celebrating Lagos street culture",
  "image": "ipfs://QmAbc.../1234.png",
  "attributes": [
    {"trait_type": "Background", "value": "Yellow Danfo"},
    {"trait_type": "Style", "value": "Afropunk"}
  ]
}
```

**The critical point:** If the IPFS file is deleted or the server goes offline, your NFT becomes a token pointing to nothing. This is why proper NFT storage on IPFS/Arweave matters.

**5.3 NFT Standards**

| Standard | Type | Use Cases |
|----------|------|-----------|
| **ERC-721** | Each token is unique, separate contract per collection | Art, collectibles, identity, real estate |
| **ERC-1155** | Multiple tokens per contract, some fungible/some not | Gaming items, tickets (limited editions) |
| **ERC-4907** | Rental extension for ERC-721 | NFT rental markets, gaming |
| **Solana SPL Token** | Solana NFT standard | Solana NFT ecosystem (Magic Eden) |

**5.4 NFT Use Cases Beyond Speculation**

The 2021 NFT boom created the perception that NFTs are purely speculative profile pictures. The genuine utility extends far beyond:

**Digital Art & Music:**
- Artists sell work directly to collectors without galleries
- Programmable royalties — artists earn automatically from all secondary sales (2.5–10%)
- Nigerian artist Osinachi sold NFT works internationally from Lagos

**Gaming:**
- In-game items (weapons, characters, land) as NFTs — truly owned by player
- Tradeable on open markets without permission from the game developer
- Axie Infinity enabled play-to-earn income during COVID — peak of $100M daily volume

**Ticketing:**
- NFT tickets prevent scalping (programmable price limits)
- Persistent post-event collectible
- Verifiable authenticity eliminates counterfeit tickets
- Nigeria concert industry increasingly exploring this for major shows

**Identity & Credentials:**
- Soulbound Tokens (SBTs) — non-transferable NFTs for diplomas, licenses, certifications
- **MetaBridge Academy:** Our certificates are blockchain-verified NFTs
- Potential to verify academic credentials, professional licenses on-chain

**Real Estate:**
- Property titles on blockchain — reduces fraud, eliminates government registry corruption
- In Nigeria: title fraud is endemic; blockchain-based land registries could transform this
- Pilot projects: Lagos State e-survey integration exploration

**Supply Chain:**
- Product authenticity verification (luxury goods, pharmaceuticals)
- Nigeria's counterfeit medicine crisis: blockchain can verify pharmaceutical origins

**5.5 NFT Marketplaces**

| Marketplace | Blockchain | Focus | Fee |
|------------|-----------|-------|-----|
| OpenSea | Ethereum, Polygon, Solana | General (largest) | 2.5% |
| Blur | Ethereum | Professional traders | 0.5% |
| Magic Eden | Solana, Ethereum | Multi-chain | 2% |
| Foundation | Ethereum | Curated fine art | 15% primary |
| Rarible | Multi-chain | Creator-focused | 2.5% |

**5.6 African NFT Scene**

Nigerian and African creators have embraced NFTs:
- **Osinachi:** Nigeria's first internationally recognised NFT artist; featured by Christie's
- **Adaeze Okafor:** Digital fashion NFTs drawing on Nigerian cultural motifs
- **AfriBlocks:** Platform connecting African freelancers and NFT creators
- **Ejim Uka:** Photographer selling Lagos street photography as NFTs
- Multiple Lagos-based studios now producing NFT collections on global marketplaces

### Labs — Module 5

**Lab 5.1: NFT Metadata Creation**
- Tool: Text editor, IPFS (via Pinata.cloud), OpenSea testnet
- Task: Create a digital artwork (Canva, DALL-E, or hand-drawn digitised). Write proper ERC-721 metadata JSON with name, description, image, and at least 5 attributes. Upload image to IPFS via Pinata. Create the metadata JSON referencing the IPFS image URL.
- Deliverable: Working metadata JSON file with IPFS links

**Lab 5.2: NFT Marketplace Exploration**
- Tool: OpenSea (opensea.io)
- Task: Browse OpenSea. Find an NFT collection with African/Nigerian cultural themes. Document: collection name, floor price, total volume, number of owners, rarest traits, and royalty percentage. Analyse the project's utility beyond speculation.
- Deliverable: 300-word analysis report on the chosen collection

**Lab 5.3: NFT Transaction Analysis**
- Tool: Etherscan
- Task: Find any NFT transfer transaction on Etherscan. Identify: from address, to address, contract address, token ID, gas fees, whether it was a marketplace sale (look for simultaneous ETH transfer). Find the same token's metadata and view it.
- Deliverable: Annotated transaction analysis

### Assignments — Module 5

1. **Business Proposal (500 words):** Design an NFT ticketing system for a major Nigerian music event (Afrobeats festival, etc.). How would it work? What blockchain? What wallet options for fans? How would royalties work for resales? What are the barriers to adoption?
2. **Creator Economy Analysis (400 words):** A Lagos musician wants to release their album as NFTs. What are the steps? What are the advantages over streaming (Spotify, Apple Music)? What are the risks and barriers for Nigerian artists specifically?
3. **Metadata Deep Dive:** Using Etherscan, find the BAYC (Bored Ape Yacht Club) contract. Look at token #1. What is its tokenURI? What metadata does it contain? What traits does it have? Is the metadata stored on IPFS or a centralised server?
4. **Soulbound Tokens Research (350 words):** Explain Vitalik Buterin's concept of Soulbound Tokens (SBTs). How could SBTs transform identity, credentials, and reputation in Nigeria? What are the privacy implications?
5. **Critical Analysis (400 words):** The NFT market crashed 97% from its 2021 peak. Were NFTs a bubble, a genuine innovation, or both? Separate the technology (permanent) from the speculation (cyclical) in your analysis.

---

## MODULE 6 [ADVANCED]: BLOCKCHAIN IN AFRICA & NIGERIA

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain Nigeria's unique relationship with cryptocurrency (adoption drivers, regulatory evolution)
- Describe the eNaira CBDC — design, adoption challenges, and lessons
- Analyse the CBN's regulatory journey with crypto (ban, reversal, framework)
- Identify leading African blockchain projects and startups
- Evaluate blockchain's potential to solve Africa-specific problems (remittances, land title, identity)
- Connect the global blockchain ecosystem to local opportunities and careers

### Core Concepts

**6.1 Nigeria's Crypto Adoption Story**

Nigeria is not just Africa's largest crypto market — it is one of the top 5 globally by adoption (Chainalysis Global Crypto Adoption Index):

**Why Nigeria leads in crypto:**
- **Currency devaluation:** Naira lost 70%+ vs USD (2020–2024) — Bitcoin/stablecoins as inflation hedge
- **Dollar scarcity:** FX restrictions made legitimate dollar access difficult — crypto provided an alternative
- **Remittances:** Nigerians in diaspora found crypto faster and cheaper than Western Union (avg $15 fee → $0.50)
- **Youth demographics:** 60%+ of Nigeria's population is under 25 — digitally native
- **Unbanked population:** 38 million unbanked adults have mobile phones — crypto is accessible
- **Freelancer economy:** International clients pay in crypto to bypass payment restriction barriers (Paypal, Stripe historically restricted in Nigeria)
- **P2P trading culture:** Nigerians built thriving P2P exchange networks (Paxful, LocalBitcoins)

**6.2 The CBN's Regulatory Journey**

| Date | Event |
|------|-------|
| 2017 | CBN warns public about crypto risks — no legal status |
| 2018 | CBN bans banks from processing crypto transactions |
| February 2021 | CBN circular reaffirms bank ban — triggers P2P migration |
| October 2021 | eNaira launched — Nigeria's CBDC |
| December 2022 | CBN begins engaging with crypto industry |
| 2023 | CBN reversal — new framework allows banks to service licensed VASPs (Virtual Asset Service Providers) |
| 2024 | SEC Nigeria releases regulatory framework for digital assets; VASP licensing regime introduced |

**Key lesson:** Regulatory bans don't eliminate adoption — they drive it underground, to P2P, and to less regulated channels. Nigeria's experience demonstrates that proactive engagement and regulation produces better outcomes than prohibition.

**6.3 The eNaira: Nigeria's CBDC**

Launched October 25, 2021, the eNaira was Africa's first central bank digital currency:

**Design:**
- Built on Hyperledger Fabric (private, permissioned blockchain)
- Tiered wallet system: Tier 1 (BVN/NIN only — basic), Tier 2 (bank account required)
- Merchant and consumer wallets
- Speed: Instant settlement (vs T+1 traditional)
- Cost: Subsidised transaction fees

**Adoption Challenges:**
- By 2023, only 0.5% of Nigerians had used eNaira (Central Bank data)
- Awareness low outside major cities
- Consumer trust deficit — confusion with mobile money
- Smartphones required for the app — exclusion of rural population
- No interest earning (unlike bank deposits)
- Offline usability initially limited

**Policy Interventions (2023):**
- CBN mandated ATM operators to offer eNaira withdrawal
- Pushed for merchant acceptance
- Explored offline USSD functionality for feature phones
- The naira cash crunch of early 2023 inadvertently boosted eNaira awareness

**Lessons for CBDC Design:**
- Adoption requires genuine utility advantage over existing options
- Trust is built incrementally
- Offline capability critical for developing market contexts
- Incentive structures (merchant discounts, interest) accelerate adoption

**6.4 Major African Blockchain Projects & Companies**

**Fintech/Remittances:**
- **Yellow Card:** Pan-African crypto exchange; P2P on/off ramp; 20+ African countries
- **Bitpesa (now AZA Finance):** Kenya-origin; cross-border B2B payments using blockchain
- **Chipper Cash:** Mobile money + crypto; operates across Africa
- **Flutterwave:** Exploring blockchain for cross-border settlement

**Identity & Land:**
- **Landify (Accra, Ghana):** Blockchain land registry pilot
- **Konvid Labs (Lagos):** Digital identity on blockchain for Nigeria
- **NIMC integration pilots:** NIN on blockchain for portability

**Supply Chain & Agriculture:**
- **Agriloan (Nigeria):** Blockchain credit for farmers using on-chain agricultural data
- **Twiga Foods (Kenya):** Blockchain supply chain for fresh produce connecting farmers to retailers

**Education:**
- **MetaBridge Academy:** Blockchain-verified certifications; pioneering verified credentials in Nigeria
- **Africa EdTech:** Multiple institutions exploring on-chain academic records

**6.5 Blockchain for Africa-Specific Challenges**

**Remittances:**
Nigeria receives $20+ billion in annual remittances — but 6–8% goes to fees. Blockchain-based solutions:
- Stablecoin transfers (USDC via Stellar or Polygon) cut fees to <1%
- Bitpesa reportedly reduces costs by 75–95% vs traditional channels
- Challenge: Last-mile cash out still requires local infrastructure

**Land Title and Property:**
60–75% of land in Africa lacks formal documentation (World Bank). Results:
- Cannot use land as collateral for loans
- Government land grabs with no recourse
- Corruption in land registries

Blockchain solution: Immutable, transparent land registry — cannot be altered by corrupt officials. Challenges: Existing informal ownership systems; political resistance from those who benefit from opacity; digital literacy.

**Identity:**
1.1 billion people globally lack official identity (United Nations). In Africa, birth registration gaps are significant. Blockchain self-sovereign identity:
- Individual controls their own identity data
- Can share specific credentials without revealing all personal data
- Not dependent on a functioning government registry
- Challenges: Issuance and verification infrastructure

**Healthcare:**
- Medical records on blockchain: portable, patient-controlled
- Drug supply chain: Verify pharmaceutical authenticity
- Nigeria's counterfeit drug crisis costs lives annually — blockchain verification could help

### Labs — Module 6

**Lab 6.1: eNaira App Exploration**
- Tool: eNaira app (download from CBN website)
- Task: Create a Tier 1 eNaira wallet (BVN-based). Document the onboarding process. What information is required? What can you do with the wallet? What are the limitations? Write a UX review comparing it to your regular bank app.
- Deliverable: UX review (300 words) + screenshots

**Lab 6.2: P2P Crypto Market Analysis**
- Tool: Paxful (paxful.com) or Noones.com
- Task: Research Bitcoin/USDT P2P rates for Nigeria on Paxful. Document: current P2P spread vs official price, most popular payment methods, trader reputation requirements, fee structure. Compare to official exchange rate.
- Deliverable: Market analysis report

**Lab 6.3: African Blockchain Startup Research**
- Task: Research 3 African blockchain startups not mentioned in the lecture. For each: country of origin, founding year, problem solved, blockchain used, funding raised, current status.
- Tool: Crunchbase, African Tech media (Techcabal, Disrupt Africa, Quartz Africa)
- Deliverable: Startup profiles (200 words each)

### Assignments — Module 6

1. **Policy Analysis (500 words):** Compare Nigeria's CBN approach to crypto with Ghana's Bank of Ghana approach. Which country has handled crypto regulation better? Support your argument with specific policies and outcomes.
2. **eNaira Report (400 words):** Based on publicly available data (CBN reports, media), why has eNaira adoption been low? What specific changes to design, policy, or incentives would you recommend to CBN to increase adoption? Reference international CBDC successes (Bahamas Sand Dollar, Jamaica JAM-DEX).
3. **Remittance Business Plan (400 words):** Design a blockchain-based remittance service for Nigerians in the UK sending money home. What blockchain? What stablecoin? What is the off-ramp to Naira? What is the fee model? Who are the competitors?
4. **Land Registry Proposal:** Research the specific problem of land title fraud in one Nigerian state (Lagos, Abuja, Rivers, etc.). Propose a blockchain-based land registry solution. What stakeholders must be involved? What are the political and technical barriers?
5. **Career Research:** Identify 10 specific job opportunities in Nigeria or globally that require blockchain knowledge. Include: job title, company, required skills, salary range if available, and how MetaBridge Academy training applies.

---

## MODULE 7 [PROFESSIONAL]: CRYPTO INVESTMENT, TRADING & RISK MANAGEMENT

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain tokenomics and evaluate a cryptocurrency project's economic design
- Read and interpret on-chain data using blockchain explorers and analytics tools
- Apply fundamental analysis to cryptocurrency projects
- Understand technical analysis basics (not financial advice — analytical tools)
- Calculate and manage investment risk using position sizing and portfolio principles
- Identify scam patterns and protect against common crypto fraud in Nigeria
- Understand tax obligations for crypto in Nigeria

### Core Concepts

**7.1 Tokenomics**

Tokenomics (token + economics) is the economic design of a cryptocurrency:

**Key tokenomics factors:**

**Supply:**
- **Max Supply:** Hard cap (Bitcoin: 21M; some tokens: unlimited)
- **Circulating Supply:** Currently in market (affects current price/market cap)
- **Total Supply:** All tokens created minus burned
- **Emission Schedule:** How new tokens are released over time

**Allocation:**
- Who gets how much? Red flags: >50% to team/insiders with short unlock periods
- Vesting schedules: When do team/investor allocations unlock?
- Community allocation: % going to protocol users vs. insiders

**Utility:**
- What does the token DO? (Governance? Staking? Gas fees? Access?)
- Network effect: Does more usage = more demand for the token?
- Burn mechanisms: Is supply reducing over time? (Deflationary pressure)

**Valuation Metrics:**
- **Market Cap** = Price × Circulating Supply
- **Fully Diluted Valuation (FDV)** = Price × Max Supply (full potential dilution)
- **P/S Ratio:** Market Cap ÷ Annualised Protocol Revenue (like stock P/E)
- **NVT Ratio:** Network Value to Transactions Ratio (like P/E for blockchains)

**Warning:** A low circulating supply with high FDV is a red flag. If a token's FDV is $10B but market cap is $100M, there are 100× more tokens that will eventually hit the market — creating strong sell pressure.

**7.2 On-Chain Analytics**

Unlike traditional finance, all blockchain transactions are public. This creates a unique form of market intelligence:

**Tools:**
- **Glassnode:** Bitcoin on-chain metrics (SOPR, MVRV, exchange flows)
- **Dune Analytics:** Custom SQL queries on Ethereum blockchain data
- **DeFiLlama:** DeFi TVL, protocol revenue, chain stats
- **Nansen:** Wallet labelling, "smart money" tracking
- **Etherscan/Solscan:** Raw transaction data

**Key Metrics:**
- **Exchange Inflows/Outflows:** Large inflows suggest selling pressure; large outflows suggest accumulation
- **MVRV Ratio (Market Value to Realized Value):** Compares market cap to the average cost basis of all holders
- **SOPR (Spent Output Profit Ratio):** Are holders selling at profit or loss?
- **Active Addresses:** Network usage trends
- **Hash Rate:** Mining security/investment signal for PoW chains

**7.3 Fundamental Analysis**

Evaluating a crypto project like you would a business:

**The investment checklist:**
1. **Problem:** What real problem does this solve? Is blockchain necessary?
2. **Team:** Doxxed (publicly identified)? Track record? LinkedIn verifiable?
3. **Technology:** Is there a working product (not just whitepaper)? Audited code?
4. **Tokenomics:** Fair distribution? No excessive insider allocation?
5. **Community:** Active developers on GitHub? Real users? Organic community?
6. **Competition:** Unique value proposition vs. existing solutions?
7. **Regulatory Position:** Is this likely to survive regulatory scrutiny?
8. **Revenue/Sustainability:** Does the protocol generate real fees? Or depend on inflation?

**Common Scam Projects — Red Flags:**
- Anonymous team with no verifiable history
- Unrealistic return promises (guaranteed 1000% APY)
- Copy-paste whitepaper from another project
- No working product — only roadmap promises
- Sudden celebrity endorsements (often paid, sometimes hacked accounts)
- Token only available on one obscure DEX
- No smart contract audit

**7.4 Technical Analysis Basics**

Technical analysis (TA) studies price charts and patterns to forecast future price movements. It is a tool, not a guarantee:

**Key concepts:**
- **Support/Resistance:** Price levels where buying/selling tends to concentrate
- **Moving Averages:** Smooth price data over time (50-day MA, 200-day MA)
- **RSI (Relative Strength Index):** Momentum oscillator; >70 = potentially overbought; <30 = potentially oversold
- **Volume:** Trading volume confirms or denies price moves
- **Market Structure:** Higher highs and higher lows = uptrend; lower lows and lower highs = downtrend

**Crypto-Specific TA:**
- **Bitcoin Halving Cycles:** Historically, bull markets 12–18 months after halving
- **TOTAL Market Cap:** Tracks overall crypto market sentiment
- **BTC Dominance:** Bitcoin's % of total crypto market cap (rising = alt season ending)
- **Fear & Greed Index:** Sentiment indicator (extreme fear often = buying opportunity)

**Important Disclaimer:** Technical analysis does not predict the future. Cryptocurrency markets are highly volatile and speculative. Past patterns do not guarantee future results. This is financial education, not financial advice.

**7.5 Risk Management**

The most important skill in crypto investment:

**Portfolio Allocation Principles:**
- Only invest what you can afford to lose completely
- Diversify across asset classes (not just crypto)
- Within crypto: Bitcoin and Ethereum form the core (lowest relative risk)
- Altcoins = higher risk/reward — allocate smaller portions
- Never put 100% in one asset

**Position Sizing:**
- Risk per trade: 1–2% of total portfolio maximum
- Example: ₦500,000 portfolio → risk ₦5,000–₦10,000 max per trade
- Use stop-losses to limit downside on each position

**Dollar-Cost Averaging (DCA):**
- Invest a fixed amount at regular intervals (weekly/monthly) regardless of price
- Removes emotional buy/sell decisions
- Reduces impact of timing the market
- Most appropriate strategy for long-term holders in volatile assets

**7.6 Crypto Scams in Nigeria**

Nigeria has been disproportionately affected by crypto scams — both as victims and (falsely) as perpetrators of schemes:

**Common Scams:**

**Ponzi/Investment Schemes:**
- MMM Nigeria (2016–2017): Collapsed; millions lost
- Loom Money / Gifting Circles: "Send ₦10k, receive ₦80k" — impossible mathematics
- Fake Mining Pools: "Invest to mine Bitcoin from cloud"
- Guaranteed Daily Returns: Any scheme promising >1% daily is mathematically impossible long-term

**Phishing & Account Theft:**
- Fake exchange websites (Binance.com vs Binanc3.com)
- "Your account is suspended" phishing emails
- Fake customer support on WhatsApp/Telegram

**Social Engineering:**
- Romance scams ("pig butchering") — build relationship, then convince to "invest"
- Celebrity endorsement scams (hacked/deepfake)
- Fake job offers requiring crypto payment first

**Rug Pulls:**
- Developers launch token, promote heavily, then drain liquidity pool
- Detection: Anonymous team, unaudited contract, locked liquidity for very short period

**7.7 Taxation of Crypto in Nigeria**

FIRS (Federal Inland Revenue Service) position (2024):
- Capital gains from crypto are taxable
- Business income from crypto trading is subject to income tax
- Record keeping is the investor's responsibility
- No specific crypto tax law yet — existing tax laws applied
- Declaration required on annual tax returns

**Recommended practice:**
- Maintain records of all purchases, sales, DeFi earnings
- Track cost basis for every holding
- Use portfolio tracking tools (CoinTracker, Koinly) for tax calculation
- Consult a FIRS-registered tax professional for specific advice

### Labs — Module 7

**Lab 7.1: Tokenomics Analysis**
- Tool: CoinGecko (coingecko.com), project documentation
- Task: Choose any top-100 cryptocurrency (not BTC or ETH). Analyse its tokenomics: max supply, circulating supply, FDV vs market cap, allocation breakdown, vesting schedule, token utility, and emission schedule. Rate the tokenomics (1–10) with reasoning.
- Deliverable: Tokenomics analysis report

**Lab 7.2: On-Chain Analytics**
- Tool: Glassnode (glassnode.com — free tier), Dune Analytics
- Task: Access Glassnode free metrics for Bitcoin. Find current readings for: MVRV Ratio, Exchange Net Flow, Active Addresses (30-day trend). Interpret each metric and write a current market assessment.
- Deliverable: On-chain market brief (200 words)

**Lab 7.3: Scam Identification Workshop**
- Tool: Social media, fake websites (provided by instructor in safe context)
- Task: Instructor provides 5 "investment opportunity" descriptions. Students identify which are scams and which are legitimate, stating which red flags (or lack thereof) informed their decision.
- Deliverable: Completed scam detection worksheet with reasoning

### Assignments — Module 7

1. **Investment Thesis (500 words):** Write an investment thesis for one specific cryptocurrency (not BTC or ETH). Include: problem it solves, competitive advantage, tokenomics evaluation, risks, and your assessment of its 2–3 year potential. This is analysis practice — not financial advice.
2. **Scam Research (400 words):** Research one major Nigerian crypto scam (Loom Money, a fake exchange, or investment scheme). How did it work? How many Nigerians were affected? What were the early warning signs? What can regulators and individuals do to prevent similar schemes?
3. **DCA Calculator:** Create a spreadsheet modelling DCA investment in Bitcoin over the past 3 years (weekly ₦10,000). What would be the current value? What was the worst drawdown experienced? Compare to holding cash equivalent in Naira.
4. **Tax Research:** Research FIRS guidance on cryptocurrency taxation in Nigeria. What must a Nigerian who sold crypto at a profit declare? What records should they keep? Write a 1-page guide for a crypto-holding Nigerian who has never paid crypto taxes.
5. **Risk Assessment (400 words):** Create a personal crypto risk tolerance framework. What factors determine how much someone should invest in crypto? How does this differ for a 25-year-old software engineer vs a 50-year-old civil servant vs a retired teacher in Nigeria?

---

## MODULE 8 [PROFESSIONAL]: WEB3, THE FUTURE OF BLOCKCHAIN & CAPSTONE

### Module Learning Objectives
By the end of this module, students will be able to:
- Define Web3 and explain how it differs from Web2
- Describe DAOs (Decentralised Autonomous Organisations) and their governance models
- Explain the concept of digital identity (ENS, DIDs, Soulbound Tokens)
- Project the trajectory of blockchain technology across key sectors through 2030
- Critically evaluate blockchain's limitations, challenges, and failure modes
- Execute a comprehensive capstone project demonstrating applied blockchain knowledge

### Core Concepts

**8.1 The Evolution of the Web**

| Era | Name | Control | Business Model | Examples |
|-----|------|---------|----------------|---------|
| Web 1.0 (1991–2004) | Read Web | Website owners | Advertising banners | Early news sites, AltaVista |
| Web 2.0 (2004–present) | Read-Write Web | Platforms (centralized) | Data harvesting, ads, network effects | Facebook, YouTube, Twitter, Jumia |
| Web3 (emerging) | Read-Write-Own Web | Users (decentralised) | Token-based incentives, ownership | Ethereum dApps, DeFi, NFTs |

**Web3's core shifts:**
- **Ownership:** Digital assets truly owned by users (not platform)
- **Identity:** Self-sovereign — not dependent on platform accounts
- **Value flow:** Users share in protocol value (governance tokens, rewards)
- **Censorship resistance:** No single party can deplatform users or remove content

**Web2 vs Web3 for a Nigerian Creator:**
- **Web2:** Post on Instagram → Instagram owns your data → algorithm controls reach → account can be banned → Instagram keeps 0% to 100% of advertising revenue
- **Web3:** Post on Lens Protocol → you own your content as NFT → take your followers anywhere → earn from content directly → no platform ban risk

**8.2 DAOs — Decentralised Autonomous Organisations**

A DAO is an organisation governed by smart contracts and token-based voting:

**How a DAO works:**
1. Protocol/organisation has governance tokens
2. Token holders vote on proposals (parameter changes, treasury spending, code upgrades)
3. Votes are weighted by token holdings (or delegation)
4. Passed proposals execute automatically via smart contracts

**Major DAOs:**
- **MakerDAO:** Governs DAI stablecoin; DAO controls risk parameters
- **Uniswap DAO:** Controls the largest DEX; manages $3B+ treasury
- **Compound DAO:** Governs lending protocol parameters
- **ConstitutionDAO:** Raised $47M in 72 hours via DAO to bid on US Constitution original copy

**DAO Challenges:**
- Voter apathy (low participation rates — often <5% of token holders vote)
- Plutocracy (whale investors dominate governance)
- Speed (slow decision-making vs. corporate agility)
- Regulatory uncertainty (are DAOs legal entities? Who is liable?)
- Coordination problems (decentralisation ≠ efficiency)

**8.3 Digital Identity in Web3**

**ENS (Ethereum Name Service):**
- Human-readable Ethereum addresses: `metabridge.eth` instead of `0x7F9a...4B3c`
- NFT-based — you own your .eth name
- Used as decentralised identity across Web3 applications
- ~3 million ENS names registered (2024)

**DIDs (Decentralised Identifiers):**
- W3C standard for self-sovereign identity
- Identifier you control — not dependent on any company
- Can be used for: login, credential verification, reputation

**Soulbound Tokens (SBTs):**
- Non-transferable NFTs proposed by Vitalik Buterin
- Use cases: Degrees, certifications, credit history, community membership
- **MetaBridge Academy:** Our certificates function as on-chain, verifiable credentials
- Potential: Replace paper-based credentials entirely

**8.4 Future of Blockchain: 2025–2035 Projections**

**Financial Services:**
- Tokenised real-world assets (RWA) bringing stocks, bonds, real estate on-chain
- Institutional DeFi (KYC-compliant DeFi protocols)
- CBDCs in 130+ countries by 2030 (Atlantic Council tracker)
- Cross-border settlement in seconds (vs days) via blockchain rails
- Nigerian banks exploring blockchain interbank settlement (NIBSS blockchain pilot)

**Identity & Governance:**
- Digital passports and national IDs on blockchain
- Voting systems — though significant security debate continues
- Land registries in 20+ developing countries

**Supply Chain:**
- $3+ trillion in global trade to have blockchain provenance by 2030 (WEF estimate)
- Pharmaceutical supply chain — critical for counterfeit drug prevention in Africa
- Food safety and agricultural value chain traceability

**Energy & Sustainability:**
- Peer-to-peer energy trading (solar energy sold neighbour-to-neighbour via blockchain)
- Carbon credit markets on blockchain — transparent, liquid, fraud-resistant
- Nigeria's energy crisis: Blockchain microgrids enabling community energy trading

**Healthcare:**
- Patient-controlled medical records
- Clinical trial data integrity
- Drug supply chain authentication
- Health insurance claims automation via smart contracts

**Africa-Specific Forecast:**
- African blockchain market projected to reach $3 billion by 2030 (MarketsandMarkets)
- Financial inclusion: 200 million+ unbanked Africans potential DeFi users
- Land registry transformation: 10+ countries piloting blockchain land systems
- Remittance cost reduction: Blockchain could save Africa $5B+ in annual remittance fees

**8.5 Blockchain's Genuine Challenges**

*Balanced analysis — not everything is solved by blockchain:*

**The Blockchain Trilemma (Vitalik Buterin):**
Any blockchain can optimise for at most 2 of 3:
- **Decentralisation:** Many independent validators
- **Security:** Resistance to attacks
- **Scalability:** High throughput

Bitcoin chose decentralisation + security (sacrificed scalability)
Solana chose security + scalability (sacrificed some decentralisation)
Ethereum pursuing all three via L2 ecosystem (Layer 2 solutions for scalability)

**Persistent Challenges:**
- **Scalability:** Still being solved via L2 and new architectures
- **User Experience:** Self-custody wallets are too complex for mass market
- **Energy:** PoW chains (Bitcoin) remain energy-intensive
- **Interoperability:** Bridges between chains are frequently hacked ($3B+ lost in bridge hacks)
- **Regulatory:** Uncertain and inconsistent global regulatory environment
- **Privacy:** Public blockchains are not private by default
- **Governance:** DAOs struggle with effective decentralised decision-making

---

## MODULE 8 CAPSTONE PROJECT

### Overview
The capstone is a culminating project demonstrating practical blockchain knowledge. Students choose ONE option and execute it across 3 supervised sessions.

**Capstone Timeline:**
- **Session 1 (Week 8):** Project selection, planning, and initial execution
- **Session 2 (Week 8):** Build/write/develop — instructor feedback checkpoint
- **Session 3 (Week 8):** Finalise and present

---

### CAPSTONE OPTION A: BLOCKCHAIN EXPLAINER FOR A SPECIFIC INDUSTRY

**Description:** Produce a professional explainer document and presentation for how blockchain applies to one specific industry in Nigeria or Africa.

**Scope:**
- Choose industry: Healthcare / Land Registry / Remittances / Supply Chain / Education / Energy
- Research 3 real-world implementations globally
- Analyse Nigeria/Africa-specific application
- Technical explainer (how the blockchain component works)
- Stakeholder analysis (who benefits, who resists, why)
- Implementation roadmap

**Deliverable:**
- 10-page professional report
- 10-slide presentation
- Live 10-minute class presentation with Q&A

---

### CAPSTONE OPTION B: SMART CONTRACT DESIGN & DEPLOYMENT

**Description:** Design, write, and deploy a functional smart contract on Ethereum testnet solving a real problem.

**Requirements:**
- Original use case (not a tutorial copy)
- Minimum: 2 functions, 1 state variable, 1 event, 1 access modifier
- Solidity code with comments
- Deployed and verified on Sepolia testnet
- Etherscan link to verified contract
- Documentation explaining each function

**Suggested Projects:**
- Event ticketing contract (mint tickets as NFTs, enforce resale limits)
- Simple DAO voting contract (create proposals, vote, execute)
- Escrow contract for freelancer payment
- Certificate issuance contract (mint non-transferable credential NFTs)

**Deliverable:**
- GitHub repository with Solidity code
- Etherscan verified contract link
- 5-page technical documentation
- 5-minute technical demonstration

---

### CAPSTONE OPTION C: DEFI PROTOCOL RESEARCH & PORTFOLIO STRATEGY

**Description:** Conduct a comprehensive DeFi ecosystem analysis and build a hypothetical portfolio strategy.

**Scope:**
- Analyse 5 DeFi protocols across different categories (DEX, lending, stablecoins, derivatives, yield)
- For each: TVL, revenue, tokenomics, risks, yield opportunities
- Construct a hypothetical $10,000 (or ₦10 million) DeFi portfolio allocation
- Calculate expected yields and model risk scenarios
- Assess regulatory risk for each protocol

**Deliverable:**
- 8-page research report
- Portfolio allocation spreadsheet with yield models
- Risk assessment matrix
- Presentation of investment thesis and strategy

---

### CAPSTONE OPTION D: BLOCKCHAIN FOR SOCIAL IMPACT IN NIGERIA

**Description:** Design a blockchain-based solution to a specific social or economic challenge in Nigeria.

**Problem Areas (choose one):**
- Land title fraud and property rights
- Counterfeit pharmaceutical drugs
- Agricultural smallholder credit access
- Diaspora remittance cost reduction
- Transparent charitable donation tracking

**Deliverable:**
- Problem definition with data (research-backed)
- Technical solution design (which blockchain, which architecture, key smart contract logic)
- Stakeholder map and implementation plan
- Business model (how does it sustain itself?)
- Risk assessment and barriers to adoption
- 10-page project document + 10-slide presentation

---

### CAPSTONE OPTION E: CRYPTO INVESTMENT ANALYSIS REPORT

**Description:** Professional-grade research report on a specific cryptocurrency project.

**Requirements:**
- Chosen project: Not Bitcoin or Ethereum (choose an altcoin with real use case)
- Full fundamental analysis: Team, technology, tokenomics, competition, community
- On-chain data analysis: Active addresses, exchange flows, holder distribution
- Technical chart analysis: Key levels, trend structure, momentum indicators
- Risk assessment: Regulatory, technical, competitive, market risks
- Investment thesis: Bull case, base case, bear case scenarios

**Deliverable:**
- 12-page research report
- Presentation of findings and thesis
- Appendix with data sources

---

### CAPSTONE RUBRIC

| Criterion | Excellent (85–100%) | Good (70–84%) | Satisfactory (55–69%) | Needs Work (<55%) |
|-----------|---------------------|---------------|----------------------|-------------------|
| **Research Depth** | Multiple credible sources; original analysis; data-backed | Good sources; solid analysis | Adequate sources; some analysis | Thin research; mostly opinion |
| **Technical Accuracy** | All blockchain concepts accurately explained | Minor errors; concepts solid | Some technical gaps | Significant technical misunderstandings |
| **Nigerian/African Context** | Deep local integration; specific examples; original observations | Good local context | Some local examples | Generic; no African context |
| **Practical Application** | Clear, executable recommendations; real-world feasibility | Good application; mostly realistic | Some practical elements | Theoretical only |
| **Communication** | Professional; clear; engaging presentation | Clear; well-structured | Understandable but basic | Disorganised; unclear |
| **Critical Analysis** | Strong independent thinking; considers multiple perspectives; acknowledges limitations | Good analysis; some nuance | Surface-level analysis | Superficial; uncritical |

**Minimum Pass:** 55% overall | **Credit:** 70%+ | **Distinction:** 85%+
**Capstone is mandatory** — course cannot be certified without submission.

---

## CERTIFICATION EXAM — BLOCKCHAIN & CRYPTOCURRENCY FUNDAMENTALS

**Format:** 3 hours | Pass: 75% | Distinction: 85%
**Prerequisite:** Module attendance 80%+ AND submitted Capstone

---

### SECTION A — MULTIPLE CHOICE (40 marks | 40 questions | 1 mark each | 45 minutes)

**Instructions:** Select ONE correct answer per question.

1. What is a blockchain? *(a) A type of cryptocurrency (b) A chain of encrypted emails (c) A distributed, append-only ledger shared across a network of nodes (d) A government database of financial transactions*
   **Answer: C**

2. Who published the Bitcoin whitepaper in 2008? *(a) Vitalik Buterin (b) Satoshi Nakamoto (c) Nick Szabo (d) Hal Finney*
   **Answer: B**

3. What is the maximum supply of Bitcoin? *(a) 100 million BTC (b) Unlimited (c) 21 million BTC (d) 1 billion BTC*
   **Answer: C**

4. What does "proof of work" involve? *(a) Proving you own crypto by signing a document (b) Staking tokens as collateral (c) Solving computationally difficult mathematical puzzles to validate blocks (d) Having your identity verified by the network)*
   **Answer: C**

5. After Ethereum's "Merge" in 2022, it switched to which consensus mechanism? *(a) Proof of Work (b) Proof of Authority (c) Proof of History (d) Proof of Stake*
   **Answer: D**

6. What is a "smart contract"? *(a) A legal agreement between two blockchain companies (b) An AI model trained on contract law (c) Self-executing code deployed on a blockchain that runs automatically when conditions are met (d) A payment guarantee from a cryptocurrency exchange)*
   **Answer: C**

7. What is the EVM? *(a) Ethereum Verification Method (b) Electronic Value Market (c) Ethereum Virtual Machine — the computation environment for smart contracts (d) Encrypted Value Module)*
   **Answer: C**

8. What does "UTXO" stand for? *(a) Unified Transaction Exchange Output (b) Unspent Transaction Output (c) Universal Token Exchange Order (d) Unverified Transfer of eXchange Output)*
   **Answer: B**

9. What is a "seed phrase"? *(a) A password for your email (b) A marketing phrase used by crypto projects (c) The master recovery key for a cryptocurrency wallet, expressed as 12–24 words (d) A secret code from your exchange to enable 2FA)*
   **Answer: C**

10. What does DeFi stand for? *(a) Decentralised Financing (b) Distributed Finance Interface (c) Decentralised Finance (d) Digital Financial Infrastructure)*
    **Answer: C**

11. What is an AMM (Automated Market Maker)? *(a) A robot that executes trades on your behalf (b) A smart contract protocol that uses liquidity pools and a pricing formula instead of order books (c) An automated bank that provides loans (d) A market analysis tool for traders)*
    **Answer: B**

12. What is "impermanent loss"? *(a) Temporary loss of internet access on a trading platform (b) Loss of value due to inflation (c) The potential loss LP providers experience when token ratios change from the time of deposit (d) Loss of tokens due to smart contract bugs)*
    **Answer: C**

13. The constant product formula in Uniswap is: *(a) x + y = k (b) x × y = k (c) x ÷ y = k (d) x² + y² = k)*
    **Answer: B**

14. What is a stablecoin? *(a) A cryptocurrency that never loses value (b) A government-issued digital currency (c) A cryptocurrency designed to maintain a stable value, usually pegged to USD (d) A coin issued only by stable governments)*
    **Answer: C**

15. Why did UST (Terra Luna's stablecoin) collapse in 2022? *(a) The team ran away with investor funds (b) The algorithm maintaining the peg failed in a death spiral — panic selling depleted LUNA reserves (c) A government banned it globally (d) The founding team was arrested)*
    **Answer: B**

16. What is an NFT? *(a) A new type of cryptocurrency (b) A non-fungible token — a unique digital asset with proof of ownership on a blockchain (c) A file format for digital art (d) A government license for digital creators)*
    **Answer: B**

17. What ERC standard is used for NFTs? *(a) ERC-20 (b) ERC-777 (c) ERC-721 (d) ERC-1155)*
    **Answer: C**

18. When you buy an NFT, what is typically stored ON the blockchain? *(a) The full image file (b) A pointer to metadata, not the image itself (c) Your identity and contact information (d) The complete transaction history of all owners)*
    **Answer: B**

19. What is "impermanent loss" in the context of NFTs? *(a) It does not apply to NFTs — this is a DeFi concept (b) When your NFT art fades in quality over time (c) When the NFT marketplace delists your artwork (d) When your wallet is hacked and NFTs are stolen)*
    **Answer: A*

20. What major event in 2021 proved blockchain-verified certificates have real value? *(a) Amazon announced blockchain credentials (b) Multiple universities accepted NFT degrees (c) Nigerian SEC launched blockchain certificates (d) Increased employer verification of academic credentials boosted demand for tamper-proof credentialing)*
    **Answer: D**

21. What was the eNaira? *(a) A private cryptocurrency created by Nigerian banks (b) Nigeria's peer-to-peer Bitcoin exchange (c) Nigeria's Central Bank Digital Currency launched in October 2021 (d) A mobile payment app by MTN)*
    **Answer: C**

22. The eNaira is built on which type of blockchain? *(a) Ethereum public blockchain (b) Bitcoin blockchain (c) Hyperledger Fabric (private, permissioned) (d) Solana)*
    **Answer: C**

23. Which primary factor drives Nigeria's high cryptocurrency adoption? *(a) Nigerian government mandated crypto payments (b) Nigerian banks promote Bitcoin investment (c) Currency devaluation, dollar scarcity, and remittance needs (d) Nigeria has the most blockchain developers in Africa)*
    **Answer: C**

24. What does "tokenomics" mean? *(a) The field of studying digital currencies academically (b) The economic design of a cryptocurrency — supply, distribution, utility, and incentives (c) The process of converting currencies into tokens (d) A government tax system for crypto)*
    **Answer: B**

25. What is FDV (Fully Diluted Valuation)? *(a) The current price multiplied by circulating supply (b) The market cap excluding insider holdings (c) The price multiplied by maximum possible supply (d) The platform's fee revenue multiplied by 30)*
    **Answer: C**

26. What is "Dollar-Cost Averaging" (DCA) in crypto investing? *(a) Converting crypto to dollars at regular intervals (b) Investing a fixed amount at regular intervals regardless of price (c) Averaging the price across multiple exchanges (d) Only buying when price drops below the 200-day moving average)*
    **Answer: B**

27. What is the Lightning Network? *(a) Ethereum's speed upgrade (b) A fast payment network for Solana (c) A Bitcoin Layer 2 protocol enabling instant, low-fee transactions via payment channels (d) An AI-powered trading bot for Bitcoin)*
    **Answer: C**

28. What is "reentrancy" in smart contract security? *(a) Re-logging into a dApp after a session expires (b) A vulnerability where a malicious contract repeatedly calls a function before state is updated, draining funds (c) The process of redeploying an updated smart contract (d) Re-entering the DeFi market after a loss)*
    **Answer: B**

29. What is a DAO? *(a) Digital Asset Organisation (b) A company registered in Dubai (c) Decentralised Autonomous Organisation — governed by smart contracts and token holder votes (d) A data analytics operator)*
    **Answer: C**

30. ENS stands for: *(a) Ethereum Node System (b) Encrypted Network Service (c) Ethereum Name Service — human-readable .eth addresses (d) Electronic Notary System)*
    **Answer: C**

31. What is the "Blockchain Trilemma"? *(a) Three blockchains fighting for market share (b) The trade-off between decentralisation, security, and scalability — only two can be optimised simultaneously (c) Three phases of blockchain adoption (d) Three types of consensus mechanisms)*
    **Answer: B**

32. What is Web3? *(a) The third version of internet browser software (b) An upgrade to 5G networks (c) A decentralised internet paradigm where users own their data and digital assets (d) A new programming language for websites)*
    **Answer: C**

33. What is "on-chain analytics"? *(a) Analysing the code of smart contracts (b) Using publicly available blockchain transaction data to derive market intelligence (c) Google Analytics for blockchain websites (d) Technical chart analysis of crypto prices)*
    **Answer: B**

34. What was the DAO hack of 2016? *(a) Ethereum's first successful upgrade (b) A 51% attack on the Bitcoin network (c) An exploit of a reentrancy vulnerability that drained $60M from a smart contract, leading to Ethereum's hard fork (d) A government seizure of Ethereum assets)*
    **Answer: C**

35. Which FIRS guidance covers crypto taxes in Nigeria? *(a) Crypto income and capital gains are taxable under existing Nigerian tax law (b) Crypto is tax-exempt as it is not legal tender (c) Only exchange profits are taxed; DeFi earnings are exempt (d) Nigeria has no tax obligations on cryptocurrency)*
    **Answer: A**

36. What is "slippage" in a DEX trade? *(a) The time between placing and completing a trade (b) The difference between expected trade price and actual execution price (c) Fees charged by the DEX (d) The percentage of tokens locked in a liquidity pool)*
    **Answer: B**

37. What is "flash loan"? *(a) A very fast regular loan from a DeFi protocol (b) A microloan for low-income users in DeFi (c) A loan borrowed and repaid in a single transaction — with zero collateral (d) An emergency loan from a DAO treasury)*
    **Answer: C**

38. What does "Soulbound Token" mean? *(a) A digital asset with sacred or religious significance (b) A non-transferable NFT representing credentials, identity, or affiliations — it cannot be sold or given away (c) A token earned in blockchain gaming (d) A token that appreciates in value automatically)*
    **Answer: B**

39. In Solidity, what does `msg.sender` refer to? *(a) The message you sent to the smart contract (b) The address of the account that called the function (c) The smart contract's owner address (d) The last person to interact with the contract)*
    **Answer: B**

40. What is Polygon primarily used for? *(a) Storing NFTs for long-term preservation (b) Mining Bitcoin on mobile devices (c) An EVM-compatible scaling solution for Ethereum — faster and cheaper transactions (d) A privacy-focused blockchain for financial institutions)*
    **Answer: C**

---

### SECTION B — SHORT ANSWER (30 marks | 6 questions | 5 marks each | 60 minutes)

**Question 1:** Explain how a Merkle tree enables efficient transaction verification in a blockchain block. (5 marks)

*Mark Scheme:* 1 mark each for: tree structure (leaves = transaction hashes), branch nodes (hash of two children), Merkle root = single fingerprint of all transactions, inclusion proof (can verify one transaction without all others), efficiency benefit for lightweight nodes.

**Question 2:** You send 1 ETH to a friend. Walk through each step of what happens from the moment you click "Send" to the moment your friend can spend it. (5 marks)

*Mark Scheme:* Transaction construction (1), signing with private key (1), broadcast to mempool (1), miner/validator includes in block (1), confirmations (1). *Bonus:* Gas fee mechanism.

**Question 3:** Compare Proof of Work and Proof of Stake. Include: how they achieve security, energy implications, and who can participate. (5 marks)

*Mark Scheme:* PoW = computational puzzle/energy (1), PoS = staked collateral/slashing (1), PoW energy intensive vs PoS ~99% less (1), PoW = anyone with hardware (1), PoS = anyone with minimum stake (1).

**Question 4:** A farmer in Kano produces sesame seeds for export. Explain how blockchain could improve transparency and trust in this agricultural supply chain. Include at least 3 specific benefits. (5 marks)

*Mark Scheme:* Origin verification (1), each stage recorded immutably (1), buyers verify conditions/certifications (1), direct farmer payment via smart contract (1), counterfeit prevention (1). Accept other valid benefits.

**Question 5:** Why was the Terra/Luna collapse of 2022 particularly dangerous for retail investors? What were the warning signs that a professional investor might have identified in advance? (5 marks)

*Mark Scheme:* Algorithmic design with no real collateral backing (1), death spiral mechanism (1), high yields unsustainable (Anchor's 20% APY on UST — 1), anonymous mechanism failure mode (1), low circulating vs. huge LUNA supply (1).

**Question 6:** What is the "not your keys, not your coins" principle? Give a real-world example of when this failed catastrophically. (5 marks)

*Mark Scheme:* Private key = ownership (1), exchange holds = you trust exchange (1), exchange failure = loss of funds (1), FTX example: bankruptcy, $8B+ customer funds missing (1), lesson: self-custody protects from exchange failure (1).

---

### SECTION C — CASE STUDIES (20 marks | 2 questions | 10 marks each | 45 minutes)

**Case Study 1: The Nigerian Remittance Corridor**

Chike is a nurse in London earning £3,500 per month. He sends £800 home to his family in Enugu every month. Currently he uses a traditional remittance service that charges 7.5% ($60 per transfer) and takes 2–3 business days. His family uses the money primarily for school fees and groceries.

*Questions:*
(a) Calculate how much Chike loses in fees annually. (2 marks)
(b) Describe a blockchain-based alternative that could reduce costs. Specify the blockchain, stablecoin, and off-ramp process. (4 marks)
(c) What barriers might prevent Chike's family in Enugu from adopting this blockchain-based solution? (4 marks)

*Mark Scheme:*
(a) £60 × 12 = £720 per year (2 marks)
(b) Use Stellar or Polygon network (1), convert to USDC stablecoin (1), transfer to family's wallet address (1), family converts to Naira via Yellow Card or local P2P exchange (1)
(c) 4 marks for any of: smartphone and internet access required, wallet technical complexity, volatility risk during exchange, CBN policy uncertainty, USDC-Naira liquidity, KYC requirements, family digital literacy barriers

**Case Study 2: The DeFi Investment Decision**

Adaeze has ₦2 million she wants to put to work. She's comparing:
- Option A: Nigerian bank fixed deposit at 12% annual interest
- Option B: Providing USDC liquidity to a Curve Finance stablecoin pool earning 8% APY
- Option C: Providing ETH/USDC liquidity to Uniswap V3 at 40% APY (includes impermanent loss risk)
- Option D: Staking USDT in a new unaudited protocol offering 150% APY

*Questions:*
(a) What are the risks of Option B (Curve Finance) compared to Option A? (3 marks)
(b) Explain what impermanent loss risk means for Option C. When would the 40% APY fail to compensate for impermanent loss? (4 marks)
(c) What immediate red flags should cause Adaeze to reject Option D entirely? (3 marks)

*Mark Scheme:*
(a) Smart contract risk (1), stablecoin depegging risk (1), no deposit insurance unlike bank (1)
(b) Impermanent loss: if ETH price moves significantly from deposit ratio (1), the LP position has less value than holding (1), at high ETH price movement (2x+), impermanent loss can exceed 5-20% (1), if IL exceeds 40% fee income, net return is negative (1)
(c) 150% APY is unsustainable/too high (1), unaudited = potential backdoor/bug (1), accept any two additional: anonymous team, no established track record, Ponzi structure requires ever-increasing deposits

---

### SECTION D — ESSAY (10 marks | 1 essay | choose from 2 options | 30 minutes)

**Essay Option 1:**
"Blockchain technology promises decentralisation and financial inclusion, but in practice it has largely served those who are already financially privileged — technically sophisticated investors with capital to deploy." Critically evaluate this statement with reference to the Nigerian context. (10 marks)

*Marking Guide:*
Strong essays will: acknowledge truth in the statement (technical barriers, capital requirements, internet access), but also challenge it with evidence (P2P markets serving unbanked, remittance use cases, stablecoins as inflation hedge). Should include specific Nigerian examples and demonstrate understanding of both DeFi mechanics and local economic context. Distinction-level essays will propose specific solutions to the inclusion gap and show awareness of what changes are needed.

**Essay Option 2:**
Compare and contrast the regulatory approaches of three different countries to cryptocurrency, and evaluate what approach Nigeria should adopt to maximise both innovation and consumer protection. (10 marks)

*Marking Guide:*
Strong essays will: accurately describe different regulatory models (US: asset classification + SEC enforcement; El Salvador: legal tender; EU: MiCA framework; Singapore: licensing regime). Should evaluate Nigeria's unique context: large unbanked population, diaspora remittances, high P2P usage, Naira weakness. Recommendations should be specific, justified, and consider both innovation and protection goals. Distinction essays will acknowledge trade-offs and political economy of regulatory choices.

---

### GRADING SUMMARY

| Section | Marks | Weight |
|---------|-------|--------|
| Section A — Multiple Choice | 40 | 40% |
| Section B — Short Answer | 30 | 30% |
| Section C — Case Studies | 20 | 20% |
| Section D — Essay | 10 | 10% |
| **TOTAL** | **100** | **100%** |

| Grade | Score | Designation |
|-------|-------|-------------|
| Distinction | 85–100% | MetaBridge Blockchain Expert |
| Credit | 75–84% | MetaBridge Blockchain Certified |
| Pass | 65–74% | MetaBridge Blockchain Fundamentals |
| Fail | <65% | Resit Required (one opportunity) |

**Certification Requirements:**
- Minimum 75% on certification exam
- Capstone project submitted and scored ≥55%
- Module attendance ≥80%
- All assignments submitted (late submission: 10% penalty per day, max 3 days)

**Certificate:** Blockchain-verified MetaBridge Academy Blockchain & Cryptocurrency Fundamentals Certificate — permanently recorded on-chain. Certificate includes: student name, MetaBridge Academy seal, module completion record, capstone grade, exam score, issue date, and verifiable blockchain record.

---

*MetaBridge Academy — Blockchain & Cryptocurrency | Curriculum v1.0*
*Reference Textbook: The Age of Decentralization | Available at metabridgeacademy.com*
