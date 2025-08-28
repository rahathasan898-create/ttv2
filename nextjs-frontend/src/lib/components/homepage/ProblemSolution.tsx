/**
 * File: src/lib/components/homepage/ProblemSolution.tsx
 * Last Modified: 28 August 2025, 08:45 PM (AEST)
 *
 * This component renders the "Problem (Before X)" section of the homepage narrative.
 * Its purpose is to connect with the visitor by articulating their current pain points,
 * making them feel understood before we introduce our product as the solution.
 *
 * V3 Refactor Notes:
 * - The component has been completely redesigned to follow the "Problem/Solution" or
 * "Old Way vs. New Way" persuasion framework from our V3 roadmap.
 * - It uses a clear, two-column layout to visually contrast the user's current struggles
 * with the benefits offered by TickTrend.
 * - The copy is focused on empathy and clearly defines the problem that our platform solves.
 * - Icons (XCircle for problems, CheckCircle2 for solutions) are used to reinforce the message visually.
 */

import { CheckCircle2, XCircle } from 'lucide-react'

// Define the points for clarity and easy management
const problems = [
  'Endless manual scrolling for trends',
  'Guesswork content strategy',
  'Scattered, unreliable resources',
  'Uncertainty about what will perform',
]

const solutions = [
  'Data-driven, AI-powered trend reports',
  'Step-by-step growth playbooks',
  'All-in-one creator toolkit',
  'Clarity and confidence in your content',
]

export default function ProblemSolution() {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stop Guessing, Start Growing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tired of the content treadmill? There's a smarter way to build your
            audience on TikTok.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* The "Old Way" (Problem) */}
          <div className="rounded-xl border bg-background p-8">
            <h3 className="text-xl font-semibold">The Old Way</h3>
            <ul className="mt-6 space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The "TickTrend Way" (Solution) */}
          <div className="rounded-xl border bg-background p-8">
            <h3 className="text-xl font-semibold">The TickTrend Way</h3>
            <ul className="mt-6 space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
