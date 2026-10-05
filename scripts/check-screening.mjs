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
  "@/components/ScreeningQuestions": { default: function ScreeningQuestions() {} },
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
let tree = renderBooking();
assert(!elements(tree).some((node) => node.type?.name === "ScreeningQuestions"));
elements(tree).find((node) => node.type === "input").props.onChange();
tree = renderBooking();
assert(textContent(tree).includes("Choose a time and complete your booking"));
assert(!elements(tree).some((node) => node.type?.name === "ScreeningQuestions"));
elements(tree).find((node) => node.type?.name === "BookingCalendar").props.onBooked("accepted");
tree = renderBooking();
assert(textContent(tree).includes("Your booking is complete."));
assert(elements(tree).find((node) => node.type === "fieldset").props.disabled);
elements(tree).find((node) => node.type === "button" && textContent(node) === "Skip for now").props.onClick();
tree = renderBooking();
assert(textContent(tree).includes("Your booking is unaffected."));
assert(!elements(tree).some((node) => node.type?.name === "ScreeningQuestions"));
states = [];
tree = renderBooking();
elements(tree).find((node) => node.type === "input").props.onChange();
tree = renderBooking();
elements(tree).find((node) => node.type?.name === "BookingCalendar").props.onBooked("pending");
tree = renderBooking();
assert(textContent(tree).includes("Your booking request was received."));
assert(!textContent(tree).includes("Your booking is complete."));
elements(tree).find((node) => node.type === "button" && textContent(node) === "Complete screening questions").props.onClick();
tree = renderBooking();
assert(elements(tree).some((node) => node.type?.name === "ScreeningQuestions"));

assert.equal(intake.isIntakeServiceId("toString"), false);
assert.equal(intake.isIntakeServiceId("__proto__"), false);
let valid;
for (const serviceId of intake.intakeServiceIds) {
  const fields = intake.getScreeningFields(serviceId);
  assert.deepEqual(fields.filter((field) => field.required).map((field) => field.id).sort(), ["email", "name"]);
  assert(fields.every((field) => field.type !== "consent" && field.type !== "tel"));
  assert(!intake.intakeServices[serviceId].fields.some((field) => field.label.includes("level of investment")));
  const question = fields.find((field) => !field.required && field.type === "textarea");
  const responses = { name: "Test Visitor", email: "visitor@example.com", [question.id]: "One optional answer", "which-level-of-investment-feels-realistic": "$5000+" };
  const result = intake.validateScreeningResponses(serviceId, responses);
  assert.equal(result.error, null);
  assert.equal(Object.keys(result.values).length, 3);
  assert(intake.validateScreeningResponses(serviceId, { name: "Test", email: "visitor@example.com" }).error);
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
  assert(!emails[1].html.includes("One optional answer"));
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
