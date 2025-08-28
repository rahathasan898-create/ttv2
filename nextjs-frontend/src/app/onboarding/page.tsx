/**
 * File: src/app/onboarding/page.tsx
 * Last Modified: 28 August 2025, 10:40 PM (AEST)
 *
 * This page hosts the user onboarding flow. New users should be redirected here
 * immediately after their first sign-up to complete a personalization setup.
 */

import OnboardingFlow from "@/lib/components/onboarding/OnboardingFlow";

export default function OnboardingPage() {
  return (
    <div className="container mx-auto max-w-screen-md py-12 md:py-20">
      <OnboardingFlow />
    </div>
  );
}
