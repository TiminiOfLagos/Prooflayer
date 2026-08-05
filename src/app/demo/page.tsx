import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { Badge, Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { DemoConsole } from "@/components/visuals/DemoConsole";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { dimensions, sampleApps, suites } from "@/data/demo";

export const metadata: Metadata = {
  title: "Interactive demo",
  description:
    "Run a full evaluation against a sample AI application with simulated data — no account, no sales call.",
};

const flow = [
  "Select a sample AI application",
  "Select an evaluation suite",
  "Review the test configuration",
  "Run the evaluation",
  "Watch test cases execute",
  "View the results",
  "Inspect individual failures",
  "Take the recommended next steps",
  "Create an API key",
];

export default function DemoPage() {
  return (
    <>
      <Band tone="dark" className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-30 mask-fade-b" />
        <Container className="relative py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end">
            <div>
              <Badge tone="lime" className="mb-6">
                <span aria-hidden="true">▶</span> Interactive demo
              </Badge>
              <h1 className="text-display-xl">Run an evaluation before creating an account.</h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
                The real interface, running on simulated data. Open any result and read the trace
                behind it.
              </p>
            </div>

            <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {flow.map((step, index) => (
                <li
                  key={step}
                  className="flex items-baseline gap-3 font-mono text-mono-xs text-fg-subtle"
                >
                  <span className="text-lime">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      <Band tone="dark" bordered={false} className="pt-12 sm:pt-14">
        <Container>
          <DemoConsole variant="full" />
        </Container>
      </Band>

      <Band tone="dark" surface="raised">
        <Container>
          <SectionHeading
            eyebrow="What you are testing"
            title="Four sample applications, each with its own failure profile."
            copy="Fictional, but they fail the way real systems do: invented citations, exceeded scope, drift into advice."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {sampleApps.map((app) => (
              <Card key={app.id} className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-display-sm">{app.name}</h3>
                  <Badge>{app.surface}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">{app.summary}</p>
                <dl className="grid gap-2 border-t border-line pt-4 font-mono text-mono-xs sm:grid-cols-2">
                  <div>
                    <dt className="text-fg-subtle">model</dt>
                    <dd className="mt-0.5 text-fg-muted">{app.model}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">retrieval</dt>
                    <dd className="mt-0.5 text-fg-muted">{app.retrieval}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-fg-subtle">tools</dt>
                    <dd className="mt-0.5 text-fg-muted">{app.tools.join(", ")}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      <Band tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Suites"
                title="Five suites, three kinds of question."
              />
              <ul className="mt-8 flex flex-col gap-3">
                {suites.map((suite) => (
                  <li key={suite.id} className="rounded-lg border border-line bg-surface p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-medium text-fg">{suite.name}</h3>
                      <Badge
                        tone={
                          suite.kind === "red-team"
                            ? "fail"
                            : suite.kind === "guardrail"
                              ? "violet"
                              : "lime"
                        }
                      >
                        {suite.kind}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {suite.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading
                eyebrow="Result categories"
                title="What every run reports back."
              />
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {dimensions.map((dimension) => (
                  <li
                    key={dimension.id}
                    className="rounded-lg border border-line bg-surface px-4 py-3"
                  >
                    <p className="text-sm text-fg">{dimension.label}</p>
                    <p className="mt-1 font-mono text-mono-xs text-fg-subtle">{dimension.blurb}</p>
                  </li>
                ))}
                <li className="rounded-lg border border-line bg-surface px-4 py-3">
                  <p className="text-sm text-fg">Latency</p>
                  <p className="mt-1 font-mono text-mono-xs text-fg-subtle">p50 and p95 per run</p>
                </li>
                <li className="rounded-lg border border-line bg-surface px-4 py-3">
                  <p className="text-sm text-fg">Cost</p>
                  <p className="mt-1 font-mono text-mono-xs text-fg-subtle">per run and per suite</p>
                </li>
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-fg-muted">
                Categories with no cases are marked{" "}
                <span className="font-mono text-mono-xs text-fg">not covered</span>, never scored
                as zero. Coverage is part of the result.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <CTASection
        eyebrow="After the demo"
        title="Now run it against your own agent."
        copy="The same suites, pointed at your system — plus the ones only your product needs."
        note={`${brand.name} is a concept product. The demo uses simulated data and contacts no external service.`}
        secondary={{ label: "View quickstart", href: routes.quickstart }}
      />
    </>
  );
}
