import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; ignored. The reference does no scroll-reveal. */
  delay?: number;
  as?: "section" | "div" | "article" | "header" | "footer";
};

/**
 * Quiet motion contract: the design brief calls for entrance fades only,
 * never scroll-stagger or translate-on-reveal. This component is therefore a
 * plain passthrough — content renders immediately. If a single-shot opacity
 * fade is ever wanted (e.g. on the hero), it lands here and nowhere else.
 */
export default function MotionSection({
  children,
  className,
  as: Component = "section",
}: MotionSectionProps) {
  return <Component className={className}>{children}</Component>;
}
