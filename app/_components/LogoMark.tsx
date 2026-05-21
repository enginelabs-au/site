import Image from "next/image";

/**
 * Engine Labs tree mark — splash / title section only.
 *
 * Source: `/public/logo.png` (Cam's filled mark; black ground keyed out via
 * `scripts/key-logo-black-bg.mjs` when needed).
 *
 * Light mode: navy mark on paper. Dark mode: `.dark .logo-mark` inverts to cream.
 *
 * `alt` defaults to "Engine Labs logo" so the mark has a descriptive label
 * for accessibility and image search. Pass `alt=""` for purely decorative
 * placements where the wordmark already sits beside the mark.
 */
export default function LogoMark({
  className,
  priority = false,
  alt = "Engine Labs logo",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={620}
      height={654}
      priority={priority}
      unoptimized
      sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 500px"
      className={`logo-mark block h-auto w-auto max-w-full object-contain object-center select-none ${className ?? ""}`}
    />
  );
}
