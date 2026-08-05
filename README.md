# Prooflayer

Marketing and documentation site for a fictional AI infrastructure product: evaluation,
red-teaming, guardrail validation and continuous monitoring for LLM applications.

**Prooflayer is a product design and development concept. It is not a real service.**

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No other runtime dependencies.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run typecheck
```

## Structure

```
src/
  app/              Route-based pages (13 routes, all statically prerendered)
  components/
    layout/         Header, mobile navigation, footer
    sections/       Reusable page hero and CTA section
    ui/             Buttons, tags, cards, badges, status, code blocks
    visuals/        Product UI: app frame, live run view, demo console,
                    architecture diagram, coverage matrix, estimator
    docs/           Documentation navigation, search, table of contents, prose
    changelog/      Filterable release list
  config/           brand.ts (single source for the product name) and site.ts (routes, nav)
  data/             Structured content: demo, pricing, docs, careers, changelog, architecture
  lib/              Class-name helper and small hooks
  styles/           Design tokens and base layer
```

## Renaming the product

Change `NAME` in `src/config/brand.ts`. Metadata, copy, code samples, package names, environment
variables and legal lines all derive from it.

## Design notes

See [case-study.md](case-study.md) for the audience, visual direction, information architecture,
conversion thinking, and the responsive and accessibility decisions.
