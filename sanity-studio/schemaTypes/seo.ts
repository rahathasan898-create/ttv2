// schemaTypes/seo.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optimal length: 50-60 characters. This appears in the browser tab and search results.',
      validation: (Rule) => Rule.max(60).warning('A meta title longer than 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 150-160 characters. This is the summary shown in search results.',
      validation: (Rule) => Rule.max(160).warning('A meta description longer than 160 characters may be truncated.'),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Recommended size: 1200x630 pixels. This is the image shown when sharing on platforms like Twitter and Facebook.',
    }),
  ],
})
