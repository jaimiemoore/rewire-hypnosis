"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Headshot with offset border */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Sage offset border */}
            <div className="absolute -inset-4 bg-sage rounded-lg transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />

            {/* Image container */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/rachel-headshot-optimized.webp"
                alt="Rachel, Certified Clinical Hypnotist specializing in weight loss and smoking cessation in Cobourg, Ontario"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Main heading */}
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-forest">
              About Rewire Hypnosis
            </h1>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                Most people don't come to hypnosis as their first option.
              </p>
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                They come after trying to force change using discipline, motivation, or positive thinking, only to find themselves repeating the same patterns again. Over time this can feel frustrating, confusing, and sometimes hopeless.
              </p>
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                At Rewire Hypnosis, we understand that lasting change rarely happens at the level of willpower alone.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                Human behaviour is largely driven by unconscious associations learned through experience. Habits, emotional reactions, overhwhelm, cravings, avoidance, procrastination - these responses were learned by the brain for a reason, even if they are no longer helpful. When change efforts only target conscious effort, the mind naturally returns to familiar programming.
              </p>
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                Rewire Hypnosis works at the level where patterns actually live: the unconscious mind.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                As a practice led by a Certified Consulting Hypnotist and Neurolinguistic Programming (NLP) Practitioner, and a member of the Master Hypnotist Society, Rewire Hypnosis helps individuals and organizations understand why behaviours happen and how to update them safely and effectively. Using evidence-informed hypnotic and NLP techniques, we identify the underlying mental associations driving unwanted thoughts, habits, and reactions, and replace them with responses aligned with the life you want now.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                Clients often describe the experience as relief and excitement. Finally responding instead of reacting, deciding instead of overthinking, and moving forward without the constant internal resistance that kept them stuck before.
              </p>
              <p className="text-base md:text-lg text-gray-soft leading-relaxed">
                Rewire Hypnosis helps you take back control by changing the patterns that were controlling you.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(123, 168, 136, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 px-8 py-4 bg-sage text-white font-semibold rounded-full hover:bg-sage/90 transition-colors inline-block"
            >
              Book Your Free Screening
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
