import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'whyChoosePlatform',
  title: 'Why Choose Our Platform Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the why choose platform section',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle or tagline',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main description text for the section',
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'features',
      title: 'Platform Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.max(100),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.max(300),
            }),
            defineField({
              name: 'icon',
              title: 'Feature Icon',
              type: 'string',
              description: 'Lucide icon name (e.g., "CheckCircle", "Star", "Shield")',
              validation: (Rule) => Rule.max(50),
            }),
          ],
        },
      ],
      description: 'List of platform features with titles, descriptions, and icons',
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          validation: (Rule) => Rule.custom((value) => {
            if (!value) return true; // Allow empty values since it's optional
            if (value.startsWith('/') || value.startsWith('http')) return true;
            return 'Please enter a valid URL (starting with / or http)';
          }),
        }),
        defineField({
          name: 'variant',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'primary',
        }),
      ],
      description: 'Optional call-to-action button',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Light Blue', value: 'blue-50' },
          { title: 'Light Green', value: 'green-50' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
      description: 'Background color for the section',
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Custom background color (Tailwind class or hex code)',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
      description: 'Text alignment for the section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Why Choose Our Platform Banner',
        subtitle: subtitle || 'No subtitle set',
      };
    },
  },
}); 