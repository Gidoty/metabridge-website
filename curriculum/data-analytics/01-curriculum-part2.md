# MetaBridge Academy — Data Analytics
## Document 1: Curriculum (Part 2 — Modules 7–12, Capstone & Certification Exam)

---

## MODULE 7: ADVANCED SQL — JOINS, AGGREGATIONS & SUBQUERIES

### Module Learning Objectives
By the end of this module, students will be able to:
- Write all four types of JOIN operations (INNER, LEFT, RIGHT, FULL)
- Build complex multi-table queries combining multiple joins
- Write correlated and non-correlated subqueries
- Use Common Table Expressions (CTEs) for readable complex queries
- Apply window functions (ROW_NUMBER, RANK, LEAD, LAG, SUM OVER)
- Optimise SQL query performance

### Core Concepts

**7.1 JOIN Operations**

JOINs combine rows from two or more tables based on a related column.

```
Customers Table:        Transactions Table:
customer_id | name      transaction_id | customer_id | amount
100         | Amaka     T001          | 100         | 5000
101         | Bolaji    T002          | 100         | 8000
102         | Chisom    T003          | 102         | 2000
103         | Dayo      (103 has no transactions)
```

**INNER JOIN — Only matching rows from both tables:**
```sql
SELECT c.customer_name, t.amount, t.transaction_date
FROM customers c
INNER JOIN transactions t ON c.customer_id = t.customer_id;
-- Result: Amaka+T001, Amaka+T002, Chisom+T003 (Bolaji/Dayo excluded)
```

**LEFT JOIN — All rows from left table, matching from right:**
```sql
SELECT c.customer_name, COUNT(t.transaction_id) as transaction_count
FROM customers c
LEFT JOIN transactions t ON c.customer_id = t.customer_id
GROUP BY c.customer_id, c.customer_name;
-- Result: Amaka(2), Bolaji(0), Chisom(1), Dayo(0) — includes all customers
```

**RIGHT JOIN — All rows from right table, matching from left:**
```sql
-- Less common; usually rewrite as LEFT JOIN
```

**FULL OUTER JOIN — All rows from both tables:**
```sql
-- MySQL doesn't support FULL OUTER JOIN directly; simulate with UNION:
SELECT c.customer_name, t.amount
FROM customers c LEFT JOIN transactions t ON c.customer_id = t.customer_id
UNION
SELECT c.customer_name, t.amount
FROM customers c RIGHT JOIN transactions t ON c.customer_id = t.customer_id;
```

**7.2 Multi-Table Joins**

Typical Nigerian banking query involving 4 tables:
```sql
SELECT 
    c.customer_name,
    c.state,
    b.branch_name,
    b.lga,
    p.product_name,
    COUNT(t.transaction_id) as transaction_count,
    SUM(t.amount) as total_amount,
    AVG(t.amount) as avg_transaction
FROM customers c
INNER JOIN accounts a ON c.customer_id = a.customer_id
INNER JOIN transactions t ON a.account_id = t.account_id
INNER JOIN branches b ON a.branch_id = b.branch_id
INNER JOIN products p ON t.product_id = p.product_id
WHERE t.transaction_date >= '2024-01-01'
  AND t.status = 'Completed'
GROUP BY c.customer_id, c.customer_name, c.state, b.branch_name, b.lga, p.product_name
ORDER BY total_amount DESC;
```

**7.3 Subqueries**

A subquery is a query nested inside another query.

**Non-correlated subquery (runs once):**
```sql
-- Customers who have spent more than the average customer
SELECT customer_name, total_purchases
FROM customers
WHERE total_purchases > (
    SELECT AVG(total_purchases) FROM customers
);
```

**IN with subquery:**
```sql
-- Customers who made purchases in December 2024
SELECT DISTINCT customer_name
FROM customers
WHERE customer_id IN (
    SELECT customer_id 
    FROM transactions 
    WHERE MONTH(transaction_date) = 12 
      AND YEAR(transaction_date) = 2024
);
```

**Correlated subquery (runs once per outer row):**
```sql
-- Each customer with their most recent transaction amount
SELECT c.customer_name,
       (SELECT t.amount 
        FROM transactions t 
        WHERE t.customer_id = c.customer_id 
        ORDER BY t.transaction_date DESC 
        LIMIT 1) as last_transaction_amount
FROM customers c;
```

**7.4 Common Table Expressions (CTEs)**

CTEs make complex queries readable and reusable:

```sql
-- Monthly revenue with running total
WITH monthly_revenue AS (
    SELECT 
        DATE_FORMAT(transaction_date, '%Y-%m') as month,
        SUM(amount) as revenue
    FROM transactions
    WHERE status = 'Completed'
    GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
),
running_total AS (
    SELECT 
        month,
        revenue,
        SUM(revenue) OVER (ORDER BY month) as cumulative_revenue
    FROM monthly_revenue
)
SELECT * FROM running_total ORDER BY month;
```

**7.5 Window Functions**

Window functions perform calculations across related rows without collapsing them:

```sql
-- Rank customers by spend within each state
SELECT 
    customer_name,
    state,
    total_purchases,
    RANK() OVER (PARTITION BY state ORDER BY total_purchases DESC) as state_rank,
    DENSE_RANK() OVER (ORDER BY total_purchases DESC) as overall_rank,
    ROW_NUMBER() OVER (ORDER BY registration_date) as signup_order
FROM customers;

-- Month-over-month growth calculation
SELECT 
    month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY month) as prev_month_revenue,
    ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY month)) / 
          LAG(revenue, 1) OVER (ORDER BY month) * 100, 1) as mom_growth_pct
FROM monthly_revenue
ORDER BY month;

-- Cumulative sum
SELECT 
    transaction_date,
    amount,
    SUM(amount) OVER (ORDER BY transaction_date) as running_total
FROM transactions
WHERE customer_id = 100;
```

### Labs — Module 7

**Lab 7.1: Multi-Table Analysis**
- Task: Using the Nigerian bank database (customers, accounts, transactions, branches, products), write 5 multi-table JOIN queries: (1) Branch-level performance report, (2) Customers who haven't transacted in 90 days (LEFT JOIN approach), (3) Product cross-sell analysis (customers who use multiple products), (4) Branch vs state average comparison, (5) Top customers per product category
- Deliverable: SQL script with 5 queries and business interpretation

**Lab 7.2: CTE Business Analysis**
- Task: Using CTEs, build a comprehensive customer health scorecard showing for each customer: total spend, transaction frequency, days since last transaction, recency score (1–5), frequency score (1–5), monetary score (1–5), and combined RFM score
- Deliverable: Customer RFM analysis SQL script

