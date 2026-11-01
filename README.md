# AN NHIÊN — The House of Stillness

Experimental private digital sanctuary. This repository starter loads the **G1 REV C architectural concept GLB** in an orbitable Three.js canvas. It is **not** an engineered structure or construction model.

## Run

```bash
npm install
npm run dev
npm run build
```

## Current implementation

- React + TypeScript + Vite, React Three Fiber + Drei.
- G1 REV C GLB loaded from `public/models/`.
- Orbit controls, 3 initial camera locations and 3 lighting moods (visual concepts, not approved final camera presets).
- Responsive Vietnamese interface.

## Not implemented / out of scope for this starter

Approved MVP features still pending: seven final camera presets, three fully realized weather/time environments, nature audio, breathing, mood check-in, encrypted local journal and offline PWA. No user authentication, backend or analytics.

## Design Lock / QA

- Keep 8×6m clear room, 8.4×6.4m footprint, 12° gable, 900mm eaves, 5 frame axes, +3.4m edge ceiling, +4.08m ridge, 6.4×3m glazing and +0/-0.45m floor/water levels.
- Steel and gutter remain **concept envelopes/proxies**. Structural connections, gutter slopes, waterproofing and mesh collisions are not verified.
- See `docs/D01_D04_TECHNICAL_REVIEW.md` for open risks.

## GitHub Pages

After creating a repository named `an-nhien`, enable Pages via GitHub Actions or deploy the `dist/` output. `GITHUB_PAGES=true npm run build` sets the `/an-nhien/` base path. This template does not claim deployment or GitHub publication.
