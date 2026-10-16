# Screening redirect after booking

## Current flow

Client selects a focus → Cal.com embedded booking → confirmed booking event → website redirects to `/screening?serviceId=<focus>` → questionnaire submission → Resend emails Rachel the answers and sends the client a receipt.

The website handles navigation using Cal.com's official `bookingSuccessfulV2` embed callback and only advances for status `accepted`. Slot selection, pending requests, unknown statuses, rejected and cancelled bookings do not advance. A later accepted callback can advance a previously pending request. No Cal.com custom email workflow, paid redirect, webhook or upgrade is used. Cal.com retains its regular scheduling confirmations, required contact details, locations, guarantee, and waiver.

## Routing and access

| Booking focus | Website destination |
| --- | --- |
| Weight Loss | /screening?serviceId=weight-loss |
| Stop Smoking | /screening?serviceId=stop-smoking |
| Stress Management | /screening?serviceId=stress-management |
| Other | /screening?serviceId=other |

Forms are unlisted, not access-controlled: known or shared URLs still work. Missing/invalid focus values show booking guidance rather than a questionnaire directory. Screening pages retain noindex/nofollow metadata and stay out of the sitemap. No questionnaire links appear in public website navigation, booking copy, or Cal.com descriptions.

The site no longer provides a direct-Cal.com booking shortcut. Calendar errors offer retry and contact guidance. Automatic redirects apply to bookings completed in the website embed; independently accessed Cal.com pages cannot navigate the parent website.

## Forms and email

Only name and booking email are required. Detailed answers may all remain blank; supplied values still pass server validation. The form asks clients to share what they can to help Rachel prepare, without optional-screening or skip copy.

Rachel receives a “Screening form completed” email at rachel@rewirehypnosis.ca containing the focus, client name/email, and every supplied answer. Blank answers are omitted. The client receipt excludes detailed answers. Delivery failure preserves entered responses; a receipt failure after Rachel's notification was accepted does not ask for duplicate submission. Existing reCAPTCHA and request-size limits remain intact.

This document supersedes optional follow-up and email-workflow instructions in design.md and release.md. No booking or historical-email migration is needed.

## Verification

Run `node scripts/check-screening.mjs`, changed-file ESLint, and `npm run build`. Checks cover routing across all focuses, no premature navigation, pending-to-confirmed callbacks, absence of public links, invalid/missing form selectors, name/email-only and partial submissions, notification contents, private receipts, validation/spam rejection and email-provider failures.

Check desktop/mobile booking and questionnaires in a real browser before and after deployment. Real appointment creation and actual inbox delivery must be reported separately from mocked callback/provider checks. Test bookings require accepting booking agreements; do not accept these on the client's behalf without the required authorization.
