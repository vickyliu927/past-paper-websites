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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on exam board buttons',
      initialValue: 'View Papers',
      validation: Rule => Rule.required()
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