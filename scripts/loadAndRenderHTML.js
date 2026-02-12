import { fetchJsonc } from '/scripts/stripJsonC.js';

// Load an HTML file and apply basic templating using values from data.jsonc
export async function loadAndRenderHTML(path) {
    // Fetch raw HTML from the given file path
    const res = await fetch(path);
    let html = await res.text();

    // Load dynamic data from JSONC file
    const data = await fetchJsonc('/data.jsonc');

    // Replace all {{key}} in HTML with corresponding data[key] value. Replaces with empty string if not found
    html = html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] ?? '');

    // Return final HTML with injected values
    return html;
}
