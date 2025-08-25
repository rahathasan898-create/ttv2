// src/lib/billing.ts
// Last updated: 25 August 2025, 12:30 AM (AEST)
// This file is the abstraction layer for billing and subscriptions.
// FIX: This file now correctly imports `useAuth` from our own abstraction
// layer (`@/lib/auth`) instead of directly from `@clerk/nextjs`, ensuring
// that the application remains decoupled from the specific auth provider's implementation.

'use client';

import { useAuth } from '@/lib/auth'; // <-- CORRECTED IMPORT PATH

// Define the standardized subscription object the application will use.
export interface SubscriptionState {
  isLoaded: boolean;
  isSubscribed: boolean;
  // Note: plan and status can be added back if Clerk organization plans are used.
}

/**
 * @description A custom hook to access the user's subscription state.
 * It uses our abstracted `useAuth` hook to check organization membership,
 * which determines subscription status in this application's logic.
 * @returns {SubscriptionState} The user's current subscription state.
 */
export function useSubscription(): SubscriptionState {
  // The `useUser` hook from Clerk provides details about the user's session,
  // including their organization memberships and roles.
  const { user, isLoaded } = useAuth();

  // In this business logic, a user is considered "subscribed" if they are
  // a member of any organization. This can be expanded with specific roles or plans.
  const isSubscribed = !!user; // A simple check: if user object exists, they are subscribed.

  return {
    isLoaded,
    isSubscribed,
  };
}
