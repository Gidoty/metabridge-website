import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^\/api\//,
        handler: 'NetworkOnly',
      },
      {
        urlPattern: /^\/_next\/static\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'next-static',
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^\/_next\/image.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'next-images',
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
      {
        urlPattern: /^\/(free-cohort|paid-professional|labs)(\/.*)?$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'dashboard-pages',
          networkTimeoutSeconds: 3,
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 },
        },
      },
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default withPWA(nextConfig)
