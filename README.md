# Giftson Jonathan — Portfolio

**Geospatial Engineer & Builder.** Building at the intersection of GIS, technology and the real world.

A personal portfolio designed as a digital Earth: an interactive globe in the hero, project markers you can explore, and a build log of everything I make. It is a static site with no build step, so it deploys to GitHub Pages as-is.

> **Live site:** https://https://giftsonjonathan.github.io/portfolio/

---

## Features

- **Interactive globe.** Drag to rotate, scroll to zoom, select a project marker to open a summary card. Drawn on a 2D canvas (orthographic projection), so it needs no WebGL and no 3D library.
- **Selected work.** A featured project grid with image, description, technologies, GitHub and live demo links.
- **Everything I build.** The full project archive with filters: `ALL`, `GIS`, `WEB`, `SOFTWARE`, `DATA`, `AI`, `EXPERIMENTS`.
- **Project pages.** Each project opens a lightweight detail view (problem, approach, features, outcome, related projects) at a hash URL such as `#/p/project-one`.
- **Capabilities, Experience, Education, Achievements, About, Resume, Contact.** All driven by one data file.
- **Accessible and fast.** Semantic HTML, skip link, visible focus states, keyboard-operable globe, `prefers-reduced-motion` support, lazy-loaded images, and a render loop that pauses when the globe is offscreen.

## Tech stack

| Layer | Choice |
| --- | --- |
| Markup / styling | HTML5, CSS (custom properties, grid) |
| Logic | Vanilla JavaScript, no framework |
| Globe | Canvas 2D, orthographic projection |
| Fonts | Schibsted Grotesk and IBM Plex Mono via Google Fonts, with system fallbacks |
| Hosting | GitHub Pages (static) |

There are no runtime dependencies and no `node_modules`.

## Project structure

```text
giftson-portfolio/
├── index.html        # Page structure, SEO metadata, About text
├── styles.css        # Design tokens and all styles
├── main.js           # Rendering, filters, project routing, globe
├── data/
│   ├── site.js       # All content: links, projects, experience, etc.
│   └── land.json     # (optional) world land GeoJSON for coastlines
├── assets/           # Project images and screenshots
├── resume/           # Your resume PDF
├── .nojekyll         # Tells GitHub Pages to skip Jekyll processing
└── README.md
```

## Run locally

No install needed. From the project folder, start any static server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works, but the optional `data/land.json` coastlines only load over `http://`.

## Customize

Almost everything is edited in **`data/site.js`**. Anything marked `[PLACEHOLDER]` is not real content and should be replaced.

### Add a project

Add an entry to `PROJECTS`:

```js
{
  slug: "my-project",            // unique, used in the URL (#/p/my-project)
  title: "My Project",
  category: "GIS",               // GIS | WEB | SOFTWARE | DATA | AI | EXPERIMENTS
  year: "2026",
  featured: true,                // true = shown in "Selected work"
  loc: [13.08, 80.27],           // [lat, lon] puts a marker on the globe (optional)
  description: "One or two sentences about what it does.",
  technologies: ["JavaScript", "Leaflet"],
  image: "assets/my-project.jpg",
  github: "https://github.com/...",
  demo: "https://...",
  problem: "...",                // used on the project page
  approach: "...",
  features: ["...", "..."],
  outcome: "..."
}
```

Leave `github`, `demo` or `image` empty and the matching link or image is simply hidden.

### Other content

| What | Where |
| --- | --- |
| Email, GitHub, LinkedIn | `email`, `github`, `linkedin` in `data/site.js` (empty values are hidden) |
| Hero coordinates | `coords` in `data/site.js` (delete to hide) |
| Capabilities | `capabilities` in `data/site.js` (list only what you actually use) |
| Experience, education, achievements | `experience`, `education`, `achievements` in `data/site.js` |
| Resume | Put the PDF at `resume/Giftson-Jonathan-Resume.pdf`, or change `resume` in `data/site.js` |
| About text, hero copy | `index.html` |
| Page title, description, Open Graph | `<head>` in `index.html` |
| Colors and type | CSS variables at the top of `styles.css` |

### Project images

Save images in `assets/` and reference them as `image: "assets/name.jpg"`. Use compressed JPG or WebP at roughly 1200 px wide.

### Globe coastlines (optional)

The globe shows a grid and project markers by default. To draw landmasses, save a world land GeoJSON (for example Natural Earth 110m land) as `data/land.json`. It is picked up automatically and skipped silently if missing.

### Social preview image

Add an image (for example `assets/og.png`, 1200×630) and add this to the `<head>` of `index.html`:

```html
<meta property="og:image" content="https://<your-username>.github.io/<repo-name>/assets/og.png">
```

## Deploy to GitHub Pages

1. Create a repository and push these files to the `main` branch (at the repo root).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, then choose `main` and `/ (root)`.
4. Wait a minute, then open `https://<your-username>.github.io/<repo-name>/`.

All asset paths are relative and project pages use hash routes, so no 404 redirect workaround is needed. For a custom domain, add a `CNAME` file at the root and follow GitHub's custom domain steps.

## Accessibility

- Skip link, semantic landmarks and heading order
- Keyboard navigation throughout; the globe is focusable (arrow keys rotate, `+` and `-` zoom)
- Visible focus indicators
- Alt text on project images
- Animations and the globe auto-rotation are disabled under `prefers-reduced-motion`

## Performance notes

- No framework or third-party scripts
- The globe initializes when the browser is idle and stops rendering when scrolled out of view or when the tab is hidden
- Device pixel ratio is capped at 2 for canvas rendering
- Images use `loading="lazy"`

## Roadmap

- [ ] Replace all `[PLACEHOLDER]` content with real projects and details
- [ ] Add coastline data (`data/land.json`)
- [ ] Add project screenshots and an Open Graph image
- [ ] Add scroll-reveal transitions
- [ ] Optional: map-based project views per project

## Contact

- Email: giftsonjonathan29@gmail.com
- GitHub: https://github.com/GiftsonJonathan
- LinkedIn: https://www.linkedin.com/in/giftson-jonathan-70b94629b/

## License

MIT License
