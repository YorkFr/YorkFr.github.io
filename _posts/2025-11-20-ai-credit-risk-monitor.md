---
layout: post
title: "AI Credit Risk Monitor For Private Credit Funds"
date: 2025-11-20
categories: [AI, Finance]
---

Private credit has grown into a trillion-dollar asset class, yet risk reporting is still dominated by quarterly PDFs. I built an AI credit monitor for a friend’s fund that ingests unstructured data and surfaces daily red flags.

## Architecture

1. **Document Intake** – Bank statements, management reports, and covenant packages arrive as PDFs or emails. An Azure Function saves them in blob storage and triggers an OCR/LangChain pipeline.
2. **Entity Extraction** – A fine-tuned instruct model reads each document and tags: borrower, facility, KPI, covenant threshold, reported value, and sentiment.
3. **Vector Store** – Every extracted sentence is embedded and stored with metadata so analysts can run similarity queries, e.g., “show recent mentions of customer churn > 10%”.
4. **Alert Layer** – A rules engine compares reported metrics with covenant levels. When breaches occur, the system writes a ticket in Linear and includes the relevant paragraphs plus a numeric summary.

## Why It Works

- **Speed**: Hours of manual reading are replaced with a daily summary delivered before markets open.
- **Memory**: Vector search means we can compare the latest borrower update against anything said in the last two years.
- **Explainability**: We attach the raw text snippet to each alert so the investment committee can fact-check instantly.

## Lessons Learned

- OCR quality still matters. We invested in a solid scan workflow and trained the model to ignore letterheads and signatures.
- Analysts love chat-style interfaces. We exposed the vector store via a simple chat widget so they can ask “How is Borrower X tracking on EBITDA?” and get an answer plus citations.
- Governance is key: every AI-generated ticket enters the same workflow as human-generated ones so compliance can audit decisions.

This system didn’t require a massive team—just careful prompt design, repeatable data ingestion, and a focus on the analysts’ pain points.
