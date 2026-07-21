import { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import ServiceTestimonialDisplay from "@/components/ServiceTestimonialDisplay";
import ServiceBenefitsSection from "@/components/ServiceBenefitsSection";
import ServiceCTASection from "@/components/ServiceCTASection";
import RelatedServices from "@/components/RelatedServices";
import { getServicePageContent } from "@/lib/servicePages";

export const metadata: Metadata = {
  title: "Stop Smoking Hypnosis Cobourg | Quit Smoking with Clinical Hypnosis",
  description: "Break free from smoking with evidence-based clinical hypnosis in Cobourg, ON. High success rate, no willpower required. Book your free screening today.",

  keywords: [
    "quit smoking hypnosis port hope",
    "stop smoking hypnosis ontario",
    "smoking cessation hypnosis",
    "how to quit smoking",
    "stop smoking program",
  ],

  openGraph: {
    title: "Stop Smoking Hypnosis | Rewire Hypnosis Cobourg",
    description: "Break free from smoking with evidence-based clinical hypnosis. High success rate in Cobourg.",
    type: "website",
    url: "https://rewirehypnosis.ca/services/smoking-cessation",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Stop Smoking Hypnosis - Rewire Hypnosis Cobourg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Stop Smoking Hypnosis | Rewire Hypnosis",
    description: "Break free from smoking with clinical hypnosis.",
    images: ["/images/hero.png"],
  },

  alternates: {
    canonical: "https://rewirehypnosis.ca/services/smoking-cessation",
  },
};

export default function SmokingCessationPage() {
  const pageData = getServicePageContent("smoking-cessation");

  if (!pageData) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <ServiceHero
        title={pageData.title}
        headline={pageData.hero.headline}
        subheadline={pageData.hero.subheadline}
      />

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-8">
            {pageData.introduction.title}
          </h2>
          <div className="space-y-6">
            {pageData.introduction.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-soft leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <ServiceTestimonialDisplay
        serviceId="smoking-cessation"
        title="Real Results From Real People"
        description="See how clinical hypnosis has helped people break free from smoking"
      />

      {/* Benefits Section */}
      <ServiceBenefitsSection
        title={pageData.benefits.title}
        benefits={pageData.benefits.items}
      />

      {/* Related Services */}
      <RelatedServices serviceId={pageData.id} />

      {/* Final CTA Section */}
      <ServiceCTASection />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": pageData.schema.serviceType,
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://rewirehypnosis.ca/#business",
            },
            "areaServed": pageData.schema.areaServed.map((area) => ({
              "@type": "City",
              "name": area,
            })),
            "description": pageData.metaDescription,
            "name": pageData.title,
            "image": "https://rewirehypnosis.ca/images/hero.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
            },
          }),
        }}
      />
    </>
  );
}
