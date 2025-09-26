/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['ui-avatars.com', 'i.pravatar.cc', 'github.com'],
  },
  // Enable strict mode
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Configure trailing slash behavior
  trailingSlash: false,
}

module.exports = nextConfig