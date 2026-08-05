"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";

type Coverage = "covered" | "partial" | "gap" | "n/a";

const components = ["Input", "Prompt", "Retrieval", "Tools", "Memory", "Output"] as const;

type Policy = {
  id: string;
  name: string;
  cells: Record<(typeof components)[number], { state: Coverage; cases: number; note?: string }>;
};

const policies: Policy[] = [
  {
    id: "pii",
    name: "No customer data in responses",
    cells: {
      Input: { state: "covered", cases: 24 },
      Prompt: { state: "covered", cases: 12 },
      Retrieval: { state: "partial", cases: 6, note: "Permission filter runs after reranking" },
      Tools: { state: "covered", cases: 18 },
      Memory: { state: "gap", cases: 0, note: "No cross-session leakage tests defined" },
      Output: { state: "covered", cases: 31 },
    },
  },
  {
    id: "refund",
    name: "Refunds above £250 require a human",
    cells: {
      Input: { state: "covered", cases: 14 },
      Prompt: { state: "covered", cases: 9 },
      Retrieval: { state: "n/a", cases: 0 },
      Tools: { state: "partial", cases: 11, note: "Bounds checked in prompt, not in the tool layer" },
      Memory: { state: "covered", cases: 5 },
      Output: { state: "covered", cases: 8 },
    },
  },
  {
    id: "advice",
    name: "No personalised financial advice",
    cells: {
      Input: { state: "covered", cases: 30 },
      Prompt: { state: "covered", cases: 16 },
      Retrieval: { state: "covered", cases: 12 },
      Tools: { state: "n/a", cases: 0 },
      Memory: { state: "partial", cases: 4, note: "Earlier turns can reintroduce advice framing" },
      Output: { state: "covered", cases: 44 },
    },
  },
  {
    id: "escalation",
    name: "Escalate on distress signals",
    cells: {
      Input: { state: "covered", cases: 22 },
      Prompt: { state: "partial", cases: 7, note: "Only English-language phrasings are tested" },
      Retrieval: { state: "n/a", cases: 0 },
      Tools: { state: "covered", cases: 6 },
      Memory: { state: "covered", cases: 5 },
      Output: { state: "covered", cases: 19 },
    },
  },
  {
    id: "disclosure",
    name: "Required disclosure on product terms",
    cells: {
      Input: { state: "n/a", cases: 0 },
      Prompt: { state: "covered", cases: 8 },
      Retrieval: { state: "covered", cases: 14 },
      Tools: { state: "n/a", cases: 0 },
      Memory: { state: "gap", cases: 0, note: "Disclosure not re-checked on follow-up turns" },
      Output: { state: "covered", cases: 26 },
    },
  },
];

const coverageStyles: Record<Coverage, { cell: string; glyph: string; label: string }> = {
  covered: { cell: "border-pass/30 bg-pass-deep text-pass", glyph: "✓", label: "Covered" },
  partial: { cell: "border-warn/40 bg-warn-deep text-warn", glyph: "~", label: "Partial" },
  gap: { cell: "border-fail/40 bg-fail-deep text-fail", glyph: "✕", label: "Gap" },
  "n/a": { cell: "border-line bg-surface text-fg-subtle", glyph: "·", label: "Not applicable" },
};

export function GuardrailMatrix({ className }: { className?: string }) {
  const [selected, setSelected] = useState<{ policy: Policy; component: string } | null>(null);

  const totals = policies.flatMap((policy) => Object.values(policy.cells));
  const gaps = totals.filter((cell) => cell.state === "gap").length;
  const partials = totals.filter((cell) => cell.state === "partial").length;

  const detail = selected
    ? selected.policy.cells[selected.component as (typeof components)[number]]
    : null;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-graphite", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <p className="label">Guardrail coverage matrix</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="warn">{partials} partial</Badge>
          <Badge tone="fail">{gaps} gaps</Badge>
        </div>
      </div>

      <div className="rail p-4">
        <table className="w-full min-w-[40rem] border-collapse">
          <caption className="sr-only">
            Policy coverage across system components. Each cell states whether the policy is
            covered, partially covered, has a gap, or does not apply.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="label px-2 pb-3 text-left font-normal">
                Policy
              </th>
              {components.map((component) => (
                <th key={component} scope="col" className="label px-2 pb-3 text-center font-normal">
                  {component}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <th
                  scope="row"
                  className="max-w-[15rem] py-1.5 pr-3 text-left text-[0.8125rem] font-normal text-fg"
                >
                  {policy.name}
                </th>
                {components.map((component) => {
                  const cell = policy.cells[component];
                  const style = coverageStyles[cell.state];
                  const isSelected =
                    selected?.policy.id === policy.id && selected.component === component;
                  return (
                    <td key={component} className="p-1">
                      <button
                        type="button"
                        onClick={() => setSelected({ policy, component })}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex h-11 w-full flex-col items-center justify-center gap-0.5 rounded-md border font-mono transition-all",
                          style.cell,
                          isSelected && "ring-2 ring-lime ring-offset-2 ring-offset-graphite",
                          "hover:brightness-125",
                        )}
                      >
                        <span aria-hidden="true" className="text-[0.75rem] leading-none">
                          {style.glyph}
                        </span>
                        <span className="text-[0.625rem] leading-none opacity-80">
                          {cell.cases > 0 ? cell.cases : "—"}
                        </span>
                        <span className="sr-only">
                          {policy.name}, {component}: {style.label}, {cell.cases} test cases
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend + selected cell detail */}
      <div className="flex flex-col gap-3 border-t border-line bg-surface px-4 py-3">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {(Object.keys(coverageStyles) as Coverage[]).map((state) => (
            <span
              key={state}
              className="flex items-center gap-2 font-mono text-mono-xs text-fg-subtle"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 items-center justify-center rounded-xs border text-[0.625rem]",
                  coverageStyles[state].cell,
                )}
              >
                {coverageStyles[state].glyph}
              </span>
              {coverageStyles[state].label}
            </span>
          ))}
        </div>

        <p aria-live="polite" className="text-sm leading-relaxed text-fg-muted">
          {selected && detail ? (
            <>
              <span className="text-fg">
                {selected.policy.name} · {selected.component}:
              </span>{" "}
              {coverageStyles[detail.state].label.toLowerCase()}
              {detail.cases > 0 ? `, ${detail.cases} test cases` : ", no test cases"}
              {detail.note ? `. ${detail.note}.` : "."}
            </>
          ) : (
            "Select any cell to see how that policy is tested at that layer."
          )}
        </p>
      </div>
    </div>
  );
}
