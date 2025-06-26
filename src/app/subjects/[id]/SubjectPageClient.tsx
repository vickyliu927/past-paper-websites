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
}

export default function SubjectPageClient({ 
  subjectPageData, 
  papers, 
  defaults, 
  subjectId 
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
                                  {paper.questionPaperUrl && (
                                    <Link
                                      href={paper.questionPaperUrl}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-xl whitespace-nowrap"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {paper.questionPaperText || 'Question Paper'}
                                    </Link>
                                  )}
                                </div>
                                <div className="w-[140px] shrink-0">
                                  {paper.markSchemeUrl && (
                                    <Link
                                      href={paper.markSchemeUrl}
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
            {/* Quick Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{defaults.sidebar.quickStats.title}</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{defaults.sidebar.quickStats.totalPapersLabel}</span>
                  <span className="font-medium">{papers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{defaults.sidebar.quickStats.yearsAvailableLabel}</span>
                  <span className="font-medium">{availableYearSessions.length}</span>
                </div>
              </div>
            </div>

            {/* Subject Study Notes & Practice Questions Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href={defaults.sidebar.actionButtons.studyNotesButton.url}
                className="w-full rounded-md bg-[#001a96] text-white font-semibold py-2 shadow-sm hover:bg-blue-900 transition-colors text-center"
              >
                {defaults.sidebar.actionButtons.studyNotesButton.text}
              </Link>
              <Link
                href={defaults.sidebar.actionButtons.practiceQuestionsButton.url}
                className="w-full rounded-md bg-[#fb510f] text-white font-semibold py-2 shadow-sm hover:bg-orange-600 transition-colors text-center"
              >
                {defaults.sidebar.actionButtons.practiceQuestionsButton.text}
              </Link>
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