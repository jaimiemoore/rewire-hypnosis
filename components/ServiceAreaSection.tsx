"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Globe } from "lucide-react";

export default function ServiceAreaSection() {
  const areas = {
    primary: ["Cobourg", "Port Hope"],
    secondary: ["Newcastle", "Campbellford", "Brighton", "Colborne"],
    tertiary: ["Peterborough", "Oshawa", "Whitby", "Ajax", "Durham Region", "Greater Toronto Area"],
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4"
          >
            Serving Cobourg & Area
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-soft"
          >
            Conveniently located and accessible throughout Ontario
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* In-Person Location */}
          <motion.div
            variants={itemVariants}
            className="bg-cream/50 rounded-xl p-8 border-2 border-sage/20 hover:border-sage/40 transition-colors"
          >
            <MapPin className="w-8 h-8 text-sage mb-4" />
            <h3 className="font-semibold text-forest text-lg mb-3">In-Person Sessions</h3>
            <p className="text-gray-soft mb-4">Visit us at our Cobourg location</p>
            <p className="font-semibold text-forest mb-4">
              257 Division Street<br />
              Cobourg, ON
            </p>
            <iframe
              title="Rewire Hypnosis location — 257 Division Street, Cobourg, ON"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.9432020057634!2d-78.1660849!3d43.9605405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d5c5a4e6aab90b%3A0x31d500f5b30ed2f8!2s257%20Division%20St%2C%20Cobourg%2C%20ON%20K9A%203P9!5e0!3m2!1sen!2sca!4v1783299473147!5m2!1sen!2sca"
              width="600"
              height="450"
              className="w-full h-[240px] rounded-lg border border-sage/20"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>

          {/* Virtual Sessions */}
          <motion.div
            variants={itemVariants}
            className="bg-cream/50 rounded-xl p-8 border-2 border-sage/20 hover:border-sage/40 transition-colors"
          >
            <Globe className="w-8 h-8 text-sage mb-4" />
            <h3 className="font-semibold text-forest text-lg mb-3">Virtual Sessions</h3>
            <p className="text-gray-soft mb-4">Secure video sessions from anywhere</p>
            <p className="text-sm text-gray-soft">
              Available throughout Ontario and beyond—work with us from the comfort of your home.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={itemVariants}
            className="bg-cream/50 rounded-xl p-8 border-2 border-sage/20 hover:border-sage/40 transition-colors"
          >
            <Mail className="w-8 h-8 text-sage mb-4" />
            <h3 className="font-semibold text-forest text-lg mb-3">Get in Touch</h3>
            <p className="text-gray-soft mb-4">Questions? Ready to book?</p>
            <button
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sage font-semibold hover:text-sage/80 transition-colors"
            >
              Contact Us →
            </button>
          </motion.div>
        </motion.div>

        {/* Service Areas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Service Area */}
          <motion.div variants={itemVariants} className="bg-white border-2 border-sage/30 rounded-lg p-8">
            <h3 className="font-semibold text-forest text-lg mb-4">Service Area</h3>
            <p className="text-gray-soft mb-4">
              Northumberland County (Cobourg, Port Hope, Brighton, Trent Hills, Alnwick/Haldimand, Cramahe, and Hamilton Township), Clarington, Kawartha, Durham Region
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Northumberland County",
                "Cobourg",
                "Port Hope",
                "Brighton",
                "Trent Hills",
                "Alnwick/Haldimand",
                "Cramahe",
                "Hamilton Township",
                "Clarington",
                "Kawartha",
                "Durham Region"
              ].map((area, idx) => (
                <span key={idx} className="px-4 py-2 bg-sage text-white rounded-full text-sm font-medium">
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-soft mb-4">
            Whether you're local or out of province, we're ready to support your hypnosis journey.
          </p>
          <button
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage/90 transition-colors"
          >
            Book Your Free Screening Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
