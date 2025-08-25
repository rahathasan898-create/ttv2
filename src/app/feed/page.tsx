// src/app/feed/page.tsx
// Last updated: 25 August 2025, 03:00 AM (AEST)
// This page now correctly uses the centralized data-fetching function `getFeedContent`
// from `content.ts`, resolving the previous module import error.

import { getFeedContent } from '@/lib/content';
import ContentCard from '@/lib/components/global/ContentCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Feed | TickTrend Australia',
    description: 'A curated feed of our latest articles, resources, and strategic insights to keep you ahead of the curve.'
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function FeedPage() {
  const feedContent = await getFeedContent();

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
            <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
                The Feed
            </h1>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
                A curated feed of our latest articles, resources, and strategic insights to keep you ahead of the curve.
            </p>
        </div>

        {!feedContent || feedContent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
            <h2 className="text-2xl font-semibold text-neutral-300">No content yet!</h2>
            <p className="mt-2 text-neutral-500">Check back soon for the latest updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedContent.map((item: any) => (
              <ContentCard key={item._id} item={item} />
            ))}
          </div>
        )}
    </main>
  )
}
