# Redirect release QA — October 16, 2026

Production: https://www.rewirehypnosis.ca
Deployment: `dpl_EcXJCFhTHXVmq4QEXUfybKp9Mgmr` (Ready, promoted)
Implementation commit: `645148d`; subsequent changes add verification evidence only.
PR: https://github.com/jaimiemoore/rewire-hypnosis/pull/1

| Criterion | Result | Evidence |
| --- | --- | --- |
| Confirmed booking redirects to matching form for all four focuses | Pass, mocked integration | `node scripts/check-screening.mjs`; all focus destinations asserted; official embed callback shape and listener exercised |
| Pending, rejected, cancelled, unknown callbacks do not redirect | Pass, automated | Focused checks, including later accepted callback |
| Calendar failure offers retry/contact | Pass for error UI | `linkFailed` triggers retry UI; retry clears error state; listener cleanup ignores disposed callbacks |
| No public questionnaire links or directory | Pass | Live booking DOM has only contact email link; generic form route shows guidance; all four saved Cal.com descriptions inspected together without questionnaire URLs |
| Partial and identity-only submissions | Pass | All focuses covered through API tests; live Other form submitted with just name/email and one answer |
| Rachel receives completed form and client information | Pass, live delivery | Resend notification `01a145c6-b92c-7dd3-8d4e-b111ab18c655` reports delivered; retrieved email contains QA name, email, focus and supplied answer, omitting blank questions |
| Client receipt excludes detailed answers | Pass, automated; live receipt delivered | API payload assertions; live receipt `01a145c6-b98a-79f3-a136-23c42a3e77d1` reports delivered |
| All four forms retain noindex and name/email-only required fields | Pass, live browser | DOM inspection of each deployed service-specific questionnaire |
| Mobile/desktop rendering | Pass | 1280px desktop and 375px mobile browser checks; questionnaire has no horizontal overflow |
| Validation, spam protection, email failures | Pass, automated | Focused malformed JSON/service/choices/date/size/reCAPTCHA and provider/receipt failure checks |
| Build/lint/review | Pass | Changed-file ESLint, Next.js production build, Vercel production build, independent review Approve |
| Real appointment creation → redirect | Unverified | No real appointment created and no booking waivers accepted; callback integration is mocked |

The live QA notification and receipt were both sent to Rachel with a clearly labelled QA identity. No real client or appointment data was submitted. A delivered provider event confirms recipient-server acceptance, not that Rachel opened or read the message.

The staged Vercel URL required deployment authentication; public browser checks were performed after promotion on the custom production domain. Existing unrelated source warnings and untracked handoff/screenshots were left unchanged.
