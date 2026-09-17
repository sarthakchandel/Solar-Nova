import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "localhost", port: "2420" },
      { protocol: "http", hostname: "localhost", port: "2420" },
    ],
  },
};

export default nextConfig;
