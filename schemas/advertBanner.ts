export default {
  name: 'advertBanner',
  title: 'Advert Banner',
  type: 'document',
  fields: [
    {
      name: 'practiceQuestionsButton',
      title: 'Practice Questions Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Practice Questions',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          description: 'URL for the Practice Questions button (e.g. /practice-questions)',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'studyNotesButton',
      title: 'Study Notes Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Study Notes',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string',
          description: 'URL for the Study Notes button (e.g. /study-notes)',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Advert Banner Configuration',
        subtitle: 'Practice Questions & Study Notes button links',
      };
    },
  },
}; 