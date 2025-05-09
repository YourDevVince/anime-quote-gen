import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/anime-quote-gen/',
  plugins: [react()],
  server: {
    port: 3001, // Runs Vite on this port
  },
});
