// File: src/app/studio/page.tsx (Update this file)
// Last updated: 28 August 2025, 3:18 AM (AEST)
// This file renders the Sanity Studio content management interface.
// It has been updated to be consistent with the V3 layout and metadata practices.

import { Metadata } from 'next';
import StudioPageContent from '@/lib/components/studio/StudioPageContent';

// Add page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'Creator Studio | TickTrend Australia',
  description: 'Manage all content for the TickTrend Australia platform.',
};

export default function StudioPage() {
  return <StudioPageContent />;
}
