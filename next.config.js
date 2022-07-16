/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'files.stripe.com',
      'img.olx.com.br',
      'olx.com.br',
      'www2.olx.com.br',
    ],
  },
};

module.exports = nextConfig;
