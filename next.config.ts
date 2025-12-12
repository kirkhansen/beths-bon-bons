import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true, // looks like firebase may not support this...
    localPatterns: [
      {
        pathname: "/assets/home_page_gallery/*",
        search: "",
      },
    ],
  },
};

export default nextConfig;
