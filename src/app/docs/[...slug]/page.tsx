import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsNav } from "@/components/docs/DocsNav";
import { P } from "@/components/docs/Prose";
import { QuickstartArticle, quickstartToc } from "@/components/docs/QuickstartArticle";
import { TrackRecentDoc } from "@/components/docs/RecentDocs";
import { Toc, type TocItem } from "@/components/docs/Toc";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Badge, Container } from "@/components/ui/Primitives";
import { routes } from "@/config/site";
import { docIndex, getArticle, getNeighbours } from "@/data/docs";

const QUICKSTART = "quickstart/run-your-first-evaluation";

export function generateStaticParams() {
  return docIndex.map((article) => ({ slug: article.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug.join("/"));
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function DocArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const article = getArticle(path);

  if (!article) notFound();

  const { previous, next } = getNeighbours(path);
  const isQuickstart = path === QUICKSTART;
  const toc: TocItem[] = isQuickstart
    ? quickstartToc
    : [
        { id: "overview", title: "Overview", level: 2 },
        { id: "in-this-build", title: "In this build", level: 2 },
      ];

  return (
    <Container size="wide" className="py-10 sm:py-12">
      <TrackRecentDoc slug={path} title={article.title} />

      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem] xl:gap-12">
        <DocsNav />

        <article className="min-w-0">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-mono-xs text-fg-subtle">
              <li>
                <Link href={routes.docs} className="transition-colors hover:text-lime">
                  Docs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>{article.category}</li>
              <li aria-hidden="true">/</li>
              <li className="text-fg-muted">{article.title}</li>
            </ol>
          </nav>

          <header className="mt-6 border-b border-line pb-8">
            <h1 className="text-display-lg">{article.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
              {article.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge>{article.minutes} min read</Badge>
              <Badge tone="neutral">{article.category}</Badge>
            </div>
          </header>

          {/* Mobile table of contents */}
          <details className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 xl:hidden">
            <summary className="cursor-pointer font-mono text-mono-xs text-fg-muted">
              On this page
            </summary>
            <div className="mt-3">
              <Toc items={toc} />
            </div>
          </details>

          <div className="mt-2">
            {isQuickstart ? (
              <QuickstartArticle />
            ) : (
              <PlaceholderArticle title={article.title} summary={article.summary} />
            )}
          </div>

          {/* Previous / next */}
          <nav
            aria-label="Article navigation"
            className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/docs/${previous.slug}`}
                className="group rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <span className="label">Previous</span>
                <span className="mt-1.5 flex items-center gap-2 text-sm text-fg">
                  <ArrowRight className="rotate-180 text-fg-subtle transition-transform group-hover:-translate-x-1" />
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/docs/${next.slug}`}
                className="group rounded-lg border border-line bg-surface p-4 text-right transition-colors hover:border-line-strong hover:bg-surface-2 sm:col-start-2"
              >
                <span className="label">Next</span>
                <span className="mt-1.5 flex items-center justify-end gap-2 text-sm text-fg">
                  {next.title}
                  <ArrowRight className="text-fg-subtle transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ) : null}
          </nav>
        </article>

        {/* Desktop table of contents */}
        <aside className="hidden xl:block">
          <div className="sticky top-28 flex flex-col gap-6">
            <Toc items={toc} />
            <div className="rounded-lg border border-line bg-surface p-4">
              <p className="label">Ready to run it?</p>
              <p className="mt-2 text-[0.8125rem] leading-snug text-fg-muted">
                A Sandbox workspace includes 1,000 evaluation runs a month.
              </p>
              <ButtonLink href={routes.apiKey} size="sm" className="mt-4 w-full">
                Create API key
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

/**
 * Honest placeholder. The concept build ships one fully written article; every
 * other node in the tree resolves here rather than to a dead link.
 */
function PlaceholderArticle({ title, summary }: { title: string; summary: string }) {
  return (
    <>
      <h2 id="overview" className="scroll-mt-28 pt-10 font-display text-display-md">
        Overview
      </h2>
      <P>{summary}</P>
      <P>
        This page is part of the documentation architecture for a concept product: the navigation,
        search index, reading order and article shell are real and complete.
      </P>

      <h2 id="in-this-build" className="scroll-mt-28 pt-10 font-display text-display-md">
        In this build
      </h2>
      <P>
        One article is written end to end so the documentation template can be judged properly:{" "}
        <Link
          href={`/docs/${QUICKSTART}`}
          className="text-lime underline-offset-4 hover:underline"
        >
          Run your first evaluation
        </Link>
        . It covers prerequisites, installation, authentication, creating a suite, running an
        evaluation, reading the response, handling errors and next steps.
      </P>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/docs/${QUICKSTART}`}>Read the quickstart</ButtonLink>
        <ButtonLink href={routes.docs} variant="secondary">
          Back to documentation
          <ArrowRight />
        </ButtonLink>
      </div>
      <p className="mt-6 font-mono text-mono-xs text-fg-subtle">
        Requested article: {title}
      </p>
    </>
  );
}
