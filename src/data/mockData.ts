import { Subject, PastPaper, Testimonial, FAQ } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'biology',
    name: 'Biology',
    description: 'Comprehensive IB Biology past papers covering molecular biology, genetics, ecology, and evolution for both Higher Level (HL) and Standard Level (SL).',
    icon: 'microscope',
    category: 'Sciences',
    paperCount: 120,
    topics: [
      'Cell Biology',
      'Molecular Biology',
      'Genetics',
      'Ecology',
      'Evolution',
      'Human Physiology'
    ],
    code: '9700',
    yearsAvailable: ['2024', '2023', '2022', '2021', '2020']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Complete IB Chemistry examination resources including organic, inorganic, and physical chemistry for both HL and SL levels.',
    icon: 'flask-conical',
    category: 'Sciences',
    paperCount: 110,
    topics: [
      'Stoichiometry',
      'Atomic Theory',
      'Periodicity',
      'Chemical Bonding',
      'Energetics',
      'Organic Chemistry'
    ],
    code: '9701',
    yearsAvailable: ['2024', '2023', '2022', '2021', '2020', '2019']
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Extensive IB Physics past papers covering mechanics, electricity, quantum physics, and thermodynamics for both HL and SL.',
    icon: 'atom',
    category: 'Sciences',
    paperCount: 105,
    topics: [
      'Mechanics',
      'Thermal Physics',
      'Waves',
      'Electricity',
      'Quantum Physics',
      'Fields'
    ],
    code: '9702',
    yearsAvailable: ['2024', '2023', '2022', '2021', '2020']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Comprehensive IB Mathematics resources including Analysis & Approaches and Applications & Interpretation at both HL and SL levels.',
    icon: 'calculator',
    category: 'Mathematics',
    paperCount: 140,
    topics: [
      'Analysis & Approaches HL',
      'Analysis & Approaches SL',
      'Applications & Interpretation HL',
      'Applications & Interpretation SL'
    ],
    code: '9709',
    yearsAvailable: ['2024', '2023', '2022', '2021', '2020', '2019']
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'IB Economics past papers covering microeconomics, macroeconomics, and international economics for both HL and SL.',
    icon: 'line-chart',
    category: 'Humanities',
    paperCount: 90,
    topics: [
      'Microeconomics',
      'Macroeconomics',
      'International Economics',
      'Development Economics'
    ],
    code: '9708',
    yearsAvailable: ['2024', '2023', '2022', '2021']
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
    name: 'Michael Patel',
    subject: 'IB Mathematics AA HL',
    grade: '7/7',
    text: 'Having access to both Analysis & Approaches papers helped me master the challenging topics. The progression from easier to harder questions was perfect for my preparation.'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    subject: 'IB Chemistry SL',
    grade: '7/7',
    text: 'The IB Chemistry papers collection was comprehensive and well-organized. The detailed mark schemes helped me understand exactly what examiners are looking for.'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Which IB subjects do you support?',
    answer: 'We support all major IB Diploma Programme subjects including Biology, Chemistry, Physics, Mathematics (Analysis & Approaches and Applications & Interpretation), and Economics at both Higher Level (HL) and Standard Level (SL).'
  },
  {
    id: '2',
    question: 'How often are new past papers added?',
    answer: 'We regularly update our collection with the latest IB past papers. New papers are typically added within days of being released by the IB.'
  },
  {
    id: '3',
    question: 'Do you provide marking schemes and grade boundaries?',
    answer: 'Yes, we provide comprehensive IB examination resources including question papers, marking schemes, subject reports, and grade boundaries where available.'
  },
  {
    id: '4',
    question: 'Can I filter papers by HL/SL and exam session?',
    answer: 'Absolutely! Our filtering system allows you to search by level (HL/SL), year, and session (May/November). This makes it easy to find exactly what you need for your IB preparation.'
  }
];

// Mock past papers data for IB curriculum
export const pastPapers: PastPaper[] = [
  {
    id: 'bio-hl-23-1',
    title: 'Biology HL Paper 1',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Multiple Choice',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-hl-2023-may-p1.pdf',
    hasMarkingScheme: true,
    code: 'BIO_HL_23_P1'
  },
  {
    id: 'bio-hl-23-2',
    title: 'Biology HL Paper 2',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Extended Response',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-hl-2023-may-p2.pdf',
    hasMarkingScheme: true,
    code: 'BIO_HL_23_P2'
  },
  {
    id: 'bio-hl-23-3',
    title: 'Biology HL Paper 3',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Options',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-hl-2023-may-p3.pdf',
    hasMarkingScheme: true,
    code: 'BIO_HL_23_P3'
  },
  {
    id: 'bio-sl-23-1',
    title: 'Biology SL Paper 1',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Multiple Choice',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-sl-2023-may-p1.pdf',
    hasMarkingScheme: true,
    code: 'BIO_SL_23_P1'
  },
  {
    id: 'bio-sl-23-2',
    title: 'Biology SL Paper 2',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Extended Response',
    subjectId: 'biology',
    downloadUrl: '/papers/ib-biology-sl-2023-may-p2.pdf',
    hasMarkingScheme: true,
    code: 'BIO_SL_23_P2'
  },
  {
    id: 'math-aa-hl-23-1',
    title: 'Mathematics AA HL Paper 1',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'No Calculator',
    subjectId: 'mathematics',
    downloadUrl: '/papers/ib-math-aa-hl-2023-may-p1.pdf',
    hasMarkingScheme: true,
    code: 'MAT_AAHL_23_P1'
  },
  {
    id: 'math-aa-hl-23-2',
    title: 'Mathematics AA HL Paper 2',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Calculator',
    subjectId: 'mathematics',
    downloadUrl: '/papers/ib-math-aa-hl-2023-may-p2.pdf',
    hasMarkingScheme: true,
    code: 'MAT_AAHL_23_P2'
  },
  {
    id: 'math-aa-hl-23-3',
    title: 'Mathematics AA HL Paper 3',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'May',
    paperType: 'Problem Solving',
    subjectId: 'mathematics',
    downloadUrl: '/papers/ib-math-aa-hl-2023-may-p3.pdf',
    hasMarkingScheme: true,
    code: 'MAT_AAHL_23_P3'
  },
  {
    id: 'chem-hl-23-1',
    title: 'Chemistry HL Paper 1',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'November',
    paperType: 'Multiple Choice',
    subjectId: 'chemistry',
    downloadUrl: '/papers/ib-chemistry-hl-2023-nov-p1.pdf',
    hasMarkingScheme: true,
    code: 'CHE_HL_23_P1'
  },
  {
    id: 'chem-hl-23-2',
    title: 'Chemistry HL Paper 2',
    curriculum: 'IB Diploma',
    year: '2023',
    session: 'November',
    paperType: 'Extended Response',
    subjectId: 'chemistry',
    downloadUrl: '/papers/ib-chemistry-hl-2023-nov-p2.pdf',
    hasMarkingScheme: true,
    code: 'CHE_HL_23_P2'
  }
]; 