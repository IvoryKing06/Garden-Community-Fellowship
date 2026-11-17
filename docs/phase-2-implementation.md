# Phase 2A/B: content-management and Sanity editor rollout (draft PR)

This branch implements the owner-approved Sanity Studio editor and the latest ministry and team-page edits while preserving the approved beliefs and church contact details. **The Studio currently serves the previous five-section version; the six-section update, automatic rebuilds, and online forms are not live yet.** Keep the PR in draft until invited-account access, publishing behavior, and hosting are confirmed.

## Rollout checkpoint (November 17, 2026)

- Sanity project `gs8p6s6x` uses the public `production` dataset; the hosted editor is at `https://garden-community-fellowship.sanity.studio/`. After the singleton-registration fix was deployed, the media administrator verified that all five editing sections open.
- Five reviewed singleton seed documents were imported. The website pull script successfully verified all five published Sanity sections against the live dataset. The pastor's independent administrator invitation was sent; acceptance and denied-access checks still need confirmation.
- Netlify project `gcf-website-preview` was connected to the GitHub repository. Its existing published `main` build (`afea22a`) is Phase 1. The media administrator entered the non-secret build variables `SANITY_PROJECT_ID=gs8p6s6x`, `SANITY_DATASET=production`, `SANITY_CONTENT_REQUIRED=true`, and `NODE_VERSION=24`.
- Netlify branch deploys were enabled specifically for `feature/website-phase-2-cms-foundation`; no Phase 2 Netlify preview had appeared in the deploy list at the time of this note. This documentation update is intended to trigger the first branch build; its outcome still needs verification.
- Next: inspect the branch build and the live content it renders, confirm appropriate admin access, then configure a **private** Sanity-to-Netlify build hook. Do not merge to `main` or announce the site before review.

## Owner revisions before merging

- New dedicated **Meet the Team** page sits under About Us, never duplicated on individual ministry cards. A new optional Sanity singleton `teamPage` will let administrators edit all profiles in one place; each profile is hidden by default until explicitly approved for public display. Existing five published documents remain sufficient for the website build until the new section is populated.
- The Ministries page now uses illustrated cards and a richer Bible Study layout. The approved ministry names are **Seeds** (infants), **Sprouts** (children), **Roots** (teens), **Men’s Ministry**, **Women’s Ministry**, and **Celebrate Recovery**. Meeting details not supplied by the owner remain unconfirmed. The three new ministries are in local fallback data; **they must also be added in the live Sanity Ministries section** because Netlify reads published Sanity content at build time.
- The former Step Study listing is a **closed meeting**. Its schedule note and local event entry are removed. The original imported `step-study` item is suppressed during Sanity sync until an administrator deletes it from the published Services & Events document. A future public Step Study announcement should be a new event with a new ID, only when the church schedules and approves it.
- After the updated code is reviewed, the media administrator must obtain the latest `studio/` files, redeploy the hosted Studio, then optionally create and publish `Meet the Team`. **Do not reimport the seed into the existing Sanity dataset.**

## What is ready for review

- The approved pastor text, church details, schedule notes, and brand stay in src/data/site.json, outside routine editor fields.
- src/data/editorial/ contains JSON files for announcements, gatherings, ministries, centrally managed team profiles, individual sermon recordings, and participation (Bible studies, outreach, volunteering).
- src/content.ts combines these files into the existing typed SiteContent model. Public pages, routes, and existing links remain unchanged.
- scripts/validate-content.mjs runs before each production build; it checks stable IDs, unique IDs, dates, YouTube video-only URLs, and local images with alt text, dimensions, and a 3 MB upper bound. Invalid CMS content fails the build.
- `studio/` supplies a separate Sanity editor with six singleton sections after redeployment. Events, ministries, team members, and other items automatically retain array keys as IDs; church staff do not need to work with IDs or GitHub.
- `scripts/create-sanity-seed.mjs` prepares six documents for a **new empty dataset only** without importing anything. `scripts/pull-sanity-content.mjs` fetches only published documents from the church's public Sanity dataset during a site build, requires the five existing sections, optionally includes the new team section, maps editorial fields, and validates the complete site. If no project ID is configured, the build uses its current checked-in JSON (no live service required).
- Public pages never ship Sanity editor credentials, passwords, write tokens, or a hard-coded admin email list. The validated published content is embedded into the prerendered static site; it is not a live administrative API.
- CI now runs the content validation unit tests as well as existing lint, build, and browser tests.

## Church setup needed before enabling the administrator interface

1. The media administrator creates a Sanity account/project at sanity.io, chooses a **public** `production` dataset for publicly displayable church content, and shares the non-secret Sanity project ID with the developer. Do **not** share passwords or tokens.
2. Invite the pastor's separate official church email as a project **Administrator**; the media account remains an independent Administrator. Only project-invited accounts can edit. Sanity's free plan has up to 20 seats with Administrator and Viewer roles, so granular media-only editing permissions are not included in this plan. Keep 2-step login and individual credentials where supported.
3. Run `npm ci --prefix studio`, copy `studio/.env.example` to `studio/.env` and fill the project ID/dataset. Run `npm run seed:sanity` from repository root and **review** `studio/seed.ndjson` against existing site data. Only after confirming the dataset is empty: `cd studio && npx sanity dataset import seed.ndjson production`. The one-time import is not part of the build and must not overwrite later edits.
4. From `studio/`, use `npm run dev` to preview the admin interface and `npx sanity deploy` to host it on a Sanity-provided Studio URL. Give each invited administrator that login link. This is an independent sign-in site—not a public website editing route. Verify a non-invited user cannot modify content.
5. On an unpublished Netlify preview, set `SANITY_PROJECT_ID`, `SANITY_DATASET=production`, and `SANITY_CONTENT_REQUIRED=true` for the site build. Netlify runs `npm run build` and reads only published content through Sanity's public read API. Do not add a Sanity write token. A missing project setting, failed fetch, missing collection, or invalid item aborts the build rather than blanking the site.
6. After confirming manual builds and previews, create a private Netlify **build hook** and connect it as a Sanity **outgoing webhook** filtered to the six published document types (including optional `teamPage`). This lets Publish trigger a new website build; the site will not change until that build succeeds. Treat the hook URL as a secret; never commit or paste it publicly. Test publish, edit, unpublish, rejected content, and rebuild before making the system live.
7. Keep the pastor-provided statement/articles of faith, approved banner, and official contact details outside routine editor access. Children's check-in remains pending and collects no minors' details.

## Later Phase 2 work

- General contact and volunteer interest forms still use email links until the form provider and verified email delivery are approved and tested.
- Children’s check-in, accessibility, parking, individual leadership profiles, communion/potluck timing, and Monday café schedule remain pending owner/pastoral confirmation. The closed Step Study is not a publicly listed ongoing meeting. Do not collect minors’ information or create online children’s registration forms at this stage.
- Final hosting/domain and automatic production deployment need separate verification. Do not buy paid services or enable automatic billing upgrades without approval.
