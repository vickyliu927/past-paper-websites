'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { subjects, pastPapers } from '@/data/mockData';
import { PastPaper } from '@/types';

export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.id as string;
  
  const subject = subjects.find(s => s.id === subjectId);
  
  const [selectedYearSession, setSelectedYearSession] = useState<string>('all');

  // Memoize the subject papers to prevent recreation on every render
  const subjectPapers: PastPaper[] = useMemo(() => [
    ...pastPapers.filter(paper => paper.subjectId === subjectId),
    // Add more mock papers for demonstration
    {
      id: `${subjectId}-4`,
      title: `${subject?.name} Paper 2`,
      curriculum: 'CIE A-Level',
      year: '2022',
      session: 'May/June',
      paperType: 'Theory',
      subjectId: subjectId,
      downloadUrl: `/papers/${subjectId}-2022-p2.pdf`,
      hasMarkingScheme: true,
    },
    {
      id: `${subjectId}-5`,
      title: `${subject?.name} Paper 2 Mark Scheme`,
      curriculum: 'CIE A-Level',
      year: '2022',
      session: 'May/June',
      paperType: 'Mark Scheme',
      subjectId: subjectId,
      downloadUrl: `/papers/${subjectId}-2022-p2-ms.pdf`,
      hasMarkingScheme: false,
    },
    {
      id: `${subjectId}-6`,
      title: `${subject?.name} Paper 3`,
      curriculum: 'CIE A-Level',
      year: '2022',
      session: 'October/November',
      paperType: 'Practical',
      subjectId: subjectId,
      downloadUrl: `/papers/${subjectId}-2022-p3.pdf`,
      hasMarkingScheme: true,
    },
    {
      id: `${subjectId}-7`,
      title: `${subject?.name} HL Paper 1`,
      curriculum: 'IB Diploma',
      year: '2021',
      session: 'May',
      paperType: 'Theory',
      subjectId: subjectId,
      downloadUrl: `/papers/${subjectId}-ib-2021-p1.pdf`,
      hasMarkingScheme: true,
    },
    {
      id: `${subjectId}-8`,
      title: `${subject?.name} Exam`,
      curriculum: 'Advanced Placement',
      year: '2021',
      session: 'May',
      paperType: 'Complete Exam',
      subjectId: subjectId,
      downloadUrl: `/papers/${subjectId}-ap-2021.pdf`,
      hasMarkingScheme: true,
    },
  ], [subjectId, subject?.name]);

  const filteredPapers = useMemo(() => {
    return subjectPapers.filter(paper => {
      const yearSession = `${paper.year} ${paper.session}`.trim();
      if (selectedYearSession !== 'all' && yearSession !== selectedYearSession) return false;
      return true;
    });
  }, [subjectPapers, selectedYearSession]);

  const availableYearSessions = [...new Set(subjectPapers.map(paper => `${paper.year} ${paper.session}`.trim()))]
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));

  // Group papers by year and session for all views
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
    }, {} as Record<string, Record<string, PastPaper[]>>);

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

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900">Subject Not Found</h1>
          <p className="mt-2 text-gray-600">The subject you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/subjects" className="mt-4 inline-block bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 pt-4 pb-4 md:pt-6 md:pb-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl">
              {subject.name} Past Papers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {subject.description} Access comprehensive past papers, mark schemes, and examiner reports from multiple curricula.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Multi-Curriculum Support
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                {subjectPapers.length} Resources Available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-6">Past Papers Database</h2>
              <div>
                <label htmlFor="yearSession" className="block text-sm font-medium text-gray-700 mb-2">
                  Year & Session
                </label>
                <select
                  id="yearSession"
                  value={selectedYearSession}
                  onChange={(e) => setSelectedYearSession(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2"
                >
                  <option value="all">All Years & Sessions</option>
                  {availableYearSessions.map((yearSession) => (
                    <option key={yearSession} value={yearSession}>
                      {yearSession}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Papers Display */}
            <div className="space-y-8">
              {sortedYears.map((year) => (
                <div key={year} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">{year}</h2>
                  {Object.entries(groupedPapers[year])
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([session, papers]) => (
                      <div key={session} className="space-y-4 ml-4">
                        <h3 className="text-xl font-medium text-gray-800 inline-block border-b-2 border-gray-200 pb-1">{session}</h3>
                        <div className="space-y-3 ml-8">
                          {papers.map((paper) => (
                            <div key={paper.id} className="flex items-center justify-between py-2">
                              <div className="flex-1">
                                <span className="text-gray-900">• <span className="ml-2">{paper.title}</span></span>
                              </div>
                              <div className="flex items-center gap-8 justify-end">
                                <div className="w-[120px]">
                                  <Link
                                    href={paper.downloadUrl}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Question Paper
                                  </Link>
                                </div>
                                <div className="w-[120px]">
                                  {paper.hasMarkingScheme && (
                                    <Link
                                      href={`${paper.downloadUrl.replace('.pdf', '-ms.pdf')}`}
                                      className="text-blue-600 hover:text-blue-800 font-medium"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Mark Scheme
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
                  <p className="text-gray-500">No papers found matching your criteria.</p>
                </div>
              ) : (
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Showing {filteredPapers.length} of {subjectPapers.length} papers
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 space-y-6">
            {/* Quick Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Papers:</span>
                  <span className="font-medium">{subjectPapers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Years Available:</span>
                  <span className="font-medium">{availableYearSessions.length}</span>
                </div>
              </div>
            </div>

            {/* Subject Study Notes & Practice Questions Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full rounded-md bg-[#001a96] text-white font-semibold py-2 shadow-sm hover:bg-blue-900 transition-colors">Subject Study Notes</button>
              <button className="w-full rounded-md bg-[#fb510f] text-white font-semibold py-2 shadow-sm hover:bg-orange-600 transition-colors">Subject Practice Questions</button>
            </div>

            {/* Need a Tutor Block */}
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{"Need help from an expert?"}</h3>
              <div className="flex items-center mb-2">
                <span className="text-orange-500 text-xl mr-1">★</span>
                <span className="text-gray-900 font-medium">4.9/5</span>
                <span className="text-gray-600 ml-1 text-sm">based on <u>581 reviews</u></span>
              </div>
              <p className="text-gray-600 text-sm mb-4">The world&apos;s top online tutoring provider trusted by students, parents, and schools globally.</p>
              <div className="space-y-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img
                      src="/images/tutors/ollie.jpg"
                      alt="Ollie"
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Ollie</div>
                    <div className="text-gray-700 text-sm">Cambridge University - BA Natural Sciences</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img
                      src="/images/tutors/suraya.jpg"
                      alt="Suraya"
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
              </div>
                  <div>
                    <div className="font-bold text-gray-900">Suraya</div>
                    <div className="text-gray-700 text-sm">Oxford University - PhD Neuroscience and Mental Health</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img
                      src="/images/tutors/jake.jpg"
                      alt="Jake"
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Jake</div>
                    <div className="text-gray-700 text-sm">Oxford University - MSc Neuroscience</div>
                  </div>
                </div>
              </div>
              <button className="w-full rounded-full bg-blue-900 text-white font-semibold py-3 mt-2 shadow-sm hover:bg-blue-800 transition-colors">Hire a Tutor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 