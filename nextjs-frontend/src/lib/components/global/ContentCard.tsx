/**
 * File: src/lib/components/global/ContentCard.tsx
 * Last Modified: 28 August 2025, 11:55 PM (AEST)
 *
 * FIX: Made the component more flexible by accepting either 'content' or 'item' as a prop.
 * This resolves the TypeScript error across multiple pages (like /feed and /resources)
 * in a single, efficient change.
 */

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/content';
import { Post } from '@/types'; // Assuming Post, Resource, etc. are compatible
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  content?: Post; // Accept 'content' prop
  item?: Post;    // OR accept 'item' prop
};

export default function ContentCard({ content, item }: Props) {
  // Use whichever prop is provided. This makes the component robust.
  const data = content || item;

  // If no data is passed, don't render anything.
  if (!data) {
    return null;
  }

  const imageUrl = data?.mainImage ? urlFor(data.mainImage)?.url() : null;
  const linkUrl = `/${data?.taxonomy?.contentPillars?.[0] || 'post'}/${data?.slug?.current || ''}`;

  return (
    <Link href={linkUrl} className="group flex h-full">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data?.title || 'Content image'}
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
            {data?.title || 'Untitled Post'}
          </h3>
        </CardHeader>
        {data?.excerpt && (
          <CardContent className="flex-grow">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {data.excerpt}
            </p>
          </CardContent>
        )}

        {/* Footer with Pillar Badge */}
        <CardFooter>
          {data?.taxonomy?.contentPillars?.[0] && (
            <Badge variant="secondary">
              {data.taxonomy.contentPillars[0]}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
