// src/lib/components/global/ResourceCard.tsx
// Last updated: 26 August 2025, 12:02 AM (AEST)
// FIX: Corrected the import path for the 'urlFor' function to resolve a build error.

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/content' // Corrected import path
import { Download, Link as LinkIcon } from 'lucide-react'

export default function ResourceCard({ resource }: { resource: any }) {
  const { title, previewImage, resourceType } = resource

  return (
    <Card className="overflow-hidden border-white/10 bg-neutral-900/50 transition-all hover:border-white/20">
      <CardHeader className="p-0">
        <Link href={`/resources/${resource.slug.current}`}>
          <div className="relative aspect-video w-full">
            {previewImage ? (
              <Image
                src={urlFor(previewImage).width(600).height(338).url()}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                <p className="text-neutral-500">No Image</p>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-2">
            {resourceType === 'download' ? (
              <Download className="h-4 w-4" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
            {resourceType?.charAt(0).toUpperCase() + resourceType?.slice(1)}
          </Badge>
        </div>
        <h3 className="mt-4 font-semibold text-white">
          <Link href={`/resources/${resource.slug.current}`}>{title}</Link>
        </h3>
      </CardContent>
    </Card>
  )
}
