import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactFormSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'User\'s full name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'User\'s country',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'User\'s email address',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'User\'s phone number with country code',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tutoringDetails',
      title: 'Tutoring Request Details',
      type: 'text',
      description: 'Details about tutoring needs',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hourlyBudget',
      title: 'Hourly Budget',
      type: 'string',
      description: 'User\'s hourly budget for tutoring',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'When the form was submitted',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
      description: 'Status of the inquiry',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for follow-up',
    }),
  ],
  orderings: [
    {
      title: 'Submitted Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare(selection) {
      const { title, subtitle, status, submittedAt } = selection;
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : '';
      return {
        title: title || 'Unnamed submission',
        subtitle: `${subtitle} • ${status} • ${date}`,
      };
    },
  },
}); 