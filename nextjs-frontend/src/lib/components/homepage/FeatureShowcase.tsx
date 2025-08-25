// src/lib/components/homepage/FeatureShowcase.tsx
// Last updated: 25 August 2025, 02:30 AM (AEST)
// A section that showcases the main features or content pillars of the
// application, using cards with icons to visually represent each area.
// FIX: Ensured grid layout is fully responsive across all screen sizes.

import {
  Newspaper,
  TrendingUp,
  GraduationCap,
  Download,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'PulsePoint',
    description:
      'In-depth, strategic content. This is our publication for topic breakdowns and evergreen guides.',
    icon: Newspaper,
    href: '/pulsepoint',
  },
  {
    name: 'TrendLab',
    description:
      "The real-time intelligence hub. Analyzing what's viral, why it works, and how you can use it.",
    icon: TrendingUp,
    href: '/trendlab',
  },
  {
    name: 'VibeSchool',
    description:
      'The structured learning platform. Comprehensive courses that take you from foundation to advanced skills.',
    icon: GraduationCap,
    href: '/vibeschool',
  },
  {
    name: 'Resources',
    description:
      'The Creator Kit. A central library for all downloadable assets, templates, and frameworks.',
    icon: Download,
    href: '/resources',
  },
  {
    name: 'Creator Studio',
    description:
      'The professional workspace. Your storefront for agency services, evolving into a suite of SaaS tools.',
    icon: Sparkles,
    href: '/studio',
  },
];

export default function FeatureShowcase() {
  return (
    <section className="w-full border-t border-white/10 bg-black py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-400">
            TickTrend provides a single, centralized hub that replaces chaos
            with clarity.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="group block rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all hover:border-white/20 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-white">
                  {feature.name}
                </h3>
              </div>
              <p className="mt-5 text-base leading-7 text-neutral-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
