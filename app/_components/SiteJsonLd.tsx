import { getSiteUrl } from "@/app/_lib/site-url";

export default function SiteJsonLd() {
  const siteUrl = getSiteUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Engine Labs",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: "hello@enginelabs.com.au",
    description:
      "One-operator AI build studio in Australia. Eight Engines for admin, replies, and reporting — fixed scope, published pricing, clean handover.",
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Engine Labs",
    url: siteUrl,
    inLanguage: "en-AU",
    publisher: {
      "@type": "Organization",
      name: "Engine Labs",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
