import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/Button";
import { Badge, Band, Card, Container, SectionHeading, StepBadge } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { benefits, hiringProcess, principles, roles } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: `Illustrative roles at ${brand.name}, a fictional AI infrastructure product created as a design and development concept.`,
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help make AI systems easier to trust."
        copy="Specific, unglamorous work: scoring functions, adversarial generation, trace inspection, and documentation that respects the reader."
        meta={["Remote-first", "UK / EU time zones", "Fictional concept roles"]}
      />

      {/* Fiction notice */}
      <Band tone="dark" bordered={false} className="pt-14 sm:pt-16">
        <Container>
          <Card className="border-violet/30 bg-violet-deep/25 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
              <Badge tone="violet" className="shrink-0">
                Please read
              </Badge>
              <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
                <span className="text-fg">{brand.name} is a fictional company.</span> The roles
                below are illustrative. There are no open positions, and no applications are
                collected anywhere on this site.
              </p>
            </div>
          </Card>
        </Container>
      </Band>

      {/* Mission */}
      <Band tone="dark" bordered={false} className="pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Mission"
                title="Trust in AI products is an engineering problem, not a messaging problem."
              />
              <p className="mt-6 text-base leading-relaxed text-fg-muted">
                Teams ship systems that read records, call tools and give answers people rely on —
                without evidence of how those systems behave under pressure. We build the
                measurement layer that makes the answer boring.
              </p>
            </div>
            <div className="flex items-end">
              <p className="border-l-2 border-lime pl-5 font-display text-display-sm text-fg">
                Measure before claiming.
                <span className="mt-2 block font-sans text-sm font-normal text-fg-subtle">
                  The first working principle, applied to our own marketing too.
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Band>

      {/* Principles — light */}
      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Working principles"
            tone="light"
            align="center"
            className="mx-auto"
            title="Four rules we would actually be held to."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Card key={principle.title} tone="light" className="flex flex-col gap-4 p-7">
                <StepBadge tone="light">{String(index + 1).padStart(2, "0")}</StepBadge>
                <h3 className="font-display text-display-sm text-ink">{principle.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{principle.copy}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      {/* Culture + benefits */}
      <Band tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Team culture"
                title="Small team, written by default."
              />
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {[
                  ["Written by default", "Decisions are documented before they are made"],
                  ["Support rotation", "Everyone, including design and leadership"],
                  ["Dissent recorded", "A decision log without disagreement went unread"],
                ].map(([title, detail]) => (
                  <li key={title} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                    <span className="text-sm text-fg">{title}</span>
                    <span className="font-mono text-mono-xs text-fg-subtle sm:text-right">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label">Benefits</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit.title}
                    className="rounded-lg border border-line bg-surface px-4 py-3.5"
                  >
                    <p className="text-sm text-fg">{benefit.title}</p>
                    <p className="mt-1 font-mono text-mono-xs text-fg-subtle">{benefit.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      {/* Hiring process */}
      <Band tone="dark" surface="raised">
        <Container>
          <SectionHeading
            eyebrow="Hiring process"
            title="Five steps, roughly two weeks, no unpaid take-homes."
          />
          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {hiringProcess.map((stage) => (
              <li key={stage.step}>
                <Card className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-xs text-lime">{stage.step}</span>
                    <span className="font-mono text-mono-xs text-fg-subtle">{stage.duration}</span>
                  </div>
                  <h3 className="font-display text-[1.0625rem] leading-snug font-semibold">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{stage.detail}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Band>

      {/* Roles */}
      <Band tone="dark" id="roles">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title="Four illustrative roles."
            copy="Written as they would be if they were real: what the work is, and what you would own."
          />

          <ul className="mt-12 flex flex-col gap-4">
            {roles.map((role) => (
              <li key={role.id}>
                <Card className="p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="lime">{role.team}</Badge>
                        <Badge>{role.location}</Badge>
                        <Badge>{role.type}</Badge>
                      </div>
                      <h3 className="mt-4 font-display text-display-sm">{role.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{role.summary}</p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {role.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-fg-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 size-1 shrink-0 rounded-full bg-lime"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-4 py-2.5 font-mono text-mono-xs text-fg-subtle">
                        <ArrowRight className="size-3" />
                        Concept role · not accepting applications
                      </span>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Band>

      <CTASection
        eyebrow="Meanwhile"
        title="The product is more interesting than the job page."
        copy="Run an evaluation against a sample agent and see what the work actually looks like."
        primary={{ label: "Explore the demo", href: routes.demo }}
        secondary={{ label: "Read the docs", href: routes.docs }}
        note={brand.disclaimer}
      />
    </>
  );
}
