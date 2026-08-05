"use client";

import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/hooks";

/**
 * One reveal, used everywhere: a short rise and fade as the block enters view.
 * Consistency is the point — every section moves the same way, so motion reads
 * as a property of the page rather than an effect applied to a few places.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  /** Stagger in milliseconds. Keep under ~200ms; this is punctuation, not choreography. */
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        inView ? "opacity-100 md:translate-y-0" : "motion-safe:opacity-0 motion-safe:md:translate-y-4",
        className,
      )}
    >
      {children}
    </Component>
  );
}
