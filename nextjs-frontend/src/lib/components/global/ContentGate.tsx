// src/lib/components/global/ContentGate.tsx
// Last updated: 29 August 2025, 12:15 AM (AEST)
// FIX: The component now correctly handles 'Public' and 'Premium' access tiers
// by updating the Props interface and modifying the rendering logic accordingly.

'use client';

import { useSubscription } from '@/lib/billing';
import UpgradeBanner from './UpgradeBanner';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

// The access tiers defined in the Sanity schemas.
// The `useSubscription` hook's business logic determines if a user
// is considered a "Free Member" or has a "Pro Member" plan.
interface Props {
  children: React.ReactNode;
  accessTier?: 'Public' | 'Free Member' | 'Premium';
}

export default function ContentGate({ children, accessTier = 'Free Member' }: Props) {
  const { isLoaded, isSubscribed } = useSubscription();

  // If the content is public, we don't need to check subscription status.
  // We can immediately render the content for everyone.
  if (accessTier === 'Public') {
    return <>{children}</>;
  }

  // While the subscription status is loading, show a skeleton placeholder.
  if (!isLoaded) {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  // If the user is subscribed or the content is for free members, render the content.
  // The 'isSubscribed' check here covers the 'Premium' tier.
  if (isSubscribed || accessTier === 'Free Member') {
    return <>{children}</>;
  }

  // Otherwise, render the upgrade banner..
  return <UpgradeBanner />;
}
