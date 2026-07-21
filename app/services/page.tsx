"use client";

import { useEffect } from "react";
import { services } from "@/lib/services";
import Link from "next/link";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Services() {
  useEffect(() => {
    // Scroll to service on load if hash present
    const hash = window.location.hash.slice(1); // Remove #
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl font-bold text-forest mb-4 text-center">Our Services</h1>
        <p className="text-gray-soft text-lg text-center max-w-2xl mx-auto mb-16">
          Clinical hypnosis tailored to your specific goals and challenges.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {services.map((service) => (
            <div id={service.id} key={service.id} className="relative scroll-mt-28">
              {/* Offset Border Frame (Background Layer) */}
              <div className="absolute -inset-3 bg-sage/20 rounded-xl transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4" />

              {/* Card Content (Front Layer) */}
              <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all z-10">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-heading text-3xl font-bold text-forest">{service.title}</h2>
                  {service.popular && (
                    <span className="px-3 py-1 bg-sage text-white text-xs font-semibold rounded-full">Most Popular</span>
                  )}
                </div>
                <p className="text-gray-soft text-lg mb-4">{service.description}</p>
                <p className="text-charcoal leading-relaxed mb-6">{service.details}</p>
                {['weight-loss', 'smoking-cessation', 'stress-reduction', 'fears', 'confidence', 'sports-performance', 'pain-management', 'sleep-issues', 'habit-breaking'].includes(service.id) ? (
                  <Link
                    href={`/services/${service.id === 'stress-reduction' ? 'stress-management' : service.id}`}
                    className="inline-flex items-center px-6 py-2 text-sage font-semibold hover:gap-2 transition-all"
                  >
                    {service.id === 'weight-loss' && 'Start your weight loss journey'}
                    {service.id === 'smoking-cessation' && 'Quit smoking for good'}
                    {service.id === 'stress-reduction' && 'Reduce stress naturally'}
                    {service.id === 'fears' && 'Overcome your fears'}
                    {service.id === 'confidence' && 'Build lasting confidence'}
                    {service.id === 'sports-performance' && 'Boost athletic performance'}
                    {service.id === 'pain-management' && 'Manage chronic pain'}
                    {service.id === 'sleep-issues' && 'Sleep better tonight'}
                    {service.id === 'habit-breaking' && 'Break free from habits'}
                    <span className="ml-2">→</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      // Scroll to contact form
                      const element = document.getElementById("contact-form");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center px-6 py-2 text-sage font-semibold hover:gap-2 transition-all"
                  >
                    Get Started <span className="ml-2">→</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <TestimonialCarousel />

        <div className="bg-forest text-white rounded-xl p-12 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/70 mb-6">Book your free, no-obligation screening call with Rachel today.</p>
          <Link href="/" onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
          }} className="inline-block px-8 py-3 bg-sage text-white rounded-full font-semibold hover:bg-sage/90 transition-colors">
            Book Free Screening
          </Link>
        </div>
      </div>
    </div>
  );
}
