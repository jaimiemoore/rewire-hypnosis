"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  image: string;
  headline: string;
  subheading: string;
  cta: string;
  badge?: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero-slide-1.webp",
    headline: "Lose Weight Naturally",
    subheading: "Rewire your relationship with food through evidence-based hypnosis",
    cta: "Learn More",
    // badge: "Most Popular",
    alt: "Person achieving natural weight loss through clinical hypnosis with healthy lifestyle changes in Cobourg",
  },
  {
    id: 2,
    image: "/images/hero-slide-2.webp",
    headline: "Quit Smoking for Good",
    subheading: "Break free from nicotine with proven clinical hypnosis",
    cta: "Learn More",
    alt: "Person breaking free from smoking habit through evidence-based hypnotherapy techniques",
  },
  {
    id: 3,
    image: "/images/manage-stress-mom.jpg",
    headline: "Manage your Stress",
    subheading: "Discover calm, focus, and emotional resilience",
    cta: "Learn More",
    alt: "Mother finding peace and stress relief through clinical hypnosis for emotional wellness in Cobourg",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleSwipe = (event: any, info: any) => {
    const swipe = Math.abs(info.offset.x) * info.velocity.x;
    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  const handleCTA = (slideId: number) => {
    // Map slides to service IDs
    const serviceMap: { [key: number]: string } = {
      1: "weight-loss",
      2: "smoking-cessation",
      3: "stress-reduction",
    };

    const serviceId = serviceMap[slideId];
    if (serviceId) {
      window.location.href = `/services#${serviceId}`;
    }
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-sage-light/20 to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={handleSwipe}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
            >
              {/* Background Image with Transparency */}
              <div className="absolute inset-0 opacity-65">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23f8f9f7' width='1920' height='1080'/%3E%3C/svg%3E"
                />
              </div>

              {/* Enhanced Overlay for Consistency */}
              <div className="absolute inset-0 bg-gradient-to-r from-forest/55 via-forest/40 to-forest/20" />
              <div className="absolute inset-0 bg-forest/15" />

              {/* Content */}
              <div className="relative h-full flex items-center pt-28">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                  >
                    {/* Badge */}
                    {slide.badge && (
                      <motion.div
                        initial={{ opacity: 0, x: -80, y: -30, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="inline-block mb-6"
                      >
                        <span className="px-4 py-2 bg-sage text-white text-sm font-semibold rounded-full inline-flex items-center gap-2 glow-sage">
                          ⭐ {slide.badge}
                        </span>
                      </motion.div>
                    )}

                    {/* Headline */}
                    <motion.h2
                      initial={{ opacity: 0, x: 100, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                      className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                    >
                      {slide.headline}
                    </motion.h2>

                    {/* Subheading */}
                    <motion.p
                      initial={{ opacity: 0, x: -70, y: 40 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                      className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-xl drop-shadow-md"
                    >
                      {slide.subheading}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                      dragListener={false}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                      whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCTA(slide.id)}
                      className="px-8 py-4 bg-sage text-white font-semibold rounded-full glow-sage"
                      style={{
                        touchAction: "manipulation",
                        WebkitUserSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {slide.cta}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows - Hidden on Mobile */}
      <button
        type="button"
        onClick={prevSlide}
        style={{
          touchAction: "manipulation",
          WebkitUserSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        style={{
          touchAction: "manipulation",
          WebkitUserSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            style={{
              touchAction: "manipulation",
              WebkitUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
            className="relative p-3 cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-sage w-8 glow-sage"
                  : "bg-white/50 w-3 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
