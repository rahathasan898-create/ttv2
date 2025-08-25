
// src/app/vibeschool/[slug]/page.tsx
// Last updated: 25 August 2025, 01:45 AM (AEST)
// This page now correctly uses the centralized data-fetching functions from `content.ts`.

import { getCourseBySlug, getAllCourseSlugs } from '@/lib/content'; // <-- CORRECTED
import CourseComponent from '@/lib/components/vibeschool/Course';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug); // <-- CORRECTED
  if (!course) return { title: 'Course Not Found' };
  return { title: course.title, description: course.description };
}

export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs(); // <-- CORRECTED
  return slugs.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600;

export default async function CoursePage({ params }: Props) {
  const course = await getCourseBySlug(params.slug); // <-- CORRECTED
  if (!course) notFound();
  return <CourseComponent course={course} />;
}

