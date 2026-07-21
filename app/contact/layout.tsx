import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Rewire Hypnosis | Book Your Free Screening in Cobourg",
  description:
    "Contact Rachel at Rewire Hypnosis in Cobourg, Ontario. Book your free, no-obligation screening call. Located at 257 Division Street, Cobourg, ON.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Rewire Hypnosis - Cobourg, Ontario",
    description: "Book your free screening call. 257 Division Street, Cobourg, ON.",
    type: "website",
    url: "https://rewirehypnosis.ca/contact",
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
    title: "Contact Rewire Hypnosis",
    description: "Book your free screening call in Cobourg, Ontario",
    images: ["/images/og-image.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
