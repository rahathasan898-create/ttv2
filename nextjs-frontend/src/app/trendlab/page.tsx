// src/app/trendlab/page.tsx
// Last updated: 29 August 2025, 12:10 AM (AEST)
// FIX: Corrected the prop structure passed to the PillarPage component to resolve a build error.

import { getPostsByPillar } from '@/lib/content';
import PillarPage from '@/lib/components/global/PillarPage';
import { Metadata } from 'next';
import { Post } from '@/types';

export const metadata: Metadata = {
  title: 'TrendLab | TickTrend Australia',
  description:
    "The real-time intelligence hub. We analyze what's viral, why it works, and how you can use it.",
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function TrendLabPage() {
  // Fetch data specifically for this pillar.
  const trends: Post[] = await getPostsByPillar('trendlab');

  // The PillarPage component expects a single 'pillar' object and a 'posts' array.
  // The previous code was passing 'title', 'description', and 'items' separately,
  // which caused the build to fail. This fix structures the props correctly.
  return (
    <PillarPage
      pillar={{
        title: 'TrendLab',
        description: "The real-time intelligence hub. We analyze what's viral, why it works, and how you can use it."
      }}
      posts={trends}
    />
  );
}
