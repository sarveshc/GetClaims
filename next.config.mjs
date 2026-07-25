/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/pages-menu/about-us-v3", destination: "/about", permanent: true },
      { source: "/pages-menu/pricing", destination: "/pricing", permanent: true },
      { source: "/contact/contact-v2", destination: "/contact", permanent: true },
      { source: "/contact/contact-v1", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
