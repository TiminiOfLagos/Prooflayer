"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { useReducedMotion, useTicker } from "@/lib/hooks";

/* ------------------------------------------------------------------ data */

const cases = [
  { name: "Prompt injection resistance", dim: "safety", score: 100, ms: 1260, state: "pass" },
  { name: "Unsupported claim detection", dim: "groundedness", score: 85, ms: 1210, state: "warn" },
  { name: "Sensitive data exposure", dim: "safety", score: 100, ms: 1120, state: "pass" },
  { name: "Tool permission escalation", dim: "tool usage", score: 74, ms: 1520, state: "fail" },
  { name: "Citation accuracy", dim: "groundedness", score: 88, ms: 1490, state: "warn" },
  { name: "Response consistency", dim: "reliability", score: 92, ms: 1180, state: "pass" },
  { name: "Refusal quality", dim: "safety", score: 98, ms: 1010, state: "pass" },
  { name: "Multi-turn goal drift", dim: "safety", score: 80, ms: 2380, state: "warn" },
] as const;

const INITIAL = [3, 2, 1, 0];

const stateStyles = {
  pass: { dot: "bg-pass", text: "text-pass", label: "Passed", glyph: "✓" },
  warn: { dot: "bg-warn", text: "text-warn", label: "Warning", glyph: "!" },
  fail: { dot: "bg-fail", text: "text-fail", label: "Failed", glyph: "✕" },
} as const;

/* ------------------------------------------------------------- fragments */

function Sparkline({ points, tone }: { points: number[]; tone: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const d = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-6 w-16" aria-hidden="true">
      <path d={d} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={tone} />
    </svg>
  );
}

function Kpi({
  label,
  value,
  unit,
  delta,
  direction,
  spark,
  tone,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  direction?: "up" | "down" | "flat";
  spark: number[];
  tone: "fg" | "pass" | "warn" | "fail";
  className?: string;
}) {
  const valueTone =
    tone === "pass" ? "text-pass" : tone === "warn" ? "text-warn" : tone === "fail" ? "text-fail" : "text-fg";
  const strokeTone =
    tone === "pass"
      ? "stroke-pass/70"
      : tone === "warn"
        ? "stroke-warn/70"
        : tone === "fail"
          ? "stroke-fail/70"
          : "stroke-fg-subtle";

  return (
    <div className={cn("min-w-0 px-4 py-3.5", className)}>
      <p className="label truncate">{label}</p>
      <div className="mt-2.5 flex items-end justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className={cn("font-display text-[1.75rem] leading-none font-semibold", valueTone)}>
            {value}
            {unit ? <span className="ml-0.5 text-sm font-medium text-fg-subtle">{unit}</span> : null}
          </span>
          {delta ? (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-[0.625rem]",
                direction === "up" && "bg-pass-deep text-pass",
                direction === "down" && "bg-fail-deep text-fail",
                direction === "flat" && "bg-surface-3 text-fg-subtle",
              )}
            >
              <span aria-hidden="true">
                {direction === "up" ? "↑" : direction === "down" ? "↓" : "→"}
              </span>
              {delta}
            </span>
          ) : null}
        </div>
        <Sparkline points={spark} tone={strokeTone} />
      </div>
    </div>
  );
}

/** Floating glass annotation that overlaps the panel edge. */
function FloatChip({
  className,
  tone = "fail",
  title,
  meta,
  delay = 0,
}: {
  className?: string;
  tone?: "fail" | "violet" | "lime";
  title: string;
  meta: string;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "glass-dark absolute z-20 flex items-center gap-3 rounded-xl px-3.5 py-2.5 motion-safe:animate-rise",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[0.6875rem]",
          tone === "fail" && "border-fail/35 bg-fail-deep text-fail",
          tone === "violet" && "border-violet/35 bg-violet-deep text-violet",
          tone === "lime" && "border-lime/35 bg-lime-deep text-lime",
        )}
      >
        {tone === "fail" ? "▲" : tone === "violet" ? "◆" : "✓"}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8125rem] leading-tight font-medium text-fg">{title}</span>
        <span className="mt-0.5 block font-mono text-[0.6875rem] text-fg-subtle">{meta}</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ main */

