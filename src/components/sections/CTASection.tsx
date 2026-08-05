import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { routes } from "@/config/site";
import { cn } from "@/lib/cn";

type CTAProps = {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
  className?: string;
};

/**
 * Every page closes here, on the same action. The band carries the house
 * pattern: fine grid, a single radial light source, hairline top edge.
 */
export function CTASection({
  eyebrow = "Get started",
  title,
  copy,
  primary = { label: "Get your API key", href: routes.apiKey },
  secondary = { label: "Read the docs", href: routes.docs },
  note = "Start testing in minutes. No sales call required.",
  className,
}: CTAProps) {
  return (
    <section
      data-band="dark"
      className={cn("relative overflow-hidden border-t border-line bg-void", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-40 mask-fade-b" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/8 blur-[120px]"
      />

      <Container className="section-y relative">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-display-xl">{title}</h2>
          {copy ? (
            <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
              {copy}
            </p>
          ) : null}

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
              <ArrowRight />
            </ButtonLink>
          </div>

          {note ? <p className="mt-6 font-mono text-mono-xs text-fg-subtle">{note}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}
