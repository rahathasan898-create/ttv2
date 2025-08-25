// File Path: src/app/vibeschool/[slug]/page.tsx
// Last updated: 25 August 2025, 11:55 PM (AEST)
// FIX: Updated component signature to handle props as a Promise.

import Course from '@/lib/components/vibeschool/Course'
import { getCourseBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourseBySlug(resolvedParams.slug)
  if (!course) {
    return { title: 'Course Not Found' }
  }
  return {
    title: `${course.title} | VibeSchool`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return <Course course={course} />
}
