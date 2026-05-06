import "./globals.css";

const BASE_URL = "https://www.mindearthconsultancy.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MindEarth Consultancy | ESG & Carbon Accounting Solutions India",
    template: "%s | MindEarth Consultancy",
  },
  description:
    "MindEarth Consultancy helps companies track GHG emissions, ESG metrics, and climate risks with data-driven insights. 300+ reports across 40+ countries.",
  keywords: [
    "ESG consulting India",
    "carbon accounting India",
    "GHG emissions tracking",
    "sustainability reports",
    "BRSR advisory",
    "climate risk advisory",
    "MindEarth Consultancy",
    "ESG reporting India",
  ],
  authors: [{ name: "MindEarth Consultancy", url: BASE_URL }],
  creator: "MindEarth Consultancy",
  publisher: "MindEarth Consultancy",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "MindEarth Consultancy",
    title: "MindEarth Consultancy | ESG & Carbon Accounting Solutions India",
    description:
      "MindEarth Consultancy helps companies track GHG emissions, ESG metrics, and climate risks with data-driven insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MindEarth Consultancy — ESG Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindEarth Consultancy | ESG & Carbon Accounting Solutions India",
    description:
      "MindEarth Consultancy helps companies track GHG emissions, ESG metrics, and climate risks with data-driven insights.",
    images: ["/og-image.jpg"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MindEarth Consultancy",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Global ESG intelligence and sustainability consulting firm based in Pune, India. Specialising in GHG emissions tracking, carbon accounting, and BRSR compliance.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@mindearth.co",
    contactType: "customer service",
    areaServed: "Worldwide",
  },
  sameAs: ["https://www.linkedin.com/company/mindearth"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://logo.clearbit.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-800 antialiased">{children}</body>
    </html>
  );
}
