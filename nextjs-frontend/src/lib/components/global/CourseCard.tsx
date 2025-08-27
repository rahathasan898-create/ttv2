// File: src/lib/components/global/CourseCard.tsx (Update this file)
// Last updated: 28 August 2025, 3:16 AM (AEST)
// This component displays a preview of a single VibeSchool course.
// It has been refactored to align with the V3 design system.

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/content';
import { Course } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap } from 'lucide-react';

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  const imageUrl = course?.coverImage ? urlFor(course.coverImage)?.url() : null;
  const linkUrl = `/vibeschool/${course?.slug?.current || ''}`;

  return (
    <Link href={linkUrl} className="group flex h-full">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={course?.title || 'Course image'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
               <GraduationCap className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Title & Description */}
        <CardHeader>
          <h3 className="line-clamp-2 font-bold leading-snug">
            {course?.title || 'Untitled Course'}
          </h3>
        </CardHeader>
        {course?.description && (
          <CardContent className="flex-grow">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {course.description}
            </p>
          </CardContent>
        )}

        <CardFooter>
          <Badge>VibeSchool Course</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
