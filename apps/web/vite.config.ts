import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
  },
  // nitro provides the deployment layer; on Vercel it auto-detects the
  // platform and emits the Build Output API format (.vercel/output).
  plugins: [tailwindcss(), tanstackStart(), nitro(), viteReact()],
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
});
