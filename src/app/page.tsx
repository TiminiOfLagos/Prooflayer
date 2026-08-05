import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { CTASection } from "@/components/sections/CTASection";
import { PricingCards } from "@/components/sections/PricingCards";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  Band,
  Card,
  Container,
  Eyebrow,
  SectionHeading,
  StepBadge,
} from "@/components/ui/Primitives";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { DemoConsole } from "@/components/visuals/DemoConsole";
import { HeroDashboard } from "@/components/visuals/HeroDashboard";
import {
  EvaluationsVisual,
  GuardrailsVisual,
  RedTeamVisual,
} from "@/components/visuals/PillarVisuals";
import { RegressionCompare } from "@/components/visuals/RegressionCompare";
import { SystemMap } from "@/components/visuals/SystemMap";
import { WorkflowBento } from "@/components/visuals/WorkflowBento";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { quickstartSnippets } from "@/data/code";

const pillars = [
  {
    step: "01",
    eyebrow: "Evaluations",
    heading: "Test what matters to your product.",
    copy: "Reusable suites for accuracy, safety, consistency, groundedness and task completion.",
    cta: "Explore evaluations",
    href: routes.evaluations,
    visual: <EvaluationsVisual />,
  },
  {
    step: "02",
    eyebrow: "Red-teaming",
    heading: "Find the behaviour you did not design for.",
    copy: "Adversarial scenarios generated from your own policies, across prompts, tools and agents.",
    cta: "Explore red-teaming",
    href: routes.redTeaming,
    visual: <RedTeamVisual />,
  },
  {
    step: "03",
    eyebrow: "Guardrails",
    heading: "Verify that your safeguards actually work.",
    copy: "Every policy attacked directly, with over-blocking measured alongside bypasses.",
    cta: "Explore guardrails",
    href: routes.guardrails,
    visual: <GuardrailsVisual />,
  },
];

