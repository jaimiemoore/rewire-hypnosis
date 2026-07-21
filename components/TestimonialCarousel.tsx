"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Pause,
  Play,
  Cigarette,
  TrendingDown,
  Brain,
} from "lucide-react";

export const testimonials = [
  {
    id: 1,
    text: "I never thought I would ever be able to quit. Smoking is a dirty habit and I'm so proud it's behind me.",
    name: "Sarah Grondin",
    initials: "SG",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-sarah-grondin.png.png",
  },
  {
    id: 2,
    text: "I was coughing every night, snoring heavy & smoking a pack a day. I am now free of the chains.",
    name: "Andrew Hordyk",
    initials: "AH",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-andrew-hordyk-aborisi.png.png",
  },
  {
    id: 3,
    text: "Since start hypnosis I find myself not distracted by the need to plan smoke breaks or use them as a reward for tasks completed. My ability to focus has also improved. I no longer feel the guilt and shame of smoking and hiding it. I feel much healthier and have turned to fitness again.",
    name: "James B",
    initials: "JB",
    location: "Port Hope",
    rating: 5,
    photo: "",
  },
  {
    id: 4,
    text: "I was a pack-a-day smoker. I tried patches and could never go more than a week smoke-free. With hypnosis I have easily quit smoking in one try. I feel totally in control. I wish I had done this many years ago.",
    name: "Derrick Hexamer",
    initials: "DH",
    location: "Port Hope",
    rating: 5,
    photo: null,
  },
  {
    id: 5,
    text: "I felt trapped by cigarettes. I hated how I felt. I needed a way out, hypnosis has given me that. I feel free again and no longer have cravings. I feel more relaxed than I ever have before. Thank you for helping me get my life back!",
    name: "Brianne Boyce",
    initials: "BB",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/smoking-brianne-boyce.png.png",
  },
  {
    id: 6,
    text: "I lost 20lbs in 4.5 months.",
    name: "Melanie Towes",
    initials: "MT",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/weightloss-melanie-towes.png.png",
  },
  {
    id: 7,
    text: "In 6 Months I lost 70lbs",
    name: "Darien Martinez Torres",
    initials: "DM",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/weightloss-darien-marinez-torres.png.png",
  },
  {
    id: 8,
    text: "Hypnosis for stress management is unlike anything I've ever experienced. I've eliminated irrational fears, built unshakeable self-confidence and improved my work-life balance. I am more productive, more grounded and more myself.",
    name: "Kirsien Lingard",
    initials: "KL",
    location: "Port Hope",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/stress-management-kirsten-lingard.png",
  },
  {
    id: 9,
    text: "I always figured I was just an easily stressed type of person.  My shoulders would get so tense, even when I'm asleep but since hypnosis something just clicks.  If stress starts building up it's like my brain gets a little nudge from somewhere and I actually start to relax.  My mind is now equipped with the tools I need to naturally release stress and enjoy my life",
    name: "Shirley S.",
    initials: "SS",
    location: "Hamilton",
    rating: 5,
    photo: "/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-individual-photos/stress-management-shirleys.png",
  },
];

// Helper function to determine service type
function getServiceType(id: number): string {
  if (id <= 5) return "Smoking Cessation";
  if (id <= 7) return "Weight Loss";
  return "Stress Management";
}

// Helper function to get service icon
function getServiceIcon(type: string) {
  switch (type) {
    case "Smoking Cessation":
      return <Cigarette size={16} />;
    case "Weight Loss":
      return <TrendingDown size={16} />;
    case "Stress Management":
      return <Brain size={16} />;
    default:
      return null;
  }
}

// Helper function to get service type styling
function getServiceTypeStyles(type: string) {
  switch (type) {
    case "Smoking Cessation":
      return "bg-blue-500/20 text-blue-200";
    case "Weight Loss":
      return "bg-purple-500/20 text-purple-200";
    case "Stress Management":
      return "bg-green-500/20 text-green-200";
    default:
      return "bg-sage/20 text-sage";
  }
}

