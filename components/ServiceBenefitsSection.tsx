"use client";

import { motion } from "framer-motion";

interface ServiceBenefitsSectionProps {
  title: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
}

export default function ServiceBenefitsSection({
  title,
  benefits,
}: ServiceBenefitsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
            {title}
          </h2>
          <div className="w-16 h-1 bg-sage mx-auto" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Offset border background */}
              <div className="absolute -inset-4 bg-sage/20 rounded-lg transform translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 opacity-0 group-hover:opacity-100" />

              {/* Card content */}
              <div className="relative bg-white rounded-lg p-8 border border-sage/10 shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <h3 className="font-heading text-2xl font-bold text-forest mb-4 pt-2">
                  {benefit.title}
                </h3>

                <p className="text-gray-soft text-base leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover line */}
                <div className="mt-6 h-1 w-0 bg-sage group-hover:w-12 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
