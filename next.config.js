/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Fail builds on type or lint errors in production, but not in previews
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === 'preview' || process.env.NETLIFY === 'true' && process.env.CONTEXT !== 'production'
      ? true
      : false
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'preview' || process.env.NETLIFY === 'true' && process.env.CONTEXT !== 'production'
      ? true
      : false
  },
  experimental: {}
};

module.exports = nextConfig;