**Lab 7.3: Window Function Dashboard**
- Task: Write SQL that produces: running monthly revenue, month-over-month growth %, customer rank within state, and rolling 3-month average transaction value per customer
- Deliverable: Window function SQL analysis

### Assignments — Module 7

1. **Cohort Analysis:** Write SQL to create a cohort retention analysis — for each monthly cohort of new customers, track what % are still active in months 1, 2, 3, 6, 12.
2. **Fraud Pattern Query:** Write SQL queries to detect common fraud patterns: (a) multiple transactions from same card in same minute, (b) transaction amount exactly at limit threshold (round number test), (c) new customers with unusually high first transaction.
3. **Complex Business Report:** The Nigerian Agricultural Bank wants to know: for each state, the top 3 farmers by loan portfolio size, their repayment rate, and whether it's above/below the state average. Write the SQL.
4. **Performance Optimisation:** The instructor provides a slow-running query. Using EXPLAIN, identify why it's slow and optimise it using indexes and query restructuring.
5. **Database Design Project:** Design and populate (with sample data) a complete PostgreSQL database for a Nigerian microfinance institution: customers, loans, repayments, loan_officers, and branches.

---

## MODULE 8: DATA VISUALISATION PRINCIPLES

### Module Learning Objectives
By the end of this module, students will be able to:
- Apply core data visualisation principles to choose appropriate chart types
- Identify and correct common visualisation mistakes
- Create compelling narrative visualisations that tell a clear story
- Use colour, typography, and layout professionally
- Build visualisations with Datawrapper and Flourish for web publishing
- Design accessible visualisations for diverse Nigerian audiences

### Core Concepts

**8.1 Why Visualisation Matters**

Humans process visual information 60,000 times faster than text. A well-designed chart communicates in seconds what tables take minutes to understand.

The goal of data visualisation: **reduce cognitive load** and **accelerate insight**.

**8.2 The Chart Selection Framework**

**What are you trying to show?**

| Relationship | Best Chart | Avoid |
|-------------|-----------|-------|
| Composition (parts of whole) | Stacked bar, treemap | Pie (>4 segments) |
| Comparison (A vs B) | Bar chart (vertical) | 3D bars |
| Trend over time | Line chart | Bar for long time series |
| Distribution | Histogram, box plot | Line for categories |
| Correlation | Scatter plot | Any bar chart |
| Geographical | Choropleth, bubble map | 3D maps |
| Ranking | Horizontal bar (sorted) | Vertical for long lists |
| Flow/process | Sankey diagram | Tables |

**8.3 The Pre-Attentive Attributes**

Features the human brain processes instantly (before conscious attention):
- **Colour:** Red stands out immediately in a field of blue
- **Size:** Larger objects appear more important
- **Position:** Objects higher or further right imply more value
- **Shape:** Different shapes for categorical comparison
- **Length:** The most accurate visual judgment (bars)
- **Enclosure:** Items in a box form a group

**Design principle:** Use ONE pre-attentive attribute to highlight your key message.

**8.4 The Lie Factor**

From Edward Tufte: `Lie Factor = (Visual Size Change) / (Data Size Change)`

Common distortions:
- **Truncated Y-axis:** Starting at ₦1,980,000 makes a 1% difference look like 50%
- **3D charts:** Add visual distortion; front bars appear larger
- **Dual axes:** Make unrelated trends appear correlated
- **Area charts without zero baseline:** Exaggerate changes

**Rule:** Y-axis must start at zero for bar/column charts (not line charts).

**8.5 Colour for Communication**

- **1 accent colour:** Highlight the key message; mute everything else
- **Semantic colours:** Red = bad/negative, green = good/positive (but check for colour-blindness)
- **Accessibility:** 8% of men have colour blindness (red-green most common). Use colour + shape/pattern.
- **Nigeria brand consideration:** Use MetaBridge or client brand colours for consistency

**8.6 The Data Story Structure**

Professional data presentations follow a narrative arc:

1. **Setup:** "Our customer churn has increased by 23% over the past 6 months"
2. **Context:** "Industry average is 8% — we are 3× worse than expected"
3. **Evidence:** [Show the chart] "This is driven primarily by Northern states"
4. **So What:** "If unchecked, we lose ₦240M annually"
5. **Action:** "We recommend 3 targeted retention interventions"

**8.7 Tools — Datawrapper and Flourish**

**Datawrapper (datawrapper.de):**
- Free tier available
- Publication-ready charts with minimal setup
- Embeddable in websites
- Strong for bar charts, line charts, maps
- Used by major newsrooms globally

**Flourish (flourish.studio):**
- Free tier available
- Animated and interactive stories
- Strong for: race bar charts, connected dot plots, sankey flows, network graphs
- Great for narrative presentations

**8.8 Nigerian-Specific Visualisation Considerations**

- **State-level maps:** Use the Nigerian administrative map — 36 states + FCT. Many online map tools have Nigeria maps.
- **LGA-level:** More granular but less accessible. Best for specialised local analysis.
- **Language:** English for professional/corporate; consider Pidgin captions for social media
- **Mobile-first:** Most Nigerian audiences view on mobile — test at 375px width

### Labs — Module 8

**Lab 8.1: Chart Critique and Redesign**
- Task: Instructor provides 5 examples of poor data visualisations from Nigerian government reports, news media, and corporate presentations. Students: (1) identify all design problems, (2) redesign in Excel or Datawrapper showing improved version
- Deliverable: Before/after comparison with written critique

**Lab 8.2: Datawrapper Map**
- Tool: datawrapper.de
- Task: Import Nigerian state-level GDP data. Create an interactive choropleth map. Add hover tooltips with state name, GDP value, and GDP per capita. Set appropriate colour scale. Export and embed.
- Deliverable: Published Datawrapper map link

**Lab 8.3: Data Story Presentation**
- Tool: PowerPoint or Google Slides + Datawrapper/Excel
- Task: Given a Nigerian e-commerce dataset, build a complete 5-slide data story presentation following the Setup → Context → Evidence → So What → Action framework
- Deliverable: Presentation file + verbal presentation (3 minutes)

### Assignments — Module 8

1. **Visualisation Portfolio:** Create 5 different chart types (bar, line, scatter, map, distribution) using one Nigerian dataset. For each: explain why that chart type was chosen and what insight it reveals.
2. **Infographic Design:** Design a one-page infographic on Nigerian digital financial inclusion trends (data from CBN and NIBSS reports). Include at least 4 visualisation elements.
3. **Media Analysis:** Find 3 data visualisations in Nigerian news media from the past month. Critique each: what's right, what's wrong, how to improve.
4. **Accessibility Audit:** Take your Module 8.2 map and test it for accessibility: colour-blind simulation, mobile responsiveness, screen reader text availability. Document and fix issues found.
5. **Executive Presentation:** A Nigerian bank CEO wants a 3-minute update on digital banking adoption. Prepare the minimum slides needed to communicate the key message effectively — practice the principle "fewer slides, more impact."

