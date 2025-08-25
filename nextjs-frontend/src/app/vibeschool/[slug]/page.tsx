// src/app/vibeschool/[slug]/page.tsx
// Last updated: 25 August 2025, 11:35 PM (AEST)
// FIX: Proactively corrected the component's function signature to prevent
// a build error by properly typing the props.

import Course from '@/lib/components/vibeschool/Course'
import { getCourseBySlug } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug)
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }
  return {
    title: `${course.title} | VibeSchool`,
    description: course.description,
  }
}

// The main page component
export default async function CoursePage({ params }: Props) {
  const { slug } = params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return <Course course={course} />
}
