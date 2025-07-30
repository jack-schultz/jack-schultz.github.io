import { fetchJsonc } from './stripJsonC.js';

export async function loadAndRenderHTML(path) {
    const res = await fetch(path);
    let html = await res.text();

    const data = await fetchJsonc('/data.jsonc');

    // Basic templating: replace {{key}} with data[key]
    html = html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] ?? '');

    return html;
}
