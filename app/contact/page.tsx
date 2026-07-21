"use client";

import { Metadata } from "next";

// Note: metadata must be defined at module level for Server Components
// This is a Client Component wrapper - metadata is handled in root layout

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl font-bold text-forest mb-4 text-center">Get In Touch</h1>
        <p className="text-gray-soft text-lg text-center mb-12">
          Ready to start your journey to lasting change? Reach out to Rachel today.
        </p>

        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-12">
          <h2 className="font-heading text-3xl font-bold text-forest mb-8">Contact Information</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-soft text-lg">257 Division Street, Cobourg, ON</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Hours</h3>
              <p className="text-gray-soft text-lg">By Appointment</p>
            </div>
          </div>

          <iframe
            title="Rewire Hypnosis location — 257 Division Street, Cobourg, ON"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.9432020057634!2d-78.1660849!3d43.9605405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d5c5a4e6aab90b%3A0x31d500f5b30ed2f8!2s257%20Division%20St%2C%20Cobourg%2C%20ON%20K9A%203P9!5e0!3m2!1sen!2sca!4v1783299473147!5m2!1sen!2sca"
            width="600"
            height="450"
            className="w-full h-[320px] md:h-[400px] rounded-lg border border-sage/20"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}
