//import Insurance from "./home/insurance/page";
import AgencyModern from "./home/agency-modern/page";

export const metadata = {
  metadataBase: new URL('https://getclaims.in'),
  title: "GetClaims — Resolve Your Insurance Claim",
  description: "GetClaims helps resolve insurance claim rejections, delays, and disputes. Free consultation. No win, no fee.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GetClaims — Resolve Your Insurance Claim",
    description: "GetClaims helps resolve insurance claim rejections, delays, and disputes. Free consultation. No win, no fee.",
    url: "https://getclaims.in",
    siteName: "GetClaims",
    type: "website",
    images: [
      {
        url: "https://getclaims.in/images/assets/og.jpg",
        width: 1731,
        height: 909,
        alt: "GetClaims — Insurance Claims Not Settled? We Can Help.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetClaims — Resolve Your Insurance Claim",
    description: "GetClaims helps resolve insurance claim rejections, delays, and disputes. Free consultation. No win, no fee.",
    images: ["https://getclaims.in/images/assets/twitter.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GetClaims",
  url: "https://getclaims.in",
  logo: "https://getclaims.in/favicon.svg",
  description: "GetClaims helps resolve insurance claim rejections, delays, and disputes. Free consultation. No win, no fee.",
};

const MainRoot = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgencyModern />
    </>
  );
};

export default MainRoot;
