// File: src/lib/components/global/Post.tsx (Update this file)
// Last updated: 28 August 2025, 02:55 AM (AEST)
// This component renders the main content of a blog post. It has been
// refactored to use a modern, two-column layout on desktop, with a sticky
// sidebar for metadata and future components like a Table of Contents.
// It now includes robust handling for missing or optional data.

import Image from 'next/image';
import { urlFor } from '@/lib/content';
import { Post as PostType } from '@/types';
import PortableTextComponent from './PortableTextComponent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  // Safely access mainImage with optional chaining
  const imageUrl = post?.mainImage ? urlFor(post.mainImage)?.url() : null;
  
  // FIX: Correctly access the 'image' property on the author object.
  // Add robust optional chaining to prevent errors if author or image is missing.
  const authorImageUrl = post?.author?.image
    ? urlFor(post.author.image)?.url()
    : null;

  // Use optional chaining for dates and provide a fallback to the current date
  const displayDate = post?.displayDate || post?.publishedAt || new Date().toISOString();

  return (
    <article className="container relative mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 lg:grid-cols-3">
        {/* --- Main Content Column --- */}
        <div className="prose prose-lg dark:prose-invert lg:col-span-2">
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              {post?.title || 'Untitled Post'}
            </h1>
            {/* Only render excerpt if it exists */}
            {post?.excerpt && (
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            )}
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={post?.title || 'Post image'}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          )}

          {/* Post Body */}
          {post?.body && <PortableTextComponent value={post.body} />}
        </div>

        {/* --- Sticky Sidebar Column --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            {/* Author Information - Only render if an author is assigned */}
            {post?.author && (
              <div className="mb-8 rounded-lg border bg-card p-6 text-card-foreground">
                <h3 className="mb-4 text-lg font-semibold">About the Author</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    {authorImageUrl && (
                      <AvatarImage src={authorImageUrl} alt={post.author.name || 'Author'} />
                    )}
                    <AvatarFallback>
                      {post.author.name?.substring(0, 2) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{post.author.name || 'Anonymous'}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* Placeholder for author title */}
                      Content Strategist
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Post Metadata */}
            <div className="space-y-4 rounded-lg border bg-card p-6 text-card-foreground">
              <div>
                <h4 className="font-semibold">Published On</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(displayDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              {/* Safely check for topics before mapping */}
              {post?.taxonomy?.topics && post.taxonomy.topics.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.taxonomy.topics.map((topic) => (
                      <Badge key={topic._id} variant="secondary">
                        {topic.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Placeholder for future Table of Contents */}
            <div className="mt-8 rounded-lg border bg-card p-6 text-card-foreground">
              <h3 className="mb-4 text-lg font-semibold">In This Article</h3>
              <p className="text-sm text-muted-foreground">
                (Table of Contents will be implemented here)
              </p>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
