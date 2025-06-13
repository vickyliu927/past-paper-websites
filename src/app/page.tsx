'use client';

import Link from 'next/link';
import { subjects, testimonials, faqs } from '@/data/mockData';
import { useState } from 'react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');

  // Filter subjects based on selected category
  const filteredSubjects = subjects.filter(subject => 
    selectedCategory === 'All Subjects' || subject.category === selectedCategory
  );

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

          {/* Subject Categories */}
          <div className="mt-10 flex justify-center">
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

          {/* Subjects Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                {/* Subject Header */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="subject-icon">{subject.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {subject.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                      {subject.paperCount} papers
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {subject.description}
                  </p>
                </div>

                {/* Subject Content */}
                {/* No subject content div here; button comes immediately after gradient box */}
                <Link
                  href={`/subjects/${subject.id}`}
                  className="block w-full rounded-b-2xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  style={{ margin: 0 }}
                >
                  View Past Papers
                </Link>
              </div>
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
              Get in Touch
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Need help finding specific past papers from any curriculum or have questions about our collection? Contact us for assistance.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-xl">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
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
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
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
              <div>
                <label htmlFor="curriculum" className="block text-sm font-medium leading-6 text-gray-900">
                  Curriculum
                </label>
                <div className="mt-2">
                  <select
                    id="curriculum"
                    name="curriculum"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a curriculum</option>
                    <option value="cie-alevels">CIE A-Levels</option>
                    <option value="cie-igcse">CIE IGCSE</option>
                    <option value="ib-diploma">IB Diploma Programme</option>
                    <option value="ap">Advanced Placement (AP)</option>
                    <option value="edexcel">Edexcel A-Levels</option>
                    <option value="aqa">AQA A-Levels</option>
                    <option value="ocr">OCR A-Levels</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    placeholder="How can we help you with past papers?"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="block w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Send Message
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
