# MetaBridge Academy — Data Analytics
## Document 1: Curriculum (Part 1 — Modules 1–6)
### Course Duration: 12 Modules | Certification: MetaBridge Data Analytics Certificate

---

## COURSE OVERVIEW

**Course Title:** Data Analytics: From Raw Data to Business Intelligence
**Course Code:** MBA-DA-301
**Duration:** 12 weeks (2 sessions per week, 3 hours per session) | 72 contact hours
**Delivery:** Hybrid (in-person + online)
**Certification:** MetaBridge Data Analytics Certificate (Blockchain-Verified)
**Reference Textbook:** *Mastering Data Analytics* — MetaBridge Academy (available at metabridgeacademy.com)
**Prerequisite:** Basic computer literacy | Excel recommended
**Level:** Beginner to Advanced

---

## COURSE DESCRIPTION

In the age of digital transformation, data is the new oil — and the ability to extract insights from it is one of the most valuable professional skills in the modern economy. Nigeria generates millions of data points daily through mobile money transactions, NIBSS settlements, e-commerce activity, agricultural records, healthcare systems, and social media. Yet most organisations make decisions based on intuition rather than data.

This course transforms complete beginners into confident data practitioners — capable of gathering, cleaning, analysing, visualising, and presenting data-driven insights in professional contexts. Using real Nigerian datasets across agriculture, fintech, healthcare, e-commerce, and government, students move from Excel fundamentals through SQL databases to Power BI dashboards and statistical analysis.

---

## COURSE LEARNING OUTCOMES

Upon completing this course, students will be able to:

1. **Explain** the data analytics ecosystem — types of analytics, the data lifecycle, and career roles
2. **Collect and clean** data from multiple sources — handling missing values, duplicates, and formatting issues
3. **Perform** advanced Excel analysis — pivot tables, VLOOKUP, dynamic charts, statistical functions
4. **Write** SQL queries to extract, filter, group, join, and aggregate data from relational databases
5. **Build** interactive Power BI dashboards with DAX measures and multiple visualisation types
6. **Apply** statistical thinking — distributions, hypothesis testing, correlation, and regression
7. **Analyse** business contexts across finance, agriculture, healthcare, and e-commerce
8. **Communicate** data insights clearly — storytelling with data, presentation skills
9. **Manage** the end-to-end analytics workflow — from problem definition to actionable recommendations
10. **Apply** data ethics — privacy regulations (NDPA 2023), bias in data, responsible AI analytics

---

## MODULE STRUCTURE OVERVIEW

| Module | Title | Duration | Primary Tool |
|--------|-------|----------|-------------|
| 1 | Introduction to Data Analytics: The Data-Driven World | 6 hrs | Conceptual + exploration |
| 2 | Data Collection, Sources & the Data Lifecycle | 6 hrs | Google Sheets, web scraping concepts |
| 3 | Data Cleaning & Preparation | 6 hrs | Excel, Python (intro) |
| 4 | Excel for Data Analysis I — Foundations | 6 hrs | Microsoft Excel |
| 5 | Excel for Data Analysis II — Advanced Functions | 6 hrs | Microsoft Excel |
| 6 | Introduction to SQL & Database Queries | 6 hrs | MySQL / PostgreSQL / SQLiteOnline |
| 7 | Advanced SQL — Joins, Aggregations & Subqueries | 6 hrs | MySQL / PostgreSQL |
| 8 | Data Visualisation Principles | 6 hrs | Excel charts, Datawrapper, Flourish |
| 9 | Power BI I — Building Dashboards | 6 hrs | Microsoft Power BI Desktop |
| 10 | Power BI II — DAX, Measures & Advanced Analytics | 6 hrs | Microsoft Power BI Desktop |
| 11 | Statistical Analysis & Predictive Analytics | 6 hrs | Excel Stats, Python pandas/scipy |
| 12 | Analytics in Practice & Capstone Project | 6 hrs | Full stack |

---

## MODULE 1: INTRODUCTION TO DATA ANALYTICS — THE DATA-DRIVEN WORLD

### Module Learning Objectives
By the end of this module, students will be able to:
- Define data analytics and explain its role in modern organisations
- Distinguish between descriptive, diagnostic, predictive, and prescriptive analytics
- Describe the data analytics lifecycle from problem definition to communication
- Identify career pathways in data analytics globally and in Nigeria
- Recognise the Nigerian data ecosystem — key data sources, collectors, and consumers

### Core Concepts

**1.1 What Is Data Analytics?**

Data analytics is the science of examining raw data to draw meaningful conclusions, identify patterns, test hypotheses, and support decision-making.

Every day, across Nigeria:
- NIBSS processes 20+ million digital transactions
- MTN and Airtel collect 200+ million usage data points
- Konga and Jumia record millions of browsing and purchase events
- NCDC tracks health data from 36 states
- INEC manages voter registration databases of 96 million+

**Without analytics, this data is just noise. With analytics, it becomes competitive advantage.**

**1.2 The Four Types of Analytics**

| Type | Question Answered | Example |
|------|------------------|---------|
| **Descriptive** | What happened? | "Sales were ₦2.3 billion last quarter" |
| **Diagnostic** | Why did it happen? | "Sales dropped because delivery delays increased by 40%" |
| **Predictive** | What will happen? | "Based on trends, Q3 sales will be ₦2.8 billion" |
| **Prescriptive** | What should we do? | "Reduce delivery time by 20% by adding 3 distribution hubs" |

Most organisations in Nigeria currently operate at the Descriptive level. Moving up this maturity curve is where competitive advantage lies.

**1.3 The Data Analytics Lifecycle**

**Phase 1: Define the Question**
Before touching any data, establish: What decision needs to be made? What would success look like? Who needs this answer?

*Example:* "Why are customer churn rates increasing at our Lagos fintech?" — not "let's look at some data."

**Phase 2: Collect Data**
Identify sources. Internal: CRM, transactional database, ERP. External: market research, government datasets, surveys.

**Phase 3: Clean & Prepare**
Typically 60–80% of analyst time. Remove duplicates, handle missing values, standardise formats, validate data quality.

**Phase 4: Analyse**
Apply appropriate analytical methods — descriptive statistics, cohort analysis, trend analysis, regression, clustering.

