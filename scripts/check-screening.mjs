import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");

// Run the existing TypeScript source with only external boundaries replaced.
function load(path, dependencies = {}) {
  const output = ts.transpileModule(readFileSync(path, "utf8"), {
    fileName: path,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const testModule = { exports: {} };
  new Function("require", "module", "exports", output)(
    (name) => dependencies[name] ?? require(name), testModule, testModule.exports,
  );
  return testModule.exports;
}

const intake = load("lib/intake.ts");

// Exercise the booking state transitions without creating real appointments.
let states = [];
let cursor = 0;
const redirects = [];
const bookingModule = load("components/FreeScreeningBooking.tsx", {
  react: {
    useState: (initial) => {
      const slot = cursor++;
      if (!(slot in states)) states[slot] = initial;
      return [states[slot], (value) => { states[slot] = typeof value === "function" ? value(states[slot]) : value; }];
    },
    useEffect: () => {},
  },
  "@/lib/intake": intake,
  "next/navigation": { useRouter: () => ({ push: (url) => redirects.push(url) }) },
});
const renderBooking = () => { cursor = 0; return bookingModule.default(); };
function elements(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(elements);
  return [node, ...elements(node.props?.children)];
}
function textContent(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textContent).join(" ");
  return node?.props ? textContent(node.props.children) : "";
}
// Every focus stays calendar-first and exposes no questionnaire link or form.
for (let index = 0; index < intake.intakeServiceIds.length; index++) {
  states = [];
  redirects.length = 0;
  let tree = renderBooking();
  elements(tree).filter((node) => node.type === "input")[index].props.onChange();
  tree = renderBooking();
  assert(textContent(tree).includes("Choose a time and complete your booking"));
  const assertNoQuestions = () => {
    assert(!elements(tree).some((node) => node.type?.name === "ScreeningQuestions"));
    assert(!elements(tree).some((node) => node.type === "a" && node.props.href?.startsWith("/screening")));
    assert(!elements(tree).some((node) => node.type === "a" && /cal\.com/.test(node.props.href)));
    assert(!/optional|skip for now/i.test(textContent(tree)));
  };
  assertNoQuestions();
  assert.equal(redirects.length, 0);
  elements(tree).find((node) => node.type?.name === "BookingCalendar").props.onBooked("accepted");
  tree = renderBooking();
  assert(textContent(tree).includes("Your booking is complete."));
  assert(textContent(tree).includes("Opening your screening questions"));
  assert.deepEqual(redirects, [`/screening?serviceId=${intake.intakeServiceIds[index]}`]);
  assert(elements(tree).find((node) => node.type === "fieldset").props.disabled);
  assertNoQuestions();
}
for (const status of ["pending", "rejected", "cancelled", undefined]) {
  states = [];
  redirects.length = 0;
  let tree = renderBooking();
  elements(tree).find((node) => node.type === "input").props.onChange();
  tree = renderBooking();
  elements(tree).find((node) => node.type?.name === "BookingCalendar").props.onBooked(status);
  tree = renderBooking();
  assert(textContent(tree).includes("Your booking request was received."));
  assert(textContent(tree).includes("Your appointment is not yet confirmed"));
  assert(!textContent(tree).includes("Your booking is complete."));
  assert.equal(redirects.length, 0);
  // A subsequent confirmation can still advance a pending request.
  elements(tree).find((node) => node.type?.name === "BookingCalendar").props.onBooked("ACCEPTED");
  assert.deepEqual(redirects, ["/screening?serviceId=weight-loss"]);
}

// A missing or invalid focus never presents a public questionnaire directory.
const screeningPage = load("app/screening/page.tsx", {
  "next/link": { default: "a" },
  "@/lib/intake": intake,
  "@/components/ScreeningQuestions": { default: function ScreeningQuestions() {} },
});
for (const serviceId of [undefined, "invalid", "__proto__", ...intake.intakeServiceIds]) {
  const page = await screeningPage.default({ searchParams: Promise.resolve({ serviceId }) });
  const validFocus = intake.isIntakeServiceId(serviceId);
  assert.equal(elements(page).some((node) => node.type?.name === "ScreeningQuestions"), validFocus);
  assert(!elements(page).some((node) => node.type === "a" && node.props.href?.startsWith("/screening")));
  assert(!/optional|skip for now/i.test(textContent(page)));
}
assert.equal(screeningPage.metadata.robots.index, false);

assert.equal(intake.isIntakeServiceId("toString"), false);
assert.equal(intake.isIntakeServiceId("__proto__"), false);
let valid;
for (const serviceId of intake.intakeServiceIds) {
  const fields = intake.getScreeningFields(serviceId);
  assert.deepEqual(fields.filter((field) => field.required).map((field) => field.id).sort(), ["email", "name"]);
  assert(fields.every((field) => field.type !== "consent" && field.type !== "tel"));
  assert(!intake.intakeServices[serviceId].fields.some((field) => field.label.includes("level of investment")));
  const question = fields.find((field) => !field.required && field.type === "textarea");
  const responses = { name: "Test Visitor", email: "visitor@example.com", [question.id]: "One screening answer", "which-level-of-investment-feels-realistic": "$5000+" };
  const result = intake.validateScreeningResponses(serviceId, responses);
  assert.equal(result.error, null);
  assert.equal(Object.keys(result.values).length, 3);
  assert.equal(intake.validateScreeningResponses(serviceId, { name: "Test", email: "visitor@example.com" }).error, null);
  assert(intake.validateScreeningResponses(serviceId, { ...responses, name: "" }).error);
  assert(intake.validateScreeningResponses(serviceId, { ...responses, email: "invalid" }).error);
  assert(intake.validateScreeningResponses(serviceId, { ...responses, [question.id]: "x".repeat(4001) }).error);
  const radio = fields.find((field) => field.options);
  assert(intake.validateScreeningResponses(serviceId, { ...responses, [radio.id]: "invalid choice" }).error);
  const date = fields.find((field) => field.type === "date");
  assert(intake.validateScreeningResponses(serviceId, { ...responses, [date.id]: "2026-02-30" }).error);
  valid = { serviceId, responses, recaptchaToken: "mock" };
}

const savedFetch = globalThis.fetch;
const savedKey = process.env.RESEND_API_KEY;
const savedError = console.error;
let verified = true;
const api = load("app/api/intake/route.ts", {
  "@/lib/intake": intake,
  "@/lib/recaptcha": { verifyRecaptcha: async () => verified },
  "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
});
const request = (body) => new Request("http://localhost/api/intake", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) });
const run = (body = valid) => api.POST(request(body));
try {
  process.env.RESEND_API_KEY = "test-only";
  console.error = () => {};
  let emails = [];
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.signal.aborted, false);
    emails.push(JSON.parse(options.body));
    return Response.json({ id: "mock-email" });
  };
  assert.equal((await run()).status, 200);
  assert.equal(emails.length, 2);
  assert.deepEqual(emails[0].to, ["rachel@rewirehypnosis.ca"]);
  assert(!emails[0].html.includes("$5000+"));
  assert(emails[0].subject.startsWith("Screening form completed:"));
  assert(emails[0].html.includes("Test Visitor"));
  assert(emails[0].html.includes("visitor@example.com"));
  assert(emails[0].html.includes("One screening answer"));
  assert(emails[0].html.includes(intake.intakeServices[valid.serviceId].label));
  assert.equal(emails[0].reply_to, "visitor@example.com");
  assert(!emails[1].html.includes("One screening answer"));
  assert(!emails.some((email) => /optional/i.test(email.subject + email.html)));
  for (const serviceId of intake.intakeServiceIds) {
    emails = [];
    assert.equal((await run({ ...valid, serviceId, responses: { name: "Test Visitor", email: "visitor@example.com" } })).status, 200);
    assert.equal(emails.length, 2);
    assert(emails[0].html.includes(intake.intakeServices[serviceId].label));
    assert(emails[0].html.includes("visitor@example.com"));
  }
  assert.equal((await run("{bad json")).status, 400);
  assert.equal((await run({ ...valid, serviceId: "__proto__" })).status, 400);
  assert.equal((await run({ ...valid, responses: [] })).status, 400);
  assert.equal((await run("x".repeat(65537))).status, 413);
  verified = false;
  emails = [];
  assert.equal((await run()).status, 403);
  assert.equal(emails.length, 0);
  verified = true;
  globalThis.fetch = async () => Response.json({ error: "provider rejection" }, { status: 429 });
  assert.equal((await run()).status, 503);
  globalThis.fetch = async () => { throw new DOMException("Timed out", "TimeoutError"); };
  assert.equal((await run()).status, 503);
  let sends = 0;
  globalThis.fetch = async () => ++sends === 1 ? Response.json({ id: "accepted" }) : Response.json({ error: "receipt rejected" }, { status: 500 });
  assert.equal((await run()).status, 200);
  assert.equal(sends, 2);
  delete process.env.RESEND_API_KEY;
  assert.equal((await run()).status, 503);
} finally {
  globalThis.fetch = savedFetch;
  console.error = savedError;
  if (savedKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = savedKey;
}
console.log("Screening checks passed: all focuses, partial answers, validation, size limit, spam rejection and email failure handling.");
