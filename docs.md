# Documentation

## Layout vs Content

- **Layouts** (`layouts/`) define page structure, chrome, and where content is placed.
- **Content** (`content/`) holds reusable Markdown section fragments (prose only; use YAML frontmatter for structured fields like project blurbs and the timeline).
- **Build** (`npm run build`) renders Markdown into layouts and writes finished HTML to `dist/`.

Non-developers should edit files under `content/` and values in `data.jsonc`. Developers change structure under `layouts/`.

## Template syntax

| Syntax | Meaning |
|--------|---------|
| `{{key}}` | Value from `data.jsonc` |
| `{{{md:path}}}` | Render `content/<path>.md` as HTML |
| `{{> name}}` | Include `layouts/partials/<name>.html` |
| `{{{partial:name id=...}}}` | Include a partial with arguments (e.g. project blurbs) |

## Global values

`data.jsonc` holds key/value pairs. Any `{{key}}` in content or layouts is replaced at build time.

## Build and preview

```bash
npm install
npm run build          # output → dist/
npm run dev            # watch + serve dist/ at http://localhost:8000/
```

GitHub Pages is deployed from `dist/` to the `gh-pages` branch via `.github/workflows/deploy.yml`.

## Project blurbs

Blurb Markdown files use frontmatter for title, image, and links; the body is plain Markdown. Example: `content/projects/discordBot/blurb.md`.
