"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/lib/testimonials";

interface AvatarTrustBarProps {
  testimonials: Testimonial[];
  onAvatarClick?: (testimonial: Testimonial) => void;
  selectedId?: number;
}

export default function AvatarTrustBar({
  testimonials,
  onAvatarClick,
  selectedId,
}: AvatarTrustBarProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Get initials from name (first letter of first and last name)
  const getInitials = (name: string): string => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const displayTestimonials = testimonials.slice(0, 5);
  const remainingCount = testimonials.length - displayTestimonials.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center lg:justify-start items-center gap-2"
    >
      {/* Avatar circles */}
      <div className="flex -space-x-3">
        {displayTestimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={itemVariants}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setHoveredId(testimonial.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(testimonial.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => onAvatarClick?.(testimonial)}
            className="relative"
            tabIndex={0}
            role="button"
            aria-label={`Testimonial from ${testimonial.name}`}
            aria-pressed={selectedId === testimonial.id}
          >
            <motion.div
              whileHover={{ scale: 1.2, zIndex: 10 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border-2 ${
                selectedId === testimonial.id
                  ? "bg-sage border-sage shadow-lg shadow-sage/50"
                  : "bg-forest border-sage"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  selectedId === testimonial.id ? "text-white" : "text-white"
                }`}
              >
                {getInitials(testimonial.name)}
              </span>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredId === testimonial.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 p-3 bg-white rounded-lg shadow-xl border border-sage/20 z-50 w-48 pointer-events-none"
                >
                  <p className="text-xs text-forest mb-1 font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-forest italic mb-2">
                    "{testimonial.shortQuote || testimonial.text}"
                  </p>
                  <p className="text-xs text-sage font-semibold">★★★★★</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* +X more badge */}
      {remainingCount > 0 && (
        <motion.div
          variants={itemVariants}
          className="w-12 h-12 rounded-full bg-sage/10 border-2 border-sage flex items-center justify-center"
        >
          <span className="text-xs font-bold text-sage">+{remainingCount}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
