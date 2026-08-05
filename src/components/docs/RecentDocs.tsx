"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "prooflayer:recent-docs";
const LIMIT = 4;

type Recent = { slug: string; title: string };

function read(): Recent[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Recent =>
        typeof item === "object" && item !== null && "slug" in item && "title" in item,
    );
  } catch {
    return [];
  }
}

/** Records the current article so the docs landing can show a real history. */
export function TrackRecentDoc({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    try {
      const next = [{ slug, title }, ...read().filter((item) => item.slug !== slug)].slice(0, LIMIT);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — the feature degrades to empty, nothing breaks */
    }
  }, [slug, title]);

  return null;
}

export function RecentDocs() {
  const [recent, setRecent] = useState<Recent[] | null>(null);

  useEffect(() => {
    setRecent(read());
  }, []);

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="label">Recently viewed</p>
      {recent === null ? (
        <p className="mt-3 font-mono text-mono-xs text-fg-subtle">Loading…</p>
      ) : recent.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          Nothing yet. Start with{" "}
          <Link
            href="/docs/quickstart/run-your-first-evaluation"
            className="text-lime underline-offset-4 hover:underline"
          >
            Run your first evaluation
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {recent.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/docs/${item.slug}`}
                className="text-sm text-fg-muted transition-colors hover:text-lime"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
