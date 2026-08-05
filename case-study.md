# Prooflayer — design case study

A marketing and documentation site for a fictional AI infrastructure product that helps teams
evaluate, red-team and monitor LLM-powered systems before release.

Prooflayer is a concept. Nothing on the site claims a certification, a customer or a benchmark it
cannot support, and the footer says so on every page.

---

## 1. Who it is for

Machine learning engineers, AI platform leads, heads of trust and safety, CTOs at AI-native
startups, and the technical founders who sit between them.

The defining trait of this audience is not seniority — it is scepticism. They have read the
landing page that promises "enterprise-grade AI safety" and they have learned that it usually
means a form. They evaluate a tool the way they evaluate a model: by trying to make it fail.

Three consequences for the design:

- **Show the mechanism, not the promise.** Every claim on the site is attached to a visible
  artefact: a test case, a score, a policy definition, a coverage matrix.
- **Never hide the product behind a form.** The demo runs without an account. Pricing is public.
  The API key is self-service.
- **Let bad results be visible.** The interface shows failures, gaps and regressions prominently,
  because a tool that only reports good news is not a measurement tool.

## 2. The communication problem

The category has a credibility problem in both directions.

The product is genuinely complex: reliability in an LLM product emerges from prompts, tools,
memory, retrieval and guardrails interacting, not from the model alone. Simplify that and the
audience stops believing you. But most competitors solve it by writing denser jargon, which loses
everyone who has not already made up their mind.

The site's answer is to move the explanation out of prose and into interface. A paragraph
describing "multi-layer evaluation coverage" is replaced by a diagram with nine selectable nodes.
A claim about regression detection is replaced by a comparison table where one score improved,
another regressed, and cost went up 62%. The reader does not have to trust the sentence, because
they can read the artefact.

That principle produced the single hardest editing rule in the project: **one sentence per
section**. If a section needed a second paragraph, the visual was not doing its job.

## 3. Visual direction

Dark-first, technical, restrained. The reference brief asked for editorial energy translated into
something more precise and credible than a typical SaaS template.

**Colour.** Near-black (`#08090a`) through four graphite surface levels, off-white text, muted
grey secondary text. One accent — acid lime `#ccff2f` — reserved for primary actions, active
states, the evaluation layer, and selected values. A restrained violet handles the second voice
(adversarial simulations, guardrail events). Red, amber and green are held back exclusively for
evaluation status so they never read as decoration. There are no full-section gradients; radial
glow appears three or four times in the whole site, always behind a hero.

**Type.** Archivo for display, Inter for body, JetBrains Mono for every technical artefact — IDs,
scores, model versions, statuses, changelog metadata, code. The mono/sans split does real work: if
it is a measurement, it is monospaced, and the reader learns that rule within one screen.

**Graphic language.** Everything is drawn as markup or vector: connected nodes, test paths, status
dots, scanning sweeps, corner ticks, a single hand-drawn underline in the hero. No stock imagery,
no robots, no glowing brains.

### The revision that mattered

The first build was competent and looked generated: uniform three-column card rows, numbered
section labels (`01`, `02`, `03`), a decorative sticker and sketch arrow, and abstract SVG
diagrams standing in for product screens.

Two further passes, informed by studying reference sites, changed six things:

1. **Section openers became chips** — a small filled-and-stroked pill with an inner shadow along
   the bottom edge, so it reads as a control rather than a caption. Buttons carry the same inner
   shadow, on a soft rectangle rather than a pill: the accent needs weight, not roundness.
   Section numbering was removed — enumerating sections is a tell, not a wayfinding aid.
2. **Headings gained a typographic rule** that breaks them across two lines.
3. **Cards gained radius and internal air** (22px corners, 24–28px padding), and section rhythm
   opened up to 96–128px.
4. **Navigation became a two-column mega-menu**: labelled columns, icon tiles with corner
   registration dots, bold titles and one-line descriptions on the primary column, a compact
   resource column beside it.
5. **A light band was introduced.** The workflow section sits on near-white while the rest of the
   site stays dark. It marks the halfway point of the argument and stops the scroll reading as one
   long dark surface — the anchor is still the dark shade.
6. **Abstract visuals were replaced by real interface**, and then deliberately shrunk. This was
   the biggest change and is described below.

### The break cue

The word *breaks* in the hero carries the only expressive moment in the type system. An early
version used a hand-drawn scribble, which read as decoration. It is now a hairline rule that
fractures: two precise lime segments with a small rotated square between them, animating apart the
moment the word finishes typing. It signals the idea without a single doodle.

### Motion

One reveal, used everywhere — a short rise and fade as a block enters view, with a small stagger
inside groups. Headlines type in. Nothing else invents its own motion, so the page reads as one
system rather than a collection of effects. Every animation is opt-out under
`prefers-reduced-motion`, and the typed headline always exists in full in the DOM.

## 4. Product visuals: interface, not illustration

Every significant visual is built on one shared `AppFrame` component: an icon rail, a breadcrumb
toolbar, segmented controls, and a content area. Inside it sit real interface patterns — sortable
table headers, KPI tiles with delta chips, status pills, filter toggles, severity badges.

- The hero is a **live run view**: KPI header with delta chips, a case table streaming new rows,
  and a single event line where a red-team detection and a guardrail trigger appear.
- Regression detection is a **comparison view** with per-case deltas and a "changed only" filter.
- The three pillar cards are **interface fragments** — a filtered suite table, a triage queue
  sorted by severity, a coverage grid with one visible gap.
- The demo console and the pricing estimator are the same chrome around working logic.

They are also kept small. In every side-by-side section the visual is subordinate to the words: it
proves the claim, it does not replace it. A visual that dominates its own paragraph is decoration
with a job title.

