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
          ]
        }
      ],
      initialValue: [
        { text: 'Browse Papers', url: '/papers', variant: 'primary' },
        { text: 'View Curricula', url: '/curricula', variant: 'secondary' }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Platform Features',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      initialValue: [
        "Multiple curricula: A-Levels, IGCSE, IB, AP & more",
        "Organized by curriculum, subject, and year",
        "Marking schemes and grade boundaries",
        "Regular updates across all exam boards"
      ]
    }),
    defineField({
      name: 'advertisement',
      title: 'Advertisement Block',
      type: 'object',
      description: 'Optional advertisement block to replace the "Why Our Platform?" section',
      fields: [
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Small text at the top (e.g., "INTERNATIONALLY TRUSTED")'
        },
        {
          name: 'mainText',
          title: 'Main Text',
          type: 'text',
          description: 'Main heading text'
        },
        {
          name: 'statistic',
          title: 'Statistic',
          type: 'string',
          description: 'Bottom statistic text (e.g., "100,000+ Satisfied Students")'
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code for background (e.g., #1e40af)',
          initialValue: '#1e40af'
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Hex color code for text (e.g., #ffffff)',
          initialValue: '#ffffff'
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Icon to display (globe, star, checkmark, etc.)',
          options: {
            list: [
              { title: 'Globe', value: 'globe' },
              { title: 'Star', value: 'star' },
              { title: 'Checkmark', value: 'checkmark' },
              { title: 'Trophy', value: 'trophy' },
              { title: 'Users', value: 'users' }
            ]
          },
          initialValue: 'globe'
        },
        {
          name: 'avatarImage1',
          title: 'Avatar Image 1',
          type: 'image',
          description: 'First avatar image for the statistic section',
          options: {
            hotspot: true
          }
        },
        {
          name: 'avatarImage2',
          title: 'Avatar Image 2',
          type: 'image',
          description: 'Second avatar image for the statistic section',
          options: {
            hotspot: true
          }
        },
        {
          name: 'avatarImage3',
          title: 'Avatar Image 3',
          type: 'image',
          description: 'Third avatar image for the statistic section',
          options: {
            hotspot: true
          }
        }
      ]
    })
  ]
}) 