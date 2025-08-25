// File Path: src/app/vibeschool/[slug]/lessons/[lessonSlug]/page.tsx
// Last updated: 25 August 2025, 11:55 PM (AEST)
// FIX: Updated component signature to handle props as a Promise.

import CourseInteractive from '@/lib/components/vibeschool/CourseInteractive'
import { getLessonBySlugs } from '@/lib/content'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string; lessonSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getLessonBySlugs(resolvedParams.slug, resolvedParams.lessonSlug)
  
  if (!data || !data.lesson) {
    return { title: 'Lesson Not Found' }
  }
  return {
    title: `${data.lesson.title} | ${data.course.title}`,
  }
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;
  const data = await getLessonBySlugs(slug, lessonSlug)

  if (!data || !data.course || !data.lesson) {
    notFound()
  }

  return <CourseInteractive course={data.course} lesson={data.lesson} />
}
