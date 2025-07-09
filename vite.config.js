import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

// vite.config.js
export default defineConfig({
  plugins: [glsl()],
  server: {
    host: "localhost",
    cors: "*",
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },
  build: {
    minify: "terser",
    manifest: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: "./src/main.js",
      output: {
        format: "umd",
        entryFileNames: "assets/main.production.js",
        esModule: false,
        compact: true,
        globals: {
          jquery: "$",
        },
      },
      external: ["jquery"],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ["three", "gsap", "@barba/core", "swiper", "split-type"],
  },
});
