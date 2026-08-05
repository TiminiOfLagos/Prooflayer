import type { Snippet } from "@/components/ui/CodeBlock";
import { brand } from "@/config/brand";

/**
 * Code samples live in data, not in JSX, so the brand rename stays a one-line
 * change and the same snippets can be reused across home, docs and product pages.
 */

export const installSnippets: Snippet[] = [
  { label: "Python", filename: "terminal", code: `pip install ${brand.pythonPackage}` },
  { label: "JavaScript", filename: "terminal", code: `npm install ${brand.nodePackage}` },
];

export const quickstartSnippets: Snippet[] = [
  {
    label: "Python",
    filename: "evaluate.py",
    code: `import os
from ${brand.pythonPackage} import ${brand.name}

client = ${brand.name}(api_key=os.environ["${brand.envVar}"])

# target is any callable that takes a prompt and returns your app's response
result = client.evaluations.run(
    suite="prompt-injection",
    target=support_agent,
    cases=128,
)

print(result.overall)        # 94
print(result.failures)       # [<Case tool-001 severity=high>]`,
  },
  {
    label: "JavaScript",
    filename: "evaluate.ts",
    code: `import { ${brand.name} } from "${brand.nodePackage}";

const client = new ${brand.name}({ apiKey: process.env.${brand.envVar} });

const result = await client.evaluations.run({
  suite: "prompt-injection",
  target: supportAgent,
  cases: 128,
});

console.log(result.overall);   // 94
console.log(result.failures);  // [{ id: "tool-001", severity: "high" }]`,
  },
  {
    label: "REST API",
    filename: "terminal",
    code: `curl https://${brand.apiHost}/${brand.apiVersion}/evaluations \\
  -H "Authorization: Bearer $${brand.envVar}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "suite": "prompt-injection",
    "target": { "url": "https://your-app.example/chat" },
    "cases": 128
  }'`,
  },
];

export const responseSnippet: Snippet[] = [
  {
    label: "Response",
    filename: "200 OK · application/json",
    code: `{
  "id": "run_2f9a41",
  "suite": "prompt-injection",
  "status": "complete",
  "overall": 94,
  "counts": { "passed": 3, "warnings": 1, "failures": 1 },
  "dimensions": {
    "safety": 96,
    "policy_compliance": 92,
    "tool_usage": 88
  },
  "failures": [
    {
      "case": "inj-004",
      "name": "Multi-turn goal drift",
      "severity": "high",
      "observed": "Policy held in 8 of 10 sequences",
      "recommendation": "Evaluate policy compliance per turn, not per session"
    }
  ],
  "latency_ms": { "p50": 1210, "p95": 2380 },
  "cost_usd": 0.54
}`,
  },
];

export const ciSnippet: Snippet[] = [
  {
    label: "GitHub Actions",
    filename: ".github/workflows/evaluate.yml",
    code: `- name: Run ${brand.name} suites
  run: ${brand.slug} run --suite reliability --suite prompt-injection --gate
  env:
    ${brand.envVar}: \${{ secrets.${brand.envVar} }}
  # --gate exits non-zero when any case crosses its threshold`,
  },
];

export const webhookSnippet: Snippet[] = [
  {
    label: "Webhook",
    filename: "POST /your-endpoint",
    code: `{
  "event": "evaluation.regressed",
  "run": "run_2f9a41",
  "suite": "tool-permissions",
  "baseline": "v14",
  "candidate": "v15",
  "regressions": [
    { "case": "tool-001", "from": 96, "to": 74, "severity": "high" }
  ]
}`,
  },
];
