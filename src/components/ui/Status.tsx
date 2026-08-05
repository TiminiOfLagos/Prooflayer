import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type Status = "pass" | "warn" | "fail" | "running" | "queued";

/**
 * Status is never communicated by colour alone: every state carries a glyph
 * and a text label, so the result reads correctly in greyscale and to
 * screen readers.
 */
export const statusMeta: Record<
  Status,
  { label: string; glyph: string; text: string; bg: string; border: string; dot: string }
> = {
  pass: {
    label: "Passed",
    glyph: "✓",
    text: "text-pass",
    bg: "bg-pass-deep",
    border: "border-pass/40",
    dot: "bg-pass",
  },
  warn: {
    label: "Warning",
    glyph: "!",
    text: "text-warn",
    bg: "bg-warn-deep",
    border: "border-warn/40",
    dot: "bg-warn",
  },
  fail: {
    label: "Failed",
    glyph: "✕",
    text: "text-fail",
    bg: "bg-fail-deep",
    border: "border-fail/40",
    dot: "bg-fail",
  },
  running: {
    label: "Running",
    glyph: "▶",
    text: "text-violet",
    bg: "bg-violet-deep",
    border: "border-violet/40",
    dot: "bg-violet",
  },
  queued: {
    label: "Queued",
    glyph: "·",
    text: "text-fg-subtle",
    bg: "bg-surface-2",
    border: "border-line-strong",
    dot: "bg-fg-subtle",
  },
};

export function StatusPill({
  status,
  label,
  className,
  size = "md",
}: {
  status: Status;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono whitespace-nowrap",
        meta.bg,
        meta.border,
        meta.text,
        size === "sm" ? "px-2 py-0.5 text-mono-xs" : "px-2.5 py-1 text-mono-xs",
        className,
      )}
    >
      <span aria-hidden="true" className="text-[0.7em] leading-none">
        {meta.glyph}
      </span>
      {label ?? meta.label}
    </span>
  );
}

/** Live indicator dot — pulses only when animation is allowed. */
export function LiveDot({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <span className={cn("relative flex size-2 shrink-0", className)}>
      <span
        className={cn(
          "absolute inline-flex size-full rounded-full bg-lime",
          active && "motion-safe:animate-pulse-dot",
        )}
      />
    </span>
  );
}

/**
 * Large evaluation score. The number is the hero; the bar is a redundant,
 * non-colour-dependent encoding of the same value.
 */
export function ScoreCard({
  label,
  value,
  unit = "%",
  status = "pass",
  note,
  className,
}: {
  label: string;
  value: number;
  unit?: string;
  status?: Status;
  note?: ReactNode;
  className?: string;
}) {
  const meta = statusMeta[status];
  return (
    <div className={cn("rounded-lg border border-line bg-surface-2 p-4", className)}>
      <p className="label truncate">{label}</p>
      <p className={cn("mt-2 font-display text-[2rem] leading-none font-semibold", meta.text)}>
        {value}
        <span className="ml-0.5 text-base font-medium text-fg-subtle">{unit}</span>
      </p>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-3">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-out", meta.dot)}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      {note ? <p className="mt-2 font-mono text-mono-xs text-fg-subtle">{note}</p> : null}
    </div>
  );
}

/** Compact metric used in dense product panels. */
export function Metric({
  label,
  value,
  tone = "default",
  className,
}: {
  label: string;
  value: ReactNode;
  tone?: "default" | "lime" | "violet";
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-line bg-surface-2 px-3.5 py-3", className)}>
      <p className="label truncate">{label}</p>
      <p
        className={cn(
          "mt-1.5 font-mono text-sm",
          tone === "lime" && "text-lime",
          tone === "violet" && "text-violet",
          tone === "default" && "text-fg",
        )}
      >
        {value}
      </p>
    </div>
  );
}
