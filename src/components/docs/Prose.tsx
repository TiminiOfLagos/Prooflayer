import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Documentation typography primitives. Explicit components rather than a
 * global prose stylesheet, so heading IDs stay wired to the table of contents.
 */

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 pt-10 font-display text-display-md first:pt-0">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-28 pt-7 font-display text-[1.125rem] font-semibold text-fg">
      {children}
    </h3>
  );
}

export function P({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-4 text-[0.9375rem] leading-relaxed text-fg-muted", className)}>
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted">
      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-lime" />
      <span>{children}</span>
    </li>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-xs border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.8125em] text-fg">
      {children}
    </code>
  );
}

export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: "note" | "warning";
  title: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={cn(
        "mt-6 rounded-lg border px-4 py-3.5",
        tone === "note" ? "border-violet/35 bg-violet-deep/40" : "border-warn/40 bg-warn-deep/50",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 font-mono text-mono-xs",
          tone === "note" ? "text-violet" : "text-warn",
        )}
      >
        <span aria-hidden="true">{tone === "note" ? "◆" : "▲"}</span>
        {title}
      </p>
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">{children}</div>
    </aside>
  );
}

/** Parameter / field reference table used in API-shaped sections. */
export function FieldTable({
  rows,
}: {
  rows: { name: string; type: string; detail: string }[];
}) {
  return (
    <div className="rail mt-5 rounded-lg border border-line">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface">
            {["Field", "Type", "Description"].map((heading) => (
              <th key={heading} scope="col" className="label px-4 py-2.5 font-normal">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-line last:border-0">
              <th scope="row" className="px-4 py-3 font-mono text-mono-sm font-normal text-lime">
                {row.name}
              </th>
              <td className="px-4 py-3 font-mono text-mono-xs text-fg-subtle">{row.type}</td>
              <td className="px-4 py-3 text-[0.875rem] leading-relaxed text-fg-muted">
                {row.detail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
