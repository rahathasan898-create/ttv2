// src/app/api/webhooks/clerk/route.ts
// Last updated: 25 August 2025, 03:35 AM (AEST)
// This API route is a webhook handler for Clerk. It listens for the 'user.created'
// event and creates a corresponding user profile in the Supabase database.
// FIX: Correctly added 'await' to the headers() call to resolve the Promise.

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { addUserProfile } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // We only care about the 'user.created' event
  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // --- Robust Error Handling ---
    // Ensure we have the necessary data before proceeding.
    if (!id || !email_addresses) {
      return new NextResponse('Error: Missing user ID or email address', {
        status: 400,
      });
    }

    const primaryEmail = email_addresses[0]?.email_address;
    const fullName = `${first_name || ''} ${last_name || ''}`.trim();

    try {
      // Call our database abstraction layer to create the user profile.
      await addUserProfile({
        clerk_id: id,
        email: primaryEmail,
        name: fullName || 'New User',
        image_url: image_url,
      });

      return new NextResponse('User profile created successfully', {
        status: 201,
      });
    } catch (error) {
      console.error('Error creating user profile in database:', error);
      return new NextResponse('Error: Could not create user profile', {
        status: 500,
      });
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}
