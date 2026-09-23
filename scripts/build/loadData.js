/**
 * Site-wide values from data.jsonc, plus {{key}} substitution.
 *
 * Layouts and Markdown use {{name}} placeholders; those resolve against
 * the key/value pairs in data.jsonc at build time.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Remove block and line comments so JSON.parse can read JSONC. */
export function stripJsonComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:\\])\/\/.*$/gm, '$1');
}

/** Load and parse data.jsonc. */
export function loadData(rootDir) {
  const raw = readFileSync(resolve(rootDir, 'data.jsonc'), 'utf8');
  return JSON.parse(stripJsonComments(raw));
}

/**
 * Replace {{key}} placeholders with values from data.
 * Unknown keys are left unchanged so typos stay visible in the output.
 */
export function applyVars(text, data) {
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    return Object.hasOwn(data, key) ? String(data[key]) : match;
  });
}