**Phase 5: Visualise**
Present findings clearly — right chart type for right data, colour for insight not decoration, story before data.

**Phase 6: Communicate & Act**
Present to stakeholders. Recommendations must be actionable. Follow through to measure impact.

**1.4 Data Types**

**Structured Data:**
- Organised in rows and columns (spreadsheets, databases)
- Easily searchable and analysable
- Examples: transaction records, sensor readings, survey responses with fixed options

**Semi-Structured Data:**
- Has some organisation but not in a relational table
- JSON, XML files, emails with headers
- Examples: API responses, web scraping outputs, log files

**Unstructured Data:**
- No predefined format
- Requires specialised processing (NLP, computer vision)
- Examples: customer reviews, social media posts, images, audio, video

**Nigerian context:** Most Nigerian government datasets are unstructured PDFs — a significant barrier to data-driven governance. PDF-to-structured-data conversion is a growth area.

**1.5 Quantitative vs Qualitative Data**

**Quantitative:** Numerical measurements (sales, temperature, age, number of transactions)
- Discrete: Whole numbers only (number of customers, number of orders)
- Continuous: Any value in a range (revenue, weight, time)

**Qualitative:** Non-numerical categories (gender, product category, state of origin, yes/no)
- Nominal: No natural order (states, product types)
- Ordinal: Natural order (strongly disagree → strongly agree, small/medium/large)

**1.6 Data Analytics Roles & Careers in Nigeria**

| Role | Description | Tools | Avg Nigeria Salary |
|------|-------------|-------|-------------------|
| **Data Analyst** | Queries, cleans, visualises, reports | Excel, SQL, Power BI, Tableau | ₦200K–₦600K/month |
| **Business Analyst** | Translates business needs to data questions | Excel, PowerPoint, SQL | ₦250K–₦700K/month |
| **Data Engineer** | Builds data pipelines and infrastructure | Python, SQL, cloud platforms | ₦400K–₦1.2M/month |
| **Data Scientist** | Statistical modelling, ML, predictions | Python, R, statistics | ₦500K–₦1.5M/month |
| **BI Developer** | Builds dashboards and reporting systems | Power BI, Tableau, SQL | ₦300K–₦800K/month |

**Growing Nigerian employers:** GTBank, Access Bank, Flutterwave, Interswitch, Konga, MTN, Airtel, FIRS, IPPIS, Andela, numerous consultancies

**Global remote work:** Data analysts are in high demand globally with remote-first roles accessible from Nigeria. Rates on Toptal, Andela, and Turing can reach $3,000–$8,000/month.

**1.7 The Nigerian Data Ecosystem**

**Key data producers:**
- **CBN:** Banking system data, credit registries, FX rates
- **NBS (National Bureau of Statistics):** GDP, inflation, poverty surveys, agricultural data
- **NIBSS:** Payment system data, BVN, financial inclusion metrics
- **INEC:** Voter registration, election results
- **NCDC:** Disease surveillance, COVID data
- **CAC:** Company registration data
- **FIRS:** Tax data (largely internal)
- **States:** IGR data, land records (variable quality)

**Key data consumers and analysts:**
- Commercial banks (fraud detection, credit scoring)
- Fintechs (risk models, product analytics)
- Telecoms (network optimisation, churn prediction)
- E-commerce (pricing, recommendation engines)
- Government agencies (policy design, monitoring)
- NGOs (development programme evaluation)
- Consultancies (strategy, market sizing)

### Labs — Module 1

**Lab 1.1: Data in the Wild**
- Tool: NBS website (nigerianstat.gov.ng), World Bank Open Data
- Task: Find 3 publicly available Nigerian datasets. For each: what data is collected, who collected it, when was it last updated, and what questions could you answer with it?
- Deliverable: Dataset registry with 3 entries

**Lab 1.2: Data Type Classification**
- Tool: Excel
- Task: Instructor provides a sample Nigerian fintech dataset (customer demographics + transaction records). Students classify every column by: data type (structured/unstructured), measurement type (nominal/ordinal/discrete/continuous), and whether it is a dimension or measure.
- Deliverable: Completed data classification worksheet

**Lab 1.3: Analytics Type Identification**
- Tool: Case study document
- Task: Instructor provides 10 business scenarios from Nigerian companies. Students identify the type of analytics needed (descriptive/diagnostic/predictive/prescriptive) and explain the data required.
- Deliverable: Completed analytics classification exercise

### Assignments — Module 1

1. **Research Essay (400 words):** "Data is the new oil" — is this analogy accurate for Nigeria? What are the similarities and differences between oil and data as resources?
2. **Career Planning:** Research one specific data analytics role at a specific Nigerian company (LinkedIn, job boards). Document: job title, company, required skills, education requirements, salary, and what metrics/KPIs the role would likely track.
3. **Dataset Discovery:** Download one dataset from NBS or the World Bank for Nigeria. Describe: what it measures, how many rows/columns, data quality issues visible, and one insight you can see immediately.
4. **Case Study (350 words):** How does Flutterwave use data analytics in its operations? Research their fraud detection, customer analytics, and product development approach.
5. **Critical Thinking (300 words):** A health ministry official says "we don't need data — we know what our patients need." What is wrong with this approach? Provide one example where data changed a healthcare policy decision globally.

---

## MODULE 2: DATA COLLECTION, SOURCES & THE DATA LIFECYCLE

### Module Learning Objectives
By the end of this module, students will be able to:
- Identify primary and secondary data sources relevant to Nigerian business contexts
- Design a basic survey instrument for data collection
- Explain API data collection and understand JSON response structure
- Perform basic web scraping concepts (tools and ethics)
- Evaluate data quality using key quality dimensions
- Understand data governance, ownership, and the NDPA 2023 requirements

### Core Concepts

**2.1 Primary vs Secondary Data**

**Primary Data:** Collected first-hand by the analyst for a specific purpose
- Surveys (Google Forms, SurveyMonkey, physical forms)
- Interviews and focus groups
- Observations and experiments
- Transaction log collection
- Sensor data

**Secondary Data:** Existing data collected for another purpose
- Government statistics (NBS, CBN, NIBSS)
- Commercial databases (Statista, Bloomberg)
- Academic research
- Public social media data
- Industry reports

