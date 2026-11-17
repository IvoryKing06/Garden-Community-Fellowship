# The Garden — administrator editor

This is a separate Sanity Studio app for the Garden Community Fellowship media administrator and pastor. It offers five easy sections: Announcements, Services & Events, Ministries, Sermons, and Bible Studies & Involvement. No GitHub account or code editing is needed for day-to-day use.

## One-time setup (by the church/project owner)

1. The church's Sanity project is now configured with ID `gs8p6s6x`. At https://www.sanity.io/manage/ verify the dataset is named `production` and is **public** for read-only published website content. Public means visitors can read published content, **not** that anyone can edit. Only invited Sanity project members can edit.
2. Invite the media and pastor email accounts separately, with Administrator project membership. Sanity's free plan does not give custom media-only versus pastor-only roles. Don't share passwords with teammates.
3. The public project ID is already in `sanity.config.ts` and `sanity.cli.ts`. If you need a different dataset than `production`, copy `.env.example` to `.env` and update `SANITY_STUDIO_DATASET`.
4. At the repository root, run `npm run seed:sanity` and review the generated ignored `studio/seed.ndjson`. **Only once, and only on a verified empty dataset**, run `npx sanity dataset import seed.ndjson production` from inside `studio/`. Never re-import over a working dataset; that could overwrite staff edits.
5. Run `npm ci` and `npm run check` from this folder, then `npm run dev` to review the editor. Log in with an invited Sanity account.
6. Run `npx sanity deploy` from this folder to select a Sanity-hosted admin URL. Share that URL with approved administrators, not a GitHub URL.

## Website publication

On the website's Netlify deployment, configure `SANITY_PROJECT_ID` (the same project ID), `SANITY_DATASET=production`, and `SANITY_CONTENT_REQUIRED=true` as build-time environment variables. The site syncs published documents during `npm run build`, verifies all required data, and prerenders public pages. An unconfigured local build uses approved backup JSON, while a configured production build refuses to publish if its project settings are missing.

Sanity's Publish button saves content but does **not** directly update a static site. After an initial successful manual site rebuild, create a Netlify build hook under site settings, then in Sanity project management add an outgoing webhook for published content changes to the five singleton types. Keep the build-hook URL private. Each published change can then trigger a rebuild; confirm this behavior on a preview deployment before enabling production.

The approved Statement and Articles of Faith, banner, and official church details are deliberately not editable in this interface. Children's check-in information remains pending. Do not enter children's personal data into public fields.
