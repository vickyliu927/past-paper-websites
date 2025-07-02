import Link from 'next/link';
import { client } from '../../../lib/sanity';
import { getExamBoardPageQuery, getFooterQuery } from '../../../lib/queries';
import Footer from '@/components/Footer';
import ExamBoardsSection from '@/components/ExamBoardsSection';
import { notFound } from 'next/navigation';

interface ExamBoardPageProps {
  params: Promise<{ subject: string }>;
}

export default async function ExamBoardPage({ params }: ExamBoardPageProps) {
  const { subject } = await params;
  
  // Fetch data
  const [examBoardPageData, footerData] = await Promise.all([
    client.fetch(getExamBoardPageQuery, { subjectSlug: subject }),
    client.fetch(getFooterQuery)
  ]);

  // If page is not active or doesn't exist, show 404
  if (!examBoardPageData || !examBoardPageData.isActive) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {examBoardPageData.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {examBoardPageData.description}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              {/* Study Notes and Practice Questions CTA Buttons */}
              <Link
                href={`/${subject}/study-notes`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 text-white hover:opacity-90 w-44"
                style={{ backgroundColor: '#1e40af' }}
              >
                Study Notes
              </Link>
              <Link
                href={`/${subject}/practice-questions`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 text-white hover:opacity-90 w-44"
                style={{ backgroundColor: '#fb510f' }}
              >
                Practice Questions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {examBoardPageData.examBoardsSection && (
              <ExamBoardsSection 
                data={{
                  title: examBoardPageData.examBoardsSection.title,
                  description: examBoardPageData.examBoardsSection.description,
                  isActive: examBoardPageData.examBoardsSection.isActive,
                  examBoards: examBoardPageData.examBoards.map((board: any) => ({
                    title: board.name,
                    description: board.description || `Access comprehensive ${board.name} past papers and resources for ${subject}.`,
                    buttonText: 'View Papers',
                    buttonUrl: `/${subject}/${board.slug.current}`,
                    pills: board.pills || [
                      { text: `${board.name} Exam Board`, url: undefined },
                      { text: 'Past Papers Available', url: undefined }
                    ],
                    image: board.logoUrl ? { asset: { url: board.logoUrl } } : null
                  }))
                }} 
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 space-y-6">
            {/* Study Notes Ad Block */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="bg-[#001a96] p-6 text-white">
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
                  <div className="w-full h-full bg-white/10 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 transform -translate-x-4 translate-y-4">
                  <div className="w-full h-full bg-white/10 rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Premium Study Notes</h3>
                      <p className="text-blue-100 text-sm">Expert-crafted summaries</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed text-justify">
                    Study notes written by top graduates. Save hours of prep time with structured summaries.
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-white text-[#001a96] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Access Notes
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Questions Ad Block */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="bg-[#fb510f] p-6 text-white">
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
                  <div className="w-full h-full bg-white/10 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 transform -translate-x-4 translate-y-4">
                  <div className="w-full h-full bg-white/10 rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Practice Questions</h3>
                      <p className="text-orange-100 text-sm">Test your knowledge</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed text-justify">
                    Master exam techniques with targeted practice questions. Get instant feedback and detailed explanations.
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-white text-[#fb510f] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Start Practice
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer data={footerData} />
    </div>
  );
} 