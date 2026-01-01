import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@gotpop/system", "@gotpop/storyblok"],
  experimental: {
    optimizePackageImports: ["@gotpop/system"],
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "a.storyblok.com" }],
  },
}

export default nextConfig
