// File: src/lib/components/global/Footer.tsx
// This is the refactored Footer component with the new dark theme styling and added legal links.
// FIX: Improved navigation layout on mobile to be a single column for better readability.

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  const navLinks = [
    { name: "Feed", href: "/feed" },
    { name: "PulsePoint", href: "/pulsepoint" },
    { name: "VibeSchool", href: "/vibeschool" },
    { name: "TrendLab", href: "/trendlab" },
    { name: "Resources", href: "/resources" },
    { name: "Studio", href: "/studio" },
    // Added legal and informational links
    { name: "About", href: "/about" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  return (
    <footer className="bg-black border-t border-slate-800 text-gray-400">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon.ico" alt="TickTrend Logo" width={24} height={24} />
            <span className="font-bold text-white">TickTrend</span>
          </Link>
          <p className="mt-4 text-sm leading-6 max-w-md">
            The #1 TikTok analytics and trend discovery platform for Australian creators and brands. Go from idea to viral, faster.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8" aria-label="Footer">
          {navLinks.map((item) => (
            <div key={item.name}>
              <Link href={item.href} className="text-sm leading-6 hover:text-white">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Social Links */}
        <div className="mt-10 flex justify-center space-x-6">
          {socialLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-gray-500 hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center text-xs leading-5">
          &copy; {new Date().getFullYear()} TickTrend Australia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
