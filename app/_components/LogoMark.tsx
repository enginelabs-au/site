import Image from "next/image";

/**
 * Engine Labs tree mark — splash / title section only.
 *
 * Source: `/public/logo.png` (Cam's filled mark; black ground keyed out via
 * `scripts/key-logo-black-bg.mjs` when needed).
 *
 * Light mode: navy mark on paper. Dark mode: `.dark .logo-mark` inverts to cream.
 */
export default function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={620}
      height={654}
      priority={priority}
      unoptimized
      sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 500px"
      className={`logo-mark block h-auto w-auto max-w-full object-contain object-center select-none ${className ?? ""}`}
    />
  );
}
