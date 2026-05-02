---
name: graebeck-preview
description: >
  Preview the Graebeck Construction site in the browser and take a screenshot.
  Use this skill whenever the user wants to see the site, check a page, take a
  screenshot, verify a change visually, or says anything like "show me",
  "preview", "how does it look", "screenshot", or "render". Also use it
  proactively after making HTML/CSS/JS changes to verify the result.
---

# Graebeck Preview Workflow

## Setup

First, ensure `/tmp/serve.py` exists. If it doesn't, create it:

```python
import os, http.server, socketserver
os.chdir('/tmp/graebeck-site')
port = int(os.environ.get('PORT', 4200))
with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
    httpd.serve_forever()
```

## Sync files

Copy site files to `/tmp/graebeck-site/`. Always copy `custom.css` explicitly
with a direct file path — using `cp -r css/` can silently serve a stale version:

```bash
mkdir -p /tmp/graebeck-site/css /tmp/graebeck-site/js /tmp/graebeck-site/images /tmp/graebeck-site/projects
cp /Users/ryanfrohar/Documents/git/graebeck/*.html /tmp/graebeck-site/
cp /Users/ryanfrohar/Documents/git/graebeck/css/custom.css /tmp/graebeck-site/css/custom.css
cp -r /Users/ryanfrohar/Documents/git/graebeck/js /tmp/graebeck-site/
cp -r /Users/ryanfrohar/Documents/git/graebeck/images /tmp/graebeck-site/
cp -r /Users/ryanfrohar/Documents/git/graebeck/projects /tmp/graebeck-site/
```

## Start server

Call `preview_start` with name `"graebeck"`. The `.claude/launch.json` points to
`/tmp/serve.py` and is already committed — no changes needed. Save the `serverId`
from the response.

## Navigate and resize

1. Call `preview_eval` with `location.assign('http://localhost:4200/<page>')`.
   Default page is `index.html`. For project detail pages use e.g.
   `projects/project-parliament.html`.

2. Call `preview_resize` with the appropriate preset:
   - Default to `"mobile"` (375×812) since that's where the hamburger/overlay lives
   - Use `"desktop"` (1280×800) if the user wants to see the full desktop layout

## Screenshot

Call `preview_screenshot`. Show the result to the user.

## After edits

When the user makes a change, re-sync only the changed files, then call
`preview_eval` with `location.reload()` before screenshotting again.
