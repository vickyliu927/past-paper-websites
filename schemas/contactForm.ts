import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      description: 'Main title of the contact form',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Form Description',
      type: 'text',
      description: 'Description text below the title',
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Company name mentioned in the description (e.g., TutorChase)',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company URL',
      type: 'string',
      description: 'URL to the company website',
      validation: (Rule) => Rule.custom((value) => {
        if (!value) return true;
        if (value.startsWith('http')) return true;
        return 'Please enter a valid URL starting with http or https';
      }),
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'fullNameLabel',
          title: 'Full Name Label',
          type: 'string',
          initialValue: 'Full name',
        }),
        defineField({
          name: 'fullNamePlaceholder',
          title: 'Full Name Placeholder',
          type: 'string',
          initialValue: 'Enter your full name',
        }),
        defineField({
          name: 'countryLabel',
          title: 'Country Label',
          type: 'string',
          initialValue: 'Country',
        }),
        defineField({
          name: 'countryPlaceholder',
          title: 'Country Placeholder',
          type: 'string',
          initialValue: 'Enter your country',
        }),
        defineField({
          name: 'emailLabel',
          title: 'Email Label',
          type: 'string',
          initialValue: 'Your email',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Enter your email address',
        }),
        defineField({
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'string',
          initialValue: 'Your phone (with country code)',
        }),
        defineField({
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'string',
          initialValue: '+1 (555) 123-4567',
        }),
        defineField({
          name: 'detailsLabel',
          title: 'Details Label',
          type: 'string',
          initialValue: 'Details of tutoring request (e.g., exams, subjects, how long for etc.)',
        }),
        defineField({
          name: 'detailsPlaceholder',
          title: 'Details Placeholder',
          type: 'text',
          initialValue: 'Please provide details about your tutoring needs, including subjects, exam preparation requirements, duration, and any specific goals...',
        }),
        defineField({
          name: 'budgetLabel',
          title: 'Budget Label',
          type: 'string',
          initialValue: 'Hourly budget (including currency)',
        }),
        defineField({
          name: 'budgetPlaceholder',
          title: 'Budget Placeholder',
          type: 'string',
          initialValue: 'e.g. $50/hour, £40/hour, €45/hour',
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'SUBMIT',
        }),
      ],
    }),
    defineField({
      name: 'emailSettings',
      title: 'Email Notification Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'notificationEmail',
          title: 'Notification Email',
          type: 'string',
          description: 'Email address to receive form submissions',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'emailSubject',
          title: 'Email Subject',
          type: 'string',
          initialValue: 'New Tutoring Inquiry',
          description: 'Subject line for notification emails',
        }),
        defineField({
          name: 'autoReplySubject',
          title: 'Auto-Reply Subject',
          type: 'string',
          initialValue: 'Thank you for your inquiry',
          description: 'Subject line for auto-reply emails to users',
        }),
        defineField({
          name: 'autoReplyMessage',
          title: 'Auto-Reply Message',
          type: 'text',
          description: 'Message sent to users after form submission',
          initialValue: 'Thank you for your inquiry. We will get back to you within 24 hours.',
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Light Blue', value: 'blue-50' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Custom background color (Tailwind class or hex code)',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Form Maximum Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small (md)', value: 'md' },
          { title: 'Medium (lg)', value: 'lg' },
          { title: 'Large (xl)', value: 'xl' },
          { title: 'Extra Large (2xl)', value: '2xl' },
        ],
      },
      initialValue: 'lg',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Success Title',
          type: 'string',
          initialValue: 'Message sent successfully!'
        }),
        defineField({
          name: 'description',
          title: 'Success Description',
          type: 'text',
          initialValue: 'Thank you for your message. We\'ll get back to you soon.'
        })
      ]
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Error Title',
          type: 'string',
          initialValue: 'Failed to send message'
        }),
        defineField({
          name: 'description',
          title: 'Error Description',
          type: 'text',
          initialValue: 'Something went wrong. Please try again later.'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      companyName: 'companyName',
    },
    prepare(selection) {
      const { title, companyName } = selection;
      return {
        title: title || 'Contact Form Configuration',
        subtitle: companyName ? `Company: ${companyName}` : 'No company set',
      };
    },
  },
}); 