export function HeroDashboard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [running, setRunning] = useState(true);
  const [rows, setRows] = useState<number[]>(INITIAL);

  useEffect(() => {
    if (reduced) setRunning(false);
  }, [reduced]);

  useTicker(
    () => setRows((current) => [(current[0] + 1) % cases.length, ...current].slice(0, 4)),
    1900,
    running && !reduced,
  );

  const live = running && !reduced;

  return (
    <div className={cn("relative", className)}>
      {/* stacked card behind, for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 -top-4 h-16 rounded-2xl border border-line bg-graphite/70 sm:inset-x-12"
      />

      <div className="panel-dark relative overflow-hidden rounded-2xl">
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-line bg-surface/70 px-4 py-3">
          <span className="flex items-center gap-2 font-mono text-mono-xs text-fg-subtle">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </span>
          <span className="mx-auto hidden items-center gap-2 rounded-md border border-line bg-graphite px-3 py-1 font-mono text-mono-xs text-fg-subtle sm:flex">
            prooflayer.dev/runs/2f9a41
          </span>
          <span className="ml-auto flex items-center gap-2 sm:ml-0">
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-lime/25 bg-lime-deep px-2.5 py-1 font-mono text-[0.625rem] text-lime",
              )}
            >
              <span
                className={cn("size-1.5 rounded-full bg-lime", live && "motion-safe:animate-pulse-soft")}
              />
              {live ? "running" : "paused"}
            </span>
            <button
              type="button"
              onClick={() => setRunning((value) => !value)}
              aria-pressed={running}
              className="rounded-md border border-line-strong bg-surface-2 px-2.5 py-1 font-mono text-[0.625rem] text-fg-muted transition-colors hover:text-fg"
            >
              {live ? "Pause" : "Play"}
              <span className="sr-only"> the live evaluation stream</span>
            </button>
          </span>
        </div>

        <div className="flex">
          {/* icon rail */}
          <div
            aria-hidden="true"
            className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-line bg-graphite/60 py-4 lg:flex"
          >
            <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-lime">
              <svg viewBox="0 0 24 24" className="size-4" fill="none">
                <path d="M12 3 21 7l-9 4-9-4 9-4Z" className="fill-fg-inverse" />
              </svg>
            </span>
            {["M3 4h10M3 8h7M3 12h4", "M3 3h10v10H3zM3 6.5h10", "M8 2.5 14 13H2z", "M8 2.5 13 4.4v4.1c0 2.9-2.1 4.9-5 5.5-2.9-.6-5-2.6-5-5.5V4.4z"].map(
              (d, index) => (
                <span
                  key={d}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    index === 0 ? "bg-surface-3 text-lime" : "text-fg-subtle",
                  )}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={d} />
                  </svg>
                </span>
              ),
            )}
          </div>

          <div className="min-w-0 flex-1">
            {/* run header */}
            <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-4 pt-5 sm:px-6">
              <div>
                <p className="label">Evaluation run</p>
                <h3 className="mt-2 font-display text-[1.375rem] leading-none font-semibold text-fg">
                  Customer support agent
                </h3>
                <p className="mt-2 font-mono text-mono-xs text-fg-subtle">
                  suite: prompt-injection · 128 cases · gpt-class-4o
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[0.625rem] text-fg-muted">
                  Compare
                </span>
                <span className="rounded-md bg-lime px-2.5 py-1.5 font-mono text-[0.625rem] text-fg-inverse shadow-[inset_0_-2px_3px_rgba(0,0,0,0.2)]">
                  Export report
                </span>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 divide-x divide-line border-y border-line lg:grid-cols-4">
              <Kpi
                label="Overall"
                value="94"
                delta="2"
                direction="up"
                tone="fg"
                spark={[88, 90, 89, 92, 91, 94]}
              />
              <Kpi
                label="Reliability"
                value="92"
                delta="3"
                direction="down"
                tone="warn"
                spark={[96, 95, 95, 93, 94, 92]}
              />
              <Kpi
                label="Safety"
                value="96"
                delta="0"
                direction="flat"
                tone="pass"
                spark={[95, 96, 96, 95, 96, 96]}
                className="border-t border-line lg:border-t-0"
              />
              <Kpi
                label="Latency p95"
                value="2.38"
                unit="s"
                tone="fg"
                spark={[2.1, 2.2, 2.15, 2.3, 2.34, 2.38]}
                className="border-t border-line lg:border-t-0"
              />
            </div>

            {/* live case table */}
            <div className="rail">
              <table className="w-full min-w-[34rem] border-collapse">
                <caption className="sr-only">Live evaluation results, newest first</caption>
                <thead>
                  <tr className="border-b border-line">
                    {["Test case", "Dimension", "Score", "Latency", "Status"].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className={cn(
                          "label px-4 py-2.5 text-left font-normal whitespace-nowrap sm:px-6",
                          heading === "Status" && "text-right",
                        )}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody aria-live="polite">
                  {rows.map((index, position) => {
                    const item = cases[index];
                    const style = stateStyles[item.state];
                    return (
                      <tr
                        key={`${index}-${position}`}
                        className={cn(
                          "border-b border-line/60 last:border-0",
                          position === 0 && live && "motion-safe:animate-rise bg-surface/50",
                        )}
                      >
                        <td className="px-4 py-3 sm:px-6">
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={cn("size-1.5 shrink-0 rounded-full", style.dot)}
                            />
                            <span className="truncate text-[0.8125rem] text-fg">{item.name}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-mono-xs text-fg-subtle sm:px-6">
                          {item.dim}
                        </td>
                        <td className="px-4 py-3 font-mono text-mono-sm text-fg-muted tabular-nums sm:px-6">
                          {item.score}
                        </td>
                        <td className="px-4 py-3 font-mono text-mono-xs text-fg-subtle tabular-nums sm:px-6">
                          {item.ms} ms
                        </td>
                        <td className="px-4 py-3 text-right sm:px-6">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 font-mono text-mono-xs",
                              style.text,
                            )}
                          >
                            <span aria-hidden="true" className="text-[0.7em]">
                              {style.glyph}
                            </span>
                            {style.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* the panel melts into the page rather than stopping hard */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        />
      </div>

      {/* floating annotations */}
      <FloatChip
        className="-right-2 top-24 hidden sm:flex lg:-right-8"
        tone="fail"
        title="Red-team attack detected"
        meta="injected instruction · doc #418"
        delay={500}
      />
      <FloatChip
        className="-left-2 bottom-16 hidden sm:flex lg:-left-8"
        tone="violet"
        title="Guardrail triggered"
        meta="refund_limit · argument blocked"
        delay={800}
      />
    </div>
  );
}
