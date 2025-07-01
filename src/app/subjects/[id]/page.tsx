import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../../../lib/sanity';
import { getSubjectPageQuery, getFooterQuery } from '../../../../lib/queries';
import { SubjectPageData, SubjectPagePaper, FooterConfig } from '@/types';
import { urlFor } from '@/sanity/lib/image';
import Footer from '@/components/Footer';
import SubjectPageClient from './SubjectPageClient';

interface SubjectPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ board?: string }>;
}

export default async function SubjectPage({ params, searchParams }: SubjectPageProps) {
  const { id: subjectId } = await params;
  const { board: selectedBoard } = await searchParams;
  
  // Fetch Sanity data
  const [subjectPageData, footerData] = await Promise.all([
    client.fetch(getSubjectPageQuery, { subjectId }),
    client.fetch(getFooterQuery)
  ]);

  // Default values for missing data
  const papers: SubjectPagePaper[] = subjectPageData?.pastPapers || [];
  
  const getDefaultValues = () => ({
    title: subjectPageData?.title || `${subjectId} Past Papers`,
    description: subjectPageData?.description || `Comprehensive past papers covering multiple curricula. Access comprehensive past papers, mark schemes, and examiner reports from multiple curricula.`,
    badges: {
      supportBadge: subjectPageData?.badges?.supportBadge || 'Multi-Curriculum Support',
      resourcesBadge: subjectPageData?.badges?.resourcesBadge?.replace('{count}', papers.length.toString()) || `${papers.length} Resources Available`,
      examBoardBadge: subjectPageData?.badges?.examBoardBadge
    },
    database: {
      title: subjectPageData?.databaseSection?.title || 'Past Papers Database',
      filterLabel: subjectPageData?.databaseSection?.filterLabel || 'Year & Session',
      allFilterOption: subjectPageData?.databaseSection?.allFilterOption || 'All Years & Sessions',
      noResultsText: subjectPageData?.databaseSection?.noResultsText || 'No papers found matching your criteria.',
      showingText: subjectPageData?.databaseSection?.showingText || `Showing {filtered} of {total} papers`
    },
    sidebar: {
      actionButtons: {
        studyNotesButton: {
          text: subjectPageData?.sidebar?.actionButtons?.studyNotesButton?.text || 'Subject Study Notes',
          url: subjectPageData?.sidebar?.actionButtons?.studyNotesButton?.url || '#'
        },
        practiceQuestionsButton: {
          text: subjectPageData?.sidebar?.actionButtons?.practiceQuestionsButton?.text || 'Subject Practice Questions',
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
  });

  if (!subjectPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900">Subject Not Found</h1>
          <p className="mt-2 text-gray-600">The subject you're looking for doesn't exist or hasn't been configured yet.</p>
          <Link href="/subjects" className="mt-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const defaults = getDefaultValues();

  return (
    <div className="bg-white">
      <SubjectPageClient 
        subjectPageData={subjectPageData}
        papers={papers}
        defaults={defaults}
        subjectId={subjectId}
        selectedBoard={selectedBoard}
      />
      <Footer data={footerData} />
    </div>
  );
} 