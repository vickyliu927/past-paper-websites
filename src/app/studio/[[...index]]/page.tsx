/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import NextStudio to avoid SSR issues with framer-motion
const NextStudio = dynamic(() => import('next-sanity/studio').then(mod => ({ default: mod.NextStudio })), {
  ssr: false,
  loading: () => <div>Loading Studio...</div>
});

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);
  const [studioConfig, setStudioConfig] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import the config to avoid SSR issues
    import('../../../../sanity.config').then((configModule) => {
      setStudioConfig(configModule.default);
    });
  }, []);

  if (!mounted || !studioConfig) {
    return <div>Loading Studio...</div>;
  }

  return <NextStudio config={studioConfig} />;
} 