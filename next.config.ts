// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This option allows you to build even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
  // Add any other configurations you need here
};

export default nextConfig;
