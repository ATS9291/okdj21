import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['@okdoenjang/database'],
};

export default nextConfig;
