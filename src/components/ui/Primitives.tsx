import type { ElementType, ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export type Tone = "dark" | "light";

/** Page gutter. One value everywhere, so vertical rhythm stays aligned. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        // One page width, shared with the header, so every section's content
        // starts and ends on the same vertical line as the navigation.
        "mx-auto w-full px-5 sm:px-8",
        (size === "wide" || size === "default") && "max-w-[86rem]",
        size === "narrow" && "max-w-[52rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A band is a full-width horizontal slice of the page in one tone.
 * `data-band` is read by the header so nav colours can adapt as it scrolls
 * over light sections.
 */
export function Band({
  children,
  className,
  id,
  tone = "dark",
  surface = "base",
  bordered = true,
  as: Component = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
  /** base = the band's primary colour, raised = one step in from it. */
  surface?: "base" | "raised";
  bordered?: boolean;
  as?: ElementType;
}) {
  return (
    <Component
      id={id}
      data-band={tone}
      className={cn(
        "section-y relative",
        tone === "dark" && (surface === "base" ? "bg-void text-fg" : "bg-graphite text-fg"),
        tone === "light" && (surface === "base" ? "bg-paper text-ink" : "bg-paper-3 text-ink"),
        bordered && (tone === "dark" ? "border-t border-line" : "border-t border-hairline"),
        className,
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Section eyebrow: a small filled pill with an inner bottom shadow.
 * Sentence case on dark, uppercase mono on light — one idea, two registers.
 */
export function Eyebrow({
  children,
  tone = "dark",
  accent = "lime",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  accent?: "lime" | "neutral" | "violet";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 eyebrow font-medium",
        tone === "dark"
          ? "shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]"
          : "shadow-[inset_0_-2px_4px_rgba(10,12,15,0.06)]",
        tone === "dark" && accent === "lime" && "border-lime/25 bg-lime-deep text-lime",
        tone === "dark" && accent === "neutral" && "border-line-strong bg-surface-2 text-fg-muted",
        tone === "dark" && accent === "violet" && "border-violet/25 bg-violet-deep text-violet",
        tone === "light" && accent === "lime" && "border-lime-dim/30 bg-lime-wash text-[#4a6207]",
        tone === "light" && accent === "neutral" && "border-hairline bg-paper-2 text-ink-muted",
        tone === "light" && accent === "violet" && "border-violet/25 bg-violet-wash text-[#4b3fa8]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Metadata chip used inside product surfaces. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "lime" | "violet" | "pass" | "warn" | "fail";
  className?: string;
}) {
  const tones = {
    neutral: "border-line-strong bg-surface-2 text-fg-muted",
    lime: "border-lime/25 bg-lime-deep text-lime",
    violet: "border-violet/25 bg-violet-deep text-violet",
    pass: "border-pass/25 bg-pass-deep text-pass",
    warn: "border-warn/25 bg-warn-deep text-warn",
    fail: "border-fail/25 bg-fail-deep text-fail",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-mono-xs whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Surface card. Stroke, inner highlight and elevation come from one utility. */
export function Card({
  children,
  className,
  tone = "dark",
  interactive = false,
  id,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  interactive?: boolean;
  id?: string;
  as?: ElementType;
}) {
  return (
    <Component
      id={id}
      className={cn(
        "rounded-2xl",
        tone === "dark" ? "panel-dark" : "panel-light",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        interactive && tone === "dark" && "hover:border-line-strong",
        interactive && tone === "light" && "hover:border-[#d7dade]",
        className,
      )}
    >
      {children}
    </Component>
  );
}

/** Step marker: 01 / 02 / 03, as a solid disc. */
export function StepBadge({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full font-mono text-mono-xs",
        tone === "dark"
          ? "bg-fg text-fg-inverse shadow-[inset_0_-2px_4px_rgba(0,0,0,0.25)]"
          : "bg-ink text-paper-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Section opener. Centred by default — the editorial references all centre the
 * argument and let the visual carry the width.
 */
export function SectionHeading({
  eyebrow,
  tag,
  title,
  lede,
  copy,
  align = "left",
  tone = "dark",
  size = "lg",
  className,
  accent = "lime",
}: {
  eyebrow?: string;
  /** @deprecated alias for `eyebrow` */
  tag?: string;
  /** Optional greyed first line, printed above the title. */
  lede?: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  size?: "md" | "lg" | "xl";
  className?: string;
  accent?: "lime" | "neutral" | "violet";
}) {
  const kicker = eyebrow ?? tag;

  return (
    <Reveal
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <Eyebrow tone={tone} accent={accent}>
          {kicker}
        </Eyebrow>
      ) : null}

      <h2
        className={cn(
          kicker && "mt-6",
          size === "xl" && "text-display-xl",
          size === "lg" && "text-display-lg",
          size === "md" && "text-display-md",
          align === "center" ? "max-w-3xl" : "max-w-2xl",
        )}
      >
        {lede ? (
          <span className={cn("block", tone === "dark" ? "text-fg-subtle" : "text-ink-subtle")}>
            {lede}
          </span>
        ) : null}
        {title}
      </h2>

      {copy ? (
        <p
          className={cn(
            "mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base",
            tone === "dark" ? "text-fg-muted" : "text-ink-muted",
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------
   Compatibility shims.
   Pages are being converted to <Band> / <Eyebrow>; these keep the older call
   sites rendering correctly in the new system until each page is rewritten.
   ------------------------------------------------------------------------- */

/** @deprecated use <Band tone=… surface=…> */
export function Section({
  children,
  className,
  id,
  bordered = true,
  as,
  tone = "void",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
  as?: ElementType;
  tone?: "void" | "graphite" | "surface" | "light";
}) {
  return (
    <Band
      id={id}
      className={className}
      bordered={bordered}
      as={as}
      tone={tone === "light" ? "light" : "dark"}
      surface={tone === "graphite" || tone === "surface" ? "raised" : "base"}
    >
      {children}
    </Band>
  );
}

/** @deprecated use <Eyebrow> */
export function Tag({
  children,
  tone = "lime",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "lime" | "violet" | "invert";
  className?: string;
}) {
  return (
    <Eyebrow
      tone={tone === "invert" ? "light" : "dark"}
      accent={tone === "invert" ? "neutral" : tone}
      className={className}
    >
      {children}
    </Eyebrow>
  );
}

/** @deprecated use the `label` utility directly */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label", className)}>{children}</p>;
}

/** Short accent rule used inside two-line headings. */
export function Rule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("ml-3 inline-block h-[3px] w-10 align-middle bg-lime", className)}
    />
  );
}

/** Hairline divider that matches the current band. */
export function Hairline({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full", tone === "dark" ? "bg-line" : "bg-hairline", className)}
    />
  );
}
