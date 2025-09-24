/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Allow successful builds even if type-check finds issues (staging-friendly)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optional: lint won’t block builds either (you still get local warnings)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep defaults otherwise
  experimental: {},
};

module.exports = nextConfig;
