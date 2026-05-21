import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Dark radial backdrop matching `/public/ascii-brain.html`. */
export const ASCII_BRAIN_SECTION_BG =
  "radial-gradient(circle at 50% 45%, rgba(18,30,42,0.50) 0%, rgba(3,6,9,1) 74%), #030609";

const BRAIN_MARGIN_SRC = "/ascii-brain.html?embed=margin";

/** Full-bleed dark backdrop — always paints, independent of iframes. */
function ConsoleSectionBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-[#030609]"
      style={{ background: ASCII_BRAIN_SECTION_BG }}
    />
  );
}

/**
 * One brain in the left margin, one in the right margin.
 * Centre stays clear for the chat widget.
 */
export function ConsoleBrainMargins() {
  const columnClass =
    "pointer-events-auto absolute inset-y-0 z-[1] hidden w-[max(0px,calc(50%-19rem))] lg:block";

  return (
    <>
      <div className={`${columnClass} left-0 pl-2 pr-3 sm:pl-4 sm:pr-5`}>
        <iframe
          src={BRAIN_MARGIN_SRC}
          title="Ambient ASCII AI brain animation — left"
          aria-hidden="true"
          tabIndex={-1}
          loading="lazy"
          className="h-full w-full border-0 bg-[#030609]"
        />
      </div>
      <div className={`${columnClass} right-0 pl-3 pr-2 sm:pl-5 sm:pr-4`}>
        <iframe
          src={BRAIN_MARGIN_SRC}
          title="Ambient ASCII AI brain animation — right"
          aria-hidden="true"
          tabIndex={-1}
          loading="lazy"
          className="h-full w-full border-0 bg-[#030609]"
        />
      </div>
    </>
  );
}

/**
 * AsciiBrainBackground — renders the verbatim ASCII AI brain animation from
 * /public/ascii-brain.html as a background iframe (single full-width copy).
 */
export default function AsciiBrainBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <iframe
      src={BRAIN_MARGIN_SRC}
      title="Ambient ASCII AI brain animation"
      aria-hidden="true"
      tabIndex={-1}
      loading="lazy"
      className={`absolute inset-0 h-full w-full border-0 bg-[#030609] ${className}`.trim()}
    />
  );
}

/** Shared Control Centre console band (homepage + /control-centre). */
export function ControlConsoleSection({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section"> & { children: ReactNode }) {
  return (
    <section
      className={`control-console-section border-b border-section-brief-border bg-[#030609] py-16 text-section-brief-fg md:py-28 ${className}`.trim()}
      style={{ background: ASCII_BRAIN_SECTION_BG }}
      {...props}
    >
      <ConsoleSectionBackdrop />
      <ConsoleBrainMargins />
      <div className="relative z-10 mx-auto w-full max-w-xl px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}
