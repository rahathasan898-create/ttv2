// src/app/pulsepoint/[slug]/page.tsx
// Last updated: 25 August 2025, 01:45 AM (AEST)
// This page now correctly uses the centralized data-fetching functions from `content.ts`.

import { getAllPostSlugsByPillar, getPostBySlug } from '@/lib/content'; // <-- CORRECTED
import PostComponent from '@/lib/components/global/Post';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, 'pulsepoint'); // <-- CORRECTED
  if (!post) return { title: 'Post Not Found' };
  return { title: `${post.title} | TickTrend Australia`, description: post.excerpt };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugsByPillar('pulsepoint'); // <-- CORRECTED
  return slugs.map((s) => ({ slug: s.slug }));
}

export const revalidate = 600;

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug, 'pulsepoint'); // <-- CORRECTED
  if (!post) notFound();
  return <PostComponent post={post} />;
}
