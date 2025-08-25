// src/types/index.ts
// Last updated: 25 August 2025, 02:30 AM (AEST)
// This file contains all TypeScript interfaces for the Sanity.io data models.
// FIX: Added missing properties to the Resource interface to match the data model
// and prevent destructuring errors in components.

import type { Image, PortableTextBlock } from 'sanity';

// --- Reusable Object Types ---
export interface Slug {
  _type: 'slug';
  current: string;
}

export interface Taxonomy {
  _type: 'taxonomy';
  contentPillars?: string[];
  topics?: Topic[];
  platforms?: Platform[];
}

// --- Document Types ---

export interface Author {
  _type: 'author';
  name: string;
  image?: Image;
}

export interface Topic {
  _type: 'topic';
  title: string;
}

export interface Platform {
  _type: 'platform';
  title: string;
}

export interface Lesson {
  _id: string;
  _type: 'lesson';
  title: string;
  slug: Slug;
  body?: PortableTextBlock[];
  isPreview?: boolean;
}

export interface Post {
  _id:string;
  _type: 'post';
  title: string;
  slug: Slug;
  mainImage?: Image;
  author?: Author;
  publishedAt: string;
  body?: PortableTextBlock[];
  excerpt?: string;
  taxonomy?: Taxonomy;
  isPremium?: boolean;
}

export interface Course {
  _id: string;
  _type: 'course';
  title: string;
  slug: Slug;
  coverImage?: Image;
  description?: string;
  excerpt?: string;
  taxonomy?: Taxonomy;
  lessons?: Lesson[];
}

export interface Resource {
  _id: string;
  _type: 'resource';
  title: string;
  slug: Slug;
  previewImage?: Image;
  excerpt?: string;
  taxonomy?: Taxonomy;
  // Added missing properties
  resourceType: 'download' | 'link';
  downloadLink?: string;
  linkedPost?: {
    slug: string;
  };
  body?: PortableTextBlock[];
  accessTier?: 'Free Member' | 'Pro Member';
}
