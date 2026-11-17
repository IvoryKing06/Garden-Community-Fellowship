# Phase 2A: content-management foundation (draft, not active)

This branch begins Phase 2 without enabling an insecure editor or modifying the public content. **The administration interface, authentication, and online forms are not live.** Do not merge Phase 2 until deployment and access controls are confirmed.

## What is ready for review

- The approved pastor text, church details, schedule notes, and brand stay in src/data/site.json, outside routine editor fields.
- src/data/editorial/ contains JSON files for announcements, gatherings, ministries, individual sermon recordings, and participation (Bible studies, outreach, volunteering).
- src/content.ts combines these files into the existing typed SiteContent model. Public pages, routes, and existing links remain unchanged.
- scripts/validate-content.mjs runs before each production build; it checks stable IDs, unique IDs, dates, YouTube video-only URLs, and local images with alt text, dimensions, and a 3 MB upper bound. Invalid CMS content fails the build.
- docs/cms/config.yml is a draft Decap CMS GitHub-backend configuration using review-first editorial workflow. It is deliberately outside public/ until sign-in is proven.
- CI now runs the content validation unit tests as well as existing lint, build, and browser tests.

## Before enabling the administrator interface

1. Confirm who the 1–2 individual church editors are and their GitHub usernames. Enable MFA and grant the minimum repository permissions needed; do not share passwords.
2. Decide on a maintained GitHub OAuth broker or approved hosted GitHub auth service, verify its current availability/cost, and configure the actual callback domain, session safeguards, CSRF/state protection, and server-side secrets. No OAuth credentials belong in this repository.
3. Confirm branch protection: publication requires reviewed PRs, checks, and explicit approval. A Decap draft/publish action can create or merge GitHub PRs; the UI itself does not enforce who can bypass GitHub branch protections.
4. After successful test login with the designated editor account, move the reviewed configuration to public/admin/config.yml, add a pinned CMS loader at public/admin/index.html, and test draft → PR → review → publish → site rebuild on an unpublished preview first.
5. Keep faith statements and other pastor-provided details under separate owner/pastoral review. The editor must not silently modify them.

## Later Phase 2 work

- General contact and volunteer interest forms still use email links until the form provider and verified email delivery are approved and tested.
- Children’s check-in, accessibility, parking, ministry leadership, Step Study recurrence, communion/potluck timing, and Monday café schedule remain pending owner/pastoral confirmation. Do not collect minors’ information or create online children’s registration forms at this stage.
- Final hosting/domain and automatic production deployment need separate verification. Do not buy paid services or enable automatic billing upgrades without approval.
