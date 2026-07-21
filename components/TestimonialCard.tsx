"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  headline: string;
  quote: string | null;
  photo: string;
  stars: number;
}

// Extract initials from name
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '??';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  // First letter of first word + first letter of last word
  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}

export default function TestimonialCard({ name, headline, quote, photo, stars }: TestimonialCardProps) {
  return (
    <div className="relative bg-cream rounded-xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
      {/* Green Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-forest flex items-center justify-center">
        <span className="text-white text-xs tracking-wider transform -rotate-90 whitespace-nowrap font-semibold">
          RewireHypnosis.ca
        </span>
      </div>

      {/* Main Content - CENTERED LAYOUT */}
      <div className="relative p-8 md:p-10 flex flex-col items-center text-center pl-20 md:pl-28">
        {/* Header Label */}
        <p className="text-sage text-sm font-semibold tracking-wider uppercase mb-6">
          Client Testimonial
        </p>

        {/* Profile Photo - Centered */}
        <div className="mb-6 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0">
          {photo && !photo.includes('placeholder') ? (
            <Image
              src={photo}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover object-top"
              quality={90}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-sage text-white font-heading font-bold text-3xl md:text-4xl">
              {getInitials(name)}
            </div>
          )}
        </div>

        {/* Name - Centered */}
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-forest mb-4">
          {name}
        </h3>

        {/* Star Rating - Full Width Centered */}
        <div className="flex justify-center gap-1.5 mb-6 w-full">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              size={28}
              className="fill-sage text-sage md:w-8 md:h-8"
              strokeWidth={1.5}
            />
          ))}
        </div>

        {/* Quote Section - Centered */}
        <div className="relative mb-6 min-h-[120px] flex items-center justify-center w-full">
          <Quote className="absolute -left-4 top-0 w-8 h-8 text-sage/20" strokeWidth={1.5} />
          <p className="text-gray-700 leading-relaxed text-base md:text-lg px-8">
            {quote || headline}
          </p>
        </div>

        {/* Headline - Full Width Centered */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-lg py-3 px-4 mb-6">
          <p className="font-heading text-lg md:text-xl font-bold text-forest text-center">
            {headline}
          </p>
        </div>

        {/* Branding Box */}
        <div className="bg-amber-100 px-4 py-2 rounded-md">
          <span className="text-forest text-sm font-semibold">Rewire Hypnosis</span>
        </div>
      </div>

      {/* Accent Square (Top Right) */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-sage rounded-sm" />
    </div>
  );
}
