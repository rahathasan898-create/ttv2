// src/lib/components/global/Resource.tsx
// Last updated: 25 August 2025, 02:45 AM (AEST)
// Refactored to use shadcn/ui and robust error handling.
// FIX: Confirmed component correctly destructures props after type definition update.

import { Resource as ResourceType } from '@/types';
import { urlFor } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Download, Link as LinkIcon } from 'lucide-react';
import PortableTextComponent from './PortableTextComponent';
import GoBackButton from './GoBackButton';
import ContentGate from './ContentGate';

export default function Resource({ resource }: { resource: ResourceType }) {
  if (!resource || !resource.title) return null;

  const { title, previewImage, resourceType, downloadLink, linkedPost, body, accessTier } = resource;
  const imageUrl = previewImage ? urlFor(previewImage).width(1200).height(630).url() : null;

  const renderAction = () => {
    if (resourceType === 'download' && downloadLink) {
      return (
        <Button asChild size="lg">
          <a href={downloadLink} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-5 w-5" />Download Now</a>
        </Button>
      );
    }
    if (resourceType === 'link' && linkedPost?.slug) {
      return (
        <Button asChild size="lg">
          <Link href={`/pulsepoint/${linkedPost.slug}`}><LinkIcon className="mr-2 h-5 w-5" />View Guide</Link>
        </Button>
      );
    }
    return <p className="text-neutral-500">No action available for this resource.</p>;
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8"><GoBackButton /></div>
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-white/10 bg-neutral-900/50">
          {imageUrl && (
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full"><Image src={imageUrl} alt={title} fill className="object-cover" /></div>
            </CardHeader>
          )}
          <CardContent className="p-8 md:p-12">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
            <div className="prose prose-invert prose-lg mt-6 max-w-none">
                {body ? <PortableTextComponent value={body} /> : <p>No description available.</p>}
            </div>
            <div className="mt-10">
              <ContentGate accessTier={accessTier || 'Free Member'}>
                <div className="rounded-lg border border-primary/20 bg-primary/10 p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">Get Full Access</h3>
                  <p className="mt-2 text-neutral-400">This resource is available for you to download or view now.</p>
                  <div className="mt-6">{renderAction()}</div>
                </div>
              </ContentGate>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
