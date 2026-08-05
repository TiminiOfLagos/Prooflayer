import Link from "next/link";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Marks";
import { Container } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { footerNav, routes } from "@/config/site";

export function SiteFooter() {
  return (
    <footer data-band="dark" className="relative overflow-hidden border-t border-line bg-graphite">
      <div aria-hidden="true" className="absolute inset-0 grid-texture opacity-25" />

      <Container className="relative pb-14 pt-20 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-20">
          <div className="max-w-sm">
            <Link href={routes.home} aria-label={`${brand.name} home`}>
              <Wordmark />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              One evaluation layer for LLM products: evaluations, adversarial red-teaming,
              guardrail validation and continuous monitoring.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={routes.apiKey} size="sm">
                Get your API key
              </ButtonLink>
              <ButtonLink href={routes.docs} variant="secondary" size="sm">
                Read the docs
                <ArrowRight />
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="label">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => {
                    const external = link.href.startsWith("mailto:");
                    return (
                      <li key={link.href}>
                        {external ? (
                          <a
                            href={link.href}
                            className="text-sm text-fg-muted transition-colors hover:text-fg"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-fg-muted transition-colors hover:text-fg"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The concept disclaimer, set as a sentence — both lines at one size */}
        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
          <p className="max-w-2xl font-display text-[1.0625rem] leading-relaxed font-medium text-fg-muted">
            {brand.name} is a fictional AI infrastructure product,
            <span className="text-fg-subtle">
              {" "}
              created as a product design and development concept.
            </span>
          </p>
          <p className="font-display text-[1.0625rem] leading-relaxed font-medium whitespace-nowrap text-fg-subtle">
            © {new Date().getFullYear()} · Concept build
          </p>
        </div>
      </Container>

      {/* Oversized wordmark, cropped by the footer edge so it closes the page
          rather than sitting on it as a separate object */}
      <div className="relative px-5 pt-6 sm:px-8">
        <p
          aria-hidden="true"
          className="-mb-[0.18em] select-none text-center font-display text-[clamp(3.5rem,15vw,13rem)] leading-[0.78] font-bold tracking-[-0.05em] text-fg/6"
        >
          {brand.name}
        </p>
      </div>
    </footer>
  );
}
