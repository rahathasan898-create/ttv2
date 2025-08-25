// src/lib/components/global/PortableTextComponent.tsx
// Last updated: 24 August 2025, 02:15 AM (AEST)
// A centralized component for rendering Sanity's Portable Text block content.
// It defines custom renderers for different block types (e.g., images) and marks (e.g., links).

import { urlFor } from '@/lib/content';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

const customComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-8 h-96 w-full">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog Post Image'}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children?: any; value?: any }) => {
      if (!value?.href) {
        return <span>{children}</span>;
      }
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },
  },
};

interface PortableTextComponentProps {
  value: any;
}

export default function PortableTextComponent({ value }: PortableTextComponentProps) {
  return <PortableText value={value} components={customComponents} />;
}
