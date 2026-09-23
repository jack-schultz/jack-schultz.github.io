/**
 * Local preview: build once, serve dist/, rebuild when sources change.
 *
 * Run with `npm run dev` → http://localhost:8000/
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';
import { build } from './build.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../..');
const distDir = resolve(rootDir, 'dist');
const PORT = 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

build();
startServer();
watchForChanges();

/** Static file server rooted at dist/. */
function startServer() {
  const server = createServer((req, res) => {
    const filePath = resolveFile(req.url);

    if (!filePath) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const type = MIME[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(readFileSync(filePath));
  });

  server.listen(PORT, () => {
    console.log(`Dev server at http://localhost:${PORT}/`);
  });
}

/**
 * Map a request URL to a file under dist/, or null if missing.
 * Pretty URLs: /about → about.html, / → index.html.
 * startsWith(distDir) blocks path traversal (e.g. /../package.json).
 */
function resolveFile(url) {
  let urlPath = decodeURIComponent(url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  if (!extname(urlPath)) urlPath += '.html';

  const filePath = join(distDir, urlPath);
  const isSafe = filePath.startsWith(distDir);
  const isFile = existsSync(filePath) && statSync(filePath).isFile();

  return isSafe && isFile ? filePath : null;
}

/**
 * Rebuild whenever content, layouts, styles, or other inputs change.
 * ignoreInitial: true because we already built once at startup.
 */
function watchForChanges() {
  const watchPaths = [
    resolve(rootDir, 'content'),
    resolve(rootDir, 'layouts'),
    resolve(rootDir, 'styles'),
    resolve(rootDir, 'scripts', 'client'),
    resolve(rootDir, 'data.jsonc'),
    resolve(rootDir, 'assets'),
    resolve(rootDir, 'CNAME'),
  ];

  chokidar.watch(watchPaths, { ignoreInitial: true }).on('all', (event, path) => {
    console.log(`\n[${event}] ${path}`);
    try {
      build();
    } catch (err) {
      console.error('Build failed:', err.message);
    }
  });
}
