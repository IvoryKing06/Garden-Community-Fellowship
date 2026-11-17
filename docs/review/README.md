# Phase 1 pastor-content review

The official church schedule and beliefs now use the three pastor-provided DOCX documents. Sunday worship and the meeting address appear on Home and Plan Your Visit. Events lists ten weekly/monthly or explicitly unconfirmed gatherings; Ministries includes the three weekday Bible studies. What We Believe is accessible from About navigation at `/about#what-we-believe`, with nine Statement of Faith paragraphs and 19 expandable Articles of Faith (including the original Scripture references). Source spelling/reference issues are retained for pastoral review.

All public inquiries use **gcf.online.studios@gmail.com**. The confirmed donation, Discord, YouTube, and Twitch URLs are unchanged. Facebook, unapproved ministry nicknames, leadership names/photos, the document-only email, and the tax ID are absent from public content. Original DOCX files are not published. The approved banner is imported without cropping (2172 × 724, 263,564 bytes). The traditional colors, fonts, and layout are retained.

## Validation

- `npm ci` completed using the existing lockfile.
- `npm run build` passed, including prerendered route HTML.
- `npm run lint` passed.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`: seven tests passed. Coverage includes all nine routes, WCAG A/AA axe scans, browser errors, responsive overflow at 360/768/1440 px, navigation, expandable beliefs, schedule accuracy, public inquiry addresses, preserved links, banner loading, no-JavaScript HTML, and screenshots.
- All Articles of Faith headings and paragraphs were compared in source order against the attached DOCX after trimming surrounding whitespace; no doctrinal text or references were omitted.
- Screenshots below use 1440 × 1000 desktop and 390 × 844 mobile viewports, with full-page capture. These are local production-preview results; no deployment has been performed.

## Screenshots

| Page | Desktop | Mobile |
| --- | --- | --- |
| Home | [Desktop](phase-1-home-desktop.png) | [Mobile](phase-1-home-mobile.png) |
| Schedule | [Desktop](phase-1-schedule-desktop.png) | [Mobile](phase-1-schedule-mobile.png) |
| Beliefs | [Desktop](phase-1-beliefs-desktop.png) | [Mobile](phase-1-beliefs-mobile.png) |
| Plan Your Visit | [Desktop](phase-1-visit-desktop.png) | [Mobile](phase-1-visit-mobile.png) |

## Before publication

Pastoral review of the complete beliefs transcription remains requested. Confirm Sunday Step Study recurrence (weekly or first-Sunday only), a separate time for first-Sunday Communion and Potluck Meal if applicable, and how the Monday cafés relate to the confirmed 6:15 PM doors-open note. The site explicitly identifies these scheduling uncertainties. “Women’s Bible Stories” preserves the source title pending clarification. Accessibility/parking/check-in, leadership, and individual sermon recordings remain deferred.

Do not merge or deploy as part of this change.
