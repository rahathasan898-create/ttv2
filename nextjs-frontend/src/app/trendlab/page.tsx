// src/app/trendlab/page.tsx
// Last updated: 25 August 2025, 12:30 AM (AEST)
// The main archive page for the TrendLab content pillar. This component has
// been refactored to use the generic PillarPage component.

import { getPostsByPillar } from '@/lib/content';
import PillarPage from '@/lib/components/global/PillarPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TrendLab | TickTrend Australia',
  description:
    "The real-time intelligence hub. We analyze what's viral, why it works, and how you can use it.",
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function TrendLabPage() {
  // Fetch data specifically for this pillar.
  const trends = await getPostsByPillar('trendlab');

  // Render the reusable PillarPage component with pillar-specific props.
  return (
    <PillarPage
      title="TrendLab"
      description="The real-time intelligence hub. We analyze what's viral, why it works, and how you can use it."
      items={trends}
    />
  );
}
