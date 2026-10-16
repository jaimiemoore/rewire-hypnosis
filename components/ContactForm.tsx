"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, MessageSquare } from "lucide-react";
import FreeScreeningBooking from "@/components/FreeScreeningBooking";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Service is required"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showMessageForm, setShowMessageForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const recaptchaToken = await getRecaptchaToken("contact_submit");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="py-16 md:py-24 bg-gradient-to-br from-sage/5 via-cream to-white relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-2 text-forest">
            Ready to Make a Change?
          </h2>
          <p className="text-gray-soft text-lg">Book your free, no-obligation screening today.</p>
        </motion.div>

        {pathname !== "/screening" && pathname !== "/agreements" ? <FreeScreeningBooking /> : null}

        {/* Secondary path: lightweight message form (collapsed by default) */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowMessageForm((value) => !value)}
            aria-expanded={showMessageForm}
            aria-controls="message-form-panel"
            className="inline-flex items-center gap-2 text-sage-dark font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Prefer to just ask a question? Send a message
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showMessageForm ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showMessageForm ? (
            <motion.div
              id="message-form-panel"
              key="message-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-sage/20 bg-white/80 p-5 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      {...register("name")}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="w-full px-4 py-3 rounded-lg border border-gray-soft/30 focus:outline-none focus:ring-2 focus:ring-sage focus:glow-sage transition-all"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">
                      Your Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="w-full px-4 py-3 rounded-lg border border-gray-soft/30 focus:outline-none focus:ring-2 focus:ring-sage focus:glow-sage transition-all"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="sr-only">
                      Select a Service
                    </label>
                    <select
                      id="service"
                      {...register("service")}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-soft/30 focus:outline-none focus:ring-2 focus:ring-sage focus:glow-sage transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="weight-loss">Weight Loss</option>
                      <option value="smoking-cessation">Stop Smoking</option>
                      <option value="stress-reduction">Stress Reduction</option>
                      <option value="corporate">Corporate Program</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Tell us about your goals (optional)
                    </label>
                    <textarea
                      id="message"
                      placeholder="Tell me about your goals (optional)"
                      rows={4}
                      {...register("message")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-soft/30 focus:outline-none focus:ring-2 focus:ring-sage focus:glow-sage transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-sage text-white rounded-lg font-semibold glow-sage disabled:opacity-50 transition-all"
                    whileHover={{ y: -2, boxShadow: "0 0 30px rgba(86, 134, 115, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm">
                          We have received your message and will be in touch soon. Please check your
                          email for confirmation.
                        </p>
                      </div>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        ✕
                      </div>
                      <div>
                        <p className="font-semibold">Failed to send message</p>
                        <p className="text-sm">
                          Please try again in a few moments.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Slim contact info row */}
        <div className="mt-10 flex items-center justify-center text-sm text-gray-soft">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sage-dark" aria-hidden="true" />
            257 Division Street, Cobourg, ON
          </span>
        </div>
      </div>
    </section>
  );
}
