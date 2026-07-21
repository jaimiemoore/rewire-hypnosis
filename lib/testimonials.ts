export interface Testimonial {
  id: number;
  text: string;
  shortQuote?: string;
  name: string;
  location?: string;
  rating: number;
  initials?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Hypnosis helped me be a better mom. It empowered me to overcome my fears and self-doubt. I'm so grateful!",
    shortQuote: "Finally overcame my fears and self-doubt",
    name: "Sarah M.",
    initials: "SM",
    location: "Port Hope",
    rating: 5,
    featured: false,
  },
  {
    id: 2,
    text: "From stressed and angry to calm and in control. This has genuinely changed my life.",
    shortQuote: "Changed from stressed to calm and in control",
    name: "Michael T.",
    initials: "MT",
    location: "Port Hope",
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    text: "I finally quit smoking after 15 years. Rachel's approach is professional and compassionate.",
    shortQuote: "Finally quit smoking after 15 years",
    name: "Jennifer L.",
    initials: "JL",
    location: "Clarington",
    rating: 5,
    featured: true,
  },
  {
    id: 4,
    text: "I've tried many approaches, but nothing worked like hypnosis. Rachel's professionalism and warmth made all the difference.",
    shortQuote: "Results when nothing else worked",
    name: "David K.",
    initials: "DK",
    rating: 5,
    featured: false,
  },
  {
    id: 5,
    text: "Finally able to manage my stress levels. I feel more in control and at peace than I have in years.",
    shortQuote: "Finally at peace and in control",
    name: "Emma S.",
    initials: "ES",
    rating: 5,
    featured: false,
  },
  {
    id: 6,
    text: "The results speak for themselves. Highly recommend Rachel to anyone looking for real, lasting change.",
    shortQuote: "Real, lasting change that works",
    name: "Marcus T.",
    initials: "MT2",
    rating: 5,
    featured: false,
  },
];

export const testimonialStats = {
  totalCount: testimonials.length,
  averageRating: 4.9,
  recentTestimonial: testimonials[0],
};
