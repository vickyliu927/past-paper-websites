import Link from 'next/link';
import React from 'react';
import { Lexend } from 'next/font/google';
import * as LucideIcons from 'lucide-react';

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  fallback: ['Lexend Fallback']
});

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface WhyChoosePlatformData {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  backgroundColor?: string;
  customBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}

interface WhyChoosePlatformProps {
  data: WhyChoosePlatformData;
}

export default function WhyChoosePlatform({ data }: WhyChoosePlatformProps) {
  const {
    title,
    subtitle,
    description,
    features = [],
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



  // Render Lucide icon by name
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    
    if (!IconComponent) {
      // Fallback to CheckCircle if icon not found
      const FallbackIcon = LucideIcons.CheckCircle;
      return <FallbackIcon className="w-6 h-6 text-green-600" />;
    }
    
    return <IconComponent className="w-6 h-6 text-green-600" />;
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
          {subtitle && (
            <p className={`${lexend.className} text-[16px] text-gray-600 mb-4 font-medium`}>
              {subtitle}
            </p>
          )}
          
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
          
          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12 mt-16">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${lexend.className} text-lg font-semibold text-gray-900 mb-2 text-left`}>
                      {feature.title}
                    </h3>
                    <p className={`${lexend.className} text-gray-600 leading-relaxed text-left text-justify`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 