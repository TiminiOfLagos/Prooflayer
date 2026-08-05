"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { docCategories } from "@/data/docs";
import { cn } from "@/lib/cn";

/** Left-hand documentation navigation. Sticky on desktop, collapsible on mobile. */
export function DocsNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const tree = (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {docCategories.map((category) => {
        const isCurrentCategory = category.articles.some(
          (article) => pathname === `/docs/${article.slug}`,
        );
        return (
          <div key={category.id}>
            <p
              className={cn(
                "label mb-2.5",
                isCurrentCategory && "text-lime",
              )}
            >
              {category.title}
            </p>
            <ul className="flex flex-col gap-0.5 border-l border-line">
              {category.articles.map((article) => {
                const href = `/docs/${article.slug}`;
                const active = pathname === href;
                return (
                  <li key={article.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "-ml-px block border-l py-1.5 pl-3.5 text-[0.8125rem] leading-snug transition-colors",
                        active
                          ? "border-lime text-lime"
                          : "border-transparent text-fg-muted hover:border-line-strong hover:text-fg",
                      )}
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className={className}>
      {/* Mobile disclosure */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md border border-line-strong bg-surface px-4 py-2.5 font-mono text-mono-xs text-fg-muted lg:hidden"
      >
        Browse documentation
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn("size-3 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      <div className={cn("mt-4 lg:mt-0 lg:block", open ? "block" : "hidden")}>
        <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-4">
          {tree}
        </div>
      </div>
    </div>
  );
}
