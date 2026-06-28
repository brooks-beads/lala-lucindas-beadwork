/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary — permanent URLs, preferred source
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // Airtable attachment CDN — expiring signed URLs, fallback only
      { protocol: 'https', hostname: 'dl.airtable.com' },
      { protocol: 'https', hostname: 'v5.airtableusercontent.com' },
    ],
  },
}

module.exports = nextConfig
