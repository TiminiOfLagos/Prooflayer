"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Primitives";
import { StatusPill } from "@/components/ui/Status";
import { changelog, changelogCategories, type ChangelogCategory } from "@/data/changelog";
import { cn } from "@/lib/cn";

type Filter = ChangelogCategory | "All";

/** Compact product visual for each release — same graphic language, smaller. */
function ReleaseVisual({ kind }: { kind: (typeof changelog)[number]["visual"] }) {
  if (kind === "attack-map") {
    return (
      <div className="rounded-lg border border-line bg-graphite p-3.5">
        <p className="label mb-3">agent hand-off</p>
        <svg viewBox="0 0 240 84" className="w-full" role="img" aria-label="Planner agent handing off to an executor agent, where a tool call is blocked">
          {[
            { x: 4, label: "planner", tone: "violet" },
            { x: 92, label: "executor", tone: "violet" },
            { x: 180, label: "tool call", tone: "fail" },
          ].map((node) => (
            <g key={node.label}>
              <rect
                x={node.x}
                y="28"
                width="56"
                height="28"
                rx="5"
                className={cn(
                  node.tone === "fail"
                    ? "fill-fail-deep stroke-fail/60"
                    : "fill-violet-deep stroke-violet/50",
                )}
                strokeWidth="1"
              />
              <text
                x={node.x + 28}
                y="46"
                textAnchor="middle"
                className={cn("font-mono text-[8px]", node.tone === "fail" ? "fill-fail" : "fill-violet")}
              >
                {node.label}
              </text>
            </g>
          ))}
          <path d="M60 42 H 92" className="stroke-line-strong" strokeWidth="1.2" strokeDasharray="4 3" />
          <path d="M148 42 H 180" className="stroke-fail" strokeWidth="1.2" strokeDasharray="4 3" />
        </svg>
        <p className="mt-2 font-mono text-mono-xs text-fg-subtle">
          escalation reached through a second agent
        </p>
      </div>
    );
  }

  if (kind === "compare") {
    return (
      <div className="rounded-lg border border-line bg-graphite p-3.5">
        <p className="label mb-3">v14 → v15</p>
        <ul className="flex flex-col gap-1.5">
          {[
            { label: "citation_accuracy", from: 82, to: 94 },
            { label: "tool_permissions", from: 96, to: 74 },
            { label: "refusal_quality", from: 98, to: 98 },
          ].map((row) => {
            const delta = row.to - row.from;
            return (
              <li key={row.label} className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-mono-xs text-fg-subtle">{row.label}</span>
                <span className="flex items-center gap-2 font-mono text-mono-xs tabular-nums">
                  <span className="text-fg-subtle">{row.from}</span>
                  <span className="text-fg-subtle">→</span>
                  <span
                    className={cn(
                      delta > 0 ? "text-pass" : delta < 0 ? "text-fail" : "text-fg-muted",
                    )}
                  >
                    {row.to}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (kind === "matrix") {
    return (
      <div className="rounded-lg border border-line bg-graphite p-3.5">
        <p className="label mb-3">coverage</p>
        <div className="grid grid-cols-6 gap-1">
          {[2, 2, 1, 2, 0, 2, 2, 1, 2, 2, 2, 0, 2, 2, 2, 1, 2, 2].map((value, index) => (
            <span
              key={index}
              className={cn(
                "flex h-5 items-center justify-center rounded-xs border font-mono text-[0.5rem]",
                value === 2 && "border-pass/30 bg-pass-deep text-pass",
                value === 1 && "border-warn/40 bg-warn-deep text-warn",
                value === 0 && "border-fail/40 bg-fail-deep text-fail",
              )}
            >
              {value === 2 ? "✓" : value === 1 ? "~" : "✕"}
            </span>
          ))}
        </div>
        <p className="mt-2 font-mono text-mono-xs text-fg-subtle">3 policies × 6 layers</p>
      </div>
    );
  }

  if (kind === "sdk") {
    return (
      <div className="rounded-lg border border-line bg-graphite p-3.5">
        <p className="label mb-3">pytest plugin</p>
        <pre className="rail font-mono text-[0.6875rem] leading-relaxed text-fg-muted">
          <code>{`$ pytest tests/evals
collected 4 items

test_support.py ..F.        [100%]
FAILED tool_permissions[480]`}</code>
        </pre>
        <div className="mt-2 flex gap-1.5">
          <StatusPill status="pass" label="3 passed" size="sm" />
          <StatusPill status="fail" label="1 failed" size="sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-graphite p-3.5">
      <p className="label mb-3">retention</p>
      <div className="flex flex-wrap gap-1.5">
        {[7, 30, 90, 365].map((days) => (
          <span
            key={days}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[0.625rem]",
              days === 30
                ? "border-lime bg-lime-deep text-lime"
                : "border-line-strong bg-surface text-fg-subtle",
            )}
          >
            {days}d
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-mono-xs text-fg-subtle">
        deletion receipt · run_2f9a41 removed
      </p>
    </div>
  );
}

export function ChangelogList() {
  const [filter, setFilter] = useState<Filter>("All");
  const entries = filter === "All" ? changelog : changelog.filter((e) => e.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter releases by category">
        {(["All", ...changelogCategories] as Filter[]).map((category) => {
          const count =
            category === "All"
              ? changelog.length
              : changelog.filter((entry) => entry.category === category).length;
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-mono-xs transition-colors",
                active
                  ? "border-lime bg-lime-deep text-lime"
                  : "border-line-strong bg-surface text-fg-muted hover:text-fg",
              )}
            >
              {category}
              <span className={cn("ml-2", active ? "text-lime/60" : "text-fg-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-mono-xs text-fg-subtle">
        Showing {entries.length} of {changelog.length} releases
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>

      {/* Entries */}
      <ol className="mt-8 flex flex-col gap-4">
        {entries.map((entry) => (
          <li key={entry.id} id={entry.id} className="scroll-mt-28">
            <Card className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge tone="lime">{entry.version}</Badge>
                    <Badge>{entry.category}</Badge>
                    <time
                      dateTime={entry.isoDate}
                      className="font-mono text-mono-xs text-fg-subtle"
                    >
                      {entry.date}
                    </time>
                  </div>

                  <h2 className="mt-4 text-display-md">{entry.title}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-muted">
                    {entry.summary}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                    {entry.features.map((feature) => (
                      <li key={feature.title} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-lime"
                        />
                        <span>
                          <span className="text-sm text-fg">{feature.title}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                            {feature.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {entry.docs.map((doc) => (
                      <Link
                        key={doc.href}
                        href={doc.href}
                        className="group inline-flex items-center gap-2 font-mono text-mono-xs text-lime transition-colors hover:text-fg"
                      >
                        {doc.label}
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="lg:pt-1">
                  <ReleaseVisual kind={entry.visual} />
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
