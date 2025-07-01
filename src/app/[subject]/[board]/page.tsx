import { client } from '../../../../lib/sanity';
import { getSubjectPageByExamBoardQuery, getSubjectPageQuery, getFooterQuery } from '../../../../lib/queries';
import { SubjectPageData, SubjectPagePaper, FooterConfig } from '@/types';
import { urlFor } from '@/sanity/lib/image';
import Footer from '@/components/Footer';
import SubjectPageClient from '../../subjects/[id]/SubjectPageClient';
import { notFound } from 'next/navigation';

interface SubjectBoardPageProps {
  params: Promise<{ subject: string; board: string }>;
}

export default async function SubjectBoardPage({ params }: SubjectBoardPageProps) {
  const { subject, board } = await params;
  
  // Try to fetch subject page data specific to this exam board first
  let subjectPageData = await client.fetch(getSubjectPageByExamBoardQuery, { 
    subjectId: subject, 
    examBoardSlug: board 
  });
  
  // If no exam board-specific page found, fall back to general subject page
  if (!subjectPageData) {
    subjectPageData = await client.fetch(getSubjectPageQuery, { subjectId: subject });
  }
  
  const footerData = await client.fetch(getFooterQuery);

  // If subject data doesn't exist, show 404
  if (!subjectPageData) {
    notFound();
  }

  // Default values for missing data
  const papers: SubjectPagePaper[] = subjectPageData?.pastPapers || [];
  
  // For now, show all papers - filtering can be added when examBoard field is available in the type
  const filteredPapers = papers;
  
  const getDefaultValues = () => {
    // Use exam board name from Sanity if available, otherwise use URL param
    const examBoardName = subjectPageData?.examBoard?.name || board.toUpperCase();
    const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
    
    return {
      title: `${subjectName} ${examBoardName} Past Papers`,
      description: subjectPageData?.description || `Access comprehensive ${examBoardName} past papers for ${subject}. Download question papers, mark schemes, and examiner reports.`,
      badges: {
        supportBadge: subjectPageData?.badges?.supportBadge || `${examBoardName} Exam Board`,
        resourcesBadge: subjectPageData?.badges?.resourcesBadge?.replace('{count}', filteredPapers.length.toString()) || `${filteredPapers.length} ${examBoardName} Papers Available`,
        examBoardBadge: subjectPageData?.badges?.examBoardBadge
      },
      database: {
        title: `${examBoardName} Past Papers Database`,
        filterLabel: subjectPageData?.databaseSection?.filterLabel || 'Year & Session',
        allFilterOption: subjectPageData?.databaseSection?.allFilterOption || 'All Years & Sessions',
        noResultsText: `No ${examBoardName} papers found matching your criteria.`,
        showingText: subjectPageData?.databaseSection?.showingText || `Showing {filtered} of {total} papers`
      },
      sidebar: {
        actionButtons: {
          studyNotesButton: {
            text: `${subjectName} Study Notes`,
            url: subjectPageData?.sidebar?.actionButtons?.studyNotesButton?.url || '#'
          },
          practiceQuestionsButton: {
            text: `${subjectName} Practice Questions`,
            url: subjectPageData?.sidebar?.actionButtons?.practiceQuestionsButton?.url || '#'
          }
        },
        tutorSection: {
          title: subjectPageData?.sidebar?.tutorSection?.title || 'Need help from an expert?',
          rating: subjectPageData?.sidebar?.tutorSection?.rating || 4.9,
          reviewsText: subjectPageData?.sidebar?.tutorSection?.reviewsText || 'based on 581 reviews',
          description: subjectPageData?.sidebar?.tutorSection?.description || "The world's top online tutoring provider trusted by students, parents, and schools globally.",
          tutors: subjectPageData?.sidebar?.tutorSection?.tutors || [
            { name: 'Ollie', credentials: 'Cambridge University - BA Natural Sciences', avatar: null },
            { name: 'Suraya', credentials: 'Oxford University - PhD Neuroscience and Mental Health', avatar: null },
            { name: 'Jake', credentials: 'Oxford University - MSc Neuroscience', avatar: null }
          ],
          hireTutorButton: {
            text: subjectPageData?.sidebar?.tutorSection?.hireTutorButton?.text || 'Hire a Tutor',
            url: subjectPageData?.sidebar?.tutorSection?.hireTutorButton?.url || '#'
          }
        }
      }
    };
  };

  const defaults = getDefaultValues();

  return (
    <div className="bg-white">
      <SubjectPageClient 
        subjectPageData={subjectPageData}
        papers={filteredPapers}
        defaults={defaults}
        subjectId={subject}
        selectedBoard={board}
      />
      <Footer data={footerData} />
    </div>
  );
} 