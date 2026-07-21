"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Users } from "lucide-react";

export default function MeetRachelSection() {
  const credentials = [
    {
      icon: Award,
      title: "Certified Clinical Hypnotist",
      description: "Professional certification in evidence-based clinical hypnosis"
    },
    {
      icon: Heart,
      title: "Compassionate Approach",
      description: "Dedicated to creating a safe, supportive environment for transformation"
    },
    {
      icon: Users,
      title: "Extensive Experience",
      description: "Years of helping clients achieve lasting behavioral change and wellness goals"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-sage/20">
              <Image
                src="/images/rachel-headshot-optimized.webp"
                alt="Rachel - Certified Clinical Hypnotist"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-sage text-white px-6 py-3 rounded-lg shadow-lg font-semibold">
              Since 2020
            </div>
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Meet Your Hypnotist
            </h2>

            <p className="text-gray-soft text-lg leading-relaxed mb-6">
              Hi, I'm Rachel, a certified clinical hypnotist passionate about helping people like you unlock their full potential and create meaningful, lasting change. With professional training in evidence-based hypnosis, I combine clinical expertise with genuine compassion to support your transformation.
            </p>

            <p className="text-gray-soft text-lg leading-relaxed mb-8">
              My journey into clinical hypnosis began with a deep belief in the power of the mind to heal, transform, and grow. I'm committed to creating a safe, judgment-free space where you can access your subconscious resources and rewire limiting patterns. Every client's success is a testament to your own inner strength and willingness to change.
            </p>

            {/* Credentials Grid */}
            <div className="space-y-6">
              {credentials.map((credential, index) => {
                const Icon = credential.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sage/10">
                        <Icon className="h-6 w-6 text-sage" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest">{credential.title}</h3>
                      <p className="text-sm text-gray-soft">{credential.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <p className="text-gray-soft italic">
                "I'm here to support your journey to a healthier, happier, more confident version of yourself. Let's work together to rewire the patterns holding you back and unlock the potential that's already within you."
              </p>
              <p className="text-forest font-semibold mt-4">— Rachel</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link href="/about" className="text-sage font-semibold hover:text-sage/80 transition-colors">
                Learn more about Rachel's background →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
