/**
 * Turn content/*.md into HTML for the layout engine.
 *
 * Each Markdown file may have YAML frontmatter (structured fields) and a
 * body (prose). Both can contain {{vars}} from data.jsonc.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { applyVars } from './loadData.js';

marked.setOptions({ gfm: true });

/**
 * Load content/<path>.md and return { data, html }.
 * path is relative to content/ without .md (e.g. "about/aboutMe").
 *
 * Steps: read file → split frontmatter/body → apply vars → Markdown → HTML.
 */
export function loadMarkdown(rootDir, contentPath, siteData) {
  const filePath = resolve(rootDir, 'content', `${contentPath}.md`);
  if (!existsSync(filePath)) {
    throw new Error(`Content not found: ${contentPath}.md`);
  }

  const raw = readFileSync(filePath, 'utf8');
  const {
    data: frontmatter,
    content
  } = matter(raw);

  // Vars in the body first, then convert Markdown to HTML
  const body = applyVars(content, siteData);
  const html = marked.parse(body).trim();

  // Frontmatter strings (titles, links, etc.) get the same {{var}} treatment
  const data = applyVarsDeep(frontmatter, siteData);

  return { data, html };
}

/**
 * Walk frontmatter and apply {{vars}} to every string.
 * gray-matter parses bare dates as Date objects — normalize those to YYYY-MM-DD.
 */
function applyVarsDeep(value, siteData) {
  if (typeof value === 'string') {
    return applyVars(value, siteData);
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (Array.isArray(value)) {
    return value.map((item) => applyVarsDeep(item, siteData));
  }
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = applyVarsDeep(child, siteData);
    }
    return result;
  }
  return value;
}
