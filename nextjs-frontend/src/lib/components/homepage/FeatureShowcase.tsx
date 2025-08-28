/**
 * File: src/lib/components/homepage/FeatureShowcase.tsx
 * Last Modified: 28 August 2025, 08:55 PM (AEST)
 *
 * This component renders the "Value Proposition" section of the homepage. It showcases the
 * core content pillars of the TickTrend platform in a visually engaging way.
 *
 * V3 Refactor Notes:
 * - The component has been completely redesigned from a simple grid into a modern and
 * dynamic "Bento Grid" layout, a key part of our V3 roadmap.
 * - This layout uses a mix of large and small containers to create a strong visual hierarchy,
 * drawing the user's attention to the most important features.
 * - The copy for each pillar is now benefit-focused, telling the user what they can achieve
 * rather than just what the feature is.
 * - Each grid item is a clickable card that links to the respective pillar page, encouraging exploration.
 * - The entire component is fully responsive, stacking into a clean single column on mobile.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, BarChart, BookOpen, Bot, Wrench } from 'lucide-react'
import Link from 'next/link'

// Define the feature data for easy management and mapping
const features = [
  {
    title: 'TrendLab',
    benefit: 'Uncover Viral Trends',
    description: 'Leverage our AI to find breakout sounds and hashtags before they go mainstream.',
    href: '/trendlab',
    icon: <BarChart className="h-8 w-8" />,
    className: 'md:col-span-2', // Takes up two columns on medium screens and up
  },
  {
    title: 'VibeSchool',
    benefit: 'Master Creator Skills',
    description: 'Access step-by-step courses and playbooks from industry experts.',
    href: '/vibeschool',
    icon: <BookOpen className="h-8 w-8" />,
    className: '',
  },
  {
    title: 'PulsePoint',
    benefit: 'Read Expert Insights',
    description: 'In-depth articles and guides on creator strategy and growth.',
    href: '/pulsepoint',
    icon: <Bot className="h-8 w-8" />,
    className: '',
  },
  {
    title: 'Resources',
    benefit: 'Get Pro Tools',
    description: 'Downloadable templates, checklists, and tools to streamline your workflow.',
    href: '/resources',
    icon: <Wrench className="h-8 w-8" />,
    className: 'md:col-span-2', // Takes up two columns on medium screens and up
  },
]

export default function FeatureShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your All-in-One Creator Toolkit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to build a successful creator business, all in one
            place.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className={`group block ${feature.className}`}>
              <Card className="h-full hover:border-primary/80 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="text-primary">{feature.icon}</div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold">{feature.benefit}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
