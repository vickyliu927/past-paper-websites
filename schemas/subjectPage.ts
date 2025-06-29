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
      name: 'badges',
      title: 'Hero Badges',
      type: 'object',
      fields: [
        defineField({
          name: 'supportBadge',
          title: 'Support Badge Text',
          type: 'string',
          description: 'Text for the first badge (e.g., "Multi-Curriculum Support")',
          validation: (Rule) => Rule.max(50),
        }),
        defineField({
          name: 'resourcesBadge',
          title: 'Resources Badge Text',
          type: 'string',
          description: 'Text template for resources count (use {count} for dynamic number)',
          validation: (Rule) => Rule.max(50),
        }),
      ],
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
        defineField({
          name: 'showingText',
          title: 'Results Count Text',
          type: 'string',
          description: 'Template for showing results count (use {filtered} and {total})',
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
              name: 'questionPaperUrl',
              title: 'Question Paper URL',
              type: 'url',
              description: 'Link to the question paper PDF',
            }),
            defineField({
              name: 'markSchemeUrl',
              title: 'Mark Scheme URL',
              type: 'url',
              description: 'Link to the mark scheme PDF (optional)',
            }),
            defineField({
              name: 'questionPaperText',
              title: 'Question Paper Link Text',
              type: 'string',
              description: 'Text for the question paper link',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'markSchemeText',
              title: 'Mark Scheme Link Text',
              type: 'string',
              description: 'Text for the mark scheme link',
              validation: (Rule) => Rule.max(50),
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
          name: 'quickStats',
          title: 'Quick Stats Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Title for the quick stats section',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'totalPapersLabel',
              title: 'Total Papers Label',
              type: 'string',
              description: 'Label for total papers count',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'yearsAvailableLabel',
              title: 'Years Available Label',
              type: 'string',
              description: 'Label for years available count',
              validation: (Rule) => Rule.max(50),
            }),
          ],
        }),
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
    },
    prepare(selection) {
      const { title, subjectId } = selection;
      return {
        title: title || `Subject Page`,
        subtitle: subjectId ? `ID: ${subjectId}` : 'No subject ID set',
      };
    },
  },
}); 