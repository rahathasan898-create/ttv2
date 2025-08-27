// src/lib/components/global/ThemeProvider.tsx
// Last updated: 28 August 2025, 12:48 AM (AEST)
// This is a client-side provider that wraps the entire application, enabling
// light/dark mode functionality via the `next-themes` library.

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
// FIX: Import ThemeProviderProps directly from the main package
import { type ThemeProviderProps } from 'next-themes'

/**
 * @description Provides theme context to the application using next-themes.
 * This component wraps the entire application in the root layout.
 * @param {ThemeProviderProps} props - The props for the theme provider.
 * @returns {React.ReactElement} The NextThemesProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
