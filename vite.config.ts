import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from '@vitejs/plugin-react-swc';
// import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";
import checker from 'vite-plugin-checker'
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Click ERP',
        short_name: 'ClickERP',
        description: 'ERP Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },
    }),
    tailwindcss(),
    checker({  typescript: {
        tsconfigPath: './tsconfig.json'
      } })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      overlay: true
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    sourcemap: true,
    target: "es2017"
  }
});


