# Giftson Jonathan — Portfolio
Zero-build static site (HTML/CSS/vanilla JS). No dependencies except Google Fonts (with system fallbacks).

## Edit content
- `data/site.js` — email, links, capabilities, experience, education, achievements, **and all projects**.
  Anything marked `[PLACEHOLDER]` is not real; replace it. Add a project by copying one entry in `PROJECTS`.
  Give it `loc: [lat, lon]` to place it on the globe, `featured: true` to show it in Selected work.
- `resume/Giftson-Jonathan-Resume.pdf` — drop your PDF here (or change the path in `site.js`).
- `index.html` — About text, hero copy, meta tags (add an `og:image` once you have one).
- Project images: put files in `assets/` and set `image: "assets/name.jpg"` (use compressed ~1200px JPG/WebP).
- Coastlines on the globe (optional): save a world-land GeoJSON (e.g. Natural Earth 110m) as `data/land.json`.

## Deploy to GitHub Pages
1. Create a repo and push these files to `main` (repo root).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Visit `https://<user>.github.io/<repo>/`. All paths are relative and project pages use hash routes (`#/p/slug`), so no 404 workarounds needed.

## Notes
- The globe is a 2D-canvas orthographic projection: no WebGL, no 3D library, paused when offscreen. Keyboard: focus it, then arrows / `+` / `-`.
- Respects `prefers-reduced-motion`.
