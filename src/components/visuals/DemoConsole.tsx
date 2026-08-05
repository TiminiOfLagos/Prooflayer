"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { ArrowRight, Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Primitives";
import { LiveDot, Metric, ScoreCard, StatusPill, statusMeta } from "@/components/ui/Status";
import { AppFrame } from "@/components/visuals/AppFrame";
import { routes } from "@/config/site";
import {
  runEvaluation,
  sampleApps,
  suites,
  type EvaluationResult,
  type ResolvedCase,
  type SuiteId,
} from "@/data/demo";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

type Stage = "configure" | "running" | "results";

const STEP_MS = 460;

export function DemoConsole({
  variant = "full",
  className,
}: {
  variant?: "preview" | "full";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const groupId = useId();
  const [appId, setAppId] = useState(sampleApps[0].id);
  const [suiteId, setSuiteId] = useState<SuiteId>("prompt-injection");
  const [stage, setStage] = useState<Stage>("configure");
  const [progress, setProgress] = useState(0);
  const [openCase, setOpenCase] = useState<string | null>(null);

  const result = useMemo<EvaluationResult>(() => runEvaluation(appId, suiteId), [appId, suiteId]);
  const total = result.cases.length;

  // Changing the configuration invalidates a finished run — never show a
  // result that does not match the controls above it.
  const reset = useCallback(() => {
    setStage("configure");
    setProgress(0);
    setOpenCase(null);
  }, []);

  useEffect(() => {
    reset();
  }, [appId, suiteId, reset]);

  // Advance the run. The updater only increments — completion is decided
  // separately, so no state setter is ever called from inside another.
  useEffect(() => {
    if (stage !== "running") return;

    if (reduced) {
      setProgress(total);
      return;
    }

    const id = window.setInterval(() => {
      setProgress((value) => Math.min(value + 1, total));
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [stage, total, reduced]);

  useEffect(() => {
    if (stage === "running" && progress >= total) setStage("results");
  }, [stage, progress, total]);

  const executed = result.cases.slice(0, progress);
  const currentCase = result.cases[Math.min(progress, total - 1)];
  const step = Math.min(progress + 1, total);

  const recommendations = useMemo(() => {
    const seen = new Set<string>();
    return result.cases
      .filter((item) => item.status !== "pass" && item.recommendation)
      .filter((item) => {
        if (seen.has(item.recommendation!)) return false;
        seen.add(item.recommendation!);
        return true;
      })
      .slice(0, variant === "preview" ? 2 : 4);
  }, [result.cases, variant]);

  return (
    <AppFrame
      className={className}
      rail={result.suite.kind === "red-team" ? "redteam" : "runs"}
      breadcrumb={["prooflayer", "demo", result.runId]}
      actions={
        <>
          <span className="flex items-center gap-2 font-mono text-mono-xs text-fg-subtle">
            {stage === "running" ? <LiveDot /> : null}
            {stage === "configure"
              ? "ready"
              : stage === "running"
                ? `executing ${step}/${total}`
                : "complete"}
          </span>
          {stage === "results" ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-line-strong bg-surface-2 px-2.5 py-1 font-mono text-mono-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
            >
              Reconfigure
            </button>
          ) : null}
        </>
      }
      footer="Simulated demonstration data · no application is contacted"
    >
      <div className="p-4 sm:p-5">
        {/* ---------------------------------------------------------- configure */}
        {stage === "configure" ? (
          <div className="flex flex-col gap-6">
            <fieldset>
              <legend className="label mb-3">
                {variant === "full" ? "01 · Select a sample application" : "Sample application"}
              </legend>
              <div className={cn("grid gap-2", variant === "full" ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
                {sampleApps.map((app) => (
                  <label
                    key={app.id}
                    className={cn(
                      "group relative flex cursor-pointer flex-col gap-1 rounded-lg border px-3.5 py-3 transition-colors",
                      appId === app.id
                        ? "border-lime bg-lime-deep"
                        : "border-line bg-surface hover:border-line-strong hover:bg-surface-2",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${groupId}-app`}
                      value={app.id}
                      checked={appId === app.id}
                      onChange={() => setAppId(app.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        appId === app.id ? "text-lime" : "text-fg",
                      )}
                    >
                      {app.name}
                    </span>
                    <span className="font-mono text-mono-xs text-fg-subtle">{app.model}</span>
                    {variant === "full" ? (
                      <span className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">
                        {app.summary}
                      </span>
                    ) : null}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label mb-3">
                {variant === "full" ? "02 · Select an evaluation suite" : "Evaluation suite"}
              </legend>
              <div className="flex flex-wrap gap-2">
                {suites.map((suite) => (
                  <label
                    key={suite.id}
                    className={cn(
                      "cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-mono-xs transition-colors",
                      suiteId === suite.id
                        ? "border-lime bg-lime-deep text-lime"
                        : "border-line-strong bg-surface text-fg-muted hover:text-fg",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${groupId}-suite`}
                      value={suite.id}
                      checked={suiteId === suite.id}
                      onChange={() => setSuiteId(suite.id)}
                      className="sr-only"
                    />
                    {suite.name}
                  </label>
                ))}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                {result.suite.description}
              </p>
            </fieldset>

            {variant === "full" ? (
              <div>
                <p className="label mb-3">03 · Review the test configuration</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Model" value={result.app.model} />
                  <Metric label="Surface" value={result.app.surface} />
                  <Metric label="Test cases" value={`${total} cases`} tone="lime" />
                  <Metric label="Pass threshold" value="≥ 95 per case" />
                  <Metric label="Retrieval" value={result.app.retrieval} className="sm:col-span-2" />
                  <Metric
                    label="Tools in scope"
                    value={result.app.tools.join(", ")}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setStage("running")} size="lg">
                Run evaluation
              </Button>
              <p className="font-mono text-mono-xs text-fg-subtle">
                {total} cases · {result.suite.kind === "red-team" ? "adversarial" : "deterministic"} ·
                simulated
              </p>
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------------------ running */}
        {stage === "running" ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="label">Executing suite</p>
              <p className="font-mono text-mono-xs text-fg-muted">
                {step} / {total}
              </p>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={step}
              aria-label="Evaluation progress"
              className="h-1 w-full overflow-hidden rounded-full bg-surface-3"
            >
              <div
                className="h-full rounded-full bg-lime transition-[width] duration-300 ease-out"
                style={{ width: `${(step / total) * 100}%` }}
              />
            </div>

            <p aria-live="polite" className="font-mono text-mono-sm text-fg">
              <span className="text-lime">▶</span> {currentCase.name}
              <span className="caret" />
            </p>

            <ul className="flex flex-col gap-1.5">
              {executed.map((testCase) => (
                <li
                  key={testCase.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface px-3 py-2 motion-safe:animate-rise"
                >
                  <span className="truncate font-mono text-mono-sm text-fg-muted">
                    {testCase.name}
                  </span>
                  <StatusPill status={testCase.status} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* ------------------------------------------------------------ results */}
        {stage === "results" ? (
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,auto)_minmax(0,1fr)] sm:items-center">
              <div className="flex items-center gap-4">
                <ScoreGauge value={result.overall} />
                <div>
                  <p className="label">Overall score</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {result.app.short} · {result.suite.name}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <Badge tone="pass">{result.passed} passed</Badge>
                    <Badge tone="warn">{result.warnings} warnings</Badge>
                    <Badge tone="fail">{result.failures} failures</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Metric label="Latency p50" value={`${(result.latencyP50 / 1000).toFixed(2)}s`} />
                <Metric label="Latency p95" value={`${(result.latencyP95 / 1000).toFixed(2)}s`} />
                <Metric
                  label="Cost / run"
                  value={`$${result.costPerRun.toFixed(4)}`}
                  tone="violet"
                />
              </div>
            </div>

            {/* Dimension scores */}
            <div>
              <p className="label mb-3">
                {variant === "full" ? "06 · Result categories" : "Result categories"}
              </p>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {result.dimensionScores.map((dimension) =>
                  dimension.covered ? (
                    <ScoreCard
                      key={dimension.id}
                      label={dimension.label}
                      value={dimension.score}
                      status={dimension.status}
                    />
                  ) : (
                    <div
                      key={dimension.id}
                      className="rounded-lg border border-dashed border-line bg-surface/50 p-4"
                    >
                      <p className="label truncate">{dimension.label}</p>
                      <p className="mt-2 font-mono text-mono-xs text-fg-subtle">
                        Not covered by this suite
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Expandable case results */}
            <div>
              <p className="label mb-3">
                {variant === "full" ? "07 · Inspect individual results" : "Test cases"}
              </p>
              <ul className="flex flex-col gap-2">
                {result.cases.map((testCase) => (
                  <CaseRow
                    key={testCase.id}
                    testCase={testCase}
                    open={openCase === testCase.id}
                    onToggle={() =>
                      setOpenCase((value) => (value === testCase.id ? null : testCase.id))
                    }
                  />
                ))}
              </ul>
            </div>

            {/* Recommended actions */}
            {recommendations.length > 0 ? (
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="label mb-3">
                  {variant === "full" ? "08 · Recommended next steps" : "Recommended actions"}
                </p>
                <ol className="flex flex-col gap-2.5">
                  {recommendations.map((item, index) => (
                    <li key={item.id} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span className="font-mono text-mono-xs text-lime">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="text-fg">{item.name}.</span> {item.recommendation}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 rounded-lg border border-lime/30 bg-lime-deep/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-fg">
                This run used simulated data.{" "}
                <span className="text-fg-muted">Point the same suite at your own agent next.</span>
              </p>
              <ButtonLink href={routes.apiKey} size="sm" className="shrink-0">
                Create an API key to test your own agent
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
    </AppFrame>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const status = value >= 95 ? "pass" : value >= 85 ? "warn" : "fail";
  const meta = statusMeta[status];
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={cn(
            "transition-[stroke-dashoffset] duration-1000 ease-out",
            status === "pass" ? "stroke-pass" : status === "warn" ? "stroke-warn" : "stroke-fail",
          )}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <p
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display text-[1.75rem] font-semibold",
          meta.text,
        )}
      >
        {value}
      </p>
    </div>
  );
}

function CaseRow({
  testCase,
  open,
  onToggle,
}: {
  testCase: ResolvedCase;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `case-${testCase.id}`;
  return (
    <li className="overflow-hidden rounded-lg border border-line bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors hover:bg-surface-2"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-mono-xs text-fg-subtle">{testCase.id}</span>
          <span className="truncate text-sm text-fg">{testCase.name}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2.5">
          <span className="font-mono text-mono-sm text-fg-muted tabular-nums">
            {testCase.score}
          </span>
          <StatusPill status={testCase.status} size="sm" />
          <svg
            viewBox="0 0 12 12"
            aria-hidden="true"
            className={cn(
              "size-3 text-fg-subtle transition-transform duration-200",
              open && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </span>
      </button>

      {open ? (
        <div id={panelId} className="border-t border-line bg-graphite px-3.5 py-3.5">
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="label">Input</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{testCase.input}</dd>
            </div>
            <div>
              <dt className="label">Expected behaviour</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg-muted">{testCase.expected}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="label">Observed</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg">{testCase.observed}</dd>
            </div>
          </dl>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{testCase.dimension.replace("-", " ")}</Badge>
            {testCase.severity ? (
              <Badge
                tone={
                  testCase.severity === "high"
                    ? "fail"
                    : testCase.severity === "medium"
                      ? "warn"
                      : "neutral"
                }
              >
                severity: {testCase.severity}
              </Badge>
            ) : null}
            <Badge tone="neutral">{testCase.latencyMs} ms</Badge>
          </div>

          {testCase.recommendation ? (
            <p className="mt-3.5 flex gap-2.5 rounded-md border border-line bg-surface px-3 py-2.5 text-sm leading-relaxed text-fg-muted">
              <ArrowRight className="mt-1 shrink-0 text-lime" />
              {testCase.recommendation}
            </p>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
