
// src/app/vibeschool/page.tsx
// Last updated: 25 August 2025, 03:00 AM (AEST)
// This page now uses the centralized `getAllCourses` function and renders the
// new, rebuilt `CourseCard` component for a consistent, premium UI.

import { getAllCourses } from '@/lib/content';
import CourseCard from '@/lib/components/global/CourseCard'; // <-- CORRECTED IMPORT
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VibeSchool | TickTrend Australia',
  description: 'The Playbook Library. Step-by-step courses to master the creator economy.',
};

export const revalidate = 600;

export default async function VibeSchoolPage() {
  const courses = await getAllCourses();

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
          VibeSchool
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
          The Playbook Library. Step-by-step courses to master the creator economy.
        </p>
      </div>

      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
          <h2 className="text-2xl font-semibold text-neutral-300">
            No courses available yet!
          </h2>
          <p className="mt-2 text-neutral-500">
            Our team is working on it. Please check back soon.
          </p>
        </div>
      )}
    </main>
  );
}
