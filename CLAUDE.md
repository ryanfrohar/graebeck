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

1. Copy **all** site assets to `/tmp/graebeck-site` (avoids macOS sandbox permission errors in worktrees). Each directory must be copied explicitly — glob patterns silently skip subdirectories:
```bash
mkdir -p /tmp/graebeck-site/.claude
cp /Users/ryanfrohar/Documents/git/graebeck/*.html /tmp/graebeck-site/
cp -r /Users/ryanfrohar/Documents/git/graebeck/css   /tmp/graebeck-site/css
cp -r /Users/ryanfrohar/Documents/git/graebeck/js    /tmp/graebeck-site/js
cp -r /Users/ryanfrohar/Documents/git/graebeck/images /tmp/graebeck-site/images
cp -r /Users/ryanfrohar/Documents/git/graebeck/projects /tmp/graebeck-site/projects
```

2. `.claude/launch.json` is already committed in the repo — no need to recreate it. Use `preview_start` with name `"graebeck"`.

3. After every HTML/CSS/JS edit, re-sync before taking screenshots:
```bash
cp /Users/ryanfrohar/Documents/git/graebeck/*.html /tmp/graebeck-site/
cp -r /Users/ryanfrohar/Documents/git/graebeck/css    /tmp/graebeck-site/css
cp -r /Users/ryanfrohar/Documents/git/graebeck/js     /tmp/graebeck-site/js
cp -r /Users/ryanfrohar/Documents/git/graebeck/images /tmp/graebeck-site/images
cp -r /Users/ryanfrohar/Documents/git/graebeck/projects /tmp/graebeck-site/projects
```

4. Call `preview_resize` with `preset: "desktop"` before screenshotting — the panel defaults to ~787px (tablet) and won't show the full desktop layout.

5. Navigate to the target page with `preview_eval`: `location.assign('http://localhost:4200/services.html')`

6. Call `location.reload()` via `preview_eval` after syncing files so the browser picks up changes.

**Important:** `css/custom.css` must be present or the site renders unstyled. Always verify it copied with `ls /tmp/graebeck-site/css/` before screenshotting.

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