**Trade-offs:**
| | Primary | Secondary |
|--|---------|---------|
| Cost | High | Low/free |
| Time | Slow | Immediate |
| Specificity | Exact fit | May not fit perfectly |
| Accuracy control | Full control | Must trust source |
| Freshness | Current | May be outdated |

**2.2 Survey Design Principles**

Good surveys are deceptively difficult to design. Common mistakes:

1. **Leading questions:** "Don't you agree that our service is excellent?" → "How would you rate our service?" (1–5 scale)
2. **Double-barreled:** "Is the food good and delivered on time?" → Split into two questions
3. **Ambiguous scale:** "Often, sometimes, rarely" — different people interpret these differently
4. **Order effects:** Early questions influence how later questions are answered
5. **Social desirability bias:** People answer how they think they should, not how they actually feel

**Nigerian survey considerations:**
- Language choice: English, Pidgin, Yoruba, Igbo, Hausa based on target population
- Mobile-first design (most respondents on phones)
- Short forms (attention fatigue in low-income populations)
- Incentives for completion

**2.3 APIs and JSON Data**

An API (Application Programming Interface) allows programmatic access to a platform's data.

**JSON Structure:**
```json
{
  "name": "Lagos",
  "population": 15400000,
  "coordinates": {
    "latitude": 6.5244,
    "longitude": 3.3792
  },
  "districts": ["Ikeja", "Victoria Island", "Lekki", "Surulere"],
  "gdp_usd_billions": 136
}
```

**Key API concepts:**
- **Endpoint:** The URL where the data lives
- **Request:** GET (retrieve) or POST (submit) requests
- **Authentication:** API keys to identify and rate-limit users
- **Response:** JSON or XML data returned

**Public APIs useful for Nigerian data:**
- World Bank API: GDP, population, development indicators
- CBN API: FX rates, monetary policy data
- openAFRICA: African datasets aggregator
- NCDC API: Disease surveillance data

**2.4 Web Scraping — Concepts and Ethics**

Web scraping is programmatic extraction of data from websites.

**Tools:**
- Python: BeautifulSoup, Scrapy
- Browser extensions: Web Scraper, Data Miner
- No-code: Import.io, Octoparse

