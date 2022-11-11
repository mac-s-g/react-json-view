import { sassPlugin } from "esbuild-sass-plugin";
import esbuild from "esbuild";

await esbuild.build({
  plugins: [sassPlugin()],
  entryPoints: ["./demo/src/js/index.tsx"],
  outdir: "./demo/dist",
  bundle: true,
  format: "iife",
  watch: process.env.NODE_ENV === "development",
});
