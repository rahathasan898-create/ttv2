// File: src/app/vibeschool/page.tsx (Update this file)
// Last updated: 28 August 2024 (AEST)
// This is the main archive page for the VibeSchool pillar, refactored for
// design consistency and to include page-specific metadata.

import { getVibeSchoolCourses } from '@/lib/content';
import CourseCard from '@/lib/components/global/CourseCard';
import { Metadata } from 'next';

// Add page-specific metadata for SEO
export const metadata: Metadata = {
  title: 'VibeSchool | TickTrend Australia',
  description: 'Step-by-step courses and playbooks designed to help you master new creator skills, from editing to monetization.',
};

export default async function VibeSchoolPage() {
  const courses = await getVibeSchoolCourses();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          VibeSchool
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Step-by-step courses and playbooks designed to help you master new
          creator skills, from editing to monetization.
        </p>
      </div>

      {/* Render a grid of course cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}
