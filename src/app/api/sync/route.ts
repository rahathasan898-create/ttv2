// src/app/api/sync/route.ts
// Last updated: 24 August 2025, 02:50 AM (AEST)
// This API route is triggered by a Vercel Cron Job to synchronize like counts
// from the Supabase database to the Sanity content backend.

import { getAggregatedLikeCounts } from '@/lib/database';
import { updatePostLikeCounts } from '@/lib/content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. Secure the endpoint
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 2. Fetch aggregated like counts from Supabase
    const likeCounts = await getAggregatedLikeCounts();

    if (likeCounts.length === 0) {
      return NextResponse.json({
        status: 200,
        message: 'No new likes to sync.',
      });
    }

    // 3. Update the documents in Sanity
    await updatePostLikeCounts(likeCounts);

    return NextResponse.json({
      status: 200,
      message: `Sync successful. Updated ${likeCounts.length} posts.`,
    });
  } catch (error) {
    console.error('Error in sync cron job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
