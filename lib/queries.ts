import { client } from './sanity';
import { groq } from 'next-sanity';

// Get all active subjects
export async function getSubjects() {
  return client.fetch(`
    *[_type == "subject" && isActive == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      "imageUrl": image.asset->url,
      "examBoards": examBoards[]->{
        _id,
        name,
        slug,
        "logoUrl": logo.asset->url
      },
      "topics": topics[]->{
        _id,
        title,
        slug,
        description
      }
    }
  `);
}

// Get a single subject by slug
export async function getSubjectBySlug(slug: string) {
  return client.fetch(`
    *[_type == "subject" && slug.current == $slug && isActive == true][0] {
      _id,
      title,
      slug,
      description,
      "imageUrl": image.asset->url,
      "examBoards": examBoards[]->{
        _id,
        name,
        slug,
        "logoUrl": logo.asset->url
      },
      "topics": topics[]->{
        _id,
        title,
        slug,
        description
      }
    }
  `, { slug });
}

// Get all active exam boards
export async function getExamBoards() {
  return client.fetch(`
    *[_type == "examBoard" && isActive == true] | order(name asc) {
      _id,
      name,
      slug,
      description,
      "logoUrl": logo.asset->url,
      website
    }
  `);
}

// Get past papers for a specific subject and exam board
export async function getPastPapers(subjectSlug: string, examBoardSlug?: string) {
  const examBoardFilter = examBoardSlug ? `&& examBoard->slug.current == $examBoardSlug` : '';
  
  return client.fetch(`
    *[_type == "pastPaper" && subject->slug.current == $subjectSlug ${examBoardFilter} && isActive == true] | order(year desc, season asc) {
      _id,
      title,
      slug,
      year,
      season,
      paperNumber,
      level,
      "subject": subject->title,
      "examBoard": examBoard->name,
      "topic": topic->title,
      "paperFile": paperFile.asset->url,
      "markSchemeFile": markSchemeFile.asset->url,
      "questions": questions[]->{
        _id,
        questionNumber,
        title,
        content,
        marks,
        difficulty,
        "questionImage": questionImage.asset->url
      }
    }
  `, { subjectSlug, examBoardSlug });
}

// Get questions for a specific topic
export async function getQuestionsByTopic(topicSlug: string) {
  return client.fetch(`
    *[_type == "question" && topic->slug.current == $topicSlug && isActive == true] | order(questionNumber asc) {
      _id,
      questionNumber,
      title,
      content,
      marks,
      difficulty,
      "questionImage": questionImage.asset->url,
      "solutionImage": solutionImage.asset->url,
      answer,
      solution,
      tags,
      "pastPaper": pastPaper->{
        _id,
        title,
        year,
        season,
        "subject": subject->title,
        "examBoard": examBoard->name
      }
    }
  `, { topicSlug });
}

// Get all topics for a subject
export async function getTopicsBySubject(subjectSlug: string) {
  return client.fetch(`
    *[_type == "topic" && subject->slug.current == $subjectSlug && isActive == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      "examBoards": examBoards[]->{
        _id,
        name,
        slug
      }
    }
  `, { subjectSlug });
}

export const getHeaderQuery = groq`
  *[_type == "header"][0] {
    logo {
      image,
      link
    },
    navigationLinks[] {
      text,
      url
    },
    actionButtons[] {
      text,
      url,
      variant
    }
  }
`;

export const getHeroQuery = groq`
  *[_type == "hero"][0] {
    title,
    description,
    buttons[] {
      text,
      url,
      variant
    },
    features,
    advertisement {
      tagline,
      mainText,
      statistic,
      backgroundColor,
      textColor,
      icon,
      avatarImage1,
      avatarImage2,
      avatarImage3
    }
  }
`;

export const getSubjectsSectionQuery = groq`
  *[_type == "subjectsSection"][0] {
    title,
    description,
    searchPlaceholder,
    categories,
    subjects[] {
      name,
      code,
      level,
      category,
      examBoards,
      url,
      iconColor
    }
  }
`;

export const getExamBoardsSectionQuery = groq`
  *[_type == "examBoardsSection"][0] {
    title,
    description,
    isActive,
    examBoards[] {
      title,
      image,
      description,
      buttonText,
      buttonUrl,
      pills
    }
  }
`;

export const getWhyChoosePlatformQuery = groq`
  *[_type == "whyChoosePlatform"][0] {
    title,
    subtitle,
    description,
    features[] {
      title,
      description,
      icon
    },
    callToAction {
      text,
      url,
      variant
    },
    backgroundColor,
    customBackgroundColor,
    textAlignment
  }
`;

export const getStudentTestimonialsQuery = groq`
  *[_type == "studentTestimonials"][0] {
    title,
    description,
    testimonials[] {
      studentName,
      subject,
      grade,
      quote,
      avatar,
      avatarColor,
      customAvatarColor,
      gradeColor,
      customGradeColor
    },
    backgroundColor,
    customBackgroundColor,
    textAlignment
  }
`;

export const getFaqQuery = groq`
  *[_type == "faq"][0] {
    title,
    description,
    faqs[] {
      question,
      answer,
      isDefaultOpen
    },
    backgroundColor,
    customBackgroundColor,
    textAlignment,
    maxWidth
  }
`;

export const getContactFormQuery = groq`
  *[_type == "contactForm"][0] {
    title,
    description,
    companyName,
    companyUrl,
    formFields {
      fullNameLabel,
      fullNamePlaceholder,
      countryLabel,
      countryPlaceholder,
      emailLabel,
      emailPlaceholder,
      phoneLabel,
      phonePlaceholder,
      detailsLabel,
      detailsPlaceholder,
      budgetLabel,
      budgetPlaceholder,
      submitButtonText
    },
    emailSettings {
      notificationEmail,
      emailSubject,
      autoReplySubject,
      autoReplyMessage
    },
    backgroundColor,
    customBackgroundColor,
    maxWidth
  }
`;

export const getFooterQuery = groq`
  *[_type == "footer"][0] {
    logo {
      image,
      alt
    },
    description,
    quickLinks {
      title,
      links[] {
        text,
        url
      }
    },
    contact {
      title,
      email,
      phone,
      address
    },
    socialMedia {
      twitter,
      facebook,
      instagram
    },
    copyright {
      year,
      companyName,
      rightsText
    },
    backgroundColor,
    customBackgroundColor,
    textColor
  }
`;

export const getSubjectPageQuery = groq`
  *[_type == "subjectPage" && subjectId == $subjectId][0] {
    subjectId,
    title,
    description,
    badges {
      supportBadge,
      resourcesBadge
    },
    databaseSection {
      title,
      filterLabel,
      allFilterOption,
      noResultsText,
      showingText
    },
    pastPapers[] {
      title,
      year,
      session,
      curriculum,
      paperType,
      questionPaperUrl,
      markSchemeUrl,
      questionPaperText,
      markSchemeText
    },
    sidebar {
      quickStats {
        title,
        totalPapersLabel,
        yearsAvailableLabel
      },
      actionButtons {
        studyNotesButton {
          text,
          url
        },
        practiceQuestionsButton {
          text,
          url
        }
      },
      tutorSection {
        title,
        rating,
        reviewsText,
        description,
        tutors[] {
          name,
          credentials,
          avatar
        },
        hireTutorButton {
          text,
          url
        }
      }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`; 