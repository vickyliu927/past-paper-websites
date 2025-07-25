import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'subjectPage',
  title: 'Subject Page',
  type: 'document',
  fields: [
    defineField({
      name: 'subjectId',
      title: 'Subject ID',
      type: 'string',
      description: 'Unique identifier that matches the subject ID from the homepage (e.g., "biology", "chemistry")',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9-]+$/, {
        name: 'lowercase-with-dashes',
        invert: false
      }).error('Subject ID must be lowercase letters, numbers, and dashes only'),
    }),
    defineField({
      name: 'examBoard',
      title: 'Exam Board',
      type: 'reference',
      to: [{ type: 'examBoard' }],
      description: 'Select the exam board this subject page is associated with (e.g., AQA, CIE, Edexcel)',
      validation: (Rule) => Rule.required().error('Exam board is required'),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title displayed in the hero section (e.g., "Biology Past Papers")',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      description: 'Description text shown below the title in the hero section',
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),

    defineField({
      name: 'databaseSection',
      title: 'Past Papers Database Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Database Title',
          type: 'string',
          description: 'Title for the database section',
          validation: (Rule) => Rule.max(100),
        }),
        defineField({
          name: 'filterLabel',
          title: 'Filter Label',
          type: 'string',
          description: 'Label for the year/session filter dropdown',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'allFilterOption',
          title: 'All Filter Option Text',
          type: 'string',
          description: 'Text for the "All" option in the filter dropdown',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'noResultsText',
          title: 'No Results Text',
          type: 'string',
          description: 'Text shown when no papers match the filter',
          validation: (Rule) => Rule.max(100),
        }),

      ],
    }),
    defineField({
      name: 'pastPapers',
      title: 'Past Papers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pastPaper',
          title: 'Past Paper',
          fields: [
            defineField({
              name: 'title',
              title: 'Paper Title',
              type: 'string',
              description: 'Title of the past paper (e.g., "Biology HL Paper 1")',
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'Year of the exam (e.g., "2023")',
              validation: (Rule) => Rule.required().regex(/^\d{4}$/).error('Year must be a 4-digit number'),
            }),
            defineField({
              name: 'session',
              title: 'Session',
              type: 'string',
              description: 'Exam session (e.g., "May/June", "October/November")',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'curriculum',
              title: 'Curriculum',
              type: 'string',
              description: 'Curriculum type (e.g., "CIE A-Level", "IB Diploma")',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'paperType',
              title: 'Paper Type',
              type: 'string',
              description: 'Type of paper (e.g., "Theory", "Practical", "Mark Scheme")',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'examPapers',
              title: 'Exam Papers',
              type: 'array',
              description: 'Question papers, past papers, and related exam documents',
              of: [
                {
                  type: 'object',
                  name: 'examPaper',
                  title: 'Exam Paper',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Paper Title',
                      type: 'string',
                      description: 'Title for this paper (e.g., "Free Response Questions", "Multiple Choice Questions")',
                      validation: (Rule) => Rule.required().max(100),
                    }),
                    defineField({
                      name: 'file',
                      title: 'Paper File',
              type: 'file',
                      description: 'Upload the paper PDF directly',
              options: {
                accept: '.pdf'
              }
            }),
            defineField({
                      name: 'url',
                      title: 'Paper URL (Alternative)',
              type: 'url',
                      description: 'Or provide a link to the paper PDF if not uploading directly',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      file: 'file.asset.originalFilename',
                      url: 'url',
                    },
                    prepare(selection) {
                      const { title, file, url } = selection;
                      return {
                        title: title || 'Untitled Paper',
                        subtitle: file || url || 'No file/URL provided',
                      };
                    },
                  },
                }
              ],
            }),
            defineField({
              name: 'markSchemes',
              title: 'Mark Schemes',
              type: 'array',
              description: 'Mark schemes, sample responses, scoring guidelines, and related marking documents',
              of: [
                {
                  type: 'object',
                  name: 'markScheme',
                  title: 'Mark Scheme Document',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Document Title',
                      type: 'string',
                      description: 'Title for this document (e.g., "Sample Responses Q1", "Scoring Guidelines", "Chief Reader Report")',
                      validation: (Rule) => Rule.required().max(100),
                    }),
                    defineField({
                      name: 'file',
                      title: 'Document File',
              type: 'file',
                      description: 'Upload the document PDF directly',
              options: {
                accept: '.pdf'
              }
            }),
            defineField({
                      name: 'url',
                      title: 'Document URL (Alternative)',
              type: 'url',
                      description: 'Or provide a link to the document PDF if not uploading directly',
            }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      file: 'file.asset.originalFilename',
                      url: 'url',
                    },
                    prepare(selection) {
                      const { title, file, url } = selection;
                      return {
                        title: title || 'Untitled Document',
                        subtitle: file || url || 'No file/URL provided',
                      };
                    },
                  },
                }
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              year: 'year',
              session: 'session',
            },
            prepare(selection) {
              const { title, year, session } = selection;
              return {
                title: title,
                subtitle: `${year} ${session}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar Content',
      type: 'object',
      fields: [

        defineField({
          name: 'actionButtons',
          title: 'Action Buttons',
          type: 'object',
          fields: [
            defineField({
              name: 'studyNotesButton',
              title: 'Study Notes Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.max(50),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                }),
              ],
            }),
            defineField({
              name: 'practiceQuestionsButton',
              title: 'Practice Questions Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.max(50),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'tutorSection',
          title: 'Tutor Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Main title for the tutor section',
              validation: (Rule) => Rule.max(100),
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              description: 'Star rating (e.g., 4.9)',
              validation: (Rule) => Rule.min(0).max(5),
            }),
            defineField({
              name: 'reviewsText',
              title: 'Reviews Text',
              type: 'string',
              description: 'Text about reviews (e.g., "based on 581 reviews")',
              validation: (Rule) => Rule.max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Description text below the rating',
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'tutors',
              title: 'Featured Tutors',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Tutor Name',
                      type: 'string',
                      validation: (Rule) => Rule.required().max(50),
                    }),
                    defineField({
                      name: 'credentials',
                      title: 'Credentials',
                      type: 'string',
                      description: 'University and degree information',
                      validation: (Rule) => Rule.max(100),
                    }),
                    defineField({
                      name: 'avatar',
                      title: 'Avatar Image',
                      type: 'image',
                      description: 'Tutor profile picture',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'credentials',
                      media: 'avatar',
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'hireTutorButton',
              title: 'Hire Tutor Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.max(50),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for the page',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description for the page',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subjectId: 'subjectId',
      examBoardName: 'examBoard.name',
    },
    prepare(selection) {
      const { title, subjectId, examBoardName } = selection;
      return {
        title: title || `Subject Page`,
        subtitle: `${subjectId || 'No ID'} | ${examBoardName || 'No Exam Board'}`,
      };
    },
  },
}); 