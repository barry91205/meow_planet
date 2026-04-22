import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from 'vite-plugin-checker'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  base: "meow_planet/",
  plugins: [
    [vue()]
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables.scss" as *;`,
      },
    },
  },
});
