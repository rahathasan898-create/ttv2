/**
 * File: src/app/page.tsx
 * Last Modified: 28 August 2025, 08:36 PM (AEST)
 *
 * This is the main entry point for the TickTrend Australia homepage.
 *
 * V3 Refactor Notes:
 * - The component structure has been completely reorganized to follow the 7-part strategic
 * narrative from our V3 roadmap ("The Perfect SaaS Homepage").
 * - It now imports the newly refactored Hero component and lays out the placeholders for
 * the other narrative sections we will build next (ProblemSolution, FeatureShowcase, etc.).
 * - This structure transforms the page from a simple list of features into a persuasive
 * funnel designed to guide the user from awareness to conversion.
 */

import CtaSection from '@/lib/components/homepage/CtaSection'
import FeatureShowcase from '@/lib/components/homepage/FeatureShowcase'
import Hero from '@/lib/components/homepage/Hero'
import HowItWorks from '@/lib/components/homepage/HowItWorks'
import ProblemSolution from '@/lib/components/homepage/ProblemSolution'
import Testimonial from '@/lib/components/homepage/Testimonial'

export default function HomePage() {
  return (
    <main>
      {/* 1. The Hero Section: Grabs attention and communicates value. */}
      <Hero />

      {/* 2. The Problem ("Before X"): Connects with the user's pain points. */}
      {/* We will refactor this component next. */}
      <ProblemSolution />

      {/* 3. The Solution (Value Proposition): Showcases our features as the solution. */}
      {/* We will refactor this into a Bento Grid. */}
      <FeatureShowcase />

      {/* 4. The Guide (Social Proof): Builds trust with authentic testimonials. */}
      {/* We will refactor this component to be more impactful. */}
      <Testimonial />

      {/* 5. The Plan ("How It Works"): Simplifies the path to success. */}
      {/* We will refactor this component for clarity. */}
      <HowItWorks />

      {/* 6. The Final CTA: A clear and powerful call to action. */}
      {/* We will refactor this component for maximum impact. */}
      <CtaSection />
    </main>
  )
}
