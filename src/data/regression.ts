export type RegressionRow = {
  test: string;
  dimension: string;
  a: number;
  b: number;
};

/** A prompt change that improved two things and quietly broke a third. */
export const regressionRun = {
  a: {
    id: "v14",
    label: "Version A",
    detail: "prompt v14 · gpt-class-4o · retrieval k=6",
    overall: 91,
    latencyMs: 1240,
    costPer1k: 4.2,
  },
  b: {
    id: "v15",
    label: "Version B",
    detail: "prompt v15 · gpt-class-4o · retrieval k=12",
    overall: 89,
    latencyMs: 1610,
    costPer1k: 6.8,
  },
  rows: [
    { test: "Citation accuracy", dimension: "Groundedness", a: 82, b: 94 },
    { test: "Unsupported claim detection", dimension: "Groundedness", a: 79, b: 91 },
    { test: "Response consistency", dimension: "Reliability", a: 94, b: 92 },
    { test: "Tool permission escalation", dimension: "Tool usage", a: 96, b: 74 },
    { test: "Refusal quality", dimension: "Safety", a: 98, b: 98 },
    { test: "Long-context retention", dimension: "Reliability", a: 88, b: 68 },
    { test: "Required disclosure present", dimension: "Policy", a: 90, b: 92 },
  ] satisfies RegressionRow[],
};
