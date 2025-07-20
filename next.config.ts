/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  basePath: "",
  trailingSlash: true,
};

module.exports = nextConfig;
