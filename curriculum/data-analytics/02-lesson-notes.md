# Data Analytics — Full Lesson Notes & Teaching Scripts
## MetaBridge Academy | Course 3 of 4

**For instructor use only. Verbatim scripts, teaching moments, analogies, and facilitation guides.**

---

# PRE-COURSE INSTRUCTOR BRIEFING

## Who You Are Teaching
Students range from complete beginners to people with partial Excel knowledge. Assume zero SQL and zero statistics background. Many will have strong mobile-money intuition (OPay, PalmPay, Flutterwave) — connect data concepts to platforms they already use.

## The Core Promise You're Delivering
By the end of 12 modules, every student can: collect data → clean it → analyse it in Excel and SQL → visualise it in Power BI → communicate findings to stakeholders → get hired.

## Energy Management Across 12 Modules
- Modules 1–3: Build excitement + foundation (don't lose them here)
- Modules 4–6: Skill-building (keep practical, lots of live demos)
- Modules 7–8: Peak complexity (SQL + visualisation — go slow)
- Modules 9–10: Power BI excitement (this is where students feel "professional")
- Modules 11–12: Connect everything (statistics + real-world application)

---

# MODULE 1: INTRODUCTION TO DATA ANALYTICS
## Full Teaching Script

---

### OPENING (10 minutes)

**[Walk in with confidence. No slides yet. Stand at the front.]**

"Before we start, I want to ask you something. And I want you to be honest.

How many of you have used OPay or PalmPay this week?"

**[Wait for hands.]**

"Good. Almost everyone. Now — how does OPay know what to show you when you open the app? How does it decide which offers to push to you? How does it know if your account is being used for fraud before you even notice?"

**[Pause.]**

"Data. Specifically — data analytics. Someone, somewhere, built a system that collects information about how you use that app, analyses patterns, and makes decisions automatically. And that's exactly what we're going to learn to do."

**[Now open first slide.]**

---

### SECTION 1: WHAT IS DATA ANALYTICS? (20 minutes)

"Let me define this clearly: Data analytics is the process of examining datasets to draw conclusions about the information they contain. That sounds academic. Let me make it real.

Imagine you own a shop in Balogun Market. You sell phone accessories. After three months, you have a notebook with every sale: what item, what price, what time of day, how the customer paid.

If you look at that notebook and say 'I sold 2,000 items this month' — that's **descriptive analytics**. Describing what happened.

If you look and ask 'WHY did I sell more on Fridays than Mondays?' — that's **diagnostic analytics**. Investigating causes.

If you look at the pattern and say 'Based on last year, I expect to sell 500 units next week, so I should restock now' — that's **predictive analytics**. Forecasting the future.

And if you say 'If I discount phone cases by 15% on Tuesdays, my total profit increases by 8%' — that's **prescriptive analytics**. Recommending action."

**[Draw the 4 types on the board as a pyramid, complexity increasing upward.]**

"Most organisations in Nigeria today are still at descriptive analytics. They know their numbers. The ones winning — Flutterwave, Paystack, Konga, Jumia — are deep into predictive and prescriptive. That's the opportunity space you're entering."

---

### SECTION 2: THE DATA ANALYTICS LIFECYCLE (20 minutes)

"Analytics doesn't just happen. There's a process. And understanding the process is what separates a data analyst from someone who just makes charts.

The lifecycle has six stages. Let me walk you through all of them.

**Stage 1: Define the Question.**
This is the most underrated stage. Every analysis starts with a question — and if you ask the wrong question, your perfect analysis is worthless.

Bad question: 'Tell me about our sales.'
Good question: 'Which product category has the highest revenue-to-shelf-space ratio in Q4?'

The second question has a specific answer. The first one wastes everyone's time.

**Stage 2: Collect the Data.**
Where does the data come from? Is it internal (your sales system, CRM, inventory database) or external (NBS statistics, weather data, competitor pricing)? Is it structured (in rows and columns) or unstructured (customer complaints in free text)?

**Stage 3: Clean the Data.**
Real data is messy. I guarantee you — 80% of your time as a junior data analyst will be cleaning data. Missing values. Duplicates. Typos. Wrong formats. Impossible numbers. We have a whole module on this. It is not glamorous. It is essential.

**Stage 4: Analyse the Data.**
This is where Excel, SQL, and Power BI come in. You compute, you group, you filter, you aggregate, you find patterns.

**Stage 5: Visualise and Communicate.**
The most brilliant insight, buried in a table nobody reads, is worthless. You must communicate — charts, dashboards, presentations. We have modules on all of this.

**Stage 6: Make Decisions.**
Data analytics exists to support decisions. Not to produce reports. Every analysis should end with a recommendation or an action."

---

### TEACHING MOMENT: The Nigerian Data Ecosystem (15 minutes)

"Let me tell you who produces data in Nigeria, because you'll be using their data in your career.

**NBS — National Bureau of Statistics.** This is Nigeria's official statistical agency. They produce GDP numbers, inflation rates, unemployment statistics, state-by-state household surveys. All their data is public and free at nigerianstat.gov.ng.

**CBN — Central Bank of Nigeria.** Publishes financial system data — banking sector statistics, money supply, exchange rates, credit reports. Critical for anyone doing financial analytics.

**NIBSS — Nigeria Interbank Settlement System.** Every bank transfer, every USSD transaction, every NIP payment goes through NIBSS. They publish aggregated transaction statistics that tell you the pulse of the Nigerian economy in real time.

**INEC — Independent National Electoral Commission.** Publishes voter registration data and election results. Useful for demographic analysis.

**Private sector:** Flutterwave, Paystack, and PalmPay don't share raw data, but they occasionally publish reports that give you a window into payment behaviour.

As Nigerian data analysts, you have a superpower: you can speak to local data sources that international analysts can't. Learn them."

---

### SECTION 3: CAREER LANDSCAPE (15 minutes)

"Let me be transparent about where data analytics can take you in Nigeria. These are real market rates.

Entry-level Data Analyst: ₦150,000–₦300,000/month
Mid-level (2–4 years): ₦400,000–₦800,000/month
Senior Data Analyst: ₦900,000–₦1,500,000/month
Data Analyst at a multinational or fintech: can reach ₦2M+/month

Remote work: Many international companies hire Nigerian analysts at $2,000–$5,000/month. I know MetaBridge graduates who are earning in dollars while sitting in Lagos, Abuja, and Port Harcourt.

**Job titles to target:**
- Data Analyst
- Business Intelligence (BI) Analyst
- Data Engineer (adjacent — needs Python)
- Analytics Manager
- Insight Manager
- Product Analyst (at a tech company)

**Industries hiring data analysts in Nigeria right now:**
- Fintech (most openings — Flutterwave, Kuda, Opay, Moniepoint)
- Telecom (MTN, Airtel — enormous data operations)
- Banking (GTB, Access, Zenith — all building analytics teams)
- FMCG (Unilever, Nestlé — supply chain analytics)
- Consulting (Deloitte, PWC — analytics practices growing fast)
- Government (EFCC, NDDC starting to use data)"

**[Pause and scan the room.]**

"By the time you finish these 12 modules, you will have the skills to apply for entry-level roles at any of these organisations. The MetaBridge certificate on your CV backed by a blockchain-verified credential is something an employer can literally verify instantly. We're not playing."

---

### CLOSE + PREVIEW (5 minutes)

"Here's what Module 2 holds: we're going to talk about where data actually comes from — how to design surveys, how to access APIs, and the legal rules around data in Nigeria under the NDPA 2023. That's the Nigeria Data Protection Act — something every professional here needs to know."

**[Assignment reminder: Ask students to find one publicly available Nigerian dataset from NBS and describe what business question it could answer — 1 page, due next session.]**

---

# MODULE 2: DATA COLLECTION & SOURCES
## Full Teaching Script

---

### OPENING HOOK (10 minutes)

"Let me tell you a story. A startup in Lagos wanted to understand why their app users were dropping off after the first week. They commissioned a survey — 500 questions, sent to 10,000 users. Less than 0.3% responded.

They wasted ₦800,000 on survey software and got almost no data.

Why? Because they asked the wrong questions, in the wrong format, to the wrong people, at the wrong time.

Data collection is a skill. You need to know: where does data come from, what type is it, how do I collect it without bias, and what are the legal rules?

Today we cover all of that."

---

### SECTION 1: DATA TYPES (20 minutes)

"There are two major divisions in data type.

**Quantitative data** is numeric — it measures things. It has two sub-types:
- **Discrete**: whole numbers only. Number of customers. Number of transactions. Number of branches.
- **Continuous**: can be any value on a scale. Revenue (₦3,472.50). Time (4.7 seconds). Temperature. Weight.

**Qualitative data** is categorical — it describes characteristics.
- **Nominal**: categories with no order. Payment method (card/cash/transfer). State of residence. Gender.
- **Ordinal**: categories with a meaningful order. Customer satisfaction (1–5 stars). Education level (primary, secondary, tertiary).

Why does this matter? Because the analysis method changes based on data type. You can calculate an average of continuous data. You cannot calculate an average of 'payment method.' Sounds obvious. You will see real analysts make this mistake."

---

### SECTION 2: PRIMARY vs SECONDARY DATA (15 minutes)

"**Primary data** is data you collect yourself, for your specific purpose.
Examples: customer surveys, interviews, direct observation, experiments, web tracking data you set up yourself.

Pros: Exactly what you need, you control quality, relevant to your question.
Cons: Expensive, time-consuming, requires expertise to design well.

**Secondary data** is data someone else collected that you repurpose.
Examples: NBS reports, CBN statistics, academic research, competitor press releases, industry reports from McKinsey or PwC.

Pros: Free or cheap, already collected, can give historical perspective.
Cons: May not perfectly match your question, quality is out of your control, may be outdated.

In practice: you will always use both. Internal CRM data (primary) + NBS demographic data (secondary) = powerful combination."

---

### SECTION 3: SURVEY DESIGN (20 minutes)

"Since primary data often comes from surveys, let me teach you how to design one that actually works.

**Rule 1: One question per question.**
Bad: 'How satisfied are you with our pricing and delivery speed?'
Good: Two separate questions.

**Rule 2: Avoid leading questions.**
Bad: 'Don't you agree that our service is excellent?'
Good: 'How would you rate our service on a scale of 1–5?'

**Rule 3: Use appropriate scales.**
For opinions: Likert scale (Strongly Disagree / Disagree / Neutral / Agree / Strongly Agree)
For frequency: Never / Rarely / Sometimes / Often / Always
For satisfaction: 1–5 or 1–10 (NPS uses 0–10)

**Rule 4: Keep it short.**
Every extra question reduces completion rate. Target under 10 minutes to complete. Tell respondents the estimated time upfront.

**Rule 5: Test it first.**
Send to 5 colleagues before sending to 5,000 customers. Every survey has a mistake until it doesn't.

**Nigerian-specific survey tip:** In Nigeria, WhatsApp-based surveys (using Google Forms links shared in WhatsApp groups) achieve dramatically higher response rates than email surveys. Most Nigerians don't check email for personal matters. Design accordingly."

---

### SECTION 4: APIs & DATA SOURCES (15 minutes)

"API stands for Application Programming Interface. Think of it as a waiter in a restaurant. You (the data analyst) are the customer. The data is in the kitchen (a database). The API is the waiter that takes your order and brings back exactly what you asked for.

You don't need to be a programmer to use basic APIs. Many data sources provide simple URL-based APIs.

**Example — World Bank API:**
```
https://api.worldbank.org/v2/country/NG/indicator/NY.GDP.MKTP.CD?format=json
```
This URL returns Nigeria's GDP data in JSON format. No code required — just paste in browser, see the data.

**Other useful APIs for Nigerian analysts:**
- NBS API (limited but growing)
- CBN data portal
- Open Exchange Rates (currency data)
- REST Countries (country demographic data)

JSON is the format most APIs return data in. It looks like this:
```json
{
  'country': 'Nigeria',
  'gdp_usd': 472890000000,
  'year': 2023
}
```
You don't need to master JSON. But you need to recognise it and know you can import it into Excel or Python."

---

### SECTION 5: NDPA 2023 — DATA ETHICS & LEGAL COMPLIANCE (15 minutes)

"This section is not optional. As a data professional in Nigeria, you are legally obligated to understand the Nigeria Data Protection Act 2023.

The NDPA 2023 was signed into law on June 14, 2023. It replaced the earlier NDPR framework. Here is what you need to know:

**1. Lawful basis for processing personal data.**
You cannot collect and use someone's personal data without a lawful basis. The main lawful bases are:
- **Consent**: The person agreed. (Must be specific, informed, freely given, unambiguous.)
- **Contract**: You need the data to fulfill a contract with them.
- **Legitimate interest**: Your use of the data is reasonably expected and doesn't override their rights.
- **Legal obligation**: A law requires you to collect it.

**2. Data subject rights under NDPA 2023:**
- Right to access their data
- Right to correct inaccurate data
- Right to deletion ('right to be forgotten')
- Right to data portability
- Right to object to processing

**3. What this means for you as an analyst:**
Every dataset you work with containing personal information — names, phone numbers, BVN, email addresses, location data — is subject to NDPA.
- Don't share customer datasets over WhatsApp
- Don't keep personal data in unencrypted folders
- Anonymise data whenever possible before analysis
- When you see a data breach, report it

**The NDPC** (Nigeria Data Protection Commission) enforces the NDPA. Fines can reach ₦10M or 2% of annual gross revenue — whichever is higher.

I am not trying to scare you. I am preparing you to be a professional. Companies are now rejecting CVs of analysts who don't mention data ethics. This is a career differentiator."

---

# MODULE 3: DATA CLEANING & QUALITY
## Full Teaching Script

---

### OPENING (10 minutes)

**[Show a slide with a screenshot of a real (anonymised) messy dataset — inconsistent formatting, blank cells, duplicates.]**

"This is real data. Not fake classroom data. A real dataset from a real company.

Before anyone could analyse this, they spent three days cleaning it.

The joke in data analytics: '80% of a data analyst's time is spent cleaning data, and the other 20% is spent complaining about cleaning data.'

It's not really a joke. But here's the good news: if you can clean data faster and better than other analysts, you are immediately more valuable. Most people skip the fundamentals. We are not."

---

### SECTION 1: DATA QUALITY DIMENSIONS (20 minutes)

"Before you clean, you must diagnose. Quality problems come in specific categories.

Think of the acronym **FACT + CVR**:

**F — Freshness.** Is the data current? If you're doing a market analysis and your dataset is from 2019, that's pre-COVID. The Nigerian economy changed dramatically. Old data can be worse than no data.

**A — Accuracy.** Are the values correct? A customer's age listed as 150 years is inaccurate. A phone number with 9 digits (Nigerian numbers have 11) is inaccurate.

**C — Completeness.** Are all required fields populated? Missing values can skew results. We'll talk about how to handle them.

**T — Timeliness.** Did the data arrive when needed? A daily sales report delivered weekly is not timely.

**C — Consistency.** Does the same fact appear the same way across systems? If your CRM says a customer's state is 'Lagos' and your billing system says 'LG' and your survey says 'Lagos State' — those are three representations of the same thing. Inconsistent.

**V — Validity.** Does the data conform to defined rules? A salary field should never contain negative numbers. A date field should never contain 'February 30th.'

**R — Reliability.** Is the collection process trustworthy and repeatable? If two people follow the same data collection procedure and get wildly different results, reliability is a problem."

---

### SECTION 2: MISSING DATA — THE THREE TYPES (25 minutes)

"Not all missing data is the same. The type of missingness determines how you handle it.

**MCAR — Missing Completely At Random.**
The missingness has nothing to do with the data itself. Random technical failures — form didn't submit properly, server error, interviewer forgot to record one field.

Example: In a survey of 10,000 customers, 200 responses didn't record 'Age' because of a form bug that occurred at random times. The 200 missing 'Age' entries are not related to the actual ages.

Implication: MCAR is the 'best case.' You can usually delete these rows or impute with the mean/median without introducing bias.

**MAR — Missing At Random (but related to other observed variables).**
The missingness is related to other variables in your dataset, but not to the missing variable itself.

Example: Older customers are less likely to report their income. Income is missing, but the pattern of missingness is explained by Age (which you do have).

Implication: You need to be careful. If you delete these rows, you'll underrepresent older customers. Better to impute using other variables.

**MNAR — Missing Not At Random.**
The most dangerous type. The missingness is directly related to the missing value itself.

Example: High earners refuse to report their income because they don't want to reveal it. Low earners also refuse because they're embarrassed. The income is missing because of the income itself.

Implication: No statistical trick fixes this cleanly. You need to either collect the data differently or acknowledge the limitation in your analysis.

**What to do about missing data:**
1. Identify the type (MCAR/MAR/MNAR)
2. Assess the extent (if <5% missing, deletion is usually safe; if >30%, you have a collection problem)
3. Options: Delete rows, impute with mean/median/mode, impute using other variables, flag as 'Unknown' category

**Common mistake:** Always replacing missing numbers with zero. A missing salary is not the same as a zero salary. Zero is a value. Blank means 'we don't know.'"

---

### SECTION 3: PRACTICAL CLEANING TECHNIQUES (25 minutes)

"Let me walk you through the most common cleaning operations and how to do them.

**Removing duplicates:**
In Excel: Data tab → Remove Duplicates. Select the columns that define uniqueness.
Critical question before removing: What makes a row unique? Customer ID? Transaction ID? Date + Customer ID?
Never remove duplicates blindly. You might delete legitimate data.

**Standardising text:**
Phone numbers in Nigeria are a mess in datasets. You'll find:
- 08012345678
- +2348012345678
- 8012345678
- 080-1234-5678
- 80 1234 5678

Excel formula to standardise:
```excel
=IF(LEN(A2)=10,"0"&A2, IF(LEFT(A2,4)="+234","0"&MID(A2,4,10),A2))
```
This adds '0' if 10 digits, strips '+234' if international format.

**Finding and fixing outliers:**
Two methods:

Method 1 — Z-score: Calculates how many standard deviations from the mean.
```excel
=(A2-AVERAGE($A$2:$A$1000))/STDEV($A$2:$A$1000)
```
Values above 3 or below -3 are statistical outliers.

Method 2 — IQR method:
Q1 = 25th percentile, Q3 = 75th percentile, IQR = Q3 - Q1
Lower fence = Q1 - (1.5 × IQR)
Upper fence = Q3 + (1.5 × IQR)
Anything outside the fences is an outlier.

Important: Outliers are not always errors. A ₦50M transaction in a dataset of ₦10,000–₦500,000 transactions might be real — a corporate payment. Investigate before deleting.

**Date standardisation:**
Excel stores dates as serial numbers. '01/03/2024' could mean January 3 or March 1 depending on regional settings. Always establish your date convention with your team before you start.

**Data validation (preventing future problems):**
In Excel: Select a column → Data → Data Validation → Set rules.
Example: For an 'Age' column, set 'Whole number between 18 and 100.' Anyone entering 150 gets blocked."

---

# MODULE 4: EXCEL FUNDAMENTALS
## Full Teaching Script

---

### OPENING (10 minutes)

"Show of hands — who has used Excel before?"

**[Most hands will go up.]**

"Good. Now keep your hand up if you've used a VLOOKUP."

**[Some hands stay up.]**

"Keep your hand up if you've used INDEX-MATCH."

**[Fewer hands.]**

"Keep your hand up if you've used Power Query."

**[Very few hands.]**

"This is normal. There are levels to Excel. Most people are at level 2. After today, you'll be at level 4. Professional analysts work at level 6. By the end of this course, you'll be at level 6 too.

Excel is not just a spreadsheet. It is an entire analytics environment. Let's treat it that way."

---

### SECTION 1: CORE FORMULA THINKING (15 minutes)

"Before we get into specific formulas, I want to teach you how to think about Excel formulas.

Every formula in Excel does one of four things:
1. **Calculates** — performs math on numbers
2. **Looks up** — finds data from another location
3. **Tests** — checks if a condition is true
4. **Transforms** — changes the format or shape of data

When someone says 'I need a formula to...' — first identify which category the problem falls into. That narrows down which functions to use.

Also: **formula composition.** Excel's real power is combining functions. Not =SUM(). But =SUMIFS(INDIRECT(A1),...). Not =IF(). But =IF(IFERROR(VLOOKUP(...),'N/A'),'Found','Not found'). Composition is the skill."

---

### SECTION 2: LOGICAL FUNCTIONS (20 minutes)

"**IF:** Makes decisions.
```excel
=IF(logical_test, value_if_true, value_if_false)
```

Example: Grade students:
```excel
=IF(B2>=75,'Pass','Fail')
```

Nested IF — multiple conditions:
```excel
=IF(B2>=85,'Distinction',IF(B2>=75,'Pass',IF(B2>=50,'Referred','Fail')))
```

Limit nested IFs to 3 levels. More than that — use IFS instead.

**IFS:** Cleaner multiple conditions:
```excel
=IFS(B2>=85,'Distinction',B2>=75,'Pass',B2>=50,'Referred',TRUE,'Fail')
```

Note the final TRUE — that's the 'else' clause.

**AND/OR with IF:**
```excel
=IF(AND(B2>100,C2='Active'),'Top Customer','Regular')
```
Only 'Top Customer' if both conditions are true.

```excel
=IF(OR(B2='Lagos',B2='Abuja'),'Priority Zone','Standard Zone')
```
Priority if EITHER condition is true.

**IFERROR:** Handle formula errors gracefully:
```excel
=IFERROR(VLOOKUP(A2,Prices,2,0),'Price not found')
```
Instead of showing #N/A, shows a friendly message."

---

### SECTION 3: LOOKUP FUNCTIONS — THE BIG THREE (25 minutes)

"This is the most important section of today's session. Lookup functions are used in virtually every professional Excel workbook.

**VLOOKUP — the classic:**
```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

Example: Find product price from a price table:
```excel
=VLOOKUP(A2, $E$2:$G$100, 2, FALSE)
```
- A2: What you're looking for (Product Code)
- $E$2:$G$100: The table to search in (absolute reference — crucial!)
- 2: Return the 2nd column (Price)
- FALSE: Exact match only

VLOOKUP limitations that will bite you:
1. Can only look RIGHT. The lookup column must be the leftmost column.
2. If you add a column to the middle of your table, the col_index_num breaks.
3. Can only return one column at a time.

**INDEX-MATCH — the professional choice:**
INDEX tells Excel: 'Go to this range, return the value at row X.'
MATCH tells Excel: 'Find this value in this range, tell me what row number it's in.'

Combined:
```excel
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
```

Example: Find price for a product code, where product codes are NOT in the first column:
```excel
=INDEX($G$2:$G$100, MATCH(A2, $E$2:$E$100, 0))
```

Why INDEX-MATCH is better:
- Works in any direction (left, right, up, down)
- Adding columns doesn't break it
- Faster on large datasets
- Can return from multiple columns easily

**XLOOKUP — the modern solution (Excel 365/2021+):**
```excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])
```

Example:
```excel
=XLOOKUP(A2, $E$2:$E$100, $G$2:$G$100, 'Not found')
```
- Simpler syntax
- Built-in error handling
- Works in any direction
- Returns multiple columns at once

My advice: Learn VLOOKUP (it's everywhere). Master INDEX-MATCH (it works everywhere). Use XLOOKUP when you can (it's the future).

**[Live demo: Open Excel, build a product lookup table with 20 rows, solve the same problem with all three formulas side by side.]**"

---

### SECTION 4: PIVOT TABLES (20 minutes)

"A pivot table is the most powerful feature in Excel for non-programmers. It can summarise thousands of rows in seconds.

**How to create one:**
1. Click anywhere in your data
2. Insert tab → PivotTable → New Worksheet
3. Drag fields into the four areas: Rows, Columns, Values, Filters

**The four areas explained:**
- **Rows:** What you want to break down by (Product, Region, Month)
- **Columns:** Cross-tabulation (optional — puts categories across the top)
- **Values:** What you're calculating (Sum of Sales, Count of Orders, Average of Revenue)
- **Filters:** What you can filter the entire pivot by (Year, Department)

**Example walkthrough:**
You have a sales dataset: Date, Product, Region, Salesperson, Quantity, Revenue.

Question 1: Total revenue by region → Drag Region to Rows, Revenue to Values.
Question 2: Monthly revenue trend → Drag Date to Rows (Excel auto-groups by month), Revenue to Values.
Question 3: Revenue by product by region → Drag Product to Rows, Region to Columns, Revenue to Values.

**Professional tip:** Pivot tables are not live — they don't update automatically. Right-click → Refresh to update after data changes. Better: put your data in an Excel Table first (Ctrl+T) so the pivot range auto-expands.

**Calculated fields in pivot tables:**
Right-click inside pivot → Fields, Items & Sets → Calculated Field.
Example: Profit Margin = Revenue / (Revenue + Cost)"

---

# MODULE 5: ADVANCED EXCEL
## Key Teaching Moments

---

### Opening Analogy: Excel as a Swiss Army Knife

"Most people use Excel like a kitchen knife. Cut here, chop there. After today, you're using the corkscrew, the scissors, the magnifying glass. Same tool — completely different level of utility."

---

### Teaching Moment: Dynamic Arrays

"Excel 365 introduced something that changed everything: dynamic arrays. One formula, multiple results, spilling automatically.

UNIQUE: `=UNIQUE(A2:A1000)` — returns every unique value from a column.
SORT: `=SORT(B2:B100, 1, -1)` — sorts data in descending order, live.
FILTER: `=FILTER(A2:C100, B2:B100='Lagos')` — returns all Lagos rows, live.

The 'spill' behaviour: these formulas don't stay in one cell. They fill down automatically. If the data changes, the result changes. This is what analysts were doing with complex VBA macros — now it's one formula."

---

### Teaching Moment: Power Query — The Game Changer

"Power Query is the single most important Excel skill nobody teaches. Here's why.

Data in the real world comes from multiple sources. Your sales are in one Excel file. Your customer list is in a database export. Your targets are in a Google Sheet someone downloaded as CSV.

Without Power Query, you'd be copy-pasting, using VLOOKUPs to merge, manually reformatting columns. Every month when you get new data, you do it again.

With Power Query: You set it up once. You connect to all sources, transform the data, merge the tables. Next month, you hit 'Refresh.' Everything updates. In minutes.

Think of Power Query as an automated data cleaning and combining pipeline that lives inside Excel.

**Key transformations students need to know:**
- Remove columns
- Rename columns
- Change data types (critical — numbers stored as text won't calculate)
- Split columns (e.g., 'First Last' → separate First and Last columns)
- Merge queries (like a SQL JOIN)
- Pivot/Unpivot columns
- Group By (like SQL GROUP BY)"

---

### Teaching Moment: What-If Analysis

"The most underused Excel feature for business decisions. Three tools.

**Goal Seek:** 'I want my profit to be ₦5M. What does my price need to be?'
Data tab → What-If Analysis → Goal Seek. Set cell (the formula), to value (₦5M), by changing cell (the price). Excel solves backwards.

**Scenario Manager:** Compare 3 different scenarios — pessimistic, realistic, optimistic. Each scenario has different assumptions. See all results side by side.

**Data Tables:** Vary one or two inputs and see all outputs in a table. Perfect for 'what if price changes from ₦100 to ₦200 in ₦10 increments?'"

---

# MODULE 6: SQL FOUNDATIONS
## Full Teaching Script

---

### OPENING HOOK (10 minutes)

"I want you to forget Excel for the next two modules.

Excel is a desktop tool. It holds thousands of rows. A professional database holds millions — sometimes billions — of rows. No Excel file can handle that.

SQL — Structured Query Language — is how you talk to databases. It's the language of data. And it's the most in-demand data skill on every data analyst job listing I've seen in Nigeria.

Here's the beautiful thing about SQL: it reads like English. It's the most approachable programming-adjacent skill there is. By the end of today, you'll be writing real queries."

---

### SECTION 1: HOW DATABASES WORK (15 minutes)

"A database is an organised collection of data stored in tables. A table is like an Excel spreadsheet — rows and columns. But better.

**Why databases instead of Excel?**
- Can store millions of rows without slowing down
- Multiple people can query simultaneously
- Data integrity rules (you can't accidentally type 'banana' into a phone number field)
- Role-based access (the customer service team sees customer data; the finance team sees financial data; they don't see each other's)
- Transactions: if something fails mid-process, the database rolls back to the previous state (this is why your OPay transfer either goes through completely or not at all — never halfway)

**Database types:**
- **Relational (SQL):** Data in structured tables with relationships. MySQL, PostgreSQL, Microsoft SQL Server, SQLite.
- **Non-relational (NoSQL):** Flexible structures for unstructured data. MongoDB (documents), Redis (key-value), Cassandra (wide-column). Big tech companies use these for high-volume, flexible data.

As a data analyst, you mainly work with relational/SQL databases."

---

### SECTION 2: SELECT — YOUR FIRST QUERY (20 minutes)

"The most important SQL keyword is SELECT. It retrieves data.

Basic structure:
```sql
SELECT column1, column2
FROM table_name;
```

Get everything:
```sql
SELECT *
FROM customers;
```

The asterisk (*) means 'all columns.' You'll use this to explore, but in production queries, always name your columns explicitly. Pulling unnecessary columns wastes resources.

**Column aliases — rename in output:**
```sql
SELECT 
    customer_name AS 'Full Name',
    phone_number AS 'Contact'
