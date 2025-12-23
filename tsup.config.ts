import { defineConfig } from 'tsup';

export default defineConfig([
  // Standard builds (CJS + ESM)
  {
    entry: {
      'core/index': 'src/core/index.ts',
      'react/index': 'src/react/index.tsx',
      'vanilla/index': 'src/vanilla/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    external: ['react', 'react-dom'],
    treeshake: true,
    publicDir: 'src/assets', // Copy assets to dist
  },
  // CDN build (IIFE format for browser usage)
  {
    entry: {
      'cdn/cursor-fx': 'src/vanilla/index.ts',
    },
    format: ['iife'],
    globalName: 'CursorFX',
    minify: true,
    sourcemap: true,
    clean: false, // Don't clean to preserve other builds
    treeshake: true,
    outExtension: () => ({ js: '.min.js' }),
  },
]);
