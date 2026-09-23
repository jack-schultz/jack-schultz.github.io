# jack-schultz.github.io

Personal portfolio site. Static HTML, built from Markdown content + HTML layouts, deployed to GitHub Pages.

To make changes, edit source files, run `npm run build` which renders `.md` files in `content/` as HTML and injects them into the HMTL files in `layout/` under and writes them to `dist/`. 

---

## Quick start

```bash
npm install
npm run build    # writes to dist/
npm run dev      # build + serve at http://localhost:8000/
```

Requires Node.js (CI uses 22).

---

## How the site is put together

Rough split of responsibility:

| Folder            | Role                                                             |
|-------------------|------------------------------------------------------------------|
| `content/`        | Writing, markdown sections, project blurbs, about copy           |
| `layouts/`        | Page structure, HTML shells and reusable partials                |
| `data.jsonc`      | Shared values (URLs, counts, short facts) injected as `{{keys}}` |
| `styles/`         | SCSS compiles to one CSS file at build time                      |
| `scripts/build/`  | Node build tooling                                               |
| `scripts/client/` | Browser JS (carousel, timeline spacing)                          |
| `assets/`         | Images and other static assets                                   |
| `dist/`           | Build output (don't edit by hand; gitignored)                    |

**Seperation of content and layout:** 
- Change wording/stats → `content/` or `data.jsonc`.
- Change page structure → `layouts/`.
- Change look → `styles/`.

---

## Editing content

Markdown lives under `content/`. Paths map to template tags without the `.md` suffix:

- `content/about/aboutMe.md` → `{{{md:about/aboutMe}}}`
- `content/lists/skills.md` → `{{{md:lists/skills}}}`

Most files are plain Markdown. Some have a YAML frontmatter block at the top (between `---` lines) for structured fields the build needs, titles, images, link lists, timeline entries, etc. The prose under the closing `---` becomes the HTML body.

### Project blurbs

Each project has a `blurb.md` used on listing pages, e.g. `content/projects/discordBot/blurb.md`. Frontmatter includes `title`, `image`, `imageAlt`, and `links`. The body is the short description.

Layouts pull those in with:

```html
{{{partial:project-blurb id=discordBot}}}
```

### Timeline

`content/about/timeline.md` has an `items` list in frontmatter (`date` + `text`). A client script spaces those items based on how far apart the dates are.

### Global values (`data.jsonc`)

JSON with comments allowed. Anything like `{{discordBotUserCount}}` in Markdown or layouts gets replaced at build time. Handy for numbers and URLs that show up in more than one place.

Unknown `{{keys}}` are left alone so typos are easy to spot in the built HTML.

---

## Layouts and templates

- `layouts/pages/` - one HTML file per site page. Output path in `dist/` mirrors this tree (`about.html`, `projects/tetris.html`, …).
- `layouts/partials/` - reusable chunks (`header`, `footer`, `head`, `project-blurb`, `timeline`, …).

### Template tags

| Tag | Meaning |
|-----|---------|
| `{{key}}` | Value from `data.jsonc` (or a partial argument) |
| `{{{md:path}}}` | Render `content/<path>.md` as HTML |
| `{{> name}}` | Include `layouts/partials/<name>.html` |
| `{{{partial:name key=value}}}` | Same, but pass arguments (used for project blurbs) |

Partials can nest other tags. A couple of special partials (`project-blurb`, `timeline`) fill extra slots from Markdown frontmatter before the normal template pass runs.

---

## Styles

SCSS entry point is `styles/main.scss`. It imports base variables/mixins, components, and layout partials. The build compiles that to `dist/styles/main.css`.

Pages link the compiled CSS, not the SCSS sources.

---

## Scripts

### Build (`scripts/build/`)

| File | What it does |
|------|----------------|
| `build.js` | Clears `dist/`, renders all pages, compiles SCSS, copies client scripts / media / CNAME |
| `dev.js` | Runs a build, serves `dist/` locally, watches sources and rebuilds |
| `loadData.js` | Reads `data.jsonc`, applies `{{key}}` substitution |
| `renderMarkdown.js` | Parses Markdown + frontmatter (`gray-matter` + `marked`) |
| `renderLayout.js` | Expands layout template tags and special partials |

### Browser (`scripts/client/`)

Copied into `dist/scripts/` as-is:

| File | What it does |
|------|----------------|
| `scrollWrapper.js` | Horizontal project carousel — arrow buttons + `active` section highlight |
| `applyTimelineSpacing.js` | Spaces timeline list items by date gaps |

---

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`:

1. `npm ci` + `npm run build`
2. Publishes `dist/` to the `gh-pages` branch

GitHub Pages should be set to serve from `gh-pages`. There's a `CNAME` file for the custom domain; the build copies it into `dist/` when present.

You can also trigger the workflow manually from the Actions tab.

---

## Adding a new project

1. Add Markdown under `content/projects/<folder>/` (at least a `blurb.md`).
2. Add a page under `layouts/pages/projects/`.
3. Wire the blurb into listing pages with `{{{partial:project-blurb id=...}}}`.
4. Add any URLs / shared strings to `data.jsonc`.
5. Drop images in `media/` (or wherever your layouts already point) and reference them from the blurb frontmatter.
6. `npm run build` (or leave `npm run dev` running) and check the new page.

---

## Dependencies (why they're there)

- **marked** for Markdown → HTML
- **gray-matter** for YAML frontmatter parsing
- **sass** for SCSS compile
- **chokidar** for file watching in `npm run dev`
