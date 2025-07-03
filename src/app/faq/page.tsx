'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FaqRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage with FAQ section anchor
    router.replace('/#faq');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to FAQ...</p>
      </div>
    </div>
  );
} 