**Ethical and legal considerations:**
- Check robots.txt (website's scraping rules)
- Don't overwhelm servers with too many requests
- Respect terms of service
- GDPR/NDPA implications for personal data
- Scraped data should not be republished without permission

**When to scrape vs use API:**
- API available → always use API (structured, stable, intended)
- No API → scraping may be necessary (check legality first)

**2.5 Data Quality Dimensions**

The acronym **FACT+CVR** covers the key dimensions:

| Dimension | Definition | Nigerian Example |
|-----------|------------|-----------------|
| **Freshness** | Is data current? | NBS data 2 years old vs today's reality |
| **Accuracy** | Is it correct? | Self-reported income in surveys often inflated |
| **Completeness** | Are all values present? | 40% missing gender in health records |
| **Timeliness** | Available when needed? | Budget data published 6 months late |
| **Consistency** | Same format across sources? | State names: "FCT", "Abuja", "Federal Capital Territory" |
| **Validity** | Within expected range? | Age = 200 years → data entry error |
| **Reliability** | Repeatable measurement? | Different surveyors measuring same household income differently |

**2.6 Data Governance and NDPA 2023**

The Nigeria Data Protection Act 2023 governs how personal data must be handled:

**Key requirements for data analysts:**
1. **Lawful basis:** Data must be collected with legitimate purpose and legal basis
2. **Consent:** Users must consent to data collection for specified purposes
3. **Minimisation:** Only collect data needed for the stated purpose
4. **Accuracy:** Maintain accurate data; correct errors promptly
5. **Storage limitation:** Don't retain data longer than necessary
6. **Security:** Appropriate technical and organisational security measures
7. **DPO requirement:** Organisations processing large volumes of personal data need a Data Protection Officer

**Practitioner implication:** Always ask "do we need this data?" before collecting. Anonymise or pseudonymise where possible. Delete when no longer needed.

### Labs — Module 2

**Lab 2.1: Survey Design**
- Tool: Google Forms
- Task: Design a 15-question customer satisfaction survey for a hypothetical Nigerian ride-hailing app. Include: Likert scales, multiple choice, open-ended questions. Identify potential bias in each question.
- Deliverable: Complete Google Form with bias audit notes

**Lab 2.2: API Data Collection**
- Tool: World Bank API, browser or Postman
- Task: Retrieve Nigeria's GDP data from the World Bank API (api.worldbank.org). Retrieve: GDP for the last 20 years. Save the JSON response. Identify the structure: which fields are relevant? Which are metadata?
- Deliverable: JSON response saved + annotated explanation of structure

**Lab 2.3: Data Quality Audit**
- Tool: Excel
- Task: Instructor provides a "dirty" Nigerian health dataset with intentional quality issues. Identify at least 8 specific quality problems across 4+ quality dimensions. Document each issue and proposed fix.
- Deliverable: Data quality audit report

### Assignments — Module 2

1. **Survey Critique (300 words):** Find a real survey used in a Nigerian context (government, corporate, academic). Identify 3 design flaws and propose improved questions.
2. **NDPA Compliance Audit:** A Nigerian e-commerce company collects: full name, age, address, payment details, browsing history, purchase history, phone contacts (for referrals), and social media data. Assess each data type against NDPA 2023 requirements. Which is compliant? Which requires specific actions?
3. **Data Source Mapping:** For a Nigerian agricultural lending startup, map all potential data sources for a farmer credit scoring model (primary and secondary, internal and external).
4. **API Exploration:** Use the World Bank API to retrieve and compare GDP growth rates for Nigeria, Kenya, Ghana, and South Africa for 2015–2024. Identify the country with the most consistent growth trajectory.
5. **Data Governance Policy:** Draft a one-page data governance policy for a Nigerian secondary school that wants to digitise student records.

---

## MODULE 3: DATA CLEANING & PREPARATION

### Module Learning Objectives
By the end of this module, students will be able to:
- Identify and handle missing data using appropriate strategies
- Remove and prevent duplicate records
- Standardise data formats (dates, currencies, text)
- Handle outliers appropriately based on context
- Perform data type conversions and validation
- Document data cleaning decisions for reproducibility

### Core Concepts

**3.1 Why Data Cleaning Matters**

"Garbage in, garbage out" — the most sophisticated analysis on dirty data produces misleading results.

Industry estimate: **data scientists and analysts spend 60–80% of their time cleaning data**, not analysing it.

In Nigerian data contexts, common cleaning challenges:
- Names in ALLCAPS, Title Case, and lowercase mixed
- Phone numbers in multiple formats: 080, +2348, 2348, 08012345678
- Dates: DD/MM/YYYY, MM/DD/YYYY, "January 5, 2024", "5-Jan-24" all in one column
- Currency: ₦, NGN, N, "Naira" mixed; commas as thousand separators
- State names: "Lagos", "lagos state", "Lagos State", "LG", "LAGOS"
- Missing values: blank cells, "N/A", "NULL", "0", "-", "unknown" all meaning "no data"

**3.2 Types of Missing Data**

Understanding WHY data is missing determines how to handle it:

**Missing Completely at Random (MCAR):**
No relationship between missingness and other variables. Safe to remove rows or impute.
*Example:* 5% of surveys randomly lost due to technical glitches.

**Missing at Random (MAR):**
Missingness relates to observed (but not missing) variables.
*Example:* Lower income respondents less likely to report exact income — but income CATEGORY is available.
*Strategy:* Impute using related variables.

**Missing Not at Random (MNAR):**
Missingness relates to the missing value itself.
*Example:* Respondents who earn very high incomes refuse to report income at all.
*Strategy:* Acknowledge bias; consider weighting; cannot fully correct.

**3.3 Strategies for Handling Missing Values**

| Strategy | When to Use | Risk |
|----------|------------|------|
| **Delete rows** | MCAR; small % missing (<5%) | Lose valid data from other columns |
| **Delete column** | Very high missingness (>70%) | Lose potentially useful variable |
| **Mean/median imputation** | Numerical; MCAR/MAR; low % missing | Reduces variance; distorts distribution |
| **Mode imputation** | Categorical; low % missing | May over-represent one category |
| **Predictive imputation** | MAR; important variable | Complex; risk of over-fitting |
| **Indicator variable** | MNAR; preserve missingness signal | Adds column complexity |

**3.4 Handling Duplicates**

**Types of duplicates:**
- **Exact duplicates:** Identical rows — all fields identical
- **Fuzzy duplicates:** Same entity with slight variations ("Ade Bello" vs "Adebello" vs "Mr. A. Bello")
- **Transactional duplicates:** Same transaction recorded twice (database error, form re-submission)

**Excel tools:**
- `Remove Duplicates` function (Data tab)
- `COUNTIF` to identify duplicates before removing
- `EXACT()` for case-sensitive matching

**Decision rule:** Before removing duplicates, ALWAYS investigate. Sometimes "duplicates" are legitimate repeat transactions.

**3.5 Data Standardisation**

**Date standardisation:**
- Convert all dates to ISO format: YYYY-MM-DD
- Excel: `DATEVALUE()`, `TEXT()` functions
- Extract components: `YEAR()`, `MONTH()`, `DAY()`

**Phone number standardisation (Nigerian context):**
```
Target format: 2348XXXXXXXXX (international)
08XXXXXXXXX → 2348XXXXXXXXX (add 234, remove leading 0)
+2348XXXXXXXXX → 2348XXXXXXXXX (remove +)
2348XXXXXXXXX → 2348XXXXXXXXX (already correct)
```
Excel formula: `=IF(LEFT(A2,3)="234",A2,IF(LEFT(A2,2)="08","234"&MID(A2,2,10),A2))`

**Text normalisation:**
- `UPPER()`, `LOWER()`, `PROPER()` for case standardisation
- `TRIM()` to remove leading/trailing spaces
- `SUBSTITUTE()` to replace characters
- `LEN()` to validate expected length (phone: 13 digits, BVN: 11 digits)

**3.6 Outlier Detection and Treatment**

An outlier is a data point significantly different from the rest.

**Detection methods:**
- **Z-score:** Values >3 or <-3 standard deviations from mean
- **IQR method:** Values outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR]
- **Visual:** Box plots, scatter plots

**CRITICAL DECISION — Outlier Treatment:**

| If outlier is... | Treatment |
|-----------------|-----------|
| Data entry error | Correct or remove |
| Legitimate extreme value | Keep — it's real |
| Legitimate but distorting analysis | Keep for raw data; note in analysis |
| Represents a different population | Separate analysis segment |

**Never automatically remove outliers without investigation.** A ₦500 million single transaction might look like an outlier in transaction data — but it could be a legitimate large corporate payment.

**3.7 Data Validation Rules**

Prevent bad data from entering your dataset with validation rules:

- **Range checks:** Age between 0–120, temperature between -50°C and +60°C
- **Referential integrity:** Customer ID must exist in customer master table
- **Pattern checks:** Nigerian phone numbers must be 11 digits starting with 070/080/081/090/091
- **Logical consistency:** Date of death cannot be before date of birth

**Excel data validation:** Data tab → Data Validation → set rules before data entry

### Labs — Module 3

**Lab 3.1: Complete Data Cleaning Exercise**
- Tool: Excel
- Dataset: Instructor-provided "Nigerian Customer Database" with 500 rows and 15 quality issues including: mixed date formats, duplicate records, missing values, phone number inconsistencies, state name variations, outlier transaction amounts
- Task: Clean the entire dataset, documenting every change made in a cleaning log
- Deliverable: Cleaned dataset + cleaning log with 15+ documented changes

**Lab 3.2: Outlier Analysis**
- Tool: Excel
- Task: Given Nigerian bank transaction data for 1,000 customers: calculate Z-scores for transaction amounts, identify outliers using IQR method, plot a box plot, investigate the 5 highest outliers to determine if they should be removed or kept
- Deliverable: Outlier analysis report with keep/remove decisions justified

**Lab 3.3: Phone Number Standardisation**
- Tool: Excel formulas
- Task: Dataset of 200 Nigerian phone numbers in mixed formats. Write an Excel formula to standardise all to the 2348XXXXXXXXX format. Validate that 95%+ of results are valid Nigerian numbers.
- Deliverable: Cleaned phone number column + formula documentation

