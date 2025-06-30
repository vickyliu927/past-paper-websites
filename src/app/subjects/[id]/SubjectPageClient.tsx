'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SubjectPageData, SubjectPagePaper } from '@/types';
import { urlFor } from '@/sanity/lib/image';

interface SubjectPageClientProps {
  subjectPageData: SubjectPageData;
  papers: SubjectPagePaper[];
  defaults: any;
  subjectId: string;
  selectedBoard?: string;
}

export default function SubjectPageClient({ 
  subjectPageData, 
  papers, 
  defaults, 
  subjectId,
  selectedBoard 
}: SubjectPageClientProps) {
  const [selectedYearSession, setSelectedYearSession] = useState<string>('all');

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const yearSession = `${paper.year} ${paper.session}`.trim();
      if (selectedYearSession !== 'all' && yearSession !== selectedYearSession) return false;
      return true;
    });
  }, [papers, selectedYearSession]);

  const availableYearSessions = [...new Set(papers.map(paper => `${paper.year} ${paper.session}`.trim()))]
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));

  // Group papers by year and session
  const groupedPapers = useMemo(() => {
    const grouped = filteredPapers.reduce((acc, paper) => {
      const year = paper.year;
      const session = paper.session;
      
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][session]) {
        acc[year][session] = [];
      }
      acc[year][session].push(paper);
      return acc;
    }, {} as Record<string, Record<string, SubjectPagePaper[]>>);

    // Sort papers within each session by paper number
    Object.values(grouped).forEach(yearGroup => {
      Object.values(yearGroup).forEach(sessionPapers => {
        sessionPapers.sort((a, b) => {
          const aMatch = a.title.match(/Paper (\d+)/);
          const bMatch = b.title.match(/Paper (\d+)/);
          const aNum = aMatch ? parseInt(aMatch[1]) : 0;
          const bNum = bMatch ? parseInt(bMatch[1]) : 0;
          return aNum - bNum;
        });
      });
    });

    return grouped;
  }, [filteredPapers]);

  // Get sorted years for chronological view
  const sortedYears = useMemo(() => {
    return Object.keys(groupedPapers).sort((a, b) => parseInt(b) - parseInt(a));
  }, [groupedPapers]);

  // Update showing text with current numbers
  const showingText = defaults.database.showingText
    .replace('{filtered}', filteredPapers.length.toString())
    .replace('{total}', papers.length.toString());

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-8 md:pt-12 md:pb-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl text-gray-900 sm:text-5xl">
              {defaults.title}
            </h1>
            <p className="mt-4 text-lg leading-7 text-gray-600">
              {defaults.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800">
                {defaults.badges.supportBadge}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-800">
                {defaults.badges.resourcesBadge}
              </span>
              {selectedBoard && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-800">
                  {selectedBoard.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Exam Board
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="mb-6">
              <h2 className="text-2xl text-gray-900 mb-4">{defaults.database.title}</h2>
              <div>
                <label htmlFor="yearSession" className="block text-sm font-medium text-gray-700 mb-1.5">
                  {defaults.database.filterLabel}
                </label>
                <select
                  id="yearSession"
                  value={selectedYearSession}
                  onChange={(e) => setSelectedYearSession(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-1.5"
                >
                  <option value="all">{defaults.database.allFilterOption}</option>
                  {availableYearSessions.map((yearSession) => (
                    <option key={yearSession} value={yearSession}>
                      {yearSession}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Papers Display */}
            <div className="space-y-6">
              {sortedYears.map((year) => (
                <div key={year} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-[#001a96]">{year}</h2>
                  {Object.entries(groupedPapers[year])
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([session, sessionPapers]) => (
                      <div key={session} className="space-y-3">
                        <h3 className="text-xl font-medium text-gray-800 inline-block border-b-2 border-gray-200 pb-1">{session}</h3>
                        <div className="space-y-2">
                          {sessionPapers.map((paper, index) => (
                            <div key={`${paper.title}-${index}`} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1.5">
                              <div className="flex-1">
                                <span className="text-gray-900 flex text-xl">
                                  <span className="mr-1.5">•</span>
                                  <span>{paper.title}</span>
                                </span>
                              </div>
                              <div className="flex flex-row sm:items-center sm:gap-4 justify-start sm:justify-end mt-2 sm:mt-0 ml-4 sm:ml-0 gap-4">
                                <div className="w-[160px] shrink-0">
                                  {(paper.questionPaperFileUrl || paper.questionPaperUrl) && (
                                    <Link
                                      href={paper.questionPaperFileUrl || paper.questionPaperUrl || '#'}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-xl whitespace-nowrap"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {paper.questionPaperText || 'Question Paper'}
                                    </Link>
                                  )}
                                </div>
                                <div className="w-[140px] shrink-0">
                                  {(paper.markSchemeFileUrl || paper.markSchemeUrl) && (
                                    <Link
                                      href={paper.markSchemeFileUrl || paper.markSchemeUrl || '#'}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-xl whitespace-nowrap"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {paper.markSchemeText || 'Mark Scheme'}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
              {sortedYears.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">{defaults.database.noResultsText}</p>
                </div>
              ) : (
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    {showingText}
                  </p>
                </div>
              )}
            </div>
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
                    <Link
                      href={defaults.sidebar.actionButtons.studyNotesButton.url}
                      className="flex items-center gap-2 bg-white text-[#001a96] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Access Notes
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
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
                    <Link
                      href={defaults.sidebar.actionButtons.practiceQuestionsButton.url}
                      className="flex items-center gap-2 bg-white text-[#fb510f] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Start Practice
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Need a Tutor Block */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{defaults.sidebar.tutorSection.title}</h3>
              <div className="flex items-center mb-2">
                <span className="text-orange-500 text-xl mr-1">★</span>
                <span className="text-gray-900 font-medium">{defaults.sidebar.tutorSection.rating}/5</span>
                <span className="text-gray-600 ml-1 text-sm">{defaults.sidebar.tutorSection.reviewsText}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{defaults.sidebar.tutorSection.description}</p>
              <div className="space-y-4 mb-4">
                {defaults.sidebar.tutorSection.tutors.map((tutor: any, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12">
                      {tutor.avatar ? (
                        <Image
                          src={urlFor(tutor.avatar).url()}
                          alt={tutor.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{tutor.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{tutor.name}</div>
                      <div className="text-gray-700 text-sm">{tutor.credentials}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={defaults.sidebar.tutorSection.hireTutorButton.url}
                className="w-full rounded-full bg-blue-900 text-white font-semibold py-3 mt-2 shadow-sm hover:bg-blue-800 transition-colors text-center block"
              >
                {defaults.sidebar.tutorSection.hireTutorButton.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 