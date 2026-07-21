import { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBar from "@/components/TrustBar";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PromiseSection from "@/components/PromiseSection";
import OurPromiseSection from "@/components/OurPromiseSection";
import Services from "@/components/Services";
import PromotionalCTA from "@/components/PromotionalCTA";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Rewire Hypnosis | Transform Your Life Through Clinical Hypnosis",
  description:
    "Evidence-based clinical hypnosis for weight loss, smoking cessation, and stress management in Cobourg, Ontario. Book your free screening today.",
  openGraph: {
    title: "Rewire Hypnosis | Clinical Hypnosis in Cobourg",
    description: "Evidence-based hypnosis for weight loss, smoking cessation, and stress management. Discover the depths of your mind.",
    type: "website",
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
    images: ["/images/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <TestimonialCarousel />
      <PromiseSection />
      <OurPromiseSection />
      <Services />
      <ServiceAreaSection />
      <FAQSection />
      <PromotionalCTA />
    </>
  );
}
