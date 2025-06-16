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
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('all');
  const [selectedPaper, setSelectedPaper] = useState<string>('all');
  const [searchCode, setSearchCode] = useState('');

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
      if (selectedExamBoard !== 'all' && paper.curriculum !== selectedExamBoard) return false;
      if (selectedPaper !== 'all' && paper.title.indexOf(selectedPaper) === -1) return false;
      if (searchCode && !(paper.code && paper.code.toLowerCase().includes(searchCode.toLowerCase()))) return false;
      return true;
    });
  }, [subjectPapers, selectedYearSession, selectedExamBoard, selectedPaper, searchCode]);

  const availableYearSessions = [...new Set(subjectPapers.map(paper => `${paper.year} ${paper.session}`.trim()))]
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a));
  const availableExamBoards = [...new Set(subjectPapers.map(paper => paper.curriculum))].sort();
  const availablePapers = [...new Set(subjectPapers.map(paper => {
    const match = paper.title.match(/Paper \d+/);
    return match ? match[0] : null;
  }))].filter(Boolean);

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
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="subject-icon text-4xl">{subject.icon}</span>
              <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl">
                {subject.name} Past Papers
              </h1>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="yearSession" className="block text-sm font-medium text-gray-700 mb-2">
                    Year & Session
                  </label>
                  <select
                    id="yearSession"
                    value={selectedYearSession}
                    onChange={(e) => setSelectedYearSession(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Years & Sessions</option>
                    {availableYearSessions.map(ys => (
                      <option key={ys} value={ys}>{ys}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="examBoard" className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Board
                  </label>
                  <select
                    id="examBoard"
                    value={selectedExamBoard}
                    onChange={(e) => setSelectedExamBoard(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Exam Boards</option>
                    {availableExamBoards.map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="paper" className="block text-sm font-medium text-gray-700 mb-2">
                    Paper
                  </label>
                  <select
                    id="paper"
                    value={selectedPaper}
                    onChange={(e) => setSelectedPaper(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Papers</option>
                    {availablePapers.map(paper => (
                      <option key={paper as string} value={paper as string}>{paper}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search by Paper Code */}
            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="searchCode" className="text-sm font-medium text-gray-700">Search by Paper Code:</label>
              <input
                id="searchCode"
                type="text"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value)}
                placeholder="e.g. 9701_s23_qp_11"
                className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700 sm:text-sm px-3 py-2"
              />
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredPapers.length} of {subjectPapers.length} papers
              </p>
            </div>

            {/* Papers Grid */}
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {paper.title}
                      </h3>
                      <div className="flex flex-row gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 whitespace-nowrap">
                          {paper.curriculum.replace(/\n/g, ' ')}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">
                          {`${paper.year} ${paper.session}`.replace(/\n/g, ' ')}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 whitespace-nowrap">
                          {(() => {
                            const match = paper.title.match(/Paper \d+/);
                            return match ? match[0] : paper.paperType.replace(/\n/g, ' ');
                          })()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 w-full sm:mt-0 sm:flex sm:justify-end sm:gap-x-4">
                      <Link
                        href={paper.downloadUrl}
                        className="flex items-center justify-center w-auto whitespace-nowrap rounded-md border border-blue-700 text-blue-700 bg-transparent px-3 py-1 text-sm font-medium transition-colors hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800 mb-2 sm:mb-0"
                        download
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                        </svg>
                        Question Paper
                      </Link>
                      {paper.hasMarkingScheme && (
                        <Link
                          href={`/papers/${paper.id}-ms.pdf`}
                          className="flex items-center justify-center w-auto whitespace-nowrap rounded-md border border-blue-700 text-blue-700 bg-transparent px-3 py-1 text-sm font-medium transition-colors hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                          </svg>
                          Mark Scheme
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No papers found</h3>
                <p className="mt-2 text-sm text-gray-600">
                  No papers match your current filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Curricula:</span>
                  <span className="font-medium">{availableExamBoards.length}</span>
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

            {/* More Resources Block */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">More Resources</h3>
              <ul className="space-y-3 text-blue-700 font-medium">
                <li>Subject Tutor Page</li>
                <li>General Study Notes</li>
                <li>General Practice Questions</li>
                <li>Q&amp;A Forum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 