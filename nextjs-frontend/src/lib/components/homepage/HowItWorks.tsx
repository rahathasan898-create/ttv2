// File: src/lib/components/homepage/HowItWorks.tsx (New File)
// Last updated: 28 August 2025, 01:43 AM (AEST)
// This component represents "The Plan" section of the homepage narrative,
// showing visitors how easy it is to get started.

import { Lightbulb, Target, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Discover Insights',
    description: 'Explore our data-driven trend reports and in-depth articles to find your next great idea.',
  },
  {
    icon: Target,
    title: 'Learn Strategies',
    description: 'Take our step-by-step courses in VibeSchool to master new skills, from editing to monetization.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Audience',
    description: 'Apply what you’ve learned to create content that resonates and turn your passion into a profession.',
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Getting started is simple. Follow our proven path to creator success.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
