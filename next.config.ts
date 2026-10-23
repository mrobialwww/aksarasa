import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Allow TF.js ES modules to be bundled correctly
    transpilePackages: ["@tensorflow/tfjs"],
};

export default nextConfig;
