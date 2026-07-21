export default function ImageSchema() {
  const testimonialImages = [
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-sarah-grondin.png.png",
      name: "Sarah Grondin - Smoking Cessation Success",
      description: "Sarah Grondin from Port Hope achieved successful smoking cessation with clinical hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-andrew-hordyk-aborisi.png.png",
      name: "Andrew Hordyk - Smoking Cessation Success",
      description: "Andrew Hordyk successfully quit smoking with evidence-based clinical hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-brianne-boyce.png.png",
      name: "Brianne Boyce - Smoking Cessation Success",
      description: "Brianne Boyce from Port Hope broke free from cigarettes with clinical hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/weightloss-melanie-towes.png.png",
      name: "Melanie Towes - Weight Loss Success",
      description: "Melanie Towes lost 20lbs in 4.5 months with weight loss hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/weightloss-darien-marinez-torres.png.png",
      name: "Darien Martinez Torres - Weight Loss Success",
      description: "Darien Martinez Torres lost 70lbs with evidence-based clinical hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/stress-management-kirsten-lingard.png",
      name: "Kirsten Lingard - Stress Management Success",
      description: "Kirsten Lingard from Port Hope achieved stress relief and confidence through clinical hypnosis",
    },
    {
      url: "https://rewirehypnosis.ca/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/stress-management-shirleys.png",
      name: "Shirley S. - Stress Management Success",
      description: "Shirley S. from Hamilton experienced natural stress relief with clinical hypnosis",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://rewirehypnosis.ca#testimonial-photos",
    name: "Rewire Hypnosis Client Success Stories - Testimonial Photos",
    description: "Gallery of client success stories from Rewire Hypnosis clinical hypnosis services",
    image: testimonialImages.map((img) => ({
      "@type": "ImageObject",
      url: img.url,
      name: img.name,
      description: img.description,
      author: {
        "@type": "Organization",
        name: "Rewire Hypnosis",
        url: "https://rewirehypnosis.ca",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
