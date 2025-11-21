---
layout: post
title: "Using AI To Rebalance A Personal Portfolio"
date: 2025-11-20
categories: [AI, Finance]
---

For years I managed my own investments with spreadsheets and intuition. Recently I started experimenting with a lightweight AI pipeline that suggests monthly rebalancing decisions. The pipeline is intentionally simple so that it stays transparent and easy to maintain.

## Data Inputs

- **Market Signals**: I download daily prices for the ETFs I hold (VOO, QQQ, TLT, GLD, and a China tech ETF). The data is aggregated into weekly returns.
- **Macro Features**: A compact set of features – USD/CNY, 10y treasury yield, copper price, and a PMI diffusion index – gives the model a sense of macro shifts.
- **Portfolio Constraints**: Max allocation to any ETF is 35%, minimum cash is 10%. I treat these as hard constraints so the AI cannot propose extreme positions.

## Model

1. I train a gradient boosted tree (LightGBM) to predict 4-week forward Sharpe ratio for each ETF.
2. The SHAP values act as an explainability layer. If the model suggests increasing exposure to TLT, I can see whether treasury yields or macro data are driving that decision.
3. Allocation is solved via a simple quadratic program that maximizes predicted Sharpe subject to the constraints above.

## Results

Backtests from 2018–2025 show:

- Annualized return improved from **9.8%** (static 60/40) to **12.6%**.
- Max drawdown reduced by 4 percentage points thanks to the cash buffer the AI enforces when volatility spikes.
- Turnover averages 15% per month – acceptable for a retail investor using discount brokers.

## Takeaways

- The AI does not replace my judgment; it surfaces statistically grounded ideas.
- Smaller feature sets are easier to monitor. When USD/CNY suddenly mattered more than the PMI series, I saw it through SHAP and understood the macro narrative.
- Clean, auditable code is more important than squeezing out a tiny bit of performance.

If you want to try something similar, start with open data and a notebook. The key is to keep the workflow repeatable so you can trust the signals when real capital is at stake.
