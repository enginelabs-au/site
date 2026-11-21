import Script from "next/script";

const ANYTRACK_SRC = "https://assets.anytrack.io/P8J98MXtF7tJ.js";

/** AnyTrack — loads on every page. Queue first, then the tag. */
export default function AnyTrack() {
  return (
    <>
      <Script id="anytrack-queue" strategy="beforeInteractive">
        {`window.AnyTrack=window.AnyTrack||function(){(window.AnyTrack.q=window.AnyTrack.q||[]).push(arguments)};`}
      </Script>
      <Script src={ANYTRACK_SRC} strategy="afterInteractive" />
    </>
  );
}