FROM customers;
```

**DISTINCT — unique values only:**
```sql
SELECT DISTINCT state
FROM customers;
```
Shows each state once, not thousands of times.

**WHERE — filter rows:**
```sql
SELECT customer_name, state, account_balance
FROM customers
WHERE state = 'Lagos';
```

Multiple conditions:
```sql
WHERE state = 'Lagos' AND account_balance > 100000
WHERE state = 'Lagos' OR state = 'Abuja'
WHERE account_balance BETWEEN 50000 AND 500000
WHERE customer_name LIKE 'Chi%'  -- names starting with 'Chi'
WHERE state IN ('Lagos', 'Abuja', 'Kano')
WHERE last_login IS NULL  -- customers who have never logged in
```

**ORDER BY — sort results:**
```sql
SELECT customer_name, account_balance
FROM customers
ORDER BY account_balance DESC;  -- highest to lowest
```

**LIMIT — top N rows:**
```sql
SELECT customer_name, account_balance
FROM customers
ORDER BY account_balance DESC
LIMIT 10;  -- top 10 customers by balance
```

**[Live demo with a sample Nigerian bank customer dataset. Ask students: 'Show me all customers from Rivers State with a balance above ₦1M, sorted by name.']**"

---

### SECTION 3: AGGREGATE FUNCTIONS & GROUP BY (25 minutes)

"SQL becomes powerful when you aggregate — calculate summaries across groups.

**The five core aggregate functions:**
```sql
COUNT(column)    -- count rows
SUM(column)      -- total
AVG(column)      -- average
MIN(column)      -- smallest value
MAX(column)      -- largest value
```

Example — total customers and average balance:
```sql
SELECT 
    COUNT(*) AS total_customers,
    AVG(account_balance) AS avg_balance,
    SUM(account_balance) AS total_deposits,
    MAX(account_balance) AS largest_account,
    MIN(account_balance) AS smallest_account
