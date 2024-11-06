import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        theme_color: "#212529",
        background_color: "#212529",
        display: "standalone",
        scope: "/fallout",
        name: "WinTH03's Fallout TTRPG Tools",
        short_name: "Fallout TTRPG Tools",
        description: "Tools for playing Fallout tabletop role-playing games.",
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
}