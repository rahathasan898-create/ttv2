// src/lib/components/homepage/Hero.tsx
// Last updated: 25 August 2025, 02:30 AM (AEST)
// The primary hero section for the homepage, designed to capture user
// attention and communicate the core value proposition of TickTrend.
// FIX: Adjusted typography for better readability on mobile devices.

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Aurora style background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-70" />

      <div className="container relative z-10 mx-auto px-4 py-24 text-center md:py-32">
        <h1 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-extrabold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-6xl">
          Turn Your Content into a Career
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 md:text-lg">
          TickTrend is the definitive growth platform for the new generation of
          creators. We democratize access to elite-level strategies, real-time
          trend intelligence, and powerful creative tools.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/feed">Explore the Feed</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
