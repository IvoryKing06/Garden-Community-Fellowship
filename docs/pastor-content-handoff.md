# Pastor-provided content handoff (review before publishing)

These details come from three pastor-supplied documents shared by the site owner:
- `GCF Church Schedule.docx`
- `Garden Community Fellowship Statement of Faith.docx`
- `Garden Community Fellowship Articles of Faith.docx`

This handoff is not an authorization to publish the original DOCX files or their entire contents verbatim. Do not publish the tax ID appearing in the Statement of Faith footer without express approval.

## Public-branding and privacy decisions

- Official motto from the Statement of Faith: **“A place where people flourish”**.
- Do **not** publish, link, tease, or list Facebook, even as “pending”; that community is private.
- Do **not** use proposed ministry nicknames such as **Oaks** or **Olive Branches**. No proposed nicknames should appear until independently approved.
- The approved oak/cross/sunrise/mountain website banner remains the branding reference. Avoid substituting an unapproved logo.
- Do not invent a leadership roster or any additional ministry names, ages, or times.
- **Leadership names, biographies, and photographs will be provided later.** Do not invent or use stock portraits of leaders. Leave a clean optional placeholder/section hidden or clearly pending until approved assets and details arrive; do not block Phase 1 on them.

## Church location and contact from the Statement of Faith

- Meeting location: **2931 Erskine Creek Rd, Lake Isabella, CA 93240**.
- Mailing address: **PO Box 536, Lake Isabella, CA 93240**.
- Phone: **661-301-2451**.
- The pastor's official church email appears in the original source document. Reserve it for church-document and approved private administration use; do not add it to the public website, frontend configuration, or public CMS login allowlist.
- **Owner-confirmed website contact address: gcf.online.studios@gmail.com.** Display this for all public website communication, including Connect, volunteer inquiries, Plan Your Visit, and future contact/volunteer form notifications. The pastor's official church email must **not** be displayed as the website contact or used as the destination for website inquiries. No further email confirmation is needed.
- Do not publish the church tax ID just because it appears in the source.

## Official church schedule (from pastor's schedule)

**Owner update (November 17, 2026):** The Step Study row below is retained only as a historical transcription of the original pastor document. The church owner confirmed this is a closed meeting and it must **not** appear in public website events or schedule notes. Any future publicly announced Step Study will be entered as a new event when specifically scheduled.

| When | Gathering | Time | Notes |
| --- | --- | --- | --- |
| Sunday | Prayer | 8:00–8:40 AM | |
| Sunday | Adult Sunday School | 8:45–9:45 AM | |
| Sunday | Sunday Service | 10:00 AM–12:00 PM | |
| Monday | Celebrate Recovery | 7:00–9:00 PM | Doors open at 6:15 PM |
| Tuesday | Men’s Bible Study | 6:00–8:00 PM | |
| Wednesday | Co-Ed Bible Study | 5:00–7:00 PM | |
| Thursday | Women’s Bible Stories | 6:00–8:00 PM | Preserve source title until clarified |
| First Friday of each month | Night of Praise and Worship | 6:00–8:00 PM | |
| First Sunday of each month | Communion and Potluck Meal | Not specified | Do not invent a separate time |
| Sunday (verify whether every week or first Sunday) | Celebrate Recovery Step Study | 4:00–6:00 PM | Placement in document after “First Sunday” is ambiguous |

Saturday is listed as having no scheduled activities; no need for a public “nothing happening” item.

**Reconciliation needed:** Earlier site-owner details had Connect Café at 6:00 PM and Cross Talk Café at 6:15 PM on Monday. The pastor's newer written schedule says Celebrate Recovery doors open at 6:15 PM but does not mention the cafés. Do not silently claim these timings are confirmed by the pastor. Ask the site owner to confirm how the cafés relate to the doors-open note, and update any old “all events recur Monday” text before displaying the full schedule.

## Beliefs content

The pastor provided both a concise **Statement of Faith** and a seven-page **Articles of Faith**. The two are distinct documents. The site should present church-approved, faithful content from them—ideally a readable “What We Believe” page or section, with the concise statement and optional expandable articles.

The short Statement of Faith includes, in the pastor's own formulation:
- The Bible (Old and New Testaments) as inspired by God and the infallible authoritative rule of faith and conduct
- The Triune God, Father, Son, and Holy Spirit
- Jesus Christ's pre-existence, incarnation, virgin birth, sinless life, miracles, substitutionary death, bodily resurrection, ascension, and second coming
- The fall of humanity, salvation by grace through repentance and faith in Jesus Christ, and the Holy Spirit's regeneration
- The fellowship of believers, holiness, and works of faith
- The church's stated beliefs about marriage, sexuality, gender, and the value of human life

The full Articles of Faith expand these topics across: Trinity, Father, Son, Holy Spirit, Scripture, mankind, salvation, atonement, church, marriage and family, personal choice, repentance and faith, justification/regeneration/adoption, good works, sin after regeneration, baptism and the Lord's Supper, Christ's second coming, resurrection, and judgment.

**Do not paraphrase doctrines as if they were approved exact wording or silently drop challenging passages.** Ask the owner to supply the actual DOCX documents directly to the Codex task if the full passages are needed, and request pastoral review before publishing the finished beliefs pages.

## Implementation goals

- Update the public Home and Plan Your Visit pages with verified Sunday worship time and street address.
- Present a complete Sunday and weekday gathering schedule, including first-Friday recurring event and first-Sunday communion/potluck, while respecting ambiguous Step Study recurrence.
- Keep reusable typed content data suitable for the later CMS.
- Add phone and contact information cleanly, after the public-email decision.
- Check responsive design, route prerender, accessibility, and tests. Update any tests assuming exactly three Monday event rows.
- Never merge or deploy without review.

## Phase 1 implementation review — November 17, 2026

The three original DOCX attachments were reviewed directly. The official schedule is now in typed site content; Sunday service/address appear on Home and Plan Your Visit, and weekday studies appear under Ministries. What We Believe is on `/about#what-we-believe`: all nine Statement of Faith paragraphs and all 19 Articles of Faith are transcribed, including Scripture references. Only surrounding whitespace was normalized; source wording and reference typos are retained for pastoral review. Original DOCX files, document footers, tax ID, and document-only email are not published.

The approved banner is now imported at its verified 2172 × 724 dimensions. All public email inquiries remain gcf.online.studios@gmail.com. Confirmed donation, Discord, YouTube, and Twitch links are unchanged. Leadership remains deferred; Facebook and unapproved ministry nicknames remain excluded.

Before publication, please review the beliefs transcription and clarify:

- Whether Sunday Celebrate Recovery Step Study is weekly or first-Sunday only (4:00–6:00 PM is specified).
- The separate time, if any, for first-Sunday Communion and Potluck Meal.
- How Monday Connect Café and Cross Talk Café relate to the pastor’s 6:15 PM doors-open note. Earlier café times are no longer displayed as confirmed schedule entries.
- Whether “Women’s Bible Stories” is the intended title; the source title is preserved.

Accessibility, parking, children’s check-in, individual sermon recordings, and leadership details remain pending. No merge or deployment is authorized by this handoff.
