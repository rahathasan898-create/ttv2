// src/lib/content.ts
// Last updated: 25 August 2025, 03:00 AM (AEST)
// This file is the SOLE abstraction layer for the Sanity.io content backend.
// It initializes the client, provides the image URL builder, and exports all
// data-fetching functions. All other components MUST import from this file only.
// IMPROVEMENT: Added a getFeedContent function to aggregate all content types for the main feed.

import { createClient, groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Post, Course, Resource, Lesson } from '@/types';

// --- 1. Sanity Client Configuration ---
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-25';
export const useCdn = process.env.NODE_ENV === 'production';

if (!projectId || !dataset) {
  throw new Error('Sanity Project ID and Dataset must be defined in .env');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

// --- 2. Image URL Builder ---
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

// --- 3. GROQ Queries ---
const postsByPillarQuery = groq`
  *[_type == "post" && $pillar in taxonomy.contentPillars] | order(publishedAt desc) {
    _id, _type, title, "slug": slug.current, "mainImage": mainImage, "excerpt": excerpt, "publishedAt": publishedAt, "taxonomy": taxonomy
  }`;

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && $pillar in taxonomy.contentPillars][0] {
    ..., author->, "taxonomy": { ...taxonomy, topics[]->, platforms[]-> }
  }`;

const postSlugsByPillarQuery = groq`
  *[_type == "post" && defined(slug.current) && $pillar in taxonomy.contentPillars][]{ "slug": slug.current }`;

const allResourcesQuery = groq`*[_type == "resource"] | order(_createdAt desc) { _id, _type, title, "slug": slug.current, "previewImage": previewImage, "excerpt": body, "taxonomy": taxonomy }`;
const resourceBySlugQuery = groq`*[_type == "resource" && slug.current == $slug][0]`;
const allResourceSlugsQuery = groq`*[_type == "resource" && defined(slug.current)][]{ "slug": slug.current }`;

const allCoursesQuery = groq`*[_type == "course"] | order(_createdAt desc) { _id, _type, title, "slug": slug.current, "coverImage": coverImage, "excerpt": description, "taxonomy": taxonomy }`;
const courseBySlugQuery = groq`*[_type == "course" && slug.current == $slug][0] { ..., lessons[]->{_id, _type, title, "slug": slug.current, isPreview} }`;
const allCourseSlugsQuery = groq`*[_type == "course" && defined(slug.current)][]{ "slug": slug.current }`;

const lessonBySlugsQuery = groq`
  *[_type == "course" && slug.current == $courseSlug][0] {
    "course": { _id, title, "slug": slug.current, lessons[]->{_id, title, "slug": slug.current} },
    "lesson": lessons[]->[slug.current == $lessonSlug][0] { _id, title, "slug": slug.current, body }
  }`;

const feedQuery = groq`
  *[(_type == "post" || _type == "course" || _type == "resource") && defined(slug.current)] | order(select(
    _type == "post" => publishedAt,
    _createdAt
  ) desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    "mainImage": select(
      _type == "post" => mainImage,
      _type == "course" => coverImage,
      _type == "resource" => previewImage
    ),
    "excerpt": select(
      _type == "post" => excerpt,
      _type == "course" => description,
      _type == "resource" => body
    ),
    "publishedAt": select(
      _type == "post" => publishedAt,
      _createdAt
    ),
    "taxonomy": taxonomy
  }`;

// --- 4. Content Fetching Functions ---

export async function getPostsByPillar(pillar: string): Promise<Post[]> {
  return sanityClient.fetch(postsByPillarQuery, { pillar });
}

export async function getPostBySlug(slug: string, pillar: string): Promise<Post | null> {
  return sanityClient.fetch(postBySlugQuery, { slug, pillar });
}

export async function getAllPostSlugsByPillar(pillar: string): Promise<{ slug: string }[]> {
  return sanityClient.fetch(postSlugsByPillarQuery, { pillar });
}

export async function getAllResources(): Promise<Resource[]> {
  return sanityClient.fetch(allResourcesQuery);
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  return sanityClient.fetch(resourceBySlugQuery, { slug });
}

export async function getAllResourceSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(allResourceSlugsQuery);
}

export async function getAllCourses(): Promise<Course[]> {
  return sanityClient.fetch(allCoursesQuery);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return sanityClient.fetch(courseBySlugQuery, { slug });
}

export async function getAllCourseSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(allCourseSlugsQuery);
}

export async function getLessonBySlugs(courseSlug: string, lessonSlug: string): Promise<{ course: Course; lesson: Lesson } | null> {
  const result = await sanityClient.fetch(lessonBySlugsQuery, { courseSlug, lessonSlug });
  // Ensure the nested properties exist before returning
  return (result && result.course && result.lesson) ? { course: result.course, lesson: result.lesson } : null;
}

export async function getFeedContent(): Promise<(Post | Course | Resource)[]> {
    return sanityClient.fetch(feedQuery);
}
