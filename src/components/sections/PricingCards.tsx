import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card, Eyebrow } from "@/components/ui/Primitives";
import { tiers } from "@/data/pricing";
import { cn } from "@/lib/cn";

/** The headline figure, split so the unit reads quieter than the number. */
const figures: Record<string, { value: string; unit: string }> = {
  sandbox: { value: "$0", unit: "/ month" },
  scale: { value: "$0.004", unit: "/ evaluation run" },
  enterprise: { value: "Custom", unit: "annual agreement" },
};

/**
 * One set of pricing cards, used on the pricing page and on the landing page,
 * so the two never drift apart.
 */
export function PricingCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 lg:grid-cols-3", className)}>
      {tiers.map((tier, index) => {
        const figure = figures[tier.id];
        return (
          <Reveal key={tier.id} delay={index * 90}>
            <Card
              tone="light"
              className={cn(
                "relative flex h-full flex-col p-7",
                tier.featured && "ring-1 ring-ink/12 shadow-[0_40px_80px_-45px_rgba(10,12,15,0.5)]",
              )}
            >
              {tier.featured
                ? [
                    "-left-1 -top-1",
                    "-right-1 -top-1",
                    "-left-1 -bottom-1",
                    "-right-1 -bottom-1",
                  ].map((position) => (
                    <span
                      key={position}
                      aria-hidden="true"
                      className={cn(
                        "absolute size-2 rounded-[2px] border border-ink/40 bg-paper-2",
                        position,
                      )}
                    />
                  ))
                : null}

              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-display-sm text-ink">{tier.name}</h3>
                {tier.featured ? (
                  <Eyebrow tone="light" accent="lime">
                    Most used
                  </Eyebrow>
                ) : null}
              </div>

              <p className="mt-7 font-display text-[2.75rem] leading-none font-bold text-ink">
                {figure.value}
                <span className="ml-2 align-middle font-sans text-sm font-normal text-ink-subtle">
                  {figure.unit}
                </span>
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{tier.summary}</p>

              <ButtonLink
                href={tier.cta.href}
                tone="light"
                variant={tier.featured ? "primary" : "secondary"}
                size="lg"
                className="mt-7 w-full justify-between"
              >
                {tier.cta.label}
                <ArrowRight />
              </ButtonLink>

              <p className="label mt-8 text-ink-subtle">Includes</p>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
