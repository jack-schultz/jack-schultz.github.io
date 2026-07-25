# Documentation
## Layout vs Content
- HTML files outside the content folder define page structure.
- Markdown files inside the content folder contain reusable text fragments with English content.
- During runtime, injectContent.js inserts content sections into their corresponding layout sections as defined by their IDs and paths.
- This separation was implemented to make layout changes without editing text content directly.

## Testing
To Test:
all urls are root-relative URLs, meaning for testing a webserver is required.
Use `python -m http.server 8000` to start a webserver.
Then navigate to http://localhost:8000/

## Content Injection
injectContent.js handles injecting content from markdown files into layout.
- It has a dictionary named sectionPaths, which maps element IDs to a path for its content.
- When executed this replaces each element's inner HTML with the rendered HTML from the pathed files.

## Global Injection
data.jsonc holds a key value list. Any key that is found within double parenthesis in content will be replaced with its value.
This logic is handled by loadAndRenderHTML.js after being parsed through stripJsonC.js. Markdown files are then parsed to HTML using marked (loaded via CDN).