const securityPoints = [
  "Encryption in transit and at rest",
  "Configurable data retention",
  "Role-based access",
  "Audit logs",
  "Workspace isolation",
  "Private deployment",
  "Sensitive-data redaction",
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section data-band="dark" className="relative overflow-hidden bg-void">
        <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-30 mask-fade-b" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/8 blur-[140px]"
        />

        <Container size="wide" className="relative pb-24 pt-16 sm:pt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal>
              <Eyebrow>AI reliability infrastructure</Eyebrow>
            </Reveal>

            <h1 className="mt-7 text-display-2xl">
              <Typewriter
                segments={[
                  { text: "Know how your AI " },
                  { text: "breaks", fracture: true },
                  { text: " before your users do." },
                ]}
              />
            </h1>

            <Reveal delay={140} className="flex flex-col items-center">
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted">
                Evaluate model behaviour, simulate adversarial scenarios and validate guardrails
                before production.
              </p>

              <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <ButtonLink href={routes.apiKey} size="lg">
                  Get your API key
                </ButtonLink>
                <ButtonLink href={routes.demo} variant="secondary" size="lg">
                  Explore the demo
                  <ArrowRight />
                </ButtonLink>
              </div>

              <p className="mt-6 font-mono text-mono-xs text-fg-subtle">
                Start testing in minutes · no sales call required
              </p>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <HeroDashboard className="mx-auto mt-16 max-w-6xl" />
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------ system map */}
      <Band tone="dark" surface="raised" className="overflow-hidden">
        <Container size="wide">
          <SystemMap />
        </Container>
      </Band>

      {/* ------------------------------------------- what you can test (light) */}
      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="What you can test"
            tone="light"
            align="center"
            title="Three questions about the same system."
            copy="Most teams need all three. Each one runs against the system you actually shipped."
            className="mx-auto"
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.eyebrow} delay={index * 90}>
                <Card tone="light" interactive className="group flex h-full flex-col p-5">
                  {pillar.visual}

                  <div className="flex flex-1 flex-col px-1 pb-1 pt-6">
                    <div className="flex items-center gap-3">
                      <StepBadge tone="light">{pillar.step}</StepBadge>
                      <Eyebrow tone="light" accent="neutral">
                        {pillar.eyebrow}
                      </Eyebrow>
                    </div>

                    <h3 className="mt-5 font-display text-display-sm text-ink">{pillar.heading}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {pillar.copy}
                    </p>

                    <Link
                      href={pillar.href}
                      className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink transition-colors hover:text-ink-muted"
                    >
                      {pillar.cta}
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Band>

      {/* ---------------------------------------------------- architecture */}
      <Band tone="dark" id="architecture">
        <Container>
          <SectionHeading
            eyebrow="One evaluation layer"
            align="center"
            className="mx-auto"
            title="Test every part of your AI system, not only the model."
            copy="Select a node to see what runs against it."
          />
          <Reveal delay={100}>
            <ArchitectureDiagram className="mt-14" />
          </Reveal>
        </Container>
      </Band>

      {/* -------------------------------------------------- workflow (light) */}
      <Band tone="light" surface="raised" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Workflow"
            tone="light"
            align="center"
            className="mx-auto"
            title="From one test case to continuous confidence."
            copy="Five steps. The first three take an afternoon; the last two run forever."
          />
          <WorkflowBento className="mt-14" />
        </Container>
      </Band>

      {/* --------------------------------------------------- demo preview */}
      <Band tone="dark" surface="raised" id="demo-preview">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:items-start lg:gap-14">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow="Interactive demo"
                title="Run an evaluation before creating an account."
                copy="Pick an application and a suite, then watch the cases execute."
              />
              <Reveal delay={120}>
                <ButtonLink href={routes.demo} variant="secondary" className="mt-8">
                  Open the full demo
                  <ArrowRight />
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <DemoConsole variant="preview" />
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ------------------------------------------------------- regression */}
      <Band tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
            <SectionHeading
              eyebrow="Regression detection"
              title="Know when an update makes your AI worse."
              copy="Compare any two versions against the same suite, case by case."
            />
            <Reveal delay={100}>
              <RegressionCompare />
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* --------------------------------------- developer experience (light) */}
      <Band tone="light" bordered={false}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Built for the workflow"
                tone="light"
                title="Documentation to first evaluation in minutes."
                copy="Wrap the function that produces your response. No agent rewrite, no proxy in front of production."
              />
              <Reveal delay={120}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href={routes.quickstart} tone="light">
                    View quickstart
                  </ButtonLink>
                  <ButtonLink href={routes.apiKey} tone="light" variant="secondary">
                    Get API key
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              {/* the dark code panel sits on the light band as a deliberate object */}
              <div className="rounded-2xl bg-graphite p-1.5 shadow-[0_30px_70px_-40px_rgba(10,12,15,0.6)]">
                <CodeBlock snippets={quickstartSnippets} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* -------------------------------------------------------- security */}
      <Band tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14">
            <SectionHeading
              eyebrow="Security"
              title="Your evaluation data remains yours."
              copy="Runs hold your prompts, documents and failures. They are treated accordingly."
            />

            <Reveal delay={100}>
              <ul className="flex flex-wrap gap-2">
                {securityPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-line bg-surface px-3.5 py-2 text-[0.8125rem] text-fg-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-fg-muted">
                Designed to support enterprise security and compliance requirements. As a concept
                product, {brand.name} holds no certifications and claims none.
              </p>
              <ButtonLink href={routes.security} variant="secondary" className="mt-7">
                Explore security
                <ArrowRight />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ------------------------------------------------- pricing (light) */}
      <Band tone="light" surface="raised" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            tone="light"
            align="center"
            className="mx-auto"
            title="Start free. Pay for what you test."
            copy="Run your first evaluations without speaking to sales."
          />

          <PricingCards className="mt-14" />

          <Reveal delay={150} className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <ButtonLink href={`${routes.pricing}#estimator`} tone="light">
              Estimate your usage
            </ButtonLink>
            <p className="font-mono text-mono-xs text-ink-subtle">
              Prototype pricing for a concept product
            </p>
          </Reveal>
        </Container>
      </Band>

      {/* ------------------------------------------------------- final CTA */}
      <CTASection
        eyebrow="Before your next release"
        title="Your users should not be your first red team."
        copy="Start evaluating your AI system before its next release."
      />
    </>
  );
}
