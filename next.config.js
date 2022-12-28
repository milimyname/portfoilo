const { withContentlayer } = require("next-contentlayer")
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "media-exp1.licdn.com",
      "avatars.githubusercontent.com",
    ],
    dangerouslyAllowSVG: true,
  },
}

module.exports = withContentlayer(nextConfig)
