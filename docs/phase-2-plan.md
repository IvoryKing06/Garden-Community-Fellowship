# Editing, forms, branding, and hosting handoff

Phase 1 uses static content only. No admin route, authentication endpoint, submission endpoint, payment integration, or prayer-request form is enabled.

## Administrator login decision — November 17, 2026

The site owner selected **email-based administrator sign-in, not GitHub sign-in for church staff**. GitHub remains the development repository, invisible to church administrators. Begin with two independently accessible administrator identities:

- **Media administration** — the owner-confirmed GCF media mailbox (currently managed by the site owner).
- **Pastoral administration** — the pastor's separate official church mailbox. The account must remain usable independently of the media account.

Do not hard-code the pastoral login address, passwords, or an admin allowlist into the publicly shipped site or public repository. Store memberships and roles in a provider-managed, access-controlled system. Only invited identities may sign in; verify identity server-side and authorize content writes separately from mere login. Add suitable MFA and recovery. Never ask church staff to share passwords in chat.

When trusted media-team members join, **invite them to their own accounts with media permissions**, instead of reusing the original media credentials. This gives simple login while preserving an audit trail, individual revocation, and access for the pastor if a media member leaves. The owner's shared-login idea is a workflow preference to discuss, not a security requirement to silently implement.

### CMS and authentication selection

**Selected: Sanity Studio** (owner-approved November 17, 2026). The former draft Decap GitHub OAuth editor was retired. Church administrators will sign in to a separately hosted, private-to-members Sanity Studio using their own email/password accounts; GitHub is for developers only. Sanity manages the account invitation, authentication, and editor permissions, not a client-side email list. The pastor's login email must not be published in site code or public documentation.

The current Sanity free plan allows up to 20 user seats with **Administrator and Viewer** project roles, but does not provide separate fine-grained pastor/media editing roles without an upgrade or custom workflow. For the approved initial setup, both trusted identities must be invited as administrators. Each person should enable offered two-step security, retain independent account recovery, and avoid password sharing. Extra staff should be invited individually only when trusted; project permissions and pricing must be reassessed before expanding the team.

The `studio/` directory contains the configured editor with five approachable sections. Staff edit titles and content rather than raw JSON, GitHub, or technical IDs. It cannot be used until the church creates its own Sanity project, invites the two administrators, and hosts the Studio. No accounts, projects, tokens, payments, or deployment have been provisioned by this repository.

`src/content-model.ts` is the typed content contract. The Sanity editor exposes these fields; technical IDs are assigned automatically and retained for existing links:

| Collection/setting                  | Editor fields                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Announcements                       | Title, body, optional expiry                                                                   |
| Events/gatherings                   | Title, description, category, recurring day/time, optional confirmed date, location, image     |
| Ministries                          | Name, category, description, schedule, optional photo; preserve existing link IDs               |
| Bible studies/outreach/volunteering | Title, description, confirmed schedule                                                         |
| Sermons                             | Title, recording date, verified HTTPS individual YouTube recording URL, optional photo          |
| Visit/schedules                     | Confirmed address, Sunday service time, accessibility details — deferred from routine editor   |
| Connections                         | Name, verified URL or null, verified/pending status — deferred from routine editor             |
| Branding/images                     | Approved hero banner remains outside routine editor; section photos have alt text and limits   |

Null values and empty collections remain explicit pending states. A YouTube channel is not presented as an individual sermon. The editor validates required inputs and video URLs; the site build separately validates dates, unique identifiers, images, and maximum 3 MB size and fails on invalid data. Section photos should be compressed before upload. Sanity has draft editing and a Publish action. A separate Netlify build/webhook connection is still needed for published changes to appear on the website.

## Approved banner

The approved oak/cross/sunrise/mountain banner has been imported from the existing root `gcf-banner.webp` into `public/uploads/gcf-banner.webp`. Verified dimensions are **2172 × 724**, and size is **263,564 bytes** (under 300 KB). `branding.banner` now points to this asset with descriptive alt text and the verified dimensions. The renderer preserves intrinsic proportions, full width, automatic height, and contain sizing on mobile and desktop. Do not crop away lettering or substitute generated art. The header retains the plain text wordmark.


## Forms in Phase 2

Volunteer interest and general contact requests should eventually deliver to gcf.online.studios@gmail.com through a maintained secure form provider. Evaluate Netlify Forms on the chosen Netlify plan first, or a free-tier-compatible third-party service if needed. Verify current submission/notification quotas, retention, spam filtering, recipient verification, and plan eligibility from the provider before implementation. Email notification behavior must be tested with the church; a successful browser POST alone is insufficient evidence of delivery.

Use HTTPS, server-side validation, length limits, a honeypot/rate controls, accessible error/success states, consent and retention text, and minimal fields (name, reply email, request type, message or volunteer interest). Do not allow attachments initially. No online prayer-request forms. Keep service secrets out of the browser. Until setup is verified, use the working mailto links and clearly identify that online signups are unavailable.

## Free hosting and limits

Netlify is the selected deployment target, configured in `netlify.toml`. This repository does not create an account, deploy a site, enroll a paid plan, or enable forms. Netlify's free plans have account-dependent usage/credit limits for builds, bandwidth, requests, and form features; confirm current limits and whether reaching a cap pauses the site before launch. Do not enable automatic paid upgrades. Media stays external on YouTube/Twitch; site images and fonts are local. A purchased custom domain is optional. No payment is necessary for local development or the static build.

Build output includes prerendered HTML, route titles/descriptions, and Open Graph basics for every page. Netlify serves existing route files before the SPA fallback. After deploying to a free Netlify subdomain, verify direct navigation and refresh on all routes, HTTPS, asset responses, and legacy `/contact` redirection. A local Vite preview does not establish deployed-host behavior. Add canonical URLs, sitemap, social image URL, and robots policy once the real production domain is known; never invent a domain. Do not deploy or merge automatically.
