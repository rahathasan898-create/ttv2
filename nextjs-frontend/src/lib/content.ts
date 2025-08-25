// src/lib/content.ts
// Last updated: 25 August 2025, 11:25 PM (AEST)
// This file is the SOLE abstraction layer for the Sanity.io content backend.
// FIX: Added the missing 'updatePostLikeCounts' function to resolve a build error in the sync API route.

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
// A write token is required for the sync function
const sanityWriteToken = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Sanity Project ID and Dataset must be defined in .env');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

// A separate client with a write token is needed for mutations
export const sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Always use the live API for writes
    token: sanityWriteToken,
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

// --- 5. Content Mutation Functions ---

/**
 * @description Updates the like counts for multiple posts in Sanity.
 * @param {Array<{ post_id: string; like_count: number }>} likeCounts - An array of objects with post IDs and their new like counts.
 */
export async function updatePostLikeCounts(likeCounts: { post_id: string; like_count: number }[]) {
    if (!sanityWriteToken) {
        throw new Error('Sanity write token is not configured. Cannot update like counts.');
    }
    if (likeCounts.length === 0) {
        return; // Nothing to update
    }

    // Create a transaction with multiple patch operations
    const transaction = sanityWriteClient.transaction();
    likeCounts.forEach(({ post_id, like_count }) => {
        transaction.patch(post_id, {
            set: { likeCount: like_count }
        });
    });

    // Commit the transaction
    try {
        await transaction.commit();
    } catch (error) {
        console.error('Sanity transaction failed:', error);
        throw new Error('Failed to update like counts in Sanity.');
    }
}
