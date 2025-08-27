// File: src/lib/components/homepage/FeatureShowcase.tsx (Update this file)
// Last updated: 28 August 2025, 01:42 AM (AEST)
// This component showcases the core content pillars (our "Value Proposition")
// using a modern, visually engaging Bento Grid layout.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Newspaper, TrendingUp, GraduationCap, Download } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'TrendLab',
    description: 'Data-driven analysis of what’s currently viral.',
    icon: TrendingUp,
    href: '/trendlab',
    className: 'col-span-3 row-span-2 md:col-span-2',
    background: 'bg-blue-500/10 dark:bg-blue-900/20',
  },
  {
    title: 'PulsePoint',
    description: 'In-depth articles and strategic guides.',
    icon: Newspaper,
    href: '/pulsepoint',
    className: 'col-span-3 row-span-1 md:col-span-1',
    background: 'bg-green-500/10 dark:bg-green-900/20',
  },
  {
    title: 'VibeSchool',
    description: 'Step-by-step courses to master new skills.',
    icon: GraduationCap,
    href: '/vibeschool',
    className: 'col-span-3 row-span-1 md:col-span-1',
    background: 'bg-yellow-500/10 dark:bg-yellow-900/20',
  },
  {
    title: 'Resources',
    description: 'Downloadable templates and creator kits.',
    icon: Download,
    href: '/resources',
    className: 'col-span-3 row-span-1 md:col-span-2',
    background: 'bg-purple-500/10 dark:bg-purple-900/20',
  },
];

export default function FeatureShowcase() {
  return (
    <section className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Complete Creator Toolkit
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Everything you need to go from idea to viral, all in one place.
          </p>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className={cn('group', feature.className)}>
              <Card className={cn('h-full w-full overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-xl', feature.background)}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
