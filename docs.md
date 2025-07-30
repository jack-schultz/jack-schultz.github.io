Reusable content is stored in components.
Layout of each page is stored in pages.

HTML files in pages have content injected from components.

Therefore, Unique content is in pages, reusable content is in components.

To Test:
all urls are root-relative URLs, meaning for testing a webserver is required.
Use `python -m http.server 8000` to start a webserver.
Then navigate to http://localhost:8000/
