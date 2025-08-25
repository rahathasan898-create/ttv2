// src/lib/components/homepage/CtaSection.tsx
// Last updated: 24 August 2025, 02:05 AM (AEST)
// The final call-to-action (CTA) section for the homepage, designed to
// convert visitors into users.

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CtaSection() {
  return (
    <section className="w-full border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 px-6 py-24 text-center shadow-2xl sm:px-16">
          {/* Aurora style background gradient */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-70" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to stop guessing and start growing?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-300">
              Join the next generation of creators and turn your content into a
              professional brand with TickTrend.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/dashboard">Get started for free</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/feed">
                  Explore the feed <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
