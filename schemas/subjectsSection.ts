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
      of: [{ type: 'reference', to: [{ type: 'subject' }] }],
      description: 'Select which subjects to display in the grid. Subjects will be displayed in the order you arrange them here.',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      subjectCount: 'subjects'
    },
    prepare(selection) {
      const { title, subjectCount } = selection;
      const count = Array.isArray(subjectCount) ? subjectCount.length : 0;
      return {
        title: title || 'Subjects Section',
        subtitle: `${count} subject${count !== 1 ? 's' : ''} configured`
      };
    }
  }
}) 