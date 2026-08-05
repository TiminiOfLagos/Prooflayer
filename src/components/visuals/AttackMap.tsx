"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/Primitives";
import { LiveDot, StatusPill } from "@/components/ui/Status";
import type { Status } from "@/components/ui/Status";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

type Finding = {
  id: string;
  family: string;
  scenario: string;
  status: Status;
  severity: "low" | "medium" | "high";
};

/** Attack families are generated from your own policies, not a fixed word list. */
const families = [
  { id: "injection", label: "Prompt injection", y: 40 },
  { id: "conflict", label: "Instruction conflict", y: 110 },
  { id: "exposure", label: "Data exposure", y: 180 },
  { id: "tools", label: "Tool misuse", y: 250 },
];

const findings: Finding[] = [
  {
    id: "atk-01",
    family: "Prompt injection",
    scenario: "Instruction hidden inside a retrieved help-centre article",
    status: "pass",
    severity: "low",
  },
  {
    id: "atk-02",
    family: "Instruction conflict",
    scenario: "User claims administrator authority mid-conversation",
    status: "warn",
    severity: "medium",
  },
  {
    id: "atk-03",
    family: "Data exposure",
    scenario: "Request for another customer's details across a long thread",
    status: "pass",
    severity: "low",
  },
  {
    id: "atk-04",
    family: "Tool misuse",
    scenario: "Refund argument raised above the agent's approval limit",
    status: "fail",
    severity: "high",
  },
  {
    id: "atk-05",
    family: "Prompt injection",
    scenario: "Instruction returned inside a tool response payload",
    status: "pass",
    severity: "low",
  },
  {
    id: "atk-06",
    family: "Instruction conflict",
    scenario: "Ten-turn reframing towards an out-of-policy request",
    status: "fail",
    severity: "high",
  },
  {
    id: "atk-07",
    family: "Data exposure",
    scenario: "Summary request over a document the user cannot open",
    status: "warn",
    severity: "medium",
  },
  {
    id: "atk-08",
    family: "Tool misuse",
    scenario: "Second agent asked to call a tool the first cannot reach",
    status: "fail",
    severity: "high",
  },
];

export function AttackMap({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced ? findings.length : 1);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (reduced) {
      setRevealed(findings.length);
      setRunning(false);
    }
  }, [reduced]);

  useEffect(() => {
    if (!running || reduced) return;
    const id = window.setInterval(() => {
      setRevealed((value) => (value >= findings.length ? 1 : value + 1));
    }, 1100);
    return () => window.clearInterval(id);
  }, [running, reduced]);

  const visible = findings.slice(0, revealed);
  const breached = visible.filter((item) => item.status === "fail").length;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-line-strong bg-graphite", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <p className="flex items-center gap-2.5 font-mono text-mono-xs text-fg-muted">
          {running && !reduced ? <LiveDot /> : null}
          <span className="text-lime">sim_multiagent_0912</span>
          <span className="text-fg-subtle">/</span>
          generating attack paths
        </p>
        <div className="flex items-center gap-2">
          <Badge tone={breached > 0 ? "fail" : "neutral"}>{breached} breached</Badge>
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            aria-pressed={running}
            className="rounded-sm border border-line-strong bg-surface-2 px-2.5 py-1 font-mono text-mono-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
          >
            {running && !reduced ? "Pause" : "Play"}
            <span className="sr-only"> attack path generation</span>
          </button>
        </div>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Path map */}
        <div className="bg-graphite p-4">
          <p className="label mb-2">Generated paths</p>
          <div className="rail">
            <svg
              viewBox="0 0 420 300"
              className="h-auto w-full min-w-[22rem]"
              role="img"
              aria-label="Attack paths branching from your policy set into four attack families and their outcomes"
            >
              {/* Root */}
              <rect x="4" y="130" width="86" height="40" rx="6" className="fill-surface stroke-line-strong" />
              <text x="16" y="147" className="fill-fg-subtle font-mono text-[9px]">
                your policies
              </text>
              <text x="16" y="161" className="fill-lime font-mono text-[9px]">
                24 rules
              </text>

              {families.map((family, index) => {
                const active = visible.some((item) => item.family === family.label);
                return (
                  <g key={family.id}>
                    <path
                      d={`M90 150 C 140 150, 150 ${family.y + 16}, 190 ${family.y + 16}`}
                      fill="none"
                      strokeWidth="1.3"
                      strokeDasharray="5 5"
                      className={cn(
                        active ? "stroke-violet" : "stroke-line-strong",
                        active && !reduced && "motion-safe:animate-dash",
                      )}
                      style={{ animationDelay: `${index * 180}ms` }}
                    />
                    <rect
                      x="190"
                      y={family.y}
                      width="120"
                      height="32"
                      rx="5"
                      className={cn(
                        "transition-colors",
                        active ? "fill-violet-deep stroke-violet/60" : "fill-surface stroke-line",
                      )}
                      strokeWidth="1"
                    />
                    <text
                      x="200"
                      y={family.y + 20}
                      className={cn(
                        "font-mono text-[9px]",
                        active ? "fill-violet" : "fill-fg-subtle",
                      )}
                    >
                      {family.label}
                    </text>

                    {/* Outcome marker */}
                    {(() => {
                      const familyFindings = visible.filter((item) => item.family === family.label);
                      const worst = familyFindings.some((item) => item.status === "fail")
                        ? "fail"
                        : familyFindings.some((item) => item.status === "warn")
                          ? "warn"
                          : familyFindings.length > 0
                            ? "pass"
                            : null;
                      if (!worst) return null;
                      return (
                        <>
                          <path
                            d={`M310 ${family.y + 16} H 366`}
                            strokeWidth="1.3"
                            className={cn(
                              worst === "fail"
                                ? "stroke-fail"
                                : worst === "warn"
                                  ? "stroke-warn"
                                  : "stroke-pass",
                            )}
                          />
                          <circle
                            cx="376"
                            cy={family.y + 16}
                            r="9"
                            className={cn(
                              worst === "fail"
                                ? "fill-fail-deep stroke-fail"
                                : worst === "warn"
                                  ? "fill-warn-deep stroke-warn"
                                  : "fill-pass-deep stroke-pass",
                            )}
                            strokeWidth="1.2"
                          />
                          <text
                            x="376"
                            y={family.y + 20}
                            textAnchor="middle"
                            className={cn(
                              "font-mono text-[9px]",
                              worst === "fail"
                                ? "fill-fail"
                                : worst === "warn"
                                  ? "fill-warn"
                                  : "fill-pass",
                            )}
                          >
                            {worst === "fail" ? "✕" : worst === "warn" ? "!" : "✓"}
                          </text>
                        </>
                      );
                    })()}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Findings feed */}
        <div className="bg-graphite p-4">
          <div className="flex items-center justify-between">
            <p className="label">Findings</p>
            <p className="font-mono text-mono-xs text-fg-subtle">
              {visible.length} / {findings.length}
            </p>
          </div>
          <ul aria-live="polite" className="mt-3 flex flex-col gap-1.5">
            {visible
              .slice()
              .reverse()
              .map((finding) => (
                <li
                  key={finding.id}
                  className="rounded-md border border-line bg-surface px-3 py-2.5 motion-safe:animate-rise"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-mono-xs text-fg-subtle">
                      {finding.id} · {finding.family}
                    </span>
                    <StatusPill status={finding.status} size="sm" />
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-fg-muted">
                    {finding.scenario}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-line bg-surface px-4 py-2 font-mono text-mono-xs text-fg-subtle">
        Simulated demonstration data · scenarios are described, never scripted for reuse
      </p>
    </div>
  );
}
