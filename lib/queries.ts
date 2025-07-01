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

export const getExamBoardPageQuery = groq`
  *[_type == "examBoardPage" && isActive == true && subject->slug.current == $subjectSlug][0] {
    title,
    description,
    isActive,
    subject-> {
      title,
      slug
    },
    examBoardsSection-> {
      title,
      description,
      isActive
    },
    // Get actual exam board documents for dynamic URL generation
    "examBoards": *[_type == "examBoard" && isActive == true] | order(name asc) {
      name,
      slug,
      description,
      pills,
      "logoUrl": logo.asset->url
    }
  }
`;

export const getSubjectPageQuery = groq`
  *[_type == "subjectPage" && subjectId == $subjectId][0] {
    subjectId,
    examBoard-> {
      name,
      slug,
      description
    },
    title,
    description,
    badges {
      supportBadge,
      resourcesBadge,
      examBoardBadge
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
      "questionPaperFileUrl": questionPaperFile.asset->url,
      questionPaperUrl,
      "markSchemeFileUrl": markSchemeFile.asset->url,
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

// Query to get subject page by both subject and exam board
export const getSubjectPageByExamBoardQuery = groq`
  *[_type == "subjectPage" && subjectId == $subjectId && examBoard->slug.current == $examBoardSlug][0] {
    subjectId,
    examBoard-> {
      name,
      slug,
      description
    },
    title,
    description,
    badges {
      supportBadge,
      resourcesBadge,
      examBoardBadge
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
      "questionPaperFileUrl": questionPaperFile.asset->url,
      questionPaperUrl,
      "markSchemeFileUrl": markSchemeFile.asset->url,
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