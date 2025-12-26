import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false, // Removed to reduce package size
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: true, // Minify to further reduce size
});

