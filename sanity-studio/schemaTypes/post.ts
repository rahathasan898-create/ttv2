// schemaTypes/post.ts
// Last updated: 22 August 2025, 01:37 AM (AEST)

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    // --- CURRENT SYSTEM: Professional Taxonomy ---
    defineField({
      name: 'taxonomy',
      title: 'Categorization',
      type: 'taxonomy',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'displayDate',
      title: 'Display Date Override',
      type: 'datetime',
      description: 'Optional: If you set this, it will be shown to visitors instead of the "Published at" date.',
    }),
    defineField({
      name: 'displayOptions',
      title: 'Display Options',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'showPublishDate',
          title: 'Show Publish Date',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showLastUpdated',
          title: 'Show Last Updated Date',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the post for SEO and social media previews.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'monetization',
      title: 'Monetization',
      type: 'monetization',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'contentMetrics',
      options: { collapsible: true, collapsed: true },
    }),
    
    // --- FIX: Add all legacy fields and hide them to ensure backward compatibility ---
    defineField({
        name: 'categories',
        title: 'Legacy Categories',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'topic'}, {type: 'platform'}]}], // Reference new types just in case
        hidden: true,
    }),
    defineField({
        name: 'contentPillar',
        title: 'Legacy Content Pillar (Singular)',
        type: 'string',
        hidden: true,
    }),
    defineField({
        name: 'contentPillars',
        title: 'Legacy Content Pillars (Old Array)',
        type: 'array',
        of: [{type: 'string'}],
        hidden: true,
    }),
    defineField({
        name: 'likeCount',
        title: 'Legacy Like Count',
        type: 'number',
        hidden: true,
    }),
    defineField({
        name: 'viewCount',
        title: 'Legacy View Count',
        type: 'number',
        hidden: true,
    }),
  ],
})
