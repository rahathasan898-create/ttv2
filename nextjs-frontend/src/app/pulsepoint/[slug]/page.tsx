
// File Path: src/app/pulsepoint/[slug]/page.tsx
// Last updated: 25 August 2025, 11:55 PM (AEST)
// FIX: Updated component signature to handle props as a Promise, aligning
// with the project's specific Next.js configuration to resolve a build error.

import Post from '@/lib/components/global/Post'
import { getPostBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, 'pulsepoint')
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} | PulsePoint`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'pulsepoint')

  if (!post) {
    notFound()
  }

  return <Post post={post} />
}
