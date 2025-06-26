export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    {
      name: 'questionNumber',
      title: 'Question Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Question Content',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pastPaper',
      title: 'Past Paper',
      type: 'reference',
      to: [{ type: 'pastPaper' }],
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
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{ type: 'topic' }],
    },
    {
      name: 'marks',
      title: 'Marks Available',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Hard', value: 'hard' },
        ],
      },
    },
    {
      name: 'questionImage',
      title: 'Question Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'Solution/Explanation',
      type: 'text',
    },
    {
      name: 'solutionImage',
      title: 'Solution Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      title: 'questionNumber',
      subtitle: 'title',
      media: 'questionImage',
    },
  },
}; 