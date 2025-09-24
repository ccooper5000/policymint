/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // output: 'export', // Commented out to allow dynamic API routes
};

module.exports = nextConfig;
