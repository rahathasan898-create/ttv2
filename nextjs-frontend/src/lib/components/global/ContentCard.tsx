// src/lib/components/global/ContentCard.tsx
// Last updated: 25 August 2025, 02:30 AM (AEST)
// Your new, robust ContentCard component. It is the standard for all other components.

import Image from 'next/image';
import Link from 'next/link';
import { Post, Course, Resource } from '@/types';
import { urlFor } from '@/lib/content';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type Props = { item: Post | Course | Resource };

const getHref = (item: Post | Course | Resource): string => {
  if (!item.slug) return '#';
  switch (item._type) {
    case 'post':
      if (item.taxonomy?.contentPillars?.includes('trendlab')) return `/trendlab/${item.slug}`;
      return `/pulsepoint/${item.slug}`;
    case 'course':
      return `/vibeschool/${item.slug}`;
    case 'resource':
      return `/resources/${item.slug}`;
    default:
      return '#';
  }
};

const getImage = (item: Post | Course | Resource): SanityImageSource | null => {
  if (item._type === 'post' && item.mainImage) return item.mainImage;
  if (item._type === 'course' && item.coverImage) return item.coverImage;
  if (item._type === 'resource' && item.previewImage) return item.previewImage;
  return null;
};

const getPillarLabel = (item: Post | Course | Resource): string => {
  if (item._type === 'post' && item.taxonomy?.contentPillars?.includes('trendlab')) return 'TrendLab Analysis';
  if (item._type === 'post') return 'PulsePoint Article';
  if (item._type === 'course') return 'VibeSchool Course';
  if (item._type === 'resource') return 'Resource';
  return 'Content';
};

export default function ContentCard({ item }: Props) {
  if (!item || !item.slug || !item.title) return null;

  const href = getHref(item);
  const image = getImage(item);
  const imageUrl = image ? urlFor(image).width(800).height(450).url() : null;
  const pillarLabel = getPillarLabel(item);

  return (
    <Link href={href} className="group block">
      <Card className="flex h-full flex-col border-white/10 bg-neutral-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            {imageUrl ? (
              <Image src={imageUrl} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-900"><p className="text-neutral-600">No Image</p></div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col p-6">
          <Badge variant="secondary" className="mb-3 w-fit">{pillarLabel}</Badge>
          <h3 className="leading-snug text-lg font-bold text-white">{item.title}</h3>
          {item.excerpt && (<p className="mt-2 flex-grow text-sm text-neutral-400 line-clamp-3">{item.excerpt}</p>)}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="flex items-center text-sm font-semibold text-white transition-colors group-hover:text-primary">Read More<ArrowUpRight className="ml-1 h-4 w-4" /></div>
        </CardFooter>
      </Card>
    </Link>
  );
}
