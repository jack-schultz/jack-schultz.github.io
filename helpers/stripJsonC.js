export async function fetchJsonc(path) {
    const response = await fetch(path);
    const rawText = await response.text();
    const cleanText = stripJsonComments(rawText);
    return JSON.parse(cleanText);
}

function stripJsonComments(jsonc) {
    return jsonc
        .replace(/\/\*[\s\S]*?\*\//g, '')     // remove /* multi-line comments */
        .replace(/\/\/.*(?=[\n\r])/g, '');    // remove // single-line comments
}
