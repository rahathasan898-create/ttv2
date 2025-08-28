/**
 * File: src/lib/components/global/Footer.tsx
 * Last Modified: 28 August 2025, 08:02 PM (AEST)
 *
 * This component renders the global site footer. It provides essential links for navigation,
 * legal information, and social media presence.
 *
 * V3 Refactor Notes:
 * - Implemented a professional, multi-column layout as per the V3 roadmap.
 * - The layout is fully responsive, stacking neatly on mobile devices.
 * - Link categories ("Product", "Company", "Legal") provide a clear, scannable structure,
 * improving user experience and providing SEO benefits.
 * - Social media links are prominently displayed.
 * - The design is clean, modern, and theme-aware.
 */

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

// Define link structures for easy management
const productLinks = [
  { href: '/feed', label: 'Feed' },
  { href: '/pulsepoint', label: 'PulsePoint' },
  { href: '/vibeschool', label: 'VibeSchool' },
  { href: '/trendlab', label: 'TrendLab' },
  { href: '/resources', label: 'Resources' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/studio', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
]

const socialLinks = [
  { href: '#', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', icon: <Instagram className="h-5 w-5" /> },
  { href: '#', icon: <Linkedin className="h-5 w-5" /> },
  { href: '#', icon: <Youtube className="h-5 w-5" /> },
]

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Social Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-xl font-bold">
              TickTrend AU
            </Link>
            <p className="text-sm text-muted-foreground">
              The playbook for creator growth in Australia.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">{social.href}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold">Product</h3>
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold">Company</h3>
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold">Legal</h3>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TickTrend Australia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
