"use client";

import { motion } from "framer-motion";

export default function ServiceCTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-forest/90" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl font-bold text-white mb-12 leading-tight"
        >
          Ready to Begin Your Transformation?
        </motion.h2>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 60px rgba(123, 168, 136, 0.8)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-10 py-5 bg-sage text-white text-xl font-bold rounded-full shadow-2xl glow-sage hover:bg-sage/90 transition-all"
        >
          Book Your Free Screening
        </motion.button>
      </div>
    </section>
  );
}
