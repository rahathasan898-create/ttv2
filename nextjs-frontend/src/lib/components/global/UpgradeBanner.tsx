// src/lib/components/global/UpgradeBanner.tsx
// Last updated: 24 August 2025, 03:00 AM (AEST)
// A component shown to non-subscribed users when they attempt to view
// premium content, prompting them to upgrade their plan.

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpButton } from '@clerk/nextjs';
import { Lock } from 'lucide-react';

export default function UpgradeBanner() {
  return (
    <Card className="my-8 border-primary/50 bg-neutral-900/50 text-center">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-white">This Content is for Pro Members</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-neutral-400">
          Upgrade your plan to get full access to this article, plus all other
          premium resources, courses, and trend reports.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg">Upgrade to Pro</Button>
        </SignUpButton>
      </CardContent>
    </Card>
  );
}
