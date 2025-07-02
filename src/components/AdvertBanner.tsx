import React from 'react';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  fallback: ['Lexend Fallback']
});

// Simplified color scheme: Gray primary + Blue accent
const colors = {
  primary: '#374151',    // Gray-700
  accent: '#3B82F6',     // Blue-500  
  light: '#F3F4F6',      // Gray-100
  border: '#E5E7EB'      // Gray-200
};

// Pastel colors for exam board pills (with transparent backgrounds)
const pastelColors = [
  { bg: 'rgba(220, 252, 231, 0.4)', border: '#BBF7D0', text: '#16A34A' }, // Green
  { bg: 'rgba(254, 243, 199, 0.4)', border: '#FDE68A', text: '#EAB308' }, // Yellow
  { bg: 'rgba(219, 234, 254, 0.4)', border: '#93C5FD', text: '#3B82F6' }, // Blue
  { bg: 'rgba(252, 231, 243, 0.4)', border: '#F9A8D4', text: '#EC4899' }, // Pink
];

export default function AdvertBanner() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <h2 className={`${lexend.className} text-[48px] font-normal tracking-tight text-gray-900 mb-4`}
                style={{ fontSize: '48px', lineHeight: '60px' }}>
              Smarter Revision
              <span className="block text-gray-900 font-bold">Better Results</span>
            </h2>
            <p className={`${lexend.className} text-[18px] text-gray-600 mb-6 leading-8`}
               style={{ fontSize: '18px', lineHeight: '32px', letterSpacing: '-0.02em' }}>
              Join the community of 100,000+ students using our trusted past papers. Pair them with our curated study notes and practice questions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium rounded-md px-6 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors">
                Browse Past Papers
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium rounded-md px-6 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                Practice Questions
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium rounded-md px-6 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                Study Notes
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['AQA', 'OCR', 'Edexcel', 'WJEC'].map((examBoard, index) => {
                const colors = pastelColors[index % pastelColors.length];
                return (
                  <button
                    key={examBoard}
                    className="inline-flex items-center justify-center gap-1 whitespace-nowrap text-xs font-medium rounded-full px-4 py-1.5 border transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    {examBoard}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Analytics Visualization */}
          <div className="lg:w-1/2 relative">
            {/* Floating Background Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-10 blur-xl" style={{ backgroundColor: colors.light }}></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 rounded-full opacity-10 blur-xl" style={{ backgroundColor: colors.accent }}></div>
            <div className="absolute bottom-4 left-8 w-20 h-20 rounded-full opacity-10 blur-xl" style={{ backgroundColor: colors.light }}></div>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 relative overflow-hidden border border-gray-200">
              {/* Background Graph Lines */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#6B7280" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Analytics Cards */}
              <div className="relative z-10">
                                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`${lexend.className} text-lg font-semibold text-gray-900`}>Performance Analytics</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#f57c40' }}></div>
                      <span className={`${lexend.className} text-sm font-medium`} style={{ color: '#f57c40' }}>Live</span>
                    </div>
                  </div>

                {/* Progress Chart */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${lexend.className} text-sm text-gray-600`}>Overall Score</span>
                    <span className={`${lexend.className} text-2xl font-semibold text-gray-900`}>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{
                      width: '89%',
                      backgroundColor: colors.accent
                    }}></div>
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`
                      }}>
                                                    <svg className="w-4 h-4" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                            </svg>
                      </div>
                      <span className={`${lexend.className} text-sm font-medium text-gray-900`}>Mathematics</span>
                    </div>
                    <span className={`${lexend.className} text-sm font-semibold`} style={{ color: colors.accent }}>92%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`
                      }}>
                                                    <svg className="w-4 h-4" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0112.12 15.12z" clipRule="evenodd"/>
                            </svg>
                      </div>
                      <span className={`${lexend.className} text-sm font-medium text-gray-900`}>Chemistry</span>
                    </div>
                    <span className={`${lexend.className} text-sm font-semibold`} style={{ color: colors.accent }}>87%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`
                      }}>
                                                    <svg className="w-4 h-4" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                            </svg>
                      </div>
                      <span className={`${lexend.className} text-sm font-medium text-gray-900`}>Physics</span>
                    </div>
                    <span className={`${lexend.className} text-sm font-semibold`} style={{ color: colors.accent }}>84%</span>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="mt-6 relative">
                  <svg width="100%" height="120" viewBox="0 0 300 120">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={colors.accent} stopOpacity="0.2"/>
                        <stop offset="100%" stopColor={colors.accent} stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Chart Line */}
                    <path
                      d="M20,80 Q80,40 140,60 T260,30"
                      stroke={colors.accent}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    
                    {/* Chart Area */}
                    <path
                      d="M20,80 Q80,40 140,60 T260,30 L260,100 L20,100 Z"
                      fill="url(#chartGradient)"
                    />
                    
                    {/* Data Points */}
                    <circle cx="20" cy="80" r="3" fill={colors.accent}/>
                    <circle cx="80" cy="45" r="3" fill={colors.accent}/>
                    <circle cx="140" cy="60" r="3" fill={colors.accent}/>
                    <circle cx="200" cy="40" r="3" fill={colors.primary}/>
                    <circle cx="260" cy="30" r="3" fill={colors.primary}/>
                  </svg>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 