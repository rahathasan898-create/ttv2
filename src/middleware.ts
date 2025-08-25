// src/middleware.ts
// Last updated: 25 August 2025, 03:20 AM (AEST)
// This middleware is powered by Clerk and runs before every request. Its primary
// role is to distinguish between public and protected routes, redirecting
// unauthenticated users from protected pages.
// FIX: Corrected the call to the protect method to resolve a build error.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes are protected and require a user to be logged in.
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  // If the route is identified as protected, enforce authentication.
  if (isProtectedRoute(req)) {
    auth.protect(); // Corrected: auth is an object, not a function.
  }
});

export const config = {
  // This matcher ensures the middleware runs on all routes except for static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
