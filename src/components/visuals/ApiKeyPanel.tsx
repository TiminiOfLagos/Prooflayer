"use client";

import { useState } from "react";

import { ArrowRight, Button, ButtonLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Badge } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

function generateDemoKey() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint32Array(24);
  crypto.getRandomValues(bytes);
  const body = Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
  return `pl_demo_${body}`;
}

/**
 * The end of the conversion journey, built honestly: the form runs entirely in
 * the browser, submits nothing, stores nothing, and never asks for a password.
 */
export function ApiKeyPanel() {
  const [workspace, setWorkspace] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);

  const workspaceSlug =
    workspace.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
    "my-workspace";

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-graphite">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <p className="label">Create your API key</p>
        <Badge tone="warn">Prototype</Badge>
      </div>

      {apiKey === null ? (
        <form
          className="flex flex-col gap-5 p-5 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setApiKey(generateDemoKey());
          }}
        >
          <label className="flex flex-col gap-1.5">
            <span className="label">Workspace name</span>
            <input
              value={workspace}
              onChange={(event) => setWorkspace(event.target.value)}
              placeholder="Support agent team"
              autoComplete="off"
              className="w-full rounded-md border border-line bg-surface-2 px-3 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-lime focus:outline-none"
            />
            <span className="font-mono text-mono-xs text-fg-subtle">
              workspace id · {workspaceSlug}
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="label">Work email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              autoComplete="off"
              className="w-full rounded-md border border-line bg-surface-2 px-3 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-lime focus:outline-none"
            />
            <span className="font-mono text-mono-xs text-fg-subtle">
              Leave it blank — nothing is transmitted either way
            </span>
          </label>

          <div className="rounded-lg border border-violet/30 bg-violet-deep/40 px-4 py-3">
            <p className="font-mono text-mono-xs text-violet">◆ How this form behaves</p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
              {brand.name} is a design concept. This form runs entirely in your browser: it submits
              to no server, stores nothing, and never asks for a password. The key it produces is a
              random string generated on this page so you can see what the real flow would feel
              like.
            </p>
          </div>

          <Button type="submit" size="lg">
            Generate a demo key
          </Button>

          <p className="font-mono text-mono-xs text-fg-subtle">
            A real Sandbox workspace would include 1,000 evaluation runs per month, no card
            required.
          </p>
        </form>
      ) : (
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div>
            <p className="label">Your demo key</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              In the real product this appears exactly once. Here it is a random string with no
              access to anything.
            </p>
          </div>

          <CodeBlock
            snippets={[
              {
                label: "terminal",
                filename: `workspace: ${workspaceSlug}`,
                code: `export ${brand.envVar}="${apiKey}"`,
              },
            ]}
          />

          <div>
            <p className="label mb-3">Next</p>
            <ol className="flex flex-col gap-2.5">
              {[
                "Install the SDK for your language",
                "Point a suite at the function that produces your response",
                "Run the suite and read the first failure",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <span className="font-mono text-mono-xs text-lime">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.quickstart}>
              Start the quickstart
              <ArrowRight />
            </ButtonLink>
            <Button variant="secondary" onClick={() => setApiKey(null)}>
              Start over
            </Button>
          </div>
        </div>
      )}

      <p className="border-t border-line bg-surface px-4 py-2.5 font-mono text-mono-xs text-fg-subtle">
        No account is created · nothing is sent or stored
      </p>
    </div>
  );
}
