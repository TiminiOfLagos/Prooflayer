export type Role = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
};

export const principles = [
  {
    title: "Measure before claiming",
    copy: "Nothing ships with a number attached unless we can show the set it was measured on. That rule applies to our own marketing as much as to the product.",
  },
  {
    title: "Show the failure",
    copy: "A tool that only reports good news is decoration. We design for the moment a result is bad, because that is when someone actually needs the interface.",
  },
  {
    title: "Documentation is the product",
    copy: "If a capability is not documented, it does not exist. Docs are written by the people who built the thing, before it ships.",
  },
  {
    title: "No dark funnels",
    copy: "Pricing is public, the demo needs no account, and the API key is self-service. If the product needs a gate to be interesting, the problem is the product.",
  },
];

export const benefits = [
  { title: "Remote-first", detail: "Distributed across UK and EU time zones" },
  { title: "Four-day release weeks", detail: "Fridays are for maintenance, docs and review" },
  { title: "Hardware budget", detail: "Your choice of machine, refreshed every three years" },
  { title: "Learning budget", detail: "Conferences, courses and research subscriptions" },
  { title: "Paid research time", detail: "One week per quarter on evaluation research" },
  { title: "Equity for everyone", detail: "Every role includes an equity component" },
];

export const hiringProcess = [
  {
    step: "01",
    title: "Written application",
    detail: "A short form and, if you have one, something you have built or written. No cover letter theatre.",
    duration: "30 minutes",
  },
  {
    step: "02",
    title: "Conversation with the hiring manager",
    detail: "What you have worked on, what you want next, and what the role actually involves.",
    duration: "45 minutes",
  },
  {
    step: "03",
    title: "Paid practical exercise",
    detail: "A realistic task from the role, done on your own time, paid at a contractor rate.",
    duration: "4 hours, paid",
  },
  {
    step: "04",
    title: "Team conversations",
    detail: "Two sessions with people you would work with daily, including one on how you handle disagreement.",
    duration: "2 × 45 minutes",
  },
  {
    step: "05",
    title: "Offer and references",
    detail: "Written offer with the salary band stated up front, then references at your pace.",
    duration: "Within 3 days",
  },
];

export const roles: Role[] = [
  {
    id: "senior-ai-evaluation-engineer",
    title: "Senior AI Evaluation Engineer",
    team: "Evaluation",
    location: "Remote · UK / EU",
    type: "Full-time",
    summary:
      "Design the scoring methods behind the platform: rule-based assertions, model-graded rubrics and the agreement metrics that tell us whether a grader can be trusted.",
    responsibilities: [
      "Build and validate scoring functions across reliability, groundedness and safety",
      "Measure grader agreement against human labels and publish the numbers internally",
      "Design the adversarial generation pipeline with the red-team team",
      "Own the accuracy of what our own product claims",
    ],
  },
  {
    id: "developer-experience-engineer",
    title: "Developer Experience Engineer",
    team: "Platform",
    location: "Remote · UK / EU",
    type: "Full-time",
    summary:
      "Own the SDKs, the CLI and the first ten minutes. If the quickstart takes longer than the coffee, that is the bug.",
    responsibilities: [
      "Maintain the Python and JavaScript SDKs and the CLI",
      "Write the documentation for what you ship, before you ship it",
      "Instrument the onboarding path and fix whatever the data says is slow",
      "Build the CI integrations teams actually use",
    ],
  },
  {
    id: "product-designer-ai-systems",
    title: "Product Designer, AI Systems",
    team: "Design",
    location: "Remote · UK / EU",
    type: "Full-time",
    summary:
      "Design interfaces for information that is uncertain, probabilistic and often bad news. Scores, traces, comparisons and coverage gaps.",
    responsibilities: [
      "Design the evaluation, comparison and coverage surfaces end to end",
      "Turn abstract reliability concepts into readable, honest interfaces",
      "Own the design system across product, docs and marketing",
      "Test with engineers who are sceptical of design by default",
    ],
  },
  {
    id: "technical-content-lead",
    title: "Technical Content Lead",
    team: "Developer relations",
    location: "Remote · UK / EU",
    type: "Full-time",
    summary:
      "Explain evaluation properly: what a score means, what it does not mean, and how to design a suite that tells you something useful.",
    responsibilities: [
      "Own the documentation architecture and its quality bar",
      "Write deep technical guides on evaluation methodology",
      "Turn real customer failures into teaching material, with permission",
      "Push back on any claim we cannot support",
    ],
  },
];
