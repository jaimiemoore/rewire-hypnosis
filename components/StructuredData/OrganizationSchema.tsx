export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://rewirehypnosis.ca/#organization",
    name: "Rewire Hypnosis",
    url: "https://rewirehypnosis.ca",
    logo: "https://rewirehypnosis.ca/images/logo-navbar.webp",
    description:
      "Certified clinical hypnosis practice specializing in weight loss, smoking cessation, and emotional wellness through evidence-based techniques.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "257 Division Street",
      addressLocality: "Cobourg",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
