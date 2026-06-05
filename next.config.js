/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/himaz_properties',
  assetPrefix: '/himaz_properties',
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
