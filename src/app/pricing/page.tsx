import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/PricingCards";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Band, Card, Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Estimator } from "@/components/visuals/Estimator";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { estimatorConfig } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with a free workspace, then pay for the evaluations and simulations your team runs. Prototype pricing with a transparent formula.",
};

const faqs = [
  {
    q: "What counts as one evaluation run?",
    a: "One test case executed once against one target. A suite of 128 cases run twice is 256 runs.",
  },
  {
    q: "What counts as a red-team simulation?",
    a: "One generated scenario executed end to end, including every turn of a multi-turn exchange.",
  },
  {
    q: "Do failed runs get billed?",
    a: "A run that fails because your target timed out is billed — the work was done. A run that fails inside our infrastructure is not.",
  },
  {
    q: "Can I move up without a migration?",
    a: "Yes. Sandbox and Scale are the same product with different limits. Suites and history carry over.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing that grows with your test coverage."
        copy="Start with a free workspace, then pay for the evaluations and simulations your team runs."
        primary={{ label: "Start free", href: routes.apiKey }}
        secondary={{ label: "Estimate your usage", href: "#estimator" }}
        meta={["No seat minimum", "No sales call", "Prototype pricing"]}
      />

      {/* Tiers on the light band */}
      <Band tone="light" bordered={false}>
        <Container>
          <PricingCards />
          <p className="mt-8 text-center font-mono text-mono-xs text-ink-subtle">
            All figures are prototype pricing for a fictional product concept.
          </p>
        </Container>
      </Band>

      {/* Estimator back on dark, where the data UI belongs */}
      <Band tone="dark" surface="raised" id="estimator">
        <Container>
          <SectionHeading
            eyebrow="Cost estimator"
            align="center"
            className="mx-auto"
            title="Work out what your coverage would cost."
            copy="Every rate and inclusion lives in one configurable object. The breakdown shows how the total was reached."
          />
          <Reveal delay={100}>
            <Estimator className="mt-14" />
          </Reveal>
        </Container>
      </Band>

      {/* Included usage + questions */}
      <Band tone="light" surface="raised" bordered={false}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <SectionHeading
              eyebrow="Included usage"
              tone="light"
              title="What every workspace gets before anything is billed."
            />

            <div>
              <ul className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    value: estimatorConfig.includedRuns.toLocaleString(),
                    label: "evaluation runs / month",
                  },
                  {
                    value: String(estimatorConfig.includedSimulations),
                    label: "red-team simulations",
                  },
                  { value: String(estimatorConfig.includedSeats), label: "team members" },
                ].map((item, index) => (
                  <li key={item.label}>
                    <Reveal delay={index * 80}>
                      <div className="panel-light rounded-xl px-4 py-6 text-center">
                        <p className="font-display text-[2rem] leading-none font-bold text-ink">
                          {item.value}
                        </p>
                        <p className="mt-2.5 font-mono text-mono-xs text-ink-subtle">
                          {item.label}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <div className="mt-8 divide-y divide-hairline border-y border-hairline">
                {faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <h3 className="text-[0.9375rem] font-medium text-ink">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Band>

      {/* Enterprise */}
      <Band tone="dark" id="enterprise">
        <Container>
          <Card className="flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow accent="violet">Enterprise</Eyebrow>
              <h2 className="mt-5 text-display-md">
                When the evaluation data cannot leave your infrastructure.
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                Private deployment, single sign-on, custom retention and a security review. Sales is
                the last step here, not the first.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <ButtonLink href="mailto:enterprise@prooflayer.dev" variant="secondary" size="lg">
                Contact enterprise
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={routes.security} variant="ghost" size="lg">
                Read the security page
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Band>

      <CTASection
        title="Start on the free workspace."
        copy={`1,000 evaluation runs a month is enough to test a real agent properly. ${brand.name} asks for a card when you outgrow it.`}
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "View quickstart", href: routes.quickstart }}
      />
    </>
  );
}
