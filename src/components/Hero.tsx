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
    features: string[];
    advertisement?: {
      tagline?: string;
      mainText?: string;
      statistic?: string;
      backgroundColor?: string;
      textColor?: string;
      icon?: string;
      avatarImage1?: any;
      avatarImage2?: any;
      avatarImage3?: any;
    };
  };
}

const lexend = Lexend({
  subsets: ['latin'],
  weight: '400',
});

// Icon components
const IconComponents = {
  globe: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  star: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  checkmark: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  ),
  trophy: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v4c0 2.21-1.79 4-4 4h-.54c-.4 2.3-2.2 4.1-4.46 4.37V20h2c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1h2v-1.63C7.74 18.1 5.94 16.3 5.54 14H5c-2.21 0-4-1.79-4-4V6c0-1.1.9-2 2-2h3zm12 6V8h-2v4h.54c.84 0 1.46-.72 1.46-1.56V10zM5 8v1.44C5 10.28 5.62 12 6.46 12H7V8H5z"/>
    </svg>
  ),
  users: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3.72 5.04A2.999 2.999 0 0 0 11 16.5c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.91-.41-1.72-1.05-2.28l.73-1.02L19 22h1zm-10.5-9L7 11V8.5c0-.83-.67-1.5-1.5-1.5S4 7.67 4 8.5V12h1.5l2 7H9l-1.5-5.5zm-2-8.5c.83 0 1.5-.67 1.5-1.5S8.33 2 7.5 2 6 2.67 6 4s.67 1.5 1.5 1.5z"/>
    </svg>
  )
};

export default function Hero({ data }: HeroProps) {
  const { title, description, buttons, features, advertisement } = data;
  
  // Check if advertisement block should be shown (any field has a value)
  const showAdvertisement = advertisement && (
    advertisement.tagline || 
    advertisement.mainText || 
    advertisement.statistic
  );

  const renderIcon = (iconType: string) => {
    const IconComponent = IconComponents[iconType as keyof typeof IconComponents] || IconComponents.globe;
    return <IconComponent />;
  };

  return (
    <section id="hero" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-in-left pl-8 md:pl-12 lg:pl-16">
            <h1 className={`${lexend.className} text-[60px] font-normal tracking-[0.002em] leading-[58px] text-black mb-4`} style={{ fontSize: '60px', lineHeight: '58px' }}>
              {title}
            </h1>
            <p className="text-lg md:text-xl text-black mb-6 max-w-lg">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {data.buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.url}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 text-white hover:opacity-90`}
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
            <div className="relative w-full max-w-md">
              {showAdvertisement ? (
                // Advertisement Block
                <div 
                  className="relative p-8 rounded-lg shadow-lg"
                  style={{ 
                    backgroundColor: advertisement.backgroundColor || '#1e40af',
                    color: advertisement.textColor || '#ffffff'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {advertisement.tagline && (
                        <div className="text-sm font-medium mb-4 opacity-90">
                          {advertisement.tagline}
                        </div>
                      )}
                      {advertisement.mainText && (
                        <h2 className={`${lexend.className} text-2xl font-normal leading-tight mb-6`}>
                          {advertisement.mainText}
                        </h2>
                      )}
                      {advertisement.statistic && (
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {advertisement.avatarImage1 ? (
                              <img 
                                src={urlFor(advertisement.avatarImage1).width(40).height(40).url()} 
                                alt="Avatar 1"
                                className="w-10 h-10 rounded-full border-2 border-current object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border-2 border-current bg-white/20"></div>
                            )}
                            {advertisement.avatarImage2 ? (
                              <img 
                                src={urlFor(advertisement.avatarImage2).width(40).height(40).url()} 
                                alt="Avatar 2"
                                className="w-10 h-10 rounded-full border-2 border-current object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border-2 border-current bg-white/30"></div>
                            )}
                            {advertisement.avatarImage3 ? (
                              <img 
                                src={urlFor(advertisement.avatarImage3).width(40).height(40).url()} 
                                alt="Avatar 3"
                                className="w-10 h-10 rounded-full border-2 border-current object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border-2 border-current bg-white/40"></div>
                            )}
                          </div>
                          <span className="text-lg font-medium">
                            {advertisement.statistic}
                          </span>
                        </div>
                      )}
                    </div>
                    {advertisement.icon && (
                      <div className="ml-4 opacity-80">
                        {renderIcon(advertisement.icon)}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Original "Why Our Platform?" Block
                <>
                  <div 
                    className="absolute -top-4 -left-4 w-full h-full rounded-lg" 
                    style={{backgroundColor: '#0F172A1A'}}
                  ></div>
                  <div 
                    className="absolute -bottom-4 -right-4 w-full h-full rounded-lg" 
                    style={{backgroundColor: '#0F172A1A'}}
                  ></div>
                  <div className="relative bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Why Our Platform?</h3>
                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div 
                            className="p-1 rounded mr-2 mt-1" 
                            style={{backgroundColor: '#0F172A1A'}}
                          >
                            ✓
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 