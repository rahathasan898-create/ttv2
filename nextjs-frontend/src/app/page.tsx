// src/app/page.tsx
// Last updated: 28 August 2025, 01:15 AM (AEST)
// This is the main server component for the homepage. It structures the page
// by importing and arranging the new, redesigned homepage sections according
// to our strategic narrative.

import Hero from '@/lib/components/homepage/Hero';
import { ProblemSolution } from '@/lib/components/homepage/ProblemSolution';
import { BentoGrid } from '@/lib/components/homepage/BentoGrid';
import Testimonials from '@/lib/components/homepage/Testimonials';
import { FinalCTA } from '@/lib/components/homepage/FinalCTA';
import { HowItWorks } from '@/lib/components/homepage/HowItWorks';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <BentoGrid />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
