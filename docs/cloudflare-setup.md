# Deploying a Vite site to Cloudflare Workers

This is how portfolio-site-v3 is deployed, written as a guide for setting up another Vite project the same way.

The site is deployed as **static assets on Cloudflare Workers**: Vite builds into `dist/`, and Cloudflare serves those files directly. There is no server code.

## 1. Install Wrangler

Wrangler is Cloudflare's command-line tool.

```bash
npm i -D wrangler
```

## 2. Add `wrangler.jsonc` at the project root

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-project",
  "compatibility_date": "2026-10-05",
  "build": {
    "command": "npm run build"
  },
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

- `name`: the Worker's name. Use a unique name for each project; it also becomes the `my-project.<account>.workers.dev` subdomain. Reusing a name overwrites that site.
- `compatibility_date`: set this to the date you create the project.
- `assets.directory`: Vite's output folder.
- `not_found_handling: "single-page-application"`: unknown URLs return `index.html`, so reloading a deep link doesn't 404. Leave it out if the site has no client-side routing.
- There is no `main` entry because there is no Worker script; this is a pure static deploy.

## 3. Add scripts to `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "preview:cf": "npm run build && wrangler dev",
  "deploy": "npm run build && wrangler deploy"
}
```

- `npm run preview:cf` serves the built site locally the same way Cloudflare will.
- `npm run deploy` builds and uploads it from your machine.

## 4. Add `public/_headers`

Vite copies everything in `public/` into `dist/`, and Cloudflare reads `_headers` to set response headers.

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

The `/assets/*` rule lets browsers cache Vite's built files for a year. That's safe because Vite gives those files a new hashed name every build. `index.html` isn't covered, so visitors pick up new deploys right away.

## 5. Pin the Node version

Create `.nvmrc` containing:

```
22
```

And in `package.json`:

```json
"engines": {
  "node": ">=20.17.0"
}
```

Cloudflare's build machines read `.nvmrc`, so the build uses the same Node version you use locally.

## 6. Connect it to Cloudflare

Pick one:

- **Deploy from your machine:** run `npx wrangler login` once, then `npm run deploy` whenever you want to publish.
- **Auto-deploy from GitHub on every push:** in the Cloudflare dashboard go to Workers & Pages → Create → import the repo. Set:
  - Build command: `npm run build`
  - Deploy command: `npx wrangler deploy`

  Cloudflare picks up everything else from `wrangler.jsonc`.

## Optional: expose the commit hash to the app

Cloudflare sets the commit hash as an environment variable during Git builds. `vite.config.ts` can pass it into the app as a constant:

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const buildSha =
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 12) ||
  process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 12) ||
  ''

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha),
  },
})
```

portfolio-site-v3 defines this but doesn't use it yet, so it can be skipped.

## Things to watch for

- **25 MiB per-file limit:** every file in `dist/` must be under 25 MiB or the deploy fails. Large videos are the usual culprit; compress them first (portfolio-site-v3 uses `_small.mp4` versions).
- **Unique `name`** in `wrangler.jsonc` for every project.
- **`compatibility_date`** set to the project's creation date.
