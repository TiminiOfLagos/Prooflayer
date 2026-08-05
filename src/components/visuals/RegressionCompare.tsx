"use client";

import { useMemo, useState } from "react";

import { AppFrame, FrameSegments, KpiTile, Th } from "@/components/visuals/AppFrame";
import { regressionRun } from "@/data/regression";
import { cn } from "@/lib/cn";

function Delta({ value }: { value: number }) {
  const tone = value > 0 ? "text-pass" : value < 0 ? "text-fail" : "text-fg-subtle";
  return (
    <span className={cn("font-mono text-mono-sm tabular-nums", tone)}>
      <span aria-hidden="true" className="mr-1 text-[0.7em]">
        {value > 0 ? "↑" : value < 0 ? "↓" : "→"}
      </span>
      {value > 0 ? "+" : ""}
      {value}
      <span className="sr-only">
        {value > 0 ? " points improved" : value < 0 ? " points regressed" : " unchanged"}
      </span>
    </span>
  );
}

export function RegressionCompare({ className }: { className?: string }) {
  const [changedOnly, setChangedOnly] = useState(false);
  const { a, b, rows } = regressionRun;

  const visibleRows = useMemo(
    () => (changedOnly ? rows.filter((row) => row.a !== row.b) : rows),
    [changedOnly, rows],
  );

  const improved = rows.filter((row) => row.b > row.a).length;
  const regressed = rows.filter((row) => row.b < row.a).length;
  const latencyDelta = Math.round(((b.latencyMs - a.latencyMs) / a.latencyMs) * 100);
  const costDelta = Math.round(((b.costPer1k - a.costPer1k) / a.costPer1k) * 100);

  return (
    <AppFrame
      className={className}
      rail="suites"
      breadcrumb={["prooflayer", "experiments", `${a.id} → ${b.id}`]}
      actions={
        <>
          <FrameSegments items={["Cases", "Cost"]} active="Cases" />
          <button
            type="button"
            onClick={() => setChangedOnly((value) => !value)}
            aria-pressed={changedOnly}
            className={cn(
              "rounded-md border px-2.5 py-1 font-mono text-mono-xs transition-colors",
              changedOnly
                ? "border-lime/40 bg-lime-deep text-lime"
                : "border-line-strong bg-surface-2 text-fg-muted hover:text-fg",
            )}
          >
            Changed only
          </button>
        </>
      }
      footer={
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span>
            {improved} improved · {regressed} regressed
          </span>
          <span className="text-fg-subtle">
            retrieval k=6 → k=12 · prompt {a.id} → {b.id}
          </span>
        </span>
      }
    >
      <div className="grid grid-cols-2 divide-x divide-line border-b border-line sm:grid-cols-4">
        <KpiTile label={`Score ${a.id}`} value={String(a.overall)} />
        <KpiTile
          label={`Score ${b.id}`}
          value={String(b.overall)}
          tone="warn"
          delta={{ value: String(b.overall - a.overall), direction: "down" }}
        />
        <KpiTile
          label="Latency p50"
          value={(b.latencyMs / 1000).toFixed(2)}
          unit="s"
          delta={{ value: `${latencyDelta}%`, direction: "down" }}
          className="border-t border-line sm:border-t-0"
        />
        <KpiTile
          label="Cost / 1k"
          value={`$${b.costPer1k.toFixed(2)}`}
          delta={{ value: `${costDelta}%`, direction: "down" }}
          className="border-t border-line sm:border-t-0"
        />
      </div>

      <div className="rail">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Evaluation scores for {a.label} compared with {b.label}
          </caption>
          <thead>
            <tr className="border-b border-line">
              <Th>Test case</Th>
              <Th>Dimension</Th>
              <Th>{a.id}</Th>
              <Th>{b.id}</Th>
              <Th sorted="asc">Change</Th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const delta = row.b - row.a;
              return (
                <tr key={row.test} className="border-b border-line/70 last:border-0">
                  <th scope="row" className="px-3.5 py-2.5 text-[0.8125rem] font-normal text-fg">
                    {row.test}
                  </th>
                  <td className="px-3.5 py-2.5 font-mono text-mono-xs text-fg-subtle">
                    {row.dimension}
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-mono-sm text-fg-subtle tabular-nums">
                    {row.a}
                  </td>
                  <td
                    className={cn(
                      "px-3.5 py-2.5 font-mono text-mono-sm tabular-nums",
                      delta < 0 ? "text-fail" : delta > 0 ? "text-pass" : "text-fg-muted",
                    )}
                  >
                    {row.b}
                  </td>
                  <td className="px-3.5 py-2.5">
                    <Delta value={delta} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}
