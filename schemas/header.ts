import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Logo Image',
          type: 'image',
        }
      ]
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Use internal links (e.g., /subjects, /home) or full URLs (e.g., https://example.com)',
              validation: Rule => Rule.required().custom((value: string) => {
                if (!value || typeof value !== 'string') return 'URL is required'
                // Allow internal links starting with / or full URLs starting with http
                if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')) {
                  return true
                }
                return 'URL must be an internal link (e.g., /subjects) or a full URL (e.g., https://example.com)'
              })
            }
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url'
            }
          }
        }
      ],
      initialValue: [
        { text: 'Home', url: '/home' },
        { text: 'Subjects', url: '/subjects' },
        { text: 'FAQs', url: '/faq' },
        { text: 'Contact Us', url: '/hire' }
      ]
    }),
    defineField({
      name: 'actionButtons',
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
              title: 'URL',
              type: 'string',
              description: 'Use internal links (e.g., /subjects, /home) or full URLs (e.g., https://example.com)',
              validation: Rule => Rule.required().custom((value: string) => {
                if (!value || typeof value !== 'string') return 'URL is required'
                // Allow internal links starting with / or full URLs starting with http
                if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')) {
                  return true
                }
                return 'URL must be an internal link (e.g., /subjects) or a full URL (e.g., https://example.com)'
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
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url'
            }
          }
        }
      ],
      initialValue: [
        { text: 'Revision Platform', url: '/revision', variant: 'primary' },
        { text: 'Hire a Tutor', url: '/hire', variant: 'secondary' }
      ]
    })
  ]
}) 