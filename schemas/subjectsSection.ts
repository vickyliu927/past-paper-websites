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
            of: [{
              type: 'object',
              title: 'Exam Board',
              fields: [
                {
                  name: 'text',
                  title: 'Exam Board Name',
                  type: 'string',
                  validation: Rule => Rule.required(),
                  description: 'Name of the exam board (e.g., AQA, OCR, Edexcel)'
                },
                {
                  name: 'enableLink',
                  title: 'Enable Link',
                  type: 'boolean',
                  description: 'Toggle to make this pill clickable',
                  initialValue: false
                },
                {
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                  description: 'URL to link to when clicked (e.g., /biology/aqa). Only used when "Enable Link" is toggled on.',
                  hidden: ({ parent }) => !parent?.enableLink,
                  validation: Rule => Rule.custom((value, context) => {
                    const enableLink = (context.parent as any)?.enableLink;
                    if (enableLink && !value) {
                      return 'URL is required when link is enabled';
                    }
                    return true;
                  })
                }
              ],
              preview: {
                select: {
                  title: 'text',
                  enableLink: 'enableLink',
                  url: 'url'
                },
                prepare(selection) {
                  const { title, enableLink, url } = selection;
                  return {
                    title: title || 'Untitled exam board',
                    subtitle: enableLink ? `→ ${url || 'No URL set'}` : 'Not linked',
                    media: enableLink ? 'LINKED' : 'PILL'
                  };
                }
              }
            }],
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
          examBoards: [
            { text: 'AQA', enableLink: true, url: '/biology/aqa' },
            { text: 'OCR', enableLink: true, url: '/biology/ocr' },
            { text: 'Edexcel', enableLink: true, url: '/biology/edexcel' },
            { text: 'CAIE', enableLink: true, url: '/biology/caie' }
          ],
          url: '/biology',
          iconColor: '#E8FAF0'
        },
        {
          name: 'Chemistry',
          code: '9701',
          level: 'A-Level & GCSE',
          category: 'Sciences',
          examBoards: [
            { text: 'AQA', enableLink: true, url: '/chemistry/aqa' },
            { text: 'OCR', enableLink: true, url: '/chemistry/ocr' },
            { text: 'Edexcel', enableLink: true, url: '/chemistry/edexcel' }
          ],
          url: '/chemistry',
          iconColor: '#EBF3FF'
        },
        {
          name: 'Physics',
          code: '9702',
          level: 'A-Level & GCSE',
          category: 'Sciences',
          examBoards: [
            { text: 'AQA', enableLink: true, url: '/physics/aqa' },
            { text: 'OCR', enableLink: true, url: '/physics/ocr' },
            { text: 'Edexcel', enableLink: true, url: '/physics/edexcel' }
          ],
          url: '/physics',
          iconColor: '#F3E8FF'
        },
        {
          name: 'Economics',
          code: '9708',
          level: 'A-Level & GCSE',
          category: 'Humanities',
          examBoards: [
            { text: 'AQA', enableLink: true, url: '/economics/aqa' },
            { text: 'OCR', enableLink: true, url: '/economics/ocr' },
            { text: 'Edexcel', enableLink: true, url: '/economics/edexcel' }
          ],
          url: '/economics',
          iconColor: '#FFF7E6'
        },
        {
          name: 'Mathematics',
          code: '9709',
          level: 'A-Level & GCSE',
          category: 'Mathematics',
          examBoards: [
            { text: 'AQA', enableLink: true, url: '/mathematics/aqa' },
            { text: 'OCR', enableLink: true, url: '/mathematics/ocr' },
            { text: 'Edexcel', enableLink: true, url: '/mathematics/edexcel' }
          ],
          url: '/mathematics',
          iconColor: '#FFE8E8'
        }
      ]
    })
  ]
}) 