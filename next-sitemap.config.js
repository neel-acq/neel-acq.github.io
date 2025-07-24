/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://finflip.vercel.app", // ✅ Replace with your live domain
    generateRobotsTxt: true, // ✅ also generates robots.txt
    // generateIndexSitemap: false, // optional: disable sitemap-index if site is small
    sitemapSize: 5000,
};
