/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Fail builds on type errors in production only
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
  eslint: {
    // Same: lint errors fail prod, not preview
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  experimental: {},
};

module.exports = nextConfig;
