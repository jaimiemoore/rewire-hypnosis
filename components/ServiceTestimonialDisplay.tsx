"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  category: string;
  name: string;
  headline: string;
  quote: string | null;
  stars: number;
  image: string;
}

interface ServiceTestimonialDisplayProps {
  serviceId: string;
  title?: string;
  description?: string;
}

// Photo path mapping
const getPhotoPath = (name: string): string => {
  const photoMap: { [key: string]: string } = {
    'Sarah Grondin': 'smoking-sarah-grondin.png.png',
    'Andrew Hordyk': 'smoking-andrew-hordyk-aborisi.png.png',
    'James B': '/images/placeholder-avatar.png', // Fallback
    'Brianne Boyce': 'smoking-brianne-boyce.png.png',
    'Derrick Hexamer': '/images/placeholder-avatar.png', // Fallback
    'Melanie Towes': 'weightloss-melanie-towes.png.png',
    'Darien Martinez Torres': 'weightloss-darien-marinez-torres.png.png',
    'Kirsten Lingard': 'stress-management-kirsten-lingard.png',
    'Shirley S': 'stress-management-shirleys.png'
  };

  const filename = photoMap[name];
  if (!filename || filename.includes('placeholder')) {
    return filename || '/images/placeholder-avatar.png';
  }

  return `/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/${filename}`;
};

export default function ServiceTestimonialDisplay({
  serviceId,
  title = "Real Results From Real People",
  description = "See how clinical hypnosis has transformed lives",
}: ServiceTestimonialDisplayProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Load testimonials on mount
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const response = await fetch(
          "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-cards/rewire-testimonials-data.json"
        );
        const data = await response.json();

        // Category mapping
        const categoryMap: { [key: string]: string } = {
          'weight-loss': 'weight-loss',
          'stress-management': 'stress-management',
          'smoking-cessation': 'quit-smoking',
        };

        const targetCategory = categoryMap[serviceId];
        const filtered = data.filter((t: Testimonial) => t.category === targetCategory);
        setTestimonials(filtered);
      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    }

    loadTestimonials();
  }, [serviceId]);

  // Auto-rotation
  useEffect(() => {
    if (!autoPlay || testimonials.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundAttachment: "fixed",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 bg-forest/85" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-sage">
            {description}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <TestimonialCard
                name={testimonials[current].name}
                headline={testimonials[current].headline}
                quote={testimonials[current].quote}
                photo={getPhotoPath(testimonials[current].name)}
                stars={testimonials[current].stars}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  touchAction: "manipulation",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full transition-all backdrop-blur-sm z-10 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  touchAction: "manipulation",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full transition-all backdrop-blur-sm z-10 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                style={{
                  touchAction: "manipulation",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                className="relative p-3 cursor-pointer"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={`h-3 rounded-full transition-all ${
                    index === current
                      ? "bg-sage w-8"
                      : "bg-white/50 w-3 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://rewirehypnosis.ca/#business",
            "review": testimonials.map((t) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": t.name,
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": t.stars.toString(),
                "bestRating": "5",
              },
              "reviewBody": t.quote || t.headline,
            })),
          }),
        }}
      />
    </section>
  );
}
