import Link from 'next/link';
import { Lexend } from 'next/font/google';
import { urlFor } from '@/sanity/lib/image';

interface HeroProps {
  data: {
    title: string;
    description: string;
    buttons: {
      text: string;
      url: string;
      variant: 'primary' | 'secondary';
    }[];
    browseButton?: {
      text: string;
      url: string;
    };
  };
}

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});


export default function Hero({ data }: HeroProps) {
  const { title, description, buttons } = data;

  return (
    <section id="hero" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 animate-fade-in-left pl-8 md:pl-12 lg:pl-12">
            <h1 className={`${lexend.className} text-[60px] md:text-[72px] font-semibold tracking-[0.002em] leading-[78px] text-black mb-4 max-w-lg`} style={{ lineHeight: '78px' }}>
              {title}
            </h1>
            <p className="text-lg md:text-xl text-black mb-6 max-w-lg">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Browse Past Papers CTA Button */}
              {data.browseButton && (
                <Link
                  href={data.browseButton.url}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 text-white hover:opacity-90 w-64"
                  style={{ backgroundColor: '#000000' }}
                >
                  {data.browseButton.text}
                </Link>
              )}
              
              {/* Other action buttons */}
              {data.buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.url}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 text-white hover:opacity-90 w-64`}
                  style={{
                    backgroundColor: button.variant === 'primary' ? '#1e40af' : '#fb510f'
                  }}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 animate-fade-in-right hidden md:flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Practice Question Block */}
              <div className="flex gap-6 items-start">
                {/* Question Section */}
                <div className="w-fit max-w-sm bg-white rounded-xl shadow-lg px-4 pt-4 pb-3 flex-shrink-0">
                  <h3 className="text-base font-semibold text-gray-600 mb-2">Practice Question</h3>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    Which of the following is a base unit in the International System of Units (SI)?
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {/* Option A */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-medium">
                        A
                      </div>
                      <span className="text-gray-700 text-sm">Joule</span>
                    </div>
                    
                    {/* Option B */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-medium">
                        B
                      </div>
                      <span className="text-gray-700 text-sm">Newton</span>
                    </div>
                    
                    {/* Option C - Correct Answer */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 border border-green-200">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">Kelvin</span>
                      <span className="text-green-600 text-xs font-medium ml-auto">Correct</span>
                    </div>
                    
                    {/* Option D */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-medium">
                        D
                      </div>
                      <span className="text-gray-700 text-sm">Watt</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm">
                    View Answer
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Progress Section */}
                <div className="w-64 space-y-6">
                  {/* Progress Chart */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="text-center mb-4">
                      <h4 className="text-gray-600 font-medium mb-1">Progress At</h4>
                      <h4 className="text-gray-600 font-medium">All Questions</h4>
                    </div>
                    
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      {/* Background circle */}
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#f57c40"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${75 * 2.51} ${(100-75) * 2.51}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">75%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lessons Progress */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Lesson 4: Chemical Bonding</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        <span className="text-sm text-gray-400">Lesson 5: Energetics</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">Lesson 6: Chemical Kinetics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 