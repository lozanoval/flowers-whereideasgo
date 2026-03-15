import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/flowers",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