---

## MODULE 9: POWER BI I — BUILDING DASHBOARDS

### Module Learning Objectives
By the end of this module, students will be able to:
- Connect Power BI Desktop to multiple data sources
- Transform data using Power Query Editor
- Model data relationships between tables
- Build reports with essential visualisation types
- Design professional, interactive dashboards
- Publish to Power BI Service and share with stakeholders

### Core Concepts

**9.1 The Power BI Architecture**

Power BI has three components:
- **Power BI Desktop:** Development environment (Windows only) — FREE
- **Power BI Service:** Cloud sharing platform (powerbi.com) — monthly subscription for some features
- **Power BI Mobile:** View dashboards on phone/tablet

**The workflow:**
1. Connect to data sources in Desktop
2. Transform data in Power Query
3. Model data relationships
4. Build visualisations
5. Publish to Service
6. Share with stakeholders / embed in websites

**9.2 Connecting to Data Sources**

Power BI connects to 100+ data sources:
- Excel files (.xlsx, .csv)
- SQL databases (MySQL, PostgreSQL, SQL Server)
- Web pages (HTML tables)
- SharePoint / OneDrive
- Google Sheets (via API)
- REST APIs with JSON
- PDF tables

**File → Get Data → Choose source type → Configure connection → Load or Transform**

**9.3 Power Query in Power BI**

Same Power Query engine as Excel, but more powerful in Power BI:

**Common transformations for Nigerian data:**
- Promote headers (first row as column names)
- Change data types (Text → Number → Date)
- Add custom column (formulas)
- Conditional column (if/then logic visually)
- Group by (like SQL GROUP BY)
- Merge queries (like SQL JOIN)
- Append queries (like SQL UNION)
- Pivot/Unpivot columns
- Split column by delimiter (state|lga combined → two columns)

**9.4 Data Modelling**

The data model connects tables through relationships:

**Star Schema (ideal for analytics):**
- **Fact table:** Transactional data (sales, transactions, events) — many rows
- **Dimension tables:** Descriptive data (customers, products, dates, geography) — smaller

```
Date Dimension ←─── Transactions (Fact) ───→ Product Dimension
                           |
                           ↓
                    Customer Dimension
                           |
                           ↓
                    Branch Dimension
```

**Setting relationships:**
- Home → Manage Relationships
- Drag fields between tables (one-to-many is most common)
- Power BI often auto-detects relationships

**Cardinality:**
- One-to-many (1:*): One customer has many transactions
- Many-to-one (*:1): Many transactions belong to one branch
- Many-to-many (*:*): Avoid where possible — complex and slow

**9.5 Building Visualisations**

**Essential Power BI visuals:**

| Visual | Best For |
|--------|----------|
| Card | Single KPI (₦2.3B total revenue) |
| Multi-row Card | Multiple KPIs in one panel |
| Clustered Bar | Category comparison |
| Line Chart | Trend over time |
| Area Chart | Cumulative trend |
| Pie/Donut | Simple part-whole (max 4 segments) |
| Map | Geographic data (requires location fields) |
| Matrix | Cross-tabulation (like pivot table) |
| Table | Detailed data view |
| Slicer | Interactive filter control |
| KPI Visual | Target vs actual |
| Funnel | Sequential process conversion |
| Scatter Plot | Correlation/relationship |
| Treemap | Hierarchical composition |

**9.6 Interactions and Filtering**

**Cross-filtering:** Clicking one visual filters all other visuals on the page by default.
**Edit interactions:** Right-click visual → Edit interactions → choose: Filter, Highlight, or None.

**Slicers (interactive filters):**
- State slicer: Click Lagos → all visuals filter to Lagos data
- Date range slicer: Drag to select date range
- Dropdown slicer: Select from list

**Filter pane:** Page-level, visual-level, and report-level filters

**9.7 Dashboard Design Principles for Power BI**

**Layout:**
- Most important KPI at top-left (F-pattern reading)
- Supporting detail charts below and right
- Filter controls consistently positioned (top or left)
- White space is not wasted space — it directs attention

