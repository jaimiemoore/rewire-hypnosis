# Calendar-first booking release

> Historical calendar-first implementation. Current screening delivery and form behavior are documented in [Screening redirect after booking](email-follow-up.md); that document supersedes the optional questionnaire and email-delivery guidance below.


Status: live at https://www.rewirehypnosis.ca. Production build and browser verification passed.

The website changes are prepared. Do not deploy them until all four Cal.com events enforce the required booking fields. Removing the existing intake gate before configuring Cal.com would allow bookings without phone details or acceptance of the agreements.

## Cal.com settings

Apply to `free-screening-weight-loss`, `free-screening-stop-smoking`, `free-screening-stress-management`, and `free-screening-other`, owned by `rewirehypnosis`.

| Setting | Required value |
| --- | --- |
| Duration | 60 minutes |
| Name and email | Required; keep email confirmation enabled |
| Phone | Additional required phone field, stable identifier `phone` |
| Screening location | Required attendee choice: in person at 257 Division Street, Cobourg, unit 104, or virtual over Zoom; no default selection |
| Invitation location | Match the selected screening location; verify the Zoom integration or explicit meeting-link delivery |
| Guarantee acceptance | Required explicit acceptance, identifier `guarantee-agreement`; never prechecked |
| Waiver acceptance | Required explicit acceptance, identifier `waiver-agreement`; never prechecked |
| Agreement text | Show full current guarantee and service-specific waiver before acceptance. If using links, use `https://www.rewirehypnosis.ca/agreements?serviceId=<focus>#guarantee-agreement` and `#waiver-agreement`; links must be live before the new controls are enabled. |
| Optional follow-up | Include `https://www.rewirehypnosis.ca/screening?serviceId=<focus>` in confirmation content if supported, explaining that it is optional but highly recommended |

Focus IDs are `weight-loss`, `stop-smoking`, `stress-management`, and `other`. Remove the old custom location input labelled “As indicated in intake form.” Prefer real Cal.com attendee-selectable meeting locations so calendar invitations contain the selected address or virtual meeting details. Verify every event's public details form rather than assuming one event's settings apply to all.

If agreement links require publishing first, deploy the standalone agreement page while retaining the current booking gate, then configure and verify Cal.com before releasing the calendar-first widget. Do not publish a nonfunctional agreement link or weaken mandatory consent during the transition.

## Prepared changes and validation

The shared booking component now shows the calendar after focus selection and uses the official booking event to offer optional questions. The standalone questionnaire and agreement pages reuse existing service definitions. Only name and email are required when submitting optional answers for manual matching; booking-owned phone, location and consent questions are not repeated. The investment-amount question is removed from all four questionnaires.

API checks cover partial submissions, invalid service IDs, choices and dates, oversized input, spam rejection, email errors and receipt failure after notification acceptance. Booking state checks cover calendar-first access, confirmed/pending wording, question reveal and skipping. Run `node scripts/check-screening.mjs`.

Changed-file ESLint checks passed. Production builds passed. Full repository lint has pre-existing source errors and scans generated `.vercel/output` files. Local browser checks confirmed that the official calendar loads before any intake submission, all four focus choices change the booking/follow-up links, the standalone questionnaire requires only matching name/email, the removed investment question is absent, and no second booking widget appears on that page. Mobile layout was checked at 375 px. No real booking or questionnaire email was sent during verification.

## Account access restored — October 5, 2026

Cal.com and Vercel access are restored. All four events have saved required name/email/phone fields, required unchecked guarantee and service-specific waiver checkboxes with full existing text, 60-minute duration, and the clinic address displayed before booking. Notes and guests are hidden. Descriptions recommend the optional questionnaire and include its service-specific URL. Custom confirmation redirects require a paid plan; none was enabled.

Zoom now shows connected in the rewirehypnosis account. All four saved events contain the clinic and native Zoom Video locations. Their public forms allow selecting either location and show 60-minute slots. Cal.com initially selects the clinic. No real booking was submitted, so Zoom meeting creation and confirmation delivery remain untested.

Production has all three required email/reCAPTCHA environment variables. Preview build succeeded at https://rewire-hypnosis-7hjpnvxlh-jaimie-moores-projects.vercel.app (deployment C268xKww6NgYBKjvjsaPjK6jcc9s). Preview browser access requires Vercel sign-in. The public reCAPTCHA key is Production-only, so rebuild with production environment values rather than promoting this preview. No production deployment or Git push has been performed.

Production deployment 9DpZ2rUPYuZ1gfXLM5UkNqK1vRh6 was built with production environment values and aliased to https://www.rewirehypnosis.ca. Browser verification confirmed calendar availability before intake, both location choices, and the optional questionnaire without an investment-amount question. Existing appointments and past intake emails require no migration.
