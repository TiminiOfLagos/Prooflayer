import { brand } from "@/config/brand";

export type ChangelogCategory =
  | "Evaluations"
  | "Red-teaming"
  | "Guardrails"
  | "API"
  | "Platform";

export type ChangelogEntry = {
  id: string;
  version: string;
  title: string;
  date: string;
  isoDate: string;
  category: ChangelogCategory;
  summary: string;
  features: { title: string; detail: string }[];
  /** Key for the inline product visual rendered with the entry. */
  visual: "attack-map" | "compare" | "matrix" | "sdk" | "retention";
  docs: { label: string; href: string }[];
};

export const changelogCategories: ChangelogCategory[] = [
  "Evaluations",
  "Red-teaming",
  "Guardrails",
  "API",
  "Platform",
];

export const changelog: ChangelogEntry[] = [
  {
    id: "multi-agent-red-team-simulations",
    version: "v1.4.0",
    title: "Multi-agent red-team simulations",
    date: "24 July 2026",
    isoDate: "2026-07-24",
    category: "Red-teaming",
    summary:
      "Simulate systems where more than one agent participates: hand-offs, shared tool access, and messages that no human ever reads.",
    features: [
      {
        title: "Hand-off scenarios",
        detail:
          "Generate cases where a planning agent passes an unsafe instruction to an executing agent that has broader tool access.",
      },
      {
        title: "Cross-agent tool borrowing",
        detail:
          "Detect when one agent achieves an action through another agent's permissions rather than its own.",
      },
      {
        title: "Conversation-level severity",
        detail:
          "Findings are now classified across the whole exchange, not per message, so drift across a hand-off is reported once.",
      },
    ],
    visual: "attack-map",
    docs: [
      { label: "Multi-agent simulations", href: "/docs/red-teaming/multi-agent-simulations" },
      { label: "Severity classification", href: "/docs/red-teaming/severity-classification" },
    ],
  },
  {
    id: "evaluation-comparison-mode",
    version: "v1.3.0",
    title: "Evaluation comparison mode",
    date: "2 July 2026",
    isoDate: "2026-07-02",
    category: "Evaluations",
    summary:
      "Compare any two runs case by case, with cost and latency deltas alongside the score changes.",
    features: [
      {
        title: "Per-case diffs",
        detail:
          "See exactly which cases moved between two versions instead of comparing headline averages.",
      },
      {
        title: "Changed-only view",
        detail: "Filter a comparison down to the cases that actually differ.",
      },
      {
        title: "Cost and latency deltas",
        detail:
          "A retrieval change that improves accuracy and doubles cost is now visible in one place.",
      },
    ],
    visual: "compare",
    docs: [
      { label: "Comparing two versions", href: "/docs/experiments/comparing-versions" },
      { label: "Thresholds and release gates", href: "/docs/concepts/thresholds-and-gates" },
    ],
  },
  {
    id: "guardrail-coverage-reports",
    version: "v1.2.0",
    title: "Guardrail coverage reports",
    date: "11 June 2026",
    isoDate: "2026-06-11",
    category: "Guardrails",
    summary:
      "A policy-by-component matrix showing where each guardrail is tested, where coverage is partial, and where there is none.",
    features: [
      {
        title: "Coverage matrix",
        detail:
          "Every policy is mapped against input, prompt, retrieval, tools, memory and output layers.",
      },
      {
        title: "Enforcement layer declaration",
        detail:
          "Policies declare where they are enforced. A rule enforced only in the prompt is now reported as partial.",
      },
      {
        title: "False positive sets",
        detail: "Attach a safe-traffic dataset to any policy and track over-blocking as a score.",
      },
    ],
    visual: "matrix",
    docs: [
      { label: "Coverage reports", href: "/docs/guardrails/coverage-reports" },
      { label: "False positive sets", href: "/docs/guardrails/false-positive-sets" },
    ],
  },
  {
    id: "python-sdk-improvements",
    version: "v1.1.0",
    title: "Python SDK improvements",
    date: "20 May 2026",
    isoDate: "2026-05-20",
    category: "API",
    summary: `${brand.pythonPackage} 1.4 adds an async client, typed results and a pytest plugin.`,
    features: [
      {
        title: "Async client",
        detail: "Run suites concurrently against multiple targets without blocking.",
      },
      {
        title: "Typed results",
        detail: "Result objects are fully typed, so failures surface in your editor, not at runtime.",
      },
      {
        title: "pytest plugin",
        detail:
          "Express evaluations as ordinary tests and run them with the rest of your test suite.",
      },
    ],
    visual: "sdk",
    docs: [
      { label: "Python SDK", href: "/docs/sdks/python" },
      { label: "Install the CLI", href: "/docs/quickstart/install-the-cli" },
    ],
  },
  {
    id: "configurable-data-retention",
    version: "v1.0.0",
    title: "Configurable data retention",
    date: "28 April 2026",
    isoDate: "2026-04-28",
    category: "Platform",
    summary:
      "Choose how long run data, traces and redacted payloads are kept — per workspace, with an audit trail.",
    features: [
      {
        title: "Retention windows",
        detail: "7, 30, 90 or 365 days, set per workspace and enforced on write.",
      },
      {
        title: "Redaction before storage",
        detail: "Nominate fields to redact before any test case or trace is persisted.",
      },
      {
        title: "Deletion receipts",
        detail: "Every scheduled deletion is recorded in the audit log with the affected run IDs.",
      },
    ],
    visual: "retention",
    docs: [
      { label: "Sensitive-data redaction", href: "/docs/security/redaction" },
      { label: "Data residency", href: "/docs/deployment/data-residency" },
    ],
  },
];
