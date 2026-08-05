import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";

/**
 * The five workflow steps as a bento: two wide cards carrying the setup, three
 * narrower ones carrying the loop. Each card holds a small piece of real
 * interface rather than an icon standing in for one.
 */

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-paper-2 text-ink-muted shadow-[inset_0_-2px_4px_rgba(10,12,15,0.05)]">
      <svg viewBox="0 0 20 20" className="size-[18px]">
        {children}
      </svg>
    </span>
  );
}

function Head({
  step,
  title,
  copy,
  icon,
}: {
  step: string;
  title: string;
  copy: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <StepIcon>{icon}</StepIcon>
      <div className="min-w-0">
        <p className="font-mono text-[0.625rem] tracking-[0.1em] text-ink-subtle uppercase">
          Step {step}
        </p>
        <h3 className="mt-1.5 font-display text-[1.0625rem] leading-snug font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{copy}</p>
      </div>
    </div>
  );
}

/** Mini surface used inside each bento card. */
function Mini({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "panel-light relative overflow-hidden rounded-xl p-3.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function WorkflowBento({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-6", className)}>
      {/* 01 — connect */}
      <Reveal className="lg:col-span-3">
        <Card tone="light" className="flex h-full flex-col justify-between gap-7 p-6">
          <Head
            step="01"
            title="Connect your application"
            copy="Point the SDK at the function that already produces your response."
            icon={
              <>
                <path d="M7.5 12.5 4 9l3.5-3.5" {...iconStroke} />
                <path d="M12.5 5.5 16 9l-3.5 3.5" {...iconStroke} />
                <path d="M11 3.5 9 16.5" {...iconStroke} />
              </>
            }
          />

          <Mini className="font-mono text-[0.6875rem] leading-relaxed">
            <p className="text-ink-subtle">evaluate.py</p>
            <pre className="mt-2.5 whitespace-pre-wrap text-ink-muted">
              <span className="text-[#7a4fd0]">from</span> prooflayer{" "}
              <span className="text-[#7a4fd0]">import</span> Prooflayer{"\n"}
              client = Prooflayer(){"\n"}
              client.evaluations.run(target=<span className="text-[#2c7a4b]">agent</span>)
            </pre>
            <span className="absolute right-3 top-3 rounded-full border border-hairline bg-paper px-2 py-0.5 text-[0.5625rem] text-ink-subtle">
              4 lines
            </span>
          </Mini>
        </Card>
      </Reveal>

      {/* 02 — define */}
      <Reveal delay={80} className="lg:col-span-3">
        <Card tone="light" className="flex h-full flex-col justify-between gap-7 p-6">
          <Head
            step="02"
            title="Define expected behaviour"
            copy="Required refusals, citation rules, tool scopes, tone, latency budgets."
            icon={
              <>
                <rect x="3.5" y="3.5" width="13" height="13" rx="3" {...iconStroke} />
                <path d="M7 10.2 9 12.2l4-4.4" {...iconStroke} />
              </>
            }
          />

          <Mini>
            <ul className="flex flex-col gap-2">
              {[
                ["escalates over-limit refunds", "rule"],
                ["cites the source it used", "rubric"],
                ["never gives personalised advice", "policy"],
              ].map(([rule, kind]) => (
                <li key={rule} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#34b36c]" />
                    <span className="truncate text-[0.75rem] text-ink-muted">{rule}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-hairline bg-paper px-2 py-0.5 font-mono text-[0.5625rem] text-ink-subtle">
                    {kind}
                  </span>
                </li>
              ))}
            </ul>
          </Mini>
        </Card>
      </Reveal>

      {/* 03 — generate */}
      <Reveal delay={160} className="lg:col-span-2">
        <Card tone="light" className="flex h-full flex-col justify-between gap-7 p-6">
          <Head
            step="03"
            title="Generate test cases"
            copy="Import real traces or generate adversarial variants."
            icon={
              <>
                <path d="M10 3.5v13M3.5 10h13" {...iconStroke} />
                <circle cx="10" cy="10" r="7" {...iconStroke} />
              </>
            }
          />

          <Mini className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[1.75rem] leading-none font-bold text-ink">128</p>
              <p className="mt-1.5 font-mono text-[0.625rem] text-ink-subtle">cases ready</p>
            </div>
            <div className="flex items-end gap-1">
              {[9, 14, 11, 18, 22, 16, 24].map((height, index) => (
                <span
                  key={index}
                  className="w-1.5 rounded-sm bg-[#c9ced4]"
                  style={{ height }}
                />
              ))}
            </div>
          </Mini>
        </Card>
      </Reveal>

      {/* 04 — run */}
      <Reveal delay={240} className="lg:col-span-2">
        <Card tone="light" className="flex h-full flex-col justify-between gap-7 p-6">
          <Head
            step="04"
            title="Run the suite"
            copy="Locally, in CI, or on a schedule — the same command."
            icon={
              <>
                <circle cx="10" cy="10" r="7" {...iconStroke} />
                <path d="M8.4 7.2 13 10l-4.6 2.8z" {...iconStroke} />
              </>
            }
          />

          <Mini>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.625rem] text-ink-subtle">executing</span>
              <span className="font-mono text-[0.625rem] text-ink-muted">96 / 128</span>
            </div>
            <span className="mt-2.5 block h-1.5 w-full overflow-hidden rounded-full bg-paper-3">
              <span className="block h-full w-3/4 rounded-full bg-ink" />
            </span>
            <div className="mt-3 flex gap-1.5">
              <span className="rounded-full border border-[#b5e6ca] bg-[#e3f8ec] px-2 py-0.5 font-mono text-[0.5625rem] text-[#136c3c]">
                88 passed
              </span>
              <span className="rounded-full border border-[#f3c1b6] bg-[#ffe6e1] px-2 py-0.5 font-mono text-[0.5625rem] text-[#a32c17]">
                3 failed
              </span>
            </div>
          </Mini>
        </Card>
      </Reveal>

      {/* 05 — track */}
      <Reveal delay={320} className="lg:col-span-2">
        <Card tone="light" className="flex h-full flex-col justify-between gap-7 p-6">
          <Head
            step="05"
            title="Track regressions"
            copy="Block the release when a critical case crosses its threshold."
            icon={
              <>
                <path d="M3.5 13.5 8 8.5l3 3 5.5-6" {...iconStroke} />
                <path d="M16.5 5.5H13M16.5 5.5V9" {...iconStroke} />
              </>
            }
          />

          <Mini>
            <ul className="flex flex-col gap-2 font-mono text-[0.6875rem]">
              {[
                ["citation_accuracy", "+12", true],
                ["tool_permissions", "−22", false],
              ].map(([name, delta, up]) => (
                <li key={name as string} className="flex items-center justify-between gap-3">
                  <span className="truncate text-ink-muted">{name}</span>
                  <span className={up ? "text-[#136c3c]" : "text-[#a32c17]"}>{delta}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-md border border-[#f3c1b6] bg-[#ffe6e1] px-2 py-1 text-center font-mono text-[0.5625rem] text-[#a32c17]">
              gate blocked the merge
            </p>
          </Mini>
        </Card>
      </Reveal>
    </div>
  );
}
