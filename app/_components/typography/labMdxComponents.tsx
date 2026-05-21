import type { HTMLAttributes } from "react";
import SentencePara from "./SentencePara";

/**
 * MDX component overrides for `/lab/[slug]` posts. Each `<p>` in the long-
 * form post body is rendered with sentence-per-line layout. Lab body prose
 * does NOT receive the bionic treatment — bionic is reserved for the engine
 * spec bands.
 */
export const labMdxComponents = {
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <SentencePara {...props} />
  ),
};
