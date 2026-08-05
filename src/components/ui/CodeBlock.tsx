"use client";

import { Fragment, useId, useState } from "react";

import { cn } from "@/lib/cn";

export type Snippet = {
  /** Tab label, e.g. "Python" */
  label: string;
  /** Used for the aria description and the file chip */
  filename?: string;
  code: string;
};

const TOKENS =
  /(#[^\n]*|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|var|async|await|import|from|export|function|return|def|class|if|else|elif|for|while|in|new|try|except|catch|with|as|print|True|False|None|true|false|null|curl|POST|GET)\b|\b(\d+(?:\.\d+)?)\b/g;

/**
 * Deliberately small highlighter: comments, strings, keywords and numbers.
 * A full syntax engine would cost more bytes than it earns on a marketing site.
 */
function highlight(line: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKENS.lastIndex = 0;

  while ((match = TOKENS.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`${keyPrefix}-t${lastIndex}`}>{line.slice(lastIndex, match.index)}</Fragment>);
    }
    const [text, comment, string, keyword, num] = match;
    const className = comment
      ? "text-fg-subtle italic"
      : string
        ? "text-lime/85"
        : keyword
          ? "text-violet"
          : num
            ? "text-warn"
            : undefined;
    nodes.push(
      <span key={`${keyPrefix}-m${match.index}`} className={className}>
        {text}
      </span>,
    );
    lastIndex = match.index + text.length;
  }

  if (lastIndex < line.length) {
    nodes.push(<Fragment key={`${keyPrefix}-e`}>{line.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-sm border border-line-strong bg-surface-2 px-2 py-1 font-mono text-mono-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
    >
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      {copied ? "Copied" : "Copy"}
      <span className="sr-only">code to clipboard</span>
    </button>
  );
}

export function CodeBlock({
  snippets,
  className,
  caption,
  dense = false,
}: {
  snippets: Snippet[];
  className?: string;
  caption?: string;
  dense?: boolean;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = snippets[Math.min(active, snippets.length - 1)];
  const lines = current.code.replace(/\n$/, "").split("\n");

  return (
    <figure
      className={cn(
        "min-w-0 max-w-full overflow-hidden rounded-lg border border-line bg-graphite",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-2.5 py-2">
        {snippets.length > 1 ? (
          <div role="tablist" aria-label="Code language" className="flex gap-1 overflow-x-auto rail">
            {snippets.map((snippet, index) => (
              <button
                key={snippet.label}
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={index === active}
                aria-controls={`${id}-panel`}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-sm px-2.5 py-1 font-mono text-mono-xs whitespace-nowrap transition-colors",
                  index === active
                    ? "bg-surface-3 text-lime"
                    : "text-fg-subtle hover:text-fg-muted",
                )}
              >
                {snippet.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="px-1 font-mono text-mono-xs text-fg-subtle">
            {current.filename ?? current.label}
          </p>
        )}
        <CopyButton value={current.code} />
      </div>

      {snippets.length > 1 && current.filename ? (
        <p className="border-b border-line px-4 py-1.5 font-mono text-mono-xs text-fg-subtle">
          {current.filename}
        </p>
      ) : null}

      <div
        id={`${id}-panel`}
        role={snippets.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={snippets.length > 1 ? `${id}-tab-${active}` : undefined}
        className="rail"
      >
        <pre className={cn("min-w-full p-4 font-mono text-mono-sm", dense && "p-3 text-mono-xs")}>
          <code className="block whitespace-pre">
            {lines.map((line, index) => (
              <span key={index} className="block">
                {line ? highlight(line, `${id}-${active}-${index}`) : " "}
              </span>
            ))}
          </code>
        </pre>
      </div>

      {caption ? (
        <figcaption className="border-t border-line px-4 py-2 font-mono text-mono-xs text-fg-subtle">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
