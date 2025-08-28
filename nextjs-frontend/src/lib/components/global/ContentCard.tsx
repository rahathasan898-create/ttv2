/**
 * File: src/lib/components/global/ContentCard.tsx
 * Last Modified: 29 August 2025, 12:01 AM (AEST)
 *
 * FIX: The component is now fully generic. It accepts a union type of Post,
 * Resource, or Course, and correctly handles the different property names
 * (e.g., mainImage, previewImage, coverImage) for each type. This resolves
 * all TypeScript errors efficiently in one place.
 */

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/content';
import { Post, Resource, Course } from '@/types'; // Import all content types
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Create a union type for any piece of content the card might display
type ContentItem = Post | Resource | Course;

type Props = {
  content?: ContentItem;
  item?: ContentItem;
};

export default function ContentCard({ content, item }: Props) {
  // Use whichever prop is provided. This makes the component robust.
  const data = content || item;

  // If no data is passed, don't render anything.
  if (!data) {
    return null;
  }

  // Handle different image property names across types
  const imageSource = (data as Post).mainImage || (data as Resource).previewImage || (data as Course).coverImage;
  const imageUrl = imageSource ? urlFor(imageSource).url() : null;

  // Handle different excerpt/description property names
  const excerpt = (data as Post).excerpt || (data as Course).description;

  // Determine the correct link URL based on the content type
  const pillar = (data as Post).taxonomy?.contentPillars?.[0] || data._type;
  const linkUrl = `/${pillar}/${data.slug?.current || ''}`;

  return (
    <Link href={linkUrl} className="group flex h-full">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data.title || 'Content image'}
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
            {data.title || 'Untitled Post'}
          </h3>
        </CardHeader>
        {excerpt && (
          <CardContent className="flex-grow">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {excerpt}
            </p>
          </CardContent>
        )}

        {/* Footer with Pillar Badge */}
        <CardFooter>
          {(data as Post).taxonomy?.contentPillars?.[0] && (
            <Badge variant="secondary">
              {(data as Post).taxonomy?.contentPillars?.[0]}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