### Assignments — Module 3

1. **Cleaning Policy Document:** A Nigerian bank is hiring data analysts. Write a one-page "Data Cleaning Policy" covering: how to handle missing values by type, duplicate handling rules, when to flag vs fix outliers, and documentation requirements.
2. **Missing Data Analysis (350 words):** You're analysing a Nigerian household survey where 30% of respondents didn't answer the income question. Is this MCAR, MAR, or MNAR? What does this mean for your analysis? What would you do?
3. **Data Quality Impact:** Find a real example (globally or in Nigeria) where poor data quality led to a significant business, government, or health error. What was the cost? What data quality dimension failed?
4. **Standardisation Exercise:** Instructor provides 100 business names from CAC (Corporate Affairs Commission) with spelling variations. Use Excel to standardise them for matching (e.g., "GTBank", "Guaranty Trust Bank", "GT Bank", "GTB" → one standard form).
5. **NDPA Cleaning Implication:** A data cleaning exercise reveals your dataset contains home addresses, phone numbers, and BVN numbers of customers. Under NDPA 2023, what are your obligations regarding the processing and retention of this cleaned data?

---

## MODULE 4: EXCEL FOR DATA ANALYSIS I — FOUNDATIONS

### Module Learning Objectives
By the end of this module, students will be able to:
- Navigate Excel efficiently using keyboard shortcuts
- Use essential text, lookup, and logical functions
- Build dynamic named ranges and structured tables
- Create and customise pivot tables for multi-dimensional analysis
- Design clear, publication-quality charts
- Protect and share workbooks securely

### Core Concepts

**4.1 Excel Essentials — The Analyst's Setup**

Professional analysts configure Excel for efficiency:
- **Freeze panes:** Header row always visible during scrolling
- **Named ranges:** Give meaningful names to data ranges (CTRL+F3)
- **Tables (CTRL+T):** Convert ranges to Excel Tables for automatic expansion, filtering, structured references
- **Keyboard shortcuts critical for speed:**
  - F2: Edit cell
  - CTRL+SHIFT+END: Select to last used cell
  - ALT+ENTER: New line within cell
  - CTRL+D: Fill down
  - F4: Lock cell references ($A$1)

**4.2 Essential Functions**

**Logical Functions:**
```
=IF(C2>1000000,"VIP","Standard")
=IF(AND(C2>0,D2="Active"),"Qualify","No")
=IF(OR(B2="Lagos",B2="Abuja"),"Priority",IF(B2="PH","Secondary","Other"))
=IFS(C2>=90,"A",C2>=80,"B",C2>=70,"C",C2>=60,"D",TRUE,"F")
```

**Text Functions:**
```
=LEFT(A2,3)         → First 3 characters
=RIGHT(A2,4)        → Last 4 characters
=MID(A2,4,6)        → 6 characters starting at position 4
=LEN(A2)            → Count characters
=FIND("@",A2)       → Position of @ symbol in email
=SUBSTITUTE(A2,"Lagos","LG")   → Replace text
=CONCATENATE(A2," ",B2)        → Join cells
=TEXTJOIN(", ",TRUE,A2:A10)    → Join range with separator
```

**Date and Time:**
```
=TODAY()             → Current date
=NOW()               → Current date and time
=YEAR(A2)            → Extract year
=MONTH(A2)           → Extract month (1-12)
=DATEDIF(A2,B2,"D") → Days between dates
=EOMONTH(A2,0)       → Last day of month in A2
=WEEKDAY(A2,2)       → Day of week (1=Mon with type 2)
```

**Statistical Functions:**
```
=COUNT(A2:A100)       → Count cells with numbers
=COUNTA(A2:A100)      → Count non-empty cells
=COUNTIF(B2:B100,"Lagos")     → Count cells matching condition
=COUNTIFS(B2:B100,"Lagos",C2:C100,"Active")  → Count with multiple conditions
=SUMIF(B2:B100,"Lagos",D2:D100)              → Sum where condition met
=SUMIFS(D2:D100,B2:B100,"Lagos",C2:C100,"Active")  → Sum with multiple conditions
=AVERAGEIF(B2:B100,"Lagos",D2:D100)          → Average where condition
```

**4.3 Lookup Functions**

**VLOOKUP — Vertical Lookup:**
```
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
=VLOOKUP(A2, CustomerTable!A:D, 3, FALSE)
```
- lookup_value: What to look for
- table_array: Where to look (first column must contain lookup values)
- col_index_num: Which column to return (1=first, 2=second, etc.)
- FALSE: Exact match (almost always use FALSE)

**Limitation of VLOOKUP:** Can only look RIGHT; can be slow on large datasets; breaks if columns inserted.

**XLOOKUP — The Modern Replacement (Excel 2019+):**
```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])
=XLOOKUP(A2, CustomerTable[CustomerID], CustomerTable[Name], "Not Found")
```
- Can look LEFT or RIGHT
- Returns entire rows or columns
- Not found handling built in

**INDEX-MATCH — The Power User Standard:**
```
=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))
=INDEX(D:D, MATCH(A2, A:A, 0))
```
- INDEX: Returns value at a position
- MATCH: Finds the position of a value
- Together: The most flexible lookup — no column number dependency

**4.4 Pivot Tables — The Most Powerful Excel Feature**

A Pivot Table summarises large datasets into an interactive cross-tabulation.

**Creating a Pivot Table:**
1. Click any cell in data range
2. Insert → PivotTable
3. Drag fields to Rows, Columns, Values, Filters
4. Right-click → Value Field Settings → choose SUM, COUNT, AVERAGE, etc.

**Practical pivot analysis for Nigerian fintech data:**
- **Rows:** State
- **Columns:** Transaction type (transfer, bill payment, airtime)
- **Values:** Sum of Amount
- **Filter:** Date range

Result: A state-by-transaction-type revenue breakdown in 3 steps.

**Calculated Fields:**
Add custom metrics to pivot tables:
- Analyse → Fields, Items & Sets → Calculated Field
- Example: `= Revenue / Transactions` → creates Average Transaction Value field

**4.5 Professional Chart Design**

