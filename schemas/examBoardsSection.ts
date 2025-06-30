import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'examBoardsSection',
  title: 'Exam Boards Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (Optional)',
      type: 'string',
      description: 'Leave empty to hide the section title',
      initialValue: 'Choose Your Exam Board'
    }),
    defineField({
      name: 'description',
      title: 'Section Description (Optional)',
      type: 'text',
      description: 'Leave empty to hide the section description',
      initialValue: 'Select your exam board to access relevant past papers and resources.'
    }),
    defineField({
      name: 'isActive',
      title: 'Show Section',
      type: 'boolean',
      description: 'Toggle to show/hide this section on the website',
      initialValue: true
    }),
    defineField({
      name: 'examBoards',
      title: 'Exam Boards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Exam Board Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Exam Board Image',
              type: 'image',
              description: 'Image for the exam board (optional)',
              options: {
                hotspot: true
              }
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'View Papers'
            },
            {
              name: 'buttonUrl',
              title: 'Button URL',
              type: 'url',
              validation: Rule => Rule.required()
            },
            {
              name: 'pills',
              title: 'Tags/Pills',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add tags like curriculum types, years, etc.'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, isActive } = selection
      return {
        title: title || 'Exam Boards Section',
        subtitle: isActive ? 'Active' : 'Inactive'
      }
    }
  }
}) 