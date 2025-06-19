'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subjects } from '@/data/mockData';

const categories = ['All Subjects', 'Sciences', 'Mathematics', 'Languages', 'Humanities'];

export default function SubjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');

  const filteredSubjects = subjects.filter(subject => 
    selectedCategory === 'All Subjects' || subject.category === selectedCategory
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl text-gray-900 sm:text-5xl">
              Browse Past Papers by Subject
            </h1>
            <p className="mt-4 text-lg leading-7 text-gray-600">
              Explore our comprehensive collection of past papers across various subjects and curricula. 
              Each subject includes papers from multiple international examination boards.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Subject Header */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="subject-icon">{subject.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {subject.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                    {subject.paperCount} papers
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-snug">
                  {subject.description}
                </p>
              </div>

              {/* Subject Content */}
              <div className="flex-1 p-5">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Curricula:</h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {subject.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="mr-1.5 h-4 w-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Footer */}
              <div className="p-5 pt-0">
                <Link
                  href={`/subjects/${subject.id}`}
                  className="block w-full rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  View Past Papers
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
            <p className="text-sm text-gray-600">
              No subjects match the selected category. Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 