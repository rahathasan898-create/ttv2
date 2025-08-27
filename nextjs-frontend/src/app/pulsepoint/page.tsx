// File: src/app/pulsepoint/page.tsx (Update this file)
// Last updated: 28 August 2024 (AEST)
// This is the main archive page for the PulsePoint pillar. It has been
// refactored to use a consistent layout and includes page-specific metadata.

import { getPostsByPillar } from '@/lib/content';
import ContentCard from '@/lib/components/global/ContentCard';
import { Metadata } from 'next';

// Add page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'PulsePoint | TickTrend Australia',
  description: 'In-depth articles, creator case studies, and strategic guides to help you grow your audience and build your brand.',
};

export default async function PulsePointPage() {
  const posts = await getPostsByPillar('pulsepoint');

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          PulsePoint
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          In-depth articles, creator case studies, and strategic guides to help
          you grow your audience and build your brand.
        </p>
      </div>

      {/* Render a grid of content cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts && posts.length > 0 ? (
          posts.map((post) => <ContentCard key={post._id} content={post} />)
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}