FROM customers;
```

**GROUP BY — aggregate per category:**
```sql
SELECT 
    state,
    COUNT(*) AS customer_count,
    SUM(account_balance) AS total_balance
FROM customers
GROUP BY state
ORDER BY total_balance DESC;
```
This gives you: Lagos: 45,000 customers, ₦8.2B total balance. Abuja: 23,000 customers, ₦6.1B total balance. Etc.

**HAVING — filter on aggregated results:**
WHERE filters individual rows. HAVING filters groups.
```sql
SELECT 
    state,
    COUNT(*) AS customer_count
FROM customers
GROUP BY state
HAVING COUNT(*) > 1000;  -- only states with more than 1000 customers
```

Golden rule: WHERE before GROUP BY. HAVING after GROUP BY."

---

### SECTION 4: CASE STATEMENTS (15 minutes)

"CASE is SQL's version of IF-ELSE. It creates a new column based on conditions.

```sql
SELECT 
    customer_name,
    account_balance,
    CASE 
        WHEN account_balance >= 5000000 THEN 'Premium'
        WHEN account_balance >= 500000 THEN 'Gold'
        WHEN account_balance >= 50000 THEN 'Silver'
        ELSE 'Basic'
    END AS customer_tier
FROM customers;
```

Combine with GROUP BY:
```sql
SELECT 
    CASE 
        WHEN account_balance >= 5000000 THEN 'Premium'
        WHEN account_balance >= 500000 THEN 'Gold'
        WHEN account_balance >= 50000 THEN 'Silver'
        ELSE 'Basic'
    END AS customer_tier,
    COUNT(*) AS customer_count,
    SUM(account_balance) AS tier_total_balance
