import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Cloudflare Workers / Pages inject CF_PAGES_COMMIT_SHA for cache-busting. */
const buildSha =
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 12) ||
  process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 12) ||
  ''

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha),
  },
})
