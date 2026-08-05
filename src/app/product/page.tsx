import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { CapabilityList, PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Band, Card, Container, Eyebrow, SectionHeading, StepBadge } from "@/components/ui/Primitives";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { KpiTile } from "@/components/visuals/AppFrame";
import { WorkflowBento } from "@/components/visuals/WorkflowBento";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { ciSnippet } from "@/data/code";

export const metadata: Metadata = {
  title: "Product overview",
  description: `How ${brand.name} connects evaluation, red-teaming, guardrail testing, regression tracking and monitoring into one reliability layer.`,
};

const questions = [
  {
    step: "01",
    q: "Does it work?",
    a: "Accuracy, consistency, groundedness and task completion, measured on cases you defined.",
    href: routes.evaluations,
    label: "Evaluations",
  },
  {
    step: "02",
    q: "How does it break?",
    a: "Adversarial scenarios generated from your own policies, then classified by severity.",
    href: routes.redTeaming,
    label: "Red-teaming",
  },
  {
    step: "03",
    q: "Do the safeguards hold?",
    a: "Each policy attacked directly, with over-blocking measured alongside bypasses.",
    href: routes.guardrails,
    label: "Guardrails",
  },
  {
    step: "04",
    q: "Did the last change help?",
    a: "Version comparison per case, including cost and latency.",
    href: "#lifecycle",
    label: "Lifecycle",
  },
];

const capabilities = [
  { title: "Evaluation suites", copy: "Versioned files with expected behaviour and thresholds.", meta: "core" },
  { title: "Adversarial simulation", copy: "Scenarios generated from your policies and system description.", meta: "red-team" },
  { title: "Guardrail validation", copy: "Bypass attempts and false positives, scored together.", meta: "policy" },
  { title: "Regression tracking", copy: "Every run is an artefact you can compare and gate on.", meta: "ci" },
  { title: "Trace-level inspection", copy: "Prompt, retrieved chunks, tool calls and arguments, kept per case.", meta: "debug" },
  { title: "Continuous monitoring", copy: "Sample live traffic and score it against the same suites.", meta: "production" },
];

const collaboration = [
  { title: "Shared workspaces", copy: "Engineering, trust and safety, and product read the same runs." },
  { title: "Annotations", copy: "Reviewer labels become new test cases instead of evaporating." },
  { title: "Evaluation reports", copy: "A run, exported as a readable launch-review document." },
  { title: "Release gates", copy: "Decide once which failures block a deploy." },
];

