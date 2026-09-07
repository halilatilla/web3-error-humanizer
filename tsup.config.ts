import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ai: "src/ai.ts",
    evm: "src/entries/evm.ts",
    solana: "src/entries/solana.ts",
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
});
