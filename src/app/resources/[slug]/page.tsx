
// src/app/resources/[slug]/page.tsx
// Last updated: 25 August 2025, 01:45 AM (AEST)
// This page now correctly uses the centralized data-fetching functions from `content.ts`.

import { getAllResourceSlugs, getResourceBySlug } from '@/lib/content'; // <-- CORRECTED
import ResourceComponent from '@/lib/components/global/Resource';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = await getResourceBySlug(params.slug); // <-- CORRECTED
  if (!resource) return { title: 'Resource Not Found' };
  return { title: `${resource.title} | TickTrend Australia`, description: resource.excerpt };
}

export async function generateStaticParams() {
  const slugs = await getAllResourceSlugs(); // <-- CORRECTED
  return slugs.map((s) => ({ slug: s.slug }));
}

export const revalidate = 600;

export default async function ResourcePage({ params }: Props) {
  const resource = await getResourceBySlug(params.slug); // <-- CORRECTED
  if (!resource) notFound();
  return <ResourceComponent resource={resource} />;
}
