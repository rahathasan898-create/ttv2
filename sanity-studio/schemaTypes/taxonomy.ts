// schemaTypes/taxonomy.ts
// Last updated: 22 August 2025, 01:16 AM (AEST)

import { defineField, defineType } from 'sanity'

// This is a reusable object that can be added to any document type (posts, courses, etc.)
// to give it a consistent and powerful categorization system.

export default defineType({
  name: 'taxonomy',
  title: 'Taxonomy',
  type: 'object',
  fields: [
    defineField({
      name: 'contentPillars',
      title: 'Content Pillars',
      type: 'array',
      description: 'Select one or more pillars this content belongs to.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'PulsePoint (Article)', value: 'pulsepoint' },
          { title: 'TrendLab (Analysis)', value: 'trendlab' },
          { title: 'VibeSchool (Course Content)', value: 'vibeschool' },
          { title: 'Resource', value: 'resource' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      description: 'Select from a master list of topics.',
      of: [{ type: 'reference', to: { type: 'topic' } }],
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      description: 'Select from a master list of platforms.',
      of: [{ type: 'reference', to: { type: 'platform' } }],
    }),
  ],
})
