// schemaTypes/course.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course (Playbook)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: "A summary of the course's learning outcomes.",
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      description: 'Add and order the content that makes up this course.',
      of: [
        // --- FIX: Added unique names to each reference type ---
        {
          name: 'lessonReference',
          title: 'Lesson',
          type: 'reference',
          to: [{ type: 'lesson' }],
        },
        {
          name: 'postReference',
          title: 'Post',
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
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
  ],
})
