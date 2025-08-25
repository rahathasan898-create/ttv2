// src/lib/auth.ts
// Last updated: 24 August 2025, 01:48 AM (AEST)
// This file serves as the abstraction layer for authentication. It centralizes
// all interactions with the Clerk SDK and exposes a simplified, standardized
// hook (useAuth) for the rest of the application to use.

'use client';

import { useUser } from '@clerk/nextjs';

// Define the standardized user object that the application will use.
// This decouples the UI from the specific structure of Clerk's user object.
export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
}

// Define the return type for our custom hook.
export interface AuthState {
  isLoaded: boolean;
  isLoggedIn: boolean;
  user: AuthUser | null;
}

/**
 * @description A custom hook to access authentication state.
 * It wraps Clerk's useUser hook and returns a standardized state object.
 * @returns {AuthState} The current authentication state.
 */
export function useAuth(): AuthState {
  const { isLoaded, isSignedIn, user } = useUser();

  // If the user is signed in, we map the Clerk user object to our
  // standardized AuthUser format. Otherwise, we return null.
  const normalizedUser =
    isSignedIn && user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? null,
          name: user.fullName,
          imageUrl: user.imageUrl,
        }
      : null;

  return {
    isLoaded,
    // FIX: Coalesce the potentially undefined `isSignedIn` to a boolean.
    // During initial load, isSignedIn can be undefined, so we default to false.
    isLoggedIn: isSignedIn ?? false,
    user: normalizedUser,
  };
}
