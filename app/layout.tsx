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
import GoogleAnalytics from "@/app/_components/GoogleAnalytics";
import SiteJsonLd from "@/app/_components/SiteJsonLd";
import { getSiteUrl } from "@/app/_lib/site-url";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-favicon.png", type: "image/png", sizes: "32x32" },
    ],
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
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip bg-background text-foreground">
        <SiteJsonLd />
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
