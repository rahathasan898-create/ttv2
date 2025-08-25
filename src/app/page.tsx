// src/app/page.tsx
// Last updated: 24 August 2025, 02:05 AM (AEST)
// This is the main server component for the homepage. It structures the page
// by importing and arranging the primary marketing sections.

import Hero from '@/lib/components/homepage/Hero';
import FeatureShowcase from '@/lib/components/homepage/FeatureShowcase';
import Testimonial from '@/lib/components/homepage/Testimonial';
import CtaSection from '@/lib/components/homepage/CtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureShowcase />
      <Testimonial />
      <CtaSection />
    </div>
  );
}
