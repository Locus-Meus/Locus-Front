import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vis Mobile App',
        short_name: 'Vis',
        description: 'Mobile-first Gallery and Blog',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Port for your React app
    port: 5175,
    proxy: {
      '/sign-up': 'http://localhost:8888',
      '/csrf-token': 'http://localhost:8888',
      '/oauth2': 'http://localhost:8888',   
      '/v3': 'http://localhost:8888',
      '/swagger-ui': 'http://localhost:8888',
      '/actuator': 'http://localhost:8888',
      // Forwards /api/auth/sign-in to http://localhost:8888/auth/sign-in
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
