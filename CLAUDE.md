# Graebeck Construction — Claude Code Guidelines

## Project Overview

Static website for Graebeck Construction Ltd. Built with vanilla HTML5, Tailwind CSS (CDN), and vanilla JavaScript. No build system — serve directly from the file system.

## Stack

- **HTML5** — all pages in root and `projects/`
- **Tailwind CSS** — loaded via CDN, configured inline in each HTML file
- **Vanilla JavaScript** — `js/main.js`
- **Custom CSS** — `css/custom.css`

## Linting

```bash
npm install          # install dev deps (eslint, htmlhint)
npm run lint:js      # ESLint on js/
npm run lint:html    # HTMLHint on all *.html files
```

---

## Deployment Workflow

**Always work on a feature branch and open a PR into `staging` — never push directly to `staging` or `main`.**

1. Create a feature branch from `staging` (e.g. `feature/description`)
2. Make changes on the feature branch
3. Open a PR from the feature branch into `staging`
4. Staging deploys automatically for review — share with client or review yourself
5. Once approved, merge `staging` into `main` for production

### Branch structure

- `main` — production (live site)
- `staging` — staging/preview environment (review before going live)
- `feature/*` — short-lived branches for individual changes, always PR'd into `staging`

Never push directly to `staging` or `main`.

## Keeping Staging in Sync with Main

After every `staging` → `main` merge, the `sync-staging.yml` workflow automatically force-pushes `main` to `staging`. You can also do it manually:

```bash
git push origin origin/main:refs/heads/staging
```

This prevents the "1 commit behind" drift on GitHub. Always run this after a production deploy.

---

## Local Preview Setup

This is a static site (no build step). To preview locally:

### One-time setup (per machine)

1. Create the server script at `/tmp/serve.py` — this is the only server approach that works around macOS sandbox restrictions:
```python
import os, http.server, socketserver
os.chdir('/tmp/graebeck-site')
port = int(os.environ.get('PORT', 4200))
with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
    httpd.serve_forever()
```

2. `.claude/launch.json` is committed in the repo and already points to `/tmp/serve.py` — no changes needed.

### Every session

3. Sync all site assets to `/tmp/graebeck-site`. Copy each directory explicitly — globs silently skip subdirectories:
```bash
mkdir -p /tmp/graebeck-site/.claude
cp /Users/ryanfrohar/Documents/git/graebeck/*.html /tmp/graebeck-site/
cp /Users/ryanfrohar/Documents/git/graebeck/css/custom.css /tmp/graebeck-site/css/custom.css
cp -r /Users/ryanfrohar/Documents/git/graebeck/js       /tmp/graebeck-site/js
cp -r /Users/ryanfrohar/Documents/git/graebeck/images   /tmp/graebeck-site/images
cp -r /Users/ryanfrohar/Documents/git/graebeck/projects /tmp/graebeck-site/projects
```

4. Call `preview_start` with name `"graebeck"`. The tool manages the process.

5. Navigate with `preview_eval`: `location.assign('http://localhost:4200/index.html')`

6. Call `preview_resize` with `preset: "mobile"` or `"desktop"` before screenshotting.

### After every edit

7. Re-sync the changed files (always copy `custom.css` explicitly — `cp -r css/` can silently serve a stale cached version):
```bash
cp /Users/ryanfrohar/Documents/git/graebeck/*.html /tmp/graebeck-site/
cp /Users/ryanfrohar/Documents/git/graebeck/css/custom.css /tmp/graebeck-site/css/custom.css
cp -r /Users/ryanfrohar/Documents/git/graebeck/js       /tmp/graebeck-site/js
cp -r /Users/ryanfrohar/Documents/git/graebeck/projects /tmp/graebeck-site/projects
```

8. Then `location.reload()` via `preview_eval` so the browser picks up changes.

**Important:** Never use `npx serve` — there is no Node.js on this machine. Always use the `/tmp/serve.py` approach above.

---

## GitHub Actions Workflows

| File | Trigger | Purpose |
|------|---------|---------|
| `.github/workflows/ci.yml` | Every push & PR | Runs ESLint + HTMLHint |
| `.github/workflows/restrict-main.yml` | PR into `main` | Fails if source branch is not `staging` |
| `.github/workflows/sync-staging.yml` | Push to `main` | Force-pushes `main` → `staging` |

### Notes

- `GITHUB_TOKEN` in `sync-staging.yml` is automatically available — no manual secret setup needed.
- To enforce the branch strategy beyond CI, enable branch protection rules in **Settings → Branches** for both `main` and `staging`: require CI checks to pass and disallow direct pushes.
