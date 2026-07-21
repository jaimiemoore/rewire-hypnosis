"use client";

import { motion } from "framer-motion";

export default function TrustBar() {
  const stats = [
    { value: "100%", label: "Safe" },
    { value: "✓", label: "Certified & Insured" },
    { value: "FREE", label: "Screening" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="bg-white border-t border-b border-sage/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="py-4"
            >
              <p className="text-4xl md:text-5xl font-bold text-forest mb-2">
                {stat.value}
              </p>
              <p className="text-sage font-semibold text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
