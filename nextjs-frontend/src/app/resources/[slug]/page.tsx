// src/app/resources/[slug]/page.tsx
// Last updated: 25 August 2025, 11:35 PM (AEST)
// FIX: Proactively corrected the component's function signature to prevent
// a build error by properly typing the props.

import Resource from '@/lib/components/global/Resource'
import { getResourceBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = await getResourceBySlug(params.slug)
  if (!resource) {
    return {
      title: 'Resource Not Found',
    }
  }
  return {
    title: `${resource.title} | Resources`,
    description: resource.excerpt,
  }
}

// The main page component
export default async function ResourcePage({ params }: Props) {
  const { slug } = params
  const resource = await getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  return <Resource resource={resource} />
}
