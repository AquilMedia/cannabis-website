/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/cannabis',
  assetPrefix: '/cannabis',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_ASSET_PREFIX: '/cannabis',
  },
};

module.exports = nextConfig;
