# Editing, forms, branding, and hosting handoff

Phase 1 uses static content only. No admin route, authentication endpoint, submission endpoint, payment integration, or prayer-request form is enabled.

## Maintained CMS recommendation

Use Decap CMS with its GitHub backend and an editorial review workflow. Its editor should manage `src/data/site.json` and upload assets under `public/uploads`. Editors work in a maintained CMS interface; they do not edit TypeScript. Plan for exactly 1–2 designated church administrators with individual GitHub accounts, MFA, least-privilege repository access, protected publishing branch, and reviewed publishing rights. Never use a shared administrator password. Repository authorization, not hiding an `/admin` URL, must enforce access. Revoke both repository membership and OAuth sessions when an administrator leaves.

Decap itself is open source; GitHub authentication requires a securely hosted OAuth broker or a supported identity integration. A static host alone cannot hold OAuth secrets. Phase 2 must confirm an actively supported backend, callback domain, allowed repository/users, CSRF/state protection, token handling, and free-tier availability before enabling editing. Do not assume legacy Netlify Identity/Git Gateway services are available. Keep credentials server-side. Avoid purchasing CMS seats or hosting without approval.

`src/content-model.ts` is the typed content contract. The CMS collection should expose these fields (stable IDs are required):

| Collection/setting                  | Editor fields                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Announcements                       | ID, title, body, optional expiry                                                               |
| Events/gatherings                   | ID, title, description, category, recurring day/time, optional confirmed date, location, image |
| Ministries                          | ID, name, category, description, schedule, image; preserve IDs used by links                   |
| Bible studies/outreach/volunteering | ID, title, description, confirmed schedule                                                     |
| Sermons                             | ID, title, recording date, verified HTTPS YouTube recording URL, optional image                |
| Visit/schedules                     | Confirmed address, Sunday service time, accessibility details                                  |
| Connections                         | Name, verified URL or null, verified/pending status                                            |
| Branding/images                     | Source path, descriptive alt text, intrinsic width and height                                  |

Null values and empty collections remain explicit pending states. A YouTube channel is not presented as an individual sermon. The public renderer accepts only supported HTTPS YouTube recording URLs for sermon entries. CMS validation and trusted publish-time validation should enforce URL allowlists, dates, required alt text, and image size limits before publication. Add image resize/compression on upload and preview drafts before publishing.

## Approved banner

The approved oak/cross/sunrise/mountain banner has been imported from the existing root `gcf-banner.webp` into `public/uploads/gcf-banner.webp`. Verified dimensions are **2172 × 724**, and size is **263,564 bytes** (under 300 KB). `branding.banner` now points to this asset with descriptive alt text and the verified dimensions. The renderer preserves intrinsic proportions, full width, automatic height, and contain sizing on mobile and desktop. Do not crop away lettering or substitute generated art. The header retains the plain text wordmark.


## Forms in Phase 2

Volunteer interest and general contact requests should eventually deliver to gcf.online.studios@gmail.com through a maintained secure form provider. Evaluate Netlify Forms on the chosen Netlify plan first, or a free-tier-compatible third-party service if needed. Verify current submission/notification quotas, retention, spam filtering, recipient verification, and plan eligibility from the provider before implementation. Email notification behavior must be tested with the church; a successful browser POST alone is insufficient evidence of delivery.

Use HTTPS, server-side validation, length limits, a honeypot/rate controls, accessible error/success states, consent and retention text, and minimal fields (name, reply email, request type, message or volunteer interest). Do not allow attachments initially. No online prayer-request forms. Keep service secrets out of the browser. Until setup is verified, use the working mailto links and clearly identify that online signups are unavailable.

## Free hosting and limits

Netlify is the selected deployment target, configured in `netlify.toml`. This repository does not create an account, deploy a site, enroll a paid plan, or enable forms. Netlify's free plans have account-dependent usage/credit limits for builds, bandwidth, requests, and form features; confirm current limits and whether reaching a cap pauses the site before launch. Do not enable automatic paid upgrades. Media stays external on YouTube/Twitch; site images and fonts are local. A purchased custom domain is optional. No payment is necessary for local development or the static build.

Build output includes prerendered HTML, route titles/descriptions, and Open Graph basics for every page. Netlify serves existing route files before the SPA fallback. After deploying to a free Netlify subdomain, verify direct navigation and refresh on all routes, HTTPS, asset responses, and legacy `/contact` redirection. A local Vite preview does not establish deployed-host behavior. Add canonical URLs, sitemap, social image URL, and robots policy once the real production domain is known; never invent a domain. Do not deploy or merge automatically.
