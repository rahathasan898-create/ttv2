// schemaTypes/monetization.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'monetization',
  title: 'Monetization',
  type: 'object',
  fields: [
    defineField({
      name: 'isSponsored',
      title: 'Is this content sponsored?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sponsorName',
      title: 'Sponsor Name',
      type: 'string',
      hidden: ({ parent }) => !parent?.isSponsored,
    }),
    defineField({
      name: 'sponsorLink',
      title: 'Sponsor Link',
      type: 'url',
      hidden: ({ parent }) => !parent?.isSponsored,
    }),
    defineField({
      name: 'containsAffiliateLinks',
      title: 'Contains affiliate links?',
      type: 'boolean',
      description: 'Tick this to automatically show an affiliate disclosure.',
      initialValue: false,
    }),
  ],
})
