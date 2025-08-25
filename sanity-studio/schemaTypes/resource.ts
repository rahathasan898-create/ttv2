// schemaTypes/resource.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Downloadable File', value: 'download' },
          { title: 'Link to Guide', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'download',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'downloadLink',
      title: 'Download Link',
      type: 'url',
      description: 'The link to the Canva file, PDF, etc.',
      hidden: ({ parent }) => parent?.resourceType !== 'download',
    }),
    defineField({
      name: 'linkedPost',
      title: 'Link to Guide/Post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: "Select an existing post to link to.",
      hidden: ({ parent }) => parent?.resourceType !== 'link',
    }),
    defineField({
      name: 'body',
      title: 'Description / Body',
      type: 'blockContent',
      description: "A rich text description for the resource's landing page.",
    }),
    defineField({
      name: 'accessTier',
      title: 'Access Tier',
      type: 'string',
      options: {
        list: ['Public', 'Free Member', 'Premium'],
        layout: 'radio',
      },
      initialValue: 'Free Member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    // Note: The original 'downloadCount' field is now part of 'metrics' as 'viewCount' for consistency.
    // We can treat a "view" of a resource as a "download" on the frontend.
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'contentMetrics',
      options: { collapsible: true, collapsed: true },
    }),
  ],
})
