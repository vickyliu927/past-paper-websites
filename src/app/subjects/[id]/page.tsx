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
  
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

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
      if (selectedYear !== 'all' && paper.year !== selectedYear) return false;
      if (selectedCurriculum !== 'all' && paper.curriculum !== selectedCurriculum) return false;
      if (selectedType !== 'all' && paper.paperType !== selectedType) return false;
      return true;
    });
  }, [subjectPapers, selectedYear, selectedCurriculum, selectedType]);

  const availableYears = [...new Set(subjectPapers.map(paper => paper.year))].sort((a, b) => parseInt(b) - parseInt(a));
  const availableCurricula = [...new Set(subjectPapers.map(paper => paper.curriculum))].sort();
  const availableTypes = [...new Set(subjectPapers.map(paper => paper.paperType))];

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
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 md:pt-16 md:pb-24 lg:px-8">
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
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="curriculum" className="block text-sm font-medium text-gray-700 mb-2">
                    Curriculum
                  </label>
                  <select
                    id="curriculum"
                    value={selectedCurriculum}
                    onChange={(e) => setSelectedCurriculum(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Curricula</option>
                    {availableCurricula.map(curriculum => (
                      <option key={curriculum} value={curriculum}>{curriculum}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    id="type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                  >
                    <option value="all">All Types</option>
                    {availableTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                        {paper.hasMarkingScheme && (
                          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                            Marking Scheme Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                      <button
                        onClick={() => handleDownload(paper)}
                        className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download
                      </button>
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
                  <span className="font-medium">{availableYears.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Curricula:</span>
                  <span className="font-medium">{availableCurricula.length}</span>
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