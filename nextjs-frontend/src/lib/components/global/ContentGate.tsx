// src/lib/components/global/ContentGate.tsx
// Last updated: 25 August 2025, 11:30 PM (AEST)
// FIX: Removed the unused 'accessTier' variable to resolve an ESLint warning.
// TODO: In the future, this component can be enhanced to check the 'accessTier'
// prop against the user's specific subscription plan.

'use client';

import { useSubscription } from '@/lib/billing';
import UpgradeBanner from './UpgradeBanner';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  children: React.ReactNode;
  accessTier?: 'Free Member' | 'Pro Member';
}

export default function ContentGate({ children }: Props) {
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
  if (isSubscribed) {
    return <>{children}</>;
  }

  // Otherwise, render the upgrade banner.
  return <UpgradeBanner />;
}
