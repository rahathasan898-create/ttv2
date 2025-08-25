// src/lib/components/vibeschool/CourseInteractive.tsx
// Last updated: 24 August 2025, 03:15 AM (AEST)
// A component that provides an interactive learning experience, showing the
// current lesson content alongside a navigable list of all lessons in the course.

'use client';

import { Course, Lesson } from '@/types';
import Link from 'next/link';
import PortableTextComponent from '../global/PortableTextComponent';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Props {
  course: Course;
  lesson: Lesson;
}

export default function CourseInteractive({ course, lesson }: Props) {
  const pathname = usePathname();

  const LessonList = () => (
    <nav>
      <ul>
        {course.lessons?.map((l, index) => (
          <li key={l._id}>
            <Link
              href={`/vibeschool/${course.slug.current}/lessons/${l.slug.current}`}
              className={`flex items-center space-x-3 rounded-md p-3 text-sm font-medium transition-colors ${
                pathname.endsWith(l.slug.current)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-xs">
                {index + 1}
              </div>
              <span>{l.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Desktop Sidebar */}
      <aside className="hidden h-full w-80 flex-shrink-0 border-r border-neutral-800 lg:block">
        <ScrollArea className="h-full p-4">
          <h2 className="mb-4 text-lg font-semibold text-white">
            {course.title}
          </h2>
          <LessonList />
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <ScrollArea className="h-full">
          <div className="container mx-auto max-w-3xl p-4 py-8 md:p-8">
            <header className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-white md:text-4xl">
                {lesson.title}
              </h1>
              {/* Mobile Menu Trigger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-black">
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold text-white">
                        {course.title}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <LessonList />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </header>
            <div className="prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
              {lesson.body ? (
                <PortableTextComponent value={lesson.body} />
              ) : (
                <p className="text-neutral-400">
                  This lesson content is coming soon.
                </p>
              )}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
