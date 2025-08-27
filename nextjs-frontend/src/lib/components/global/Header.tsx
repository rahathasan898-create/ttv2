// src/lib/components/global/Header.tsx
// Last updated: 27 August 2025, 11:23 PM (AEST)
// This is the global Header component, refactored to be fully responsive.
// It features a data-driven navigation for desktop, a slide-out sheet menu
// for mobile, and integrates the theme toggle and user authentication controls.

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import React from 'react'

// Centralized navigation links array (Data-Driven UI)
const navLinks = [
  { href: '/feed', label: 'Feed' },
  { href: '/pulsepoint', label: 'PulsePoint' },
  { href: '/vibeschool', label: 'VibeSchool' },
  { href: '/trendlab', label: 'TrendLab' },
  { href: '/resources', label: 'Resources' },
  { href: '/studio', label: 'Studio' },
]

export default function Header() {
  const { isLoaded, isLoggedIn } = useAuth()
  const [isSheetOpen, setSheetOpen] = React.useState(false)

  const navLinkClass = cn(
    navigationMenuTriggerStyle(),
    'bg-transparent hover:bg-accent focus:bg-accent'
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            alt="TickTrend Logo"
            width={24}
            height={24}
          />
          <span className="font-bold">TickTrend</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href} className={navLinkClass}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Auth Button / User Menu */}
          <div className="flex h-10 items-center justify-end">
            {!isLoaded ? (
              <Skeleton className="h-8 w-20 rounded-md" />
            ) : isLoggedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-6">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 px-4"
                    onClick={() => setSheetOpen(false)}
                  >
                    <Image
                      src="/favicon.ico"
                      alt="TickTrend Logo"
                      width={24}
                      height={24}
                    />
                    <span className="font-bold">TickTrend</span>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-md px-4 py-2 text-lg font-medium text-foreground/80 hover:bg-accent"
                        onClick={() => setSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
