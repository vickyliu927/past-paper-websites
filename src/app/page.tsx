'use client';

import Link from 'next/link';
import { subjects, testimonials, faqs } from '@/data/mockData';
import { Microscope, FlaskConical, Atom, Calculator, LineChart } from 'lucide-react';
import { useState, useMemo } from 'react';

const backgroundColors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-orange-100',
  'bg-teal-100',
  'bg-rose-100',
  'bg-cyan-100'
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [searchCode, setSearchCode] = useState('');

  const subjectColors = useMemo(() => {
    return subjects.reduce((acc, subject) => {
      acc[subject.id] = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
      return acc;
    }, {} as Record<string, string>);
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects
      .filter((subject) => {
        if (selectedCategory === 'All Subjects') return true;
        return subject.category === selectedCategory;
      })
      .filter((subject) => {
        if (!searchCode) return true;
        return subject.code.toLowerCase().includes(searchCode.toLowerCase());
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
  }, [selectedCategory, searchCode]);

  const categories = ['All Subjects', 'Sciences', 'Mathematics', 'Languages', 'Humanities'];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="hero" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animate-fade-in-left pl-8 md:pl-12 lg:pl-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-none text-black">
                World&apos;s Largest{' '}
                <span className="text-black">Past Paper Collection</span>
              </h1>
              <p className="text-lg md:text-xl text-black mb-6 max-w-lg">
                Access thousands of past papers from A-Levels, IGCSE, IB, AP, and more. Complete examination resources for all major international curricula.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-gray-800 h-11 rounded-md px-8 animate-pulse-subtle">
                  Browse Papers
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-black bg-white hover:bg-gray-100 text-black h-11 rounded-md px-8">
                  View Curricula
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 animate-fade-in-right flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-lg" style={{backgroundColor: '#0F172A1A'}}></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-lg" style={{backgroundColor: '#0F172A1A'}}></div>
                <div className="relative bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Why Our Platform?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="p-1 rounded mr-2 mt-1" style={{backgroundColor: '#0F172A1A'}}>✓</div>
                      <span>Multiple curricula: A-Levels, IGCSE, IB, AP & more</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 rounded mr-2 mt-1" style={{backgroundColor: '#0F172A1A'}}>✓</div>
                      <span>Organized by curriculum, subject, and year</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 rounded mr-2 mt-1" style={{backgroundColor: '#0F172A1A'}}>✓</div>
                      <span>Marking schemes and grade boundaries</span>
          </li>
                    <li className="flex items-start">
                      <div className="p-1 rounded mr-2 mt-1" style={{backgroundColor: '#0F172A1A'}}>✓</div>
                      <span>Regular updates across all exam boards</span>
          </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <div id="subjects" className="pt-12 pb-12 md:pt-16 md:pb-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
              Browse Past Papers by Subject
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore our comprehensive collection of past papers organized by subject across all supported curricula. Each subject contains papers from multiple exam boards.
            </p>
          </div>

          {/* Subject Categories and Search */}
          <div className="mt-10">
            {/* Categories */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search by Subject Code */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Search by subject code (e.g. 9701)"
                  className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {filteredSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="block overflow-hidden rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex flex-col gap-2">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4">
                    {subject.id === 'biology' && (
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Microscope className="w-8 h-8 text-emerald-500" />
                      </div>
                    )}
                    {subject.id === 'chemistry' && (
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FlaskConical className="w-8 h-8 text-blue-500" />
                      </div>
                    )}
                    {subject.id === 'physics' && (
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Atom className="w-8 h-8 text-purple-500" />
                      </div>
                    )}
                    {subject.id === 'mathematics' && (
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Calculator className="w-8 h-8 text-red-500" />
                      </div>
                    )}
                    {subject.id === 'economics' && (
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <LineChart className="w-8 h-8 text-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Subject Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">A-Level & GCSE</p>
                      {subject.id === 'biology' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          <a
                            href="https://www.aqa.org.uk/subjects/science/as-and-a-level/biology-7401-7402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            AQA
                          </a>
                          <a
                            href="https://www.ocr.org.uk/qualifications/as-and-a-level/biology-a-h020-h420/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            OCR
                          </a>
                          <a
                            href="https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/biology-a-2015.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            Edexcel
                          </a>
                          <a
                            href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-biology-9700/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            CAIE
                          </a>
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-800 border border-gray-200">
                      {subject.code}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No results message */}
          {filteredSubjects.length === 0 && (
            <div className="mx-auto mt-16 max-w-md text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
              <p className="text-sm text-gray-600">
                No subjects match the selected category. Try selecting a different category or &ldquo;All Subjects&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-600">Why Choose Our Platform?</h2>
            <p className="mt-2 text-3xl tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for exam success
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">✓</span>
                  </div>
                  Comprehensive multi-curriculum collection
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Access past papers from all major international curricula including A-Levels, IGCSE, IB, AP, and UK exam boards.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">✓</span>
                  </div>
                  Advanced filtering and search
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find papers by curriculum, subject, year, session, or level with our powerful search and filtering system.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">✓</span>
                  </div>
                  Complete examination resources
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Question papers, marking schemes, examiner reports, grade boundaries, and specimen papers all in one place.
                </dd>
                </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">✓</span>
                </div>
                  Regular updates across all boards
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Stay current with the latest papers from all supported curricula and exam boards as they become available.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
              Student Success Stories
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              See how our comprehensive past paper collection helped students from different curricula achieve their target grades.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.subject}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      {testimonial.grade}
                    </span>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Answers to common questions about our past paper platform and resources.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl divide-y divide-gray-200">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="pt-12 pb-12 md:pt-16 md:pb-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
              Hire a tutor
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Please fill out the form and an academic consultant from{' '}
              <a href="https://tutorchase.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">
                TutorChase
              </a>{' '}
              will find a tutor for you
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-xl">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full name<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Your email<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Your phone (with country code)<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                  Details of tutoring request (e.g., exams, subjects, how long for etc.)<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    name="details"
                    id="details"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    placeholder="Please provide details about your tutoring needs, including subjects, exam preparation requirements, duration, and any specific goals..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                  Hourly budget (including currency)<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    placeholder="e.g. $50/hour, £40/hour, €45/hour"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="block w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* ... existing footer content ... */}
    </div>
  );
}

function FAQItem({ faq }: { faq: { id: string; question: string; answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-6">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4">
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

