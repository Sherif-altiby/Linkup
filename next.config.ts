/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        protocol: "https",
        hostname: "*.fbsbx.com", // covers all facebook image subdomains
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net", // facebook CDN images
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google images
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

module.exports = nextConfig;
