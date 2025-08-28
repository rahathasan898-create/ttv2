/**
 * File: src/lib/components/global/Header.tsx
 * Last Modified: 28 August 2025, 11:20 PM (AEST)
 *
 * This component renders the global site header, providing consistent navigation across the application.
 * It is designed to be mobile-first, featuring a clean, responsive layout that adapts seamlessly from
 * small screens to large desktops. It incorporates the Clerk UserButton for authentication state
 * and a ThemeToggle for light/dark mode switching.
 *
 * V3 Refactor Notes:
 * - Implemented a simplified desktop navigation structure as per the V3 roadmap.
 * - Content pillar links (PulsePoint, VibeSchool, etc.) are now consolidated under a "Resources" dropdown.
 * - The mobile navigation is handled by a Sheet component.
 * - FIX: Corrected the usage of the Next.js Link component with shadcn/ui's NavigationMenuLink.
 * Reverted to using `legacyBehavior` and `passHref` props to prevent invalid DOM nesting
 * (<a> inside <a>) and resolve console errors, which is the correct pattern for these components.
 */

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/lib/components/global/ThemeToggle'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// Array for the navigation items to keep the component DRY
const resourceLinks: { title: string; href: string; description: string }[] = [
  {
    title: 'PulsePoint',
    href: '/pulsepoint',
    description: 'In-depth articles and guides on creator strategy and growth.',
  },
  {
    title: 'VibeSchool',
    href: '/vibeschool',
    description: 'Step-by-step courses and playbooks to master TikTok.',
  },
  {
    title: 'TrendLab',
    href: '/trendlab',
    description: 'Data-driven analysis of the latest trending sounds and hashtags.',
  },
  {
    title: 'Resources',
    href: '/resources',
    description: 'Downloadable templates, checklists, and tools for creators.',
  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Placeholder for a proper logo component/SVG */}
          <span className="font-bold sm:inline-block">TickTrend AU</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              {/* FIX: Reverted to legacyBehavior and passHref to fix nesting error */}
              <Link href="/feed" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Feed
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {resourceLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
               {/* FIX: Reverted to legacyBehavior and passHref to fix nesting error */}
              <Link href="/studio" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Studio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side controls */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                {/* Mobile Menu Content will be built out here */}
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  <Link href="/" className="font-bold text-xl">TickTrend AU</Link>
                  <Link href="/feed" className="hover:text-foreground/80 transition-colors">Feed</Link>
                  {resourceLinks.map((link) => (
                     <Link key={link.href} href={link.href} className="hover:text-foreground/80 transition-colors">{link.title}</Link>
                  ))}
                  <Link href="/studio" className="hover:text-foreground/80 transition-colors">Studio</Link>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Helper component for NavigationMenu items
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {/* FIX: Use legacyBehavior and passHref on the Link component inside ListItem */}
        <Link href={props.href || "/"} legacyBehavior passHref>
            <a
            ref={ref}
            className={
                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
            }
            {...props}
            >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
            </a>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
