import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Hypnosis Services in Cobourg | Weight Loss, Smoking Cessation",
  description:
    "Comprehensive clinical hypnosis services: weight loss, smoking cessation, stress management, pain management, and more. Evidence-based approach in Cobourg, ON.",
  keywords: [
    "clinical hypnosis Cobourg",
    "weight loss hypnosis",
    "smoking cessation",
    "stress management",
    "hypnotherapy Ontario",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Clinical Hypnosis Services - Rewire Hypnosis Cobourg",
    description:
      "Weight loss, smoking cessation, stress management, and more. Evidence-based clinical hypnosis in Cobourg, Ontario.",
    type: "website",
    url: "https://rewirehypnosis.ca/services",
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
    title: "Clinical Hypnosis Services - Cobourg, Ontario",
    description: "Weight loss, smoking cessation, stress management & more",
    images: ["/images/og-image.jpg"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
