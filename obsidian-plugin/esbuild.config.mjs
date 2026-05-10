const esbuild = require("esbuild");
const builtins = require("builtin-modules");

const prod = process.argv[2] === "production";

esbuild.build({
  entryPoints: ["main.ts"],
  bundle: true,
  external: ["obsidian", "electron", ...builtins],
  format: "cjs",
  target: "es2018",
  platform: "browser",
  sourcemap: prod ? false : "inline",
  minify: prod,
  outfile: "main.js",
}).catch(() => process.exit(1));
