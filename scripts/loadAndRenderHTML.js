import { fetchJsonc } from '/scripts/stripJsonC.js';

// Load an HTML file and apply basic templating using values from data.jsonc
export async function loadAndRenderHTML(path) {
    const res = await fetch(path);
    let html = await res.text();

    let data = {};
    try {
        data = await fetchJsonc('/data.jsonc');
    } catch (e) {
        console.error("JSONC load failed:", e);
        return html;
    }

    html = html.replace(/{{(.*?)}}/g, (_, key) => {
        key = key.trim();
        return data[key] ?? _;
    });

    return html;
}
