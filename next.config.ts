import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: '/assets/home_page_gallery/*',
        search: '',
      }
    ]
  }
};

export default nextConfig;
