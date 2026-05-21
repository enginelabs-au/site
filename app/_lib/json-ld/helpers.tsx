import type { ReactNode, ReactElement } from "react";

/**
 * Single embed point for JSON-LD payloads.
 * Always renders one <script type="application/ld+json"> per call.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** URL-safe lower-kebab slug. Used for FAQ anchor ids. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Flatten a React node tree to plain text for JSON-LD answer fields.
 * Walks props.children, joins arrays, ignores null/booleans.
 */
export function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}

/** Trim + collapse whitespace introduced by JSX line breaks. */
export function normaliseAnswerText(node: ReactNode): string {
  return extractText(node).replace(/\s+/g, " ").trim();
}
