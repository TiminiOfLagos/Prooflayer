import { Reveal } from "@/components/motion/Reveal";
import { workflowSteps } from "@/data/architecture";
import { cn } from "@/lib/cn";

/**
 * Five steps drawn as one continuous path rather than five icon cards — the
 * point of the section is that the steps form a loop, not a list.
 * `invert` adapts it to the light band.
 */
export function WorkflowPath({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <ol className={cn("relative grid gap-8 lg:grid-cols-5 lg:gap-4", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 right-0 top-[1.125rem] hidden h-px lg:block",
          invert
            ? "bg-gradient-to-r from-lime-dim/70 via-ink-line to-ink-line"
            : "bg-gradient-to-r from-lime/50 via-line-strong to-line-strong",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-6 left-[1.125rem] top-6 w-px lg:hidden",
          invert ? "bg-ink-line" : "bg-line-strong",
        )}
      />

      {workflowSteps.map((step, index) => (
        <Reveal as="li" key={step.step} delay={index * 70} className="relative flex gap-4 lg:flex-col lg:gap-5">
          <span
            className={cn(
              "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-mono-xs",
              index === 0
                ? "border-lime bg-lime text-fg-inverse shadow-[inset_0_-2px_4px_rgba(0,0,0,0.22)]"
                : invert
                  ? "border-ink-line bg-paper-2 text-ink-muted shadow-[inset_0_-2px_4px_rgba(11,13,16,0.06)]"
                  : "border-line-strong bg-surface text-fg-muted shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)]",
            )}
          >
            {step.step}
          </span>

          <div className="pb-2 lg:pb-0">
            <h3
              className={cn(
                "font-display text-[1.0625rem] leading-snug font-semibold",
                invert ? "text-ink" : "text-fg",
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                invert ? "text-ink-muted" : "text-fg-muted",
              )}
            >
              {step.copy}
            </p>
            <p
              className={cn(
                "mt-3 inline-flex rounded-full border px-2.5 py-1 font-mono text-mono-xs",
                invert
                  ? "border-ink-line bg-paper-2 text-ink-muted"
                  : "border-line bg-surface-2 text-fg-subtle",
              )}
            >
              {step.meta}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
