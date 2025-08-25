// schemaTypes/categoryGroup.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categoryGroup',
  title: 'Category Group',
  type: 'object',
  fields: [
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select the main category group (e.g., "Content Type").',
      options: {
        filter: '!defined(parent)',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'child',
      title: 'Sub-Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select the specific sub-category (e.g., "PulsePoint").',
      options: {
        filter: (context) => {
          // --- FIX: Type-safe check for the context and its nested properties ---
          if (
            context &&
            !Array.isArray(context) &&
            typeof context === 'object' &&
            'parent' in context &&
            context.parent &&
            typeof context.parent === 'object' &&
            'parent' in context.parent &&
            context.parent.parent &&
            typeof context.parent.parent === 'object' &&
            '_ref' in context.parent.parent
          ) {
            return {
              filter: `_id in *[_type == "category" && references($parentId)]._id`,
              params: { parentId: (context.parent.parent as { _ref: string })._ref },
            }
          }
          // If no parent is selected or it's not a valid reference, show no options
          return {
            filter: `_id in []`,
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      parentTitle: 'parent.title',
      childTitle: 'child.title',
    },
    prepare({ parentTitle, childTitle }) {
      return {
        title: childTitle || 'Sub-Category',
        subtitle: parentTitle ? `In: ${parentTitle}` : 'Parent not selected',
      }
    },
  },
})
