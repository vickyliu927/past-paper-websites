export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: string;
  topics: string[];
  paperCount: number;
  code: string;
  yearsAvailable: string[];
}

export interface PastPaper {
  id: string;
  title: string;
  curriculum: string;
  year: string;
  session: string;
  paperType: string;
  subjectId: string;
  downloadUrl: string;
  hasMarkingScheme: boolean;
  code?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  subject: string;
  grade: string;
  text: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactForm {
  name: string;
  email: string;
  curriculum: string;
  message: string;
} 