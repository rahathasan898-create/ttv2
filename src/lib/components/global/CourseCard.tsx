// src/lib/components/global/CourseCard.tsx
// Last updated: 25 August 2025, 03:00 AM (AEST)
// This component has been completely rebuilt with shadcn/ui to provide a
// premium, distinct look for courses, with robust error handling.

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { urlFor } from '@/lib/content';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  // --- Robust Error Handling ---
  if (!course || !course.slug || !course.title) {
    return null;
  }

  const href = `/vibeschool/${course.slug}`;
  const image = course.coverImage as SanityImageSource | null;
  const imageUrl = image ? urlFor(image).width(800).height(450).url() : null;
  const lesson_count = course.lessons?.length || 0;

  return (
    <Link href={href} className="group block">
      <Card className="flex h-full flex-col border-white/10 bg-neutral-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            {imageUrl ? (
              <Image src={imageUrl} alt={course.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-900"><p className="text-neutral-600">No Image</p></div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col p-6">
          <Badge variant="secondary" className="mb-3 w-fit">VibeSchool Course</Badge>
          <h3 className="leading-snug text-lg font-bold text-white">{course.title}</h3>
          {course.excerpt && (<p className="mt-2 flex-grow text-sm text-neutral-400 line-clamp-3">{course.excerpt}</p>)}
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-0">
          <div className="flex items-center text-sm font-semibold text-white transition-colors group-hover:text-primary">
            Start Course
            <PlayCircle className="ml-1 h-4 w-4" />
          </div>
          <p className="text-sm text-neutral-400">{lesson_count} {lesson_count === 1 ? 'Lesson' : 'Lessons'}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
