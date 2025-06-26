import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          description: 'Footer logo image',
        }),
        defineField({
          name: 'alt',
          title: 'Logo Alt Text',
          type: 'string',
          description: 'Alternative text for the logo',
          validation: (Rule) => Rule.max(100),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'text',
      description: 'Short description about the company/service',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the quick links section',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'links',
          title: 'Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                  validation: (Rule) => Rule.required().max(50),
                }),
                defineField({
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                  validation: (Rule) => Rule.custom((value) => {
                    if (!value) return true; // Allow empty values since it's optional
                    if (value.startsWith('/') || value.startsWith('http') || value.startsWith('#')) return true;
                    return 'Please enter a valid URL (starting with /, # or http)';
                  }),
                }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'url',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the contact section',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          description: 'Contact email address',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          description: 'Contact phone number',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          description: 'Physical address',
          rows: 2,
          validation: (Rule) => Rule.max(200),
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'string',
          description: 'Twitter profile URL',
          validation: (Rule) => Rule.custom((value) => {
            if (!value) return true;
            if (value.startsWith('http')) return true;
            return 'Please enter a valid Twitter URL';
          }),
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'string',
          description: 'Facebook profile URL',
          validation: (Rule) => Rule.custom((value) => {
            if (!value) return true;
            if (value.startsWith('http')) return true;
            return 'Please enter a valid Facebook URL';
          }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'string',
          description: 'Instagram profile URL',
          validation: (Rule) => Rule.custom((value) => {
            if (!value) return true;
            if (value.startsWith('http')) return true;
            return 'Please enter a valid Instagram URL';
          }),
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Section',
      type: 'object',
      fields: [
        defineField({
          name: 'year',
          title: 'Copyright Year',
          type: 'string',
          description: 'Copyright year (e.g., 2025)',
          validation: (Rule) => Rule.max(10),
        }),
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          description: 'Company name for copyright',
          validation: (Rule) => Rule.max(100),
        }),
        defineField({
          name: 'rightsText',
          title: 'Rights Text',
          type: 'string',
          description: 'Additional rights text (e.g., "All rights reserved")',
          validation: (Rule) => Rule.max(100),
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Dark Gray', value: 'gray-900' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Custom background color (Tailwind class or hex code)',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark Text (for light backgrounds)', value: 'dark' },
          { title: 'Light Text (for dark backgrounds)', value: 'light' },
        ],
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      title: 'copyright.companyName',
      subtitle: 'contact.email',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title ? `Footer - ${title}` : 'Footer Configuration',
        subtitle: subtitle ? `Contact: ${subtitle}` : 'No contact email set',
      };
    },
  },
}); 