FROM customers
GROUP BY customer_tier;
```

This is RFM-style segmentation — before we even get to formal RFM analysis."

---

# MODULE 7: ADVANCED SQL
## Key Teaching Moments

---

### Opening: Why Joins Matter

"So far you've been querying one table. But real databases have dozens of tables that connect to each other.

A customer table has customer information. A transactions table has transaction records. The transactions table has a customer_id column that links to the customer table. To get 'customer name + all their transactions,' you need to JOIN the tables.

Joins are the most important advanced SQL concept. And they're also where most beginners get confused. Let me make it crystal clear."

---

### Teaching Moment: The Four Joins — Visualised

"Think of two circles in a Venn diagram. Left circle = Table A. Right circle = Table B. The middle overlap = records that exist in BOTH.

**INNER JOIN:** Only the overlap. Only customers who have at least one transaction.
```sql
SELECT c.customer_name, t.transaction_amount, t.transaction_date
FROM customers c
INNER JOIN transactions t ON c.customer_id = t.customer_id;
```

**LEFT JOIN:** All of left table + matching right. All customers, even those with zero transactions.
```sql
SELECT c.customer_name, t.transaction_amount
FROM customers c
LEFT JOIN transactions t ON c.customer_id = t.customer_id;
```
Customers with no transactions will have NULL in transaction_amount. This is how you find inactive customers.

**RIGHT JOIN:** All of right table + matching left. Rarely used. (Flip the tables and use LEFT JOIN instead for clarity.)

**FULL OUTER JOIN:** Everything from both tables.
```sql
SELECT c.customer_name, t.transaction_amount
FROM customers c
FULL OUTER JOIN transactions t ON c.customer_id = t.customer_id;
```

**Which to use?**
- COUNT rows and compare both tables first. Understand what's there.
- Use INNER JOIN when you need complete data only.
- Use LEFT JOIN when you want to include records even without a match (finding gaps).
- 80% of real-world joins are INNER or LEFT."

---

### Teaching Moment: CTEs — Write Clean SQL

"A CTE (Common Table Expression) is like a named subquery that you can reference multiple times. It makes complex queries readable.

Syntax:
```sql
WITH cte_name AS (
    SELECT ...
    FROM ...
    WHERE ...
)
SELECT * FROM cte_name;
```

Real example — RFM Customer Segmentation:
```sql
WITH rfm_base AS (
    SELECT 
        customer_id,
        MAX(transaction_date) AS last_transaction,
        COUNT(*) AS frequency,
        SUM(transaction_amount) AS monetary
    FROM transactions
    WHERE transaction_date >= DATEADD(year, -1, GETDATE())
    GROUP BY customer_id
),
rfm_scored AS (
    SELECT 
        customer_id,
        DATEDIFF(day, last_transaction, GETDATE()) AS recency_days,
        frequency,
        monetary,
        NTILE(5) OVER (ORDER BY last_transaction DESC) AS r_score,
        NTILE(5) OVER (ORDER BY frequency DESC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary DESC) AS m_score
    FROM rfm_base
)
SELECT 
    customer_id,
    r_score,
    f_score,
    m_score,
    (r_score + f_score + m_score) AS rfm_total,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 THEN 'Champion'
        WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customer'
        WHEN r_score >= 4 AND f_score <= 2 THEN 'New Customer'
        WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk'
        ELSE 'Needs Attention'
    END AS customer_segment
