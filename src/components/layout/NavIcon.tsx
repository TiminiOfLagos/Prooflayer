import type { IconKey } from "@/config/site";
import { cn } from "@/lib/cn";

/** Line glyphs drawn on a 16px grid — one visual weight across the whole menu. */
const paths: Record<IconKey, React.ReactNode> = {
  evaluations: (
    <>
      <path d="M3 4h10M3 8h7M3 12h4" />
      <path d="M11.5 12.5 13 14l2.5-3" />
    </>
  ),
  redteam: (
    <>
      <path d="M8 2.5 14 13H2z" />
      <path d="M8 6.5v3M8 11.2h.01" />
    </>
  ),
  guardrails: <path d="M8 2.5 13 4.4v4.1c0 2.9-2.1 4.9-5 5.5-2.9-.6-5-2.6-5-5.5V4.4z" />,
  monitoring: (
    <>
      <path d="M2 11.5 5.5 7l3 3L14 3.5" />
      <path d="M14 3.5h-3.5M14 3.5V7" />
    </>
  ),
  demo: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M6.8 5.9 10.3 8l-3.5 2.1z" />
    </>
  ),
  overview: (
    <>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <path d="M2.5 6.5h11M6.5 6.5v7" />
    </>
  ),
  agents: (
    <>
      <circle cx="8" cy="4.5" r="2" />
      <circle cx="4" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <path d="M8 6.5v2M8 8.5 4.6 10.6M8 8.5l3.4 2.1" />
    </>
  ),
  retrieval: (
    <>
      <ellipse cx="8" cy="4.2" rx="5" ry="1.9" />
      <path d="M3 4.2v7.6c0 1 2.2 1.9 5 1.9s5-.9 5-1.9V4.2" />
      <path d="M3 8c0 1 2.2 1.9 5 1.9s5-.9 5-1.9" />
    </>
  ),
  copilot: (
    <>
      <path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 11H7l-3 2.4V11h-.5A1.5 1.5 0 0 1 2.5 9.5z" />
      <path d="M6 7h4" />
    </>
  ),
  internal: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <path d="M2.2 13c.4-2 1.9-3.2 3.8-3.2S9.4 11 9.8 13" />
      <circle cx="11.6" cy="6.6" r="1.6" />
      <path d="M10.6 9.9c1.6-.2 2.9.9 3.2 3.1" />
    </>
  ),
  docs: (
    <>
      <path d="M4 2.5h5.5L13 6v7.5H4z" />
      <path d="M9.5 2.5V6H13M6.2 9h4.2M6.2 11.2h3" />
    </>
  ),
  changelog: (
    <>
      <circle cx="4.5" cy="4.5" r="1.6" />
      <circle cx="4.5" cy="11.5" r="1.6" />
      <path d="M4.5 6.1v3.8M8 4.5h5.5M8 11.5h5.5" />
    </>
  ),
  security: (
    <>
      <rect x="3" y="7" width="10" height="6.5" rx="1.6" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
    </>
  ),
  pricing: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M9.8 6.2A2 2 0 0 0 8 5.2c-1.1 0-1.9.6-1.9 1.4 0 2 3.8 1 3.8 3 0 .8-.8 1.4-1.9 1.4a2 2 0 0 1-1.8-1M8 4.2v7.6" />
    </>
  ),
};

/**
 * Icon tile from the reference menu: a soft square plate with corner registration
 * dots, so the menu reads as an interface rather than a list of links.
 */
export function NavIcon({
  icon,
  size = "md",
  className,
}: {
  icon: IconKey;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2",
        "shadow-[inset_0_-2px_4px_rgba(0,0,0,0.35)] transition-colors duration-200",
        "group-hover:border-lime/40 group-hover:bg-lime-deep group-hover:text-lime",
        size === "md" ? "size-10" : "size-8",
        className,
      )}
    >
      {/* corner registration dots */}
      {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((pos) => (
        <span
          key={pos}
          className={cn("absolute size-[2px] rounded-full bg-line-strong", pos)}
        />
      ))}
      <svg
        viewBox="0 0 16 16"
        className={size === "md" ? "size-[18px]" : "size-4"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[icon]}
      </svg>
    </span>
  );
}
