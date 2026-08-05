"use client";

import { useState } from "react";

import { archNodes } from "@/data/architecture";
import { cn } from "@/lib/cn";

const pathNodes = archNodes.filter((node) => node.row === "path");
const resourceNodes = archNodes.filter((node) => node.row === "resource");

function NodeButton({
  node,
  selected,
  onSelect,
}: {
  node: (typeof archNodes)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative z-10 flex w-full min-w-[8.5rem] flex-col gap-1 rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
        selected
          ? "border-lime bg-lime-deep text-lime shadow-[0_0_28px_-10px_rgba(204,255,47,0.7)]"
          : "border-line-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2",
      )}
    >
      <span className="text-[0.8125rem] leading-tight font-medium">{node.label}</span>
      <span
        className={cn(
          "font-mono text-mono-xs",
          selected ? "text-lime/70" : "text-fg-subtle",
        )}
      >
        {node.meta}
      </span>
    </button>
  );
}

export function ArchitectureDiagram({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState("agent-reasoning");
  const selected = archNodes.find((node) => node.id === selectedId) ?? archNodes[0];

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* The evaluation layer wraps the whole system, not just the model */}
      <div className="relative rounded-2xl border border-line-strong bg-graphite p-4 sm:p-6">
        <p className="label mb-5 flex items-center gap-2 text-lime">
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-lime" />
          Prooflayer evaluation layer
        </p>

        <div className="rail -mx-1 px-1 pb-2">
          <div className="min-w-[42rem] lg:min-w-0">
            {/* Main request path */}
            <div className="relative flex items-stretch gap-2">
              {/* Connector rail behind the path nodes */}
              <div
                aria-hidden="true"
                className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-line-strong"
              />
              {pathNodes.map((node, index) => (
                <div key={node.id} className="relative flex flex-1 items-center">
                  <NodeButton
                    node={node}
                    selected={node.id === selectedId}
                    onSelect={() => setSelectedId(node.id)}
                  />
                  {index < pathNodes.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="relative z-10 mx-1 shrink-0 font-mono text-mono-xs text-lime/60"
                    >
                      ›
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Bus from agent reasoning down to the resources it depends on */}
            <div aria-hidden="true" className="relative h-10">
              <span className="absolute left-[42%] top-0 h-5 w-px bg-line-strong" />
              <span className="absolute left-[11%] right-[11%] top-5 h-px bg-line-strong" />
              {["11%", "37%", "63%", "89%"].map((left) => (
                <span
                  key={left}
                  className="absolute top-5 h-5 w-px bg-line-strong"
                  style={{ left }}
                />
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {resourceNodes.map((node) => (
                <NodeButton
                  key={node.id}
                  node={node}
                  selected={node.id === selectedId}
                  onSelect={() => setSelectedId(node.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-mono-xs text-fg-subtle sm:hidden">
          Scroll the diagram sideways, or select any node below.
        </p>
      </div>

      {/* Detail panel for the selected node */}
      <div
        aria-live="polite"
        className="rounded-xl border border-line bg-surface p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-display-sm">{selected.label}</h3>
          <p className="font-mono text-mono-xs text-lime">
            {selected.tests.length} test types available
          </p>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">{selected.summary}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {selected.tests.map((test) => (
            <li
              key={test}
              className="flex items-start gap-2.5 rounded-md border border-line bg-surface-2 px-3 py-2.5 font-mono text-mono-sm text-fg-muted"
            >
              <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-lime" />
              {test}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
