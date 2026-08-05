import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

/**
 * Product mark: three stacked evaluation layers with the top layer proved.
 * Drawn, not imported — the whole graphic language is original vector work.
 */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)} fill="none">
      <path d="M12 2.6 21.4 7 12 11.4 2.6 7 12 2.6Z" className="fill-lime" />
      <path
        d="M2.6 12 12 16.4 21.4 12"
        className="stroke-fg-muted"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M2.6 17 12 21.4 21.4 17"
        className="stroke-fg-subtle"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
  tone = "dark",
}: {
  className?: string;
  markClassName?: string;
  /** `light` = sitting on a light band. */
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Logomark className={cn("size-[1.15em]", markClassName)} />
      <span
        className={cn(
          "font-display text-[1.0625rem] font-bold tracking-[-0.02em] transition-colors duration-300",
          tone === "light" ? "text-ink" : "text-fg",
        )}
      >
        {brand.name}
      </span>
    </span>
  );
}

/** Soft radial lighting. Used sparingly, never as a full-page gradient wash. */
export function RadialGlow({
  className,
  tone = "lime",
}: {
  className?: string;
  tone?: "lime" | "violet";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-[100px]",
        tone === "lime" ? "bg-lime/8" : "bg-violet/10",
        className,
      )}
    />
  );
}
