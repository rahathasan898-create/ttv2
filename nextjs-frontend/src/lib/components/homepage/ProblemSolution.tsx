// File: src/lib/components/homepage/ProblemSolution.tsx (New File)
// Last updated: 28 August 2025, 01:41 AM (AEST)
// This component represents "The Stakes" section of the homepage narrative,
// showing visitors we understand their pain points.

import { CheckIcon } from 'lucide-react';
import Image from 'next/image';

export function ProblemSolution() {
  return (
    <section className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Feeling Stuck in the Content Treadmill?
          </h2>
          <p className="mt-4 text-muted-foreground">
            You're not alone. Many creators struggle with the same challenges.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <CheckIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Endless scrolling for trends with no clear direction.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Uncertainty about what content will actually perform.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>Difficulty turning views into a sustainable brand.</span>
            </li>
          </ul>
        </div>
        <div className="flex h-full items-center justify-center rounded-xl bg-muted p-8">
          {/* Placeholder for a more engaging visual */}
          <Image
            src="https://placehold.co/500x300/e2e8f0/475569?text=Visual+Here"
            alt="Illustration of creator challenges"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
