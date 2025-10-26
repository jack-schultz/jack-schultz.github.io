- HTML files in pages have content injected from content folder.
- Therefore, Unique layout is in pages, reusable written content is in content.
- This was done to make it easier to change the layout of a pages's HTML without having to mess with English text

To Test:
all urls are root-relative URLs, meaning for testing a webserver is required.
Use `python -m http.server 8000` to start a webserver.
Then navigate to http://localhost:8000/
