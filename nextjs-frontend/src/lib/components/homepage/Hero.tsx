/**
 * File: src/lib/components/homepage/Hero.tsx
 * Last Modified: 28 August 2025, 08:36 PM (AEST)
 *
 * This component renders the main hero section for the homepage. It's the first thing
 * visitors see and is designed to quickly communicate the core value proposition.
 *
 * V3 Refactor Notes:
 * - The copy has been completely rewritten to be benefit-driven and focused on the Ideal
 * Customer Profile (ICP), as per the "Perfect SaaS Homepage" framework.
 * - The primary Call to Action (CTA) is now strategically focused on engagement ("Explore Content")
 * rather than an immediate sign-up, aiming to get users to their "Aha!" moment first.
 * - A subtle social proof element ("Trusted by...") has been added directly below the CTA
 * to build immediate trust and credibility.
 * - The layout is clean, modern, and uses generous spacing for a premium feel.
 */

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto max-w-screen-xl text-center">
        {/* Main Headline (H1) */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          The Playbook for Creator Growth in Australia
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Stop guessing, start growing. Unlock expert insights, data-driven trend reports, and
          step-by-step courses to elevate your TikTok presence.
        </p>

        {/* Call to Action */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/feed">
              Explore Content <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="/vibeschool">Learn More →</Link>
          </Button>
        </div>

        {/* Subtle Social Proof */}
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Trusted by 50+ of Australia's fastest-growing creators</p>
          {/* In a real application, a component rendering actual logos would go here */}
        </div>
      </div>
    </section>
  )
}
