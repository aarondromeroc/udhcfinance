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
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      input: "./src/main.js",
      output: {
        // Use 'es' for code splitting (recommended for modern browsers)
        // Use 'umd' for Webflow compatibility (single file, no code splitting)
        format: "es",
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
        compact: true,
        manualChunks: {
          // Separate Three.js into its own chunk
          three: ["three"],
          // Separate GSAP into its own chunk
          gsap: ["gsap"],
          // Separate Barba.js into its own chunk
          barba: ["@barba/core"],
          // Separate Swiper into its own chunk
          swiper: ["swiper"],
          // Separate SplitType into its own chunk
          "split-type": ["split-type"],
          // Vendor chunk for other dependencies
          vendor: ["jquery"],
        },
      },
      external: ["jquery"],
    },
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements in production
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ["three", "gsap", "@barba/core", "swiper", "split-type"],
  },
});

// Alternative UMD configuration (uncomment if you need Webflow compatibility):
/*
export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: 'terser',
    manifest: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'umd',
        entryFileNames: 'assets/main.production.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'three',
      'gsap',
      '@barba/core',
      'swiper',
      'split-type'
    ]
  }
})
*/
