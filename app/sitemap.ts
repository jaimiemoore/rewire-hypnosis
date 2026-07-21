import { MetadataRoute } from "next";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rewirehypnosis.ca";

  // Static pages with actual modification dates (not dynamic)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-14'), // Homepage - frequently updated
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-01-15'), // About page
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2026-02-13'), // Services overview
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-02-01'), // Contact page
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dedicated service pages with static dates
  const dedicatedServicePages = [
    {
      url: `${baseUrl}/services/weight-loss`,
      lastModified: new Date('2026-02-13'), // Weight Loss service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/smoking-cessation`,
      lastModified: new Date('2026-02-13'), // Smoking Cessation service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/stress-management`,
      lastModified: new Date('2026-02-13'), // Stress Management service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/fears`,
      lastModified: new Date('2026-02-14'), // Fears service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/confidence`,
      lastModified: new Date('2026-02-14'), // Confidence service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/sports-performance`,
      lastModified: new Date('2026-02-14'), // Sports Performance service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/pain-management`,
      lastModified: new Date('2026-02-14'), // Pain Management service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/sleep-issues`,
      lastModified: new Date('2026-02-14'), // Sleep Issues service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/habit-breaking`,
      lastModified: new Date('2026-02-14'), // Habit Breaking service page
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ];

  // Dynamic service anchors (documented for reference)
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services#${service.id}`,
    lastModified: new Date('2026-02-13'), // Last services catalog update
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dedicatedServicePages, ...servicePages];
}
