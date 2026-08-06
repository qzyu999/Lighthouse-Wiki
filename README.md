# Lighthouse Wiki

HTML-based documentation for the data lake platform. Serves as both human-readable documentation and machine-readable context for the Lighthouse AI chatbot.

## Structure

```
index.html              — Home page with navigation cards
wiki.css                — Shared styles (light theme, Inter font)
wiki.js                 — Interactive components (nav, copy buttons, filters)

architecture/           — Platform architecture (overview, medallion layers, infrastructure)
catalog/                — Data catalog (one page per TPC-H table with schema + queries)
pipelines/              — ETL pipeline registry and details
metrics/                — KPI definitions with formulas
semantics/              — Formal data primitives, types, invariants, lineage ERD
guides/                 — Getting started, query patterns, troubleshooting
status/                 — Changelog, roadmap, known issues, migrations
glossary/               — Business and technical term definitions
```

## Dataset

Documents the TPC-H supply chain benchmark dataset (8 tables, ~85K rows at SF=0.01):

| Table | Rows | Description |
|-------|------|-------------|
| region | 5 | Continents |
| nation | 13 | Countries |
| customer | 1,500 | Buyers |
| supplier | 100 | Parts suppliers |
| part | 2,000 | Product catalog |
| partsupp | 8,000 | Supplier-part relationships |
| orders | 15,000 | Purchase orders |
| lineitem | 60,000 | Order line items (fact table) |

## How It Works with Lighthouse

1. Lighthouse serves these HTML files at `/wiki/`
2. The context compiler extracts text from `data-section` elements
3. Extracted content is injected into the LLM's system prompt
4. Users can edit pages in-app — edits create GitHub PRs via the Connectors system

## Local Preview

Open `index.html` in a browser — no build step needed.

## Editing

Pages use `data-editable="true"` markers on sections that support in-app editing. The "Suggest Edit" flow in Lighthouse fetches the file from GitHub, opens a Monaco diff editor, and submits a PR on save.

## Design Principles

- Clean light theme with Inter font
- Flat sidebar navigation (no collapse)
- Filterable tables with search
- Semantic `data-*` attributes for LLM extraction
- No JavaScript frameworks — pure vanilla HTML/CSS/JS
