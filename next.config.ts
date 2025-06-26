import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  // Add external packages that should be excluded from client bundling
  serverComponentsExternalPackages: ['framer-motion'],
  webpack: (config, { isServer }) => {
    // Fix for framer-motion and Next.js 15 compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Handle .mjs files properly
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    // Add specific rule to handle framer-motion exports
    config.module.rules.push({
      test: /node_modules\/framer-motion\/.*\.mjs$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
  experimental: {
    // Enable modern bundling for better compatibility
    esmExternals: 'loose',
  },
  // Transpile packages that need to be processed
  transpilePackages: ['@sanity/ui', '@sanity/icons', 'framer-motion'],
};

export default nextConfig;
