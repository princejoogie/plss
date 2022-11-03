const { build } = require("esbuild");

build({
  entryPoints: ["src/index.ts"],
  minify: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
  outdir: "dist",
  platform: "node",
  target: "node16",
  format: "cjs",
}).catch(console.error);
