"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Weight, Cigarette, Zap, Heart, Zap as Brain, Dumbbell, AlertCircle, Moon, RotateCw, Users } from "lucide-react";
import { services as servicesData } from "@/lib/services";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "weight-loss": Weight,
  "smoking-cessation": Cigarette,
  "stress-reduction": Zap,
  "fears": Heart,
  "confidence": Brain,
  "sports-performance": Dumbbell,
  "pain-management": AlertCircle,
  "sleep-issues": Moon,
  "habit-breaking": RotateCw,
  "corporate": Users,
};

export default function Services() {
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
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <motion.p variants={itemVariants} className="text-sage font-semibold tracking-widest uppercase text-sm mb-4">
            Services
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-heading text-5xl md:text-6xl font-bold text-forest text-glow">
            Real Change Starts Here
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => {
            const Icon = iconMap[service.id];

            // Services with dedicated pages (excluding corporate)
            const hasPage = [
              'weight-loss',
              'smoking-cessation',
              'stress-reduction',
              'fears',
              'confidence',
              'sports-performance',
              'pain-management',
              'sleep-issues',
              'habit-breaking'
            ].includes(service.id);

            // Get href for services with pages
            const getHref = () => {
              if (service.id === 'weight-loss') return '/services/weight-loss';
              if (service.id === 'smoking-cessation') return '/services/smoking-cessation';
              if (service.id === 'stress-reduction') return '/services/stress-management';
              if (service.id === 'fears') return '/services/fears';
              if (service.id === 'confidence') return '/services/confidence';
              if (service.id === 'sports-performance') return '/services/sports-performance';
              if (service.id === 'pain-management') return '/services/pain-management';
              if (service.id === 'sleep-issues') return '/services/sleep-issues';
              if (service.id === 'habit-breaking') return '/services/habit-breaking';
              if (service.id === 'corporate') return 'https://www.businessculturesolution.com/';
              return '#';
            };

            const cardContent = (
              <motion.div
                variants={itemVariants}
                className={`relative bg-white rounded-xl border-2 border-sage/30 shadow-sm hover:shadow-xl transition-all overflow-hidden group ${hasPage ? 'cursor-pointer' : ''}`}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 bg-sage text-white text-xs font-semibold rounded-full glow-sage">
                      ⭐ Popular
                    </span>
                  </div>
                )}

                {/* Main Content */}
                <div className="relative p-8 z-10">
                  {/* Icon with background circle */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 group-hover:bg-sage/20 group-hover:glow-sage transition-all mb-4">
                    {Icon && <Icon className="w-8 h-8 text-sage" />}
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-forest mb-4">{service.title}</h3>
                  <p className="text-gray-soft text-sm">{service.description}</p>
                </div>

                {/* Hover Overlay - Description */}
                <motion.div
                  className="absolute inset-0 bg-sage/95 text-white p-8 flex flex-col justify-center rounded-xl pointer-events-none"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-base leading-relaxed">{service.details}</p>
                  {hasPage && (
                    <p className="mt-4 text-white font-semibold">
                      {service.id === 'weight-loss' && 'Learn about weight loss hypnosis →'}
                      {service.id === 'smoking-cessation' && 'Discover how to quit smoking →'}
                      {service.id === 'stress-reduction' && 'Explore stress management solutions →'}
                      {service.id === 'fears' && 'Overcome your fears with hypnosis →'}
                      {service.id === 'confidence' && 'Build confidence through hypnosis →'}
                      {service.id === 'sports-performance' && 'Enhance athletic performance →'}
                      {service.id === 'pain-management' && 'Find chronic pain relief →'}
                      {service.id === 'sleep-issues' && 'Improve sleep with hypnosis →'}
                      {service.id === 'habit-breaking' && 'Break unwanted habits →'}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            );

            return hasPage ? (
              <Link
                key={service.id}
                href={getHref()}
                target={service.id === 'corporate' ? '_blank' : undefined}
                rel={service.id === 'corporate' ? 'noopener noreferrer' : undefined}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={service.id}>
                {cardContent}
              </div>
            );
          })}
        </motion.div>

        {/* Learn More Link */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center mt-12"
        >
          <Link href="/services">
            <motion.div
              className="px-8 py-4 bg-sage text-white rounded-full font-semibold glow-sage inline-block cursor-pointer"
              whileHover={{ scale: 1.08, y: -4, boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
