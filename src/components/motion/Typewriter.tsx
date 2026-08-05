"use client";

import { useEffect, useState } from "react";

import { FractureWord } from "@/components/motion/FractureWord";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

export type TypeSegment = {
  text: string;
  /** Renders through the fracture treatment once typed. */
  fracture?: boolean;
};

/**
 * Types a headline out on first paint.
 *
 * The complete text is always in the DOM for assistive technology and search;
 * only the visual layer animates, and reduced-motion visitors get the finished
 * headline immediately.
 */
export function Typewriter({
  segments,
  className,
  speed = 17,
  startDelay = 140,
}: {
  segments: TypeSegment[];
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const reduced = useReducedMotion();
  const full = segments.map((segment) => segment.text).join("");
  const [typed, setTyped] = useState(0);
  const done = typed >= full.length;

  useEffect(() => {
    if (reduced) {
      setTyped(full.length);
      return;
    }

    let ticker = 0;
    const start = window.setTimeout(() => {
      ticker = window.setInterval(() => {
        setTyped((value) => {
          if (value >= full.length) {
            window.clearInterval(ticker);
            return value;
          }
          return value + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(ticker);
    };
  }, [full.length, reduced, speed, startDelay]);

  let consumed = 0;

  return (
    <span className={className}>
      <span className="sr-only">{full}</span>

      <span aria-hidden="true">
        {segments.map((segment, index) => {
          const start = consumed;
          consumed += segment.text.length;
          const visible = Math.max(0, Math.min(segment.text.length, typed - start));
          const complete = visible === segment.text.length;

          if (segment.fracture) {
            // The fracture needs the whole word to measure against, so it only
            // renders once the word is fully typed; before that it types plainly.
            return complete ? (
              <FractureWord key={index} active>
                {segment.text}
              </FractureWord>
            ) : (
              <span key={index}>
                {segment.text.slice(0, visible)}
                <span className="opacity-0">{segment.text.slice(visible)}</span>
              </span>
            );
          }

          return (
            <span key={index}>
              {segment.text.slice(0, visible)}
              <span className="opacity-0">{segment.text.slice(visible)}</span>
            </span>
          );
        })}

        {!done && !reduced ? (
          <span
            className={cn(
              "ml-[0.08em] inline-block h-[0.62em] w-[0.045em] translate-y-[-0.02em] rounded-full bg-lime align-baseline",
            )}
            style={{ animation: "blink 1.05s steps(1) infinite" }}
          />
        ) : null}
      </span>
    </span>
  );
}
