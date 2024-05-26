/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "shivam-sharma-myportfolio.vercel.app",
      },
    ],
  },
};

module.exports = nextConfig;
