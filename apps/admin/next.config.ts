import type { NextConfig } from 'next';

const config: NextConfig = {
  devIndicators: false,
  transpilePackages: ['@okdoenjang/database'],
};

export default config;
