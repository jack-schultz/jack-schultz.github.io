import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
import { fetchJsonc } from '/scripts/stripJsonC.js';

marked.setOptions({ gfm: true });

// Load a markdown file, apply templating from data.jsonc, and render to HTML
export async function loadAndRenderHTML(path) {
    const res = await fetch(path);
    let md = await res.text();

    let data = {};
    try {
        data = await fetchJsonc('/data.jsonc');
    } catch (e) {
        console.error("JSONC load failed:", e);
        return marked.parse(md);
    }

    md = md.replace(/{{(.*?)}}/g, (_, key) => {
        key = key.trim();
        return data[key] ?? _;
    });

    return marked.parse(md);
}
