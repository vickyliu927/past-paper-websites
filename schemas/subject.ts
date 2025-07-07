// Define a list of 15 carefully chosen colors for subject icons
const iconColorPalette = [
  '#E8FAF0', // Light green
  '#EBF3FF', // Light blue
  '#F3E8FF', // Light purple
  '#FFF7E6', // Light orange
  '#FFE8E8', // Light red
  '#E0F2FE', // Light cyan
  '#FEF3C7', // Light yellow
  '#FCE7F3', // Light pink
  '#F0FDFA', // Light teal
  '#FEF7FF', // Light violet
  '#FFFBEB', // Light amber
  '#F1F5F9', // Light slate
  '#FEF2F2', // Light rose
  '#ECFDF5', // Light emerald
  '#F0F9FF', // Light sky
];

// Function to get smart color assignment
const getSmartIconColor = (document: any) => {
  // Use multiple factors to determine color
  const title = document?.title || '';
  const category = document?.category || '';
  
  // Create a hash from title and category
  let hash = 0;
  const text = title + category;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use timestamp as additional entropy to avoid exact duplicates
  const timeComponent = Math.floor(Date.now() / 10000); // Changes every ~10 seconds
  const finalHash = Math.abs(hash + timeComponent);
  
  // Select color from palette
  const colorIndex = finalHash % iconColorPalette.length;
  return iconColorPalette[colorIndex];
};

export default {
  name: 'subject',
  title: 'Subject',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'code',
      title: 'Subject Code',
      type: 'string',
      description: 'Subject code (e.g. 9700 for Biology)',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'A-Level & GCSE',
      description: 'Educational level (e.g. A-Level & GCSE)',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sciences', value: 'Sciences' },
          { title: 'Mathematics', value: 'Mathematics' },
          { title: 'Languages', value: 'Languages' },
          { title: 'Humanities', value: 'Humanities' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Subject category for filtering',
    },
    {
      name: 'iconColor',
      title: 'Icon Background Color',
      type: 'string',
      initialValue: (document: any) => getSmartIconColor(document),
      description: 'Background color for the subject icon. Auto-assigned from curated palette based on subject name and category for good distribution.',
      options: {
        list: iconColorPalette.map((color, index) => ({
          title: `Color ${index + 1}`,
          value: color
        }))
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Subject Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'examBoards',
      title: 'Exam Boards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'examBoard' }] }],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which subjects appear on the website',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code',
      category: 'category',
      iconColor: 'iconColor',
      media: 'image',
    },
    prepare(selection: any) {
      const { title, code, category, iconColor } = selection;
      return {
        title: title,
        subtitle: code ? `${code} • ${category}` : category,
        media: selection.media,
      };
    },
  },
}; 