The test applied throughout: *could this markup ship inside the actual product?* If not, it was
redrawn. This is what separates a product-led page from an illustrated one — and it removes the
need to describe the product in prose, because the product is on the page.

## 5. Information architecture

```
/                         Home — the full argument in one scroll
/product                  How the layer fits together
/evaluations              Deep dive: measurement
/red-teaming              Deep dive: adversarial
/guardrails               Deep dive: policy
/demo                     Interactive demo, no account
/docs                     Documentation landing (13 categories, search)
/docs/[...slug]           Article template + full tree
/security                 Controls, roadmap, disclosure, privacy, terms
/pricing                  Three tiers + working estimator
/careers                  Mission, principles, illustrative roles
/changelog                Five releases, filterable
/api-key                  The end of the funnel
```

Three deliberate structural decisions:

- **Solutions is a dropdown of anchors into real pages**, not a set of thin landing pages. Every
  navigation item resolves to content that exists.
- **The documentation tree is complete but honestly staffed.** All 33 articles exist as routes
  with working navigation, search and reading order; one — *Run your first evaluation* — is
  written end to end. Every other node resolves to a page that says exactly that, rather than to
  a dead link.
- **Legal lives on the security page**, labelled *Concept*, because a fictional product publishing
  fake terms would undercut the honesty the rest of the site depends on.

## 6. Why the funnel ends at an API key

The brief's instruction — do not make "Book a demo" the primary action — matches how this audience
actually buys. The journey is: understand → try → read → build.

A sales call inserted before "try" costs the visitor time and tells them the product cannot be
understood without a guide. For a developer tool, that is a negative signal about the product's
own clarity.

So the same primary action appears on every page: **Get your API key**. Secondary actions rotate by
context — *Explore the demo* early, *View quickstart* mid-page, *Read the docs* at the close. The
enterprise contact exists on the pricing page and in the footer, deliberately secondary.

`/api-key` is built honestly: it runs entirely in the browser, submits nothing, stores nothing,
never asks for a password, and generates a random demonstration key so the flow can be judged
without pretending to be a real service.

## 7. How the demo reduces uncertainty

The demo is the site's main argument. It is functional, driven by structured data, and runs the
same component on the homepage (compact) and the demo page (full nine-step flow).

Four sample applications × five suites produce genuinely different results, because test cases
carry per-application overrides — the retrieval-heavy assistant invents citations, the tool-heavy
agent exceeds its scope, the regulated copilot drifts into advice. Selecting a different
application changes the failures, not just the labels.

Results are computed by a pure function from the case data: scores, counts, dimension coverage,
p50/p95 latency and cost all derive from the same source, so what the interface shows always
matches what the data says. Categories with no cases in the chosen suite are marked **not
covered** rather than scored as zero — coverage is presented as part of the result.

Changing any control invalidates a finished run, so a result can never be read against the wrong
configuration. Every panel is labelled *simulated demonstration data*.

## 8. Balancing depth and clarity on product pages

Each deep-dive page follows the same spine: hero with a working visual → capability grid (title
plus one line) → a section that shows the underlying artefact as code → a closing action.

Depth is carried by three devices rather than by longer copy:

- **Real definitions.** The guardrails page shows a policy object with `enforced_at="tool"` and a
  comment noting it is *not* `"prompt"`. That one line communicates more than a paragraph about
  enforcement layers, and it earns credibility with the exact reader who was looking for it.
- **Honest negatives.** The coverage matrix shows gaps. The comparison shows a regression. The
  guardrails page argues that over-blocking is a failure too.
- **Interactive detail on demand.** The architecture diagram holds nine nodes' worth of test types
  behind selection instead of printing all thirty-six on the page.

Safety was handled the same way as depth: red-team scenarios are *described* by class and outcome
("instruction hidden inside a retrieved document"), never scripted as reusable payloads.

## 9. Responsive and accessibility decisions

**Responsive.**
- Wide artefacts — tables, diagrams, code — live in a `rail` utility with its own horizontal
  scroll and `min-width: 0`, so a dense product visual never pushes the page sideways.
- A base rule (`.grid > * { min-width: 0 }`) fixes the whole class of grid-track inflation bugs
  that wide content causes on small screens.
- The architecture diagram becomes a horizontally scrollable rail on mobile with node selection
  intact; the workflow path switches from a horizontal rail to a vertical spine.
- The app frame drops its icon rail below `sm` and reflows KPI tiles to two columns.
- Display type is fluid via `clamp()`, so headlines never overflow narrow viewports.

**Accessibility.**
- Status is never colour alone: every state carries a glyph and a text label, and score bars
  duplicate the numeric value.
- Live regions announce streaming results, run progress and filter counts; the hero stream and
  attack map are pausable.
- `prefers-reduced-motion` is honoured globally in CSS and in JavaScript — reduced-motion visitors
  get the finished result immediately rather than a disabled animation.
- Real form controls throughout (radios, checkboxes, ranges) with `fieldset`/`legend` grouping,
  visible lime focus rings, a skip link, semantic landmarks and a single `h1` per page.
- Data tables carry captions, scoped headers and sort indicators.

## 10. Technical notes

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · no other runtime dependencies.

- Design tokens live in one `@theme` block; components consume them as utilities.
- The product name is defined once in `src/config/brand.ts` and flows into metadata, copy, code
  samples, package names and environment variables. Renaming the product is a one-line change.
- Pricing, documentation, careers, changelog, architecture and demo content are structured data,
  not markup — the estimator's formula and every rate sit in a single configurable object.
- All 49 routes prerender statically; sitemap and robots are generated; the build is Vercel-ready.
