"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Changed my life!",
    author: "Sarah M.",
    rating: 5,
  },
  {
    id: 2,
    text: "Finally quit smoking",
    author: "Jennifer L.",
    rating: 5,
  },
  {
    id: 3,
    text: "So much calmer now",
    author: "Michael T.",
    rating: 5,
  },
  {
    id: 4,
    text: "Incredible results",
    author: "David K.",
    rating: 5,
  },
];

export default function MiniTestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Show 3 items at a time
  const getVisibleItems = () => {
    return [current, (current + 1) % testimonials.length, (current + 2) % testimonials.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="my-8"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Mini carousel grid - 3 visible items */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <AnimatePresence mode="wait">
          {getVisibleItems().map((idx, position) => (
            <motion.div
              key={`${testimonials[idx].id}-${current}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-sage/20 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-sage text-sage" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs md:text-sm text-forest font-medium mb-2 line-clamp-2">
                "{testimonials[idx].text}"
              </p>

              {/* Author */}
              <p className="text-xs text-sage font-semibold">{testimonials[idx].author}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrent(i);
              setAutoPlay(false);
            }}
            style={{
              touchAction: "manipulation",
              WebkitUserSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
            className="relative p-2.5 cursor-pointer"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-sage" : "bg-sage/30"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
