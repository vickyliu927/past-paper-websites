import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: "World's Largest Past Paper Collection"
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      initialValue: "Access thousands of past papers from A-Levels, IGCSE, IB, AP, and more. Complete examination resources for all major international curricula."
    }),
    defineField({
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'string',
              description: 'Use internal links (e.g., /subjects) or full URLs (e.g., https://example.com)',
              validation: Rule => Rule.required().custom((value: string) => {
                if (!value || typeof value !== 'string') return 'URL is required';
                if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')) return true;
                return 'URL must be an internal link (e.g., /subjects) or a full URL (e.g., https://example.com)';
              })
            },
            {
              name: 'variant',
              title: 'Button Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' }
                ]
              }
            }
          ]
        }
      ],
      initialValue: [
        { text: 'Browse Papers', url: '/papers', variant: 'primary' },
        { text: 'View Curricula', url: '/curricula', variant: 'secondary' }
      ]
    }),
    defineField({
      name: 'browseButton',
      title: 'Browse Past Papers CTA Button',
      type: 'object',
      description: 'Primary call-to-action button for browsing past papers',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required().max(50),
          initialValue: 'Browse Past Papers'
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          description: 'Use internal links (e.g., /subjects) or full URLs (e.g., https://example.com)',
          validation: Rule => Rule.required().custom((value: string) => {
            if (!value || typeof value !== 'string') return 'URL is required';
            if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')) return true;
            return 'URL must be an internal link (e.g., /subjects) or a full URL (e.g., https://example.com)';
          }),
          initialValue: '/subjects'
        }
      ],
      preview: {
        select: {
          title: 'text',
          subtitle: 'url'
        }
      }
    })
  ]
}) 