
// src/lib/components/vibeschool/Course.tsx
// Last updated: 25 August 2025, 02:45 AM (AEST)
// Refactored with shadcn/ui and robust error handling.

import { Course as CourseType } from '@/types';
import { urlFor } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, PlayCircle, AlertTriangle } from 'lucide-react';
import GoBackButton from '../global/GoBackButton';

export default function Course({ course }: { course: CourseType }) {
  if (!course || !course.title) return null;

  const { title, coverImage, description, lessons, slug } = course;
  const imageUrl = coverImage ? urlFor(coverImage).width(1200).height(630).url() : null;
  const firstLessonSlug = lessons?.[0]?.slug;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8"><GoBackButton /></div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300">{description || "No description provided."}</p>
          {firstLessonSlug ? (
            <Button asChild size="lg" className="mt-8">
              <Link href={`/vibeschool/${slug}/lessons/${firstLessonSlug}`}><PlayCircle className="mr-2 h-5 w-5" />Start Course</Link>
            </Button>
          ) : (
            <div className="mt-8 flex items-center gap-2 rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-300">
                <AlertTriangle className="h-5 w-5" />
                <span>No lessons are available for this course yet.</span>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-white/10 bg-neutral-900/50">
            {imageUrl && (
              <div className="relative aspect-video w-full"><Image src={imageUrl} alt={title} fill className="object-cover" /></div>
            )}
            <CardContent className="p-6">
              <h3 className="font-semibold text-white">Lessons in this course</h3>
              {lessons && lessons.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {lessons.map((lesson) => (
                    <li key={lesson._id} className="flex items-start">
                      <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-neutral-300">{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-neutral-400">Coming soon.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
