"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurPromiseSection() {

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Image with Offset Border */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Offset Border Frame */}
            <div className="absolute -inset-4 bg-sage rounded-lg transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />

            {/* Image Container - sits in front of the border */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/our-guarantee-img.jpeg"
                alt="Rachel providing compassionate clinical hypnosis session in Cobourg, Ontario"
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
            className="space-y-6"
          >
            {/* Headline */}
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-forest">
              Our Guarantee to You
            </h2>

            {/* Guarantee Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-base text-gray-soft leading-relaxed">
                Rewire Hypnosis offers a guarantee. Success using hypnosis is dependent on many variables including the attitude, motivation, cooperation, and the attendance of scheduled sessions by the client. Even though human behaviour cannot be guaranteed, Rewire Hypnosis makes the following service guaranteed to you for the hypnosis training services.
              </p>

              <p className="text-base text-gray-soft leading-relaxed">
                Upon payment in full, there are no more charges regardless of the time duration involved for the client to attain his or her goals. People vary and so will the time needed to accomplish these specific goals.
              </p>

              <p className="text-base text-gray-soft leading-relaxed">
                After the initial session package is completed, Rewire Hypnosis will provide free reinforcement sessions at the client's request (maximum one per month) until the client is satisfied with their learning and results.
              </p>

              <p className="text-base text-gray-soft leading-relaxed">
                If you ever go back to your habit again for any reason, our services are available to you at no extra charge for as long as our doors are open for business.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 px-8 py-4 bg-sage text-white font-semibold rounded-full glow-sage inline-block"
            >
              Book Your Free Screening
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
