"use client";

import { motion } from "framer-motion";

export default function PromotionalCTA() {

  const handleCTA = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: "url('/images/parallax-trees.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.5,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-forest/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Stop Self-Sabotage. Start Living.
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Your transformation begins with a simple conversation.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTA}
            className="px-8 py-4 bg-sage text-white font-semibold rounded-full glow-sage hover:shadow-2xl text-lg inline-block"
          >
            Book Your Free Screening
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
