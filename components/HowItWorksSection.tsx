"use client";

import { motion } from "framer-motion";
import { Phone, Lightbulb, Sparkles, Star } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Phone,
      number: "1",
      title: "Free Screening Call",
      description: "We start with a 60-minute complimentary consultation to understand your goals, discuss your specific challenges, answer any questions, and determine if our approach is right for you.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Lightbulb,
      number: "2",
      title: "Initial Sessions",
      description: "Begin your hypnosis work with 3-6 personalized sessions. We identify subconscious patterns driving your behavior, reprogram limiting beliefs, and establish new patterns aligned with your goals.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Sparkles,
      number: "3",
      title: "See Results",
      description: "Notice real, tangible changes in your thoughts, behaviors, and confidence. Many clients report positive shifts within the first few sessions, with benefits building cumulatively over time.",
      color: "bg-sage/20 text-sage"
    },
    {
      icon: Star,
      number: "4",
      title: "Lifetime Support",
      description: "Enjoy our lifetime guarantee: free reinforcement sessions forever (maximum one per month). You're never abandoned after your initial program—we're here for your ongoing success.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-16 md:py-24 bg-cream/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4"
          >
            Your Journey to Lasting Change
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-soft max-w-2xl mx-auto"
          >
            We've designed a proven process to help you achieve your goals and maintain success for life
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-sage/30" />
                )}

                <div className="bg-white rounded-xl p-8 shadow-md border-2 border-sage/10 hover:border-sage/30 transition-colors h-full">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 font-bold text-2xl`}>
                    {step.number}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-forest mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-soft text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sage/10 to-sage/5 rounded-xl p-8 md:p-12 text-center border-2 border-sage/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-forest mb-4">
            Ready to Transform Your Life?
          </h3>
          <p className="text-gray-soft text-lg mb-8 max-w-2xl mx-auto">
            Your free screening call is the first step toward lasting change. No obligation, no pressure—just an honest conversation about your goals and how we can help.
          </p>
          <button
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-sage text-white rounded-full font-semibold text-lg hover:bg-sage/90 transition-colors shadow-lg"
          >
            Book Your Free Screening Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
