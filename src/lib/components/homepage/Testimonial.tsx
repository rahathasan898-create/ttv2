// src/lib/components/homepage/Testimonial.tsx
// Last updated: 24 August 2025, 02:05 AM (AEST)
// A component to display a customer testimonial for social proof.
// NOTE: This component currently uses static data as a placeholder. It will
// be updated to fetch data dynamically from Sanity.

import Image from 'next/image';

// This data will be fetched from Sanity in a future step.
const testimonial = {
  quote:
    "TickTrend is the first platform that feels like it was built by actual creators. The trend analysis is a game-changer and has saved me countless hours of guesswork. It's an indispensable part of my workflow now.",
  author: {
    name: 'Sarah Dole',
    title: 'Full-Time Creator & Course Instructor',
    image: 'https://placehold.co/48x48/171717/FFFFFF?text=SD',
  },
};

export default function Testimonial() {
  return (
    <section className="w-full border-t border-white/10 bg-black py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote className="text-2xl font-medium leading-9 text-white md:text-3xl md:leading-normal">
            <p>"{testimonial.quote}"</p>
          </blockquote>
          <figcaption className="mt-10">
            <div className="flex items-center justify-center">
              <Image
                className="h-12 w-12 rounded-full"
                src={testimonial.author.image}
                alt={`Photo of ${testimonial.author.name}`}
                width={48}
                height={48}
              />
            </div>
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-white">
                {testimonial.author.name}
              </div>
              <svg
                viewBox="0 0 2 2"
                width={3}
                height={3}
                aria-hidden="true"
                className="fill-neutral-400"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-neutral-400">
                {testimonial.author.title}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
