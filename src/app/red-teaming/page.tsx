import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { CapabilityList, PageHero } from "@/components/sections/PageHero";
import { Badge, Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { AttackMap } from "@/components/visuals/AttackMap";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Red-teaming",
  description:
    "Generate adversarial scenarios and uncover failure modes across prompts, tools, memory, retrieval and multi-agent workflows.",
};

const attackTypes = [
  { title: "Attack generation", copy: "Scenarios derived from your policies, not a generic checklist.", meta: "automated" },
  { title: "Prompt injection", copy: "Instruction-shaped text in user input, documents and tool output.", meta: "direct + indirect" },
  { title: "Instruction conflicts", copy: "Claimed authority and contradictory requests against precedence rules.", meta: "precedence" },
  { id: "data-leakage", title: "Data leakage", copy: "Attempts to reach other accounts, restricted documents or configuration.", meta: "scoped access" },
  { id: "tool-misuse", title: "Tool misuse", copy: "Calls outside scope, arguments beyond bounds, actions without confirmation.", meta: "high severity" },
  { title: "Hallucination pressure", copy: "Questions engineered to reward confident invention.", meta: "abstention" },
  { title: "Multi-turn attacks", copy: "Gradual reframing. Systems that hold on turn one drift by turn nine.", meta: "10+ turns" },
  { title: "Multi-agent simulations", copy: "Hand-offs, borrowed tool access and messages no human reads.", meta: "new" },
  { title: "Custom libraries", copy: "Your own scenarios from real incidents, run on every release.", meta: "yours" },
];

const severities = [
  { level: "High", tone: "fail" as const, meaning: "A user could reach data or an action they are not entitled to.", action: "Blocks the release gate." },
  { level: "Medium", tone: "warn" as const, meaning: "Policy held only partially, or drift occurred late in a session.", action: "Tracked with an owner." },
  { level: "Low", tone: "neutral" as const, meaning: "Correct but inefficient or inconsistent behaviour.", action: "Feeds the backlog." },
];

const stages = [
  { step: "01", title: "Read your policies", copy: "Rules, tool definitions and system description go in." },
  { step: "02", title: "Generate scenarios", copy: "Variants across families, phrasings, turn counts and entry points." },
  { step: "03", title: "Execute for real", copy: "Through retrieval, tools and guardrails — the actual path." },
  { step: "04", title: "Classify and keep", copy: "Anything that got through becomes a permanent regression case." },
];

export default function RedTeamingPage() {
  return (
    <>
      <PageHero
        eyebrow="Red-teaming"
        title="Stress-test the behaviour hiding outside your happy path."
        copy="Adversarial scenarios across prompts, tools, memory, retrieval and multi-agent workflows."
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "Run a simulation", href: routes.demo }}
      >
        <AttackMap />
      </PageHero>

      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Coverage"
            tone="light"
            align="center"
            className="mx-auto"
            title="Nine ways a system gets talked out of its own rules."
            copy="Findings stay in your workspace and are never published as reusable payloads."
          />
          <CapabilityList items={attackTypes} columns={3} tone="light" className="mt-14" />
        </Container>
      </Band>

      <Band tone="dark" surface="raised">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <SectionHeading
              eyebrow="Severity"
              title="Not every finding deserves the same response."
              copy="Severity is assigned by what the failure allows, not by how alarming it sounds."
            />
            <ul className="divide-y divide-line border-y border-line">
              {severities.map((item) => (
                <li key={item.level} className="flex flex-col gap-3 py-5 sm:flex-row sm:gap-6">
                  <Badge tone={item.tone} className="w-fit shrink-0">
                    {item.level}
                  </Badge>
                  <div>
                    <p className="text-sm leading-relaxed text-fg">{item.meaning}</p>
                    <p className="mt-1.5 font-mono text-mono-xs text-fg-subtle">{item.action}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Band>

      <Band tone="dark">
        <Container>
          <SectionHeading eyebrow="How a simulation runs" title="Generate, execute, classify, keep." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((item) => (
              <Card key={item.step} className="flex flex-col gap-3 p-5">
                <span className="font-mono text-mono-xs text-lime">{item.step}</span>
                <h3 className="text-[0.9375rem] font-medium text-fg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{item.copy}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      <CTASection
        title="Find it in a simulation, not in a support thread."
        copy="Run an adversarial suite against a sample agent first."
        secondary={{ label: "Explore the demo", href: routes.demo }}
      />
    </>
  );
}
