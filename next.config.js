/** @type {import('next').NextConfig} */
const { v4: uuidv4 } = require("uuid");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  generateBuildId: async () => uuidv4(),
  images: {
    unoptimized: true
  },
  assetPrefix: './',
};

module.exports = nextConfig;