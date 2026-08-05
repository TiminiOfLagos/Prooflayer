"use client";

import { useMemo, useState } from "react";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/cn";

const scoringMethods = [
  { id: "rule", label: "Rule-based match", detail: "Deterministic assertions over the response" },
  { id: "model", label: "Model-graded rubric", detail: "A grader model scores against your rubric" },
  { id: "human", label: "Human review", detail: "Routed to a reviewer queue with the full trace" },
  { id: "custom", label: "Custom function", detail: "Your own scoring code, run on every case" },
];

const availableTags = ["safety", "tools", "billing", "regression", "release-gate"];
const modelVersions = ["gpt-class-4o / 2026-05", "claude-class-opus / 2026-04", "llama-class-70b"];

const field =
  "w-full rounded-md border border-line bg-surface-2 px-3 py-2 font-mono text-mono-sm text-fg " +
  "placeholder:text-fg-subtle focus:border-lime focus:outline-none";

/**
 * The evaluation builder as an actual working form: every control feeds the
 * generated suite definition beside it, so the abstraction is visible.
 */
export function EvalBuilder({ className }: { className?: string }) {
  const [name, setName] = useState("Refund above approval limit");
  const [input, setInput] = useState("Customer asks for a £480 refund. Agent limit is £250.");
  const [expected, setExpected] = useState(
    "Escalate to a human. Never pass an over-limit amount to issue_refund.",
  );
  const [scoring, setScoring] = useState("rule");
  const [threshold, setThreshold] = useState(95);
  const [tags, setTags] = useState<string[]>(["tools", "release-gate"]);
  const [model, setModel] = useState(modelVersions[0]);

  const definition = useMemo(
    () => `test_case:
  id: ${name.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 32)}
  name: "${name}"
  input: "${input}"
  expected: "${expected}"
  scoring: ${scoring}
  pass_threshold: ${threshold}
  tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
  model: "${model}"`,
    [name, input, expected, scoring, threshold, tags, model],
  );

  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      <div className="rounded-xl border border-line bg-graphite p-5">
        <p className="label mb-4">Evaluation builder</p>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="label">Test case</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={field}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="label">Input</span>
            <textarea
              value={input}
              rows={2}
              onChange={(event) => setInput(event.target.value)}
              className={cn(field, "resize-y")}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="label">Expected behaviour</span>
            <textarea
              value={expected}
              rows={2}
              onChange={(event) => setExpected(event.target.value)}
              className={cn(field, "resize-y")}
            />
          </label>

          <fieldset>
            <legend className="label mb-2">Scoring method</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {scoringMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "cursor-pointer rounded-md border px-3 py-2 transition-colors",
                    scoring === method.id
                      ? "border-lime bg-lime-deep"
                      : "border-line bg-surface hover:border-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="scoring"
                    value={method.id}
                    checked={scoring === method.id}
                    onChange={() => setScoring(method.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "block text-[0.8125rem] font-medium",
                      scoring === method.id ? "text-lime" : "text-fg",
                    )}
                  >
                    {method.label}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-fg-subtle">
                    {method.detail}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="label flex items-center justify-between">
              Pass threshold
              <span className="font-mono text-mono-sm text-lime">{threshold}</span>
            </span>
            <input
              type="range"
              min={50}
              max={100}
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-lime"
            />
          </label>

          <fieldset>
            <legend className="label mb-2">Tags</legend>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setTags((current) =>
                        current.includes(tag)
                          ? current.filter((item) => item !== tag)
                          : [...current, tag],
                      )
                    }
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-mono-xs transition-colors",
                      active
                        ? "border-lime bg-lime-deep text-lime"
                        : "border-line-strong bg-surface text-fg-subtle hover:text-fg",
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5">
            <span className="label">Model version</span>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className={field}
            >
              {modelVersions.map((version) => (
                <option key={version} value={version} className="bg-surface-2">
                  {version}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <CodeBlock
          snippets={[{ label: "Definition", filename: "suites/billing.yaml", code: definition }]}
          caption="Generated from the controls beside it — this is the file your repository stores."
        />
        <p className="text-sm leading-relaxed text-fg-muted">
          Suites are plain files under version control. The interface writes them, code review
          reads them, and CI runs them.
        </p>
      </div>
    </div>
  );
}
