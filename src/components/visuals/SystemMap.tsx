"use client";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { useReducedMotion, useScrollProgress } from "@/lib/hooks";

/**
 * The second fold, made literal.
 *
 * Nine parts make an AI product; the model is one of them, and usually the one
 * that is fine. Parts sit in their own columns either side of the statement —
 * connected by a lead line, never overlapping the words.
 */

type Part = {
  label: string;
  count: number;
  glyph: React.ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const leftParts: Part[] = [
  {
    label: "Prompt layer",
    count: 4,
    glyph: <path d="M4 5h12M4 9.5h8M4 14h5" {...stroke} />,
  },
  {
    label: "Retrieval",
    count: 6,
    glyph: (
      <>
        <ellipse cx="10" cy="5" rx="6" ry="2.3" {...stroke} />
        <path d="M4 5v9.4c0 1.2 2.7 2.3 6 2.3s6-1.1 6-2.3V5" {...stroke} />
        <path d="M4 9.8c0 1.2 2.7 2.3 6 2.3s6-1.1 6-2.3" {...stroke} />
      </>
    ),
  },
  {
    label: "Guardrails",
    count: 1,
    glyph: <path d="M10 3.5 16 6v5c0 3.6-2.6 6.1-6 6.9C6.6 17.1 4 14.6 4 11V6z" {...stroke} />,
  },
];

const rightParts: Part[] = [
  {
    label: "Tools",
    count: 3,
    glyph: (
      <>
        <circle cx="10" cy="5.5" r="2.4" {...stroke} />
        <circle cx="5" cy="14.5" r="2.2" {...stroke} />
        <circle cx="15" cy="14.5" r="2.2" {...stroke} />
        <path d="M10 8v2M10 10 5.8 12.8M10 10l4.2 2.8" {...stroke} />
      </>
    ),
  },
  {
    label: "Memory",
    count: 2,
    glyph: (
      <>
        <rect x="4" y="4" width="12" height="12" rx="3" {...stroke} />
        <path d="M7.5 8.5h5M7.5 11.5h3" {...stroke} />
      </>
    ),
  },
  {
    label: "Model",
    count: 0,
    glyph: (
      <>
        <circle cx="10" cy="10" r="6" {...stroke} />
        <circle cx="10" cy="10" r="2" {...stroke} />
      </>
    ),
  },
];

const evidence = [
  "A prompt revision quietly drops a policy.",
  "A tool call slips past its approval limit.",
  "Retrieval returns a citation nobody wrote.",
];

function PartChip({
  part,
  side,
  className,
}: {
  part: Part;
  side: "left" | "right" | "none";
  className?: string;
}) {
  const clean = part.count === 0;

  return (
    <div className={cn("flex items-center gap-3", side === "left" && "flex-row-reverse", className)}>
      {/* lead line toward the statement */}
      {side !== "none" ? (
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-gradient-to-r from-line-strong to-transparent lg:block"
          style={side === "left" ? { transform: "scaleX(-1)" } : undefined}
        />
      ) : null}

      <div
        className={cn(
          "glass-dark relative flex items-center gap-2.5 rounded-xl px-3 py-2.5",
          // In the columns the chip hugs its label; in the mobile grid it fills
          // the cell so the label never runs past the card edge.
          side === "none" ? "w-full min-w-0" : "shrink-0",
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-fg-muted">
          <svg viewBox="0 0 20 20" className="size-4">
            {part.glyph}
          </svg>
        </span>
        <span
          className={cn(
            "text-[0.8125rem] font-medium text-fg",
            side === "none" ? "min-w-0 truncate" : "whitespace-nowrap",
          )}
        >
          {part.label}
        </span>

        <span
          className={cn(
            "flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[0.625rem] font-medium",
            // Overhangs the corner in the columns; sits inline in the mobile
            // grid, where an overhang would push past the card edge.
            side === "none" ? "ml-auto shrink-0" : "absolute -right-2 -top-2",
            clean
              ? "bg-pass text-[#06210f] shadow-[0_2px_8px_-2px_rgba(79,212,134,0.8)]"
              : "bg-fail text-[#2a0b06] shadow-[0_2px_8px_-2px_rgba(255,106,82,0.8)]",
          )}
        >
          {part.count}
          <span className="sr-only">{clean ? " failures" : " failing test cases"}</span>
        </span>
      </div>
    </div>
  );
}

export function SystemMap({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const lineStyle = (index: number) => {
    if (reduced) return undefined;
    const start = 0.24 + index * 0.1;
    const local = (progress - start) / 0.32;
    const eased = local < 0 ? 0 : local > 1 ? 0 : Math.sin(local * Math.PI);
    return {
      opacity: 0.22 + eased * 0.78,
      transform: `translateY(${(1 - eased) * 10}px)`,
    };
  };

  return (
    <div ref={ref} className={className}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)_minmax(0,1fr)] lg:gap-8">
        {/* left column */}
        <div className="hidden flex-col gap-8 lg:flex">
          {leftParts.map((part, index) => (
            <Reveal key={part.label} delay={index * 90}>
              <PartChip part={part} side="left" className={index === 1 ? "lg:pr-8" : undefined} />
            </Reveal>
          ))}
        </div>

        {/* statement */}
        <div className="text-center">
          <Reveal>
            <h2 className="text-display-xl">
              <span className="block text-fg-subtle">Your model is not your product.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-display-xl">Nine parts can fail. One of them is the model.</h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
              A benchmark scores the model in isolation. Your users meet the whole system.
            </p>
          </Reveal>
        </div>

        {/* right column */}
        <div className="hidden flex-col gap-8 lg:flex">
          {rightParts.map((part, index) => (
            <Reveal key={part.label} delay={index * 90}>
              <PartChip part={part} side="right" className={index === 1 ? "lg:pl-8" : undefined} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* small screens: the same parts, as a grid under the statement */}
      <div className="mt-12 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:hidden">
        {[...leftParts, ...rightParts].map((part) => (
          <PartChip key={part.label} part={part} side="none" />
        ))}
      </div>

      {/* scroll-linked evidence */}
      <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3">
        {evidence.map((line, index) => (
          <p
            key={line}
            style={lineStyle(index)}
            className="font-mono text-mono-sm leading-relaxed text-fg-muted"
          >
            <span aria-hidden="true" className="mr-2 text-fail">
              ▸
            </span>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
