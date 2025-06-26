'use client';

import { useEffect, useState } from 'react';
import { getSubjects } from '../../lib/queries';

interface Subject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
  examBoards: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    logoUrl: string;
  }>;
  topics: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
  }>;
}

export default function SanityExample() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        setError('Failed to fetch subjects');
        console.error('Error fetching subjects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg">Loading subjects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-[36px] font-bold text-gray-900 mb-8">Subjects from Sanity</h2>
      <div className="text-[18px] text-gray-600 mb-4">Section description here</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {subject.imageUrl && (
              <div className="aspect-video bg-gray-200">
                <img
                  src={subject.imageUrl}
                  alt={subject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {subject.title}
              </h3>
              {subject.description && (
                <p className="text-gray-600 mb-4">{subject.description}</p>
              )}
              
              {subject.examBoards && subject.examBoards.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Exam Boards:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.examBoards.map((board) => (
                      <span
                        key={board._id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {board.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {subject.topics && subject.topics.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic._id}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {topic.title}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{subject.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {subjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No subjects found. Add some content in Sanity Studio!</p>
        </div>
      )}
    </div>
  );
} 