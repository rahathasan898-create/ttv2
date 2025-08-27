// src/app/layout.tsx
// Last updated: 27 August 2025, 11:22 PM (AEST)
// This is the root layout for the entire application. It integrates the ClerkProvider
// for authentication, sets up global fonts and theme providers, and includes
// the main Header and Footer.

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/lib/components/global/Header'
import Footer from '@/lib/components/global/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/lib/components/global/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TickTrend Australia',
  description: 'The definitive growth platform for creators.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
