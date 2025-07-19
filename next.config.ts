/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/finflip' : '',
  assetPrefix: isGithubPages ? '/finflip/' : '',
};

module.exports = nextConfig;
