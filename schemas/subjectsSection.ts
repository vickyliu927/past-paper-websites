import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subjectsSection',
  title: 'Subjects Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Browse Past Papers by Subject'
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      validation: Rule => Rule.required(),
      initialValue: 'Explore our comprehensive collection of past papers organized by subject across all supported curricula. Each subject contains papers from multiple exam boards.'
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder Text',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Search by subject code (e.g. 9701)'
    }),
    defineField({
      name: 'categories',
      title: 'Subject Categories',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required(),
      initialValue: ['All Subjects', 'Sciences', 'Mathematics', 'Languages', 'Humanities']
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Subject Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'code',
            title: 'Subject Code',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'level',
            title: 'Level',
            type: 'string',
            validation: Rule => Rule.required(),
            initialValue: 'A-Level & GCSE'
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: ['Sciences', 'Mathematics', 'Languages', 'Humanities']
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'examBoards',
            title: 'Exam Boards',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required()
          },
          {
            name: 'url',
            title: 'Subject URL',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'iconColor',
            title: 'Icon Background Color',
            type: 'string',
            initialValue: '#E8FAF0'  // Light green for Biology
          }
        ]
      }],
      initialValue: [
        {
          name: 'Biology',
          code: '9700',
          level: 'A-Level & GCSE',
          category: 'Sciences',
          examBoards: ['AQA', 'OCR', 'Edexcel', 'CAIE'],
          url: '/subjects/biology',
          iconColor: '#E8FAF0'
        },
        {
          name: 'Chemistry',
          code: '9701',
          level: 'A-Level & GCSE',
          category: 'Sciences',
          examBoards: ['AQA', 'OCR', 'Edexcel'],
          url: '/subjects/chemistry',
          iconColor: '#EBF3FF'
        },
        {
          name: 'Physics',
          code: '9702',
          level: 'A-Level & GCSE',
          category: 'Sciences',
          examBoards: [],
          url: '/subjects/physics',
          iconColor: '#F3E8FF'
        },
        {
          name: 'Economics',
          code: '9708',
          level: 'A-Level & GCSE',
          category: 'Humanities',
          examBoards: [],
          url: '/subjects/economics',
          iconColor: '#FFF7E6'
        },
        {
          name: 'Mathematics',
          code: '9709',
          level: 'A-Level & GCSE',
          category: 'Mathematics',
          examBoards: [],
          url: '/subjects/mathematics',
          iconColor: '#FFE8E8'
        }
      ]
    })
  ]
}) 