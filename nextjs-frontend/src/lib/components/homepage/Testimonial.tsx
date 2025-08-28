/**
 * File: src/lib/components/homepage/Testimonial.tsx
 * Last Modified: 28 August 2025, 09:05 PM (AEST)
 *
 * This component renders the "Social Proof" section of the homepage. Its purpose is to
 * build trust and credibility by showcasing positive feedback from real users.
 *
 * V3 Refactor Notes:
 * - The component has been redesigned to be more impactful and authentic, aligning with the
 * principles from our V3 roadmap.
 * - It now features a full-width layout with a prominent quote and includes the creator's
 * image, name, and title/niche, which significantly increases credibility.
 * - The styling is clean and modern, using a subtle background color to separate it from
 * other sections and draw the user's attention.
 * - The data is structured in an array for easy management and potential future fetching from a CMS.
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

// In a real application, this data would likely come from a CMS.
const testimonials = [
  {
    quote:
      "TickTrend's TrendLab is a game-changer. I found a breakout sound a week before it went viral, and that video hit a million views. I've never had growth like this.",
    name: 'Chloe Bennett',
    title: 'Fashion & Lifestyle Creator',
    avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=CB', // Placeholder
  },
]

export default function Testimonial() {
  // We'll just feature one main testimonial for maximum impact in this section.
  const featuredTestimonial = testimonials[0]

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto max-w-screen-xl">
        <figure className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl font-medium text-foreground sm:text-3xl">
            <p>"{featuredTestimonial.quote}"</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center space-x-4">
            <Avatar>
              <AvatarImage
                src={featuredTestimonial.avatar}
                alt={featuredTestimonial.name}
              />
              <AvatarFallback>
                {featuredTestimonial.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="font-semibold">{featuredTestimonial.name}</div>
              <div className="text-muted-foreground">
                {featuredTestimonial.title}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
