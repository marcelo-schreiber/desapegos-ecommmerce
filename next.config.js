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
      'http2.mlstatic.com',
    ],
  },
};

module.exports = nextConfig;
