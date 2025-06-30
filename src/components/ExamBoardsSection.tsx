import { Lexend } from 'next/font/google';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400',
});

interface Pill {
  text: string;
  url?: string;
}

interface ExamBoard {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  pills: (string | Pill)[];
  image?: any;
}

interface ExamBoardsSectionProps {
  data: {
    title?: string;
    description?: string;
    examBoards: ExamBoard[];
    isActive: boolean;
  };
}

export default function ExamBoardsSection({ data }: ExamBoardsSectionProps) {
  if (!data.isActive) return null;

  const { title, description, examBoards } = data;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Only show if title or description exists */}
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className={`${lexend.className} text-[36px] font-normal tracking-tight text-gray-900 mb-4`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`${lexend.className} text-[18px] text-gray-600 mt-4 max-w-3xl mx-auto`}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Exam Boards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${!(title || description) ? 'mt-0' : ''}`}>
          {examBoards.map((examBoard, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-200 min-h-[320px] flex flex-col max-w-sm mx-auto w-full"
            >
              {/* Image */}
              {examBoard.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={examBoard.image.asset?.url || urlFor(examBoard.image).width(280).height(160).url()}
                    alt={examBoard.title}
                    className="w-full h-40 object-contain rounded-xl"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className={`${lexend.className} text-xl font-medium text-gray-900 mb-3 text-center`}>
                {examBoard.title}
              </h3>

              {/* Description */}
              <p className={`${lexend.className} text-sm text-gray-600 mb-4 flex-grow text-center leading-relaxed`}>
                {examBoard.description}
              </p>

              {/* Pills */}
              {examBoard.pills && examBoard.pills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {examBoard.pills.map((pill, pillIndex) => {
                    // Handle both string and object pill formats
                    const pillText = typeof pill === 'string' ? pill : pill.text;
                    const pillUrl = typeof pill === 'object' ? pill.url : undefined;

                    if (pillUrl) {
                      // Clickable pill with URL
                      return (
                        <Link
                          key={pillIndex}
                          href={pillUrl}
                          className={`${lexend.className} px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 cursor-pointer`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {pillText}
                        </Link>
                      );
                    } else {
                      // Non-clickable pill
                      return (
                        <span
                          key={pillIndex}
                          className={`${lexend.className} px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200`}
                        >
                          {pillText}
                        </span>
                      );
                    }
                  })}
                </div>
              )}

              {/* Button */}
              <Link
                href={examBoard.buttonUrl}
                className={`${lexend.className} inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 mt-auto`}
              >
                {examBoard.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 