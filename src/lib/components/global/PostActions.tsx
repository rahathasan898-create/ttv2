// src/lib/components/global/PostActions.tsx
// Last updated: 25 August 2025, 02:55 AM (AEST)
// A client component that handles user interactions for a post, such as liking.
// It fetches initial data and performs mutations via the database abstraction layer.
// FIX: This component now correctly imports functions from the updated database.ts file.

'use client';

import { useEffect, useState, useTransition } from 'react';
import { useAuth } from '@/lib/auth';
import { getLikeCount, hasUserLikedPost, toggleLike } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  postId: string;
}

export default function PostActions({ postId }: Props) {
  const { user, isLoggedIn, isLoaded } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Fetch initial like count and user's like status on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const count = await getLikeCount(postId);
        setLikeCount(count);

        if (isLoggedIn && user) {
          const liked = await hasUserLikedPost(postId, user.id);
          setHasLiked(liked);
        }
      } catch (error) {
        console.error('Failed to fetch post interaction data:', error);
        toast.error('Could not load post data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchInitialData();
    }
  }, [postId, user, isLoggedIn, isLoaded]);

  const handleLike = () => {
    if (!isLoggedIn || !user) {
      toast.info('Please log in to like a post.');
      return;
    }

    // Optimistic UI update
    setHasLiked((prev) => !prev);
    setLikeCount((prev) => (hasLiked ? prev - 1 : prev + 1));

    startTransition(async () => {
      try {
        await toggleLike(postId, user.id, hasLiked);
      } catch (error) {
        // Revert UI on error
        setHasLiked((prev) => !prev);
        setLikeCount((prev) => (hasLiked ? prev + 1 : prev - 1));
        toast.error('Something went wrong. Please try again.');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-9 w-20 animate-pulse rounded-md bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={handleLike}
        disabled={isPending || !isLoaded}
        className="border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
      >
        <Heart
          className={`mr-2 h-4 w-4 ${
            hasLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400'
          }`}
        />
        {likeCount}
      </Button>
      {/* Save/Bookmark button can be added here in the future */}
    </div>
  );
}
