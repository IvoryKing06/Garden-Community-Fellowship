# Garden Community Fellowship

Phase 1 website: React, TypeScript, Vite, and free-static-host-compatible output. Pages: Home, About Us, Plan Your Visit, Events & Outreach, Ministries & Bible Studies, Sermons, Get Involved, and Connect. Watch Live remains available, and the old Contact URL is preserved. Navigation groups About and Community pages to keep the header clear.

## Development and verification

Use Node 24 LTS and npm:

```sh
npm ci
npm run dev -- --host 0.0.0.0
npm run lint
npm run build
npx playwright install chromium
npm test
```

Tests run against the production preview, so build first. If Chromium is installed, run `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`. Tests cover route accessibility, mobile menus, ministry expanders, responsive overflow, supplied information, pending destinations, external-only media, and HTML without JavaScript. `npm run preview -- --host 0.0.0.0` serves the build manually. CI performs the same checks.

## Content and branding

Edit `src/data/site.json`; `src/content-model.ts` defines the future CMS contract. Empty collections and null values render honest pending states. The official Sunday and weekly/monthly schedule is integrated from the pastor’s schedule. Step Study recurrence, the separate communion/potluck time, and café details remain explicitly unconfirmed. What We Believe on `/about#what-we-believe` contains all nine Statement of Faith paragraphs and 19 expandable Articles of Faith, retaining the pastor’s wording and Scripture references. Leadership details remain deferred. All public inquiry links use gcf.online.studios@gmail.com; the verified donation, Discord, YouTube, and Twitch URLs are preserved. Facebook and unapproved ministry nicknames are excluded.

The approved `gcf-banner.webp` is imported at `public/uploads/gcf-banner.webp` (2172 × 724, 263,564 bytes). The component displays the full composition and lettering without cropping on all viewports. The original remains at the repository root. Fonts are self-hosted through Fontsource. No livestream players are embedded.

## Deployment and Phase 2

Netlify is the chosen static deployment target: build `npm run build`, publish `dist`, Node 24. `netlify.toml` supplies routing, a legacy Contact redirect, and security/cache headers. Existing files serve prerendered page HTML; the SPA fallback supports client navigation. No server runtime, secret, API key, or paid subscription is needed for Phase 1. Route content and metadata are prerendered at build time; React hydrates it for navigation. Verify real deployed URLs and refresh behavior before launch. GitHub Pages is not configured.

Read [the Phase 2 handoff](docs/phase-2-plan.md) before implementing administrator editing or form delivery. It recommends maintained Decap CMS, documents GitHub OAuth and access requirements for 1–2 administrators, defines content collections, and explains free-tier hosting/form limits that must be checked before activation. Online signups are deferred; volunteer and contact links currently open email. No prayer-request forms are included.

Do not merge or deploy automatically. Add canonical URLs, sitemap, and social image URLs when the final public domain is approved. Free hosting has usage limits; confirm current account terms and do not enable paid upgrades without approval.
