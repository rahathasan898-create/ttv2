// schemaTypes/category.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // --- FIELD ADDED BACK TO FIX SCHEMA ERROR ---
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          {title: 'Content Pillar', value: 'pillar'}, // e.g., PulsePoint, VibeSchool
          {title: 'Platform', value: 'platform'}, // e.g., TikTok, Instagram
          {title: 'Topic', value: 'topic'}, // e.g., Growth, Monetization
        ],
        layout: 'radio',
      },
      description: 'Helps to organize categories. This does not affect the hierarchy.'
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Optional: Assign a parent to create a sub-category (e.g., "PulsePoint" could be a sub-category of "Content Type").',
      options: {
        filter: ({ document }) => {
          if (!document._id) {
            return {
              filter: '!defined(parent)',
            }
          }
          return {
            filter: '_id != $id && !defined(parent)',
            params: {
              id: document._id.replace('drafts.', ''),
            },
          }
        },
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'An internal note explaining the purpose of this category.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      parentTitle: 'parent.title',
    },
    prepare({ title, parentTitle }) {
      return {
        title: parentTitle ? `${parentTitle} → ${title}` : title,
      }
    },
  },
})