const integrations = [
  ["GitHub Actions", "suites on pull requests"],
  ["GitLab CI", "same command, same gate"],
  ["Webhooks", "regressions into your systems"],
  ["Slack", "alerts on a crossed threshold"],
  ["OpenTelemetry", "traces imported as cases"],
  ["S3-compatible", "run and report export"],
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product overview"
        title="One reliability layer for the complete AI product."
        copy="Evaluation, red-teaming, guardrails, regressions and monitoring, run against one definition of what your system should do."
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "Explore the demo", href: routes.demo }}
        meta={["9 system layers", "5 built-in suites", "Local, CI or scheduled"]}
      />

      {/* Four questions — light */}
      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Platform"
            tone="light"
            align="center"
            className="mx-auto"
            title="Four questions, one system of record."
            copy="Most teams answer these in four disconnected places."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((item, index) => (
              <Reveal key={item.q} delay={index * 80}>
                <Card tone="light" interactive className="group flex h-full flex-col gap-5 p-6">
                  <StepBadge tone="light">{item.step}</StepBadge>
                  <h3 className="font-display text-display-sm text-ink">{item.q}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-ink-muted">{item.a}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink"
                  >
                    {item.label}
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Band>

      {/* Architecture — dark */}
      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Architecture"
            align="center"
            className="mx-auto"
            title="The evaluation layer wraps the system, not the model call."
            copy="Select a node to see what runs against it."
          />
          <Reveal delay={100}>
            <ArchitectureDiagram className="mt-14" />
          </Reveal>
        </Container>
      </Band>

      {/* Capabilities — light */}
      <Band tone="light" surface="raised" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            tone="light"
            align="center"
            className="mx-auto"
            title="What the platform does."
          />
          <CapabilityList items={capabilities} columns={3} tone="light" className="mt-14" />
        </Container>
      </Band>

      {/* Lifecycle — light bento */}
      <Band tone="light" bordered={false} id="lifecycle">
        <Container>
          <SectionHeading
            eyebrow="Evaluation lifecycle"
            tone="light"
            align="center"
            className="mx-auto"
            title="Define once, run forever, compare every time."
            copy="Production behaviour becomes new cases, and new cases raise the floor for the next release."
          />
          <WorkflowBento className="mt-14" />
        </Container>
      </Band>

      {/* Monitoring — dark */}
      <Band tone="dark" id="monitoring">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <SectionHeading
              eyebrow="Continuous monitoring"
              title="Evaluation does not stop at the release."
              copy="Sample live traffic and score it with the same functions CI uses."
            />
            <Reveal delay={100}>
              <Card className="overflow-hidden p-0">
                <div className="grid grid-cols-2 divide-x divide-line border-b border-line sm:grid-cols-3">
                  <KpiTile label="Sampled traffic" value="2" unit="%" />
                  <KpiTile label="Scored daily" value="14.2k" unit="turns" />
                  <KpiTile
                    label="New cases"
                    value="38"
                    delta={{ value: "12", direction: "up" }}
                    className="col-span-2 border-t border-line sm:col-span-1 sm:border-t-0"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-fg-muted">
                    When a sampled turn fails, promote it straight into a suite as a permanent
                    regression case.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Collaboration — dark raised */}
      <Band tone="dark" surface="raised">
        <Container>
          <SectionHeading
            eyebrow="Collaboration"
            title="Reliability work is not one engineer's side project."
          />
          <CapabilityList items={collaboration} className="mt-12" />
        </Container>
      </Band>

      {/* Developer workflow — light */}
      <Band tone="light" bordered={false}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Developer workflow"
                tone="light"
                title="One command locally, the same command in CI."
                copy="An evaluation that only runs on someone's laptop stops running by the third sprint."
              />
              <div className="mt-9">
                <Eyebrow tone="light" accent="neutral">
                  Integrations
                </Eyebrow>
                <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
                  {integrations.map(([name, detail]) => (
                    <li key={name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-sm text-ink">{name}</span>
                      <span className="font-mono text-mono-xs text-ink-subtle">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Reveal delay={100}>
              <div className="rounded-2xl bg-graphite p-1.5 shadow-[0_30px_70px_-40px_rgba(10,12,15,0.6)]">
                <CodeBlock snippets={ciSnippet} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* Deep dives — dark */}
      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Go deeper"
            align="center"
            className="mx-auto"
            title="Three product deep dives."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              { href: routes.evaluations, name: "Evaluations", copy: "Turn expected behaviour into repeatable tests." },
              { href: routes.redTeaming, name: "Red-teaming", copy: "Stress-test the behaviour outside your happy path." },
              { href: routes.guardrails, name: "Guardrails", copy: "Do not assume your guardrails work. Prove it." },
            ].map((item, index) => (
              <Reveal key={item.href} delay={index * 80}>
                <Link href={item.href} className="group block h-full">
                  <Card interactive className="flex h-full flex-col gap-3 p-6">
                    <h3 className="font-display text-display-sm">{item.name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-fg-muted">{item.copy}</p>
                    <span className="inline-flex items-center gap-2 font-mono text-mono-xs text-lime">
                      Read more
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Band>

      <CTASection
        title="Start with one suite and one agent."
        copy="You need one test that fails for a real reason."
        secondary={{ label: "View quickstart", href: routes.quickstart }}
      />
    </>
  );
}
