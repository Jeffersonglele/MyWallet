import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'MY WALLET',
        short_name: 'MyWallet',
        description: 'Gérez vos finances intelligemment',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-maskable.png', // Assure-toi que ce fichier existe dans /public
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Autorise ngrok à accéder au serveur de dev
    allowedHosts: true, 
    hmr: {
      // Configuration pour que le live-reload fonctionne avec ngrok
      clientPort: 443, 
    }
  },

  preview: {
    port: 5173,
    strictPort: true
  }
})