/**
 * File: src/lib/components/homepage/HowItWorks.tsx
 * Last Modified: 28 August 2025, 09:15 PM (AEST)
 *
 * This component renders "The Plan" section of the homepage narrative. Its purpose is to
 * demystify the process for new users, showing them a simple, clear path to getting value
 * from the platform.
 *
 * V3 Refactor Notes:
 * - The component has been redesigned to be a clean, 3-step visual guide, aligning with
 * our V3 roadmap.
 * - Each step is presented in a card with a number, an icon, a clear title, and a concise
 * description, making the process easy to understand at a glance.
 * - The copy is action-oriented and focuses on the user's journey to success.
 * - The layout is fully responsive, stacking into a vertical flow on mobile devices.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppWindow, BarChart, Lightbulb } from 'lucide-react'

// Define the steps for easy management and mapping
const steps = [
  {
    step: 1,
    title: 'Explore the Feed',
    description:
      'Sign up for free and get immediate access to our curated feed of trends, insights, and resources.',
    icon: <AppWindow className="h-8 w-8" />,
  },
  {
    step: 2,
    title: 'Discover Insights',
    description:
      'Use TrendLab and PulsePoint to find breakout opportunities and learn the strategies behind them.',
    icon: <BarChart className="h-8 w-8" />,
  },
  {
    step: 3,
    title: 'Apply & Grow',
    description:
      'Put your new knowledge into action with VibeSchool courses and downloadable resources to grow your audience.',
    icon: <Lightbulb className="h-8 w-8" />,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-muted/50">
      <div className="container mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From sign-up to success, we make growing your audience easy.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.step} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-bold">
                  <span className="text-primary">Step {step.step}:</span> {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
