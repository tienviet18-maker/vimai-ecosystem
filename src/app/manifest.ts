import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ViMai",
    short_name: "ViMai",
    description: "ViMai Education & Technology Ecosystem",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#123A6F",
    icons: [
      {
        src: "/brand/vimai-logo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
