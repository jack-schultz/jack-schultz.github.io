export async function fetchJsonc(path) {
    const response = await fetch(path);
    const rawText = await response.text();
    const cleanText = stripJsonComments(rawText);
    return JSON.parse(cleanText);
}

function stripJsonComments(text) {
    // Remove block comments
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove line comments ONLY if not inside string
    text = text.replace(/(^|[^:\\])\/\/.*$/gm, '$1');

    return text
}