**Chart type selection guide:**
| Data Type | Best Chart | Avoid |
|-----------|-----------|-------|
| Comparison over time | Line chart | Pie chart |
| Comparison between categories | Clustered bar chart | 3D charts |
| Part-whole relationships | Stacked bar; treemap | Pie for >5 segments |
| Correlation/relationship | Scatter plot | Line for non-sequential |
| Distribution | Histogram; box plot | Average bars |
| Geographic data | Choropleth map | Pie charts |

**Design principles for professional charts:**
1. **Chart title:** Insight, not just description — "Northern states show 3x higher churn" not "Churn by State"
2. **Axis labels:** Include units (₦ millions, %)
3. **Gridlines:** Minimal — guide the eye, don't clutter
4. **Colours:** Use sparingly; one highlight colour; accessible to colour-blind readers
5. **Legend:** Remove if only one series; position left or above to read with chart

### Labs — Module 4

**Lab 4.1: VLOOKUP/XLOOKUP Practice**
- Tool: Excel
- Dataset: Nigerian salary database (50 employee records) + benefits table (by job grade)
- Task: Use VLOOKUP to add monthly allowance, medical coverage, and pension tier from the benefits table to each employee record. Then reproduce with XLOOKUP. Compare the two approaches.
- Deliverable: Completed workbook with both formulas and comparison notes

**Lab 4.2: Pivot Table Analysis**
- Tool: Excel
- Dataset: 12 months of transaction data for a Nigerian bank (1,000 rows)
- Task: Create 4 pivot tables: (1) Monthly revenue by transaction type, (2) State-by-state customer count and average transaction value, (3) Day of week vs hour of day transaction volume, (4) Top 10 customers by total spend
- Deliverable: Workbook with 4 pivot tables and one accompanying chart each

**Lab 4.3: Business Dashboard**
- Tool: Excel
- Task: Using the bank transaction dataset, create a single-page Excel dashboard with: KPI summary boxes (total transactions, total revenue, avg transaction value, active customers), monthly trend line chart, state comparison bar chart, and a data table
- Deliverable: Professional Excel dashboard

### Assignments — Module 4

1. **SUMIFS Analysis:** Using the provided Nigerian e-commerce dataset, write SUMIFS formulas to answer: (a) Total sales for Lagos in Q3 2024, (b) Number of orders over ₦50,000 from female customers, (c) Average order value for electronics category in Abuja
2. **Pivot Table Insight Report:** Using the bank transaction dataset, produce a 3-insight report — each insight backed by a pivot table and chart, written as an executive summary paragraph.
3. **Chart Critique:** Find 3 charts from Nigerian news media or government reports. For each: identify what chart type was used, whether it was appropriate, what design mistakes were made, and how you would improve it.
4. **Formula Challenge:** A Nigerian school has exam results (500 students, 8 subjects). Use Excel to: calculate each student's average, determine if they passed (average ≥50% and no subject below 40%), assign letter grades, and flag students who need remediation.
5. **VLOOKUP Error Handling:** The instructor provides a lookup exercise where 20% of lookup values have no match. How do you handle #N/A errors gracefully? Build a solution using IFERROR or XLOOKUP's not-found parameter.

---

## MODULE 5: EXCEL FOR DATA ANALYSIS II — ADVANCED FUNCTIONS

### Module Learning Objectives
By the end of this module, students will be able to:
- Use advanced Excel functions: INDIRECT, OFFSET, CHOOSE, and dynamic array functions
- Build financial models with NPV, IRR, PMT functions
- Create What-If analysis with data tables, scenarios, and Goal Seek
- Design dynamic dashboards with form controls
- Apply Excel statistical analysis tools (Data Analysis ToolPak)
- Use Power Query for data connection and transformation

### Core Concepts

**5.1 Array Functions (Excel 365/2019+)**

Dynamic array functions spill results automatically across multiple cells:

```
=UNIQUE(A2:A100)            → List of unique values from a column
=SORT(A2:A100)              → Sorted list (ascending by default)
=SORT(A2:B100,2,-1)         → Sort by column 2, descending
=FILTER(A2:B100,C2:C100>1000000)    → Rows where column C > 1,000,000
=FILTER(A2:B100,(B2:B100="Lagos")*(C2:C100>50000))  → Multiple conditions
```

**SEQUENCE function:**
```
=SEQUENCE(12,1,1,1)  → Numbers 1 through 12 (12 rows, 1 column, start 1, step 1)
```

**5.2 Financial Functions**

Essential for Nigerian banking, fintech, and investment analysis:

**Loan/Investment Functions:**
```
=PMT(rate, nper, pv)        → Monthly payment
=PMT(15%/12, 36, -5000000)  → Monthly payment for ₦5M loan, 15% p.a., 3 years

=NPV(rate, values)          → Net Present Value
=NPV(18%, B2:B6) - A2       → NPV of investment (A2=initial investment, B2:B6=cashflows)

=IRR(values)                → Internal Rate of Return
=IRR(A2:A7)                 → Return on investment project cashflows

=FV(rate, nper, pmt)        → Future Value
=FV(12%/12, 60, -50000)     → Value of ₦50K/month savings over 5 years at 12% p.a.
```

**Nigerian Context Example:**
```
Scenario: Microfinance loan assessment
Principal: ₦2,000,000
Annual interest: 24% (typical microfinance)
Term: 24 months

=PMT(24%/12, 24, -2000000) → ₦105,167 monthly payment
Total paid: ₦2,524,008
Total interest: ₦524,008
```

**5.3 What-If Analysis**

**Goal Seek:** Find the input that produces a target output
- Tools → What-If Analysis → Goal Seek
- *Example:* "What monthly savings do I need to reach ₦10M in 5 years at 12% interest?" → Set cell (FV result) to 10,000,000 by changing monthly payment cell

**Data Tables:** Test sensitivity across a range of inputs
- One-variable: See how output changes across one input range
- Two-variable: See how output changes across two input ranges simultaneously
- *Example:* Build a loan payment table showing monthly payments for combinations of interest rate (15%, 18%, 21%, 24%) and loan term (12, 18, 24, 36 months)

**Scenarios:** Save and compare multiple sets of assumptions
- Tools → What-If Analysis → Scenario Manager
- *Example:* Optimistic, base case, and pessimistic revenue projections for a Lagos startup

