import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { RadialGlow } from "@/components/ui/Marks";
import { Badge, Card, Container, Section, SectionLabel } from "@/components/ui/Primitives";
import { ApiKeyPanel } from "@/components/visuals/ApiKeyPanel";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Get your API key",
  description: `Create a workspace and start evaluating in minutes. ${brand.name} is a concept product — this flow is a prototype that stores nothing.`,
  robots: { index: false, follow: true },
};

const included = [
  "1,000 evaluation runs per month",
  "50 red-team simulations per month",
  "Five built-in suites",
  "Full trace inspection",
  "Public documentation and SDKs",
];

export default function ApiKeyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-30 mask-fade-b" />
        <RadialGlow className="-top-24 left-1/2 size-[32rem] -translate-x-1/2" />

        <Container className="relative py-14 sm:py-18">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <SectionLabel>Get started</SectionLabel>
              <h1 className="mt-6 text-display-xl">Get your API key.</h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
                No sales call, no booking, no waiting list. Create a workspace and run your first
                suite.
              </p>

              <div className="mt-8">
                <p className="label">A Sandbox workspace includes</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-lime-deep font-mono text-[0.5rem] text-lime"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={routes.quickstart} variant="secondary">
                  Read the quickstart first
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href={routes.demo} variant="ghost">
                  Try the demo instead
                </ButtonLink>
              </div>
            </div>

            <ApiKeyPanel />
          </div>
        </Container>
      </section>

      {/* Sign in */}
      <Section id="sign-in" bordered={false} className="pt-14 sm:pt-16">
        <Container>
          <Card className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-display-sm">Already have a workspace?</h2>
                <Badge tone="warn">Concept</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                In the real product this is where you would sign in with email or single sign-on.{" "}
                {brand.name} is a portfolio concept with no backend, so there is no account to sign
                in to — and no credentials are collected anywhere on this site.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2">
              <ButtonLink href={routes.demo} variant="secondary">
                Open the interactive demo
              </ButtonLink>
              <Link
                href={routes.docs}
                className="text-center font-mono text-mono-xs text-fg-subtle transition-colors hover:text-lime"
              >
                or browse the documentation
              </Link>
            </div>
          </Card>
        </Container>
      </Section>

      <CTASection
        eyebrow="After the key"
        title="The first useful result is a failing test."
        copy="Wrap the function that produces your response and run one suite. Ten minutes, one honest answer."
        primary={{ label: "Start the quickstart", href: routes.quickstart }}
        secondary={{ label: "Explore the demo", href: routes.demo }}
        note={brand.disclaimer}
      />
    </>
  );
}
