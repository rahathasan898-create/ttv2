
// src/app/vibeschool/[slug]/lessons/[lessonSlug]/page.tsx
// Last updated: 25 August 2025, 01:45 AM (AEST)
// This page now correctly uses the centralized data-fetching functions from `content.ts`.

import { getLessonBySlugs } from '@/lib/content'; // <-- CORRECTED
import CourseInteractive from '@/lib/components/vibeschool/CourseInteractive';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: { slug: string; lessonSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getLessonBySlugs(params.slug, params.lessonSlug); // <-- CORRECTED
  if (!data?.lesson) return { title: 'Lesson Not Found' };
  return { title: `${data.lesson.title} | ${data.course.title}` };
}

export const revalidate = 3600;

export default async function LessonPage({ params }: Props) {
  const data = await getLessonBySlugs(params.slug, params.lessonSlug); // <-- CORRECTED
  if (!data) notFound();
  return <CourseInteractive course={data.course} lesson={data.lesson} />;
}

