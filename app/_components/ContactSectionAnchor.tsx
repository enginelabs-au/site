import type { ReactNode } from "react";
import { CONTACT_SCROLL_OFFSET_PX } from "@/app/_lib/scroll-to-contact";

type ContactSectionAnchorProps = {
  children: ReactNode;
  className?: string;
};

/** Wraps the contact form block; `id="send"` target for in-page links. */
export default function ContactSectionAnchor({
  children,
  className = "",
}: ContactSectionAnchorProps) {
  return (
    <div
      id="send"
      data-contact-section
      className={className}
      style={{ scrollMarginTop: CONTACT_SCROLL_OFFSET_PX }}
    >
      {children}
    </div>
  );
}
