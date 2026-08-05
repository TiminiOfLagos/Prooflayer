import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";

/**
 * Shared hero for inner pages. Centred, like the home hero: eyebrow, headline,
 * one sentence, two actions, an optional metadata rule, then the page's visual
 * below at full width.
 */
export function PageHero({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
  meta,
  children,
  className,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  copy: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  meta?: string[];
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  const centred = align === "center";

  return (
    <section
      data-band="dark"
      className={cn("relative overflow-hidden border-b border-line bg-void", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-30 mask-fade-b" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[32rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-lime/7 blur-[120px]"
      />

      <Container className="relative pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className={cn("flex flex-col", centred ? "items-center text-center" : "items-start")}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <h1 className={cn("mt-7 text-display-xl", centred ? "max-w-3xl" : "max-w-2xl")}>
            {typeof title === "string" ? <Typewriter segments={[{ text: title }]} /> : title}
          </h1>

          <Reveal delay={120} className={cn("w-full", centred && "flex flex-col items-center")}>
            <p
              className={cn(
                "mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base",
                centred && "text-center",
              )}
            >
              {copy}
            </p>

            {primary || secondary ? (
              <div
                className={cn(
                  "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center",
                  centred && "sm:justify-center",
                )}
              >
                {primary ? <ButtonLink href={primary.href}>{primary.label}</ButtonLink> : null}
                {secondary ? (
                  <ButtonLink href={secondary.href} variant="secondary">
                    {secondary.label}
                    <ArrowRight />
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}

            {meta?.length ? (
              <ul
                className={cn(
                  "mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5",
                  centred && "justify-center",
                )}
              >
                {meta.map((item) => (
                  <li key={item} className="font-mono text-mono-xs text-fg-subtle">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>

        {children ? (
          <Reveal delay={180} className="mt-14">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

/** Capability grid: title plus one line. The one-line limit is the point. */
export function CapabilityList({
  items,
  columns = 2,
  tone = "dark",
  className,
}: {
  items: { id?: string; title: string; copy: string; meta?: string }[];
  columns?: 2 | 3;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          id={item.id}
          className={cn(
            "scroll-mt-28 rounded-xl border p-5 transition-colors duration-300",
            tone === "dark"
              ? "border-line bg-surface hover:border-line-strong"
              : "border-hairline bg-paper-2 hover:border-[#d7dade]",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                "text-[0.9375rem] font-medium",
                tone === "dark" ? "text-fg" : "text-ink",
              )}
            >
              {item.title}
            </h3>
            {item.meta ? (
              <span
                className={cn(
                  "shrink-0 font-mono text-mono-xs",
                  tone === "dark" ? "text-fg-subtle" : "text-ink-subtle",
                )}
              >
                {item.meta}
              </span>
            ) : null}
          </div>
          <p
            className={cn(
              "mt-2.5 text-sm leading-relaxed",
              tone === "dark" ? "text-fg-muted" : "text-ink-muted",
            )}
          >
            {item.copy}
          </p>
        </li>
      ))}
    </ul>
  );
}
