// File Path: src/app/resources/[slug]/page.tsx
// Last updated: 25 August 2025, 11:55 PM (AEST)
// FIX: Updated component signature to handle props as a Promise.

import Resource from '@/lib/components/global/Resource'
import { getResourceBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resource = await getResourceBySlug(resolvedParams.slug)
  if (!resource) {
    return { title: 'Resource Not Found' }
  }
  return {
    title: `${resource.title} | Resources`,
    description: resource.excerpt,
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  return <Resource resource={resource} />
}
