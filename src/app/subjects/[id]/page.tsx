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
      return true;
    });
  }, [subjectPapers, selectedYearSession, selectedExamBoard, selectedPaper]);

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

  const handleDownload = (paper: PastPaper) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${paper.title}`);
    alert(`Download started for ${paper.title}`);
  };

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
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {paper.curriculum}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          {paper.year} {paper.session}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {paper.paperType}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-row gap-2 justify-end">
                      <Link
                        href={paper.downloadUrl}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
                        download
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                        </svg>
                        Download
                      </Link>
                      {paper.hasMarkingScheme && (
                        <Link
                          href={`/papers/${paper.id}-ms.pdf`}
                          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                          </svg>
                          Marking Scheme
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
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Curricula</h3>
              <div className="space-y-3">
                {subject.topics.map((topic, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-6">
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

            <div className="mt-6">
              <Link
                href="/subjects"
                className="block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                ← Back to All Subjects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 