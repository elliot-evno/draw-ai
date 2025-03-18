/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Ensure no file system writes for image handling
  images: {
    unoptimized: true, // Disable Next.js automatic image optimization which writes to disk
    domains: [], // No external image domains needed as we're using base64
    remotePatterns: [] // No remote patterns needed
  },
  // Additional security measures
  experimental: {
    serverComponentsExternalPackages: [] // No external packages that might do file I/O
  }
};

module.exports = nextConfig; 