import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "NBA Game Picker",
        short_name: "NBA Picker",
        description: "NBA 경기 데이터를 기반으로 오늘 가장 볼 만한 경기를 추천하는 서비스",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        orientation: "portrait",
        icons: [
            {
                src: "/icons/icon-nba-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-nba-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}