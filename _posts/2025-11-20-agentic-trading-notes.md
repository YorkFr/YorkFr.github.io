---
layout: post
title: "Agentic Research Notes For AI Macro Trading"
date: 2025-11-23
categories: [AI, Finance, Macro]
---

The hottest topic in hedge fund circles this fall is “agentic research”: autonomous AI agents that gather macro data, write summaries, and even suggest trades. I spent the past month building a small-scale version tailored to my discretionary macro trading.

## Workflow

1. **Daily Harvest** – Agents scrape FRED, Wind, and various central-bank sites, then normalize everything into parquet files.
2. **Narrative Builder** – A planning agent writes a one-page “state of the world” memo. It references data via retrieval so I can click through to the underlying chart.
3. **Scenario Engine** – Another agent builds three scenarios (“growth surprise”, “soft landing”, “hard landing”) and scores each asset class on expected performance. The scoring is transparent—each bullet links back to a data source.
4. **Human Loop** – I review the memo, edit or discard suggestions, then push chosen scenarios into Notion where I track PnL and execution notes.

## Favorite Features

- **Persistent Memory**: Agents log every assumption. When the ECB changes guidance, the next memo explains what changed and why.
- **Risk Lens**: A Value-at-Risk module runs on each scenario before the agent suggests position sizes. This prevents YOLO trades when volatility spikes.
- **Audit Trail**: Every action is recorded, so I can backtest “What did the AI recommend before CPI prints?”.

## Impact

- Cut research time from ~3 hours per morning to 45 minutes.
- Helped me catch a China PMI beat early, which led to a profitable long CNH trade.
- Still completely under human supervision—the AI assembles context, I make the final trade.

Agentic research feels like having an enthusiastic junior analyst who never sleeps. If you trade macro or crypto, consider automating the grunt work so you can focus on actual risk decisions.
