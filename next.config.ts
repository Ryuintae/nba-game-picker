import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.4.10"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a.espncdn.com",
            },
            {
                protocol: "https",
                hostname: "www.thesportsdb.com",
            },
            {
                protocol: "https",
                hostname: "r2.thesportsdb.com",
            },
        ],
    },
};

export default nextConfig;
