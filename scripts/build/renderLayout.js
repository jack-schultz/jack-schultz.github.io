/**
 * Tiny template engine for layouts/ HTML files.
 *
 * Pages and partials are HTML with placeholders. This file expands those
 * placeholders into finished HTML: site vars, Markdown fragments, and nested
 * partials. Two partials (project-blurb, timeline) need extra structured data
 * from Markdown frontmatter, so they get dedicated fill helpers.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { applyVars } from './loadData.js';
import { loadMarkdown } from './renderMarkdown.js';

/**
 * Expand a layout template string into HTML.
 *
 * Order matters: partials and Markdown first (they may introduce more {{keys}}),
 * then simple {{key}} substitution last.
 *
 * Syntax:
 *   {{key}}                         — site data var
 *   {{{md:path}}}                   — render content/<path>.md
 *   {{> name}}                      — include layouts/partials/<name>.html
 *   {{{partial:name key=value}}}    — include partial with local vars
 */
export function renderTemplate(template, context) {
  const { rootDir, siteData, locals = {} } = context;
  let html = template;

  // {{{partial:name key=value ...}}}
  html = html.replace(
    /\{\{\{partial:([a-zA-Z0-9_-]+)([^}]*)\}\}\}/g,
    (_, name, argsStr) => {
      const args = parseArgs(argsStr);
      return renderPartial(name, {
        rootDir,
        siteData,
        locals: { ...locals, ...args },
      });
    }
  );

  // {{> name}}
  html = html.replace(/\{\{>\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, name) => {
    return renderPartial(name, { rootDir, siteData, locals });
  });

  // {{{md:path}}}
  html = html.replace(/\{\{\{md:([a-zA-Z0-9_./-]+)\}\}\}/g, (_, path) => {
    return loadMarkdown(rootDir, path, siteData).html;
  });

  // Locals (e.g. partial args) win over site-wide data.jsonc values
  const vars = { ...siteData, ...scalarLocals(locals) };
  return applyVars(html, vars);
}

/** Read a page template from layouts/pages/. */
export function loadPageLayout(rootDir, pagePath) {
  const filePath = resolve(rootDir, 'layouts', 'pages', pagePath);
  if (!existsSync(filePath)) {
    throw new Error(`Page layout not found: ${pagePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

/**
 * Load a partial, optionally pre-fill structured slots, then re-run renderTemplate
 * so nested {{> }} / {{key}} / {{{md:}}} still work inside it.
 */
function renderPartial(name, context) {
  const { rootDir, siteData, locals } = context;
  const filePath = resolve(rootDir, 'layouts', 'partials', `${name}.html`);
  if (!existsSync(filePath)) {
    throw new Error(`Partial not found: ${name}`);
  }

  let template = readFileSync(filePath, 'utf8');

  if (name === 'project-blurb') {
    template = fillProjectBlurb(template, context);
  } else if (name === 'timeline') {
    template = fillTimeline(template, context);
  }

  return renderTemplate(template, { rootDir, siteData, locals });
}

/** Only flat string/number/boolean locals become {{key}} vars. */
function scalarLocals(locals) {
  const result = {};
  for (const [key, value] of Object.entries(locals)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      result[key] = value;
    }
  }
  return result;
}

/** Parse "key=value key=value" into an object. */
function parseArgs(argsStr) {
  const args = {};
  for (const match of argsStr.matchAll(/([a-zA-Z0-9_]+)=([^\s}]+)/g)) {
    args[match[1]] = match[2];
  }
  return args;
}

/**
 * Fill project-blurb slots from content/projects/<id>/blurb.md frontmatter.
 * Body → {{{body}}}, links → {{{links}}}, image → {{{image}}}, title → {{title}}.
 */
function fillProjectBlurb(template, { rootDir, siteData, locals }) {
  const id = locals.id;
  if (!id) throw new Error('project-blurb partial requires id=...');

  // Content folder uses a hyphen; the partial id is camelCase
  const folder = id === 'thisWebsite' ? 'this-website' : id;
  const { data, html } = loadMarkdown(rootDir, `projects/${folder}/blurb`, siteData);

  const linksHtml = (data.links || [])
    .map(
      (link) =>
        `<a href="${escapeHtml(link.url)}" class="button">${escapeHtml(link.label)}</a>`
    )
    .join('\n    ');

  const imageHtml = data.image
    ? `<img src="${escapeHtml(data.image)}" alt="${escapeHtml(data.imageAlt || '')}">`
    : '';

  return template
    .replace(/\{\{\{body\}\}\}/g, html)
    .replace(/\{\{\{links\}\}\}/g, linksHtml)
    .replace(/\{\{\{image\}\}\}/g, imageHtml)
    .replace(/\{\{title\}\}/g, escapeHtml(data.title || ''));
}

/**
 * Fill timeline slots from content/about/timeline.md.
 * Markdown body is the heading; frontmatter items become dated <li>s.
 */
function fillTimeline(template, { rootDir, siteData }) {
  const { data, html } = loadMarkdown(rootDir, 'about/timeline', siteData);

  // data-date is read later by the client script for visual spacing
  const itemsHtml = (data.items || [])
    .map(
      (item) =>
        `<li data-date="${escapeHtml(item.date)}">${escapeHtml(item.text)}</li>`
    )
    .join('\n    ');

  return template
    .replace(/\{\{\{heading\}\}\}/g, html)
    .replace(/\{\{\{items\}\}\}/g, itemsHtml);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
