/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "steamcdn-a.akamaihd.net",
      "shared.akamai.steamstatic.com",
      "steamuserimages-a.akamaihd.net",
    ], // Add Steam's CDN domain here
  },
};

export default nextConfig;
