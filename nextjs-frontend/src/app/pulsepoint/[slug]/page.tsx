// src/app/pulsepoint/[slug]/page.tsx
// Last updated: 25 August 2025, 11:30 PM (AEST)
// FIX: Corrected the component's function signature to properly accept props,
// resolving the build-breaking TypeScript error.

import Post from '@/lib/components/global/Post'
import { getPostBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, 'pulsepoint')
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  return {
    title: `${post.title} | PulsePoint`,
    description: post.excerpt,
  }
}

// The main page component
export default async function PostPage({ params }: Props) {
  const { slug } = params
  const post = await getPostBySlug(slug, 'pulsepoint')

  if (!post) {
    notFound()
  }

  return <Post post={post} />
}
