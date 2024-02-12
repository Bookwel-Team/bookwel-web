import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      nycrcPath: './.nycrc.json',
      forceBuildInstrument: true,
      include: './src/*',
      extension: ['.ts', '.tsx'],
    }),
  ],
  optimizeDeps: {
    entries: ['cypress/**/*', 'src/**/*'],
  },
  server: {
    host: true,
    port: 3000,
  },
});
