// schemaTypes/contentMetrics.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentMetrics',
  title: 'Content Metrics',
  type: 'object',
  fields: [
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
  ],
})
