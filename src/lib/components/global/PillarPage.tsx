// src/lib/components/global/PillarPage.tsx
// Last updated: 25 August 2025, 12:30 AM (AEST)
// This is a new, reusable server component designed to render the main archive
// pages for content pillars (e.g., PulsePoint, TrendLab). It accepts a title,
// description, and a list of content items, providing a consistent layout
// and reducing code duplication across the application.

import ContentCard from '@/lib/components/global/ContentCard';
import { Post, Course, Resource } from '@/types';

// Define the props for the component, allowing it to accept any of our primary content types.
interface PillarPageProps {
  title: string;
  description: string;
  items: (Post | Course | Resource)[];
}

export default function PillarPage({ title, description, items }: PillarPageProps) {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
          {description}
        </p>
      </div>

      {/* Content Grid */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ContentCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        // Fallback message for when no content is found.
        <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
          <h2 className="text-2xl font-semibold text-neutral-300">
            No content available yet!
          </h2>
          <p className="mt-2 text-neutral-500">
            Our team is working on it. Please check back soon.
          </p>
        </div>
      )}
    </main>
  );
}
