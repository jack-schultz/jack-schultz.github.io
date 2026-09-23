/**
 * Full site build: layouts + content → finished HTML in dist/.
 *
 * Also compiles SCSS and copies browser assets (client scripts, assets/, CNAME)
 * so dist/ is self-contained for GitHub Pages.
 */

import { mkdirSync, rmSync, cpSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as sass from 'sass';
import { loadData } from './loadData.js';
import { loadPageLayout, renderTemplate } from './renderLayout.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');
const distDir = resolve(rootDir, 'dist');

/**
 * Wipe dist/, then rebuild everything from source.
 * Order: pages → CSS → client scripts → assets → CNAME.
 */
export function build() {
  console.log('Building site...');

  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  const siteData = loadData(rootDir);

  renderPages(siteData);
  compileStyles();
  copyClientScripts();
  copyAssets();
  copyCname();

  console.log('Build complete → dist/');
}

/**
 * Each file under layouts/pages/ becomes the same relative path in dist/.
 * Nested folders (e.g. projects/tetris.html) are preserved.
 */
function renderPages(siteData) {
  const pagesDir = resolve(rootDir, 'layouts', 'pages');

  for (const file of listHtmlFiles(pagesDir)) {
    const rel = relative(pagesDir, file).replace(/\\/g, '/');
    const template = loadPageLayout(rootDir, rel);
    const html = renderTemplate(template, { rootDir, siteData });

    const outPath = resolve(distDir, rel);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf8');
    console.log(`  wrote ${rel}`);
  }
}

function compileStyles() {
  const scssPath = resolve(rootDir, 'styles', 'main.scss');
  const css = sass.compile(scssPath, { style: 'expanded' }).css;

  const outPath = resolve(distDir, 'styles', 'main.css');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, css, 'utf8');
  console.log('  wrote styles/main.css');
}

function copyClientScripts() {
  // Browser scripts live under scripts/client/ but are served as /scripts/
  cpSync(resolve(rootDir, 'scripts', 'client'), resolve(distDir, 'scripts'), {
    recursive: true,
  });
  console.log('  copied scripts/');
}

function copyAssets() {
  const src = resolve(rootDir, 'assets');
  if (!existsSync(src)) {
    console.log('  (no assets/ to copy)');
    return;
  }
  cpSync(src, resolve(distDir, 'assets'), { recursive: true });
  console.log('  copied assets/');
}

function copyCname() {
  // Optional custom domain file for GitHub Pages
  const src = resolve(rootDir, 'CNAME');
  if (!existsSync(src)) return;
  cpSync(src, resolve(distDir, 'CNAME'));
  console.log('  copied CNAME');
}

function listHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...listHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

// Run when invoked directly (`npm run build`), not when imported by dev.js
const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isMain) build();
