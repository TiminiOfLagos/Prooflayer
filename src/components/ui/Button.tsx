import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
type Tone = "dark" | "light";

/* Soft rectangle, never a pill. Filled and stroked controls both carry an inner
   shadow along the bottom edge so they read as physical surfaces. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: {
    primary:
      "bg-lime text-fg-inverse shadow-[inset_0_-2px_4px_rgba(0,0,0,0.22),0_1px_2px_rgba(0,0,0,0.5)] hover:bg-[#d7ff55]",
    secondary:
      "border border-line-strong bg-surface-2/70 text-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-2px_5px_rgba(0,0,0,0.4)] hover:border-fg-subtle hover:bg-surface-2",
    ghost: "text-fg-muted hover:text-fg",
  },
  light: {
    primary:
      "bg-ink text-paper-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35),0_1px_2px_rgba(10,12,15,0.14)] hover:bg-[#1b1f25]",
    secondary:
      "border border-hairline bg-paper-2 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_5px_rgba(10,12,15,0.06)] hover:border-[#d3d7db]",
    ghost: "text-ink-muted hover:text-ink",
  },
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-10.5 px-5 text-[0.875rem]",
  lg: "h-12 px-6 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  tone = "dark",
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, styles[tone][variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  tone = "dark",
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(base, styles[tone][variant], sizes[size], className);

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
