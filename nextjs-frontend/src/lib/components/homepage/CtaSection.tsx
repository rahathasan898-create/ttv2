// File: src/lib/components/homepage/CtaSection.tsx (Update this file)
// Last updated: 28 August 2025, 01:45 AM (AEST)
// The final, high-impact Call to Action section for the homepage,
// designed to drive conversions.

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="w-full bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Elevate Your Content?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join the next generation of creators and turn your content into a
          professional brand with TickTrend.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
