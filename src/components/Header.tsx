'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { urlFor } from '../../lib/sanity';

interface HeaderProps {
  data: {
    logo: {
      image: any;
      link: string;
    };
    navigationLinks: {
      text: string;
      url: string;
    }[];
    actionButtons: {
      text: string;
      url: string;
      variant: 'primary' | 'secondary';
    }[];
  };
}

export default function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo, navigationLinks, actionButtons } = data;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-6" aria-label="Global">
        <div className="flex lg:flex-1 pl-8 md:pl-12 lg:pl-16">
            <Link href={logo.link || '/'} className="-m-1.5 p-1.5">
            <span className="sr-only">TutorChase</span>
            <Image
                src={logo.image ? urlFor(logo.image).url() : '/logo.png'}
              alt="TutorChase Dubai Tutors"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
            {navigationLinks.map((item) => (
            <Link
                key={item.text}
                href={item.url}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
                {item.text}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {actionButtons.map((button) => (
          <Link
                key={button.text}
                href={button.url}
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ 
                  backgroundColor: button.variant === 'primary' ? '#fb510f' : '#001a96'
                }}
          >
                {button.text}
          </Link>
            ))}
        </div>
      </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={logo.link || '/'} className="-m-1.5 p-1.5">
                <span className="sr-only">TutorChase</span>
                <Image
                  src={logo.image ? urlFor(logo.image).url() : '/logo.png'}
                  alt="TutorChase Dubai Tutors"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigationLinks.map((item) => (
                    <Link
                      key={item.text}
                      href={item.url}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  {actionButtons.map((button) => (
                  <Link
                      key={button.text}
                      href={button.url}
                    className="w-full block text-center rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm hover:opacity-90"
                      style={{ 
                        backgroundColor: button.variant === 'primary' ? '#fb510f' : '#001a96'
                      }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                      {button.text}
                  </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 