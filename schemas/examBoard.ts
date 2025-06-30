export default {
  name: 'examBoard',
  title: 'Exam Board',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'pills',
      title: 'Pills/Tags',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Pill',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL (optional)',
              type: 'url',
              description: 'If provided, the pill will be clickable and link to this URL',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title || 'Untitled pill',
                subtitle: subtitle ? `→ ${subtitle}` : 'No link',
              };
            },
          },
        },
      ],
      description: 'Tags that appear on the exam board card. Can be clickable if URL is provided.',
      validation: (Rule: any) => Rule.max(5).warning('Consider keeping pills concise - max 5 recommended'),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
}; 