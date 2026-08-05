"use client";

import { useEffect, useState } from "react";

import { AppFrame, FrameSegments, KpiTile, Th } from "@/components/visuals/AppFrame";
import { LiveDot, StatusPill, statusMeta } from "@/components/ui/Status";
import { heroStream, sampleApps } from "@/data/demo";
import { cn } from "@/lib/cn";
import { useReducedMotion, useTicker } from "@/lib/hooks";

const app = sampleApps[0];

/** Deterministic first paint: the same five rows on server and client. */
const INITIAL = [4, 3, 2, 1, 0];

const dimensionByLabel: Record<string, string> = {
  "Prompt injection resistance": "safety",
  "Unsupported claim detection": "groundedness",
  "Sensitive data exposure": "safety",
  "Tool permission escalation": "tool usage",
  "Citation accuracy": "groundedness",
  "Response consistency": "reliability",
  "Refusal quality": "safety",
  "Multi-turn goal drift": "safety",
  "Escalation rule coverage": "policy",
  "Argument scope validation": "tool usage",
};

const latencyByIndex = [1260, 1210, 1120, 1520, 1490, 1180, 1010, 2380, 860, 1290];

export function EvalStream({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [running, setRunning] = useState(true);
  // Single source of truth: the newest row is the cursor. Keeping one piece of
  // state means the updater stays pure and cannot double-append.
  const [rows, setRows] = useState<number[]>(INITIAL);
  const cursor = rows[0];

  useEffect(() => {
    if (reduced) setRunning(false);
  }, [reduced]);

  useTicker(
    () => {
      setRows((current) => [(current[0] + 1) % heroStream.length, ...current].slice(0, 4));
    },
    1600,
    running && !reduced,
  );

  const live = running && !reduced;

  return (
    <AppFrame
      className={className}
      rail="runs"
      breadcrumb={["prooflayer", app.short.toLowerCase().replace(/\s+/g, "-"), "run_2f9a41"]}
      actions={
        <>
          <FrameSegments items={["Cases", "Trace", "Report"]} active="Cases" />
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            aria-pressed={running}
            className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-surface-2 px-2.5 py-1 font-mono text-mono-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
          >
            {live ? <LiveDot /> : null}
            {live ? "Pause" : "Play"}
            <span className="sr-only"> the live evaluation stream</span>
          </button>
        </>
      }
      footer={
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span>Simulated demonstration data</span>
          <span className="text-fg-subtle">
            {120 + cursor} of 128 cases · {app.model}
          </span>
        </span>
      }
    >
      {/* KPI header */}
      <div className="grid grid-cols-2 divide-x divide-line border-b border-line sm:grid-cols-4">
        <KpiTile label="Overall" value="94" delta={{ value: "2", direction: "up" }} />
        <KpiTile
          label="Reliability"
          value="92"
          tone="warn"
          delta={{ value: "3", direction: "down" }}
        />
        <KpiTile
          label="Safety"
          value="96"
          tone="pass"
          delta={{ value: "0", direction: "flat" }}
          className="border-t border-line sm:border-t-0"
        />
        <KpiTile
          label="Latency p95"
          value="2.38"
          unit="s"
          className="border-t border-line sm:border-t-0"
        />
      </div>

      {/* Case table */}
      <div className="rail">
        <table className="w-full min-w-[36rem] border-collapse">
          <caption className="sr-only">
            Live evaluation results for {app.name}, newest case first
          </caption>
          <thead>
            <tr className="border-b border-line">
              <Th>Test case</Th>
              <Th>Dimension</Th>
              <Th sorted="desc">Score</Th>
              <Th>Latency</Th>
              <Th className="text-right">Status</Th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {rows.map((index, position) => {
              const item = heroStream[index];
              const meta = statusMeta[item.status];
              return (
                <tr
                  key={`${index}-${position}-${cursor}`}
                  className={cn(
                    "border-b border-line/70 last:border-0",
                    position === 0 && live && "motion-safe:animate-rise bg-surface/60",
                  )}
                >
                  <td className="px-3.5 py-2.5">
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn("size-1.5 shrink-0 rounded-full", meta.dot)}
                      />
                      <span className="truncate text-[0.8125rem] text-fg">{item.label}</span>
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-mono-xs text-fg-subtle">
                    {dimensionByLabel[item.label] ?? "reliability"}
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-mono-sm text-fg-muted tabular-nums">
                    {item.value ?? (item.status === "fail" ? "74" : item.status === "warn" ? "88" : "100")}
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-mono-xs text-fg-subtle tabular-nums">
                    {latencyByIndex[index]} ms
                  </td>
                  <td className="px-3.5 py-2.5 text-right">
                    <StatusPill status={item.status} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Event line — one row, two states, no ornament */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-3.5 py-2.5">
        <span className="flex items-center gap-2 text-[0.8125rem] text-fg">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-fail" />
          Red-team attack detected
          <span className="font-mono text-mono-xs text-fg-subtle">document #418</span>
        </span>
        <span className="flex items-center gap-2 text-[0.8125rem] text-fg">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
          Guardrail triggered
          <span className="font-mono text-mono-xs text-fg-subtle">refund_limit</span>
        </span>
      </div>
    </AppFrame>
  );
}
