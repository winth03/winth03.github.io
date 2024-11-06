import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default async (phase, { defaultConfig }) => {
    /** @type {import('next').NextConfig} */
    const nextConfig = {
        ...defaultConfig,
        reactStrictMode: true, // Enable React strict mode for improved error handling
        // crossOrigin: "use-credentials", // Set crossorigin attribute on script and link elements
    };

    if (phase !== PHASE_DEVELOPMENT_SERVER) {
        nextConfig.compiler = {
            removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
        };
    }

    return nextConfig;
};
