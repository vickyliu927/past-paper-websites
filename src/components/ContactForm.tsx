'use client';

import React, { useState } from 'react';
import { Lexend } from 'next/font/google';
import Link from 'next/link';

const lexend = Lexend({ 
  subsets: ['latin'],
  fallback: ['Lexend Fallback']
});

interface FormField {
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  countryLabel?: string;
  countryPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  budgetLabel?: string;
  budgetPlaceholder?: string;
  submitButtonText?: string;
}

interface ContactFormData {
  title?: string;
  description?: string;
  companyName?: string;
  companyUrl?: string;
  formFields?: FormField;
  backgroundColor?: string;
  customBackgroundColor?: string;
  maxWidth?: string;
  successMessage?: {
    title?: string;
    description?: string;
  };
  errorMessage?: {
    title?: string;
    description?: string;
  };
}

interface ContactFormProps {
  data: ContactFormData;
}

interface FormData {
  fullName: string;
  country: string;
  email: string;
  phone: string;
  tutoringDetails: string;
  hourlyBudget: string;
}

interface FormErrors {
  fullName?: string;
  country?: string;
  email?: string;
  phone?: string;
  tutoringDetails?: string;
  hourlyBudget?: string;
}

export default function ContactForm({ data }: ContactFormProps) {
  if (!data) {
    return null;
  }

  const {
    title = 'Hire a tutor',
    description,
    companyName = 'TutorChase',
    companyUrl = 'https://tutorchase.com',
    formFields = {},
    backgroundColor = 'white',
    customBackgroundColor,
    maxWidth = 'lg',
    successMessage = {
      title: 'Message sent successfully!',
      description: 'Thank you for your message. We\'ll get back to you soon.'
    },
    errorMessage = {
      title: 'Failed to send message',
      description: 'Something went wrong. Please try again later.'
    }
  } = data;

  const {
    fullNameLabel = 'Full name',
    fullNamePlaceholder = 'Enter your full name',
    countryLabel = 'Country',
    countryPlaceholder = 'Enter your country',
    emailLabel = 'Your email',
    emailPlaceholder = 'Enter your email address',
    phoneLabel = 'Your phone (with country code)',
    phonePlaceholder = '+1 (555) 123-4567',
    detailsLabel = 'Details of tutoring request (e.g., exams, subjects, how long for etc.)',
    detailsPlaceholder = 'Please provide details about your tutoring needs, including subjects, exam preparation requirements, duration, and any specific goals...',
    budgetLabel = 'Hourly budget (including currency)',
    budgetPlaceholder = 'e.g. $50/hour, £40/hour, €45/hour',
    submitButtonText = 'SUBMIT'
  } = formFields;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    country: '',
    email: '',
    phone: '',
    tutoringDetails: '',
    hourlyBudget: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        break;
      case 'country':
        if (!value.trim()) return 'Country is required';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (value.trim().length < 8) return 'Please enter a valid phone number';
        break;
      case 'tutoringDetails':
        if (!value.trim()) return 'Please provide details about your tutoring needs';
        if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
        break;
      case 'hourlyBudget':
        if (!value.trim()) return 'Hourly budget is required';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your inquiry! We will get back to you within 24 hours.');
        setFormData({
          fullName: '',
          country: '',
          email: '',
          phone: '',
          tutoringDetails: '',
          hourlyBudget: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBackgroundClass = () => {
    if (backgroundColor === 'custom' && customBackgroundColor) {
      return customBackgroundColor.startsWith('#') ? '' : customBackgroundColor;
    }
    return backgroundColor === 'white' ? 'bg-white' : 
           backgroundColor === 'gray-50' ? 'bg-gray-50' : 
           backgroundColor === 'blue-50' ? 'bg-blue-50' : 'bg-white';
  };

  const getBackgroundStyle = () => {
    if (backgroundColor === 'custom' && customBackgroundColor?.startsWith('#')) {
      return { backgroundColor: customBackgroundColor };
    }
    return {};
  };

  const getMaxWidthClass = () => {
    return maxWidth === 'md' ? 'max-w-md' : 
           maxWidth === 'lg' ? 'max-w-lg' : 
           maxWidth === 'xl' ? 'max-w-xl' : 
           maxWidth === '2xl' ? 'max-w-2xl' : 'max-w-lg';
  };

  return (
    <section 
      className={`py-20 ${getBackgroundClass()}`}
      style={{ backgroundColor: '#f9fafb' }}
    >
      <div className="container mx-auto px-4">
        <div className={`${getMaxWidthClass()} mx-auto`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`${lexend.className} text-[36px] font-normal text-gray-900 mb-4`}>
              {title}
            </h2>
            {description && (
              <div className={`${lexend.className} text-gray-600 text-[18px] leading-relaxed mt-4`}>
                {description.includes(companyName) ? (
                  description.split(companyName).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <Link 
                          href={companyUrl} 
                          className="text-blue-600 hover:text-blue-800 underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {companyName}
                        </Link>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  description
                )}
              </div>
            )}
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className={`${lexend.className} text-green-800`}>{submitMessage}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className={`${lexend.className} text-red-800`}>{submitMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                {fullNameLabel}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={fullNamePlaceholder}
                className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.fullName ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.fullName}</p>
              )}
            </div>

            {/* Country and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                  {countryLabel}<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={countryPlaceholder}
                  className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.country ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.country && (
                  <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.country}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                  {emailLabel}<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={emailPlaceholder}
                  className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                {phoneLabel}<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={phonePlaceholder}
                className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.phone}</p>
              )}
            </div>

            {/* Tutoring Details */}
            <div>
              <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                {detailsLabel}<span className="text-red-500">*</span>
              </label>
              <textarea
                name="tutoringDetails"
                rows={5}
                value={formData.tutoringDetails}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={detailsPlaceholder}
                className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                  errors.tutoringDetails ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.tutoringDetails && (
                <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.tutoringDetails}</p>
              )}
            </div>

            {/* Hourly Budget */}
            <div>
              <label className={`${lexend.className} block text-sm font-medium text-gray-700 mb-2`}>
                {budgetLabel}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hourlyBudget"
                value={formData.hourlyBudget}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={budgetPlaceholder}
                className={`${lexend.className} w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.hourlyBudget ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.hourlyBudget && (
                <p className={`${lexend.className} text-red-500 text-sm mt-1`}>{errors.hourlyBudget}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${lexend.className} w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'SUBMITTING...' : submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 