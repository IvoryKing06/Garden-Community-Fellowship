# Phase 1 visual redesign review

The official church schedule and beliefs now use the three pastor-provided DOCX documents. Sunday worship and the meeting address appear on Home and Plan Your Visit. Events lists ten weekly/monthly or explicitly unconfirmed gatherings; Ministries includes the three weekday Bible studies. What We Believe is accessible from About navigation at `/about#what-we-believe`, with nine Statement of Faith paragraphs and 19 expandable Articles of Faith (including the original Scripture references). Source spelling/reference issues are retained for pastoral review.

All public inquiries use **gcf.online.studios@gmail.com**. The confirmed donation, Discord, YouTube, and Twitch URLs are unchanged. Facebook, unapproved ministry nicknames, leadership names/photos, the document-only email, and the tax ID are absent from public content. Original DOCX files are not published. The approved banner is imported without cropping (2172 × 724, 263,564 bytes). The presentation now follows the supplied design reference: a cream masthead with the approved motto, navy navigation, burgundy active items and buttons, traditional serif headings, four information highlights, and a three-column ministry/events/Sunday-visit section. On mobile these sections stack, with a working collapsible navigation. The reference is used for visual design only; none of its placeholder photographs or church information is imported.

## Validation

- `npm ci` completed using the existing lockfile.
- `npm run build` passed, including prerendered route HTML.
- `npm run lint` passed.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`: nine tests passed. Coverage includes all nine routes, WCAG A/AA axe scans, browser errors, responsive overflow at 360/768/1440 px, navigation, expandable beliefs, schedule accuracy, public inquiry addresses, preserved links, banner loading, no-JavaScript HTML, homepage navigation and content hierarchy, and screenshots.
- All Articles of Faith headings and paragraphs were compared in source order against the attached DOCX after trimming surrounding whitespace; no doctrinal text or references were omitted.
- All nine public routes are captured. Screenshots below use 1440 × 1000 desktop and 390 × 844 mobile viewports, with full-page capture. These are local production-preview results; no deployment has been performed.

## Screenshots

| Page | Desktop | Mobile |
| --- | --- | --- |
| Home | [Desktop](phase-1-home-desktop.png) | [Mobile](phase-1-home-mobile.png) |
| Schedule | [Desktop](phase-1-schedule-desktop.png) | [Mobile](phase-1-schedule-mobile.png) |
| Beliefs | [Desktop](phase-1-beliefs-desktop.png) | [Mobile](phase-1-beliefs-mobile.png) |
| Plan Your Visit | [Desktop](phase-1-visit-desktop.png) | [Mobile](phase-1-visit-mobile.png) |
| Ministries | [Desktop](phase-1-ministries-desktop.png) | [Mobile](phase-1-ministries-mobile.png) |
| Sermons | [Desktop](phase-1-sermons-desktop.png) | [Mobile](phase-1-sermons-mobile.png) |
| Get Involved | [Desktop](phase-1-involved-desktop.png) | [Mobile](phase-1-involved-mobile.png) |
| Connect | [Desktop](phase-1-connect-desktop.png) | [Mobile](phase-1-connect-mobile.png) |
| Watch | [Desktop](phase-1-watch-desktop.png) | [Mobile](phase-1-watch-mobile.png) |

## Content decisions

- Hero imagery uses the existing approved oak/cross/sunrise/mountain banner, displayed at its full aspect ratio with all lettering. No stock congregation photographs or replacement logos are introduced.
- The Our Mission highlight reads the exact purpose sentence from the existing “The Church” article in `site.json`, linking to that expandable article. No mockup mission statement is used.
- The ministry highlight uses confirmed Celebrate Recovery information. “Sermons in the Park” is not an approved program in the content files, so it is not advertised. A separate link leads to the existing Sermons page.
- Upcoming Events features only three existing recurring gatherings, with real recurrence labels rather than fabricated dates. The full Events schedule and its unresolved details remain available through View All Events.
- Content data, content models, doctrine, inquiry addresses, verified external URLs, and the Phase 2 CMS plan are unchanged by the visual redesign.

## Before publication

Pastoral review of the complete beliefs transcription remains requested. Confirm Sunday Step Study recurrence (weekly or first-Sunday only), a separate time for first-Sunday Communion and Potluck Meal if applicable, and how the Monday cafés relate to the confirmed 6:15 PM doors-open note. The site explicitly identifies these scheduling uncertainties. “Women’s Bible Stories” preserves the source title pending clarification. Accessibility/parking/check-in, leadership, and individual sermon recordings remain deferred.

Do not merge or deploy as part of this change.

## Final polish

The homepage banner caption is removed; alt text, intrinsic dimensions, and full-image responsive behavior are preserved. The three featured event badges now read Monday, Tuesday, and First Friday at equal compact heights. The monthly event still states “First Friday of each month” beside its verified time.

Plan Your Visit includes a prominent Get Directions link to Google Maps directions for the confirmed street address, opening a new tab with `noopener noreferrer`. Visitor email contact remains available. Browser tests verify the exact Maps destination, new-tab behavior, and contact link on desktop and mobile. The external response is intercepted for repeatable tests; Google’s live service is not tested. Updated Home and Plan Your Visit screenshots are included above.