**Colour:**
- Use a consistent palette (2–4 colours)
- Neutral backgrounds (#F5F5F5 is softer than white)
- Highlight colour for key metric
- Apply MetaBridge/client brand colours

**Typography:**
- Consistent font family throughout
- Hierarchy: Title > Section header > Data label > Footnote
- Minimum 11pt for legibility on screens

**Nigerian dashboard examples to reference:**
- GTBank data analytics team dashboards
- NIBSS payment system dashboard design
- World Bank Nigeria portal

### Labs — Module 9

**Lab 9.1: First Power BI Report**
- Tool: Power BI Desktop
- Dataset: Nigerian retail chain sales data (monthly, 3 years, 10 stores, 5 product categories)
- Task: Connect to Excel file → Transform in Power Query (fix types, create date parts) → Build data model (sales + products + stores + calendar) → Create 5-visual report: KPI card, monthly trend, store comparison, category breakdown, geographic map
- Deliverable: .pbix file and screenshot of completed report

**Lab 9.2: Interactive Dashboard**
- Tool: Power BI Desktop
- Task: Convert the Module 9.1 report into an interactive dashboard with: state slicer, year/quarter slicer, date range slicer, and ensure all visuals interact correctly. Add drill-through from summary to detail page.
- Deliverable: Enhanced .pbix file

**Lab 9.3: Power BI Service Publishing**
- Tool: Power BI Service (free tier)
- Task: Publish the dashboard to Power BI Service. Create a shareable link. Set a data refresh schedule. Add to a workspace with appropriate permissions.
- Deliverable: Power BI Service URL + documentation

### Assignments — Module 9

1. **Sales Performance Dashboard:** Build a complete Power BI sales dashboard for a Nigerian FMCG company. Includes: monthly revenue, product performance, regional breakdown, top customers, and sales target tracking.
2. **HR Analytics Dashboard:** Using a sample Nigerian company HR dataset, build a dashboard showing: headcount by department and state, salary distribution, attrition rate, training completion, and hiring pipeline.
3. **Financial Services Dashboard:** Build a dashboard for a Nigerian microfinance institution showing: active loans, repayment rates, NPL (Non-Performing Loan) ratio, disbursements per month, and LGA-level coverage.
4. **Dashboard Critique:** Find 3 publicly available Power BI dashboards (Microsoft's Power BI Gallery). Critique the design of each: what works, what doesn't, what would you change?
5. **Mobile Optimisation:** Take your Module 9.1 dashboard and design a mobile-optimised version (Phone Layout in Power BI). Test at 375px width. What must change for mobile vs desktop?

---

## MODULE 10: POWER BI II — DAX, MEASURES & ADVANCED ANALYTICS

### Module Learning Objectives
By the end of this module, students will be able to:
- Understand the difference between calculated columns and measures
- Write DAX measures for common business metrics
- Apply time intelligence functions (SAMEPERIODLASTYEAR, DATEADD, TOTALYTD)
- Build dynamic titles and conditional formatting
- Use advanced features: bookmarks, drill-through, decomposition tree
- Integrate Python/R scripts within Power BI

### Core Concepts

**10.1 Calculated Columns vs Measures**

**Calculated Column:**
- Computed for every row at data load time
- Stored in the data model
- Available as a field (can be used in slicers, rows)
- Computed in row context

```dax
-- Column: Customer Age Group
Age Group = 
    IF([Age] < 26, "18-25",
    IF([Age] < 36, "26-35",
    IF([Age] < 51, "36-50", "51+")))
```

**Measure:**
- Computed dynamically based on current filter context
- NOT stored — recalculates on every visual interaction
- Better for aggregations (SUM, AVERAGE, COUNT)
- More efficient — only runs for what's currently on screen

```dax
-- Measure: Total Revenue
Total Revenue = SUM(Transactions[Amount])

-- Measure: Transaction Count
Transaction Count = COUNTROWS(Transactions)

-- Measure: Average Transaction Value
Avg Transaction Value = DIVIDE([Total Revenue], [Transaction Count])
```

**10.2 Core DAX Measures**

**Business metrics for Nigerian fintech:**
```dax
-- Active Customers (transacted in last 30 days)
Active Customers = 
CALCULATE(
    DISTINCTCOUNT(Transactions[customer_id]),
    Transactions[transaction_date] >= TODAY() - 30
)

-- Churn Rate (customers inactive 60+ days vs 90 days ago)
Churn Rate = 
DIVIDE(
    CALCULATE(
        DISTINCTCOUNT(Customers[customer_id]),
        FILTER(Customers, 
               DATEDIFF(Customers[last_transaction_date], TODAY(), DAY) > 60)
    ),
    DISTINCTCOUNT(Customers[customer_id])
)

-- Month-Over-Month Growth
MoM Revenue Growth = 
DIVIDE(
    [Total Revenue] - CALCULATE([Total Revenue], DATEADD(Dates[Date], -1, MONTH)),
    CALCULATE([Total Revenue], DATEADD(Dates[Date], -1, MONTH))
)

-- Revenue vs Target
Revenue vs Target = 
DIVIDE([Total Revenue], SUM(Targets[Revenue_Target])) - 1
```

**10.3 Time Intelligence Functions**

Time intelligence functions require a continuous date table in your model:

```dax
-- Year-to-Date
Revenue YTD = TOTALYTD([Total Revenue], Dates[Date])

-- Same period last year
Revenue SPLY = 
CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Dates[Date]))

-- Year-over-year growth
YoY Growth = 
DIVIDE(
    [Total Revenue] - [Revenue SPLY],
    [Revenue SPLY]
)

-- Rolling 3-month average
Revenue 3M Rolling Avg = 
CALCULATE(
    AVERAGEX(
        DATESINPERIOD(Dates[Date], LASTDATE(Dates[Date]), -3, MONTH),
        [Total Revenue]
    )
)
```

**10.4 CALCULATE — The Most Important DAX Function**

`CALCULATE` modifies the filter context of any measure:

```dax
-- Lagos Revenue only (regardless of current filter)
Lagos Revenue = 
CALCULATE([Total Revenue], Customers[state] = "Lagos")

-- Revenue from new customers (registration in current year)
New Customer Revenue = 
CALCULATE(
    [Total Revenue],
    FILTER(Customers, YEAR(Customers[registration_date]) = YEAR(TODAY()))
)

-- % of total (removes state filter to always show all)
Revenue % of Total = 
DIVIDE(
    [Total Revenue],
    CALCULATE([Total Revenue], ALL(Customers[state]))
)
```

**10.5 Advanced Power BI Features**

**Bookmarks:** Save the visual state (filters, visibility, focus) for storytelling
- View → Bookmarks panel
- Set up a "Before" and "After" bookmark for comparison stories

**Drill-Through:** Navigate from summary to detail for a specific entity
- Right-click on a visual element → Drill through → To detail page
- Pre-configured in the detail page's drill-through filters

**Decomposition Tree:** Explore what contributes to a measure
- AI visual → Break down Revenue by State → then by Product → then by Customer Segment
- Automatically suggests the highest AI split

**Q&A Visual:** Natural language queries
- Type "total revenue by state this year" — AI interprets and builds the chart

### Labs — Module 10

**Lab 10.1: DAX Measures Library**
- Tool: Power BI Desktop
- Task: Building on the retail dataset, create a complete measures library: Total Revenue, Transaction Count, Average Transaction Value, Active Customers (30-day), Churn Rate, MoM Growth, YoY Growth, Revenue YTD, Revenue % of Total by State, New vs Returning Customer Revenue
- Deliverable: .pbix file with documented measure library

**Lab 10.2: Time Intelligence Dashboard**
- Tool: Power BI Desktop
- Task: Build a time intelligence view with: YTD vs prior YTD comparison, monthly MoM growth table (current vs prior month for all 12 months), rolling 3-month average revenue line, and seasonal pattern analysis
- Deliverable: Time intelligence dashboard

**Lab 10.3: Executive Scorecard**
- Tool: Power BI Desktop
- Task: Create a one-page executive scorecard with: 8 KPI cards with conditional formatting (green if above target, red if below), dynamic title that updates with selected time period, and a drill-through to detailed breakdown page
- Deliverable: Professional executive scorecard

### Assignments — Module 10

1. **DAX Challenge:** Write DAX measures for: (a) Customer Lifetime Value (total spend per customer), (b) Product profitability ranking using RANKX, (c) Dynamic top N customers based on a slicer selection, (d) Cohort retention rate for each monthly new customer cohort
2. **Financial Dashboard with Time Intelligence:** Build a full financial performance dashboard using all time intelligence functions covered. Should show: YTD, SPLY, MoM growth, and a forecast for the next 3 months using linear trend.
3. **Report Story:** Using Power BI bookmarks, create a 5-step presentation story within a Power BI report that walks a CEO through Nigeria-specific insights, click by click.
4. **Python Integration:** Enable Python visuals in Power BI. Connect to Python to generate a matplotlib chart within Power BI. Use this to create a correlation matrix heatmap.
5. **Model Optimisation:** Given a slow Power BI file (>100MB), diagnose the performance issues using Performance Analyzer and DAX Studio. Apply optimisation techniques.

---

## MODULE 11: STATISTICAL ANALYSIS & PREDICTIVE ANALYTICS

### Module Learning Objectives
By the end of this module, students will be able to:
- Calculate and interpret key descriptive statistics
- Understand probability distributions and their business applications
- Formulate and test hypotheses (t-tests, chi-square, ANOVA)
- Interpret correlation and build linear regression models
- Understand the basics of machine learning for predictive analytics
- Apply statistical thinking to Nigerian business contexts

### Core Concepts

**11.1 Descriptive Statistics Review**

**Measures of Central Tendency:**
- **Mean:** Sum/count — affected by outliers
- **Median:** Middle value when sorted — robust to outliers
- **Mode:** Most frequent value — useful for categorical data

**When to use which:**
- Symmetric distribution → mean ≈ median → use mean
- Skewed distribution (incomes, transaction amounts) → mean > median → use median to describe "typical"
- Category frequency → mode

**Nigerian example:** Average Nigerian household income vs median — the mean is pulled up by wealthy households; median is more representative of "typical" Nigerians.

**Measures of Spread:**
- **Range:** Max - Min (sensitive to outliers)
- **IQR:** Q3 - Q1 (robust)
- **Variance:** Average squared deviation from mean
- **Standard Deviation (σ):** Square root of variance — in same units as data
- **Coefficient of Variation (CV):** σ/mean — compare variation across different scales

**11.2 Probability Distributions**

**Normal Distribution:**
- Bell-shaped, symmetric
- 68% of data within ±1σ, 95% within ±2σ, 99.7% within ±3σ
- Applications: exam scores, measurement errors, many natural phenomena

**Skewed Distributions:**
- **Right skew (positive):** Long tail to the right — income, transaction amounts, loan sizes
- **Left skew (negative):** Long tail to the left — age at retirement

**Binomial Distribution:**
- Number of successes in n trials with probability p
- Application: What's the probability that 7 or more of 10 loan applicants default if default rate is 40%?

**Poisson Distribution:**
- Count of rare events in a time/space interval
- Application: Number of transaction disputes per hour at a bank

**11.3 Hypothesis Testing**

**The Framework:**
1. **H₀ (Null Hypothesis):** No difference, no effect
2. **H₁ (Alternative Hypothesis):** There IS a difference/effect
3. **Significance level (α):** Typically 0.05 (5% risk of false positive)
4. **Calculate test statistic**
5. **Compare p-value to α:** If p < α → reject H₀

**t-Test (compare two means):**
```
Business question: "Do Lagos customers spend more than Abuja customers?"
H₀: Mean Lagos spend = Mean Abuja spend
H₁: Mean Lagos spend ≠ Mean Abuja spend
Test: Independent samples t-test
If p < 0.05 → Statistically significant difference
```

**Chi-Square Test (categorical association):**
```
Business question: "Is there a relationship between customer gender and product category preference?"
H₀: Gender and product preference are independent
H₁: There IS a relationship between gender and product preference
Test: Chi-square test of independence
```

**11.4 Correlation and Regression**

**Correlation (Pearson's r):**
- Measures strength and direction of LINEAR relationship between two variables
- r = +1: Perfect positive (as X increases, Y increases)
- r = -1: Perfect negative (as X increases, Y decreases)
- r = 0: No linear relationship (could still be non-linear)

**Correlation ≠ Causation:**
*Famous example:* Ice cream sales and drowning rates are positively correlated — because BOTH increase in summer. Ice cream doesn't cause drowning.

*Nigerian example:* Mobile internet penetration and e-commerce revenue are correlated — both driven by income growth and urbanisation.

**Linear Regression:**
```
Y = β₀ + β₁X₁ + β₂X₂ + ε

Example: Predicting loan default probability
Default (0/1) = f(income, loan_amount, payment_history, employment_status)

Interpretation:
- β₀ = baseline default probability when all predictors = 0
- β₁ = change in default probability for 1-unit increase in income
- R² = proportion of variance in default explained by the model
- p-value < 0.05 = predictor is statistically significant
```

**11.5 Introduction to Machine Learning for Analysts**

**What analysts need to know (without coding):**

**Supervised Learning:**
- **Classification:** Predict a category (default/no default, churn/stay, fraud/genuine)
- **Regression:** Predict a number (loan repayment amount, customer lifetime value)

**Unsupervised Learning:**
- **Clustering:** Group similar customers (K-means clustering for customer segmentation)
- **Dimensionality reduction:** Simplify complex data (PCA)

**The ML Workflow:**
1. Define the prediction problem
2. Prepare the data (clean, feature engineer)
3. Split: Training set (70%), Validation set (15%), Test set (15%)
4. Train the model
5. Evaluate performance (accuracy, precision, recall, AUC-ROC)
6. Deploy and monitor

**Nigerian ML Applications:**
- Flutterwave: Fraud detection using real-time transaction features
- Carbon/Paylater: Credit scoring using alternative data (mobile money, airtime top-up patterns)
- NCDC: Disease outbreak prediction from symptoms and geographic spread
- MTN Nigeria: Churn prediction from usage patterns

---

**11.6 Python for Data Analysis — Core Skills**

Python is the world's most widely used data analysis language. Every leading data analytics certification (Google, IBM, Coursera) and every tier-1 employer (banks, fintechs, consulting firms, NGOs) expects Python fluency. This section introduces the essential Python workflow used by professional data analysts.

**Why Python for Data Analysts?**
- Automates repetitive tasks that would take hours in Excel
- Handles datasets with millions of rows that crash Excel
- Integrates data cleaning, analysis, visualisation, and ML in one environment
- Free, open-source, and runs on any computer including low-spec laptops

**11.6.1 Jupyter Notebook — The Analyst's IDE**

Jupyter Notebook is the standard environment for data analysis. It combines code, visualisations, and written explanation in a single document — perfect for analysis that must be shared and reproduced.

```python
# Install in terminal: pip install jupyter pandas matplotlib numpy
# Launch: jupyter notebook
# Each cell can be: Code (Python) or Markdown (documentation)
# Run a cell: SHIFT + ENTER
```

**Typical Jupyter workflow for a data project:**
1. Import libraries and load data
2. Explore data structure
3. Clean data
4. Analyse and aggregate
5. Visualise findings
6. Write conclusions in Markdown cells

**11.6.2 pandas — Data Manipulation**

pandas is the foundation of Python data analysis. It works with DataFrames — two-dimensional tables with rows and columns (similar to Excel).

```python
import pandas as pd

# Load data
df = pd.read_csv('nigerian_sales_2024.csv')
df = pd.read_excel('bank_transactions.xlsx', sheet_name='Q1')

# First exploration — ALWAYS do these first
df.head()           # First 5 rows
df.tail()           # Last 5 rows
df.shape            # (rows, columns)
df.info()           # Column names, data types, non-null counts
df.describe()       # Statistical summary of numerical columns
df.dtypes           # Data types per column

# Column operations
df['state'].value_counts()          # Frequency count per state
df['amount'].mean()                 # Average transaction amount
df['amount'].median()               # Median (robust to outliers)
df[df['state'] == 'Lagos']          # Filter rows: Lagos only
df[df['amount'] > 100000]           # Filter rows: transactions above ₦100K

# Grouping and aggregation
df.groupby('state')['amount'].sum()       # Total revenue by state
df.groupby('state')['amount'].mean()      # Average by state
df.groupby(['state','month'])['amount'].count()  # Multi-level groupby

# Handling missing values
df.isnull().sum()                   # Count missing values per column
df['age'].fillna(df['age'].median(), inplace=True)   # Impute with median
df.dropna(subset=['customer_id'], inplace=True)       # Drop rows missing key field

# Merging datasets (equivalent to SQL JOIN / Excel VLOOKUP)
merged = pd.merge(df_transactions, df_customers, on='customer_id', how='left')
```

**11.6.3 matplotlib — Data Visualisation**

```python
import matplotlib.pyplot as plt

# Bar chart — sales by region
region_sales = df.groupby('region')['amount'].sum()
plt.figure(figsize=(10, 6))
region_sales.plot(kind='bar', color='#1A6CFF')
plt.title('Total Sales by Region — Q1 2024', fontsize=14)
plt.xlabel('Region')
plt.ylabel('Revenue (₦)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('sales_by_region.png', dpi=150)
plt.show()

# Line chart — monthly trend
monthly = df.groupby('month')['amount'].sum()
plt.figure(figsize=(12, 5))
plt.plot(monthly.index, monthly.values, marker='o', color='#00D4FF', linewidth=2)
plt.title('Monthly Revenue Trend')
plt.xlabel('Month')
plt.ylabel('Revenue (₦)')
plt.grid(True, alpha=0.3)
plt.show()

# Histogram — distribution of transaction amounts
plt.figure(figsize=(10, 5))
plt.hist(df['amount'], bins=50, color='#FFB800', edgecolor='black')
plt.title('Distribution of Transaction Amounts')
plt.xlabel('Amount (₦)')
plt.ylabel('Frequency')
plt.show()

# Scatter plot — relationship between two variables
plt.figure(figsize=(8, 6))
plt.scatter(df['income'], df['spending'], alpha=0.5, color='#1A6CFF')
plt.title('Customer Income vs Spending')
plt.xlabel('Annual Income (₦)')
plt.ylabel('Annual Spending (₦)')
plt.show()
```

**11.6.4 A Complete Mini-Analysis (Nigerian Example)**

```python
import pandas as pd
import matplotlib.pyplot as plt

# Step 1: Load and explore
df = pd.read_csv('nigerian_ecommerce_2024.csv')
print(df.shape)       # How many rows and columns?
print(df.isnull().sum())  # Any missing values?

# Step 2: Clean
df['order_date'] = pd.to_datetime(df['order_date'])
df['month'] = df['order_date'].dt.month
df.dropna(subset=['customer_id', 'amount'], inplace=True)

# Step 3: Analyse
top_states = df.groupby('state')['amount'].sum().sort_values(ascending=False).head(10)
monthly_trend = df.groupby('month')['amount'].sum()
avg_order_by_category = df.groupby('category')['amount'].mean()

# Step 4: Visualise
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

top_states.plot(kind='barh', ax=axes[0], color='#1A6CFF')
axes[0].set_title('Top 10 States by Revenue')
axes[0].set_xlabel('Revenue (₦)')

monthly_trend.plot(kind='line', ax=axes[1], marker='o', color='#00D4FF')
axes[1].set_title('Monthly Revenue Trend')
axes[1].set_xlabel('Month')

plt.tight_layout()
plt.savefig('nigeria_ecommerce_analysis.png', dpi=150)
plt.show()

# Step 5: Export findings
summary = df.groupby('state').agg(
    total_revenue=('amount', 'sum'),
    order_count=('order_id', 'count'),
    avg_order_value=('amount', 'mean')
).round(2)
summary.to_csv('state_summary.csv')
print("Analysis complete. Summary exported.")
```

**Python vs Excel — When to Use Which**

| Task | Excel | Python |
|------|-------|--------|
| Dataset size | Up to ~100K rows reliably | Millions of rows |
| One-off analysis | Faster to set up | Overkill |
| Repeatable/automated | Needs VBA macros | Natural — re-run instantly |
| Visualisation | Good for simple charts | Full control, publication quality |
| Statistical tests | ToolPak handles basics | Full statistical library (scipy) |
| Sharing analysis | .xlsx file | Jupyter Notebook (.ipynb) or PDF export |
| Learning curve | Lower | Moderate investment; high return |

**Professional guidance:** Use Excel for quick, ad hoc analysis and stakeholder-facing tables. Use Python for any analysis you need to repeat, any dataset over 100K rows, and any project requiring advanced statistics or ML.

---

### Labs — Module 11

**Lab 11.1: Statistical Analysis in Excel**
- Tool: Excel Data Analysis ToolPak
- Dataset: Nigerian consumer spending survey (300 respondents)
- Task: Run descriptive statistics, build a histogram, identify distribution shape, run correlation analysis between spending variables, run a t-test comparing male vs female spending
- Deliverable: Statistical analysis report with interpretations

**Lab 11.2: Python Regression Analysis (Jupyter Notebook)**
- Tool: Python (Jupyter Notebook) — primary tool; Excel permitted as fallback if Python not yet installed
- Setup: `pip install pandas matplotlib scipy numpy` then launch `jupyter notebook`
- Dataset: Nigerian state education and economic data (CSV provided by instructor)
- Task: Load data with pandas, check for missing values, run descriptive statistics with `.describe()`, run multiple regression with literacy rate as outcome and predictors: education spending per capita, urban population %, poverty rate, female school enrollment. Use `scipy.stats.pearsonr()` for correlation. Produce a matplotlib chart showing the strongest predictor. Interpret each coefficient in a Markdown cell.
- Deliverable: Jupyter Notebook (.ipynb) with code + written interpretation in Markdown cells

**Lab 11.3: Python Customer Segmentation**
- Tool: Python (Jupyter Notebook) with pandas and matplotlib
- Dataset: Nigerian e-commerce customer data (recency, frequency, monetary) provided as CSV
- Task: Load and explore with pandas. Perform RFM analysis — score each customer 1–5 on each dimension using pandas `pd.cut()`. Create customer segments (Champions, Loyal, At Risk, Lost, New). Produce a bar chart showing segment sizes. Export the final segmented DataFrame to CSV.
- Deliverable: Jupyter Notebook with complete analysis + exported customer_segments.csv

### Assignments — Module 11

1. **Hypothesis Testing Report:** A Nigerian bank wants to know if their new product's churn rate (15%) is significantly different from the industry average (20%). Write up the hypothesis test, calculate the test statistic, and interpret the result.
2. **Regression Model:** Build a regression model predicting house prices in Lagos from: square footage, number of bedrooms, distance to CBD, estate type (mainland/island), and year built. Interpret coefficients and R².
3. **Correlation Analysis (350 words):** Using CBN and NBS data, analyse the correlation between Naira exchange rate and Nigerian inflation rate over the past 10 years. What is the correlation coefficient? Is this causation? What third variables might explain both?
4. **ML Case Study (400 words):** Research Carbon's (Paylater) credit scoring approach using alternative data. What features do they likely use? How is this different from traditional credit scoring? What are the fairness implications?
5. **Statistical Fallacy Identification:** The instructor provides 5 statistical claims from Nigerian media. Identify the fallacy in each: false causation, survivorship bias, cherry-picked data, misleading averages, or base rate neglect.

---

## MODULE 12: ANALYTICS IN PRACTICE & CAPSTONE PROJECT

### Module Learning Objectives
By the end of this module, students will be able to:
- Navigate the full analytics workflow from problem to presentation
- Collaborate on analytics projects in a professional manner
- Communicate analytical findings to non-technical stakeholders
- Apply data ethics to real-world analytics decisions
- Execute and present a comprehensive data analytics capstone project

### Core Concepts

**12.1 The Analytics Workflow in Practice**

Real analytics projects rarely follow a clean sequence. Common realities:
- Stakeholders change their minds about the question mid-project
- The data doesn't contain what you hoped
- "Clean enough" is a judgment call, not a binary
- Initial insights generate more questions
- Final presentation audience changes

**Professional analytics skills beyond tools:**
1. **Stakeholder management:** Aligning on the question before building anything
2. **Scope management:** "Creep" is real — agree on deliverables upfront
3. **Iteration:** First analysis is rarely final analysis
4. **Documentation:** Future you (and colleagues) need to understand past you
5. **Version control:** Save dated versions; use Git for code

**12.2 Communicating to Non-Technical Stakeholders**

The "so what" is more important than the "how":

**Executive audience wants:**
- The bottom line first
- Business impact in ₦/% terms
- 3 options, recommended action, expected outcome
- Clean, minimal slides

**Technical review audience wants:**
- Methodology
- Statistical assumptions and tests
- Data quality assessment
- Limitations and confidence intervals

**The Pyramid Principle (Barbara Minto):**
- Start with the recommendation
- Then support with evidence
- Then provide detail
- Don't build to the conclusion — open with it

**12.3 Data Ethics for Analysts**

**Algorithmic fairness:**
- Does your model perform equally across demographic groups?
- Proxy discrimination: using zip code as a proxy for race in credit decisions
- Disparate impact: seemingly neutral criteria that discriminate in practice

**Privacy:**
- Minimum necessary data: don't collect what you don't need
- Anonymisation: remove identifiers before analysis when possible
- Aggregation: share group-level insights, not individual records
- Re-identification risk: combination of attributes can identify "anonymous" individuals

**Confirmation bias:**
- Analysts can unconsciously seek data that confirms pre-existing beliefs
- Practice: define your hypothesis BEFORE looking at the data
- Challenge your own analysis: "what would prove me wrong?"

**NDPA 2023 in practice:**
- Define purpose before collection
- Data retention policies
- Access controls and audit trails
- User rights: access, correction, deletion

---

## CAPSTONE PROJECT OPTIONS

Students choose ONE option and execute it as a professional analytics deliverable.

---

### OPTION A: BUSINESS INTELLIGENCE DASHBOARD

**Deliverable:** A fully functional Power BI dashboard connected to real or realistic data, with accompanying business report.

**Requirements:**
- Minimum: 2 data tables connected with proper relationships
- Minimum: 8 visualisations across 2 report pages
- Minimum: 5 DAX measures including at least 2 time intelligence measures
- Interactive filters/slicers
- Professional design (brand colours, consistent typography, clear hierarchy)
- 3-page accompanying report: business context, methodology, key findings and recommendations

**Suggested domains:** Retail performance, HR analytics, financial services KPIs, agricultural market analysis, healthcare outcomes

---

### OPTION B: END-TO-END DATA ANALYSIS PROJECT

**Deliverable:** A complete analysis from raw data to business recommendation, presented as a professional report.

**Requirements:**
- Real publicly available dataset (NBS, World Bank, CBN, openAFRICA, or scraping)
- Documented cleaning process with cleaning log
- SQL or Excel analysis with full query/formula documentation
- Minimum 5 charts with design rationale
- Statistical analysis: at least correlation analysis or t-test or regression
- Executive summary, methodology, findings, limitations, recommendations
- Length: 15–20 pages

**Suggested topics:** Nigerian food price inflation drivers, agricultural productivity by state, healthcare outcomes by region, digital financial inclusion gaps, SME lending patterns

---

### OPTION C: PREDICTIVE ANALYTICS MODEL

**Deliverable:** A supervised machine learning model with full analysis and business interpretation.

**Requirements:**
- Python Jupyter Notebook (required — see Module 11.6 for setup and pandas/matplotlib foundations)
- Train/test split with proper evaluation
- Minimum: logistic regression or decision tree model
- Model evaluation: accuracy, precision, recall, confusion matrix
- Feature importance analysis
- Business interpretation: what do the results mean? What action should the business take?

**Suggested problems:** Customer churn prediction, loan default prediction, transaction fraud detection, product recommendation

---

### OPTION D: DATA JOURNALISM PIECE

**Deliverable:** A data-driven article/story with visualisations, publishable quality.

**Requirements:**
- Defined audience and publication (e.g., Techcabal, BusinessDay, Stears)
- 3 original analyses not previously reported
- Minimum 5 data visualisations (Datawrapper or Flourish)
- All data sources cited with methodology note
- Expert quotes or interview (optional but recommended)
- Length: 1,500–2,500 words

**Suggested topics:** State-by-state inequality, Nigerian startup ecosystem funding trends, remittance patterns, food security analysis, regional healthcare disparities

---

### OPTION E: ORGANISATIONAL DATA STRATEGY

**Deliverable:** A comprehensive data strategy document for a real or hypothetical Nigerian organisation.

**Requirements:**
- Current state assessment: what data does the organisation collect? How is it used?
- Gap analysis: what analytics capabilities are missing?
- Recommended tools and infrastructure
- Data governance framework
- KPI framework and measurement plan
- Implementation roadmap (12 months)
- Budget estimate

**Suggested organisations:** State government agency, secondary school group, agricultural cooperative, NGO, SME network

---

### CAPSTONE RUBRIC

| Criterion | Excellent (85–100%) | Good (70–84%) | Satisfactory (55–69%) | Needs Work (<55%) |
|-----------|---------------------|---------------|----------------------|-------------------|
| **Data Quality** | Thorough cleaning; documented; appropriate handling of issues | Good cleaning; most issues handled | Basic cleaning; some issues unaddressed | Dirty data used; no cleaning documented |
| **Analytical Depth** | Multiple techniques; statistical validation; trend analysis | Good analysis; some statistical support | Adequate analysis; descriptive mostly | Surface-level; no analytical depth |
| **Visualisation** | Professional; right chart types; story-driven | Good design; mostly appropriate | Functional; some design issues | Poor design; inappropriate chart types |
| **Nigerian Context** | Deep local insight; specific examples; relevant recommendations | Good context; relevant | Some local context | No Nigerian context |
| **Communication** | Clear, compelling; executive-friendly | Clear; well-organised | Understandable | Confusing; unclear |
| **Technical Accuracy** | All tools used correctly; formulas/queries verified | Minor errors; tools generally correct | Some technical gaps | Significant errors |

**Minimum Pass:** 55% | **Credit:** 70%+ | **Distinction:** 85%+

---

## CERTIFICATION EXAM — DATA ANALYTICS FUNDAMENTALS

**Format:** 3 hours | Pass: 75% | Distinction: 85%
**Prerequisites:** 80% attendance + submitted Capstone + all assignments

---

### SECTION A — MULTIPLE CHOICE (40 marks | 40 questions | 1 mark each)

1. Which type of analytics answers "Why did it happen?" — **Answer: Diagnostic**
2. The NDPA 2023 requires data to be collected for — **Answer: a specified, legitimate purpose**
3. VLOOKUP can only look — **Answer: to the right in the table array**
4. SQL HAVING clause filters — **Answer: grouped results after aggregation**
5. In a normal distribution, approximately what percentage of values fall within one standard deviation of the mean? — **Answer: 68%**

*[Note: Full 40 exam questions are built into each module's review. Exam is assembled by instructor from the question bank, covering 2–4 questions per module.]*

**Questions cover all 12 modules:**
- Modules 1–2: Analytics types, data lifecycle, data quality, NDPA 2023 (6 questions)
- Module 3: Data cleaning, missing data, outliers (4 questions)
- Modules 4–5: Excel functions, pivot tables, Power Query (6 questions)
- Modules 6–7: SQL — SELECT, WHERE, GROUP BY, JOINs, window functions (8 questions)
- Module 8: Visualisation principles, chart selection (4 questions)
- Modules 9–10: Power BI, DAX measures (6 questions)
- Module 11: Statistics, regression, correlation, Python/pandas basics (6 questions)
- Module 12: Analytics communication, ethics (2 questions)

---

### SECTION B — PRACTICAL SKILLS (30 marks | 3 tasks | 10 marks each)

**Task 1 — Data Cleaning (10 marks)**
Instructor provides a 100-row "dirty" Nigerian dataset. Students must:
- Identify and document all quality issues (3 marks)
- Clean the data in Excel (4 marks)
- Write a cleaning methodology summary (3 marks)

**Task 2 — SQL Query Writing (10 marks)**
Students receive a database schema and write:
- 3 SQL queries of increasing complexity (3+3+4 marks)
- Including: a JOIN, a subquery or CTE, and a window function

**Task 3 — Data Visualisation (10 marks)**
Students receive a small dataset and create:
- 2 appropriate visualisations in Excel or Power BI (5 marks)
- Written interpretation of each visualisation (5 marks)

---

### SECTION C — CASE STUDY (20 marks | 2 cases | 10 marks each)

**Case Study 1: Agricultural Lending**
A Nigerian agricultural bank has data showing: 40% of loans in the Northwest go to default compared to 15% in the Southwest. Average loan size is similar. Female borrowers default at 8% vs 28% for male borrowers.

Questions: (a) What additional data would you need to understand this pattern? (3 marks) (b) What analyses would you conduct? (4 marks) (c) What ethical considerations arise if you build a predictive model using this data? (3 marks)

**Case Study 2: E-commerce Performance**
A Lagos-based e-commerce company's Power BI dashboard shows: overall revenue up 12% YoY, but mobile app revenue down 8% while desktop is up 35%. Customer acquisition cost has risen 40%. Returns and refunds increased 22%.

Questions: (a) What hypotheses explain the mobile vs desktop divergence? (3 marks) (b) What is the relationship between rising acquisition cost and overall revenue growth? (3 marks) (c) What recommendations would you make for the next quarter? (4 marks)

---

### SECTION D — ESSAY (10 marks | Choose 1 of 2)

**Essay Option 1:**
"Data analytics is only valuable if organisations have the culture to act on insights." Evaluate this statement with reference to specific Nigerian organisational challenges and opportunities.

**Essay Option 2:**
Critically evaluate the potential of data analytics to improve public service delivery in Nigeria. Use specific examples from healthcare, education, or tax collection. What are the key barriers and how might they be overcome?

---

### GRADING SUMMARY

| Section | Marks | Weight |
|---------|-------|--------|
| Section A — Multiple Choice | 40 | 40% |
| Section B — Practical Skills | 30 | 30% |
| Section C — Case Studies | 20 | 20% |
| Section D — Essay | 10 | 10% |
| **TOTAL** | **100** | **100%** |

**Pass:** 75% | **Distinction:** 85%

---

*MetaBridge Academy — Data Analytics | Curriculum v1.0*
*Reference: Mastering Data Analytics | metabridgeacademy.com*
