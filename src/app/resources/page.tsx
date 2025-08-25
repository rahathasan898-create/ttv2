// src/app/resources/page.tsx
// Last updated: 24 August 2025, 03:20 AM (AEST)
// The main archive page for the Resources section, displaying all available assets.

import { getAllResources } from '@/lib/content';
import ContentCard from '@/lib/components/global/ContentCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | TickTrend Australia',
  description:
    'The Creator Kit. A central library for all downloadable assets, templates, and frameworks.',
};

export const revalidate = 600;

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
          Resources
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
          The Creator Kit. A central library for all downloadable assets,
          templates, and frameworks.
        </p>
      </div>

      {resources && resources.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ContentCard key={resource._id} item={resource} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
          <h2 className="text-2xl font-semibold text-neutral-300">
            No resources available yet!
          </h2>
          <p className="mt-2 text-neutral-500">
            We're busy creating new templates and guides. Check back soon!
          </p>
        </div>
      )}
    </main>
  );
}
