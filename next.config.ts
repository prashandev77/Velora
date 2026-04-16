import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no one can embed this site in an iframe
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer info sent with requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not needed by this app
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // Force HTTPS (add preload after submitting domain to hstspreload.org)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  // Enforced CSP with per-request nonce is set in middleware.ts (no unsafe-eval).
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/maintenance',
        destination: '/',
        permanent: true,
      },
      {
        source: '/journeys/luxury/velora-luxe',
        destination: '/journeys/luxury/avelora-signature',
        permanent: true,
      },
      {
        source: '/journeys/wellness/velora-serene',
        destination: '/journeys/wellness/avelora-wellness',
        permanent: true,
      },
      {
        source: '/journeys/adventure/velora-wild',
        destination: '/journeys/adventure/avelora-wild',
        permanent: true,
      },
      {
        source: '/journeys/honeymoon/velora-honeymoon',
        destination: '/journeys/honeymoon/avelora-romance',
        permanent: true,
      },
      {
        source: '/journeys/adventure/serendipity-of-sri-lanka',
        destination: '/journeys/adventure/avelora-discovery',
        permanent: true,
      },
      {
        source: '/journeys/honeymoon/avelora-honeymoon',
        destination: '/journeys/honeymoon/avelora-romance',
        permanent: true,
      },
      {
        source: '/journeys/adventure/avelora-serendipity',
        destination: '/journeys/adventure/avelora-discovery',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gpcdketdorvafupgbejw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
