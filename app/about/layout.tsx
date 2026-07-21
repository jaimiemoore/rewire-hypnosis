import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Rachel - Certified Clinical Hypnotist",
  description:
    "Meet Rachel, a certified clinical hypnotist in Cobourg, Ontario. Learn about our evidence-based approach to lasting change through hypnosis.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rachel - Clinical Hypnotist in Cobourg",
    description:
      "Certified clinical hypnotist helping clients achieve lasting change through evidence-based hypnosis.",
    type: "profile",
    url: "https://rewirehypnosis.ca/about",
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
    title: "About Rachel - Certified Clinical Hypnotist",
    description: "Meet Rachel, certified clinical hypnotist in Cobourg, Ontario.",
    images: ["/images/og-image.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
