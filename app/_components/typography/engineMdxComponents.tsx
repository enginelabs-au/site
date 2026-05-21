import type { HTMLAttributes } from "react";
import SentencePara from "./SentencePara";

/**
 * MDX component overrides for `/engines/[slug]` pages. The engine spec MDX
 * renders inside the alternating `EngineSpec*` bands; we want sentence-per-line
 * inside those bands so we apply this map at the MDX render site rather than
 * globally via `mdx-components.tsx`.
 *
 * - `<p>` → `SentencePara` (sentence-per-line)
 * - lists, headings, links etc. keep their default rendering.
 */
export const engineMdxComponents = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <SentencePara {...props} />
  ),
};
