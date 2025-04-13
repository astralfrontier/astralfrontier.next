import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out",
  env: {
    NEXTJS_ROOT: __dirname,
  },
};

export default nextConfig;
