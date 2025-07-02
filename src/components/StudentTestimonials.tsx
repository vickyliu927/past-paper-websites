import React from 'react';
import { Lexend } from 'next/font/google';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity';

const lexend = Lexend({ 
  subsets: ['latin'],
  fallback: ['Lexend Fallback']
});

interface Testimonial {
  studentName: string;
  subject: string;
  grade: string;
  quote: string;
  avatar?: any;
  avatarColor?: string;
  customAvatarColor?: string;
  gradeColor?: string;
  customGradeColor?: string;
}

interface StudentTestimonialsData {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}

interface StudentTestimonialsProps {
  data: StudentTestimonialsData;
}

export default function StudentTestimonials({ data }: StudentTestimonialsProps) {
  // Handle case where data might be null/undefined
  if (!data) {
    return null;
  }
  
  const {
    title,
    description,
    testimonials = [],
    backgroundColor = 'white',
    customBackgroundColor,
    textAlignment = 'center'
  } = data;

  // Get background color class
  const getBackgroundClass = () => {
    if (backgroundColor === 'custom' && customBackgroundColor) {
      return customBackgroundColor.startsWith('#') 
        ? { backgroundColor: customBackgroundColor }
        : customBackgroundColor;
    }
    
    const bgClasses: Record<string, string> = {
      'white': 'bg-white',
      'gray-50': 'bg-gray-50',
      'blue-50': 'bg-blue-50',
      'green-50': 'bg-green-50'
    };
    
    return bgClasses[backgroundColor] || 'bg-white';
  };

  // Get text alignment class
  const getTextAlignmentClass = () => {
    const alignmentClasses: Record<string, string> = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right'
    };
    
    return alignmentClasses[textAlignment] || 'text-center';
  };

  // Get avatar color
  const getAvatarColor = (testimonial: Testimonial) => {
    if (testimonial.avatarColor === 'custom' && testimonial.customAvatarColor) {
      return testimonial.customAvatarColor;
    }
    return testimonial.avatarColor || '#374151';
  };

  // Get grade badge color
  const getGradeColor = (testimonial: Testimonial) => {
    if (testimonial.gradeColor === 'custom' && testimonial.customGradeColor) {
      return testimonial.customGradeColor;
    }
    return testimonial.gradeColor || '#10B981';
  };

  // Get student initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const backgroundStyle = typeof getBackgroundClass() === 'object' 
    ? getBackgroundClass() 
    : {};

  const backgroundClassName = typeof getBackgroundClass() === 'string' 
    ? getBackgroundClass() 
    : '';

  return (
    <section 
      className={`py-20 ${backgroundClassName}`}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${getTextAlignmentClass()}`}>
          {title && (
            <h2 className={`${lexend.className} text-[48px] font-normal tracking-tight text-gray-900 mb-4`}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={`${lexend.className} text-[18px] text-gray-600 mt-4 max-w-3xl ${textAlignment === 'center' ? 'mx-auto' : ''}`}>
              {description}
            </p>
          )}
          
          {testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Student Info Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden"
                        style={{ backgroundColor: getAvatarColor(testimonial) }}
                      >
                        {testimonial.avatar ? (
                          <Image
                            src={urlFor(testimonial.avatar).width(48).height(48).url()}
                            alt={testimonial.studentName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(testimonial.studentName)
                        )}
                      </div>
                      
                      {/* Name and Subject */}
                      <div>
                        <h3 className={`${lexend.className} font-semibold text-gray-900`}>
                          {testimonial.studentName}
                        </h3>
                        <p className={`${lexend.className} text-sm text-gray-600`}>
                          {testimonial.subject}
                        </p>
                      </div>
                    </div>
                    
                    {/* Grade Badge */}
                    <div 
                      className="px-3 py-1.5 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: getGradeColor(testimonial) }}
                    >
                      {testimonial.grade}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className={`${lexend.className} text-gray-700 italic leading-relaxed`}>
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 