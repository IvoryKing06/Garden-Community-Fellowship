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

Edit `src/data/site.json`; `src/content-model.ts` defines the future CMS contract. Empty collections and null values render honest pending states. No invented address, Sunday service time, staff, beliefs, donation URL, or Bible study schedule is published. Existing Monday gatherings are preserved. Only user-supplied YouTube, Twitch, and email destinations are marked verified. Individual sermon recordings await verified URLs.

The approved artwork reference is the wide oak-tree/cross/sunrise/mountain banner supplied by the church. The actual attached file was not available in the workspace, so `branding.banner` is null pending import. No generated replacement logo is used. The banner component preserves the complete image and lettering at every viewport. See [the branding handoff](docs/phase-2-plan.md#approved-banner) for import instructions. Fonts are self-hosted through Fontsource. No livestream players are embedded.

## Deployment and Phase 2

Netlify is the chosen static deployment target: build `npm run build`, publish `dist`, Node 24. `netlify.toml` supplies routing, a legacy Contact redirect, and security/cache headers. Existing files serve prerendered page HTML; the SPA fallback supports client navigation. No server runtime, secret, API key, or paid subscription is needed for Phase 1. Route content and metadata are prerendered at build time; React hydrates it for navigation. Verify real deployed URLs and refresh behavior before launch. GitHub Pages is not configured.

Read [the Phase 2 handoff](docs/phase-2-plan.md) before implementing administrator editing or form delivery. It recommends maintained Decap CMS, documents GitHub OAuth and access requirements for 1–2 administrators, defines content collections, and explains free-tier hosting/form limits that must be checked before activation. Online signups are deferred; volunteer and contact links currently open email. No prayer-request forms are included.

Do not merge or deploy automatically. Add canonical URLs, sitemap, and social image URLs when the final public domain is approved. Free hosting has usage limits; confirm current account terms and do not enable paid upgrades without approval.