FROM rfm_scored;
```

Walk through this query slowly. It touches every concept: aggregation, date functions, window functions, CTEs, CASE. This is a real analyst query."

---

### Teaching Moment: Window Functions — Rank, Compare, Trend

"Window functions perform calculations across a set of rows related to the current row — without collapsing the result to one row like GROUP BY does.

**ROW_NUMBER:** Unique sequential number.
```sql
SELECT 
    customer_name,
    transaction_amount,
    ROW_NUMBER() OVER (PARTITION BY state ORDER BY transaction_amount DESC) AS rank_in_state
FROM transactions t
JOIN customers c ON t.customer_id = c.customer_id;
```
This ranks each customer's transaction within their state.

**LAG and LEAD — compare to previous/next row:**
```sql
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) AS month_over_month_change
FROM monthly_revenue;
```
This calculates month-over-month revenue change — critical for business analysis."

---

# MODULE 8: DATA VISUALISATION PRINCIPLES
## Full Teaching Script

---

### OPENING HOOK (10 minutes)

"I want to tell you about a tragic data story.

In 1986, the Space Shuttle Challenger exploded 73 seconds after launch. Seven astronauts died.

The night before the launch, engineers at Morton Thiokol had data showing that O-rings — the seals on the rocket boosters — failed at low temperatures. They had charts and tables. They argued against launching. It was cold that morning.

But their charts were poorly designed. The data was presented in a confusing table that buried the critical finding. NASA managers didn't see the pattern. They launched.

A proper visualisation — temperature on the X-axis, O-ring incidents on the Y-axis, with the next day's temperature marked — would have made the relationship obvious.

This is not an abstract skill. Visualisation saves lives. Visualisation closes deals. Visualisation gets you promoted.

Let's learn to do it right."

---

### SECTION 1: CHART SELECTION (20 minutes)

"The number one visualisation mistake: using the wrong chart type.

**Ask these two questions:**
1. What relationship am I showing? (Comparison? Trend? Distribution? Composition? Relationship?)
2. What data type do I have? (Categorical? Continuous? Time series?)

**The chart selection matrix:**

| If you want to show... | Use this chart |
|---|---|
| Ranking/comparison of categories | Bar chart (horizontal) |
| Trend over time | Line chart |
| Proportion of a whole | Pie chart (≤5 categories) or stacked bar |
| Distribution of values | Histogram or box plot |
| Relationship between two numeric variables | Scatter plot |
| Part-to-whole with hierarchy | Treemap |
| Geographic patterns | Map chart |
| Performance vs target | Bullet chart or gauge |

**Common Nigerian data examples:**
- 'Which state has the most customers?' → Bar chart (horizontal, Lagos first)
- 'How has monthly revenue changed over 12 months?' → Line chart
- 'What % of transactions are card vs transfer vs cash?' → Pie chart
- 'Distribution of customer account balances?' → Histogram
- 'Does transaction frequency correlate with account age?' → Scatter plot

**The pie chart debate:** Pie charts are often hated by data purists. They're bad when you have many categories (over 5). They're fine for showing 60%/40% or similar simple proportions. Don't ban them — just use them correctly."

---

### SECTION 2: PRE-ATTENTIVE ATTRIBUTES (15 minutes)

"Pre-attentive processing happens before conscious thought. Your brain notices certain visual properties in under 250 milliseconds — before you even decide to look.

These properties are:
- **Colour hue:** Different colours immediately separate groups
- **Colour intensity:** Darker means more
- **Size:** Bigger means more
- **Position:** Higher up usually means more
- **Shape:** Squares vs circles vs triangles for categorical data
- **Length:** Used in bars
- **Motion:** Movement draws the eye (use sparingly)

**How to use this:**
If you want viewers to immediately notice a particular data point — make it a different colour. The rest grey. The important one red.

Example: Bar chart showing sales by region. All bars grey. Lagos bar is red because it's your problem region. The eye goes there immediately.

Don't use colour to decorate. Use colour to direct attention."

---

### SECTION 3: TUFTE'S PRINCIPLES (15 minutes)

"Edward Tufte is the world's foremost expert on data visualisation. His core principle: maximise the data-to-ink ratio.

**Lie Factor:** A concept Tufte developed. If your chart visually implies a larger difference than the data actually shows, you are misleading your audience.

Example: Bar chart where Y-axis starts at ₦1M instead of 0. The bar for ₦1.1M looks 10× taller than ₦1.05M visually, but the actual difference is only 4.8%. This is a Lie Factor of about 2. Honest charts start at zero for bar charts.

**Chartjunk:** Any element in your chart that doesn't communicate data. 3D effects, gradients, decorative icons, heavy grid lines, shadows — all chartjunk. Delete it all.

**Small multiples:** Instead of one complex chart, create several small simple charts using the same scale. Your brain can compare them easily. This is how good dashboards work."

---

### SECTION 4: DATA STORYTELLING (20 minutes)

"Data storytelling is the highest-paid skill in analytics. A good data story:

1. **Setup:** The context. What's the business situation?
2. **Context:** What were we expecting? What's the baseline?
3. **Evidence:** What does the data show?
4. **So What:** What does this mean for the business?
5. **Action:** What should we do?

**Example — Nigerian telco:**

Setup: 'MTN's northern region churn rate increased 23% in Q3.'

Context: 'Our target is below 5% monthly churn. Industry average is 7%.'

Evidence: [Line chart showing churn rate by region over 12 months. Northern region crosses 10% in August, stays there.]

So What: 'If this rate continues, we lose ₦4.2B in annual recurring revenue from northern customers.'

Action: 'Recommend: (1) Retention campaign targeting northern subscribers due for contract renewal in Q4. (2) Network quality audit in Kano and Kaduna. (3) Price review vs. Airtel in the region.'

This is what executives want to see. Not a table. A story with a recommendation."

---

# MODULE 9: POWER BI PART I
## Key Teaching Moments

---

### Opening: From Excel to Power BI

"Excel is like a corner shop. It does everything. It's where you start.

Power BI is like a supermarket — purpose-built for analytics at scale, with live connections to data sources, interactive dashboards, and sharing across an entire organisation.

The good news: everything you learned in Excel transfers. Power Query in Power BI is the same Power Query. DAX in Power BI builds on Excel formula logic. You're already halfway there."

---

### Teaching Moment: The Star Schema — Think Like a Data Engineer

"The most important concept in data modelling for Power BI is the star schema. Get this right and everything else is easy.

A star schema has:
- **One fact table** in the center: the big table with all the measurements (sales amounts, transaction counts, quantities)
- **Multiple dimension tables** around it: lookup tables that provide context (who, what, where, when)

Example for a retail company:
```
         DimDate ──────────┐
                           │
