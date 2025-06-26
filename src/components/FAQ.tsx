'use client';

import React, { useState } from 'react';
import { Lexend } from 'next/font/google';
import { ChevronRight } from 'lucide-react';

const lexend = Lexend({ 
  subsets: ['latin'],
  fallback: ['Lexend Fallback']
});

interface FaqItem {
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
}

interface FaqData {
  title?: string;
  description?: string;
  faqs?: FaqItem[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
}

interface FaqProps {
  data: FaqData;
}

export default function FAQ({ data }: FaqProps) {
  // Handle case where data might be null/undefined
  if (!data) {
    return null;
  }
  
  const {
    title,
    description,
    faqs = [],
    backgroundColor = 'white',
    customBackgroundColor,
    textAlignment = 'center',
    maxWidth = '4xl'
  } = data;

  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const initialOpen = new Set<number>();
    faqs.forEach((faq, index) => {
      if (faq.isDefaultOpen) {
        initialOpen.add(index);
      }
    });
    return initialOpen;
  });

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Background styling
  const getBackgroundClass = () => {
    if (backgroundColor === 'custom' && customBackgroundColor) {
      return '';
    }
    switch (backgroundColor) {
      case 'gray-50':
        return 'bg-gray-50';
      case 'blue-50':
        return 'bg-blue-50';
      case 'green-50':
        return 'bg-green-50';
      default:
        return 'bg-white';
    }
  };

  const backgroundStyle = backgroundColor === 'custom' && customBackgroundColor 
    ? { backgroundColor: customBackgroundColor } 
    : {};

  const backgroundClassName = getBackgroundClass();

  // Text alignment
  const getTextAlignmentClass = () => {
    switch (textAlignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  // Max width class
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case '3xl':
        return 'max-w-3xl';
      case '5xl':
        return 'max-w-5xl';
      case '6xl':
        return 'max-w-6xl';
      case '7xl':
        return 'max-w-7xl';
      default:
        return 'max-w-4xl';
    }
  };

  return (
    <section 
      className={`py-20 ${backgroundClassName}`}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4">
        <div className={`${getMaxWidthClass()} mx-auto ${getTextAlignmentClass()}`}>
          
          {title && (
            <h2 className={`${lexend.className} text-[36px] font-normal tracking-tight text-gray-900 mb-4`}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={`${lexend.className} text-[18px] text-gray-600 mt-4 max-w-3xl ${textAlignment === 'center' ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}

          {faqs.length > 0 && (
            <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden mt-16">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className={`${lexend.className} w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors hover:bg-gray-50 flex items-center justify-between`}
                  >
                    <span className="text-lg font-medium text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openItems.has(index) ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-6">
                      <p className={`${lexend.className} text-gray-600 leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
} 