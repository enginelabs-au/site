import {
  Children,
  Fragment,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/**
 * SentencePara — drop-in replacement for `<p>` that puts each sentence on its
 * own visual line.
 *
 * Walks the `children` once at the top level; for every plain text node it
 * splits on sentence-ending punctuation followed by whitespace, keeping all
 * non-text descendants (links, <strong>, <em>, etc.) inside the surrounding
 * sentence. Each resulting sentence is wrapped in `<span className="block">`
 * so the prose still parses as a single paragraph for the screen reader and
 * for JSON-LD/text extraction, but renders as a stack of sentences.
 *
 * The text content is identical to what was passed in — only the line breaks
 * change.
 */

const ABBREVIATIONS = new Set([
  "e.g",
  "i.e",
  "etc",
  "vs",
  "Mr",
  "Mrs",
  "Ms",
  "Dr",
  "Prof",
  "Inc",
  "Co",
  "Ltd",
  "Pty",
  "St",
  "No",
]);

/** Should we treat the period at index `i` of `text` as a sentence boundary? */
function isHardBoundary(text: string, i: number): boolean {
  const ch = text[i];
  if (ch !== "." && ch !== "!" && ch !== "?") return false;
  const next = text[i + 1];
  if (!next || !/\s/.test(next)) return false;

  if (ch === ".") {
    if (text[i - 1] === ".") return false;
    if (text[i + 2] === ".") return false;
    if (text[i - 1] === "…") return false;
    if (/\d/.test(text[i - 1] ?? "") && /\d/.test(text[i + 2] ?? "")) {
      return false;
    }
    const tail = text.slice(0, i);
    const lastWordMatch = /(\S+)$/.exec(tail);
    const lastWord = lastWordMatch ? lastWordMatch[1] : "";
    if (ABBREVIATIONS.has(lastWord)) return false;
    if (lastWord && /^[A-Z]\.[A-Z]?$/.test(lastWord + ".")) {
      return false;
    }
  }
  return true;
}

/**
 * Split a single text node into sentence segments. The trailing whitespace
 * after a boundary is appended to the closed sentence so the next segment
 * begins cleanly with the next sentence.
 */
function splitTextIntoSentences(text: string): string[] {
  if (!text) return [];
  const out: string[] = [];
  let buf = "";
  for (let i = 0; i < text.length; i++) {
    buf += text[i];
    if (!isHardBoundary(text, i)) continue;
    let j = i + 1;
    while (j < text.length && /\s/.test(text[j]) && text[j] !== "\n") {
      buf += text[j];
      j++;
    }
    out.push(buf);
    buf = "";
    i = j - 1;
  }
  if (buf) out.push(buf);
  return out;
}

type SentenceGroup = ReactNode[];

type FlatItem =
  | { kind: "text"; value: string }
  | { kind: "atom"; node: ReactNode };

function flattenChildren(children: ReactNode): FlatItem[] {
  const items: FlatItem[] = [];
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (typeof child === "string" || typeof child === "number") {
      items.push({ kind: "text", value: String(child) });
      return;
    }
    items.push({ kind: "atom", node: child });
  });
  // Merge adjacent text items so sentence boundaries can be detected across
  // JSX whitespace expressions (e.g. `text{" "}<Link/> text`).
  const merged: FlatItem[] = [];
  for (const it of items) {
    const prev = merged[merged.length - 1];
    if (it.kind === "text" && prev && prev.kind === "text") {
      prev.value += it.value;
    } else {
      merged.push(it);
    }
  }
  return merged;
}

function buildSentences(children: ReactNode): SentenceGroup[] {
  const groups: SentenceGroup[] = [];
  let current: ReactNode[] = [];
  const flush = () => {
    if (current.length) {
      groups.push(current);
      current = [];
    }
  };

  const items = flattenChildren(children);
  items.forEach((item, idx) => {
    if (item.kind === "atom") {
      current.push(item.node);
      return;
    }
    const parts = splitTextIntoSentences(item.value);
    if (parts.length === 0) return;
    parts.forEach((part, partIdx) => {
      if (partIdx > 0) flush();
      if (part) current.push(<Fragment key={`t${idx}-${partIdx}`}>{part}</Fragment>);
    });
  });
  flush();
  return groups;
}

export type SentenceParaProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * For paragraphs with more than two sentences we add extra vertical breathing
 * room between sentence-blocks so the text reads like grouped beats rather
 * than one tight column.
 */
const MULTI_SENTENCE_SPACING = "[&>span+span]:mt-3";

export default function SentencePara({
  children,
  className,
  ...rest
}: SentenceParaProps) {
  const sentences = buildSentences(children);
  if (sentences.length === 0) {
    return <p className={className} {...rest} />;
  }
  if (sentences.length === 1) {
    return (
      <p className={className} {...rest}>
        {sentences[0]}
      </p>
    );
  }
  const spacingClass = sentences.length > 2 ? MULTI_SENTENCE_SPACING : "";
  const composedClassName = [className, spacingClass]
    .filter(Boolean)
    .join(" ");
  return (
    <p className={composedClassName || undefined} {...rest}>
      {sentences.map((sentence, i) => {
        const fragment =
          sentence.length === 1 ? (
            sentence[0]
          ) : (
            <Fragment key={`s${i}`}>{sentence}</Fragment>
          );
        return (
          <span key={i} className="block">
            {fragment}
          </span>
        );
      })}
    </p>
  );
}
