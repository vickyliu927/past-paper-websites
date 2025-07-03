import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FooterConfig } from '@/types';

interface FooterProps {
  data?: FooterConfig;
}

export default function Footer({ data }: FooterProps) {
  // Default values matching the screenshot
  const logo = data?.logo?.image ? 
    urlFor(data.logo.image).url() : 
    '/logo.png';
  const logoAlt = data?.logo?.alt || 'TutorChase Dubai Tutors';
  
  const description = data?.description || 
    'Providing comprehensive past papers from all\nmajor international curricula to help students\nachieve academic excellence.';
  
  const quickLinksTitle = data?.quickLinks?.title || 'Quick Links';
  const quickLinks = data?.quickLinks?.links || [
    { text: 'Home', url: '/home' },
    { text: 'Subjects', url: '/subjects' },
    { text: 'FAQs', url: '/faq' },
    { text: 'Blog', url: '/blog' },
    { text: 'About Us', url: '/about' }
  ];
  
  const contactTitle = data?.contact?.title || 'Contact';
  const contactEmail = data?.contact?.email || 'info@pastpapers.com';
  const contactPhone = data?.contact?.phone || '+44 123 456 7890';
  const contactAddress = data?.contact?.address || '123 Education St, London, UK';
  
  const twitterUrl = data?.socialMedia?.twitter || '#';
  const facebookUrl = data?.socialMedia?.facebook || '#';
  const instagramUrl = data?.socialMedia?.instagram || '#';
  
  const copyrightYear = data?.copyright?.year || '2025';
  const companyName = data?.copyright?.companyName || 'Past Papers Collection';
  const rightsText = data?.copyright?.rightsText || 'All rights reserved';
  
  // Background and text colors
  const getBackgroundClass = () => {
    if (data?.backgroundColor === 'custom' && data?.customBackgroundColor) {
      return data.customBackgroundColor;
    }
    return data?.backgroundColor === 'gray-50' ? 'bg-gray-50' :
           data?.backgroundColor === 'gray-900' ? 'bg-gray-900' : 'bg-white';
  };
  
  const getTextColorClasses = () => {
    const isDark = data?.textColor === 'light';
    return {
      heading: isDark ? 'text-white' : 'text-gray-900',
      body: isDark ? 'text-gray-300' : 'text-gray-600',
      hover: isDark ? 'hover:text-white' : 'hover:text-gray-900',
      border: isDark ? 'border-gray-700' : 'border-gray-200',
      copyright: isDark ? 'text-gray-400' : 'text-gray-500',
      socialIcon: isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'
    };
  };
  
  const textColors = getTextColorClasses();

  return (
    <footer className={getBackgroundClass()}>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-16 space-y-8 md:space-y-0">
          <div className="flex items-start space-x-3">
            <Image
              src={logo}
              alt={logoAlt}
              width={200}
              height={60}
              className="h-12 w-auto"
            />
            <div>
              <p className={`text-sm ${textColors.body} mt-1 max-w-xs`}>
                {description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-semibold ${textColors.heading} mb-4`}>
              {quickLinksTitle}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.url || '#'} 
                    className={`text-sm ${textColors.body} ${textColors.hover}`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-semibold ${textColors.heading} mb-4`}>
              {contactTitle}
            </h4>
            <div className={`space-y-2 text-sm ${textColors.body}`}>
              {contactEmail && <p>Email: {contactEmail}</p>}
              {contactPhone && <p>Phone: {contactPhone}</p>}
              {contactAddress && <p>Address: {contactAddress}</p>}
              {data?.contact?.customLink?.text && data?.contact?.customLink?.url && (
                <p>
                  <Link 
                    href={data.contact.customLink.url} 
                    className={`${textColors.hover} underline`}
                    target={data.contact.customLink.url.startsWith('http') ? '_blank' : '_self'}
                    rel={data.contact.customLink.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {data.contact.customLink.text}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-6 md:order-2 mt-8 md:mt-0">
          {twitterUrl && (
            <Link href={twitterUrl} className={textColors.socialIcon}>
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          )}
          {facebookUrl && (
            <Link href={facebookUrl} className={textColors.socialIcon}>
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
          {instagramUrl && (
            <Link href={instagramUrl} className={textColors.socialIcon}>
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.33c.881-.881 2.033-1.371 3.33-1.371s2.448.49 3.33 1.297c.881.881 1.371 2.033 1.371 3.33s-.49 2.448-1.297 3.30c-.881.881-2.033 1.371-3.33 1.371z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className={`border-t ${textColors.border}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className={`text-center text-sm ${textColors.copyright}`}>
            © {copyrightYear} {companyName}. {rightsText}.
          </p>
        </div>
      </div>
    </footer>
  );
} 