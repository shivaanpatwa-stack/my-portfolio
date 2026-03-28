"use client";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const FORMSPREE_TOPIC_URL = "https://formspree.io/f/maqpzgba";

// ─── WFJ ARTICLES DATA ───────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    title: "What is Money — History and Purpose",
    date: "27 Oct – 02 Nov 2025",
    week: "Week 01",
    tags: ["Fundamentals", "History"],
    tldr: "Money evolved from barter and commodity systems to modern fiat and digital currency. Its power lies entirely in collective trust.",
    content: `1. Meaning of Money\nMoney is anything commonly accepted as a medium of exchange, a measure of value, a store of wealth, and a standard for future payments. It allows people to buy and sell goods easily instead of trading items directly.\n\n2. Barter System (Before Money)\nBefore money existed, people used the barter system — exchanging goods and services directly. Example: A farmer could trade wheat for cloth. However, this system had major problems: Double coincidence of wants — both people needed to want what the other offered. It was hard to decide how much one thing was worth compared to another. Saving wealth was difficult because goods could spoil or lose value.\n\n3. Origin of Money\nTo make trade easier, early civilisations started using commodity money — items that had value themselves. Examples: Cowrie shells in ancient China and India. Salt and cattle in Africa. Gold and silver coins in Rome and India. These were replaced by metal coins, which lasted longer and had clear value markings. Later, paper money appeared — first in China during the Tang Dynasty (around 7th century CE).\n\n4. Modern Money\nToday, most countries use fiat money, which has value because the government declares it as legal tender. Money today exists in many forms: Coins and notes, Bank deposits, Digital payments like UPI and credit cards, and Cryptocurrencies.\n\n5. Main Functions of Money\n• Medium of Exchange: Helps buy and sell easily without barter.\n• Unit of Account: Allows goods to be priced and compared.\n• Store of Value: Can be saved and used later without losing worth.\n• Standard of Deferred Payment: Used to borrow or lend money.\n\n6. Conclusion\nMoney has evolved from simple trade tools to complex digital systems. Its real strength lies in trust — it only works because people believe in its value.`,
  },
  {
    id: 2,
    title: "Income vs Expense — Saving vs Spending",
    date: "03 Nov – 09 Nov 2025",
    week: "Week 02",
    tags: ["Personal Finance", "Budgeting"],
    tldr: "Real wealth is invisible. The 50-30-20 rule and 'pay yourself first' mindset are the building blocks of financial stability.",
    content: `Quote: "Wealth is what you don't see. It's the cars not bought, the diamonds not purchased, the watches not worn..." — Morgan Housel\n\n1. Meaning of Income\nIncome is the money a person receives. Sources include: Salary or wages, Profit from a business, Pocket money/allowance, Interest from savings, Bonuses or commissions.\n\n2. Meaning of Expense\nAn expense is money spent to buy goods or services. Examples: Food, electricity, transport, School supplies, Subscriptions, Personal spending.\n\n3. Saving vs Spending\nSaving is setting aside money for future use. Spending is using money now for needs or wants. The balance between the two decides long-term financial health.\n\n4. How to Balance Saving and Spending\n• Follow the 50-30-20 rule (Needs–Wants–Savings)\n• Plan a monthly budget\n• Track expenses to avoid overspending\n• Save first, spend later ("Pay yourself first")\n• Delay purchases and ask if it's actually needed\n\n5. Conclusion\nMorgan Housel's quote shows that real wealth is often invisible. The richest people are not the ones who spend the most, but the ones who control their spending and save consistently.`,
  },
  {
    id: 3,
    title: "Interest vs Compounding",
    date: "10 Nov – 16 Nov 2025",
    week: "Week 03",
    tags: ["Investing", "Compounding"],
    tldr: "Compound interest is the 8th wonder of the world. The Rule of 72 tells you exactly how fast your money doubles — and it applies to skills too.",
    content: `1. What is Interest?\nInterest is the extra amount earned on money you invest, or the extra amount paid on money you borrow. It is always calculated as a percentage of your principal.\n\n2. Simple Interest (SI)\nSimple interest is calculated only on the original principal every year. The interest stays the same each year.\nExample: Principal = ₹10,000, Rate = 8%, Time = 3 years → Interest = ₹2,400, Total = ₹12,400\n\n3. Compound Interest (CI)\nCompound interest is interest on interest. Each year, the amount grows because the new principal becomes previous amount + previous interest.\nExample: ₹10,000 at 8% compounded yearly:\nYear 1 → ₹10,800\nYear 2 → ₹11,664\nYear 3 → ₹12,597\n\n4. Rule of 72 (Quick Trick)\nTo estimate how long it takes for money to double: 72 ÷ interest rate (%)\nExample: At 6% compound interest → 72 ÷ 6 = 12 years to double.\n\n5. Compounding Beyond Money\nThe article compares reading to compound interest: Reading one page today doesn't change much. But reading every day for months or years compounds into massive knowledge, better thinking, and better decisions. Tiny improvements repeated daily create long-term transformation.\n\n6. Conclusion\nCompounding rewards time, patience, and consistency. The same idea applies to personal growth: small daily gains compound into big results.`,
  },
  {
    id: 4,
    title: "Inflation — Why Prices Rise",
    date: "17 Nov – 23 Nov 2025",
    week: "Week 04",
    tags: ["Macroeconomics", "Inflation"],
    tldr: "Inflation silently erodes your purchasing power. The RBI fights it by raising interest rates — understanding this is key to protecting your savings.",
    content: `1. What is Inflation?\nInflation is the general increase in prices of goods and services over time. When inflation rises, the same amount of money buys less than before.\nExample: If a chocolate costs ₹10 today and ₹12 next year, that price rise is inflation.\n\n2. Why Does Inflation Happen?\nA. Demand–Pull Inflation: When demand for goods is higher than the supply.\nB. Cost–Push Inflation: When the cost of producing goods increases, companies raise prices.\nC. Built-In Inflation (Wage–Price Spiral): When workers demand higher salaries → companies raise prices → cycle repeats.\n\n3. Good vs Bad Inflation\nMild inflation (2–4%): Shows an economy is growing, encourages spending.\nHigh inflation (6%+): Reduces purchasing power, hurts savings.\nHyperinflation: Example: In Zimbabwe, prices doubled every few days.\n\n4. Role of the Central Bank (RBI in India)\nThe RBI controls inflation by raising/lowering interest rates. Raising rates → borrowing becomes expensive → people spend less → prices cool down.\n\n5. Ways to Protect Yourself From Inflation\n• Save in financial instruments that grow (FDs, mutual funds)\n• Avoid leaving too much money idle as cash\n• Invest early so compounding beats inflation over time`,
  },
  {
    id: 5,
    title: "Banking — Accounts, FDs & How Banks Work",
    date: "24 Nov – 30 Nov 2025",
    week: "Week 05",
    tags: ["Banking", "Fundamentals"],
    tldr: "Banks make money on the spread between deposit rates and loan rates. Knowing your account types and FD options is the first step to making your money work harder.",
    content: `1. What Does a Bank Do?\nBanks are financial institutions that help people manage money safely. Their main functions: Accepting Deposits, Giving Loans, Payments & Transfers, Wealth & Investment Services.\n\n2. Types of Bank Accounts\n• Savings Account: For regular saving and daily use. ATM/UPI access.\n• Current Account: Used by businesses. No limit on transactions.\n• Fixed Deposit (FD): Money locked for a fixed period. Higher interest.\n• Recurring Deposit (RD): Deposit a fixed amount every month.\n\n3. Types of Fixed Deposits\n• Standard FD: Fixed interest rate for a fixed period.\n• Tax-Saving FD: 5-year lock-in. Tax benefits under Section 80C.\n• Senior Citizen FD: Higher interest rate (0.25%–0.75% extra).\n• Flexi FD: Linked to savings account.\n• Cumulative FD: Interest added to principal, paid at maturity.\n• Non-Cumulative FD: Interest paid monthly/quarterly/yearly.\n\n4. Conclusion\nBanks are the backbone of any economy. Understanding accounts and FDs helps choose the best way to grow and protect your money.`,
  },
  {
    id: 6,
    title: "Banking (Continued) — Cards, Loans & EMIs",
    date: "01 Dec – 07 Dec 2025",
    week: "Week 06",
    tags: ["Banking", "Credit", "Loans"],
    tldr: "Debit = your money. Credit = borrowed money. EMI tenure determines total interest paid — shorter is almost always better.",
    content: `1. Debit Card vs Credit Card\nDebit Card: Linked directly to your bank account. No borrowing → no interest.\nCredit Card: Borrow now, pay later. If you delay payment → high interest (24%–40% yearly).\n\n2. Types of Loans\n• Personal Loan: Unsecured. Higher interest.\n• Home Loan: Long repayment (10–30 years). Lower interest.\n• Auto/Vehicle Loan: Vehicle is collateral.\n• Education Loan: EMI starts after studies.\n• Business Loan: For starting or expanding a business.\n• Gold Loan: Quick processing, gold as collateral.\n\n3. EMI\nEMI (Equated Monthly Instalment): Fixed monthly repayment including principal + interest.\nLonger tenure = smaller EMI but more total interest.\nShorter tenure = larger EMI but less interest.\n\n4. Borrowing Responsibly\n✔ Borrow only what you can repay.\n✔ Keep EMIs below 30–40% of monthly income.\n✔ Always pay credit card bill on time.\n✔ Read loan terms carefully.`,
  },
  {
    id: 7,
    title: "Insurance — Protection Before Profit",
    date: "08 Dec – 14 Dec 2025",
    week: "Week 07",
    tags: ["Insurance", "Risk Management"],
    tldr: "Insurance is not an investment — it's a shield. Term insurance is the cheapest and most powerful form of protection for most people.",
    content: `1. What is Insurance?\nInsurance is a financial safety tool where you pay a small premium so the insurance company protects you from big financial losses.\n\n2. Kinds of Insurance\n• Life Insurance: Term Insurance (cheapest, only protection), Whole Life/ULIPs (insurance + savings).\n• Health Insurance: Covers hospital bills, surgeries, and medicines.\n• Motor Insurance: Third-Party (mandatory) + Comprehensive coverage.\n• Home Insurance: Covers fire, theft, natural disasters.\n• Travel Insurance: Trip cancellation, lost luggage, medical emergencies.\n\n3. Big Insurance Companies in India\n• LIC: Government-owned, most trusted, strong in traditional plans.\n• SBI Life, HDFC Life, ICICI Prudential: Fast claim settlement, digital services.\n• Private General Insurers (Bajaj Allianz, Tata AIG): Competitive premiums, flexible products.\n\n4. IRDAI\nInsurance Regulatory and Development Authority of India — regulates all insurance companies, ensures fair pricing and consumer protection.`,
  },
  {
    id: 8,
    title: "Taxes — Direct, Indirect & Why They Matter",
    date: "15 Dec – 21 Dec 2025",
    week: "Week 08",
    tags: ["Taxes", "Government", "Finance"],
    tldr: "Direct taxes hit your income. Indirect taxes hit your spending. GST is embedded in almost everything you buy — knowing the slabs helps you understand real costs.",
    content: `1. What are Taxes?\nTaxes are compulsory payments made by individuals and businesses to the government to fund public services.\n\n2. Direct Taxes\nPaid directly by individuals or organizations.\n• Income Tax: Tax on income earned.\n• Corporate Tax: Tax paid by companies on profits.\n• Capital Gains Tax: Tax on profit from selling assets.\nIncome Tax Slabs: Rates usually range from 5% to 30% depending on income.\n\n3. Indirect Taxes (GST)\nCollected through sellers but paid by consumers.\nGST Slabs: 0% (essential goods), 5% (daily items), 12% & 18% (most goods), 28% (luxury).\n\n4. Income Tax Return (ITR)\nA form submitted showing income earned, tax paid, and tax due.\nWhy it matters: Legal proof of income, helps in loans and visas, allows refund if extra tax was paid.\nDeadline: Usually 31st July for individuals.\n\n5. Conclusion\nUnderstanding taxes helps people become financially responsible citizens and plan income and spending better.`,
  },
  {
    id: 9,
    title: "Emergency Fund — Your Financial Safety Net",
    date: "22 Dec – 28 Dec 2025",
    week: "Week 09",
    tags: ["Personal Finance", "Safety Net"],
    tldr: "3-6 months of expenses in a liquid account. Not for shopping. Not for travel. Only for emergencies. Build it before you invest.",
    content: `1. What is an Emergency Fund?\nAn emergency fund is money set aside specifically for unexpected situations — medical emergencies, job loss, urgent repairs. It is your financial safety net.\n\n2. Why It Matters\n• Prevents taking loans during emergencies\n• Reduces stress\n• Protects long-term savings and investments\n• Gives financial independence\n\n3. How Much Should It Be?\nGeneral Rule: 3 to 6 months of essential expenses.\nExample: Monthly expenses = ₹20,000 → Emergency fund = ₹60,000 to ₹1,20,000.\n\n4. By Age Group\n• Teenagers: ₹5,000–₹20,000 in savings account. Build the habit.\n• Young Adults: 3–6 months expenses. Automate monthly savings.\n• Middle Age: 6–9 months due to family responsibilities.\n• Senior Citizens: Focus on safety, liquidity, and peace of mind.\n\n5. Where to Keep It\n• Savings account\n• Liquid mutual funds\n• Short-term fixed deposits\nAvoid stocks or risky investments for this fund.`,
  },
  {
    id: 10,
    title: "Mutual Funds — SIP, SWP & Smart Investing",
    date: "29 Dec 2025 – 03 Jan 2026",
    week: "Week 10",
    tags: ["Investing", "Mutual Funds", "SIP"],
    tldr: "SIP is the most powerful tool for retail investors. Index funds beat most active funds over time — and they charge you 10x less in fees.",
    content: `1. What are Mutual Funds?\nA mutual fund pools money from many investors and invests it in stocks, bonds, or other assets, managed by professional fund managers.\n\n2. Types of Mutual Funds\n• Equity MFs: Higher risk, higher return. Long-term goals.\n• Debt MFs: Lower risk, stable returns. Short to medium-term.\n• Hybrid MFs: Mix of equity and debt.\n• Index Funds: Track NIFTY 50. Low cost.\n• ELSS: Tax-saving funds with 3-year lock-in.\n• Sector Funds: Invest in specific sectors (IT, Pharma).\n\n3. SIP (Systematic Investment Plan)\nInvest a fixed amount regularly (monthly). Benefits: builds discipline, reduces risk through rupee-cost averaging, makes investing affordable.\n\n4. Average 10-Year Returns\n• Equity MFs: ~10–14% per year\n• Index Funds: ~10–12% per year\n• Hybrid Funds: ~8–10% per year\n• Debt MFs: ~5–7% per year\n\n5. Expense Ratio\nAnnual fee charged by the fund. Even a 1% higher fee can reduce final wealth significantly over long periods.\n\n6. Mutual Funds vs PMS\nMutual funds are for most people — low minimum investment, highly regulated, diversified. PMS is for wealthy investors with high minimums and more concentrated portfolios.`,
  },
  {
    id: 11,
    title: "Risk vs Reward — Understanding Volatility",
    date: "05 Jan – 11 Jan 2026",
    week: "Week 11",
    tags: ["Investing", "Risk", "Volatility"],
    tldr: "Volatility ≠ risk. Volatility is short-term noise. Risk is permanent loss. Patient investors profit from the panic of impatient ones.",
    content: `1. Meaning of Risk in Finance\nRisk is the possibility that the actual return on an investment may be lower than expected. Every investment carries some level of risk.\n\n2. Risk–Reward Relationship\nLow risk → low but stable returns. High risk → high potential returns but higher chance of loss.\n\n3. What is Volatility?\nVolatility is the degree of price fluctuation of an investment over time. Stock prices changing daily = high volatility. Fixed deposits staying constant = low volatility.\n\n4. Volatility vs Actual Risk (Key Difference)\nVolatility: Short-term ups and downs in price.\nRisk: Permanent loss of capital.\nAn investment can be volatile in the short term but still safe in the long term if fundamentals are strong.\n\n5. Managing Risk Smartly\n• Diversification: Spread money across different assets\n• Long-term investing: Time reduces the impact of volatility\n• Goal-based investing: Match risk level to financial goals\n• Emotional control: Avoid decisions based on fear or greed\n\n6. Conclusion\nVolatility hurts impatient investors but benefits patient ones. Good investors manage risk instead of avoiding it completely.`,
  },
  {
    id: 12,
    title: "How the Indian Stock Market Works",
    date: "12 Jan – 18 Jan 2026",
    week: "Week 12",
    tags: ["Stock Market", "India", "Investing"],
    tldr: "NSE & BSE are just the venues. SEBI is the referee. CDSL/NSDL are the vaults. Brokers are your gateway. Know all the players before you play.",
    content: `1. What is the Stock Market?\nThe stock market is a platform where shares of companies are bought and sold. It helps companies raise money and allows investors to grow wealth.\n\n2. NSE & BSE\nNSE (National Stock Exchange): India's largest by volume. NIFTY 50 index.\nBSE (Bombay Stock Exchange): Asia's oldest. SENSEX index.\n\n3. SEBI (Market Regulator)\nSEBI – Securities and Exchange Board of India. Regulates the market, protects investors, prevents fraud and insider trading.\n\n4. CDSL & NSDL (Depositories)\nShares are held in demat (digital) form. NSDL and CDSL store shares electronically and transfer ownership when trades happen. Think of them as banks for shares.\n\n5. Brokers\nBrokers act as middlemen between investors and stock exchanges. Examples: Zerodha, Groww, Angel One, ICICI Direct.\n\n6. Simple Flow\nInvestor → Broker → Stock Exchange (NSE/BSE)\nShares stored in → CDSL / NSDL\nMarket regulated by → SEBI\nCompanies raise money → Investors earn returns`,
  },
  {
    id: 13,
    title: "Basics of Macroeconomics",
    date: "19 Jan – 25 Jan 2026",
    week: "Week 13",
    tags: ["Macroeconomics", "GDP", "Policy"],
    tldr: "GDP measures an economy's size. Inflation measures its heat. Interest rates are the thermostat. Oil is India's Achilles heel.",
    content: `1. What is Macroeconomics?\nMacroeconomics studies the overall economy of a country — growth, prices, income, employment, and government policies.\n\n2. Inflation & Deflation\nInflation: General rise in prices. Reduces purchasing power. Moderate inflation is normal.\nDeflation: General fall in prices. Harmful if prolonged.\n\n3. Interest Rates\nSet mainly by RBI (Repo Rate). High rates → loans expensive → spending reduces. Low rates → borrowing increases → spending rises.\n\n4. GDP & Nominal GDP\nGDP: Total value of all goods and services produced in a country. Nominal GDP: GDP at current market prices. Real GDP: Adjusted for inflation.\n\n5. Fiscal Deficit vs Fiscal Surplus\nFiscal Deficit: Government spending > Government income. Government borrows to fill the gap.\nFiscal Surplus: Government income > Government spending. Rare in developing countries.\n\n6. Oil Prices & India\nIndia imports most of its crude oil. When oil prices rise: import bill increases, inflation rises, rupee weakens.`,
  },
  {
    id: 14,
    title: "Behavioural Finance — Why We Make Bad Decisions",
    date: "02 Feb – 08 Feb 2026",
    week: "Week 14",
    tags: ["Behavioural Finance", "Psychology", "Investing"],
    tldr: "Fear makes you sell at the bottom. Greed makes you buy at the top. Herd mentality makes you do both. Know your biases before the market exploits them.",
    content: `1. What is Behavioural Finance?\nBehavioural finance studies how human emotions and psychological biases affect financial decisions.\n\n2. Emotions & Investing\nFear: Causes panic selling during market falls.\nGreed: Leads to chasing high returns, buying overpriced assets.\nRegret: Fear of making wrong decisions, leads to hesitation.\n\n3. Common Behavioral Biases\n• Herd Mentality: Following what others do. Leads to bubbles and crashes.\n• Confirmation Bias: Seeking information that supports existing beliefs.\n• Loss Aversion: Losses hurt more than gains feel good.\n• Anchoring: Relying too much on first information (like buy price).\n• Overconfidence Bias: Belief that one can predict markets accurately.\n• Sunk Cost Fallacy: Continuing an investment just because money is already spent.\n\n4. How to Control Biases\n• Follow a long-term investment plan\n• Avoid reacting to short-term movements\n• Use diversification to reduce emotional risk\n• Make decisions based on data, not emotions`,
  },
  {
    id: 15,
    title: "Investing Fundamentals — Shares, Prices & Allocation",
    date: "09 Feb – 15 Feb 2026",
    week: "Week 15",
    tags: ["Investing", "Stocks", "Fundamentals"],
    tldr: "A share is part-ownership in a business. Prices move on demand and supply. Asset allocation is the fruit salad principle — variety reduces risk.",
    content: `1. What is a Share?\nA share represents ownership in a company. When you buy a share, you become a part-owner and may benefit through price appreciation and dividends.\n\n2. How Stock Prices Move\nStock prices are decided by demand and supply. If more people want to buy → price goes up. If more people want to sell → price goes down.\nInfluenced by: Company earnings, news, investor emotions.\n\n3. Time Value of Money\nMoney today is worth more than money in the future because it can grow. The earlier you invest, the stronger compounding works.\n\n4. Asset Allocation — The Fruit Salad Principle\nSpread investments across different asset classes:\n• Equity for growth\n• Debt for stability\n• Gold or cash for safety\n\n5. Importance of Long-Term Investing\nMarkets fluctuate short-term, but long-term investing: reduces impact of volatility, allows compounding to work fully, builds disciplined wealth over time.`,
  },
  {
    id: 16,
    title: "Understanding Companies — P&L, Balance Sheet & Cash Flow",
    date: "16 Feb – 01 Mar 2026",
    week: "Week 16",
    tags: ["Companies", "Financial Statements", "Analysis"],
    tldr: "Revenue minus costs = profit. Assets minus liabilities = equity. But cash flow is the real truth — a company can look profitable while running out of cash.",
    content: `1. What is a Company?\nA company is a legal business entity formed to provide goods or services. When you invest in shares, you are investing in the business performance.\n\n2. Profit & Loss Statement (P&L)\nRevenue: Total income from selling products or services.\nCosts/Expenses: Money spent to run the business.\nProfit = Revenue – Costs.\n\n3. Balance Sheet\nAssets: What the company owns (cash, machinery, buildings).\nLiabilities: What the company owes (loans, borrowings).\nOwner's Equity = Assets – Liabilities.\n\n4. Cash Flow\nCash flow refers to the actual movement of cash in and out of a business. A company may show profits but still face cash shortages if money is not actually received.\nOperating, Investing, and Financing activities.\n\n5. Moat & Competitive Advantage\nA moat is the long-term competitive advantage that protects a company from competitors. Types: Strong brand, cost advantages, patents, network effects.\n\n6. Conclusion\nCash flow reveals real financial strength. Moats explain how a company protects its market position. Together, they help identify sustainable businesses.`,
  },
  {
    id: 17,
    title: "P/E Ratio & Valuation — What Are You Actually Paying For?",
    date: "23 Mar – 29 Mar 2026",
    week: "Week 17",
    tags: ["Fundamentals", "Valuation"],
    tldr: "P/E ratio shows how much you're paying per rupee of earnings — but the real skill is understanding why a company's P/E is what it is.",
    content: `1. What is Valuation?\nValuation means understanding how much a company is actually worth relative to what the market is charging for it. Share prices reflect what investors believe the company will earn and grow into in the future. A stock can be cheap (market underestimates it), fairly priced, or expensive (market is too optimistic). Prices depend on current profits, expected future growth, risk in the business, and investor confidence.\n\n2. What is EPS?\nEPS = Earnings Per Share.\nFormula: Total Profit ÷ Total Shares Outstanding.\nEPS tells you how much profit the company earns for every single share.\nReal example — SBI: EPS (FY2024–25) = ₹86.91 per share.\n\n3. What is P/E Ratio?\nP/E = Share Price ÷ EPS.\nIt shows how much you are paying for ₹1 of the company's earnings.\nReal example — SBI (25 March 2026): Share price ≈ ₹1,060, EPS ≈ ₹86.91, P/E ≈ 11.\nThis means investors are paying ₹11 for every ₹1 of SBI's profit.\n\n4. What Does a High P/E Mean?\nA high P/E means investors expect strong future growth. Companies with high P/E often have strong brand or moat, limited competition, high profit margins, and reliable future growth. But high P/E can also mean overvaluation.\nReal example — CDSL (25 March 2026): Share price ≈ ₹1,213, P/E ≈ 50, P/B ≈ 13.6.\nInvestors pay ₹50 for every ₹1 CDSL earns — the market believes CDSL will grow strongly as one of only two depositories in India, a near monopoly.\n\n5. What Does a Low P/E Mean?\nA low P/E means you are paying less per rupee of earnings — usually because growth is slower, risk is higher, or the business is more regulated. But low P/E is not always bad — sometimes the market is too pessimistic about a fundamentally strong company.\nReal example — SBI: P/E ≈ 11, P/B ≈ 1.69. India's largest bank, highly profitable, but government-run with slower growth.\n\n6. When P/E Doesn't Work\nNetwork18 is currently making a loss, meaning its P/E ratio is negative. P/E only works when a company is profitable. For loss-making companies, you need other tools.\nNetwork18 (March 2026): Share price ≈ ₹33–43, P/E = Negative, P/B ≈ 1.3.\n\n7. Comparing All Three\nThe P/E difference between SBI and CDSL is roughly 4.5x because the market expects CDSL to grow far faster.\n• SBI → P/E ~11, P/B 1.69, stable slow growth.\n• CDSL → P/E ~50, P/B 13.6, high growth expected, near-monopoly.\n• Network18 → P/E Negative, P/B ~1.3, currently loss-making.\n\n8. Which Company Has the Most Hope Priced In?\nCDSL clearly has the most hope priced in at P/E ~50. SBI at P/E ~11 has very little hope priced in. Network18 is in a different category — the market is paying for the possibility of a turnaround, not current earnings.\nThe question every investor must ask: Is the amount of hope I am paying for actually justified by the business?\n\n9. Common Mistakes with P/E\n• Comparing P/E across different industries.\n• Assuming low P/E = cheap.\n• Assuming high P/E = overpriced.\n• Using P/E for loss-making companies.\n• Not checking the quality of earnings behind the number.\n\nConclusion\nP/E ratio is one of the most important tools in an investor's toolkit, but it only tells one part of the story. SBI, CDSL, and Network18 show how differently the market values three companies based on growth, risk, competition, and profitability. A smart investor doesn't just look at the number — they ask why it is what it is, and whether the market's expectations are realistic. Am I paying for what this company earns today — or for what I hope it becomes tomorrow?`,
  },
];

