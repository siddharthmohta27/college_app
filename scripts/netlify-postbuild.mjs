#!/usr/bin/env node
/**
 * netlify-postbuild.mjs
 *
 * Runs after `vite build`. Prepares .output/public/ so Netlify can serve it
 * as a static SPA:
 *
 *  1. Finds the hashed entry JS + CSS files in .output/public/assets/
 *  2. Generates index.html that bootstraps the React/TanStack app
 *  3. Copies sw.js + workbox-*.js from dist/ into .output/public/
 */

import { readdir, copyFile, writeFile, access } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outPublic = join(root, ".output", "public");
const distDir = join(root, "dist");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// ── 1. Find entry JS and CSS ──────────────────────────────────────────────────
const assetsDir = join(outPublic, "assets");
const allAssets = await readdir(assetsDir);

const entryJs = allAssets.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const entryCss = allAssets.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

if (!entryJs) {
  console.error("❌  Could not find assets/index-*.js in", assetsDir);
  process.exit(1);
}

console.log(`✔  Entry JS  : /assets/${entryJs}`);
if (entryCss) console.log(`✔  Entry CSS : /assets/${entryCss}`);

// ── 2. Generate index.html ────────────────────────────────────────────────────
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
      // Register service worker (PWA)
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

const indexPath = join(outPublic, "index.html");
await writeFile(indexPath, html, "utf-8");
console.log("✔  Generated  : .output/public/index.html");

// ── 3. Copy sw.js + workbox files from dist/ → .output/public/ ───────────────
if (await exists(distDir)) {
  const distFiles = await readdir(distDir);
  for (const file of distFiles) {
    if (file === "sw.js" || file.startsWith("workbox-")) {
      await copyFile(join(distDir, file), join(outPublic, file));
      console.log(`✔  Copied     : ${file}`);
    }
  }
} else {
  console.warn("⚠️  dist/ not found — skipping SW file copy");
}

console.log("\n🎉  Netlify static build ready at .output/public/");
