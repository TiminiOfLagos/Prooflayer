import { routes } from "@/config/site";

export type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

/** Prototype pricing for a fictional product. Labelled as such wherever it appears. */
export const tiers: Tier[] = [
  {
    id: "sandbox",
    name: "Sandbox",
    price: "Free",
    priceNote: "no card required",
    summary: "Enough to evaluate a real agent and see whether the results tell you anything.",
    features: [
      "1,000 evaluation runs per month",
      "One workspace",
      "Community support",
      "Basic reports",
      "Public documentation",
    ],
    cta: { label: "Start free", href: routes.apiKey },
  },
  {
    id: "scale",
    name: "Scale",
    price: "Usage-based",
    priceNote: "from $0.004 per evaluation run",
    summary: "For teams running suites on every prompt, model and tool change.",
    features: [
      "Unlimited evaluation runs",
      "Multiple workspaces",
      "Advanced red-teaming",
      "Regression tracking",
      "Team annotations",
      "Exportable reports",
      "Standard support",
    ],
    cta: { label: "Get API key", href: routes.apiKey },
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    priceNote: "annual agreement",
    summary: "For regulated teams and systems that cannot leave your own infrastructure.",
    features: [
      "Single sign-on",
      "Advanced access control",
      "Audit logs",
      "Custom retention",
      "Private deployment",
      "Priority support",
      "Security review",
    ],
    cta: { label: "Contact enterprise", href: "mailto:enterprise@prooflayer.dev" },
  },
];

/**
 * Transparent estimator formula. Every input, rate and threshold is declared
 * here — the estimator UI does no arithmetic that is not visible in this object.
 */
export const estimatorConfig = {
  currency: "USD",
  includedRuns: 1_000,
  includedSimulations: 50,
  includedSeats: 3,
  rates: {
    perEvaluationRun: 0.004,
    perRedTeamSimulation: 0.19,
    perAdditionalSeat: 24,
    /** Multiplier applied to the whole bill per retention tier. */
    retention: {
      7: 1,
      30: 1,
      90: 1.08,
      365: 1.2,
    } as Record<number, number>,
    advancedReportingAddOn: 49,
  },
  retentionOptions: [7, 30, 90, 365],
  defaults: {
    runs: 25_000,
    simulations: 400,
    seats: 6,
    retention: 30,
    advancedReporting: true,
  },
  /** Plan recommendation thresholds. */
  thresholds: {
    sandboxMaxRuns: 1_000,
    enterpriseMinSeats: 25,
    enterpriseMinRuns: 250_000,
  },
} as const;

export type EstimatorInput = {
  runs: number;
  simulations: number;
  seats: number;
  retention: number;
  advancedReporting: boolean;
};

export type EstimatorBreakdown = {
  label: string;
  detail: string;
  amount: number;
}[];

export function estimate(input: EstimatorInput) {
  const { rates, includedRuns, includedSimulations, includedSeats } = estimatorConfig;

  const billableRuns = Math.max(0, input.runs - includedRuns);
  const billableSimulations = Math.max(0, input.simulations - includedSimulations);
  const billableSeats = Math.max(0, input.seats - includedSeats);

  const breakdown: EstimatorBreakdown = [
    {
      label: "Evaluation runs",
      detail: `${billableRuns.toLocaleString()} billable × $${rates.perEvaluationRun.toFixed(3)} · first ${includedRuns.toLocaleString()} included`,
      amount: billableRuns * rates.perEvaluationRun,
    },
    {
      label: "Red-team simulations",
      detail: `${billableSimulations.toLocaleString()} billable × $${rates.perRedTeamSimulation.toFixed(2)} · first ${includedSimulations} included`,
      amount: billableSimulations * rates.perRedTeamSimulation,
    },
    {
      label: "Team members",
      detail: `${billableSeats} billable × $${rates.perAdditionalSeat} · first ${includedSeats} included`,
      amount: billableSeats * rates.perAdditionalSeat,
    },
  ];

  if (input.advancedReporting) {
    breakdown.push({
      label: "Advanced reporting",
      detail: "Flat add-on: exports, scheduled reports, annotations",
      amount: rates.advancedReportingAddOn,
    });
  }

  const subtotal = breakdown.reduce((sum, line) => sum + line.amount, 0);
  const retentionMultiplier = rates.retention[input.retention] ?? 1;
  const retentionSurcharge = subtotal * (retentionMultiplier - 1);

  if (retentionSurcharge > 0) {
    breakdown.push({
      label: `${input.retention}-day retention`,
      detail: `${Math.round((retentionMultiplier - 1) * 100)}% of subtotal for extended storage`,
      amount: retentionSurcharge,
    });
  }

  const total = subtotal + retentionSurcharge;
  const costPerEvaluation = input.runs > 0 ? total / input.runs : 0;

  const recommended =
    input.seats >= estimatorConfig.thresholds.enterpriseMinSeats ||
    input.runs >= estimatorConfig.thresholds.enterpriseMinRuns
      ? "Enterprise"
      : input.runs <= estimatorConfig.thresholds.sandboxMaxRuns &&
          input.simulations <= includedSimulations &&
          input.seats <= includedSeats &&
          !input.advancedReporting
        ? "Sandbox"
        : "Scale";

  return { breakdown, total, costPerEvaluation, recommended };
}
