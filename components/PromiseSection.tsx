"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, Target } from "lucide-react";

interface PromiseItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const promises: PromiseItem[] = [
  {
    icon: CheckCircle,
    title: "Evidence-Based Approach",
    description:
      "Certified, insured clinical hypnotist using proven techniques backed by research and decades of practice.",
  },
  {
    icon: Heart,
    title: "Personalized Programs",
    description:
      "Tailored sessions designed specifically for your unique goals and challenges to ensure the best outcomes.",
  },
  {
    icon: Target,
    title: "Lasting Results",
    description:
      "Real, sustainable change that transforms your life and helps you achieve your goals for the long term.",
  },
];

export default function PromiseSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {promises.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-start p-8 rounded-lg bg-white border border-sage/10 hover:border-sage/30 transition-all"
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-sage" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-forest mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-soft leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/services"
            whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-sage text-white font-semibold rounded-full glow-sage text-lg"
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
