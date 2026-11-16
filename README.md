# Garden Community Fellowship

Phase 1 church website built with React, TypeScript, and Vite. Six responsive pages, accessible navigation, local structured content, and static hosting. No API keys, database, or paid services.

## Develop

Use Node.js 22.12+ or 24 LTS and npm.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Open the address Vite reports. Run `npm run lint` and `npm run build` before submitting changes. Run browser tests with `npx playwright install chromium` followed by `npm test`. To use an installed Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Tests cover all routes, WCAG A/AA automated scans, mobile navigation, expandable ministry details, responsive overflow, and published gathering/link accuracy. `npm run preview -- --host 0.0.0.0` serves the production build locally.

## Content and assets

Edit `src/content.ts` for ministry records, recurring gatherings, channel URLs, and email. Stable IDs keep the content separate from page components so a future admin system can supply the same records. Page layout lives in `src/App.tsx`; styles in `src/index.css` and `src/App.css`.

The oak illustration, ministry illustrations, and favicon are original SVG/CSS placeholders for the approved oak-tree branding direction, not final approved brand assets. No fabricated leadership, mission, beliefs, address, or service times are published. Obtain approved logo files, photography, mission and belief statements, leadership details, address, service and broadcast schedules, and confirmed dated events before replacing placeholders. Current events are recurring Monday gatherings only. Event artwork uses the recurring calendar treatment pending photographs.

DM Sans and Libre Caslon Display are self-hosted through Fontsource packages with system font fallbacks. Font licenses are included in the installed packages; fonts do not request third-party services.

## Deploy for free

```sh
npm ci
npm run build
```

Deploy the `dist` directory to a static host such as Netlify or Cloudflare Pages. Build command: `npm run build`; output: `dist`; Node: 24. The included `public/_redirects` provides the SPA fallback supported by those hosts. For other hosts, rewrite non-file paths to `/index.html` so direct links to `/about`, `/ministries`, `/events`, `/watch`, and `/contact` work. GitHub Pages needs an equivalent SPA fallback and a Vite `base` matching the repository path; it is not configured by default.

No secrets or server runtime are required. Contact opens the visitor’s email app. Watch links open the official channels; there are no embedded trackers or claims that a stream is currently live. Add the final domain’s canonical URL, social preview artwork, and sitemap after the hosting URL is approved. Authentication, admin tools, and a production database are intentionally deferred.
