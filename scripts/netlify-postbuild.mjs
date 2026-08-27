
#!/usr/bin/env node
/**
 * netlify-postbuild.mjs
 *
 * Runs after `vite build` with NITRO_PRESET=netlify.
 *
 * With the netlify preset, Nitro outputs:
 *   - Static assets → dist/  (JS bundles, icons, sw.js, etc.)
 *   - SSR server    → .netlify/functions-internal/server/
 *
 * The only thing missing is index.html — Nitro's SSR handles requests
 * server-side, but Netlify also needs a static index.html fallback for
 * the deploy directory check to pass.
 *
 * This script generates dist/index.html that bootstraps the React app.
 */

import { readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = join(root, "dist");
const assetsDir = join(distDir, "assets");

// ── Find entry JS and CSS ──────────────────────────────────────────────────────
const allAssets = await readdir(assetsDir);

const entryJs = allAssets.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const entryCss = allAssets.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

if (!entryJs) {
  console.error("❌  Could not find assets/index-*.js in", assetsDir);
  process.exit(1);
}

console.log(`✔  Entry JS  : /assets/${entryJs}`);
if (entryCss) console.log(`✔  Entry CSS : /assets/${entryCss}`);

// ── Generate index.html ────────────────────────────────────────────────────────
const cssLink = entryCss
  ? `  <link rel="stylesheet" href="/assets/${entryCss}" />\n`
  : "";

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Campus Connect</title>
    <meta name="description" content="Your College, All in One Place — Marketplace, canteen, chat, clubs, events and study rooms unified." />
    <meta name="theme-color" content="#F59E0B" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
${cssLink}    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js', { scope: '/' });
        });
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entryJs}"></script>
  </body>
</html>
`;

await writeFile(join(distDir, "index.html"), html, "utf-8");
console.log("✔  Generated  : dist/index.html");
console.log("\n🎉  Netlify build ready at dist/");
