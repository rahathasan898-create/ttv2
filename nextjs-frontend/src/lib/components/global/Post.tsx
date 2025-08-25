// src/lib/components/global/Post.tsx
// Last updated: 25 August 2025, 02:50 AM (AEST)
// Refactored to use shadcn/ui for a premium article layout and includes
// robust error handling for all data points.
// FIX: Confirmed component correctly destructures props from the Post type.
// IMPROVEMENT: Added PostActions, premium ContentGate, and topic badges.

import Image from 'next/image';
import { urlFor } from '@/lib/content';
import { Post as PostType } from '@/types';
import PortableTextComponent from './PortableTextComponent';
import GoBackButton from './GoBackButton';
import PostActions from './PostActions';
import ContentGate from './ContentGate';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Post({ post }: { post: PostType }) {
  // --- Robust Error Handling ---
  if (!post || !post.title || !post.author) {
    // Log an error for debugging purposes on the server
    console.error('Post component received incomplete data:', post);
    return null; // Don't render the component if essential data is missing
  }

  const { _id, title, mainImage, author, publishedAt, body, taxonomy, isPremium } = post;
  const postImageUrl = mainImage ? urlFor(mainImage).width(1200).height(675).url() : null;
  const authorImageUrl = author.image ? urlFor(author.image).width(100).height(100).url() : null;

  const PostBody = () => (
    <div className="prose prose-invert prose-lg mt-8 max-w-none">
      {body ? <PortableTextComponent value={body} /> : <p>Content is not available.</p>}
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8"><GoBackButton /></div>
      <Card className="mx-auto max-w-4xl overflow-hidden border-white/10 bg-neutral-900/50">
        {postImageUrl && (
          <CardHeader className="p-0">
            <div className="relative aspect-video w-full">
              <Image src={postImageUrl} alt={title} fill className="object-cover" />
            </div>
          </CardHeader>
        )}
        <CardContent className="p-8 md:p-12">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                {authorImageUrl && <AvatarImage src={authorImageUrl} alt={author.name} />}
                <AvatarFallback>{author.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-neutral-200">{author.name}</p>
                {publishedAt && (
                  <p className="text-sm text-neutral-400">
                    {new Date(publishedAt).toLocaleDateString('en-AU', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
            <PostActions postId={_id} />
          </div>
          
          {isPremium ? (
            <ContentGate>
              <PostBody />
            </ContentGate>
          ) : (
            <PostBody />
          )}

        </CardContent>
        {taxonomy?.topics && taxonomy.topics.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2 p-8 pt-0 md:p-12 md:pt-0">
                {taxonomy.topics.map((topic) => (
                    <Badge key={topic._type} variant="secondary">{topic.title}</Badge>
                ))}
            </CardFooter>
        )}
      </Card>
    </main>
  );
}
