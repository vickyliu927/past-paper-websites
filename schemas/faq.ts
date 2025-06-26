import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the FAQ section',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'Description text below the title',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'The FAQ question',
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              description: 'The answer to the question',
              rows: 4,
              validation: (Rule) => Rule.max(1000),
            }),
            defineField({
              name: 'isDefaultOpen',
              title: 'Open by Default',
              type: 'boolean',
              description: 'Whether this FAQ item should be open by default',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled Question',
                subtitle: subtitle ? `${subtitle.slice(0, 60)}...` : 'No answer provided',
              };
            },
          },
        },
      ],
      description: 'Add frequently asked questions and their answers',
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
      description: 'Text alignment for the section title and description',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small (3xl)', value: '3xl' },
          { title: 'Medium (4xl)', value: '4xl' },
          { title: 'Large (5xl)', value: '5xl' },
          { title: 'Extra Large (6xl)', value: '6xl' },
          { title: 'Full Width (7xl)', value: '7xl' },
        ],
      },
      initialValue: '4xl',
      description: 'Maximum width for the FAQ container',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqsCount: 'faqs',
    },
    prepare(selection) {
      const { title, faqsCount } = selection;
      const count = faqsCount ? faqsCount.length : 0;
      return {
        title: title || 'Frequently Asked Questions',
        subtitle: `${count} FAQ${count !== 1 ? 's' : ''}`,
      };
    },
  },
}); 