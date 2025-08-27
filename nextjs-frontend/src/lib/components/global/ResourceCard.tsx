// File: src/lib/components/global/ResourceCard.tsx (Update this file)
// Last updated: 28 August 2025, 3:17 AM (AEST)
// This component displays a preview of a single downloadable resource.
// It has been refactored to align with the V3 design system.

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/content';
import { Resource } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Link as LinkIcon } from 'lucide-react';

type Props = {
  resource: Resource;
};

export default function ResourceCard({ resource }: Props) {
  const imageUrl = resource?.previewImage ? urlFor(resource.previewImage)?.url() : null;
  const linkUrl = `/resources/${resource?.slug?.current || ''}`;

  return (
    <Link href={linkUrl} className="group flex h-full">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={resource?.title || 'Resource image'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {resource?.resourceType === 'download' ? (
                <Download className="h-12 w-12 text-muted-foreground" />
              ) : (
                <LinkIcon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <CardHeader className="flex-grow">
          <h3 className="line-clamp-2 font-bold leading-snug">
            {resource?.title || 'Untitled Resource'}
          </h3>
        </CardHeader>

        {/* Footer with Resource Type Badge */}
        <CardFooter>
          {resource?.resourceType && (
            <Badge variant="outline">
              {resource.resourceType === 'download' ? 'Download' : 'Guide'}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
