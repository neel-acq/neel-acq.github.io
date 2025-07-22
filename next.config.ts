/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'export', // Required for static HTML export
  basePath: '', // Match your GitHub repo name
  // assetPrefix: '/finflip/',
  trailingSlash: true,  // Required for static HTML pages
};

module.exports = nextConfig;
