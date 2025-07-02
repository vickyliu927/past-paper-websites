'use client';

import { useState } from 'react';
import { Microscope, FlaskConical, Atom, Calculator, LineChart, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Lexend } from 'next/font/google';
import { SubjectExamBoard } from '@/types';

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  fallback: ['Lexend Fallback']
});

interface Subject {
  name: string;
  code: string;
  level: string;
  category: string;
  examBoards: (SubjectExamBoard | string)[];
  url: string;
  iconColor: string;
}

interface SubjectsSectionData {
  title: string;
  description: string;
  searchPlaceholder: string;
  categories: string[];
  subjects: Subject[];
}

interface SubjectsSectionProps {
  data: SubjectsSectionData;
}

// Map subject names to their icons
const subjectIcons: Record<string, LucideIcon> = {
  'Biology': Microscope,
  'Chemistry': FlaskConical,
  'Physics': Atom,
  'Mathematics': Calculator,
  'Economics': LineChart
};

// Color palette for icons
const iconColors = [
  { bg: '#DCFCE7', border: '#BBF7D0', icon: '#16A34A' }, // Green
  { bg: '#FEF3C7', border: '#FDE68A', icon: '#EAB308' }, // Yellow
  { bg: '#DBEAFE', border: '#93C5FD', icon: '#3B82F6' }, // Blue
  { bg: '#FCE7F3', border: '#F9A8D4', icon: '#EC4899' }, // Pink
  { bg: '#F3E8FF', border: '#C4B5FD', icon: '#8B5CF6' }, // Purple
  { bg: '#FED7D7', border: '#FCA5A5', icon: '#EF4444' }, // Red
  { bg: '#FFF7ED', border: '#FED7AA', icon: '#EA580C' }, // Orange
  { bg: '#F0FDFA', border: '#99F6E4', icon: '#0D9488' }, // Teal
  { bg: '#FEF7FF', border: '#E9D5FF', icon: '#9333EA' }, // Violet
  { bg: '#FFFBEB', border: '#FEF3C7', icon: '#D97706' }, // Amber
  { bg: '#F1F5F9', border: '#CBD5E1', icon: '#475569' }, // Slate
  { bg: '#FEF2F2', border: '#FECACA', icon: '#DC2626' }, // Rose
];

// Predefined color mapping for common subjects to ensure good distribution
const subjectColorMap: Record<string, number> = {
  'Biology': 0,      // Green
  'Chemistry': 1,    // Yellow  
  'Physics': 2,      // Blue
  'Economics': 3,    // Pink
  'Mathematics': 4,  // Purple
};

// Function to get consistent color for a subject
const getSubjectColor = (subjectName: string) => {
  // First check if we have a predefined mapping
  if (subjectColorMap[subjectName] !== undefined) {
    return iconColors[subjectColorMap[subjectName]];
  }
  
  // For other subjects, use a better hash function
  let hash = 0;
  for (let i = 0; i < subjectName.length; i++) {
    const char = subjectName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char + (i * 31);
    hash = hash & hash; // Convert to 32bit integer
  }
  // Use a prime number multiplier and offset by 5 to avoid predefined colors
  const index = (Math.abs(hash * 9301 + 49297) % (iconColors.length - 5)) + 5;
  return iconColors[index];
};

export default function SubjectsSection({ data }: SubjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');

  const { title, description, searchPlaceholder, categories, subjects } = data;

  const filteredSubjects = subjects.filter((subject: Subject) => {
    const matchesSearch = searchQuery === '' || 
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Subjects' || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="subjects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`${lexend.className} text-[48px] font-normal tracking-tight text-gray-900 max-w-[672px] mx-auto`}
              style={{ fontSize: '48px', lineHeight: '56px' }}>
            {title}
          </h2>
          <div className={`${lexend.className} mt-4 text-[18px] leading-8 text-gray-600 mx-auto text-justify`}
               style={{ 
                 fontSize: '18px', 
                 margin: '16px auto 0px', 
                 letterSpacing: '-0.02em',
                 maxWidth: '672px',
                 lineHeight: '32px',
                 textAlignLast: 'center'
               }}>
            Explore our comprehensive collection of past papers organized by subject across all supported curricula. Each subject contains papers from multiple exam boards.
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-x-3">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold border ${
                selectedCategory === category
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-sm mx-auto">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filteredSubjects.map((subject: Subject) => {
            const colors = getSubjectColor(subject.name);
            return (
              <Link href={subject.url} key={subject.code} className="block group">
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col min-h-[220px]">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                       style={{ 
                         backgroundColor: colors.bg
                       }}>
                    {subjectIcons[subject.name] && React.createElement(subjectIcons[subject.name], {
                      size: 28,
                      style: { color: colors.icon }
                    })}
                  </div>
                  
                  <div className="flex-grow mt-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`${lexend.className} text-lg font-semibold text-gray-900`}>{subject.name}</h3>
                      <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">{subject.code}</span>
                    </div>
                    <p className="text-gray-500 text-md mb-3">{subject.level}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {subject.examBoards.map((board: SubjectExamBoard | string, index: number) => {
                      // Handle both old string format and new object format for backward compatibility
                      const boardText = typeof board === 'string' ? board : board.text;
                      const boardUrl = typeof board === 'object' && board.enableLink ? board.url : undefined;
                      
                      if (boardUrl) {
                        // Clickable pill with link
                        return (
                          <Link
                            key={`${boardText}-${index}`}
                            href={boardUrl}
                            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                          >
                            {boardText}
                          </Link>
                        );
                      } else {
                        // Non-clickable pill
                        return (
                          <span
                            key={`${boardText}-${index}`}
                            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                          >
                            {boardText}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 