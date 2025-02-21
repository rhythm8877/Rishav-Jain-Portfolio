/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/.netlify/functions/:path*',
        destination: '/.netlify/functions/:path*',
      },
    ];
  },
}

module.exports = nextConfig 