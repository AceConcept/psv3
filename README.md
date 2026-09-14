# portfolio-site-v3

Vite + React portfolio shell with waypoint-style rem document scaling.

## Artboard

- **1920 × 897** → `120 × 56.0625 rem` @ 16px
- Contain-fit via `src/lib/scale.ts` (same pattern as `waypoint-origin`)

## Included from personal-website v2

- Top **navbar** (logo / domain / tagline)
- Section **sidebar** (tab cards + icon stack)
- Project **cards** + paginated grid

## Run

```bash
npm install
npm run dev
```

Public media assets are Windows junctions into `personal-website -v2/public` (`home`, `sidebar-content`, `Gallery`, `Work`, `DevProjects`).
