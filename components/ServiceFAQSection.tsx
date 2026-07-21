"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ServiceFAQSectionProps {
  serviceId: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ServiceFAQSection({
  serviceId,
  faqs,
}: ServiceFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-soft max-w-2xl mx-auto">
            Get answers to common questions about hypnosis and our services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-sage/20 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 hover:bg-sage/5 transition-colors text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg text-forest pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={24} className="text-sage" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 md:py-6 bg-sage/5 border-t border-sage/10">
                      <p className="text-gray-soft leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-soft mb-6">
            Still have questions? Let's talk about what's possible for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(123, 168, 136, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-sage text-white font-semibold rounded-full hover:bg-sage/90 transition-colors glow-sage"
          >
            Book Your Free Screening Call
          </motion.button>
        </motion.div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
