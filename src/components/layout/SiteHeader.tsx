"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { NavIcon } from "@/components/layout/NavIcon";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Marks";
import { brand } from "@/config/brand";
import { primaryNav, routes, type NavItem } from "@/config/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/hooks";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href && item.href !== "/") return pathname.startsWith(item.href.split("#")[0]);
  if (item.columns) {
    return item.columns.some((column) =>
      column.links.some((link) => {
        const base = link.href.split("#")[0];
        return base !== "/" && base !== "" && pathname.startsWith(base);
      }),
    );
  }
  return false;
}

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn("size-2.5 transition-transform duration-200", open && "rotate-180", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

/**
 * Menu panel: columns side by side so the list stays short. The primary column
 * carries descriptions; the secondary one is a compact list of destinations.
 */
function Menu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrapperRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  const columns = item.columns ?? [];

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm transition-colors",
          active || open ? "text-fg" : "text-fg-muted hover:text-fg",
        )}
      >
        {item.label}
        <Chevron open={open} />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-out",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={cn(
            "panel-dark grid gap-x-8 rounded-2xl p-5",
            columns.length > 1 ? "grid-cols-[21rem_14rem]" : "w-[22rem] grid-cols-1",
          )}
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="label mb-3 px-2">{column.title}</p>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-surface-2",
                        column.compact && "items-center",
                      )}
                    >
                      <NavIcon icon={link.icon} size={column.compact ? "sm" : "md"} />
                      <span className="min-w-0">
                        <span className="block text-[0.875rem] font-semibold text-fg">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="mt-0.5 block text-[0.78125rem] leading-snug text-fg-subtle">
                            {link.description}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

/** Mobile menu: grouped items collapse, standalone links stay standalone. */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /**
   * Scroll lock that also holds on iOS, where `overflow: hidden` on the body is
   * not enough: the document is pinned at its current offset and restored on
   * close, so the page never scrolls behind the panel and never jumps.
   */
  useEffect(() => {
    if (!open) return;

    const { scrollY } = window;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  if (!mounted) return null;

  const panel = (
    <div
      id="mobile-menu"
      hidden={!open}
      /* dvh, not bottom-0: iOS collapses its toolbar as you scroll, and a
         bottom-anchored fixed panel gets cut off when it does. */
      className={cn(
        "fixed inset-x-0 top-[3.75rem] z-40 h-[calc(100dvh-3.75rem)] flex-col overscroll-contain border-t border-line bg-void/95 backdrop-blur-xl lg:hidden",
        open ? "flex" : "hidden",
      )}
      style={{ touchAction: "pan-y" }}
    >
      <nav
        aria-label="Mobile"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
      >
        <ul className="flex flex-col divide-y divide-line">
          {primaryNav.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 text-[1rem] font-medium text-fg"
                  >
                    {item.label}
                    <ArrowRight className="text-fg-subtle" />
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex w-full items-center justify-between py-4 text-[1rem] font-medium text-fg"
                    >
                      {item.label}
                      <Chevron open={isOpen} className="size-3 text-fg-subtle" />
                    </button>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="flex flex-col gap-1 pb-3">
                          {item.columns
                            ?.flatMap((column) => column.links)
                            .map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-surface-2"
                                >
                                  <NavIcon icon={link.icon} size="sm" />
                                  <span className="min-w-0 flex-1 text-[0.9375rem] text-fg-muted">
                                    {link.label}
                                  </span>
                                  <ArrowRight className="size-3 shrink-0 text-fg-subtle" />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-line bg-void px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <ButtonLink href={routes.apiKey} size="lg" className="w-full" onClick={onClose}>
          Get your API key
        </ButtonLink>
        <Link
          href={routes.signIn}
          onClick={onClose}
          className="mt-3 block text-center text-sm text-fg-muted"
        >
          Already have a workspace? <span className="text-fg">Sign in</span>
        </Link>
      </div>
    </div>
  );

  /* Portalled to <body> so no ancestor's clip, transform or stacking context
     can ever move or hide the overlay. */
  return createPortal(panel, document.body);
}

export function SiteHeader() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* The bar keeps its own colour at all times — translucent once the page
          moves, never transparent, so the mark and the action never restyle. */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled && !menuOpen
            ? "border-line bg-void/80 backdrop-blur-xl"
            : "border-transparent bg-void",
        )}
      >
        <div className="mx-auto flex h-15 max-w-[86rem] items-center justify-between gap-4 px-5 sm:px-8">
          <Link href={routes.home} className="shrink-0" aria-label={`${brand.name} home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) =>
                item.columns ? (
                  <Menu key={item.label} item={item} active={isActive(pathname, item)} />
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      aria-current={isActive(pathname, item) ? "page" : undefined}
                      className={cn(
                        "relative rounded-md px-2.5 py-2 text-sm transition-colors",
                        isActive(pathname, item) ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      {isActive(pathname, item) ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-2.5 -bottom-px h-px bg-lime"
                        />
                      ) : null}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={routes.signIn}
              className="hidden rounded-md px-2.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg lg:block"
            >
              Sign in
            </Link>
            <ButtonLink href={routes.apiKey} size="sm" className="hidden sm:inline-flex">
              Get API key
            </ButtonLink>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex size-9.5 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-fg lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
