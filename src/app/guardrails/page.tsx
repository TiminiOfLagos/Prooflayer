import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { CapabilityList, PageHero } from "@/components/sections/PageHero";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { KpiTile } from "@/components/visuals/AppFrame";
import { GuardrailMatrix } from "@/components/visuals/GuardrailMatrix";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Guardrails",
  description:
    "Validate every policy, filter, permission and response rule against realistic attempts to bypass it.",
};

const policyTypes = [
  { title: "Input policies", copy: "Blocked topics, size limits and classifier thresholds, tested either side of the line.", meta: "pre-model" },
  { id: "output-policies", title: "Output policies", copy: "Required disclosures, forbidden claims and refusal templates, checked on the rendered response.", meta: "post-model" },
  { title: "Tool restrictions", copy: "Which tools exist, for whom, with which argument bounds.", meta: "execution" },
  { title: "Data boundaries", copy: "What the system may read, and which fields never enter a prompt.", meta: "scope" },
  { title: "Retrieval controls", copy: "Permission filtering before reranking, and abstention when evidence is missing.", meta: "rag" },
  { title: "Escalation rules", copy: "When the system must stop and hand over to a person.", meta: "handover" },
  { title: "Human review triggers", copy: "Which outputs reach a reviewer before the user.", meta: "queue" },
  { title: "False positive tracking", copy: "Over-blocking scored on safe traffic, not just adversarial traffic.", meta: "both sides" },
  { title: "Policy versioning", copy: "Change a policy and the affected suites re-run.", meta: "audited" },
];

export default function GuardrailsPage() {
  return (
    <>
      <PageHero
        eyebrow="Guardrails"
        title="Do not assume your guardrails work. Prove it."
        copy="Every policy, filter, permission and response rule, validated against realistic attempts to bypass it."
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "See a coverage report", href: routes.demo }}
      >
        <GuardrailMatrix />
      </PageHero>

      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="What gets validated"
            tone="light"
            align="center"
            className="mx-auto"
            title="A policy you have never attacked is a policy you have never tested."
            copy="Guardrails pass their own unit tests. They fail against input written to get around them."
          />
          <CapabilityList items={policyTypes} columns={3} tone="light" className="mt-14" />
        </Container>
      </Band>

      <Band tone="dark" surface="raised">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Both sides of the line"
                title="Over-blocking is a failure too."
                copy="A filter that refuses 7% of legitimate requests gets switched off by whoever owns the support queue."
              />
              <Card className="mt-9 overflow-hidden p-0">
                <div className="grid grid-cols-2 divide-x divide-line">
                  <KpiTile label="Bypass resistance" value="96" tone="pass" delta={{ value: "4", direction: "up" }} />
                  <KpiTile label="Safe-traffic accuracy" value="93" tone="warn" delta={{ value: "5", direction: "down" }} />
                </div>
                <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
                  <KpiTile label="Policies" value="24" />
                  <KpiTile label="Coverage" value="83" unit="%" />
                  <KpiTile label="Untested" value="2" tone="warn" />
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <CodeBlock
                snippets={[
                  {
                    label: "Python",
                    filename: "policies/refund_limit.py",
                    code: `from ${brand.pythonPackage} import Policy

refund_limit = Policy(
    id="refund-limit",
    rule="Refunds above 250 require human approval",
    enforced_at="tool",          # not "prompt"
    tests=[
        "direct request above the limit",
        "split into two requests below the limit",
        "limit raised by a claimed supervisor",
        "amount supplied inside a quoted document",
    ],
    false_positive_set="safe_refunds_200",
)`,
                  },
                ]}
              />
              <p className="text-sm leading-relaxed text-fg-muted">
                A rule enforced in the prompt is a suggestion. The same rule enforced in the tool
                layer is a control. The matrix marks the difference.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Coverage"
            title="Know which layer each policy is tested at."
            copy="Select any cell to see the tests behind it."
          />
          <GuardrailMatrix className="mt-14" />
        </Container>
      </Band>

      <CTASection
        title="Prove the safeguard before you need it."
        copy="Import your policies and see which layer the bypass attempts stop at."
        secondary={{ label: "Read the docs", href: routes.docs }}
      />
    </>
  );
}
