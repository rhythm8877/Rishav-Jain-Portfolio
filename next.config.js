/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // For static site generation
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  target: 'serverless'
}

module.exports = nextConfig 