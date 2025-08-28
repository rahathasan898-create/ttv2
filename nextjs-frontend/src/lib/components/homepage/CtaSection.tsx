/**
 * File: src/lib/components/homepage/CtaSection.tsx
 * Last Modified: 28 August 2025, 09:25 PM (AEST)
 *
 * This component renders the final, main Call to Action (CTA) section at the bottom
 * of the homepage. Its purpose is to provide a clear and powerful final prompt for
 * the user to sign up.
 *
 * V3 Refactor Notes:
 * - The component has been redesigned to be a clean, high-contrast, and focused
 * conversion point, as per our V3 roadmap.
 * - The copy is direct, benefit-oriented, and restates the core value proposition.
 * - It features a single, prominent primary CTA button to eliminate decision fatigue
 * and guide the user to the most important action.
 * - The design is simple and visually distinct to make it stand out as the final
 * step in the user's journey on the homepage.
 */

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto max-w-screen-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Elevate Your Content?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join over 50+ Australian creators who use TickTrend to find trends,
          master their craft, and grow their audience.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/feed">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required.
        </p>
      </div>
    </section>
  )
}
