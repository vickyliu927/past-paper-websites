import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'examBoardPage',
  title: 'Exam Board Page',
  type: 'document',
  fields: [
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      description: 'Link this exam board page to a specific subject (e.g., Biology, Chemistry)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Customize the hero title. Examples: "Choose Your Biology Exam Board", "Select Your Chemistry Exam Board", or keep generic: "Choose Your Exam Board"',
      initialValue: 'Choose Your Exam Board'
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      description: 'Customize the hero description. You can make it subject-specific like "Select your exam board to access relevant biology past papers and resources."',
      initialValue: 'Select your exam board to access relevant past papers and resources for this subject.'
    }),
    defineField({
      name: 'isActive',
      title: 'Page Active',
      type: 'boolean',
      description: 'Toggle to activate/deactivate this page',
      initialValue: true
    }),
    defineField({
      name: 'examBoardsSection',
      title: 'Exam Boards Section',
      type: 'reference',
      to: [{ type: 'examBoardsSection' }],
      description: 'Reference to the exam boards section configuration'
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      subjectTitle: 'subject.title'
    },
    prepare(selection) {
      const { title, isActive, subjectTitle } = selection
      return {
        title: `${subjectTitle || 'No Subject'} - ${title || 'Exam Board Page'}`,
        subtitle: isActive ? 'Active' : 'Inactive'
      }
    }
  }
}) 