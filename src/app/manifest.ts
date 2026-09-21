import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ViMai",
    short_name: "ViMai",
    description: "ViMai Education & Technology Ecosystem",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#123A6F",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
