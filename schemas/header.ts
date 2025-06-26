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
        },
        {
          name: 'link',
          title: 'Logo Link',
          type: 'url',
          description: 'URL when logo is clicked'
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
              type: 'url',
              validation: Rule => Rule.required()
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
        { text: 'Home', url: '/' },
        { text: 'Subjects', url: '/subjects' },
        { text: 'FAQs', url: '/faqs' },
        { text: 'Contact Us', url: '/contact' }
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
              type: 'url',
              validation: Rule => Rule.required()
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