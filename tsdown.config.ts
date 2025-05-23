import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  dts: {
    resolve: true,
  },
  minify: true,
});
