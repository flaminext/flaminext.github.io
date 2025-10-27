import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { ghPages } from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tanstackRouter(), tailwindcss(), ghPages()],
});
