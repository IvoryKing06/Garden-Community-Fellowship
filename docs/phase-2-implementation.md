# Phase 2A: content-management foundation (draft, not active)

This branch begins Phase 2 without enabling an insecure editor or modifying the public content. **The administration interface, authentication, and online forms are not live.** Do not merge Phase 2 until deployment and access controls are confirmed.

## What is ready for review

- The approved pastor text, church details, schedule notes, and brand stay in src/data/site.json, outside routine editor fields.
- src/data/editorial/ contains JSON files for announcements, gatherings, ministries, individual sermon recordings, and participation (Bible studies, outreach, volunteering).
- src/content.ts combines these files into the existing typed SiteContent model. Public pages, routes, and existing links remain unchanged.
- scripts/validate-content.mjs runs before each production build; it checks stable IDs, unique IDs, dates, YouTube video-only URLs, and local images with alt text, dimensions, and a 3 MB upper bound. Invalid CMS content fails the build.
- An editor-provider-neutral data contract is ready. The earlier draft GitHub-login CMS configuration was removed at the owner's request. No admin UI or authentication is exposed.
- CI now runs the content validation unit tests as well as existing lint, build, and browser tests.

## Before enabling the administrator interface

1. Invite the two initial email identities separately: GCF media administration and the pastor's official church administration. Do not store their login addresses in the public client bundle; manage identities privately with the chosen provider.
2. Select an actively supported email-based provider after verifying free/paid seats, authentication methods, MFA, recovery, roles, and any production email-delivery costs. Set up the provider/project and private environment credentials before connecting an admin UI.
3. Make registration invite-only. Check both the authenticated user's identity and assigned admin role in trusted server-side logic or provider rules for every read/write. A hidden URL or browser-side email comparison is not access control.
4. Keep pastor and media access independent. Later trusted media staff should receive individual, revocable media-role accounts so everyone can be trained on the same simple dashboard without sharing a password.
5. Preserve reviewed publishing before content goes public. If a CMS writes directly to a database, apply a draft/review/publish state or equivalent; if it updates Git, protect main with reviewed PRs and CI. Test login, denied access, draft editing, publishing, and website updates on an unpublished preview before launch.
6. Keep faith statements and other pastor-provided details under separate owner/pastoral review. The editor must not silently modify them.

## Later Phase 2 work

- General contact and volunteer interest forms still use email links until the form provider and verified email delivery are approved and tested.
- Children’s check-in, accessibility, parking, ministry leadership, Step Study recurrence, communion/potluck timing, and Monday café schedule remain pending owner/pastoral confirmation. Do not collect minors’ information or create online children’s registration forms at this stage.
- Final hosting/domain and automatic production deployment need separate verification. Do not buy paid services or enable automatic billing upgrades without approval.
