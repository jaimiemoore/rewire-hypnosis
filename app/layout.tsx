import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import LocalBusinessSchema from "@/components/StructuredData/LocalBusinessSchema";
import OrganizationSchema from "@/components/StructuredData/OrganizationSchema";
import ImageSchema from "@/components/StructuredData/ImageSchema";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://rewirehypnosis.ca"),
  title: {
    default: "Rewire Hypnosis | Weight Loss & Smoking Cessation Hypnotherapy Cobourg",
    template: "%s | Rewire Hypnosis",
  },
  description:
    "Clinical hypnotist in Cobourg, Ontario. Proven hypnosis for weight loss, smoking cessation, stress management & emotional wellness. Book your FREE screening today.",
  keywords: [
    "clinical hypnosis Cobourg",
    "hypnotherapy Ontario",
    "weight loss hypnosis",
    "stop smoking hypnosis",
    "smoking cessation",
    "stress management",
    "certified hypnotist",
    "evidence-based hypnosis",
    "Cobourg wellness",
    "Cobourg hypnosis",
    "Peterborough hypnosis",
    "Oshawa hypnosis",
  ],
  authors: [{ name: "Rachel, Clinical Hypnotist" }],
  creator: "Rewire Hypnosis",
  publisher: "Rewire Hypnosis",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rewire Hypnosis | Clinical Hypnosis in Cobourg, Ontario",
    description:
      "Evidence-based clinical hypnosis for weight loss, smoking cessation, and emotional wellness in Cobourg, Ontario.",
    type: "website",
    locale: "en_CA",
    url: "https://rewirehypnosis.ca",
    siteName: "Rewire Hypnosis",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rewire Hypnosis - Clinical Hypnosis in Cobourg, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewire Hypnosis | Clinical Hypnosis in Cobourg",
    description: "Evidence-based hypnosis for lasting change",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#568673" />
        <script async src="https://www.instagram.com/embed.js"></script>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-GMZMEJRNJS`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GMZMEJRNJS', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <LocalBusinessSchema />
        <OrganizationSchema />
        <ImageSchema />
      </head>
      <body className="font-sans antialiased bg-cream text-charcoal">
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sage focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <BreadcrumbNav />
        <main id="main-content">{children}</main>
        <ContactForm />
        <Footer />
      </body>
    </html>
  );
}
