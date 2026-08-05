export type ArchNode = {
  id: string;
  label: string;
  /** Short technical descriptor shown under the node label. */
  meta: string;
  row: "path" | "resource";
  summary: string;
  tests: string[];
};

/**
 * The system under test. Most teams only evaluate the model box — the failures
 * that reach production usually come from the other eight.
 */
export const archNodes: ArchNode[] = [
  {
    id: "user-input",
    label: "User input",
    meta: "untrusted",
    row: "path",
    summary:
      "Everything a real user can send, including input that does not look like a question.",
    tests: [
      "Adversarial and malformed input handling",
      "Instruction conflicts inside user messages",
      "Multi-turn goal drift",
      "Language, length and encoding edge cases",
    ],
  },
  {
    id: "prompt-layer",
    label: "Prompt layer",
    meta: "versioned",
    row: "path",
    summary:
      "System prompts, templates and injected context. The most frequently changed part of an AI product.",
    tests: [
      "Regression between prompt versions",
      "Template variable injection",
      "Instruction precedence under conflict",
      "Token budget overflow behaviour",
    ],
  },
  {
    id: "agent-reasoning",
    label: "Agent reasoning",
    meta: "multi-step",
    row: "path",
    summary:
      "Planning, tool selection and self-correction across turns — where most compound failures start.",
    tests: [
      "Plan validity and step ordering",
      "Recovery after a failed step",
      "Loop and stall detection",
      "Reasoning consistency across repeated runs",
    ],
  },
  {
    id: "guardrails",
    label: "Guardrails",
    meta: "policy",
    row: "path",
    summary:
      "Input filters, output policies, permission checks and escalation rules applied around the model.",
    tests: [
      "Bypass attempts against each policy",
      "False positive rate on safe input",
      "Escalation trigger accuracy",
      "Policy coverage gaps",
    ],
  },
  {
    id: "final-response",
    label: "Final response",
    meta: "user-visible",
    row: "path",
    summary: "What the user actually receives, including formatting, citations and disclosures.",
    tests: [
      "Required disclosure presence",
      "Citation accuracy and quote fidelity",
      "Tone and refusal quality",
      "Structured output schema validity",
    ],
  },
  {
    id: "retrieval",
    label: "Retrieval system",
    meta: "rag",
    row: "resource",
    summary: "Vector search, reranking and chunking that decide what evidence the model sees.",
    tests: [
      "Retrieval precision and recall on a labelled set",
      "Stale and superseded document handling",
      "Permission filtering before reranking",
      "Behaviour when nothing relevant is retrieved",
    ],
  },
  {
    id: "tools",
    label: "External tools",
    meta: "side effects",
    row: "resource",
    summary: "Functions and APIs the agent can call, including the ones that change real state.",
    tests: [
      "Permission and scope enforcement",
      "Argument bounds validation",
      "Confirmation before irreversible actions",
      "Injection through tool output",
    ],
  },
  {
    id: "memory",
    label: "Memory",
    meta: "stateful",
    row: "resource",
    summary: "Conversation state and long-term memory that carries context — and mistakes — forward.",
    tests: [
      "Constraint retention over long sessions",
      "Cross-session and cross-user leakage",
      "Contradiction between memory and retrieval",
      "Memory write correctness",
    ],
  },
  {
    id: "model-provider",
    label: "Model provider",
    meta: "external",
    row: "resource",
    summary: "The model itself, plus the version and settings you do not fully control.",
    tests: [
      "Version-to-version regression",
      "Temperature and sampling stability",
      "Timeout, rate limit and outage behaviour",
      "Cost and latency per evaluation",
    ],
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Connect your application",
    copy: "Point the SDK at your endpoint, or wrap the function that produces a response. No rewrite required.",
    meta: "SDK · 4 lines",
  },
  {
    step: "02",
    title: "Define expected behaviour",
    copy: "Write what good looks like for your product: required refusals, citation rules, tool scopes, tone, latency budgets.",
    meta: "Suite definition",
  },
  {
    step: "03",
    title: "Generate and import test cases",
    copy: "Import real traces, upload a labelled dataset, or generate adversarial variants from your own policies.",
    meta: "128 cases",
  },
  {
    step: "04",
    title: "Run evaluations and red-team simulations",
    copy: "Execute the full suite against every prompt, model and tool change — locally, in CI, or on a schedule.",
    meta: "CI · 3m 40s",
  },
  {
    step: "05",
    title: "Track regressions before release",
    copy: "Compare versions, watch scores move, and block a release when a critical test crosses its threshold.",
    meta: "Gate on fail",
  },
];
