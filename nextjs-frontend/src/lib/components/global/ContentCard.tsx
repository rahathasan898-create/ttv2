// File: src/lib/components/global/ContentCard.tsx (Update this file)
// Last updated: 28 August 2025, 3:15 AM (AEST)
// This component displays a preview of a single piece of content, like a blog post.
// It has been refactored to align with the V3 design system, featuring improved
// styling, theme-awareness, and robust data handling.

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/content';
import { Post } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  content: Post; // Can be a Post, Trend, etc.
};

export default function ContentCard({ content }: Props) {
  // Safely access data with optional chaining
  const imageUrl = content?.mainImage ? urlFor(content.mainImage)?.url() : null;
  const linkUrl = `/${content?.taxonomy?.contentPillars?.[0] || 'post'}/${content?.slug?.current || ''}`;

  return (
    <Link href={linkUrl} className="group flex h-full">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={content?.title || 'Content image'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs text-muted-foreground">No Image</span>
            </div>
          )}
        </div>

        {/* Title & Excerpt */}
        <CardHeader>
          <h3 className="line-clamp-2 font-bold leading-snug">
            {content?.title || 'Untitled Post'}
          </h3>
        </CardHeader>
        {content?.excerpt && (
          <CardContent className="flex-grow">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {content.excerpt}
            </p>
          </CardContent>
        )}

        {/* Footer with Pillar Badge */}
        <CardFooter>
          {content?.taxonomy?.contentPillars?.[0] && (
            <Badge variant="secondary">
              {content.taxonomy.contentPillars[0]}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