DimProduct ───── FactSales ───── DimCustomer
                           │
                      DimStore
```

FactSales: transaction_id, date_key, product_key, customer_key, store_key, quantity, revenue
DimDate: date_key, date, month, quarter, year, is_weekend, is_holiday
DimProduct: product_key, product_name, category, brand, cost_price
DimCustomer: customer_key, name, state, tier, acquisition_date
DimStore: store_key, store_name, city, region

Why does this matter?
1. Faster queries — Power BI is optimised for star schema
2. Cleaner DAX formulas — relationships are simple
3. Easy to extend — add a new dimension table without rebuilding everything
4. Your manager will be impressed that you know what a star schema is"

---

### Teaching Moment: The Most Important Visuals and When to Use Each

"Power BI has 30+ built-in visual types. You need to master 8.

**Bar/Column Chart:** Comparison and ranking. Most-used visual.
**Line Chart:** Trends over time. Revenue trends, user growth.
**Card:** Single KPI number. 'Total Revenue: ₦4.2B'
**Table:** Detailed data, multiple columns, when users need to see individual rows.
**Matrix:** Cross-tabulation (like Excel pivot table). Product × Region × Revenue.
**Slicer:** Filter control. Users click to filter the whole page.
**Map:** Geographic distribution of data. Sales by state in Nigeria.
**KPI Visual:** Actual vs target. Shows if you're above or below goal.

**Design rule:** Every dashboard page should answer one question. Not twelve. One."

---

# MODULE 10: POWER BI PART II
## Key Teaching Moments

---

### Teaching Moment: Calculated Columns vs Measures — A Critical Distinction

"This is the most important Power BI concept that trips beginners.

**Calculated Column:**
- Computed row by row
- Stored in the table (takes memory)
- Available as a filter or axis
- Calculated at data refresh time

Use for: Classification (customer tier), derived categories, date parts if not already in your date table.

```dax
Customer Tier = 
SWITCH(TRUE(),
    Customers[Total Revenue] >= 5000000, "Premium",
    Customers[Total Revenue] >= 500000, "Gold",
    Customers[Total Revenue] >= 50000, "Silver",
    "Basic"
)
```

**Measure:**
- Computed based on the current filter context
- NOT stored in the table
- Changes dynamically based on what's selected on the dashboard
- Calculated at query time

Use for: Aggregations, percentages, KPIs, time comparisons — almost everything.

```dax
Total Revenue = SUM(FactSales[Revenue])
Active Customers = DISTINCTCOUNT(FactSales[customer_id])
Average Order Value = DIVIDE([Total Revenue], [Total Orders])
```

Rule of thumb: If it's a property of a row, use a calculated column. If it's a summary or aggregation, use a measure."

---

### Teaching Moment: CALCULATE — The Most Powerful DAX Function

"CALCULATE modifies the filter context of a calculation. That sentence means nothing until you see it.

```dax
Lagos Revenue = CALCULATE([Total Revenue], DimCustomer[state] = 'Lagos')
```

This calculates Total Revenue — but ONLY for customers in Lagos. No matter what state is selected in the slicer.

```dax
Premium Revenue = CALCULATE([Total Revenue], Customers[tier] = 'Premium')
```

Revenue share of Premium tier:
```dax
Premium Revenue % = DIVIDE(
    CALCULATE([Total Revenue], Customers[tier] = 'Premium'),
    [Total Revenue]
)
```

CALCULATE with ALL() — remove filters:
```dax
Revenue vs All States = 
DIVIDE(
    [Total Revenue],
    CALCULATE([Total Revenue], ALL(DimCustomer[state]))
)
```
This shows each state's % contribution to total regardless of any state filter selected."

---

### Teaching Moment: Time Intelligence — The Analyst's Superpower

"Time intelligence functions compare periods — this year vs last year, month to date, rolling 12 months. They require a proper date dimension table.

```dax
-- Year-to-date revenue
Revenue YTD = TOTALYTD([Total Revenue], DimDate[Date])

