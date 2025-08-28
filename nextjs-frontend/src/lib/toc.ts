/**
 * File: src/lib/toc.ts
 * Last Modified: 28 August 2025, 10:20 PM (AEST)
 *
 * This utility file contains functions to generate a Table of Contents (TOC)
 * from a Sanity block content array. It extracts H2 and H3 headings, creates
 * unique slugs for them, and returns a structured array that can be used to
 * render a navigation sidebar for long-form articles.
 *
 * V3 Refactor Notes:
 * - FIX: Corrected the import and instantiation of `github-slugger`.
 * - FIX: Added a type guard to ensure `block.style` is a string before processing,
 * preventing potential runtime errors from malformed Sanity data.
 */

import { Post } from '@/types'
import GithubSlugger from 'github-slugger'

interface TocEntry {
  level: number
  text: string
  slug: string
}

export function generateTableOfContents(body: Post['body']): TocEntry[] {
  if (!body) {
    return []
  }

  const toc: TocEntry[] = []
  const slugger = new GithubSlugger()

  body.forEach((block) => {
    // FIX: Add type guard to ensure block.style is a string
    if (block._type === 'block' && typeof block.style === 'string' && ['h2', 'h3'].includes(block.style)) {
      const text = Array.isArray(block.children)
        ? block.children.map((child: any) => child.text).join('')
        : ''

      if (text) {
        toc.push({
          level: Number(block.style.replace('h', '')), // 'h2' -> 2
          text: text,
          slug: slugger.slug(text),
        })
      }
    }
  })

  return toc
}

/**
 * This function processes the body content to add unique IDs to each heading.
 * This is necessary for the anchor links in the Table of Contents to work correctly.
 * @param body - The Sanity block content array.
 * @returns The processed body with IDs added to heading blocks.
 */
export function addIdsToHeadings(body: Post['body']): Post['body'] {
    if (!body) {
        return [];
    }

    const slugger = new GithubSlugger();

    return body.map(block => {
        // FIX: Add type guard to ensure block.style is a string
        if (block._type === 'block' && typeof block.style === 'string' && ['h2', 'h3'].includes(block.style)) {
            const text = Array.isArray(block.children)
                ? block.children.map((child: any) => child.text).join('')
                : '';
            if (text) {
                return {
                    ...block,
                    _key: block._key || Math.random().toString(36).substr(2, 9), // Ensure key exists
                    headingId: slugger.slug(text)
                };
            }
        }
        return block;
    });
}
