'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HireTutorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage with hire-tutor section anchor
    router.replace('/#hire-tutor');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to hire a tutor...</p>
      </div>
    </div>
  );
} 