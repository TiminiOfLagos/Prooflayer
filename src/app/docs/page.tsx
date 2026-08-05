import type { Metadata } from "next";
import Link from "next/link";

import { RecentDocs } from "@/components/docs/RecentDocs";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge, Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { RadialGlow } from "@/components/ui/Marks";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";
import { installSnippets } from "@/data/code";
import { apiStatus, docCategories, getArticle, popularGuides, sdkCards } from "@/data/docs";
import { changelog } from "@/data/changelog";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Everything you need to test, compare and monitor your AI applications with ${brand.name}.`,
};

export default function DocsLandingPage() {
  return (
    <>
      <Band tone="dark" className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-30 mask-fade-b" />
        <RadialGlow className="-top-32 left-1/4 size-[34rem]" />

        <Container className="relative py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <p className="label">Documentation</p>
              <h1 className="mt-6 text-display-xl">From API key to first evaluation.</h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                Everything you need to test, compare, and monitor your AI applications.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={routes.apiKey}>Create API key</ButtonLink>
                <ButtonLink href={routes.quickstart} variant="secondary">
                  Start quickstart
                  <ArrowRight />
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <DocsSearch />
              <CodeBlock snippets={installSnippets} dense />
            </div>
          </div>
        </Container>
      </Band>

      {/* Categories */}
      <Band tone="dark" bordered={false} className="pt-14 sm:pt-16">
        <Container>
          <SectionHeading eyebrow="Browse" title="Documentation categories" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docCategories.map((category) => (
              <Card
                key={category.id}
                id={
                  category.id === "api"
                    ? "api-reference"
                    : category.id === "sdks"
                      ? "sdks"
                      : undefined
                }
                className="scroll-mt-28 flex flex-col gap-4 p-5"
              >
                <div>
                  <h2 className="font-display text-display-sm">{category.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {category.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5 border-t border-line pt-4">
                  {category.articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/docs/${article.slug}`}
                        className="group flex items-center justify-between gap-3 text-[0.8125rem] text-fg-muted transition-colors hover:text-lime"
                      >
                        <span>{article.title}</span>
                        <span className="shrink-0 font-mono text-mono-xs text-fg-subtle">
                          {article.minutes}m
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      {/* Popular + recent + status */}
      <Band tone="dark" surface="raised">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="label">Popular guides</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {popularGuides.map((slug) => {
                  const article = getArticle(slug);
                  if (!article) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/docs/${slug}`}
                        className="group flex items-start gap-2.5 text-sm text-fg-muted transition-colors hover:text-lime"
                      >
                        <ArrowRight className="mt-1 shrink-0 text-lime" />
                        <span>
                          {article.title}
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-subtle">
                            {article.summary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <RecentDocs />

            <div id="status" className="scroll-mt-28 rounded-xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <p className="label">API status</p>
                <Badge tone="lime">simulated</Badge>
              </div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {apiStatus.map((item) => (
                  <li key={item.service} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 rounded-full",
                          item.state === "operational" ? "bg-pass" : "bg-warn",
                        )}
                      />
                      {item.service}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-mono-xs",
                        item.state === "operational" ? "text-fg-subtle" : "text-warn",
                      )}
                    >
                      {item.state === "operational" ? item.note : "degraded"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      {/* SDKs */}
      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="SDKs"
            title="First-party clients, one behaviour."
            copy="The SDKs wrap the same REST API. Anything the interface can do, your code can do."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {sdkCards.map((sdk) => (
              <Card key={sdk.name} interactive className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-display-sm">{sdk.name}</h3>
                  <Badge>v{sdk.version}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">{sdk.detail}</p>
                <CodeBlock
                  snippets={[{ label: sdk.name, filename: "terminal", code: sdk.install }]}
                  dense
                />
                <Link
                  href={`/docs/${sdk.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-mono-xs text-lime hover:text-fg"
                >
                  Read the {sdk.name} guide
                  <ArrowRight className="size-3" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      {/* Changelog preview */}
      <Band tone="dark" surface="raised">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Changelog" title="Recent releases" />
            <Link
              href={routes.changelog}
              className="inline-flex items-center gap-2 font-mono text-mono-sm text-lime hover:text-fg"
            >
              View all releases
              <ArrowRight />
            </Link>
          </div>

          <ul className="mt-10 flex flex-col gap-3">
            {changelog.slice(0, 3).map((entry) => (
              <li key={entry.version}>
                <Link href={`${routes.changelog}#${entry.id}`} className="group block">
                  <Card interactive className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex shrink-0 items-center gap-3">
                      <Badge tone="lime">{entry.version}</Badge>
                      <span className="font-mono text-mono-xs text-fg-subtle">{entry.date}</span>
                    </div>
                    <p className="flex-1 text-sm text-fg">{entry.title}</p>
                    <ArrowRight className="hidden shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 sm:block" />
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Band>

      <CTASection
        eyebrow="Start here"
        title="The quickstart ends with a failing test."
        copy="That is the point. A suite that passes on the first run is usually measuring the wrong thing."
        primary={{ label: "Start quickstart", href: routes.quickstart }}
        secondary={{ label: "Create API key", href: routes.apiKey }}
      />
    </>
  );
}
