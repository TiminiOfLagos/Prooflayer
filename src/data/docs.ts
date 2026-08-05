import { brand } from "@/config/brand";

export type DocArticle = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
};

export type DocCategory = {
  id: string;
  title: string;
  description: string;
  articles: DocArticle[];
};

/**
 * The full documentation tree. One article in this concept build is written end
 * to end (`quickstart/run-your-first-evaluation`); every other entry resolves to
 * a page that says so rather than to a dead link.
 */
export const docCategories: DocCategory[] = [
  {
    id: "quickstart",
    title: "Quickstart",
    description: "From API key to a first failing test in under ten minutes.",
    articles: [
      {
        slug: "quickstart/run-your-first-evaluation",
        title: "Run your first evaluation",
        summary: "Install the SDK, authenticate, define a suite and read the response.",
        minutes: 8,
      },
      {
        slug: "quickstart/install-the-cli",
        title: "Install the CLI",
        summary: "Run suites locally with the same command CI uses.",
        minutes: 3,
      },
      {
        slug: "quickstart/connect-an-agent",
        title: "Connect an existing agent",
        summary: "Wrap any callable, HTTP endpoint or framework agent as a target.",
        minutes: 6,
      },
    ],
  },
  {
    id: "concepts",
    title: "Core concepts",
    description: "The five objects everything else is built from.",
    articles: [
      {
        slug: "concepts/suites-cases-and-scores",
        title: "Suites, cases and scores",
        summary: "How a test case becomes a score, and what a threshold means.",
        minutes: 7,
      },
      {
        slug: "concepts/targets-and-traces",
        title: "Targets and traces",
        summary: "What gets captured on every run and how long it is kept.",
        minutes: 5,
      },
      {
        slug: "concepts/thresholds-and-gates",
        title: "Thresholds and release gates",
        summary: "Turning results into a decision your CI can make.",
        minutes: 6,
      },
    ],
  },
  {
    id: "evaluations",
    title: "Evaluations",
    description: "Rule-based, model-graded, human and custom scoring.",
    articles: [
      {
        slug: "evaluations/rule-based-scoring",
        title: "Rule-based scoring",
        summary: "Assertions, schemas, forbidden claims and latency budgets.",
        minutes: 9,
      },
      {
        slug: "evaluations/model-graded-rubrics",
        title: "Model-graded rubrics",
        summary: "Writing a rubric and measuring grader agreement.",
        minutes: 11,
      },
      {
        slug: "evaluations/custom-scorers",
        title: "Custom scoring functions",
        summary: "Bring your own scorer for domain-specific correctness.",
        minutes: 7,
      },
    ],
  },
  {
    id: "red-teaming",
    title: "Red-teaming",
    description: "Generating and classifying adversarial scenarios.",
    articles: [
      {
        slug: "red-teaming/generating-scenarios",
        title: "Generating scenarios from your policies",
        summary: "Turn a policy set into an adversarial suite.",
        minutes: 10,
      },
      {
        slug: "red-teaming/multi-agent-simulations",
        title: "Multi-agent simulations",
        summary: "Model hand-offs, shared tools and cross-agent influence.",
        minutes: 12,
      },
      {
        slug: "red-teaming/severity-classification",
        title: "Severity classification",
        summary: "How findings are ranked and which ones block a release.",
        minutes: 6,
      },
    ],
  },
  {
    id: "guardrails",
    title: "Guardrails",
    description: "Validating policies at the layer that enforces them.",
    articles: [
      {
        slug: "guardrails/declaring-policies",
        title: "Declaring policies",
        summary: "Policy objects, enforcement layers and versioning.",
        minutes: 8,
      },
      {
        slug: "guardrails/false-positive-sets",
        title: "False positive sets",
        summary: "Measuring the cost of over-blocking safe traffic.",
        minutes: 7,
      },
      {
        slug: "guardrails/coverage-reports",
        title: "Coverage reports",
        summary: "Reading the policy-by-component matrix.",
        minutes: 5,
      },
    ],
  },
  {
    id: "datasets",
    title: "Datasets",
    description: "Importing, versioning and labelling test data.",
    articles: [
      {
        slug: "datasets/importing-traces",
        title: "Importing production traces",
        summary: "Turn real sessions into a labelled dataset.",
        minutes: 9,
      },
      {
        slug: "datasets/versioning",
        title: "Dataset versioning",
        summary: "Why a score without a dataset version means nothing.",
        minutes: 5,
      },
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    description: "Comparing prompts, models and retrieval settings.",
    articles: [
      {
        slug: "experiments/comparing-versions",
        title: "Comparing two versions",
        summary: "Per-case diffs, cost and latency deltas.",
        minutes: 7,
      },
      {
        slug: "experiments/sweeps",
        title: "Parameter sweeps",
        summary: "Run one suite across many configurations.",
        minutes: 8,
      },
    ],
  },
  {
    id: "api",
    title: "API reference",
    description: `REST endpoints under https://${brand.apiHost}/${brand.apiVersion}.`,
    articles: [
      {
        slug: "api/evaluations",
        title: "POST /evaluations",
        summary: "Start a run and receive results synchronously or by webhook.",
        minutes: 6,
      },
      {
        slug: "api/runs",
        title: "GET /runs/{id}",
        summary: "Fetch a completed run, its cases and its traces.",
        minutes: 4,
      },
      {
        slug: "api/suites",
        title: "Suites and cases",
        summary: "Create, update and version suites through the API.",
        minutes: 6,
      },
      {
        slug: "api/errors",
        title: "Errors and rate limits",
        summary: "Status codes, retry guidance and idempotency.",
        minutes: 5,
      },
    ],
  },
  {
    id: "sdks",
    title: "SDKs",
    description: "First-party clients for Python and JavaScript.",
    articles: [
      {
        slug: "sdks/python",
        title: "Python SDK",
        summary: `${brand.pythonPackage} — sync and async clients, typed results.`,
        minutes: 8,
      },
      {
        slug: "sdks/javascript",
        title: "JavaScript SDK",
        summary: `${brand.nodePackage} — Node 20+, TypeScript types included.`,
        minutes: 8,
      },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Push run results and regressions into your own systems.",
    articles: [
      {
        slug: "webhooks/events",
        title: "Event types",
        summary: "run.completed, evaluation.regressed, gate.blocked.",
        minutes: 5,
      },
      {
        slug: "webhooks/verifying-signatures",
        title: "Verifying signatures",
        summary: "Validate delivery authenticity before acting on an event.",
        minutes: 4,
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "CI, observability and messaging.",
    articles: [
      {
        slug: "integrations/github-actions",
        title: "GitHub Actions",
        summary: "Run suites on pull requests with a release gate.",
        minutes: 6,
      },
      {
        slug: "integrations/opentelemetry",
        title: "OpenTelemetry",
        summary: "Import spans as traces and promote failures to cases.",
        minutes: 9,
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Hosted, hybrid and private deployment models.",
    articles: [
      {
        slug: "deployment/private-deployment",
        title: "Private deployment",
        summary: "Run the evaluation plane inside your own account.",
        minutes: 11,
      },
      {
        slug: "deployment/data-residency",
        title: "Data residency",
        summary: "Choosing where run data is processed and stored.",
        minutes: 6,
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Keys, roles, retention and redaction.",
    articles: [
      {
        slug: "security/api-keys",
        title: "API keys and rotation",
        summary: "Scopes, rotation and revoking a leaked key.",
        minutes: 5,
      },
      {
        slug: "security/redaction",
        title: "Sensitive-data redaction",
        summary: "Redact fields before test cases are stored.",
        minutes: 7,
      },
    ],
  },
];

/** Flat index used by search and by the article router. */
export const docIndex = docCategories.flatMap((category) =>
  category.articles.map((article) => ({
    ...article,
    category: category.title,
    categoryId: category.id,
  })),
);

export const popularGuides = [
  "quickstart/run-your-first-evaluation",
  "concepts/thresholds-and-gates",
  "red-teaming/generating-scenarios",
  "integrations/github-actions",
];

export const sdkCards = [
  {
    name: "Python",
    install: `pip install ${brand.pythonPackage}`,
    version: "1.4.0",
    slug: "sdks/python",
    detail: "Sync and async clients, typed results, pytest plugin.",
  },
  {
    name: "JavaScript",
    install: `npm install ${brand.nodePackage}`,
    version: "1.3.2",
    slug: "sdks/javascript",
    detail: "Node 20+, TypeScript types, streaming run events.",
  },
  {
    name: "CLI",
    install: `npx ${brand.slug} run --suite reliability`,
    version: "0.9.1",
    slug: "quickstart/install-the-cli",
    detail: "The same command locally and in CI, with a release gate.",
  },
];

export const apiStatus = [
  { service: "Evaluations API", state: "operational" as const, note: "p95 412 ms" },
  { service: "Red-team simulations", state: "operational" as const, note: "queue 1.2 s" },
  { service: "Webhooks", state: "degraded" as const, note: "retry backlog clearing" },
  { service: "Dashboard", state: "operational" as const, note: "—" },
];

/** Ordered reading path used for previous/next article navigation. */
export const readingOrder = docIndex.map((article) => article.slug);

export function getArticle(slug: string) {
  return docIndex.find((article) => article.slug === slug) ?? null;
}

export function getNeighbours(slug: string) {
  const index = readingOrder.indexOf(slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? getArticle(readingOrder[index - 1]) : null,
    next: index < readingOrder.length - 1 ? getArticle(readingOrder[index + 1]) : null,
  };
}
