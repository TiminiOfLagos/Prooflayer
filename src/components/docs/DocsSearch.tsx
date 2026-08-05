"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { docIndex } from "@/data/docs";
import { cn } from "@/lib/cn";

/** Client-side documentation search over the full article index. */
export function DocsSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (trimmed.length < 2) return [];
    return docIndex
      .filter((article) =>
        `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(trimmed),
      )
      .slice(0, 8);
  }, [trimmed]);

  return (
    <div className={cn("relative", className)}>
      <label htmlFor="docs-search" className="sr-only">
        Search documentation
      </label>
      <div className="flex items-center gap-3 rounded-lg border border-line-strong bg-surface px-4 py-3 focus-within:border-lime">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-4 shrink-0 text-fg-subtle"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" strokeLinecap="round" />
        </svg>
        <input
          id="docs-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the documentation"
          autoComplete="off"
          className="w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
        />
        <kbd className="hidden shrink-0 rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-mono-xs text-fg-subtle sm:block">
          /
        </kbd>
      </div>

      {trimmed.length >= 2 ? (
        <div
          aria-live="polite"
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-line-strong bg-graphite shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 font-mono text-mono-xs text-fg-subtle">
              No documentation matches “{query.trim()}”.
            </p>
          ) : (
            <ul>
              {results.map((article) => (
                <li key={article.slug} className="border-b border-line last:border-0">
                  <Link
                    href={`/docs/${article.slug}`}
                    onClick={() => setQuery("")}
                    className="flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm text-fg">{article.title}</span>
                      <span className="font-mono text-mono-xs text-fg-subtle">
                        {article.category}
                      </span>
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-fg-subtle">
                      {article.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
