"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Weight, Cigarette, Zap, Heart, Brain, Dumbbell, AlertCircle, Moon, RotateCw } from "lucide-react";

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
};

// Related services mapping - which services are related to each other
const relatedServicesMap: { [key: string]: string[] } = {
  "weight-loss": ["stress-reduction", "confidence"],
  "smoking-cessation": ["stress-reduction", "habit-breaking"],
  "stress-reduction": ["weight-loss", "sleep-issues"],
  "fears": ["confidence", "stress-reduction"],
  "confidence": ["fears", "sports-performance"],
  "sports-performance": ["confidence", "stress-reduction"],
  "pain-management": ["stress-reduction", "sleep-issues"],
  "sleep-issues": ["stress-reduction", "pain-management"],
  "habit-breaking": ["smoking-cessation", "confidence"],
};

// Service titles for display
const serviceNames: { [key: string]: string } = {
  "weight-loss": "Weight Loss Hypnosis",
  "smoking-cessation": "Stop Smoking",
  "stress-reduction": "Stress Management",
  "fears": "Overcome Your Fears",
  "confidence": "Build Self-Confidence",
  "sports-performance": "Sports Performance",
  "pain-management": "Pain Management",
  "sleep-issues": "Sleep Improvement",
  "habit-breaking": "Habit Breaking",
};

interface RelatedServicesProps {
  serviceId: string;
}

export default function RelatedServices({ serviceId }: RelatedServicesProps) {
  const relatedIds = relatedServicesMap[serviceId] || [];

  // Map slug to href
  const getHref = (id: string) => {
    if (id === 'stress-reduction') return '/services/stress-management';
    return `/services/${id}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="font-heading text-4xl md:text-5xl font-bold text-forest">
            Explore Related Services
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-soft text-lg mt-4">
            These services often complement each other for deeper transformation
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {relatedIds.map((relatedId) => {
            const Icon = iconMap[relatedId];
            const serviceName = serviceNames[relatedId];
            const href = getHref(relatedId);

            return (
              <Link key={relatedId} href={href}>
                <motion.div
                  variants={itemVariants}
                  className="relative bg-white rounded-xl border-2 border-sage/30 shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Main Content */}
                  <div className="relative p-8 z-10">
                    {/* Icon with background circle */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 group-hover:bg-sage/20 group-hover:glow-sage transition-all mb-4">
                      {Icon && <Icon className="w-8 h-8 text-sage" />}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-forest mb-2">{serviceName}</h3>
                    <p className="text-gray-soft text-sm mb-4">
                      Complement your current treatment with this related service
                    </p>
                    <p className="text-sage font-semibold text-sm">
                      Explore this service →
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-sage/95 text-white p-8 flex flex-col justify-center rounded-xl pointer-events-none"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="font-semibold mb-3">Explore our {serviceName.toLowerCase()} program in Cobourg</p>
                    <p className="text-sm leading-relaxed">
                      Often combined with {serviceNames[serviceId].toLowerCase()} for comprehensive treatment
                    </p>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