-- Same period last year
Revenue SPLY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))

-- Year-over-year growth %
YoY Growth % = DIVIDE([Total Revenue] - [Revenue SPLY], [Revenue SPLY])

-- Rolling 3-month average
Rolling 3M Revenue = 
CALCULATE(
    [Total Revenue],
    DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH)
)

-- Month-over-month change
MoM Change = [Total Revenue] - CALCULATE([Total Revenue], DATEADD(DimDate[Date], -1, MONTH))
```

Why this matters: In every single business dashboard, stakeholders want to compare periods. 'Are we up or down vs last year?' SAMEPERIODLASTYEAR answers that in one function."

---

# MODULE 11: STATISTICS & PREDICTIVE ANALYTICS
## Key Teaching Moments

---

### Opening: Why Analysts Need Statistics

"You can build beautiful dashboards without statistics. But you'll always be describing what happened, not explaining why, or predicting what will happen.

Statistics is the language of certainty. It tells you: Is this difference real or just random noise? Should I trust this pattern or is it a coincidence? These are the questions that make you worth ₦1M/month instead of ₦200,000/month."

---

### Teaching Moment: Correlation is Not Causation — Nigerian Examples

"This is the most important statistical concept for data analysts.

**Example 1:** Ice cream sales and drowning incidents are correlated in Nigerian data. More ice cream is sold when more people drown.

Does ice cream cause drowning? No. Hot weather causes both — people buy ice cream when it's hot, and more people swim when it's hot.

**Example 2:** States with more universities have higher crime rates in some Nigerian datasets.

Does education cause crime? No. Both are caused by urbanisation — more people, more universities, more crime (in absolute numbers).

**The rule:** Correlation tells you two things move together. It says nothing about why. To establish causation, you need: (1) correlation, (2) time order (cause before effect), (3) elimination of alternative explanations.

For business analytics: you're usually looking for correlation + actionable insight. 'Customers who log in more than 5 times per month have 80% lower churn.' You don't need to prove causation to act on this."

---

### Teaching Moment: Hypothesis Testing — Simple Explanation

"A hypothesis test answers: 'Is this difference real, or could it have happened by chance?'

The setup:
- **Null hypothesis (H₀):** There is no effect/difference. Things are as expected.
- **Alternative hypothesis (H₁):** There is a real difference.

You collect data. You calculate a test statistic. The test tells you the probability (p-value) that you'd see this data if the null hypothesis were true.

**P-value interpretation:**
- p < 0.05: Less than 5% chance this is random. We reject H₀. The difference is statistically significant.
- p > 0.05: Could be random. We fail to reject H₀. Not enough evidence.

**Nigerian business example:**
You change the colour of your app's 'Pay Now' button from grey to green. Conversion rate increases from 3.2% to 3.8%.

H₀: The button colour has no effect. The difference is random.
H₁: Green button genuinely increases conversion.

You run a t-test. p = 0.02. Less than 0.05. You reject H₀. The green button really does convert better. Roll it out.

**Important caveat:** Statistical significance ≠ practical significance. A 0.1% improvement at p=0.01 is statistically significant but may not be worth implementing."

---

### Teaching Moment: Linear Regression — The Foundation of Prediction

"Regression finds the relationship between variables so you can predict.

The equation:
```
Revenue = β₀ + β₁(AdSpend) + β₂(SeasonalityIndex) + β₃(Promotions) + ε
```

Translation:
- β₀: Baseline revenue with zero advertising
- β₁: For every extra ₦1 spent on ads, revenue increases by β₁ naira
- β₂: The seasonal effect multiplier
- β₃: Revenue boost from promotions
- ε: Error term — what the model can't explain

You build this model in Excel (Data Analysis ToolPak → Regression) or Python (scikit-learn). The model gives you β values. Then you plug in new inputs to predict revenue.

**R² (R-squared):** How well the model fits. R² = 0.85 means the model explains 85% of the variation in revenue. The remaining 15% is unexplained by your variables.

Practical target: R² > 0.7 is generally good for business prediction.

**Warning about overfitting:** A model trained too specifically on historical data performs brilliantly on old data and terribly on new data. Always test your model on data it hasn't seen."

---

# MODULE 12: ANALYTICS IN PRACTICE
## Full Teaching Script

---

### OPENING (10 minutes)

"This is our final module. And I want to start with honesty.

Everything you've learned in this course — Excel, SQL, Power BI, statistics, visualisation — that's the technical part. Most courses stop there.

But technical skills alone don't make a great data analyst. The best analysts I know are equal parts analyst and communicator. They understand business context. They know how to talk to non-technical stakeholders. They know when to challenge a bad question. They know what they can't do.

Today is about everything after the analysis."

---

### SECTION 1: THE REALISTIC ANALYTICS WORKFLOW (20 minutes)

"Let me walk you through what a real analytics project looks like at a Nigerian company.

**Week 1: Alignment**
The business team says: 'We need analytics on our customer base.'
Your job: Ask questions until you understand exactly what decision they're trying to make.
- What decision are you making with this analysis?
- What does success look like?
- What's the timeline?
- What data do we have access to?
- Who are the stakeholders?

**Week 2: Data Access & Discovery**
You request data. The database admin says they'll get back to you. Three days pass. You follow up. You finally get access to a database with 47 tables and no documentation.
This is normal. You spend a week just understanding what data exists.

**Week 3: Data Cleaning**
Remember: 80% cleaning, 20% analysis. The customer table has 200,000 rows and 35% of phone numbers are in the wrong format. Some customer IDs appear in both the customer table and the transaction table but don't match.
You fix it. You document what you found and what you did.

**Week 4: Analysis**
The actual analytical work. You run the SQL queries. You build the Power BI dashboard. You run the statistics.
You find something unexpected: Customers who joined during a 2022 promotion campaign have 2× the churn rate of organic customers.
Is this important? Maybe. You flag it for the business.

**Week 5: Communication**
You prepare a presentation. The analyst before you would put 47 slides. You're going to put 12.
You present to the team. Three minutes in, the CFO interrupts with a question you weren't expecting. You handle it.

**Week 6: Action & Follow-up**
The business acts on your recommendation. Three months later, they ask for a follow-up analysis to see if it worked.

This is analytics."

---

### SECTION 2: STAKEHOLDER COMMUNICATION (20 minutes)

"The Pyramid Principle was developed by Barbara Minto at McKinsey. It's the gold standard for business communication.

**The structure:**
1. **Answer first.** Lead with your conclusion. Don't make them sit through 20 minutes of methodology before the insight.
2. **Group your arguments.** Support the conclusion with 3–4 key findings.
3. **Support each argument with data.** Each finding backed by evidence.

**Bad structure (most analysts):**
'We analysed the customer database. We found that Lagos has the most customers. We also looked at transaction frequency. Then we segmented by tier. And finally we looked at churn...' [15 minutes of setup before any insight]

**Good structure (Pyramid Principle):**
'Our churn problem is concentrated in one segment: customers acquired through promotional campaigns in 2022, who represent 15% of our base but 40% of monthly churn. Here's why and what to do about it: [then the evidence]'

Lead with the answer. Always."

---

### SECTION 3: DATA ETHICS & PROFESSIONAL RESPONSIBILITY (20 minutes)

"The final topic. And the most important one for the world you're entering.

**1. Algorithmic fairness.**
If a bank builds a model that predicts loan default risk, and the model uses neighbourhood of residence as a variable, and certain neighbourhoods are predominantly Igbo or Hausa — the model may discriminate based on ethnicity without any explicit ethnic variable. This is called proxy discrimination.

As an analyst, you must ask: what could this model be discriminating against that isn't visible in the data?

**2. Confirmation bias.**
The most dangerous thing in analytics. You start an analysis expecting to find X. You find data that supports X. You present X.

What you didn't do: look for evidence against X.

Real analysts prove themselves wrong before presenting findings. They look for alternative explanations. They try to falsify their hypothesis before confirming it.

**3. The story you choose to tell.**
Every dataset can tell multiple stories. The same revenue data can show 'record growth' or 'growth slowdown compared to target.' The story you choose to tell is an ethical choice.

Ask yourself: if my manager saw both framings, which would they want to see? Your job is to tell the complete, honest picture — not the one that makes the project look good.

**4. NDPA 2023 compliance — final reminder.**
Personal data you work with is protected by law. Your responsibilities:
- Only collect what is necessary (data minimisation)
- Only keep it as long as needed (retention limits)
- Keep it secure (encryption, access controls)
- Report breaches within 72 hours to the data subject and the NDPC

**The analyst's oath (unofficial, but live by it):**
'I will not let my analysis mislead. I will acknowledge what I don't know. I will protect the data I'm trusted with. I will recommend action, not just generate reports.'"

---

### COURSE CLOSE (15 minutes)

"You have now completed 12 modules of professional data analytics training. Let me tell you what you can do:

✅ Understand the analytics lifecycle from question to decision
✅ Collect and assess data quality with NDPA compliance
✅ Clean messy real-world data
✅ Build professional Excel workbooks with lookup formulas, pivot tables, and Power Query
✅ Write SQL queries from basic SELECT to complex window functions and CTEs
✅ Design data visualisations that communicate clearly
✅ Build interactive Power BI dashboards with DAX measures and time intelligence
✅ Apply basic statistics to validate findings
✅ Communicate insights using the Pyramid Principle
✅ Practice data ethics and NDPA 2023 compliance

This is a complete toolkit for an entry-level data analyst role.

The capstone project is what takes you from 'I learned things' to 'I can show you what I built.' Employers don't hire CVs. They hire portfolios.

Build something real. Document it carefully. Put it on GitHub or portfolio site. Share the Power BI link. That is what gets you the interview.

The MetaBridge blockchain certificate is your credential. The portfolio is your proof.

Go build."

---

# INSTRUCTOR FAQ — DATA ANALYTICS

**Q: A student says 'Can't AI just do all this now? Why learn SQL?'**

A: Great question. AI tools can write SQL — but they write SQL for problems you describe correctly. If you don't understand SQL, you can't describe the problem correctly. You can't tell if the SQL is right or wrong. You can't optimise it when it runs for 40 minutes. AI augments analytical skills. It doesn't replace them. And every job listing for Data Analyst still lists SQL as required.

**Q: A student says Excel is old and outdated. Should we be learning Python instead?**

A: Python is valuable and worth learning. But Excel and Power BI are what 90% of Nigerian companies actually use today. Python is the frontier. Excel/SQL/Power BI is the job market. We teach what gets you hired right now. You can learn Python alongside or after this course.

**Q: A student asks about data engineering vs data analytics — what's the difference?**

A: Data engineers build the pipes — they design and maintain the databases, data warehouses, and ETL pipelines that analysts use. Data analysts use what engineers build to answer business questions. Both are in demand. Data engineers earn more (20–40% premium) but require more programming (Python/Spark/Kafka). Start with analytics, then move to engineering if you want.

**Q: Can a student with no maths background do statistics?**

A: Yes. Modern statistics for business analysts doesn't require advanced mathematics. You need to understand what the test tells you and when to use it — not derive the formula from first principles. Excel and Power BI handle the calculation. The skill is interpretation and judgement.

**Q: Student asks about SQL vs NoSQL for a job application — which to say you know?**

A: Focus your job application language on SQL (relational). That's what analyst roles need. If you want to mention NoSQL, say you're familiar with the concept of document-based and key-value stores. Don't claim deep NoSQL expertise you don't have.

---

# PACING GUIDE — 12 MODULES

| Module | Title | Recommended Duration | Notes |
|--------|-------|---------------------|-------|
| 1 | Introduction to Analytics | 3 hours | Set expectations right |
| 2 | Data Collection & Sources | 3 hours | NDPA section critical |
| 3 | Data Cleaning | 4 hours | Give cleaning exercise |
| 4 | Excel Fundamentals | 4 hours | Live demo essential |
| 5 | Advanced Excel | 4 hours | Power Query must demo |
| 6 | SQL Foundations | 4 hours | Live database essential |
| 7 | Advanced SQL | 5 hours | Go slow on joins |
| 8 | Visualisation Principles | 3 hours | Show bad vs good |
| 9 | Power BI Part I | 4 hours | Install Power BI first |
| 10 | Power BI Part II | 4 hours | DAX takes time |
| 11 | Statistics | 4 hours | Focus on intuition |
| 12 | Analytics in Practice | 3 hours | Case study + discussion |

**Total contact hours: ~45 hours**
**Recommended schedule: 2 × 3-hour sessions per week = 8 weeks**

---

# COMMON STUDENT MISCONCEPTIONS TO PROACTIVELY ADDRESS

| Misconception | Correct Understanding |
|---|---|
| "Excel can't handle big data" | Excel handles up to 1M rows. For bigger, use Power BI with direct query, SQL Server, or Python. |
| "I need to memorise SQL syntax" | You don't. Every analyst has a query library and uses documentation. |
| "Statistics means I need to know calculus" | Business statistics is about interpretation, not derivation. |
| "Power BI is just charts" | Power BI is a full BI platform — data modelling, DAX, live connections, sharing. |
| "Cleaning is for junior analysts" | Senior analysts spend just as much time assessing data quality. It's always there. |
| "A beautiful chart is always better" | A clear chart is better than a beautiful chart. Simplicity over decoration. |
| "The model is always right" | Models are approximations. All models are wrong; some are useful. |
| "I need to know Python to be a data analyst" | Python helps. SQL + Excel + Power BI gets you hired. Add Python after. |

---

*MetaBridge Academy Data Analytics — Lesson Notes | For Instructor Use Only | metabridgeacademy.com*
*Textbook reference: Mastering Data Analytics — available at metabridgeacademy.com*
*All enrolment: https://wa.me/2347034357206*
