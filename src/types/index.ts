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

export interface WhyChoosePlatformFeature {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChoosePlatformData {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: WhyChoosePlatformFeature[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}

export interface StudentTestimonial {
  studentName: string;
  subject: string;
  grade: string;
  quote: string;
  avatar?: any;
  avatarColor?: string;
  customAvatarColor?: string;
  gradeColor?: string;
  customGradeColor?: string;
}

export interface StudentTestimonialsData {
  title?: string;
  description?: string;
  testimonials?: StudentTestimonial[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}

export interface FaqItem {
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
}

export interface FaqData {
  title?: string;
  description?: string;
  faqs?: FaqItem[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
}

export interface ContactFormField {
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  countryLabel?: string;
  countryPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  budgetLabel?: string;
  budgetPlaceholder?: string;
  submitButtonText?: string;
}

export interface ContactFormData {
  title?: string;
  description?: string;
  companyName?: string;
  companyUrl?: string;
  formFields?: ContactFormField;
  backgroundColor?: string;
  customBackgroundColor?: string;
  maxWidth?: string;
}

export interface ContactFormSubmission {
  fullName: string;
  country: string;
  email: string;
  phone: string;
  tutoringDetails: string;
  hourlyBudget: string;
  submittedAt: string;
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
  notes?: string;
}


export interface ExamBoardPill {
  text: string;
  enableLink?: boolean;
  url?: string;
}

export interface SubjectExamBoard {
  text: string;
  enableLink: boolean;
  url?: string;
}

export interface ExamBoard {
  title: string;
  image?: any;
  description: string;
  buttonText: string;
  buttonUrl: string;
  pills: ExamBoardPill[];
}

export interface ExamBoardsSection {
  title: string;
  description: string;
  examBoards: ExamBoard[];
  isActive: boolean;
  buttonText: string;
}

export interface FooterConfig {
  _id?: string;
  logo?: {
    image?: any;
    alt?: string;
  };
  description?: string;
  quickLinks?: {
    title?: string;
    links?: {
      text: string;
      url?: string;
    }[];
  };
  contact?: {
    title?: string;
    email?: string;
    phone?: string;
    address?: string;
    customLink?: {
      text?: string;
      url?: string;
    };
  };
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  copyright?: {
    year?: string;
    companyName?: string;
    rightsText?: string;
  };
  backgroundColor?: string;
  customBackgroundColor?: string;
  textColor?: string;
}

export interface ExamPaper {
  title: string;
  fileUrl?: string;
  url?: string;
}

export interface MarkScheme {
  title: string;
  fileUrl?: string;
  url?: string;
}

export interface SubjectPagePaper {
  title: string;
  year: string;
  session: string;
  curriculum?: string;
  paperType?: string;
  examPapers?: ExamPaper[];
  markSchemes?: MarkScheme[];
  questionPaperFileUrl?: string;
  questionPaperUrl?: string;
  markSchemeFileUrl?: string;
  markSchemeUrl?: string;
  questionPaperText?: string;
  markSchemeText?: string;
}

export interface SubjectPageData {
  _id?: string;
  subjectId: string;
  examBoard?: {
    name: string;
    slug: {
      current: string;
    };
    description?: string;
  };
  title?: string;
  description?: string;
  databaseSection?: {
    title?: string;
    filterLabel?: string;
    allFilterOption?: string;
    noResultsText?: string;
  };
  pastPapers?: SubjectPagePaper[];
  sidebar?: {
    actionButtons?: {
      studyNotesButton?: {
        text?: string;
        url?: string;
      };
      practiceQuestionsButton?: {
        text?: string;
        url?: string;
      };
    };
    tutorSection?: {
      title?: string;
      rating?: number;
      reviewsText?: string;
      description?: string;
      tutors?: {
        name: string;
        credentials?: string;
        avatar?: any;
      }[];
      hireTutorButton?: {
        text?: string;
        url?: string;
      };
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
} 