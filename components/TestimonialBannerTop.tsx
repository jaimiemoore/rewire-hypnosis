"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialBannerTop() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const paginate = (direction: number) => {
    setCurrent((prev) => (prev + direction + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const currentTestimonial = testimonials[current];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="w-full"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto px-4 py-4 md:py-6 rounded-2xl bg-white/60 backdrop-blur-md border border-sage/20 shadow-lg"
        style={{
          background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(212, 229, 220, 0.6), rgba(86, 134, 115, 0.3), rgba(212, 229, 220, 0.6)) border-box",
          borderImage: "linear-gradient(135deg, rgba(212, 229, 220, 0.6), rgba(86, 134, 115, 0.3), rgba(212, 229, 220, 0.6))",
        }}
      >
        {/* Left Arrow - Hidden on Mobile */}
        <motion.button
          onClick={() => paginate(-1)}
          className="hidden md:flex p-2 hover:bg-sage/10 rounded-full transition-colors flex-shrink-0"
          aria-label="Previous testimonial"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} className="text-sage" />
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-1.5"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-sage text-sage" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm md:text-base text-forest font-medium line-clamp-1">
                "{currentTestimonial.shortQuote || currentTestimonial.text}"
              </p>

              {/* Author */}
              <p className="text-xs md:text-sm text-sage font-semibold">
                {currentTestimonial.name}
                {currentTestimonial.location && ` • ${currentTestimonial.location}`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow - Hidden on Mobile */}
        <motion.button
          onClick={() => paginate(1)}
          className="hidden md:flex p-2 hover:bg-sage/10 rounded-full transition-colors flex-shrink-0"
          aria-label="Next testimonial"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} className="text-sage" />
        </motion.button>

        {/* Mobile: Dots only */}
        <div className="md:hidden flex gap-1.5 flex-shrink-0">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setCurrent(i);
                setAutoPlay(false);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-sage" : "bg-sage/30"
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
