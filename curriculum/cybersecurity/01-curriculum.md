# Cybersecurity — Curriculum & Programme Guide (Part 1)
## MetaBridge Academy | Course 4 of 4 | Modules 1–6

**Course Duration:** 12 Modules | **Certification:** MetaBridge Cybersecurity Professional Certificate (Blockchain-Verified)
**Lab Platforms:** ANY.RUN · VirusTotal · Wireshark · Nmap · Burp Suite · Shodan · TryHackMe · Metasploit · OWASP ZAP · Kali Linux · Have I Been Pwned · CyberChef
**Reference Textbook:** Cybersecurity Sefer — available at metabridgeacademy.com
**All enrolment:** https://wa.me/2347034357206

---

## COURSE OVERVIEW

### Purpose
Cybersecurity is the discipline of protecting systems, networks, and data from digital attacks, unauthorised access, damage, and theft. As Nigeria's digital economy accelerates — with mobile money, fintech, e-government, and critical infrastructure moving online — the demand for trained cybersecurity professionals has never been higher.

This course builds professionals capable of identifying threats, assessing vulnerabilities, implementing defences, and responding to incidents. The curriculum follows industry standards including the NIST Cybersecurity Framework (CSF), OWASP Top 10, CompTIA Security+ objectives, and is contextualised for the Nigerian threat landscape.

### Learning Philosophy
- **Attacker Mindset:** You cannot defend what you don't understand how to attack. Students learn offensive techniques for defensive purposes (within authorised lab environments only).
- **Hands-on Priority:** Every concept has a corresponding lab. Theory without practice produces professionals who can talk but not do.
- **Nigerian Context:** Nigerian organisations face specific threats — mobile money fraud, SIM swap attacks, BEC (Business Email Compromise), and infrastructure vulnerabilities. This course addresses them.
- **Ethical Foundation:** Every session reinforces that cybersecurity skills carry legal and ethical responsibilities. Unauthorised access is a criminal offence under Nigeria's Cybercrimes Act 2015.

### Prerequisites
- Basic computer literacy
- Familiarity with internet usage
- No programming background required (though basic command line knowledge is introduced in Module 3)

---

## DIFFICULTY LEVEL CLASSIFICATION

| Level | Modules | Skills Developed |
|-------|---------|-----------------|
| **Beginner** | M1–M3 | Cybersecurity foundations and CIA Triad, networking fundamentals for security, Linux and command line skills |
| **Intermediate** | M4–M6 | Cryptography and PKI, network security and firewalls, ethical hacking and penetration testing methodology |
| **Advanced** | M7–M9 | Web application security (OWASP), social engineering and phishing defence, malware analysis |
| **Professional** | M10–M12 | Incident response and digital forensics, cloud security, governance, risk and compliance (GRC) |

*Students should complete each level before progressing to the next. Prior knowledge of the Beginner level is assumed before the Intermediate level begins.*

---

## MODULE 1 [BEGINNER]: INTRODUCTION TO CYBERSECURITY
### Foundations, Threat Landscape & the CIA Triad

---

### Module Overview
Module 1 establishes the conceptual foundation for the entire course. Students learn what cybersecurity is, why it matters, the categories of threats they will learn to defend against, and the foundational model (CIA Triad) that organises all security thinking.

### Module Objectives
By the end of this module, students will be able to:
1. Define cybersecurity and distinguish it from information security and IT security
2. Explain the CIA Triad (Confidentiality, Integrity, Availability) with examples
3. Identify the major categories of cyber threats (malware, phishing, ransomware, insider threats, nation-state attacks)
4. Describe the Nigerian cybersecurity landscape including the Cybercrimes Act 2015 and NITDA regulations
5. Explain the difference between white-hat, grey-hat, and black-hat hacking
6. Describe key cybersecurity career paths and certifications

---

### Core Concepts

#### 1.1 Defining Cybersecurity
**Cybersecurity** is the practice of protecting computer systems, networks, programs, and data from digital attacks, damage, or unauthorised access.

The three related terms students often confuse:
- **IT Security:** Broad — protecting all IT assets (hardware, software, data, networks)
- **Information Security (InfoSec):** Protecting information in ALL forms — digital and physical (paper documents, verbal communication)
- **Cybersecurity:** Specifically focused on digital/networked systems

**Why it matters in Nigeria (2024):**
- Nigeria loses approximately $500M annually to cybercrime (EFCC estimates)
- The banking sector reports over 37,000 fraud cases per year (NIBSS data)
- BEC (Business Email Compromise) fraud targeting Nigerian businesses increased 44% in 2023
- Mobile money fraud is the fastest-growing cybercrime category as OPay, Moniepoint, and PalmPay scale

#### 1.2 The CIA Triad — Security's Foundational Model
Every security decision, policy, and control can be evaluated against the CIA Triad:

**CONFIDENTIALITY:** Information is accessible only to those authorised to have it.
- Examples: Encrypting customer data, password-protecting files, role-based access control
- Threat: A bank employee leaks customer account data to fraudsters (confidentiality breach)
- Control: Encryption, access controls, need-to-know policy

**INTEGRITY:** Information is accurate and has not been tampered with (by accident or maliciously).
- Examples: File hash verification, digital signatures, database change logs
- Threat: An attacker modifies financial transaction records to redirect funds
- Control: Hashing (SHA-256), digital signatures, audit logs, change management

**AVAILABILITY:** Systems and data are accessible when legitimate users need them.
- Examples: Server uptime, backup systems, DDoS protection
- Threat: A ransomware attack encrypts all hospital records; doctors can't access patient data (availability attack)
- Control: Redundancy, backups, DDoS mitigation, business continuity planning