**5.4 Power Query**

Power Query is Excel's ETL (Extract, Transform, Load) engine:

**Workflow:**
1. **Get Data** (Data tab) → Connect to source: Excel, CSV, database, web, API
2. **Transform:** In Power Query editor:
   - Remove columns, filter rows
   - Change data types
   - Split columns
   - Pivot/unpivot
   - Merge queries (like VLOOKUP but more powerful)
   - Group by (like pivot tables but in the data pipeline)
3. **Load:** Load to Excel table, pivot table, or data model

**Key advantage:** Repeatable, automated transformation. Run monthly reports by refreshing one query, not reprocessing manually.

**5.5 Statistical Analysis with Data Analysis ToolPak**

Enable via: File → Options → Add-ins → Manage: Excel Add-ins → Analysis ToolPak

**Available analyses:**
- Descriptive Statistics: Mean, median, mode, std dev, skewness, kurtosis, min, max
- Histogram: Frequency distribution
- Correlation: Correlation matrix for multiple variables
- Regression: Linear regression with full output (coefficients, R², p-values)
- T-Test: Compare means between two groups
- ANOVA: Compare means across multiple groups
- Moving Average: Trend smoothing
- Random Number Generation: Monte Carlo simulation inputs

**Example — Nigerian E-commerce Regression:**
Outcome variable: Sales amount (₦)
Predictor variables: Product category, customer age, previous orders, day of week

Regression output interpretation:
- R² = 0.67 → model explains 67% of sales variation
- Age coefficient = -2,500 → each additional year of age reduces purchase by ₦2,500 on average
- p-value for age < 0.05 → age is a statistically significant predictor

### Labs — Module 5

**Lab 5.1: Dynamic Array Dashboard**
- Tool: Excel 365
- Dataset: Nigerian startup funding database (200 companies)
- Task: Use UNIQUE, FILTER, and SORT to: list all unique sectors, filter companies that raised >$1M, sort the list by funding amount, and create a dynamic sector summary table
- Deliverable: Workbook with 4 dynamic array analyses

**Lab 5.2: Financial Modelling**
- Tool: Excel
- Scenario: A Lagos entrepreneur takes a ₦5M equipment loan at 22% per annum for 3 years
- Task: Build a full loan amortisation schedule showing: monthly payment (PMT), interest portion, principal portion, and remaining balance for all 36 months. Create a two-variable data table showing total interest paid across different rates (18–28%) and terms (12–48 months).
- Deliverable: Loan model workbook

**Lab 5.3: Power Query Transformation**
- Tool: Excel Power Query
- Task: Connect 3 separate Excel files (sales, customers, products) using Power Query. Clean each table: standardise date formats, handle missing values, remove duplicates. Merge them into a single master analytics table. Load to Excel.
- Deliverable: Power Query solution with documented transformation steps

### Assignments — Module 5

1. **Financial Model:** Build a 5-year business plan financial model for a hypothetical Lagos food tech startup. Include: revenue projections (3 scenarios), operating costs, NPV calculation at 18% discount rate, and IRR. Present the model professionally.
2. **Regression Analysis:** Using the provided dataset of Nigerian states' education spending and literacy rates: run a regression in Excel. Is there a statistically significant relationship? What is the R²? What other variables might explain literacy rates?
3. **Power Query Automation:** A company receives 12 monthly sales reports in the same format (different data each month). Use Power Query to build a solution that automatically combines all 12 into one master dataset when refreshed. Document the steps.
4. **What-If Scenario:** A Nigerian real estate developer is considering a ₦200M project. Build a scenario analysis with Optimistic (30% profit margin), Base (20%), and Pessimistic (10%) cases. Include sensitivity to construction cost changes (+/- 15%).
5. **Statistical Analysis (400 words):** Run descriptive statistics on a Nigerian consumer spending dataset. Report: mean, median, standard deviation, skewness. What does the distribution shape tell you about consumer spending patterns?

---

## MODULE 6: INTRODUCTION TO SQL & DATABASE QUERIES

### Module Learning Objectives
By the end of this module, students will be able to:
- Explain relational database design and normalisation
- Write and execute SQL SELECT queries with filtering and sorting
- Use aggregate functions: COUNT, SUM, AVG, MIN, MAX
- Group data with GROUP BY and filter aggregates with HAVING
- Work with SQL data types and handle NULL values
- Use string, date, and mathematical functions in SQL

### Core Concepts

**6.1 Relational Databases**

A relational database stores data in related tables, connected by keys.

**Why databases instead of Excel?**
- Handle millions/billions of rows efficiently
- Multiple users simultaneously
- ACID transactions (Atomicity, Consistency, Isolation, Durability)
- Relationships between tables prevent data redundancy
- Access control and audit trails
- SQL: standardised query language

**Nigerian Database Context:**
- Banks (GTBank, Access): Millions of account records, transactions daily
- NIBSS: National payment system database
- NIMC: 100+ million NIN records
- Konga/Jumia: Millions of product, order, customer records

**6.2 Core SQL Concepts**

