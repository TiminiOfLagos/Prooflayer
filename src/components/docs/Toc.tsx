"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export type TocItem = { id: string; title: string; level: 2 | 3 };

/** On-page table of contents with scroll-spy. */
export function Toc({ items, className }: { items: TocItem[]; className?: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className={className}>
      <p className="label mb-3">On this page</p>
      <ul className="flex flex-col gap-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 text-[0.8125rem] leading-snug transition-colors",
                item.level === 3 ? "pl-6" : "pl-3.5",
                activeId === item.id
                  ? "border-lime text-lime"
                  : "border-transparent text-fg-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