**The trade-off:** Security controls often create tension between these three. Maximum confidentiality (encrypt everything, restrict all access) can hurt availability (employees can't get their data). Security professionals constantly balance the triad.

#### 1.3 Threat Actors and Motivations
Understanding who is attacking and why determines how you defend.

| Actor Type | Motivation | Typical Attack |
|---|---|---|
| Cybercriminals | Financial gain | Ransomware, BEC, card fraud, credential theft |
| Nation-states | Espionage, sabotage | APT attacks, critical infrastructure attacks |
| Hacktivists | Political/ideological | DDoS, defacement, data leaks |
| Insider threats | Grudge, greed, coercion | Data theft, sabotage, account abuse |
| Script kiddies | Fame, curiosity | Copying existing attack tools |
| Competitors | Industrial espionage | Data theft, IP theft |

**Nigerian threat actors context:**
- BEC groups: Nigeria has some of the world's most sophisticated Business Email Compromise operators
- Romance scammers who pivot to cyber fraud
- Organised criminal groups targeting telecom companies for SIM swaps
- Growing nation-state threat: Nigerian government infrastructure has been targeted

#### 1.4 Attack Categories
**Malware (Malicious Software):**
- Virus: Attaches to legitimate files, replicates when file is executed
- Worm: Self-replicating without needing a host file — spreads via networks
- Trojan: Masquerades as legitimate software; creates a backdoor
- Ransomware: Encrypts victim files, demands payment for decryption key
- Spyware: Secretly monitors and transmits user activity
- Keylogger: Records keystrokes — captures passwords, credit card numbers
- Rootkit: Hides deep in the OS, gives attacker persistent admin access

**Social Engineering:**
- Phishing: Fraudulent emails impersonating trusted entities
- Spear phishing: Targeted phishing using personalised information
- Vishing: Voice phishing (phone calls)
- Smishing: SMS phishing — extremely common in Nigeria ("Your BVN has been suspended...")
- Pretexting: Creating a fabricated scenario to manipulate a target

**Network Attacks:**
- DDoS (Distributed Denial of Service): Flooding servers with traffic to make them unavailable
- Man-in-the-Middle (MitM): Intercepting communication between two parties
- DNS poisoning: Corrupting DNS records to redirect traffic to malicious sites
- ARP spoofing: Linking attacker's MAC address to a legitimate IP

**Application Attacks:**
- SQL injection: Inserting malicious SQL into input fields
- Cross-Site Scripting (XSS): Injecting malicious scripts into web pages
- Cross-Site Request Forgery (CSRF): Tricking authenticated users into performing unwanted actions
- Buffer overflow: Sending more data than a buffer can hold, corrupting adjacent memory

#### 1.5 Hacker Ethics & Legal Framework
**The three hat colours:**
- **White-hat:** Authorised security testing — penetration testers, bug bounty hunters, security consultants. Legal. Paid. What we train.
- **Grey-hat:** Tests without explicit permission, usually discloses findings without malicious intent. Legal grey area.
- **Black-hat:** Malicious attackers — criminal. Everything done without authorisation.

**Nigeria's Cybercrimes Act 2015:**
The primary law governing cybercrime in Nigeria. Key provisions:
- Section 6: Unauthorised access to computer systems — up to 3 years imprisonment
- Section 8: Cyberterrorism — up to 10 years imprisonment
- Section 14: Identity theft — up to 7 years imprisonment
- Section 19: Computer fraud — up to 7 years imprisonment
- Section 24: Cyberstalking — up to 3 years imprisonment

**NITDA Cybersecurity Framework:**
National Information Technology Development Agency issues cybersecurity guidelines for ICT companies operating in Nigeria. Compliance is mandatory for licensed operators.

#### 1.6 Cybersecurity Career Paths
| Role | Responsibility | Entry Salary (Nigeria) |
|---|---|---|
| SOC Analyst (Tier 1) | Monitor alerts, triage incidents | ₦150K–₦300K/month |
| Security Analyst | Investigate threats, write reports | ₦300K–₦600K/month |
| Penetration Tester | Authorised hacking, vulnerability reports | ₦400K–₦900K/month |
| Incident Responder | Handle active breaches | ₦500K–₦1M/month |
| Security Engineer | Build security systems | ₦600K–₦1.5M/month |
| CISO | Executive security leadership | ₦1.5M–₦5M/month |

Remote/international: $2,000–$8,000/month for experienced security professionals.

**Key certifications to target after MetaBridge:**
- CompTIA Security+ (vendor-neutral foundation)
- CompTIA CySA+ (security analyst)
- CEH (Certified Ethical Hacker)
- OSCP (Offensive Security Certified Professional — advanced)

---

### Module 1 Labs

**Lab 1.1 — Cyber Threat Identification (VirusTotal)**
Platform: VirusTotal (virustotal.com)
Task: Upload a suspicious file (provided by instructor — safe samples). Analyse the report: How many antivirus engines flag it? What behaviour signatures are detected? Document findings.
Duration: 45 minutes

**Lab 1.2 — Nigerian Phishing Email Analysis**
Platform: Any email client + web browser
Task: Analyse 5 example phishing emails (provided). Identify: sender spoofing, urgency triggers, suspicious links (hover without clicking), grammatical/contextual errors, impersonated organisations (GTBank, UBA, FIRS, CBN).
Duration: 30 minutes

**Lab 1.3 — TryHackMe Introduction**
Platform: TryHackMe (tryhackme.com) — free account
Task: Complete the "Pre-Security" learning path, first 3 rooms: "Intro to Cybersecurity," "Network Fundamentals," "How the Web Works."
Duration: 2 hours

---

### Module 1 Assignments

1. **CIA Triad Analysis:** Choose a Nigerian fintech or bank. Research a data breach or security incident involving them (Interswitch 2019, etc.). Analyse which aspect(s) of the CIA Triad were violated and how. (500 words)

2. **Threat Actor Profile:** Research ONE threat actor group that has targeted Nigerian organisations (e.g., SilverTerrier BEC group, Lazarus Group APT targeting Africa). Describe their tactics, techniques, and procedures (TTPs). (400 words)

3. **Cybercrimes Act 2015 Quiz:** Read Sections 6, 8, 14, 19, and 24 of Nigeria's Cybercrimes Act 2015 (available online). For each section, describe one real-world scenario where it would apply. (One paragraph per section)

4. **Career Path Research:** Choose one cybersecurity career path from Section 1.6. Find 3 current job listings (LinkedIn, Jobberman, or international remote) for that role. Summarise the requirements, salary, and how MetaBridge training prepares you for it.

5. **Critical Thinking:** A small Nigerian import/export company says "We're too small for hackers to target us." Argue why this is incorrect using specific attack types that target small businesses. (300 words)

---

### Module 1 Critical Thinking Questions

1. The CIA Triad represents a constant trade-off. A hospital wants maximum security (strong confidentiality) but doctors need instant access to patient records (maximum availability). How would you balance these competing requirements as the hospital's security architect?

2. Nigeria's Cybercrimes Act 2015 makes unauthorised computer access a criminal offence punishable by imprisonment. Yet penetration testers "hack" systems legally. What distinguishes authorised from unauthorised testing, and what documentation must a penetration tester have before beginning work?

3. "The weakest link in cybersecurity is always the human being, not the technology." Evaluate this statement using examples from the Nigerian context.

---

## MODULE 2 [BEGINNER]: NETWORKING FUNDAMENTALS FOR SECURITY
### How Networks Work & Where They Break

---

### Module Overview
Security professionals must deeply understand how networks function before they can protect or attack them. This module covers the OSI model, TCP/IP protocols, IP addressing, and key network devices — with security implications at every layer.

### Module Objectives
By the end of this module, students will be able to:
1. Describe the OSI model's 7 layers and their security relevance
2. Explain TCP/IP protocol operation, including the TCP handshake
3. Read and interpret IP addresses (IPv4, private vs public, CIDR notation)
4. Understand DNS, DHCP, and HTTP/HTTPS operation
5. Identify common network-layer attacks
6. Use Wireshark to capture and analyse network traffic

---

### Core Concepts

#### 2.1 The OSI Model — 7 Layers, 7 Attack Surfaces
The OSI (Open Systems Interconnection) model describes how data travels across a network in 7 layers. Each layer is a potential attack surface.

| Layer | Name | What It Does | Security Threat |
|---|---|---|---|
| 7 | Application | User-facing protocols (HTTP, SMTP, FTP, DNS) | SQL injection, XSS, phishing |
| 6 | Presentation | Data format, encryption, compression | SSL stripping, weak cipher attacks |
| 5 | Session | Manages sessions between applications | Session hijacking, replay attacks |
| 4 | Transport | End-to-end delivery, TCP/UDP | SYN flood, port scanning |
| 3 | Network | IP addressing, routing | IP spoofing, routing attacks |
| 2 | Data Link | MAC addresses, Ethernet, switching | ARP spoofing, MAC flooding |
| 1 | Physical | Cables, wireless signals | Physical access, cable tapping, jamming |

**Mnemonic:** "All People Seem To Need Data Processing" (Application → Physical)

#### 2.2 TCP/IP and the Three-Way Handshake
TCP (Transmission Control Protocol) establishes reliable connections using a three-step handshake:

1. **SYN:** Client sends synchronise packet to server: "I want to connect"
2. **SYN-ACK:** Server acknowledges: "OK, I'm ready"
3. **ACK:** Client acknowledges: "Connection established"

**Security relevance:** 
SYN Flood attack: An attacker sends thousands of SYN packets but never sends the final ACK. The server holds open thousands of half-open connections, exhausting resources. This is a DoS attack at the transport layer.

**TCP vs UDP:**
- **TCP:** Reliable, ordered, connection-oriented. Used for HTTP, email, file transfers.
- **UDP:** Faster, connectionless, no guarantee of delivery. Used for DNS, video streaming, VoIP.
- **Security implication:** UDP is often used in amplification DDoS attacks because it has no handshake — attackers can spoof the source IP.

#### 2.3 IP Addressing
**IPv4:** 32-bit address, written as four octets: 192.168.1.1

**Private IP ranges (not routable on public internet):**
- 10.0.0.0/8 (10.0.0.0 – 10.255.255.255) — large networks
- 172.16.0.0/12 — medium networks
- 192.168.0.0/16 — home/small office (most common)

**Public IPs:** Assigned by ISPs, routable globally.

**NAT (Network Address Translation):** Your home router has one public IP. Multiple internal devices share it through NAT. The router translates internal private IPs to the public IP for outbound traffic.

**CIDR Notation:** 192.168.1.0/24 means the first 24 bits are the network address, leaving 8 bits for hosts = 254 usable host addresses.

**Security relevance:**
- Knowing whether an IP is private or public tells you if it's internal or external traffic
- CIDR blocks help define firewall rules
- Reconnaissance starts with IP range identification

#### 2.4 Key Protocols — Operation & Security
**DNS (Domain Name System) — Port 53:**
Translates domain names to IP addresses. "google.com" → 142.250.80.46.
Attack: DNS poisoning/spoofing — attacker manipulates DNS responses to redirect traffic to a malicious server.

**DHCP (Dynamic Host Configuration Protocol) — Ports 67/68:**
Automatically assigns IP addresses to devices on a network.
Attack: Rogue DHCP server — attacker sets up a fake DHCP server that assigns itself as the default gateway, becoming a man-in-the-middle.

**HTTP vs HTTPS:**
- HTTP: Port 80. Traffic is plaintext — anyone who intercepts can read it.
- HTTPS: Port 443. Traffic is encrypted with TLS. The "S" is for Secure.
Security rule: Never transmit credentials or sensitive data over HTTP. Always require HTTPS. Check for the padlock icon.

**SSH (Secure Shell) — Port 22:**
Encrypted remote access protocol. Replaces the insecure Telnet (Port 23 — plaintext).
Attack: Brute force against SSH — automated attempts to guess password. Mitigated by: fail2ban, key-based authentication, non-standard port.

**Common ports security professionals must know:**

| Port | Protocol | Security Note |
|---|---|---|
| 21 | FTP | Plaintext file transfer — avoid |
| 22 | SSH | Encrypted remote access |
| 23 | Telnet | NEVER use — plaintext remote access |
| 25/587 | SMTP | Email — check for open relays |
| 53 | DNS | Monitor for exfiltration tunnels |
| 80 | HTTP | Always redirect to HTTPS |
| 443 | HTTPS | Encrypted web — verify certificates |
| 445 | SMB | High-value target — EternalBlue exploit |
| 3306 | MySQL | Should never be open to internet |
| 3389 | RDP | Remote Desktop — frequently attacked |

#### 2.5 Network Devices & Security
**Firewall:** Filters traffic based on rules (allow/deny by IP, port, protocol).
- Packet filtering: Simple — inspect headers only
- Stateful inspection: Track connection state — knows which packets are part of established connections
- Next-Generation Firewall (NGFW): Deep packet inspection, application awareness, intrusion prevention

**IDS vs IPS:**
- IDS (Intrusion Detection System): Monitors and ALERTS — passive
- IPS (Intrusion Prevention System): Monitors and BLOCKS — active

**VPN (Virtual Private Network):**
Encrypts traffic between a device and a server. Hides traffic from ISPs and local network observers. Used in Nigeria to bypass restrictions and protect public WiFi connections.
Security concern: Avoid free VPNs — many log and sell data or inject ads.

**Proxy vs VPN:**
- Proxy: Hides IP for specific traffic (usually web browser only), no encryption
- VPN: Encrypts ALL traffic from the device

---

### Module 2 Labs

**Lab 2.1 — Wireshark Traffic Analysis (Wireshark)**
Platform: Wireshark (wireshark.org — free)
Task: Capture 5 minutes of network traffic on your home/lab network. Identify:
- HTTP vs HTTPS traffic (look for plaintext vs encrypted)
- DNS queries — which domains are being resolved?
- TCP handshakes (filter: tcp.flags.syn==1)
Document 5 observations about what you can see in plaintext traffic.
Duration: 60 minutes

**Lab 2.2 — Network Scanning (Nmap)**
Platform: Nmap (nmap.org — free)
Task: Scan your own lab network (192.168.1.0/24 — YOUR OWN NETWORK ONLY):
- `nmap -sn 192.168.1.0/24` — host discovery
- `nmap -sV [target IP]` — service version detection
- `nmap -sC [target IP]` — default scripts
IMPORTANT: Only scan networks you own or have explicit permission to scan.
Duration: 45 minutes

**Lab 2.3 — Protocol Analysis on TryHackMe**
Platform: TryHackMe
Task: Complete "Wireshark 101" room — analyse provided PCAP files to identify attack patterns.
Duration: 90 minutes

---

### Module 2 Assignments

1. **OSI Attack Mapping:** For each of the 7 OSI layers, identify one real attack that operates at that layer, describe how it works, and propose one technical control to defend against it. Present as a table.

2. **Port Audit:** Use nmap to scan your home router (192.168.1.1 or similar) and document all open ports. Research what service each port runs and whether it should be open. Are any unnecessarily exposed?

3. **Protocol Comparison:** Compare HTTP and HTTPS from a security perspective. Why did the web move to HTTPS? What does a man-in-the-middle attacker see in each case? Use Wireshark screenshots where possible.

4. **Nigerian Telecoms Security:** Research how Nigerian telecom companies (MTN, Airtel) implement network security. What publicly known attacks have targeted their infrastructure? (400 words)

5. **Home Network Hardening:** Document the security configuration of your home router. What default settings should be changed? Create a hardening checklist with 10 items.

---

## MODULE 3 [BEGINNER]: LINUX & COMMAND LINE FOR SECURITY
### The Operating System of Security Professionals

---

### Module Overview
Linux is the operating system that runs most of the internet, most servers, and virtually all security tools. Kali Linux is the standard penetration testing distribution. This module teaches the Linux command line fundamentals essential for cybersecurity work.

### Module Objectives
By the end of this module, students will be able to:
1. Navigate the Linux filesystem using command line
2. Manage files, permissions, and users
3. Use essential security commands (grep, find, ps, netstat, ss, chmod, chown)
4. Understand Linux file permissions and their security implications
5. Write basic bash scripts for security automation
6. Use Kali Linux as a penetration testing platform

---

### Core Concepts

#### 3.1 Why Linux for Security?
- **Servers:** 96.3% of the world's top 1 million web servers run Linux
- **Security tools:** Wireshark, Nmap, Metasploit, Burp Suite, Aircrack-ng all run natively on Linux
- **Kali Linux:** Debian-based distribution with 600+ pre-installed security tools
- **Control:** Linux gives granular control over every aspect of system configuration
- **No cost:** Free and open source

#### 3.2 Essential Linux Commands

**Navigation:**
```bash
pwd                     # Print working directory (where am I?)
ls                      # List directory contents
ls -la                  # List ALL files (including hidden) with details
cd /var/log             # Change directory
cd ..                   # Go up one level
cd ~                    # Go to home directory
```

**File Operations:**
```bash
cat /etc/passwd         # Display file contents
less /var/log/syslog    # View large file (scroll with arrow keys)
head -20 file.txt       # First 20 lines
tail -f /var/log/auth.log  # LIVE file tail (watch for new lines — useful for log monitoring!)
cp source.txt dest.txt  # Copy file
mv oldname newname      # Move/rename file
rm file.txt             # Delete file
rm -rf directory/       # Delete directory recursively (DANGEROUS — no recycle bin!)
mkdir newdir            # Create directory
find / -name "*.log"    # Find all .log files
```

**Searching:**
```bash
grep "Failed password" /var/log/auth.log    # Search for failed SSH logins
grep -i "error" /var/log/syslog             # Case-insensitive search
grep -r "password" /etc/                     # Recursive search in directory
```

**Network Commands:**
```bash
ifconfig                # Network interface info (deprecated)
ip addr                 # Modern interface info
ip route                # Routing table
ss -tlnp                # Active listening ports (replaces netstat)
ping 8.8.8.8            # Test connectivity
traceroute google.com   # Trace network path
curl -I https://target.com  # Get HTTP headers
wget https://url/file   # Download file
```

**Process Management:**
```bash
ps aux                  # All running processes
ps aux | grep nginx     # Filter for specific process
kill PID                # Terminate process
top                     # Live process monitor
htop                    # Better process monitor (must install)
```

#### 3.3 Linux File Permissions — The Security Foundation

Every file and directory in Linux has three permission sets and three permission types:

**Sets:** Owner (u) | Group (g) | Others (o)
**Types:** Read (r=4) | Write (w=2) | Execute (x=1)

```
-rwxr-xr--  1 user group 4096 Jan 1 webserver.sh
 │││└┬┘└┬┘└┬┘
 │││ │   │  └── Others: r-- = Read only (4)
 │││ │   └───── Group:  r-x = Read+Execute (5)
 │││ └───────── Owner:  rwx = Read+Write+Execute (7)
 ││└─────────── File type: - = regular file, d = directory
```

**chmod (Change Mode):**
```bash
chmod 755 script.sh     # Owner=rwx, Group=rx, Others=rx
chmod 600 privatekey    # Owner=rw only — nobody else can read
chmod +x script.sh      # Add execute permission to all
chmod o-r sensitive.txt # Remove read permission from others
```

**Security golden rules:**
- Web-accessible files: 644 (rw-r--r--)
- Executable scripts: 755 (rwxr-xr-x)
- Private keys/credentials: 600 (rw-------)
- Configuration files: 640 (rw-r-----)
- NEVER: 777 (rwxrwxrwx) — world-writable is dangerous

**chown (Change Ownership):**
```bash
chown www-data:www-data /var/www/html/   # Set web server as owner
chown root:root /etc/shadow              # Password file owned by root only
```

#### 3.4 User and Group Management

```bash
cat /etc/passwd         # All users — username:x:UID:GID:comment:home:shell
cat /etc/shadow         # Password hashes — readable by root only
cat /etc/group          # All groups

sudo useradd -m analyst # Create user 'analyst' with home directory
sudo passwd analyst     # Set password
sudo usermod -aG sudo analyst  # Add to sudo group (admin access)
sudo deluser analyst    # Delete user
sudo deluser analyst sudo   # Remove from sudo group

id                      # Your current user ID and group memberships
whoami                  # Current username
sudo -l                 # What can current user run as sudo?
```

#### 3.5 Log Analysis — Where Attackers Leave Traces

Linux logs are the security professional's primary investigation source:

```bash
/var/log/auth.log       # Authentication events (SSH logins, sudo usage)
/var/log/syslog         # General system events
/var/log/kern.log       # Kernel events
/var/log/apache2/access.log  # Web server access
/var/log/apache2/error.log   # Web server errors
/var/log/fail2ban.log   # Banned IPs (if fail2ban installed)
```

**Practical log analysis:**
```bash
# Failed SSH login attempts
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Successful logins
grep "Accepted" /var/log/auth.log

# Most frequent visitor IPs from web log
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -rn | head -20

# What happened at a specific time
grep "Jan 15 02:" /var/log/auth.log   # All events between 2:00-2:59 AM on Jan 15
```

---

### Module 3 Labs

**Lab 3.1 — Kali Linux Setup**
Platform: Kali Linux (VirtualBox or WSL2 on Windows)
Task: Install Kali Linux in a VM. Navigate the filesystem. Locate key security tools (nmap, wireshark, metasploit, burpsuite). Document 10 pre-installed tools and their purpose.
Duration: 60 minutes

**Lab 3.2 — Linux Log Analysis**
Platform: Kali Linux / provided log file
Task: Analyse a provided /var/log/auth.log file. Answer: How many failed login attempts? Which IP attempted the most logins? Was any login successful? What time did suspicious activity peak?
Duration: 45 minutes

**Lab 3.3 — File Permissions Audit**
Platform: Linux/Kali
Task: Create a directory structure. Set permissions according to the security principles above. Use `find / -perm -o+w` to find world-writable files — document why each one is a security risk.
Duration: 30 minutes

---

### Module 3 Assignments

1. **Linux Command Cheat Sheet:** Create a personal Linux security command reference. Organise by category (file operations, network, permissions, process, logs). Minimum 40 commands with description and example.

2. **Log Analysis Report:** Analyse the provided sample auth.log file. Write a professional security incident report: what happened, when, who was responsible (what IP), what was the outcome.

3. **Permission Audit Script:** Write a bash script that checks a directory for files with world-writable (o+w) permissions and emails a report. (Can email to a text file for this exercise.)

4. **Kali Linux Tool Inventory:** Document 20 tools pre-installed in Kali Linux. For each: name, category (reconnaissance/exploitation/post-exploitation/etc.), what it does, one use case.

5. **Privilege Escalation Research:** Research "Linux privilege escalation techniques." Describe 3 common techniques and how they can be mitigated from a defensive perspective.

---

## MODULE 4 [INTERMEDIATE]: CRYPTOGRAPHY & PKI
### The Mathematics of Trust

---

### Module Overview
Cryptography is the foundation of all modern security — it protects passwords, secures communications, authenticates identities, and verifies data integrity. Understanding cryptography is essential for any security professional.

### Module Objectives
By the end of this module, students will be able to:
1. Explain symmetric vs asymmetric encryption with examples
2. Describe how hashing works and its security applications
3. Explain the Public Key Infrastructure (PKI) and digital certificates
4. Understand TLS/SSL handshake operation
5. Identify common cryptographic weaknesses and attacks
6. Demonstrate encryption and decryption using CyberChef

---

### Core Concepts

#### 4.1 Cryptography Fundamentals

**Plaintext:** The original, readable data.
**Ciphertext:** Encrypted, unreadable data.
**Encryption:** Converting plaintext to ciphertext using a key and an algorithm.
**Decryption:** Converting ciphertext back to plaintext using the key.

**Types of cryptography:**

**Symmetric encryption:** Same key for encryption and decryption.
- Fast and efficient for large amounts of data
- Key problem: How do you securely share the key?
- Examples: AES (Advanced Encryption Standard), DES (outdated), 3DES (transitional), ChaCha20

**AES (Advanced Encryption Standard):**
- The gold standard for symmetric encryption
- Key sizes: 128-bit (AES-128), 192-bit (AES-192), 256-bit (AES-256)
- AES-256 would take billions of years to brute-force with current technology
- Used in: WhatsApp message encryption, disk encryption, VPNs, WiFi (WPA2/WPA3)

**Asymmetric encryption:** Two mathematically linked keys — public key and private key.
- What the public key encrypts, only the private key can decrypt
- What the private key signs, the public key can verify
- Slower than symmetric — used for key exchange, digital signatures
- Examples: RSA, Elliptic Curve Cryptography (ECC), Diffie-Hellman

**Hybrid encryption (real-world usage):**
TLS uses BOTH: Asymmetric encryption to securely exchange a symmetric key → symmetric encryption for all subsequent data. Best of both worlds.

#### 4.2 Cryptographic Hashing

A hash function takes input of any size and produces a fixed-length output (the digest). Properties:
1. **One-way:** Cannot reverse-engineer the input from the hash
2. **Deterministic:** Same input always produces the same hash
3. **Avalanche effect:** Tiny change in input = completely different hash
4. **Collision resistant:** Virtually impossible to find two inputs with the same hash

**Common hash algorithms:**

| Algorithm | Output Length | Status |
|---|---|---|
| MD5 | 128-bit (32 hex chars) | BROKEN — do not use for security |
| SHA-1 | 160-bit (40 hex chars) | BROKEN — deprecated |
| SHA-256 | 256-bit (64 hex chars) | SECURE — current standard |
| SHA-3 | 224–512-bit | SECURE — most modern |
| bcrypt | 60 chars | SECURE — specifically for passwords |

**Security applications of hashing:**
- **Password storage:** Never store plaintext passwords. Store the hash. When user logs in, hash their input and compare.
- **File integrity:** SHA-256 hash of a file. If the file is changed, the hash changes — instant tampering detection.
- **Digital signatures:** Hash the document, encrypt the hash with your private key = digital signature
- **Blockchain:** Each block contains the hash of the previous block — any modification breaks the chain

**Password hashing attacks:**
- **Rainbow table:** Pre-computed table of input → hash pairs. Defender's counter: **Salting** (adding random data before hashing, making pre-computation useless).
- **Dictionary attack:** Try common passwords and their variations
- **Brute force:** Try all possible combinations

#### 4.3 Public Key Infrastructure (PKI)

PKI is the system of hardware, software, policies, and procedures that creates, manages, distributes, and revokes digital certificates.

**The problem PKI solves:** If you visit "gtbank.com" and see a padlock, how do you know you're ACTUALLY at GTBank's server and not an attacker's?

**The solution — Certificate Authority (CA):**
1. GTBank generates a key pair and creates a Certificate Signing Request (CSR)
2. A trusted CA (Verisign, DigiCert, Let's Encrypt) verifies GTBank's identity
3. CA issues a Digital Certificate binding GTBank's public key to their domain name
4. Your browser has a list of trusted CAs. When it sees GTBank's certificate, it verifies it was signed by a trusted CA.
5. Trust established.

**Certificate contents:**
- Subject (domain/organisation name)
- Public key
- Issuer (which CA signed it)
- Validity period (start and end dates)
- Serial number
- Digital signature of the CA

**Self-signed certificates:** Created by the entity themselves, not a CA. Used internally. Browsers warn "Not Secure" — do NOT use for public websites.

**Certificate chain of trust:**
Root CA (pre-installed in OS/browser) → Intermediate CA → End-entity certificate (your site)

#### 4.4 TLS Handshake — How HTTPS Works

When your browser connects to https://gtbank.com:

1. **Client Hello:** Browser → Server: "I support TLS 1.3, here are my cipher suites and a random number"
2. **Server Hello:** Server → Browser: "Using TLS 1.3, here's my certificate, here's another random number"
3. **Certificate Verification:** Browser checks: Is the cert valid? Signed by a trusted CA? Not expired? Matches the domain?
4. **Key Exchange:** Both parties use the random numbers + server's public key to derive a shared symmetric key
5. **Finished:** Both sides confirm encryption is working. All subsequent data is encrypted with AES.

**TLS 1.3 improvements over 1.2:** Faster handshake (1 round-trip instead of 2), removed weak cipher suites, forward secrecy by default.

**SSL stripping attack:** An attacker intercepts traffic and downgrades HTTPS to HTTP. Victim thinks they're on HTTPS but traffic is plaintext. Mitigation: HSTS (HTTP Strict Transport Security) — tells browsers to ALWAYS use HTTPS.

---

### Module 4 Labs

**Lab 4.1 — Cryptography Exploration (CyberChef)**
Platform: CyberChef (gchq.github.io/CyberChef — free, browser-based)
Task:
- Encrypt "MetaBridge Academy 2024" with AES-256-CBC. Record the ciphertext and key.
- Hash the same text with MD5, SHA-1, SHA-256. Compare outputs.
- Change one character and re-hash with SHA-256. Observe the avalanche effect.
- Demonstrate Base64 encoding (NOT encryption — just encoding).
Duration: 60 minutes

**Lab 4.2 — Certificate Analysis**
Platform: Web browser
Task: Visit 5 Nigerian banking websites (GTBank, UBA, Access Bank, Zenith, Fidelity). For each:
- Click the padlock → Certificate
- Record: Issuer, validity period, key algorithm, key size
- Are any using SHA-1? (Should be SHA-256 or better)
Document findings in a security report format.
Duration: 30 minutes

**Lab 4.3 — Password Hashing (CyberChef + Have I Been Pwned)**
Platform: CyberChef + haveibeenpwned.com
Task: Hash the common passwords 'password123', 'qwerty', 'lagos2024', 'metabridge' with SHA-1. Check their SHA-1 hashes against HaveIBeenPwned's Pwned Passwords API (k-anonymity model — privacy-safe). Demonstrate why these passwords are compromised.
Duration: 30 minutes

---

### Module 4 Assignments

1. **Cryptography Use Case Analysis:** For each of the following systems, identify: (a) what cryptography is used, (b) why that type was chosen, (c) what would happen if it failed: WhatsApp E2E encryption, Nigerian e-passport, ATM PIN verification, your email provider.

2. **Certificate Transparency Research:** Go to crt.sh and look up any Nigerian company's domain. What certificates have been issued? Are there any suspicious certificates issued you wouldn't expect? (This is how defenders detect attackers who obtained fraudulent certificates for their domain.)

3. **Ransomware Cryptography:** Research how ransomware (e.g., WannaCry or LockBit) uses cryptography to encrypt victim files. How does the attacker use asymmetric encryption to prevent victims from decrypting files without paying? (300 words)

4. **Broken Algorithm Impact:** MD5 was declared cryptographically broken in 2004. Despite this, some Nigerian systems still use MD5 for password storage. Research why broken hash algorithms are dangerous — specifically explain how a rainbow table attack works against MD5 password hashes. (400 words)

5. **PKI Implementation:** A startup in Abuja is building an e-commerce website and wants to get HTTPS. Walk them through the complete process: generating a private key, creating a CSR, choosing a CA, installing the certificate, and verifying it works. (Step-by-step guide)

---

## MODULE 5 [INTERMEDIATE]: NETWORK SECURITY
### Firewalls, IDS/IPS, VPNs & Wireless Security

---

### Module Overview
Network security is the set of controls, policies, and technologies that protect the underlying networking infrastructure from unauthorised access, misuse, malfunction, modification, destruction, or improper disclosure.

### Module Objectives
By the end of this module, students will be able to:
1. Configure basic firewall rules (iptables/ufw)
2. Understand IDS/IPS architecture and signature vs anomaly detection
3. Implement VPN solutions for remote access
4. Assess wireless network security (WPA2/WPA3)
5. Identify and defend against common network attacks (ARP spoofing, DNS poisoning, MitM)
6. Perform network reconnaissance using Nmap and Shodan

---

### Core Concepts

#### 5.1 Firewalls — Controlling Traffic Flow

**Firewall types (evolution):**

**1. Packet-filtering firewall (Stateless):**
Inspects packets in isolation — checks source IP, destination IP, protocol, port.
Fast but limited — doesn't understand connections.
Example rule: DENY inbound TCP port 23 (block Telnet from anywhere)

**2. Stateful inspection firewall:**
Tracks connection state — knows which packets belong to established connections.
Can allow responses to outbound connections without opening permanent inbound ports.
This is how your home router works.

**3. Application-layer / Next-Generation Firewall (NGFW):**
Deep packet inspection — understands application protocols.
Can block specific websites, detect malware in allowed traffic, enforce user identity.
Examples: Palo Alto, Fortinet, Cisco ASA

**Linux firewall — iptables:**
```bash
# Block all inbound SSH except from one IP
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Block an IP
iptables -A INPUT -s 103.22.8.0/24 -j DROP

# Show current rules
iptables -L -v -n
```

**UFW (Uncomplicated Firewall) — easier for beginners:**
```bash
ufw enable
ufw allow 22/tcp        # Allow SSH
ufw allow 443/tcp       # Allow HTTPS
ufw deny 23/tcp         # Block Telnet
ufw status verbose      # Show rules
```

**DMZ (Demilitarised Zone):** A network segment that sits between the internet and the internal network. Public-facing servers (web, mail) go in the DMZ. If they're compromised, the attacker is still outside the internal network.

#### 5.2 IDS/IPS

**IDS (Intrusion Detection System):**
Monitors traffic, generates alerts. Does NOT block. Used for visibility and forensics.
- **Network IDS (NIDS):** Monitors network segments (Snort, Suricata)
- **Host IDS (HIDS):** Monitors a specific host (OSSEC, Wazuh)

**IPS (Intrusion Prevention System):**
Monitors traffic AND blocks malicious packets in real time.
Risk: False positives can block legitimate traffic (a misconfigured IPS can take down services).

**Detection methods:**
- **Signature-based:** Matches traffic against a database of known attack patterns. Fast and accurate for known attacks. Blind to new (zero-day) attacks.
- **Anomaly-based:** Establishes a baseline of "normal" and alerts on deviations. Can detect novel attacks but prone to false positives.

**Snort — the open-source NIDS:**
```
alert tcp any any -> 192.168.1.0/24 80 (msg:"HTTP GET Request"; content:"GET"; http_method; sid:1000001;)
```
This rule alerts when any source sends an HTTP GET to any host in the /24 network.

#### 5.3 Wireless Security

**WiFi security standards evolution:**

| Standard | Encryption | Status |
|---|---|---|
| WEP | RC4 (broken) | NEVER USE — cracked in minutes |
| WPA | TKIP | Deprecated — weak |
| WPA2 | AES (CCMP) | Acceptable — use if WPA3 unavailable |
| WPA3 | SAE (Dragonfly) | Current standard — required for new devices |

**WPA2 vulnerability — KRACK (Key Reinstallation Attack):** Allows attackers on the same network to potentially decrypt traffic. Mitigated by OS patches (2017+).

**WPA2 attack (offline dictionary attack):**
1. Capture the 4-way WPA2 handshake (when a device connects to WiFi)
2. Take it offline and run a dictionary/brute force attack against it
3. If the WiFi password is weak, it will be cracked

This is why your WiFi password should be: 12+ characters, random, not in any dictionary.

**Nigerian public WiFi risk:** Popular spots — airports, malls, hotels — often have weak or no security. Attackers set up "evil twin" access points with identical SSIDs. Users connect thinking it's the legitimate network. All traffic goes through the attacker.
Mitigation: Always use a VPN on public WiFi. Verify you're connected to the legitimate SSID. Avoid banking on public WiFi.

#### 5.4 Reconnaissance with Shodan

**Shodan** is the "search engine for internet-connected devices." It continuously scans the internet and indexes open ports, banners, and services.

Security professionals use Shodan to:
- Find internet-facing devices in their organisation they didn't know existed
- Identify exposed services (databases, cameras, industrial control systems)
- Research attacker reconnaissance techniques

**Shodan search examples:**
- `org:"MTN Nigeria"` — devices registered to MTN Nigeria's IP ranges
- `port:3389 country:NG` — Nigerian servers with Remote Desktop Protocol exposed
- `mongodb country:NG` — exposed MongoDB databases in Nigeria (often contain unprotected data)
- `apache country:NG` — Apache web servers in Nigeria

**Defensive use:** Run Shodan on your own organisation's IP range. If Shodan can find your database, so can attackers. Anything visible to Shodan should be intentional.

---

### Module 5 Labs

**Lab 5.1 — Firewall Configuration**
Platform: Kali Linux
Task: Configure iptables/UFW rules on a Kali Linux VM to:
- Allow SSH only from a specific IP
- Allow HTTP and HTTPS from anywhere
- Block all other inbound connections
- Allow all outbound
- Test rules by attempting connections from different IPs
Duration: 60 minutes

**Lab 5.2 — Shodan Reconnaissance**
Platform: Shodan (shodan.io — free account)
Task: Search Shodan for Nigerian internet-facing services:
- `country:NG port:3306` (MySQL databases)
- `country:NG port:22 product:OpenSSH` (SSH servers)
- `country:NG "default password"` (devices with default credentials)
Document 5 findings and explain their security risk.
Duration: 45 minutes

**Lab 5.3 — Nmap Network Scanning**
Platform: Nmap + Kali Linux
Task: Against a lab target (TryHackMe room or your own VM):
- Full port scan: `nmap -p- [target]`
- Service detection: `nmap -sV [target]`
- OS detection: `nmap -O [target]`
- Default scripts: `nmap -sC [target]`
Produce a professional reconnaissance report from your findings.
Duration: 60 minutes

---

### Module 5 Assignments

1. **Firewall Rule Design:** A Nigerian bank's IT team needs firewall rules for their perimeter. Design a complete ruleset covering: web server access, banking application server, database server, administrative access, outbound internet for employees. Justify each rule.

2. **IDS/IPS Comparison:** Compare Snort and Suricata as open-source IDS/IPS solutions. When would you choose one over the other? What are the Nigerian implementation considerations (hardware costs, expertise availability)?

3. **Wireless Security Audit Methodology:** Design a wireless security audit methodology for a Nigerian hotel that provides WiFi to guests. What would you test? What tools would you use? What would a professional report include?

4. **Shodan Research Report:** Using Shodan's free tier, identify 3 categories of exposed Nigerian internet assets that represent security risks. For each: describe what was found, why it's a risk, and how to remediate.

5. **VPN Implementation:** A remote team in Lagos, Abuja, and Port Harcourt needs secure access to company resources in Lagos. Design a VPN solution for them. Compare: OpenVPN, WireGuard, and a commercial solution. Include cost analysis in Naira.

---

## MODULE 6 [INTERMEDIATE]: ETHICAL HACKING & PENETRATION TESTING METHODOLOGY
### Finding Vulnerabilities Before Attackers Do

---

### Module Overview
Penetration testing is the authorised, systematic attempt to exploit vulnerabilities in a system to assess its security posture. This module covers the complete penetration testing methodology used by professional ethical hackers.

### Module Objectives
By the end of this module, students will be able to:
1. Explain the penetration testing lifecycle (PTES methodology)
2. Perform information gathering and OSINT
3. Identify and exploit vulnerabilities in a controlled lab environment
4. Write professional penetration testing reports
5. Understand the legal and ethical requirements for penetration testing in Nigeria

---

### Core Concepts

#### 6.1 The Penetration Testing Lifecycle (PTES)

The Penetration Testing Execution Standard (PTES) defines 7 phases:

**Phase 1: Pre-Engagement**
The most critical phase. Define the scope, rules of engagement, and legal authorisation.
- **Rules of Engagement (RoE):** What can be tested? What is off-limits? What hours can testing occur? What happens if a critical system is disrupted?
- **Scope:** IP ranges, domains, applications, physical premises — what's in, what's out
- **Legal authorisation:** Written permission (penetration test agreement) signed by an authorised representative of the target organisation. Without this, penetration testing is ILLEGAL.

**Documentation required before starting:**
- Signed Penetration Test Agreement
- Statement of Work (what will be tested, timeline, methodology)
- Non-Disclosure Agreement (you will see sensitive information)
- Emergency contacts (who to call if something goes wrong)

**Phase 2: Intelligence Gathering (Reconnaissance)**
Passive and active gathering of information about the target.
- Passive: OSINT (Open Source Intelligence) — no interaction with target systems
- Active: Direct interaction with target — scanning, probing

**Passive OSINT techniques:**
- WHOIS: Domain registration information
- DNS enumeration: Subdomains, MX records, name servers
- Google dorking: Advanced search operators to find sensitive info
- LinkedIn/social media: Employee names, job titles, technologies used
- Shodan: Internet-facing services
- Wayback Machine: Old versions of websites
- Certificate Transparency: All certificates ever issued for a domain

**Active techniques:**
- Port scanning (Nmap)
- Service fingerprinting
- Web application crawling
- Network mapping

**Phase 3: Threat Modelling**
Based on intelligence gathered, identify the most likely attack paths and the most valuable targets. Prioritise testing based on risk.

**Phase 4: Vulnerability Analysis**
Systematically identify vulnerabilities using:
- Automated scanners (Nessus, OpenVAS)
- Manual testing
- CVE database research
- Configuration review

**Phase 5: Exploitation**
Attempt to exploit identified vulnerabilities to gain access.
- Must stay within scope
- Document every step (screenshots, logs)
- Minimise impact — exploit to prove access, not to damage
- Stop if unintended consequences occur

**Phase 6: Post-Exploitation**
After gaining access, assess the true impact:
- What data can be accessed?
- Can lateral movement occur (move to other systems)?
- Can privilege escalation occur (gain admin/root access)?
- What's the realistic business impact?

**Phase 7: Reporting**
The deliverable. A professional penetration test report includes:

**Executive Summary:** Non-technical overview of findings and risk rating for leadership
**Technical Findings:** Each vulnerability: CVE reference, CVSS score, description, evidence, remediation
**Risk Rating:** Critical/High/Medium/Low/Informational
**Remediation Roadmap:** Prioritised action plan

**CVSS Score (Common Vulnerability Scoring System):**
A 0–10 score rating vulnerability severity:
- 9.0–10.0: Critical
- 7.0–8.9: High
- 4.0–6.9: Medium
- 0.1–3.9: Low
- 0.0: Informational

#### 6.2 Google Dorking — Passive OSINT

Google search operators can find sensitive information indexed accidentally:

```
site:target.com          # All pages on domain
site:target.com filetype:pdf    # PDF documents on target
site:target.com inurl:admin    # Admin panels
inurl:"login" site:target.com  # Login pages
"Index of /" site:target.com   # Open directories
filetype:sql site:target.com   # Database dumps (CRITICAL!)
filetype:env site:target.com   # .env files with credentials
intext:"password" filetype:txt site:target.com  # Text files with passwords
```

**Nigerian application:** Some Nigerian companies have accidentally exposed:
- PDF documents with employee salary information
- Open FTP directories with client data
- Database connection strings in indexed config files

Searching for these is passive OSINT — legal if not accessing the files.

#### 6.3 Vulnerability Scanning with OpenVAS/Nessus

Automated vulnerability scanners probe systems for known vulnerabilities.
- Compare versions of installed software against CVE databases
- Check for default credentials
- Test for common misconfigurations
- Produce reports with severity ratings

**Important limitation:** Scanners produce false positives. Every finding must be manually verified. A scanner saying a vulnerability exists doesn't mean it's exploitable.

**TryHackMe lab environment:** Students will use TryHackMe rooms to practice exploitation in a safe, legal, authorised environment. The target machines in TryHackMe rooms are designed to be hacked — this is explicitly authorised.

---

### Module 6 Labs

**Lab 6.1 — OSINT Investigation (Shodan + WHOIS + crt.sh)**
Platform: Shodan, WHOIS (who.is), crt.sh, Google Dorking
Task: Perform passive OSINT on a company you are assigned (instructor provides a target that has consented or a practice domain). Document:
- IP ranges and hosting provider
- Subdomains (using crt.sh)
- Historical DNS records
- Internet-facing services (Shodan)
- Any accidentally exposed sensitive information (Google Dorking)
Duration: 90 minutes

**Lab 6.2 — Penetration Testing on TryHackMe**
Platform: TryHackMe
Task: Complete the "Basic Pentesting" room. This authorised environment simulates a vulnerable server. Practice:
- Port scanning
- Service enumeration
- Vulnerability identification
- Exploitation
- Privilege escalation
Document each step as if writing a penetration test report.
Duration: 2 hours

**Lab 6.3 — Vulnerability Scanning (ANY.RUN)**
Platform: ANY.RUN (any.run — free sandbox)
Task: Submit a suspicious file or URL to ANY.RUN sandbox. Analyse the dynamic analysis report:
- What processes does it create?
- What network connections does it make?
- What registry changes occur?
- What is the verdict (malicious/suspicious/clean)?
Write a malware analysis report.
Duration: 60 minutes

---

### Module 6 Assignments

1. **Penetration Test Scoping Document:** Create a professional penetration test scoping document for a hypothetical Nigerian bank (National Bank of Nigeria). Include: scope definition, rules of engagement, timeline, methodology, legal authorisation requirements, emergency contacts, and what is explicitly excluded.

2. **OSINT Report:** Using only passive OSINT (WHOIS, Google Dorking, crt.sh, Shodan — no active scanning), produce a reconnaissance report on a public Nigerian government website (a .gov.ng domain). Document what information is publicly available that an attacker could exploit.

3. **Vulnerability Report Writing (choose ONE):** Write a professional vulnerability finding report including: description, CVSS score, affected systems, technical impact, business impact, evidence (screenshots or proof-of-concept summary), and remediation steps. Choose from: **(A)** CVE-2017-0144 (EternalBlue/WannaCry — SMBv1 Remote Code Execution, CVSS 9.3) — the ransomware that shut down the UK NHS and Spanish telecoms in May 2017; or **(B)** CVE-2021-44228 (Log4Shell — Apache Log4j JNDI injection, CVSS 10.0) — the maximum-severity flaw that exposed virtually every enterprise Java application to unauthenticated remote code execution in December 2021. Both are landmark CVEs that every security professional must understand.

4. **Red Team vs Blue Team:** Explain the concept of Red Team (attackers) and Blue Team (defenders) in organisational security. What is a Purple Team exercise? How would a Nigerian financial institution benefit from a purple team exercise?

5. **Nigerian Bug Bounty Research:** Research whether any Nigerian companies or government agencies offer bug bounty programmes. Compare to international programmes (HackerOne, Bugcrowd). Should Nigerian organisations implement bug bounty programmes? (400 words)

---

### Module 6 Critical Thinking Questions

1. A penetration tester discovers a critical vulnerability during a test — a database containing the personal data of 500,000 Nigerians is completely unprotected. The Rules of Engagement don't cover this specific database. What should the tester do? Consider: their legal obligations under NDPA 2023, their contractual obligations to the client, and their ethical responsibilities.

2. A Nigerian startup cannot afford to hire a full-time penetration tester or pay for a third-party assessment. What free or low-cost alternatives can they use to assess their security posture? What are the limitations of these alternatives?

3. The Cybercrimes Act 2015 makes "unauthorised access" a criminal offence. But penetration testers often find that their authorisation letters are from IT managers, not from the actual legal owner of the system. Evaluate the legal risks of penetration testing in Nigeria and what documentation would provide maximum legal protection.

---

*End of Part 1 — Modules 1–6*
*Continues in 01-curriculum-part2.md — Modules 7–12, Capstone, Certification Exam*

---

*MetaBridge Academy | Cybersecurity Curriculum Part 1 | Course 4 of 4*
*Textbook reference: Cybersecurity Sefer — metabridgeacademy.com*
*All enrolment: https://wa.me/2347034357206*
