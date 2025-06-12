import { Subject, PastPaper, Testimonial, FAQ, ContactForm } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'biology',
    name: 'Biology',
    description: 'Comprehensive biology past papers covering molecular biology, genetics, ecology, and evolution across multiple curricula.',
    icon: '📖',
    category: 'Sciences',
    paperCount: 450,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Biology (HL & SL)',
      'AP Biology',
      'Edexcel A-Levels',
      'AQA A-Levels'
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Complete chemistry examination resources including organic, inorganic, and physical chemistry from leading exam boards.',
    icon: '📖',
    category: 'Sciences',
    paperCount: 420,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Chemistry (HL & SL)',
      'AP Chemistry',
      'Edexcel A-Levels',
      'OCR A-Levels'
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Extensive physics past papers covering mechanics, electricity, quantum physics, and thermodynamics across all major curricula.',
    icon: '📖',
    category: 'Sciences',
    paperCount: 380,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Physics (HL & SL)',
      'AP Physics 1, 2, C',
      'Edexcel A-Levels',
      'AQA A-Levels'
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Comprehensive mathematics resources including pure math, statistics, and mechanics from international curricula.',
    icon: '📖',
    category: 'Mathematics',
    paperCount: 520,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Mathematics (HL & SL)',
      'AP Calculus & Statistics',
      'Edexcel A-Levels',
      'Further Mathematics'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Economics past papers covering microeconomics, macroeconomics, and international economics from top exam boards.',
    icon: '📖',
    category: 'Humanities',
    paperCount: 290,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Economics (HL & SL)',
      'AP Economics (Macro & Micro)',
      'Edexcel A-Levels',
      'AQA A-Levels'
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Computer science examination materials covering programming, algorithms, data structures, and systems architecture.',
    icon: '📖',
    category: 'Sciences',
    paperCount: 220,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB Computer Science (HL & SL)',
      'AP Computer Science A & Principles',
      'Edexcel A-Levels',
      'OCR A-Levels'
    ]
  },
  {
    id: 'english-language',
    name: 'English Language',
    description: 'English Language past papers covering comprehension, composition, and language analysis from multiple international curricula.',
    icon: '📖',
    category: 'Languages',
    paperCount: 340,
    topics: [
      'CIE A-Levels & IGCSE',
      'IB English A & B (HL & SL)',
      'AP English Language & Literature',
      'Edexcel A-Levels',
      'AQA A-Levels'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    subject: 'IB Biology HL',
    grade: '7/7',
    text: 'The IB Biology past papers helped me understand the exam format perfectly. The marking schemes were invaluable for learning how to structure my answers.'
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    subject: 'CIE Chemistry A-Level',
    grade: 'A*',
    text: 'Having access to years of CIE Chemistry papers allowed me to practice extensively. The variety of question types prepared me for anything in the real exam.'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    subject: 'AP Calculus BC',
    grade: '5/5',
    text: 'The AP Calculus past papers collection was comprehensive and well-organized. It made my exam preparation so much more effective and targeted.'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Which curricula do you support?',
    answer: 'We support all major international curricula including Cambridge International (CIE) A-Levels and IGCSE, International Baccalaureate (IB) Diploma Programme, Advanced Placement (AP), and UK exam boards including Edexcel, AQA, and OCR.'
  },
  {
    id: '2',
    question: 'How often are new past papers added?',
    answer: 'We regularly update our collection with the latest past papers from all supported curricula. New papers are typically added within days of being released by the respective exam boards.'
  },
  {
    id: '3',
    question: 'Do you provide marking schemes and grade boundaries?',
    answer: 'Yes, we provide comprehensive examination resources including question papers, marking schemes, examiner reports, grade boundaries, and specimen papers where available across all curricula.'
  },
  {
    id: '4',
    question: 'Can I filter papers by specific curriculum and year?',
    answer: 'Absolutely! Our advanced filtering system allows you to search by curriculum, subject, year, session, paper type, and level. This makes it easy to find exactly what you need for your specific examination board.'
  },
  {
    id: '5',
    question: 'Is the service free to use?',
    answer: 'Yes, our basic past paper collection is completely free to access. We believe in making quality educational resources available to all students regardless of their financial situation.'
  },
  {
    id: '6',
    question: 'How can I request papers from a specific curriculum or subject?',
    answer: 'If you cannot find specific papers you need, please contact us through our contact form. Include details about the curriculum, subject, year, and session you require, and we will do our best to help you locate the resources.'
  }
];

// Mock past papers data for different curricula
export const pastPapers: PastPaper[] = [
  {
    id: '1',
    title: 'Biology Paper 1',
    curriculum: 'CIE A-Level',
    year: '2023',
    session: 'May/June',
    paperType: 'Theory',
    subjectId: 'biology',
    downloadUrl: '/papers/cie-biology-2023-mj-p1.pdf',
    hasMarkingScheme: true
  },
  {
    id: '2',
    title: 'Biology HL Paper 1',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Theory',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-hl-2023-may-p1.pdf',
    hasMarkingScheme: true
  },
  {
    id: '3',
    title: 'AP Biology',
    curriculum: 'Advanced Placement',
    year: '2023',
    session: 'May',
    paperType: 'Complete Exam',
    subjectId: 'biology',
    downloadUrl: '/papers/ap-biology-2023-may.pdf',
    hasMarkingScheme: true
  }
  // Add more mock papers as needed
]; 