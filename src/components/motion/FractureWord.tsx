"use client";

import { cn } from "@/lib/cn";

/**
 * The break cue.
 *
 * The word is cut along a shallow fault and the lower fragment slips — down,
 * right, and a fraction of a degree out of true — with an accent sliver of light
 * along the exposed edge. No line is drawn through the word, so it reads as
 * broken rather than struck out.
 */
export function FractureWord({
  children,
  active = true,
  className,
}: {
  children: string;
  active?: boolean;
  className?: string;
}) {
  // The fault: 58% on the left edge, 44% on the right.
  const upper = "polygon(-4% -40%, 104% -40%, 104% 44%, -4% 58%)";
  const lower = "polygon(-4% 58%, 104% 44%, 104% 140%, -4% 140%)";

  const slip = active
    ? "translate(0.036em, 0.042em) rotate(0.4deg)"
    : "translate(0, 0) rotate(0deg)";

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {/* reserves layout */}
      <span className="invisible" aria-hidden="true">
        {children}
      </span>

      {/* upper fragment, nudged the other way so the break opens */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          clipPath: upper,
          WebkitClipPath: upper,
          transform: active ? "translate(-0.014em, -0.022em)" : "none",
        }}
      >
        {children}
      </span>

      {/* accent sliver: sits just above the lower fragment so the cut catches light */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 text-lime transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          clipPath: lower,
          WebkitClipPath: lower,
          transform: active
            ? "translate(0.036em, 0.03em) rotate(0.4deg)"
            : "translate(0, 0) rotate(0deg)",
        }}
      >
        {children}
      </span>

      {/* lower fragment */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          clipPath: lower,
          WebkitClipPath: lower,
          transform: slip,
          filter: active ? "drop-shadow(0 1px 3px rgba(0,0,0,0.55))" : "none",
        }}
      >
        {children}
      </span>
    </span>
  );
}
