// src/app/api/sync/route.ts
// Last updated: 25 August 2025, 11:25 PM (AEST)
// This API route is triggered by a cron job to synchronize like counts from
// the Supabase database to the Sanity content backend.
// FIX: This file now correctly imports the 'updatePostLikeCounts' function.

import { getAggregatedLikeCounts } from '@/lib/database';
import { updatePostLikeCounts } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // --- 1. Secure the endpoint ---
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // --- 2. Fetch like counts from the database ---
    const likeCounts = await getAggregatedLikeCounts();

    if (likeCounts.length === 0) {
      return NextResponse.json({ message: 'No new likes to sync.' });
    }

    // --- 3. Update the like counts in the CMS ---
    await updatePostLikeCounts(likeCounts);

    return NextResponse.json({
      message: `Sync successful. Updated ${likeCounts.length} posts.`,
    });
  } catch (error) {
    console.error('Sync failed:', error);
    // Return a more informative error message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { message: 'Sync failed', error: errorMessage },
      { status: 500 }
    );
  }
}
