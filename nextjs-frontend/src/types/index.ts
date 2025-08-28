/**
 * File: src/types/index.ts
 * Last Modified: 28 August 2025, 11:45 PM (AEST)
 *
 * FIX: Added the missing 'excerpt' property to the Resource interface. This resolves
 * the critical TypeScript error that was causing the Vercel deployment to fail.
 */

import { PortableTextBlock } from 'sanity';

// Base type for any Sanity document reference
export interface SanityReference {
  _ref: string;
  _type: string;
}

// Represents an image asset from Sanity
export interface SanityImage {
  _type: 'image';
  asset: SanityReference;
}

// Represents a slug from Sanity
export interface Slug {
  _type: 'slug';
  current: string;
}

// Represents an Author document
export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: string;
}

// Represents a Topic document
export interface Topic {
  _id: string;
  title: string;
}

// Represents a Platform document
export interface Platform {
  _id: string;
  title: string;
}

// Represents the Taxonomy object within a Post or other content type
export interface Taxonomy {
  contentPillars?: string[];
  topics?: Topic[];
  platforms?: Platform[];
}

// Represents the Metrics object within a Post or other content type
export interface Metrics {
  likeCount?: number;
  viewCount?: number;
}

// Represents a Post document
export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: Slug;
  mainImage?: SanityImage;
  author?: Author;
  publishedAt: string;
  updatedAt?: string;
  displayDate?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  taxonomy?: Taxonomy;
  metrics?: Metrics;
}

// Represents a Course document
export interface Course {
  _id: string;
  _type: 'course';
  title: string;
  slug: Slug;
  coverImage?: SanityImage;
  description?: string;
  lessons?: (Lesson | Post)[];
}

// Represents a Lesson document
export interface Lesson {
  _id: string;
  _type: 'lesson';
  title: string;
  slug: Slug;
  isPreview?: boolean;
  body?: PortableTextBlock[];
}

// Represents a Resource document
export interface Resource {
  _id: string;
  _type: 'resource';
  title: string;
  slug: Slug;
  previewImage?: SanityImage;
  resourceType?: 'download' | 'link';
  downloadLink?: string;
  linkedPost?: Post;
  body?: PortableTextBlock[];
  accessTier?: 'Public' | 'Free Member' | 'Premium';
  excerpt?: string; // <-- This is the fix
}
