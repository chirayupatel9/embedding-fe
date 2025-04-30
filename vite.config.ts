import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',     // bind to all network interfaces
    port: 5173           // optional: you already exposed it in Docker
  }
});
