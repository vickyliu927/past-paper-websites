import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'studentTestimonials',
  title: 'Student Success Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the testimonials section',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'Description text below the title',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'testimonials',
      title: 'Student Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'studentName',
              title: 'Student Name',
              type: 'string',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'subject',
              title: 'Subject',
              type: 'string',
              description: 'e.g., "IB Biology HL", "A-Level Mathematics"',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'grade',
              title: 'Grade Achieved',
              type: 'string',
              description: 'e.g., "7/7", "A*", "Grade 9"',
              validation: (Rule) => Rule.max(10),
            }),
            defineField({
              name: 'quote',
              title: 'Student Quote',
              type: 'text',
              description: 'The testimonial quote from the student',
              rows: 4,
              validation: (Rule) => Rule.max(500),
            }),
            defineField({
              name: 'avatar',
              title: 'Student Avatar',
              type: 'image',
              description: 'Optional profile picture (will use initials if not provided)',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'avatarColor',
              title: 'Avatar Background Color',
              type: 'string',
              description: 'Background color for avatar circle (used when no image)',
              options: {
                list: [
                  { title: 'Dark Gray', value: '#374151' },
                  { title: 'Blue', value: '#3B82F6' },
                  { title: 'Green', value: '#10B981' },
                  { title: 'Purple', value: '#8B5CF6' },
                  { title: 'Red', value: '#EF4444' },
                  { title: 'Yellow', value: '#F59E0B' },
                  { title: 'Pink', value: '#EC4899' },
                  { title: 'Indigo', value: '#6366F1' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: '#374151',
            }),
            defineField({
              name: 'customAvatarColor',
              title: 'Custom Avatar Color',
              type: 'string',
              description: 'Custom hex color for avatar background',
              hidden: ({ parent }) => parent?.avatarColor !== 'custom',
              validation: (Rule) => 
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.avatarColor === 'custom' && (!value || !value.match(/^#[0-9A-F]{6}$/i))) {
                    return 'Please enter a valid hex color (e.g., #FF0000)';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'gradeColor',
              title: 'Grade Badge Color',
              type: 'string',
              description: 'Color for the grade badge',
              options: {
                list: [
                  { title: 'Green', value: '#10B981' },
                  { title: 'Blue', value: '#3B82F6' },
                  { title: 'Purple', value: '#8B5CF6' },
                  { title: 'Orange', value: '#F97316' },
                  { title: 'Red', value: '#EF4444' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: '#10B981',
            }),
            defineField({
              name: 'customGradeColor',
              title: 'Custom Grade Color',
              type: 'string',
              description: 'Custom hex color for grade badge',
              hidden: ({ parent }) => parent?.gradeColor !== 'custom',
              validation: (Rule) => 
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.gradeColor === 'custom' && (!value || !value.match(/^#[0-9A-F]{6}$/i))) {
                    return 'Please enter a valid hex color (e.g., #FF0000)';
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              title: 'studentName',
              subtitle: 'subject',
              grade: 'grade',
            },
            prepare({ title, subtitle, grade }) {
              return {
                title: title || 'Unnamed Student',
                subtitle: `${subtitle || 'No subject'} - ${grade || 'No grade'}`,
              };
            },
          },
        },
      ],
      description: 'Add student testimonials with their success stories',
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
          { title: 'Light Green', value: 'green-50' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'white',
      description: 'Background color for the section',
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Custom background color (Tailwind class or hex code)',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
      description: 'Text alignment for the section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonialsCount: 'testimonials',
    },
    prepare(selection) {
      const { title, testimonialsCount } = selection;
      const count = testimonialsCount ? testimonialsCount.length : 0;
      return {
        title: title || 'Student Success Stories',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`,
      };
    },
  },
}); 