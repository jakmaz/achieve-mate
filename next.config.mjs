/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "steamcdn-a.akamaihd.net",
      "shared.akamai.steamstatic.com",
      "steamuserimages-a.akamaihd.net",
      "cdn.cloudflare.steamstatic.com",
      "avatars.steamstatic.com",
    ],
  },
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
