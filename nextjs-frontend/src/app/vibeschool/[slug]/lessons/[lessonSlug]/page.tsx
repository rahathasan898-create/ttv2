// src/app/vibeschool/[slug]/lessons/[lessonSlug]/page.tsx
// Last updated: 25 August 2025, 11:35 PM (AEST)
// FIX: Proactively corrected the component's function signature to prevent
// a build error by properly typing the props for nested dynamic routes.

import CourseInteractive from '@/lib/components/vibeschool/CourseInteractive'
import { getLessonBySlugs } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string; lessonSlug: string }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getLessonBySlugs(params.slug, params.lessonSlug)
  if (!data || !data.lesson) {
    return {
      title: 'Lesson Not Found',
    }
  }
  return {
    title: `${data.lesson.title} | ${data.course.title}`,
  }
}

// The main page component
export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = params
  const data = await getLessonBySlugs(slug, lessonSlug)

  if (!data || !data.course || !data.lesson) {
    notFound()
  }

  return <CourseInteractive course={data.course} lesson={data.lesson} />
}
