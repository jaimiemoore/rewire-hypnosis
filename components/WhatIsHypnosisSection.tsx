"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

export default function WhatIsHypnosisSection() {
  const benefits = [
    "Natural and safe therapeutic state",
    "You remain fully conscious and in control",
    "Backed by decades of clinical research",
    "Recognized by major medical associations",
    "Not mind control or entertainment",
    "Works with your subconscious mind patterns"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-cream/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl font-bold text-forest mb-6"
            >
              What is Clinical Hypnosis?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-soft mb-6 leading-relaxed"
            >
              Clinical hypnosis is a scientifically-validated therapeutic technique that harnesses the power of your subconscious mind to create meaningful, lasting change. Unlike the stage hypnosis you may have seen in entertainment, clinical hypnosis is a professional medical practice recognized by the American Medical Association and the Canadian Medical Association.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-soft mb-8 leading-relaxed"
            >
              During a hypnosis session, you enter a deeply relaxed state of focused awareness—similar to daydreaming or meditation. In this state, your mind becomes more receptive to positive suggestions, allowing us to identify and reprogram the subconscious patterns that drive unwanted behaviors, fears, and limiting beliefs. The beauty of hypnosis is that you're always in control, always aware, and can choose to accept or reject any suggestion based on your values.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              <p className="font-semibold text-forest text-lg mb-4">Key Benefits:</p>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <Check className="w-6 h-6 text-sage flex-shrink-0 mt-0.5" />
                  <span className="text-gray-soft">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-sage/20"
            >
              <p className="text-gray-soft mb-4">
                Ready to experience the power of clinical hypnosis for yourself?
              </p>
              <Link
                href="/services"
                className="inline-flex items-center text-sage font-semibold hover:text-sage/80 transition-colors"
              >
                Explore our services →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-sage"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-forest text-lg mb-3">How It Works</h3>
                <p className="text-gray-soft mb-4">
                  Your mind has two levels of awareness: conscious and subconscious. The conscious mind is where logic and analysis happen. The subconscious mind stores memories, habits, emotions, and automatic patterns.
                </p>
                <p className="text-gray-soft">
                  Most of our behaviors—both helpful and limiting—are driven by subconscious patterns formed over time. Hypnosis allows us to access this deeper level and reprogram these patterns, creating lasting behavioral change at the root level.
                </p>
              </div>

              <div className="bg-sage/10 rounded-lg p-6">
                <h4 className="font-semibold text-forest mb-3">A Natural State</h4>
                <p className="text-sm text-gray-soft">
                  Hypnosis is a natural state you experience regularly—when you're absorbed in a book, focused on a task, or drifting off to sleep. We simply guide you into this state intentionally and use it therapeutically to support your goals.
                </p>
              </div>

              <div className="bg-cream rounded-lg p-6">
                <h4 className="font-semibold text-forest mb-3">Evidence-Based & Safe</h4>
                <p className="text-sm text-gray-soft">
                  Decades of clinical research demonstrate hypnosis's effectiveness for a wide range of issues. When conducted by a certified clinical hypnotist, hypnosis is completely safe with no negative side effects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
