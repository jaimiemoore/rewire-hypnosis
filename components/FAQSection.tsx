"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is clinical hypnosis and how does it work?",
    answer: "Clinical hypnosis is a focused, relaxed state of awareness that allows you to access the part of your mind where habits, emotional patterns, and automatic responses are stored. You're not asleep or out of control, you're simply more receptive and inwardly focused.\n\n\nIn this state, we work directly with the subconscious mind to \"rewire\" outdated beliefs, reduce stress responses, and create new, supportive patterns.  90-95% of our behaviours are driven by subconscious programming.  A simple example is that you are breathing right now aren't you? And blinking your eyes? You are not consciously saying to yourself \"I must take another breath now\" \"I must blink now\", they are automatic responses governed by your subconscious mind that simply just happen without your conscious awareness.\n\n\nDuring hypnosis, you remain aware and in control the entire time. All hypnosis is self hypnosis, guided by the hypnotist, but led by you."
  },
  {
    question: "Is hypnosis safe?",
    answer: "Yes. Hypnosis is 100% safe. In fact, one hour of hypnosis offers the same effects as four hours of deep sleep."
  },
  {
    question: "What can hypnosis help me with?",
    answer: "Rewire Hypnosis specializes in:\n\n-Weight loss\n\n-Smoking cessation \n\n-Stress management.   \n\n-Pain management\n\n-Sleep improvement\n\n-Building confidence and self trust \n\n-Enhancing athletic or academic performance\n\n-Releasing fears such as  public speaking, heights, flying."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-soft">
            Everything you need to know about clinical hypnosis and how we can help you
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-sage/20 rounded-lg overflow-hidden hover:border-sage/40 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-cream/30 transition-colors"
              >
                <h3 className="font-semibold text-lg text-forest pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-sage flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-cream/20 border-t border-sage/10">
                      <p className="text-gray-soft leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-soft mb-4">
            Still have questions? We're here to help.
          </p>
          <button
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage/90 transition-colors"
          >
            Book Your Free Screening
          </button>
        </div>
      </div>

      {/* FAQPage Schema */}
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
