import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import HashScrollHandler from "@/app/_components/HashScrollHandler";
import ScrollProgressBar, {
  SCROLL_PROGRESS_BAR_HEIGHT,
} from "@/app/_components/ScrollProgressBar";
import SiteHeader from "@/app/_components/SiteHeader";
import SiteFooter from "@/app/_components/SiteFooter";
import ThemeProvider from "@/app/_components/ThemeProvider";
import { CurrencyProvider } from "@/app/_components/CurrencyProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://enginelabs.com.au"
        : "http://localhost:3000",
  ),
  icons: {
    icon: [{ url: "/logo-favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  title: {
    default: "Engine Labs — Engineer the work, don't hire for it",
    template: "%s · Engine Labs",
  },
  description:
    "One-operator AI build studio. Eight Engines that retire admin, replies and reporting. Fixed scope, published pricing, clean handover.",
  applicationName: "Engine Labs",
  authors: [{ name: "Engine Labs" }],
  openGraph: {
    title: "Engine Labs — Engineer the work, don't hire for it",
    description:
      "One-operator AI build studio. Eight Engines that retire admin, replies and reporting. Fixed scope, published pricing, clean handover.",
    siteName: "Engine Labs",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`dark ${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <CurrencyProvider>
            <ScrollProgressBar />
            <HashScrollHandler />
            <SiteHeader barOffset={SCROLL_PROGRESS_BAR_HEIGHT} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
