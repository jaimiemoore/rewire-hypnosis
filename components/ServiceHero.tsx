"use client";

import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  headline: string;
  subheadline: string;
}

export default function ServiceHero({ title, headline, subheadline }: ServiceHeroProps) {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-cream to-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Service category label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sage font-semibold tracking-widest uppercase text-sm mb-6"
          >
            {title}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-5xl md:text-6xl font-bold text-forest mb-6 leading-tight"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-soft mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(123, 168, 136, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-sage text-white font-semibold rounded-full hover:bg-sage/90 transition-colors glow-sage"
            >
              Book Your Free Screening
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('section:nth-of-type(3)');
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border-2 border-sage text-sage font-semibold rounded-full hover:bg-sage/10 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>
  );
}
