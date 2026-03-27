import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/ai.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
});
