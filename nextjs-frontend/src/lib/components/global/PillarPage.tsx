/**
 * File: src/lib/components/global/PillarPage.tsx
 * Last Modified: 28 August 2025, 10:01 PM (AEST)
 *
 * This component renders the main layout for the content pillar archive pages
 * (e.g., /pulsepoint, /trendlab). It's designed to provide a rich content
 * discovery experience for users.
 *
 * V3 Refactor Notes:
 * - Implemented a "Featured Post Hero" section at the top of the page, which
 * prominently displays the latest piece of content in that pillar.
 * - Added a "Topic Filter Bar" that allows users to filter the content grid. This
 * is a key feature from our V3 roadmap for enhancing content discovery.
 * - The component is now stateful to handle the client-side filtering logic.
 * - The overall design is cleaner, more organized, and provides a much more
 * powerful browsing experience than the previous simple grid.
 * - FIX: Added a conditional check for `featuredPost.mainImage` to prevent runtime errors.
 */

'use client' // This component now needs client-side interactivity for filtering

import { useState, useMemo } from 'react'
import { Post } from '@/types'
import ContentCard from './ContentCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/content'

interface PillarPageProps {
  pillar: {
    title: string
    description: string
  }
  posts: Post[]
}

export default function PillarPage({ pillar, posts }: PillarPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Memoize the list of unique topics to prevent recalculation on every render
  const topics = useMemo(() => {
    const allTopics = new Set<string>()
    posts.forEach((post) => {
      post.taxonomy?.topics?.forEach((topic) => {
        if (topic.title) {
          allTopics.add(topic.title)
        }
      })
    })
    return ['All', ...Array.from(allTopics)]
  }, [posts])

  // Filter posts based on the active topic
  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') {
      return posts.slice(1) // Return all posts except the featured one
    }
    return posts.slice(1).filter((post) =>
      post.taxonomy?.topics?.some((topic) => topic.title === activeFilter)
    )
  }, [posts, activeFilter])

  const featuredPost = posts[0]

  return (
    <div className="container mx-auto max-w-screen-xl py-12 md:py-20">
      {/* Pillar Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {pillar.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {pillar.description}
        </p>
      </header>

      {/* Featured Post Hero */}
      {featuredPost && (
        <section className="mt-12">
          <Link href={`/${featuredPost.taxonomy?.contentPillars?.[0]}/${featuredPost.slug?.current}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-muted/50 rounded-xl p-8 group">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                {/* FIX: Check if mainImage exists before rendering */}
                {featuredPost.mainImage && (
                  <Image
                    src={urlFor(featuredPost.mainImage).url()}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div>
                <span className="text-sm font-semibold text-primary">Featured</span>
                <h2 className="mt-2 text-2xl font-bold group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-2 text-muted-foreground line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 text-sm font-medium">Read more &rarr;</div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Topic Filters */}
      <nav className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 py-4 my-8 border-b">
        <div className="flex items-center justify-center space-x-2 overflow-x-auto">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={activeFilter === topic ? 'default' : 'ghost'}
              onClick={() => setActiveFilter(topic)}
              className="rounded-full"
            >
              {topic}
            </Button>
          ))}
        </div>
      </nav>

      {/* Content Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <ContentCard key={post._id} content={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">No posts found</h3>
          <p className="text-muted-foreground mt-2">
            There are no posts matching the "{activeFilter}" topic yet.
          </p>
        </div>
      )}
    </div>
  )
}
