/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', // Required for static HTML export
  basePath: '/finflip', // Match your GitHub repo name
  trailingSlash: true,  // Required for static HTML pages
};

module.exports = nextConfig;
