// src/lib/components/global/ContentGate.tsx
// Last updated: 25 August 2025, 03:40 AM (AEST)
// A client-side component that acts as a gate for premium content. It uses
// the `useSubscription` hook to determine if the current user has an active
// subscription and renders either the content or an upgrade prompt.
// FIX: Added the 'accessTier' prop to the component's interface to resolve a TypeScript error.

'use client';

import { useSubscription } from '@/lib/billing';
import UpgradeBanner from './UpgradeBanner';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  children: React.ReactNode;
  accessTier?: 'Free Member' | 'Pro Member'; // Prop added to accept the access tier
}

export default function ContentGate({ children, accessTier }: Props) {
  const { isLoaded, isSubscribed } = useSubscription();

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

  // If the user is subscribed, render the premium content.
  // Note: Current logic grants access if *any* subscription is active.
  // This can be expanded in the future to check the 'accessTier' prop against the user's plan.
  if (isSubscribed) {
    return <>{children}</>;
  }

  // Otherwise, render the upgrade banner.
  return <UpgradeBanner />;
}