// ─── SEARCH ENGINE ────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "what", "is", "the", "a", "an", "how", "does", "do", "why", "when",
  "where", "which", "who", "can", "could", "should", "would", "will",
  "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "i", "me", "my", "we", "our", "you", "your", "it", "its", "they",
  "them", "their", "this", "that", "these", "those", "and", "or", "but",
  "in", "on", "at", "to", "for", "of", "with", "by", "from", "about",
  "as", "into", "tell", "explain", "describe", "give", "please",
  "define", "mean", "means", "like", "some", "any", "all", "also",
  "between", "more", "most", "than", "then", "just", "very", "really",
  "get", "got", "let", "put", "use", "used", "make", "made", "work",
]);

function extractKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function searchWFJ(query: string): string {
  const keywords = extractKeywords(query);

  if (keywords.length === 0) {
    return "Could you be more specific? Try asking about topics like inflation, compound interest, mutual funds, or the Rule of 72.";
  }

  type Result = { article: typeof ARTICLES[0]; score: number; sections: string[] };
  const results: Result[] = [];

  for (const article of ARTICLES) {
    let score = 0;
    const matchedSections: string[] = [];

    score += keywords.filter((k) => article.title.toLowerCase().includes(k)).length * 5;
    score += keywords.filter((k) => article.tags.join(" ").toLowerCase().includes(k)).length * 4;
    score += keywords.filter((k) => article.tldr.toLowerCase().includes(k)).length * 3;

    const sections = article.content.split("\n\n").filter((s) => s.trim().length > 20);
    for (const section of sections) {
      const matches = keywords.filter((k) => section.toLowerCase().includes(k)).length;
      if (matches > 0) {
        score += matches * 2;
        matchedSections.push(section.trim());
      }
    }

    if (score > 0) {
      const sortedSections = matchedSections
        .map((s) => ({ s, count: keywords.filter((k) => s.toLowerCase().includes(k)).length }))
        .sort((a, b) => b.count - a.count)
        .map((x) => x.s)
        .slice(0, 2);
      results.push({ article, score, sections: sortedSections });
    }
  }

  if (results.length === 0) {
    return "That topic hasn't been covered yet in the WFJ. Check back when Shivaan writes about it!";
  }

  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, 2);

  if (top.length === 1) {
    const { article, sections } = top[0];
    const parts: string[] = [`From ${article.week} · "${article.title}"\n`];
    if (sections.length > 0) {
      parts.push(...sections);
    }
    parts.push(`\nTL;DR: ${article.tldr}`);
    return parts.join("\n\n");
  }

  const lines: string[] = [`Found relevant content across ${top.length} WFJ articles:\n`];
  for (const { article, sections } of top) {
    lines.push(`── ${article.week} · "${article.title}"`);
    const best = sections[0] ?? article.tldr;
    lines.push(best.length > 220 ? best.slice(0, 220).trimEnd() + "..." : best);
    lines.push("");
  }
  return lines.join("\n").trim();
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function FinanceLab() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<"wfj" | "ai">("wfj");
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [requestTopic, setRequestTopic] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Welcome to Finance Sensei. I search through all of Shivaan's WFJ articles to find answers. Ask me about any finance topic — inflation, compounding, mutual funds, taxes, and more." }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [tickerData, setTickerData] = useState<{ id: string; label: string; price: number; changePercent: number }[]>([]);

  const aiChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (selectedArticle) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, -parseInt(top));
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, -parseInt(top));
    };
  }, [selectedArticle]);

  // Scroll AI chat
  useEffect(() => {
    if (aiChatRef.current) aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
  }, [aiMessages]);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch("/api/market");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setTickerData(data);
      } catch {}
    };
    fetchTicker();
    const interval = setInterval(fetchTicker, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sp-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("sp-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const formatTickerPrice = (price: number, id: string) => {
    const num = price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return ["^GSPC", "^IXIC", "^NSEI"].includes(id) ? num : `$${num}`;
  };

  const sendAiMessage = () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiInput("");
    setAiMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setAiLoading(true);
    setTimeout(() => {
      const reply = searchWFJ(userMsg);
      setAiMessages(prev => [...prev, { role: "ai", text: reply }]);
      setAiLoading(false);
    }, 500);
  };

  const submitRequest = async () => {
    const topic = requestTopic.trim();
    if (!topic || requestSubmitting) return;
    setRequestSubmitting(true);
    setRequestError(null);
    try {
      const res = await fetch(FORMSPREE_TOPIC_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          _subject: "WFJ topic request (Finance Lab)",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data === "object" && data && "error" in data
            ? String((data as { error?: string }).error)
            : "Submit failed"
        );
      }
      setRequestSubmitted(true);
      setRequestTopic("");
      setTimeout(() => setRequestSubmitted(false), 5000);
    } catch {
      setRequestError("Could not submit. Please try again.");
    } finally {
      setRequestSubmitting(false);
    }
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1a6fff; border-radius: 2px; }

        .nav-tab {
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
          background: transparent;
          color: var(--text-muted);
        }
        .nav-tab:hover { color: var(--text); border-color: var(--border-2); }
        .nav-tab.active { background: var(--bg-elevated2); color: #1a6fff; border-color: #1a6fff44; }

        .article-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--bg-elevated2);
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 8px;
        }
        .article-row:hover { background: var(--bg-elevated); }

        .tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          background: var(--bg-icon);
          color: #1a6fff;
          border: 1px solid #1a6fff22;
        }

        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.85);
          z-index: 9999; display: flex;
          align-items: center; justify-content: center;
          padding: 1rem; backdrop-filter: blur(12px);
          overflow-y: auto;
        }
        .modal {
          position: relative; width: 100%; max-width: 600px;
          max-height: 85vh; overflow-y: auto; margin: auto;
          background: var(--bg-elevated); border: 1px solid var(--border-2);
          border-radius: 20px; padding: 2.5rem;
        }

        .ai-bubble-user {
          background: #1a6fff;
          color: #fff;
          border-radius: 12px 12px 2px 12px;
          padding: 0.75rem 1rem;
          font-size: 0.88rem;
          max-width: 80%;
          align-self: flex-end;
          line-height: 1.6;
        }
        .ai-bubble-ai {
          background: var(--bg-elevated);
          border: 1px solid var(--border-2);
          color: var(--text-sec);
          border-radius: 12px 12px 12px 2px;
          padding: 0.75rem 1rem;
          font-size: 0.88rem;
          max-width: 85%;
          align-self: flex-start;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 45s linear infinite;
          align-items: center;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.75rem;
          border-right: 1px solid var(--bg-elevated);
          white-space: nowrap;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.02em;
        }
        .ticker-label { color: var(--text-muted); font-weight: 500; letter-spacing: 0.08em; }
        .ticker-price { color: var(--text-sec); font-weight: 400; }
        .ticker-up { color: #00c853; }
        .ticker-dn { color: #ff3d3d; }

        .input-field {
          background: var(--bg-elevated);
          border: 1px solid var(--border-2);
          border-radius: 8px;
          color: var(--text);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #1a6fff; }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .cta-primary { background: #1a6fff; color: #fff; }
        .cta-primary:hover { background: #2d7dff; transform: translateY(-1px); }
        .cta-secondary { background: var(--bg-elevated); color: var(--text-sec); border: 1px solid var(--border-2); }
        .cta-secondary:hover { border-color: #1a6fff44; color: var(--text); }

        .section-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a6fff;
          display: block;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .finance-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
            padding: 1.25rem 1rem !important;
          }

          .modal {
            max-width: 100% !important;
            max-height: 90vh !important;
            border-radius: 16px !important;
            padding: 1.25rem !important;
          }

          .ai-chat-box {
            height: 280px !important;
          }

          .form-row {
            flex-direction: column;
          }
          .form-row .cta-btn {
            width: 100%;
            min-height: 44px;
          }
          .form-row .input-field {
            width: 100%;
          }

          .article-row {
            gap: 0.75rem;
            padding: 0.875rem 0.75rem;
          }

          .nav-tab {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }

          .cta-btn {
            min-height: 44px;
          }
        }

        @media (max-width: 480px) {
          .content-wrap {
            padding: 1.25rem 0.875rem !important;
          }

          .article-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--bg-primary); z-index: 999;
          display: flex; flex-direction: column; align-items: center;
          justify-content: flex-start; padding-top: 5rem; gap: 2rem;
          backdrop-filter: blur(16px);
        }
        .mobile-nav-link {
          font-family: 'Playfair Display', serif; font-size: 2rem;
          color: var(--text); text-decoration: none; transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #1a6fff; }
      `}</style>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "var(--text)", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {[["Finance Lab", "/finance"], ["MUN Arena", "/mun"], ["Experience", "/experience"], ["The Passport", "/passport"], ["Connect", "/connect"]].map(([label, href]) => (
            <a key={label} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}

      {/* HEADER */}
      <div className="finance-header" style={{ borderBottom: "1px solid var(--border)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <a href="/" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "none", letterSpacing: "0.08em" }}>← SP.</a>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 900, marginTop: "0.25rem" }}>
            The Finance <span style={{ color: "#1a6fff" }}>Lab</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          {(["wfj", "ai"] as const).map(s => (
            <button key={s} className={`nav-tab ${activeSection === s ? "active" : ""}`} onClick={() => setActiveSection(s)}>
              {s === "wfj" ? "📰 WFJ" : "🤖 Sensei"}
            </button>
          ))}
          <a href="/connect" style={{ display: "inline-flex", alignItems: "center", padding: "0.6rem 1.4rem", background: "#1a6fff", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", flexShrink: 0 }}>Contact</a>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, transition: "all 0.2s" }}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }} aria-label="Open menu">☰</button>
        </div>
      </div>

      {/* MARKET TICKER */}
      <div style={{ borderBottom: "1px solid var(--bg-elevated)", background: "var(--bg-primary)", overflow: "hidden", height: 36, display: "flex", alignItems: "center" }}>
        {tickerData.length > 0 ? (
          <div className="ticker-track">
            {[...tickerData, ...tickerData].map((item, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-label">{item.label}</span>
                <span className="ticker-price">{formatTickerPrice(item.price, item.id)}</span>
                <span className={item.changePercent >= 0 ? "ticker-up" : "ticker-dn"}>
                  {item.changePercent >= 0 ? "▲" : "▼"} {Math.abs(item.changePercent).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        ) : (
          <span style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", padding: "0 1.5rem", letterSpacing: "0.08em" }}>
            FETCHING MARKET DATA...
          </span>
        )}
      </div>

      <div className="content-wrap" style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>

        {/* ── SECTION: WFJ ── */}
        {activeSection === "wfj" && (
          <div>
            <span className="section-tag">Weekly Finance Journal</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              {ARTICLES.length} Articles Published
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "2rem" }}>Click any article to read in full.</p>

            <div style={{ marginBottom: "3rem" }}>
              {ARTICLES.map((a) => (
                <div key={a.id} className="article-row" onClick={() => setSelectedArticle(a)}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#1a6fff", minWidth: 60 }}>{a.week}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{a.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>{a.date}</div>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {a.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                  <div style={{ color: "#1a6fff", fontSize: "1.2rem" }}>→</div>
                </div>
              ))}
            </div>

            {/* Topic Request */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem" }}>
              <span className="section-tag">Community</span>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Request a Topic</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>What finance topic do you want Shivaan to cover next?</p>
              <div className="form-row" style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  className="input-field"
                  style={{ flex: 1 }}
                  placeholder="e.g. Cryptocurrency, Real Estate investing..."
                  value={requestTopic}
                  onChange={e => setRequestTopic(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && void submitRequest()}
                />
                <button
                  className="cta-btn cta-primary"
                  onClick={() => void submitRequest()}
                  disabled={requestSubmitting}
                >
                  {requestSubmitting ? "Sending…" : "Submit"}
                </button>
              </div>
              {requestError && (
                <p style={{ color: "#ff3d3d", fontSize: "0.82rem", marginTop: "0.75rem" }}>{requestError}</p>
              )}
              {requestSubmitted && (
                <p style={{ color: "#00c853", fontSize: "0.82rem", marginTop: "0.75rem" }}>✓ Request submitted! Shivaan will consider it for a future WFJ.</p>
              )}
            </div>
          </div>
        )}

        {/* ── SECTION: AI ── */}
        {activeSection === "ai" && (
          <div>
            <span className="section-tag">AI Assistant</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Finance Sensei</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Trained exclusively on Shivaan's WFJ articles. Ask about anything covered in the journal.
            </p>

            <div ref={aiChatRef} className="ai-chat-box" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", height: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
              {aiMessages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "ai-bubble-user" : "ai-bubble-ai"}>{m.text}</div>
              ))}
              {aiLoading && <div className="ai-bubble-ai" style={{ color: "#1a6fff" }}>Thinking...</div>}
            </div>

            <div className="form-row" style={{ display: "flex", gap: "0.75rem" }}>
              <input
                className="input-field"
                style={{ flex: 1 }}
                placeholder="Ask about inflation, compounding, mutual funds..."
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendAiMessage()}
              />
              <button className="cta-btn cta-primary" onClick={sendAiMessage} disabled={aiLoading}>Send</button>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
              {["What is compound interest?", "Explain the Rule of 72", "What is a moat?", "How does inflation affect savings?"].map(q => (
                <button key={q} className="cta-btn cta-secondary" style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem" }}
                  onClick={() => { setAiInput(q); }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ARTICLE MODAL */}
      {mounted && selectedArticle && ReactDOM.createPortal(
        <div onClick={() => setSelectedArticle(null)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)", zIndex: 9999, padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", background: "var(--bg-elevated)", border: "1px solid var(--border-2)", borderRadius: "24px", width: "100%", maxWidth: "580px", maxHeight: "85vh", overflowY: "auto", flexShrink: 0, padding: "2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#1a6fff", marginBottom: "0.5rem" }}>{selectedArticle.week} · {selectedArticle.date}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.3 }}>{selectedArticle.title}</h2>
              </div>
              <button onClick={() => setSelectedArticle(null)} style={{ background: "none", border: "1px solid var(--border-2)", color: "var(--text-sec)", cursor: "pointer", borderRadius: "8px", padding: "0.4rem 0.75rem", fontSize: "0.9rem" }}>✕</button>
            </div>

            <div style={{ background: "var(--bg-secondary)", border: "1px solid #1a6fff22", borderRadius: "10px", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>TL;DR</div>
              <p style={{ color: "var(--text-sec)", fontSize: "0.9rem", lineHeight: 1.6, fontStyle: "italic" }}>{selectedArticle.tldr}</p>
            </div>

            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {selectedArticle.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div style={{ color: "var(--text-sec)", fontSize: "0.9rem", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{selectedArticle.content}</div>
          </div>
        </div>
      , document.body)}
    </main>
  );
}
