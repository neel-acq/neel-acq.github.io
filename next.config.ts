/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Required for static export

  trailingSlash: true, // ✅ Important for proper routing

  basePath: '',        // ✅ No subfolder, root deployment
  assetPrefix: '',     // ✅ No asset prefix needed

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
