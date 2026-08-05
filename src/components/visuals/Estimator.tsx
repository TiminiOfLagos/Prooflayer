"use client";

import { useId, useMemo, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Primitives";
import { routes } from "@/config/site";
import { estimate, estimatorConfig, type EstimatorInput } from "@/data/pricing";
import { cn } from "@/lib/cn";

const money = (value: number) =>
  value.toLocaleString("en-GB", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  note,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  note?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-mono-sm text-lime tabular-nums">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-lime"
      />
      {note ? <p className="mt-2 font-mono text-mono-xs text-fg-subtle">{note}</p> : null}
    </div>
  );
}

export function Estimator({ className }: { className?: string }) {
  const [input, setInput] = useState<EstimatorInput>({ ...estimatorConfig.defaults });
  const result = useMemo(() => estimate(input), [input]);
  const retentionId = useId();

  const set = <K extends keyof EstimatorInput>(key: K, value: EstimatorInput[K]) =>
    setInput((current) => ({ ...current, [key]: value }));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line-strong bg-graphite",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <p className="label">Cost estimator</p>
        <Badge tone="warn">Prototype pricing</Badge>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Inputs */}
        <div className="flex flex-col gap-7 bg-graphite p-5 sm:p-6">
          <Slider
            label="Monthly evaluation runs"
            value={input.runs}
            min={0}
            max={500_000}
            step={1_000}
            format={(value) => value.toLocaleString()}
            onChange={(value) => set("runs", value)}
            note={`First ${estimatorConfig.includedRuns.toLocaleString()} included · $${estimatorConfig.rates.perEvaluationRun.toFixed(3)} each after`}
          />
          <Slider
            label="Red-team simulations"
            value={input.simulations}
            min={0}
            max={5_000}
            step={25}
            format={(value) => value.toLocaleString()}
            onChange={(value) => set("simulations", value)}
            note={`First ${estimatorConfig.includedSimulations} included · $${estimatorConfig.rates.perRedTeamSimulation.toFixed(2)} each after`}
          />
          <Slider
            label="Team members"
            value={input.seats}
            min={1}
            max={60}
            step={1}
            format={(value) => `${value}`}
            onChange={(value) => set("seats", value)}
            note={`First ${estimatorConfig.includedSeats} included · $${estimatorConfig.rates.perAdditionalSeat} per additional member`}
          />

          <fieldset>
            <legend className="label mb-3">Data retention period</legend>
            <div className="flex flex-wrap gap-2">
              {estimatorConfig.retentionOptions.map((days) => (
                <label
                  key={days}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-mono-xs transition-colors",
                    input.retention === days
                      ? "border-lime bg-lime-deep text-lime"
                      : "border-line-strong bg-surface text-fg-muted hover:text-fg",
                  )}
                >
                  <input
                    type="radio"
                    name={retentionId}
                    value={days}
                    checked={input.retention === days}
                    onChange={() => set("retention", days)}
                    className="sr-only"
                  />
                  {days} days
                  {estimatorConfig.rates.retention[days] > 1
                    ? ` (+${Math.round((estimatorConfig.rates.retention[days] - 1) * 100)}%)`
                    : ""}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={input.advancedReporting}
              onChange={(event) => set("advancedReporting", event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-lime"
            />
            <span>
              <span className="block text-sm text-fg">Advanced reporting</span>
              <span className="mt-0.5 block font-mono text-mono-xs text-fg-subtle">
                Exports, scheduled reports and team annotations · $
                {estimatorConfig.rates.advancedReportingAddOn} per month
              </span>
            </span>
          </label>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-5 bg-graphite p-5 sm:p-6">
          <div>
            <p className="label">Estimated monthly cost</p>
            <p
              aria-live="polite"
              className="mt-2 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-bold text-lime"
            >
              {money(result.total)}
            </p>
            <p className="mt-3 font-mono text-mono-xs text-fg-subtle">
              {result.costPerEvaluation > 0
                ? `${money(result.costPerEvaluation)} per evaluation run, all-in`
                : "No billable usage at this configuration"}
            </p>
          </div>

          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="label mb-3">Usage breakdown</p>
            <ul className="flex flex-col gap-3">
              {result.breakdown.map((line) => (
                <li key={line.label} className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-sm text-fg">{line.label}</span>
                    <span className="mt-0.5 block font-mono text-mono-xs text-fg-subtle">
                      {line.detail}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-mono-sm text-fg-muted tabular-nums">
                    {money(line.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="label">Total</span>
              <span className="font-mono text-mono-sm text-lime tabular-nums">
                {money(result.total)}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-lime/30 bg-lime-deep/40 p-4">
            <p className="label">Recommended plan</p>
            <p className="mt-1.5 font-display text-display-sm text-lime">{result.recommended}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {result.recommended === "Sandbox"
                ? "Your usage fits inside the free workspace. Start there and upgrade when a suite outgrows it."
                : result.recommended === "Scale"
                  ? "Usage-based billing with no seat minimum. You can start on Sandbox and grow into this without a migration."
                  : "At this size, single sign-on, custom retention and a security review usually matter more than the unit price."}
            </p>
            <ButtonLink
              href={result.recommended === "Enterprise" ? "mailto:enterprise@prooflayer.dev" : routes.apiKey}
              size="sm"
              className="mt-4"
            >
              {result.recommended === "Enterprise" ? "Contact enterprise" : "Get your API key"}
            </ButtonLink>
          </div>
        </div>
      </div>

      <p className="border-t border-line bg-surface px-4 py-2.5 font-mono text-mono-xs text-fg-subtle">
        Prototype pricing for a fictional product. The formula and every rate live in one
        configurable object — no hidden multipliers.
      </p>
    </div>
  );
}
