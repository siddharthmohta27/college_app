// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        manifest: false, // we use our own public/manifest.json
        workbox: {
          // Cache navigation requests with NetworkFirst — always get fresh HTML when online
          navigationPreload: true,
          runtimeCaching: [
            {
              // Page navigations
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "campus-connect-pages",
                networkTimeoutSeconds: 5,
                cacheableResponse: { statuses: [200] },
              },
            },
            {
              // JS / CSS / images — CacheFirst for speed
              urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|ico|woff2?)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "campus-connect-assets",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Google Fonts stylesheets
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "google-fonts-stylesheets",
              },
            },
            {
              // Google Fonts files
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
          // Precache the app shell
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          globIgnores: ["**/node_modules/**/*"],
        },
        devOptions: {
          enabled: true, // enable SW in dev for testing
          type: "module",
        },
      }),
    ],
    server: {
      port: 8080,
      proxy: {
        // In dev, proxy /api/* to the local chat-server.
        // In production (Vercel), vercel.json rewrites handle this instead.
        '/api/chat': {
          target: process.env.VITE_API_BASE || 'http://localhost:3001',
          changeOrigin: true,
        },
        '/api/dating': {
          target: process.env.VITE_API_BASE || 'http://localhost:3001',
          changeOrigin: true,
        },
        '/api/marketplace': {
          target: process.env.VITE_API_BASE || 'http://localhost:3001',
          changeOrigin: true,
        },
        '/api/attendance': {
          target: process.env.VITE_API_BASE || 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  },
});
