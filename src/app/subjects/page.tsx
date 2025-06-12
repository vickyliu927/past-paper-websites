'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subjects } from '@/data/mockData';
import { Subject } from '@/types';

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
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Browse Past Papers by Subject
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our comprehensive collection of past papers across various subjects and curricula. 
              Each subject includes papers from multiple international examination boards.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Subject Header */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="subject-icon">{subject.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {subject.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                    {subject.paperCount} papers
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {subject.description}
                </p>
              </div>

              {/* Subject Content */}
              <div className="flex-1 p-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Available Curricula:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {subject.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-green-500"
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
              <div className="p-6 pt-0">
                <Link
                  href={`/subjects/${subject.id}`}
                  className="block w-full rounded-md bg-gray-900 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  View Past Papers
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No subjects found</h3>
            <p className="mt-2 text-sm text-gray-600">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 