**Tables, Rows, Columns:**
- Table = entity (Customers, Transactions, Products)
- Row = record (one customer's data)
- Column = attribute (customer_name, email, state)

**Primary Key:** Unique identifier for each row (customer_id, transaction_id)
**Foreign Key:** Column in one table that references primary key of another (customer_id in Transactions table references Customers table)

**6.3 The Basic SELECT Statement**

```sql
-- Basic structure
SELECT column1, column2, column3
FROM table_name
WHERE condition
ORDER BY column1 ASC/DESC
LIMIT n;

-- All columns
SELECT *
FROM customers;

-- Specific columns
SELECT customer_name, email, state, registration_date
FROM customers
WHERE state = 'Lagos'
ORDER BY registration_date DESC
LIMIT 100;
```

**6.4 WHERE Clause — Filtering Data**

```sql
-- Comparison operators
WHERE amount > 100000
WHERE age BETWEEN 25 AND 45
WHERE state IN ('Lagos', 'Abuja', 'Rivers')
WHERE status != 'Cancelled'

-- Text pattern matching
WHERE email LIKE '%@gmail.com'    -- ends with @gmail.com
WHERE customer_name LIKE 'Ade%'  -- starts with Ade
WHERE phone LIKE '0803%'         -- starts with 0803

-- NULL handling
WHERE email IS NULL               -- no email provided
WHERE phone IS NOT NULL           -- phone number exists

-- Combined conditions
WHERE state = 'Lagos'
  AND amount > 50000
  AND status = 'Completed'

WHERE state = 'Lagos'
  OR state = 'Abuja'
```

**6.5 Aggregate Functions**

```sql
-- Count total customers
SELECT COUNT(*) as total_customers
FROM customers;

-- Count customers per state
SELECT state,
       COUNT(*) as customer_count,
       SUM(total_purchases) as total_revenue,
       AVG(total_purchases) as avg_revenue,
       MIN(total_purchases) as min_purchase,
       MAX(total_purchases) as max_purchase
FROM customers
GROUP BY state
ORDER BY total_revenue DESC;

-- Only states with more than 500 customers
SELECT state, COUNT(*) as customer_count
FROM customers
GROUP BY state
HAVING COUNT(*) > 500
ORDER BY customer_count DESC;
```

**Difference: WHERE vs HAVING**
- `WHERE` filters individual rows BEFORE grouping
- `HAVING` filters groups AFTER aggregation

```sql
-- WHO filters rows, HAVING filters groups
SELECT state, COUNT(*) as active_customers
FROM customers
WHERE status = 'Active'          -- filter rows first (only active customers)
GROUP BY state
HAVING COUNT(*) > 100            -- then filter groups (only states with 100+ active)
ORDER BY active_customers DESC;
```

**6.6 SQL Functions**

**String Functions:**
```sql
SELECT UPPER(customer_name) as name_upper,
       LOWER(email) as email_lower,
       LENGTH(phone) as phone_length,
       SUBSTRING(phone, 1, 4) as phone_prefix,
       REPLACE(phone, '+234', '0') as local_format,
       TRIM(customer_name) as name_trimmed,
       CONCAT(first_name, ' ', last_name) as full_name
FROM customers;
```

**Date Functions:**
```sql
SELECT transaction_date,
       YEAR(transaction_date) as year,
       MONTH(transaction_date) as month,
       DAY(transaction_date) as day,
       DAYOFWEEK(transaction_date) as day_of_week,
       DATE_FORMAT(transaction_date, '%d/%m/%Y') as formatted_date,
       DATEDIFF(NOW(), transaction_date) as days_ago,
       TIMESTAMPDIFF(MONTH, registration_date, NOW()) as months_as_customer
FROM transactions;
```

**Mathematical Functions:**
```sql
SELECT amount,
       ROUND(amount, 2) as rounded,
       FLOOR(amount) as floor_val,
       CEILING(amount) as ceiling_val,
       ABS(balance) as absolute_value,
       MOD(transaction_id, 10) as last_digit
FROM transactions;
```

**6.7 NULL Handling**

NULL represents unknown or missing data — not zero, not empty string.

**The NULL trap:**
```sql
-- This will NOT catch NULL values:
WHERE state != 'Lagos'

-- This WILL include NULLs:
WHERE state != 'Lagos' OR state IS NULL

-- Replace NULL with a default value:
SELECT COALESCE(phone, 'No phone') as phone_display
FROM customers;

-- Alternative for MSSQL:
SELECT ISNULL(phone, 'No phone') as phone_display
FROM customers;
```

**CASE statement — SQL's IF/THEN:**
```sql
SELECT customer_name,
       total_purchases,
       CASE
           WHEN total_purchases >= 1000000 THEN 'Platinum'
           WHEN total_purchases >= 500000 THEN 'Gold'
           WHEN total_purchases >= 100000 THEN 'Silver'
           ELSE 'Standard'
       END as customer_tier
FROM customers;
```

### Labs — Module 6

**Lab 6.1: First SQL Queries**
- Tool: SQLiteOnline.com (no installation required) or MySQL Workbench
- Dataset: Instructor provides Nigerian e-commerce database SQL file
- Task: Write 10 SQL queries: (1) All products in electronics category, (2) Customers from Lagos with 10+ orders, (3) Total revenue by product category, (4) Top 10 states by customer count, (5) Orders placed in Q4 2024, (6) Customers with missing email addresses, (7) Average order value by customer gender, (8) Products with price between ₦5,000 and ₦50,000, (9) Transaction count per day of week, (10) States with revenue > ₦10M
- Deliverable: SQL script with all 10 queries and results screenshots

**Lab 6.2: CASE Statement Analysis**
- Tool: SQL
- Task: Using the customer database: write a CASE statement assigning customer tiers (Platinum/Gold/Silver/Standard) based on total spend, then count customers per tier and calculate the percentage of total revenue from each tier.
- Deliverable: SQL query + annotated results

**Lab 6.3: NULL Investigation**
- Tool: SQL
- Task: Run a data quality audit on the Nigerian customer database: for each column, count NULLs, calculate % missing, and identify which columns have the most problematic missingness.
- Deliverable: Data quality SQL report

### Assignments — Module 6

1. **Query Writing:** Given the Nigerian banking transaction database schema (customers, accounts, transactions, branches tables), write SQL queries to answer: (a) Total transactions per branch, (b) Highest value transaction per day for the past 30 days, (c) Customers who haven't transacted in 60 days, (d) Average transaction amount by customer age group (18–25, 26–35, 36–50, 51+)
2. **Business Report SQL:** Write a complete SQL query that generates a monthly business performance report: total transactions, total value, new customers, top transaction category, and state with highest activity — for each of the past 12 months.
3. **Data Cleaning in SQL:** Using SQL UPDATE and WHERE statements, write queries to: standardise phone number format, convert all email addresses to lowercase, replace NULL states with 'Unknown'.
4. **Window Function Introduction:** Research SQL window functions (ROW_NUMBER, RANK, LAG, LEAD). Write an example query using RANK() to rank customers within each state by total spend.
5. **Database Design:** Design a relational database schema for a Nigerian school management system. Include at least 5 tables with appropriate primary and foreign keys. Draw the entity-relationship diagram.

---

*[End of Part 1 — Modules 1–6]*
*Continues in 01-curriculum-part2.md — Modules 7–12, Capstone & Certification Exam*
