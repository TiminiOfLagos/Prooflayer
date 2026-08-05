import { cn } from "@/lib/cn";

/**
 * Pillar visuals for the light band.
 *
 * Each one is a slice of real product surface, floated on a soft plate with a
 * hairline stroke and a chip that annotates it — the reference language of a
 * premium product page, in our own material.
 */

function Plate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[13.5rem] overflow-hidden rounded-xl border border-hairline bg-paper-3/60",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 grid-texture-light" />
      {children}
    </div>
  );
}

function Chip({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "fail" | "pass" | "warn";
}) {
  return (
    <span
      className={cn(
        "glass-light absolute z-10 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[0.6875rem] whitespace-nowrap",
        tone === "neutral" && "text-ink-muted",
        tone === "fail" && "text-[#a32c17]",
        tone === "pass" && "text-[#136c3c]",
        tone === "warn" && "text-[#8a5a06]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Evaluations: a suite running against a threshold. */
export function EvaluationsVisual() {
  const rows = [
    { name: "citation_accuracy", score: 94, pass: true },
    { name: "refusal_quality", score: 98, pass: true },
    { name: "consistency@20", score: 92, pass: false },
    { name: "task_completion", score: 89, pass: false },
  ];

  return (
    <Plate>
      <div className="panel-light absolute inset-x-5 top-5 rounded-lg p-3.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.6875rem] text-ink-subtle">suite · reliability</span>
          <span className="font-mono text-[0.6875rem] text-ink-subtle">4 cases</span>
        </div>
        <ul className="mt-3 flex flex-col gap-2.5">
          {rows.map((row) => (
            <li key={row.name} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate font-mono text-[0.6875rem] text-ink-muted">
                {row.name}
              </span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-paper-3">
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    row.pass ? "bg-[#34b36c]" : "bg-[#e2a32b]",
                  )}
                  style={{ width: `${row.score}%` }}
                />
              </span>
              <span className="w-6 shrink-0 text-right font-mono text-[0.6875rem] text-ink tabular-nums">
                {row.score}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Chip className="bottom-4 left-5" tone="neutral">
        threshold ≥ 95
      </Chip>
      <Chip className="bottom-4 right-5" tone="warn">
        2 below
      </Chip>
    </Plate>
  );
}

/**
 * Red-teaming: generated attack paths radiating from your policy set.
 * Rings, glass nodes and a live dash flow — the visual the section is known for,
 * rebuilt at a higher finish.
 */
export function RedTeamVisual() {
  return (
    <Plate>
      <svg
        viewBox="0 0 320 216"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Attack paths radiating from a policy set: three contained, one escalated"
      >
        {/* rings */}
        {[38, 62, 86].map((r) => (
          <circle
            key={r}
            cx="86"
            cy="108"
            r={r}
            fill="none"
            stroke="rgba(10,12,15,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* paths */}
        {[
          { d: "M104 108 C 150 108, 168 44, 214 44", tone: "#c7ccd2", delay: "0ms" },
          { d: "M104 108 C 150 108, 168 84, 214 84", tone: "#c7ccd2", delay: "300ms" },
          { d: "M104 108 C 150 108, 168 132, 214 132", tone: "#e2a32b", delay: "600ms" },
          { d: "M104 108 C 150 108, 168 172, 214 172", tone: "#e8563a", delay: "900ms" },
        ].map((path) => (
          <path
            key={path.d}
            d={path.d}
            fill="none"
            stroke={path.tone}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            className="motion-safe:animate-dash"
            style={{ animationDelay: path.delay }}
          />
        ))}

        {/* origin */}
        <circle cx="86" cy="108" r="21" fill="#ffffff" stroke="rgba(10,12,15,0.08)" />
        <circle cx="86" cy="108" r="21" fill="none" stroke="rgba(10,12,15,0.05)" />
        <path
          d="M79 103h14M79 108h9M79 113h11"
          stroke="#5f6771"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* outcome nodes */}
        {[
          { y: 44, label: "contained", tone: "#136c3c", bg: "#e3f8ec", border: "#b5e6ca" },
          { y: 84, label: "contained", tone: "#136c3c", bg: "#e3f8ec", border: "#b5e6ca" },
          { y: 132, label: "partial", tone: "#8a5a06", bg: "#fdf1d9", border: "#eed6a3" },
          { y: 172, label: "escalated", tone: "#a32c17", bg: "#ffe6e1", border: "#f3c1b6" },
        ].map((node) => (
          <g key={node.y}>
            <rect
              x="214"
              y={node.y - 12}
              width="92"
              height="24"
              rx="7"
              fill={node.bg}
              stroke={node.border}
            />
            <circle cx="227" cy={node.y} r="3" fill={node.tone} />
            <text
              x="236"
              y={node.y + 3.5}
              fill={node.tone}
              className="font-mono"
              fontSize="9.5"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <Chip className="left-5 top-4" tone="neutral">
        24 policies
      </Chip>
      <Chip className="bottom-4 right-5" tone="fail">
        1 breached
      </Chip>
    </Plate>
  );
}

/** Guardrails: policy coverage across the layers that enforce it. */
export function GuardrailsVisual() {
  const columns = ["input", "output", "tools", "rag"];
  const rows = [
    { label: "pii_redaction", cells: [2, 2, 2, 1] },
    { label: "refund_limit", cells: [2, 2, 1, 3] },
    { label: "no_advice", cells: [2, 2, 3, 2] },
    { label: "escalation", cells: [2, 1, 2, 0] },
  ];

  return (
    <Plate>
      <div className="panel-light absolute inset-x-5 top-5 rounded-lg p-3.5">
        <div className="grid grid-cols-[minmax(0,1fr)_repeat(4,1.75rem)] items-center gap-1.5">
          <span />
          {columns.map((column) => (
            <span key={column} className="text-center font-mono text-[0.625rem] text-ink-subtle">
              {column}
            </span>
          ))}

          {rows.map((row) => (
            <div key={row.label} className="contents">
              <span className="truncate font-mono text-[0.6875rem] text-ink-muted">
                {row.label}
              </span>
              {row.cells.map((cell, index) => (
                <span
                  key={index}
                  className={cn(
                    "flex h-6 items-center justify-center rounded-md border font-mono text-[0.625rem]",
                    cell === 2 && "border-[#b5e6ca] bg-[#e3f8ec] text-[#136c3c]",
                    cell === 1 && "border-[#eed6a3] bg-[#fdf1d9] text-[#8a5a06]",
                    cell === 0 && "border-[#f3c1b6] bg-[#ffe6e1] text-[#a32c17]",
                    cell === 3 && "border-hairline bg-paper text-ink-subtle",
                  )}
                >
                  {cell === 2 ? "✓" : cell === 1 ? "~" : cell === 0 ? "✕" : "·"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Chip className="bottom-4 left-5" tone="pass">
        83% covered
      </Chip>
      <Chip className="bottom-4 right-5" tone="fail">
        1 gap
      </Chip>
    </Plate>
  );
}
