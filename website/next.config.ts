import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/metis-os-website",
  turbopack: { root: process.cwd() },
  images: { unoptimized: true },
};
export default nextConfig;
