export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "HealthAndBeautyBusiness"],
    "@id": "https://rewirehypnosis.ca/#business",
    name: "Rewire Hypnosis",
    description:
      "Certified clinical hypnotist providing evidence-based hypnosis services for weight loss, smoking cessation, stress management, and emotional wellness in Cobourg, Ontario.",
    url: "https://rewirehypnosis.ca",
    founder: {
      "@type": "Person",
      name: "Rachel",
      jobTitle: "Certified Clinical Hypnotist",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "257 Division Street",
      addressLocality: "Cobourg",
      addressRegion: "ON",
      postalCode: "K9A 3P9",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.9605405",
      longitude: "-78.1660849",
    },
    hasMap: "https://www.google.com/maps?cid=3590777333168919288",
    priceRange: "$$",
    image: "https://rewirehypnosis.ca/images/rachel-headshot-optimized.webp",
    logo: {
      "@type": "ImageObject",
      url: "https://rewirehypnosis.ca/images/logo-navbar.webp",
      width: 360,
      height: 144,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-905-885-7335",
      contactType: "Customer Service",
      areaServed: ["CA"],
      availableLanguage: ["en"],
    },
    areaServed: [
      { "@type": "City", name: "Port Hope", "@id": "https://en.wikipedia.org/wiki/Port_Hope,_Ontario" },
      { "@type": "City", name: "Cobourg", "@id": "https://en.wikipedia.org/wiki/Cobourg,_Ontario" },
      { "@type": "City", name: "Peterborough", "@id": "https://en.wikipedia.org/wiki/Peterborough,_Ontario" },
      { "@type": "City", name: "Oshawa", "@id": "https://en.wikipedia.org/wiki/Oshawa,_Ontario" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "9",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Clinical Hypnosis Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Weight Loss Hypnosis",
            description:
              "Evidence-based hypnosis to rewire your relationship with food and achieve sustainable weight loss.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smoking Cessation Hypnosis",
            description: "Break free from smoking with proven clinical hypnosis techniques.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stress Management Hypnosis",
            description:
              "Develop calm focus and emotional resilience through hypnosis.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
