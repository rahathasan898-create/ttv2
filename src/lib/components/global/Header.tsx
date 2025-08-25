// src/lib/components/global/Header.tsx
// Last updated: 25 August 2025, 02:20 AM (AEST)
// This is the global Header component, now refactored to use the authentication
// abstraction layer. It consumes the `useAuth` hook to manage its state,
// decoupling it from the underlying Clerk implementation.
// FIX: Navigation links are now visible with a transparent background.

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { useAuth } from '@/lib/auth'; // <-- Import our custom hook
import { cn } from '@/lib/utils'; // Import cn utility

// Import shadcn/ui components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Header() {
  // Consume the abstracted authentication state
  const { isLoaded, isLoggedIn } = useAuth();

  // Custom class for navigation links to ensure visibility
  const navLinkClass = cn(
    navigationMenuTriggerStyle(),
    'bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800'
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            alt="TickTrend Logo"
            width={24}
            height={24}
          />
          <span className="font-bold text-white">TickTrend</span>
        </Link>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/feed" className={navLinkClass}>
                  Feed
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/pulsepoint"
                  className={navLinkClass}
                >
                  PulsePoint
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/vibeschool"
                  className={navLinkClass}
                >
                  VibeSchool
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/trendlab" className={navLinkClass}>
                  TrendLab
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/resources"
                  className={navLinkClass}
                >
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/studio" className={navLinkClass}>
                  Studio
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Button / User Menu */}
        <div className="flex h-8 w-20 items-center justify-end">
          {/* Use the isLoaded state from our hook to show a skeleton loader */}
          {!isLoaded ? (
            <Skeleton className="h-full w-full" />
          ) : // Use the isLoggedIn state from our hook to conditionally render UI
          isLoggedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button>Login</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
