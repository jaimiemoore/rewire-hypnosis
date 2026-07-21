"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Book Your Free Screening",
    description: "Schedule a no-obligation conversation to discuss your goals and how hypnosis can help you.",
  },
  {
    number: 2,
    title: "Your Personalized Program",
    description: "We'll create a tailored hypnosis program designed specifically for your needs and lifestyle.",
  },
  {
    number: 3,
    title: "Experience Lasting Change",
    description: "Through guided sessions, rewire your habits and achieve the results you've been seeking.",
  },
];

export default function HowItWorks() {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-cream via-sage/10 to-light-sage relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-5xl md:text-6xl font-bold text-forest text-center mb-16"
        >
          Your Path to Lasting Change
        </motion.h2>

        <div className="relative">
          {/* Desktop: Horizontal Line with Gradient */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-sage/20">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-transparent via-sage to-transparent glow-sage"
            ></motion.div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-sage to-sage-dark text-white flex items-center justify-center mx-auto mb-6 font-heading text-3xl font-bold shadow-lg glow-sage"
                >
                  {step.number}
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-forest mb-3">{step.title}</h3>
                <p className="text-gray-soft leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-sage text-white rounded-full font-semibold glow-sage transition-all"
            whileHover={{ y: -2, boxShadow: "0 0 30px rgba(86, 134, 115, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Free Screening
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
