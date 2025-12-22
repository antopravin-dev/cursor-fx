import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'cursor-fx/react': '../../dist/react/index.mjs',
      'cursor-fx': '../../dist/core/index.mjs',
    },
  },
});
