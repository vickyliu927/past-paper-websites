export default {
  name: 'subject',
  title: 'Subject',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      name: 'image',
      title: 'Subject Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'examBoards',
      title: 'Exam Boards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'examBoard' }] }],
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which subjects appear on the website',
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
      title: 'title',
      media: 'image',
    },
  },
}; 