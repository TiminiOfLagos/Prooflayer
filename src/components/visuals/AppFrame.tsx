import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Application chrome shared by every product visual on the site.
 *
 * The visuals are not illustrations of a product — they are the product's own
 * interface, rebuilt as real markup: an icon rail, a breadcrumb toolbar, tables
 * with sortable headers, KPI tiles with deltas. Anything shown here could ship.
 */

const railIcons = [
  { id: "runs", label: "Runs", path: "M3 4h10M3 8h7M3 12h4" },
  { id: "suites", label: "Suites", path: "M3 3h10v10H3zM3 6.5h10" },
  { id: "redteam", label: "Red-team", path: "M8 2.5 13.5 13H2.5zM8 6.5v3M8 11h.01" },
  { id: "policies", label: "Policies", path: "M8 2.5 13 4.5v4c0 3-2.2 5-5 5.5-2.8-.5-5-2.5-5-5.5v-4z" },
  { id: "datasets", label: "Datasets", path: "M3 4.5c0-1 2.2-2 5-2s5 1 5 2-2.2 2-5 2-5-1-5-2zM3 4.5v7c0 1 2.2 2 5 2s5-1 5-2v-7" },
];

export function AppFrame({
  breadcrumb,
  actions,
  rail = "runs",
  children,
  className,
  footer,
}: {
  breadcrumb: string[];
  actions?: ReactNode;
  rail?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-graphite",
        "shadow-[0_50px_120px_-70px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex">
        {/* Icon rail */}
        <div
          aria-hidden="true"
          className="hidden w-12 shrink-0 flex-col items-center gap-1.5 border-r border-line bg-surface py-3 sm:flex"
        >
          <span className="mb-2 flex size-6 items-center justify-center rounded-md bg-lime">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
              <path d="M12 3 21 7l-9 4-9-4 9-4Z" className="fill-fg-inverse" />
            </svg>
          </span>
          {railIcons.map((icon, index) => (
            <span
              key={icon.id}
              className={cn(
                "flex size-7 items-center justify-center rounded-md",
                icon.id === rail ? "bg-surface-3 text-lime" : "text-fg-subtle",
              )}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={icon.path} />
              </svg>
              <span className="sr-only">{railIcons[index].label}</span>
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3.5 py-2.5">
            <nav aria-label="Product breadcrumb" className="min-w-0">
              <ol className="flex items-center gap-1.5 font-mono text-mono-xs">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb} className="flex items-center gap-1.5">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-fg-subtle/60">
                        /
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        index === breadcrumb.length - 1 ? "text-fg" : "text-fg-subtle",
                        index === 0 && "hidden sm:inline",
                      )}
                    >
                      {crumb}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="flex items-center gap-2">{actions}</div>
          </div>

          <div className="min-w-0">{children}</div>

          {footer ? (
            <div className="border-t border-line bg-surface px-3.5 py-2 font-mono text-mono-xs text-fg-subtle">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Toolbar control that reads as a real interface affordance. */
export function FrameButton({
  children,
  tone = "quiet",
  className,
}: {
  children: ReactNode;
  tone?: "quiet" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-mono-xs",
        tone === "accent"
          ? "border-lime/40 bg-lime-deep text-lime"
          : "border-line-strong bg-surface-2 text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Segmented control — used for time ranges and view switches. */
export function FrameSegments({ items, active }: { items: string[]; active: string }) {
  return (
    <span className="hidden items-center gap-0.5 rounded-md border border-line-strong bg-surface-2 p-0.5 md:inline-flex">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-sm px-2 py-0.5 font-mono text-mono-xs",
            item === active ? "bg-surface-3 text-fg" : "text-fg-subtle",
          )}
        >
          {item}
        </span>
      ))}
    </span>
  );
}

/** KPI tile with a delta chip — the unit of a real analytics header. */
export function KpiTile({
  label,
  value,
  unit,
  delta,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: { value: string; direction: "up" | "down" | "flat" };
  tone?: "default" | "pass" | "warn" | "fail";
  className?: string;
}) {
  const valueTone =
    tone === "pass"
      ? "text-pass"
      : tone === "warn"
        ? "text-warn"
        : tone === "fail"
          ? "text-fail"
          : "text-fg";

  return (
    <div className={cn("min-w-0 px-3.5 py-3", className)}>
      <p className="label truncate">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={cn("font-display text-[1.625rem] leading-none font-semibold", valueTone)}>
          {value}
          {unit ? <span className="ml-0.5 text-sm font-medium text-fg-subtle">{unit}</span> : null}
        </span>
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-[0.625rem]",
              delta.direction === "up" && "bg-pass-deep text-pass",
              delta.direction === "down" && "bg-fail-deep text-fail",
              delta.direction === "flat" && "bg-surface-3 text-fg-subtle",
            )}
          >
            <span aria-hidden="true">
              {delta.direction === "up" ? "↑" : delta.direction === "down" ? "↓" : "→"}
            </span>
            {delta.value}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Table header cell with the sort affordance a real data grid has. */
export function Th({
  children,
  sorted,
  className,
}: {
  children: ReactNode;
  sorted?: "asc" | "desc";
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={cn("label px-3.5 py-2 text-left font-normal whitespace-nowrap", className)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sorted ? (
          <span aria-hidden="true" className="text-lime">
            {sorted === "asc" ? "↑" : "↓"}
          </span>
        ) : null}
      </span>
    </th>
  );
}
