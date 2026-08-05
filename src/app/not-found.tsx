import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

const destinations = [
  { label: "Product overview", href: routes.product, meta: "how the layer fits together" },
  { label: "Interactive demo", href: routes.demo, meta: "run a suite, no account" },
  { label: "Documentation", href: routes.docs, meta: "quickstart and API reference" },
  { label: "Pricing", href: routes.pricing, meta: "tiers and estimator" },
];

export default function NotFound() {
  return (
    <section data-band="dark" className="relative overflow-hidden bg-void">
      <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-40 mask-fade-b" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-lime/8 blur-[130px]"
      />

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <Eyebrow accent="neutral">Error 404</Eyebrow>

          {/* House pattern: the status expressed as an evaluation result */}
          <p
            aria-hidden="true"
            className="mt-10 font-display text-[clamp(5rem,18vw,11rem)] leading-[0.82] font-bold tracking-[-0.05em] text-fg/8"
          >
            404
          </p>

          <h1 className="-mt-6 text-display-xl sm:-mt-10">This page could not be found.</h1>

          <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
            The link is out of date or the page never existed. Everything {brand.name} does is one
            of the four routes below.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.home} size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href={routes.docs} variant="secondary" size="lg">
              Read the docs
              <ArrowRight />
            </ButtonLink>
          </div>

          <ul className="mt-14 grid w-full gap-3 sm:grid-cols-2">
            {destinations.map((item) => (
              <li key={item.href}>
                <ButtonLink
                  href={item.href}
                  variant="secondary"
                  className="group h-auto w-full justify-between px-4 py-3.5 text-left"
                >
                  <span className="flex flex-col items-start gap-0.5">
                    <span className="text-sm text-fg">{item.label}</span>
                    <span className="font-mono text-mono-xs text-fg-subtle">{item.meta}</span>
                  </span>
                  <ArrowRight className="text-fg-subtle transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
