// schemaTypes/lesson.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
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
    defineField({
      name: 'isPreview',
      title: 'Is this a free preview lesson?',
      type: 'boolean',
      description: 'Tick this box if non-logged-in users can see this lesson.',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
  ],
})
