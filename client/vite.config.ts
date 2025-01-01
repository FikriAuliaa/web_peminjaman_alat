import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // Sesuaikan jika aplikasi Anda di-host di subdirektori
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Alamat backend lokal Anda
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist", // Folder output untuk produksi
    sourcemap: false, // Nonaktifkan sourcemap di produksi
    chunkSizeWarningLimit: 500, // Naikkan batas peringatan ukuran chunk
  },
});
