// Load testimonial data from JSON
const testimonialData = [
  {
    category: "quit-smoking",
    name: "Sarah Grondin",
    headline: "I'm so Proud that Smoking is Behind Me",
    quote: "I never thought I would ever be able to quit. Smoking is a dirty habit and I'm so proud it's behind me.",
    stars: 5,
    image: "quit-smoking-sarah-grondin.png"
  },
  {
    category: "weight-loss",
    name: "Melanie Towes",
    headline: "Down 20lbs in 4.5 Months",
    quote: "I lost 20lbs in 4.5 months.",
    stars: 5,
    image: "weight-loss-melanie-towes.png"
  },
  {
    category: "weight-loss",
    name: "Darien Martinez Torres",
    headline: "In 6 Months I lost 70lbs",
    quote: null,
    stars: 5,
    image: "weight-loss-darien-martinez-torres.png"
  },
  {
    category: "quit-smoking",
    name: "Andrew Hordyk",
    headline: "Pack-A-Day Smoker Quits",
    quote: "I was coughing every night, snoring heavy & smoking a pack a day. I am now free of the chains.",
    stars: 5,
    image: "quit-smoking-andrew-hordyk.png"
  },
  {
    category: "stress-management",
    name: "Kirsien Lingard",
    headline: "Hypnosis for Stress Management is Unlike Anything I've Ever Experienced",
    quote: "Hypnosis for stress management is unlike anything I've ever experienced. I've eliminated irrational fears, built unshakeable self-confidence and improved my work-life balance. I am more productive, more grounded and more myself.",
    stars: 5,
    image: "stress-management-kirsien-lingard.png"
  },
  {
    category: "quit-smoking",
    name: "James B",
    headline: "I No Longer Feel the Guilt & Shame of Smoking & Hiding it",
    quote: "Since start hypnosis I find myself not distracted by the need to plan smoke breaks or use them as a reward for tasks completed. My ability to focus has also improved. I no longer feel the guilt and shame of smoking and hiding it. I feel much healthier and have turned to fitness again.",
    stars: 5,
    image: null
  },
  {
    category: "quit-smoking",
    name: "Derrick Hexamer",
    headline: "I Wish I Had Done This Many Years Ago",
    quote: "I was a pack-a-day smoker. I tried patches and could never go more than a week smoke-free. With hypnosis I have easily quit smoking in one try. I feel totally in control. I wish I had done this many years ago.",
    stars: 5,
    image: "quit-smoking-derrick-hexamer.png"
  },
  {
    category: "quit-smoking",
    name: "Brianne Boyce",
    headline: "Escaped Smoking Trap & More Relaxed Than Ever",
    quote: "I felt trapped by cigarettes. I hated how I felt. I needed a way out, hypnosis has given me that. I feel free again and no longer have cravings. I feel more relaxed than I ever have before. Thank you for helping me get my life back!",
    stars: 5,
    image: "quit-smoking-brianne-boyce.png"
  }
];

export interface TestimonialCardData {
  category: string;
  name: string;
  headline: string;
  quote: string | null;
  stars: number;
  image: string | null;
}

// Map service IDs to JSON categories
const categoryMap: Record<string, string> = {
  'weight-loss': 'weight-loss',
  'stress-management': 'stress-management',
  'smoking-cessation': 'quit-smoking',
};

export function getTestimonialsByService(serviceId: string): TestimonialCardData[] {
  const category = categoryMap[serviceId];
  if (!category) return [];

  return testimonialData.filter(t => t.category === category);
}

export function getTestimonialImagePath(filename: string): string {
  return `/rewire-hypnosis-assets/rewire-testimonials-assets-2026/testimonial-cards/${filename}`;
}

export function getAllTestimonials(): TestimonialCardData[] {
  return testimonialData;
}
