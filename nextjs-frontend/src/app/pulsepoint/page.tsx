// src/app/pulsepoint/page.tsx
// Last updated: 25 August 2025, 12:30 AM (AEST)
// The main archive page for the PulsePoint content pillar. This component has
// been refactored to use the generic PillarPage component, simplifying its
// structure and delegating the rendering logic.

import { getPostsByPillar } from '@/lib/content';
import PillarPage from '@/lib/components/global/PillarPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PulsePoint | TickTrend Australia',
  description:
    'The latest TikTok trends, news, and growth insights for the Australian market.',
};

export const revalidate = 600; // Revalidate every 10 minutes

export default async function PulsePointPage() {
  // Fetch data specifically for this pillar.
  const posts = await getPostsByPillar('pulsepoint');

  // Render the reusable PillarPage component with pillar-specific props.
  return (
    <PillarPage
      title="PulsePoint"
      description="In-depth, strategic content. This is our publication for topic breakdowns and evergreen guides."
      items={posts}
    />
  );
}
