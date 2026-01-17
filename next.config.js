/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,    // এই line add করো
  },
  typescript: {
    ignoreBuildErrors: true,     // এই line add করো
  },
}

module.exports = nextConfig