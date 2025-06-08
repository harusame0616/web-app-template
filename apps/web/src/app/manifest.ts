import type { MetadataRoute } from "next";

import { AppName } from "@/app-info";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppName,
    short_name: AppName,
    description: "Demo App",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
