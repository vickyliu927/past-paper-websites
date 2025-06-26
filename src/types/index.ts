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

export interface WhyChoosePlatformCallToAction {
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface WhyChoosePlatformData {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: WhyChoosePlatformFeature[];
  callToAction?: WhyChoosePlatformCallToAction;
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

export interface HeroAdvertisement {
  tagline?: string;
  mainText?: string;
  statistic?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
  avatarImage1?: any;
  avatarImage2?: any;
  avatarImage3?: any;
}

export interface ExamBoard {
  title: string;
  image?: any;
  description: string;
  buttonText: string;
  buttonUrl: string;
  pills: string[];
}

export interface ExamBoardsSection {
  title: string;
  description: string;
  examBoards: ExamBoard[];
  isActive: boolean;
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

export interface SubjectPagePaper {
  title: string;
  year: string;
  session: string;
  curriculum?: string;
  paperType?: string;
  questionPaperUrl?: string;
  markSchemeUrl?: string;
  questionPaperText?: string;
  markSchemeText?: string;
}

export interface SubjectPageData {
  _id?: string;
  subjectId: string;
  title?: string;
  description?: string;
  badges?: {
    supportBadge?: string;
    resourcesBadge?: string;
  };
  databaseSection?: {
    title?: string;
    filterLabel?: string;
    allFilterOption?: string;
    noResultsText?: string;
    showingText?: string;
  };
  pastPapers?: SubjectPagePaper[];
  sidebar?: {
    quickStats?: {
      title?: string;
      totalPapersLabel?: string;
      yearsAvailableLabel?: string;
    };
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