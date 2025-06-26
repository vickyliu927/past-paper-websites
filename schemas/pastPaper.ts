export default {
  name: 'pastPaper',
  title: 'Past Paper',
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
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'examBoard',
      title: 'Exam Board',
      type: 'reference',
      to: [{ type: 'examBoard' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(2000).max(2030),
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          { title: 'Spring', value: 'spring' },
          { title: 'Summer', value: 'summer' },
          { title: 'Autumn', value: 'autumn' },
          { title: 'Winter', value: 'winter' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paperNumber',
      title: 'Paper Number',
      type: 'string',
      description: 'e.g., Paper 1, Paper 2, etc.',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'GCSE', value: 'gcse' },
          { title: 'A-Level', value: 'a-level' },
          { title: 'AS-Level', value: 'as-level' },
          { title: 'IB', value: 'ib' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paperFile',
      title: 'Paper File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'markSchemeFile',
      title: 'Mark Scheme File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
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
      subtitle: 'subject.title',
      media: 'paperFile',
    },
  },
}; 