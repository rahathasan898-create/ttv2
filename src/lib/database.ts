// src/lib/database.ts
// Last updated: 25 August 2025, 03:15 AM (AEST)
// This file is the abstraction layer for the application database.
// FIX: Added missing functions (getLikeCount, hasUserLikedPost, toggleLike)
// to resolve import errors in PostActions.tsx.
// FIX: Corrected the implementation of getAggregatedLikeCounts to use the proper
// Supabase aggregation query, resolving the previous build error.
// FIX: Added an explicit type for the item in the .map() function to resolve a TypeScript error.

import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Initialization ---
// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- User Profile Functions ---
// NOTE: Assuming addUserProfile function exists as per original file structure.
interface UserProfile {
    clerk_id: string;
    email: string;
    name: string;
    image_url?: string;
}

export async function addUserProfile(profile: UserProfile) {
    try {
        const { error } = await supabase.from('profiles').insert([profile]);
        if (error) throw new Error(error.message);
    } catch (error) {
        console.error('Error adding user profile:', error);
        throw error;
    }
}


// --- Post Interaction Functions ---

/**
 * @description Fetches the like count for a specific post.
 * @param {string} postId - The ID of the post.
 * @returns {Promise<number>} The total number of likes.
 */
export async function getLikeCount(postId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) throw new Error(error.message);
    return count ?? 0;
  } catch (error) {
    console.error('Error getting like count:', error);
    return 0;
  }
}

/**
 * @description Checks if a specific user has liked a post.
 * @param {string} postId - The ID of the post.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<boolean>} True if the user has liked the post, false otherwise.
 */
export async function hasUserLikedPost(postId: string, userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw new Error(error.message);
    }
    return !!data;
  } catch (error) {
    console.error('Error checking if user has liked post:', error);
    return false;
  }
}

/**
 * @description Toggles a user's like on a post.
 * @param {string} postId - The ID of the post.
 * @param {string} userId - The ID of the user.
 * @param {boolean} hasLiked - The current like status. If true, the like will be removed. If false, it will be added.
 */
export async function toggleLike(postId: string, userId: string, hasLiked: boolean): Promise<void> {
  try {
    if (hasLiked) {
      // User has already liked, so we remove the like
      const { error } = await supabase
        .from('likes')
        .delete()
        .match({ post_id: postId, user_id: userId });
      if (error) throw new Error(error.message);
    } else {
      // User has not liked, so we add a like
      const { error } = await supabase
        .from('likes')
        .insert([{ post_id: postId, user_id: userId }]);
      if (error) throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}


/**
 * @description Fetches aggregated like counts for all posts.
 * @returns {Promise<{ post_id: string; like_count: number }[]>} An array of objects with post IDs and their counts.
 */
export async function getAggregatedLikeCounts(): Promise<{ post_id: string; like_count: number }[]> {
  try {
    // This query now correctly uses Supabase's syntax for grouped aggregation.
    // It selects the post_id and performs a count on a specified column (e.g., 'id').
    const { data, error } = await supabase
      .from('likes')
      .select('post_id, count:id'); // This will group by post_id and count the 'id's

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
        return [];
    }

    // Supabase returns the count in a property named after the counted column.
    // We rename it for clarity in our application.
    return data.map((item: { post_id: string; count: number }) => ({
        post_id: item.post_id,
        like_count: item.count
    }));

  } catch (error) {
    console.error('Error getting aggregated like counts:', error);
    return []; // Return a safe empty array on error
  }
}