// TestimonialPhoto Component
function TestimonialPhoto({ photo, initials }: { photo: string | null; initials: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 mx-auto md:mx-0 border-4 border-sage shadow-lg shadow-sage/30"
    >
      {photo ? (
        <Image
          src={photo}
          alt="Client"
          width={96}
          height={96}
          className="w-full h-full object-cover object-top"
          quality={90}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-sage via-sage-dark to-forest flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{initials}</span>
        </div>
      )}

      {/* Verified Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
        className="absolute bottom-0 right-0 bg-sage border-2 border-white rounded-full p-1 shadow-lg"
      >
        <CheckCircle2 size={20} className="text-white" />
      </motion.div>
    </motion.div>
  );
}

// ServiceTag Component
function ServiceTag({ type }: { type: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 ${getServiceTypeStyles(type)}`}
    >
      {getServiceIcon(type)}
      <span className="text-xs font-bold tracking-widest uppercase">{type}</span>
    </motion.div>
  );
}

// TestimonialContent Component
function TestimonialContent({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  const serviceType = getServiceType(testimonial.id);

  return (
    <div className="flex flex-col justify-center md:text-left text-center w-full">
      {/* Service Tag */}
      <ServiceTag type={serviceType} />

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg md:text-xl text-white font-medium my-6 leading-relaxed"
      >
        ❝ {testimonial.text}
      </motion.p>

      {/* Stars */}
      <motion.div className="flex gap-2 mb-6 justify-center md:justify-start">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: i * 0.1 + 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Star size={20} className="fill-sage text-sage" />
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="border-t border-white/20 my-4" />

      {/* Client Info */}
      <div className="space-y-1">
        <p className="text-white font-bold text-lg">{testimonial.name}</p>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin size={16} className="text-sage" />
          <p className="text-sage text-sm">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

// TestimonialNavigation Component
function TestimonialNavigation({
  current,
  total,
  onPrevious,
  onNext,
  onSelectDot,
  autoPlay,
  onAutoPlayToggle,
}: {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectDot: (index: number) => void;
  autoPlay: boolean;
  onAutoPlayToggle: () => void;
}) {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 mt-12">
      {/* Arrows and Dots Container */}
      <div className="flex items-center gap-6 md:gap-8">
        {/* Previous Arrow */}
        <button
          type="button"
          onClick={onPrevious}
          style={{
            touchAction: "manipulation",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-sage hover:border-sage active:scale-95 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-sage/50 cursor-pointer"
          aria-label={`Previous testimonial (${current === 0 ? total : current} of ${total})`}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 relative">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => onSelectDot(index)}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
                style={{
                  touchAction: "manipulation",
                  WebkitUserSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                className="relative p-3 cursor-pointer"
                aria-label={`Go to testimonial ${index + 1} by ${testimonials[index].name}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    index === current
                      ? "w-10 h-3 bg-sage"
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              </button>

              {/* Tooltip on hover - hidden on mobile */}
              {hoveredDot === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 text-forest px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold z-50 pointer-events-none shadow-lg"
                >
                  <div>{testimonials[index].name}</div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-sage text-sage" />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={onNext}
          style={{
            touchAction: "manipulation",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-sage hover:border-sage active:scale-95 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-sage/50 cursor-pointer"
          aria-label={`Next testimonial (${(current + 2) % total || total} of ${total})`}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <motion.div
          className="h-1 bg-gradient-to-r from-sage-dark via-sage to-sage-light rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Counter */}
      <p className="text-white/60 text-sm font-medium">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {/* Pause/Play Button */}
      <button
        type="button"
        onClick={onAutoPlayToggle}
        style={{
          touchAction: "manipulation",
          WebkitUserSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-sage hover:border-sage active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer"
        aria-label={autoPlay ? "Pause carousel" : "Play carousel"}
      >
        {autoPlay ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
      </button>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack keys while the user is typing in a form field.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        setAutoPlay(!autoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [autoPlay]);

  const handlePrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const handleSelectDot = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };


  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.5,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-forest/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sage font-semibold tracking-widest uppercase text-sm mb-12 text-center"
        >
          Client Success Stories
        </motion.p>

        {/* Main Testimonial Card with Floating Animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={(event, info) => {
              const swipe = Math.abs(info.offset.x) * info.velocity.x;
              if (swipe < -10000) handleNext();
              if (swipe > 10000) handlePrevious();
            }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/15 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 mb-12 border border-white/20 overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          >
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage/0 via-sage to-sage/0" />

            {/* Content Layout - Horizontal on Desktop, Stacked on Mobile */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-10">
              {/* Photo Section */}
              <div className="flex justify-center md:justify-start md:flex-shrink-0">
                <TestimonialPhoto
                  photo={testimonials[current].photo}
                  initials={testimonials[current].initials}
                />
              </div>

              {/* Content Section */}
              <TestimonialContent testimonial={testimonials[current]} />
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Component */}
        <TestimonialNavigation
          current={current}
          total={testimonials.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelectDot={handleSelectDot}
          autoPlay={autoPlay}
          onAutoPlayToggle={() => setAutoPlay(!autoPlay)}
        />
      </div>

      {/* Review Schema - For Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://rewirehypnosis.ca/#business",
            review: testimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating.toString(),
                bestRating: "5",
              },
              reviewBody: testimonial.text,
            })),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: testimonials.length.toString(),
            },
          }),
        }}
      />
    </section>
  );
}
