import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withMDX(nextConfig);
