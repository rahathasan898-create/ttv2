// File: src/lib/components/homepage/Hero.tsx (Update this file)
// Last updated: 28 August 2025, 01:40 AM (AEST)
// The new Hero section for the homepage, designed to follow the
// strategic narrative outlined in our Design System Guide.

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative w-full border-b border-border">
      {/* Subtle background grid pattern for depth */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
      <div className="container relative mx-auto px-4 py-24 text-center md:py-32">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          The Playbook for Creator Growth
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Unlock expert insights, trend reports, and step-by-step courses to
          elevate your content strategy.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/feed">Explore Content</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/dashboard">Sign Up Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
