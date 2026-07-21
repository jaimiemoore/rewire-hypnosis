export type IntakeServiceId = "weight-loss" | "stop-smoking" | "stress-management" | "other";

export type IntakeFieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "textarea"
  | "select"
  | "radio"
  | "scale"
  | "consent";

export type IntakeField = {
  id: string;
  label: string;
  type: IntakeFieldType;
  required: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** Consent-only: section title shown above the agreement. */
  title?: string;
  /** Consent-only: the full waiver/guarantee paragraph. */
  body?: string;
};

export type IntakeService = {
  id: IntakeServiceId;
  label: string;
  description: string;
  fields: IntakeField[];
};

type FieldSpec = Omit<IntakeField, "id" | "required"> & { id?: string; required?: boolean };

// Assigns a stable id to each field (slug of its label), guaranteeing that the
// name/email fields keep the ids the API route and Cal.com prefill rely on.
function withIds(specs: FieldSpec[]): IntakeField[] {
  const used = new Set<string>();
  return specs.map((spec) => {
    let id = spec.id;
    if (!id) {
      let base =
        spec.label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 40) || "field";
      if (/^full-?name$/.test(base)) base = "name";
      if (base.startsWith("email")) base = "email";
      id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
    }
    used.add(id);
    return { required: true, ...spec, id };
  });
}

// --- Field builders (keep the long questionnaires readable) -----------------
const T = (label: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({ type: "text", label, ...extra });
const P = (label: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({ type: "textarea", label, ...extra });
const R = (label: string, options: string[], extra: Partial<FieldSpec> = {}): FieldSpec => ({
  type: "radio",
  label,
  options,
  ...extra,
});
const D = (label: string, extra: Partial<FieldSpec> = {}): FieldSpec => ({ type: "date", label, ...extra });

const YN = ["Yes", "No"];
const READINESS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const IMPORTANT = [
  "Effectiveness (your results)",
  "Time (how fast you get results)",
  "Service (how we respond to your needs)",
  "Affordable (what we charge)",
];
const IMPORTANT_SMOKING = [
  "Effectiveness (your results)",
  "Time (how fast you get results)",
  "Service (how we respond to your needs)",
  "Affordable (how much we charge)",
];
const READY_TO_INVEST = [
  "Yes, I am ready to invest in myself",
  "Possibly, if it feels aligned",
  "I'm mostly looking for free resources right now",
];
const INVESTMENT = ["Under $1000", "$1000-$3000", "$3000-$5000", "$5000+"];

const sessionPreference = (virtualLabel: string): FieldSpec =>
  R("Do you prefer in person sessions or online?", [
    "In person at the clinic located at 257 Division Street, Cobourg unit 104",
    virtualLabel,
  ]);

const GUARANTEE_BODY =
  "Rewire Hypnosis offers a guarantee. Success using hypnosis is dependent on many variables including the attitude, motivation, cooperation, and the attendance of scheduled sessions by the client. Even through human behaviour cannot be guaranteed, Rewire Hypnosis makes the following service guaranteed to you for the hypnosis training services. Upon payment in full, there are no more charges regardless of the time duration involved for the client to attain his or her goals. People vary and so will the time needed to accomplish these specific goals. After the initial session package is completed, Rewire Hypnosis will provide free reinforcement sessions at the client's request (maximum one per month) until the client is satisfied with their learning and results. If you ever go back to your habit again for any reason, our services are available to you at no extra charge for as long as our doors are open for business.";

const guaranteeConsent = (): FieldSpec => ({
  id: "guarantee-agreement",
  type: "consent",
  label: "Yes, I have read and accept the Rewire Hypnosis Guarantee.",
  title: "Rewire Hypnosis Guarantee",
  body: GUARANTEE_BODY,
});

const waiverConsent = (body: string): FieldSpec => ({
  id: "waiver-agreement",
  type: "consent",
  label: "Yes, I have read and agree to the waiver.",
  title: "Waiver",
  body,
});

// Closing questions shared, in order, by all three intakes.
const closingQuestions: FieldSpec[] = [
  R("What is the most important element in deciding to use our services?", IMPORTANT),
  { type: "scale", label: "On a scale of 1-10, how ready are you to create real change in this area of your life?", options: READINESS },
  R(
    "If we decide that this is a good fit, are you financially and emotionally ready to invest in meaningful support to create lasting change?",
    READY_TO_INVEST
  ),
  R("Which level of investment feels realistic for you right now?", INVESTMENT),
  T("What made you decide to book this call today?"),
];

// --- Weight Loss ------------------------------------------------------------
const weightLossFields = withIds([
  T("Full name"),
  D("Current date"),
  { type: "email", label: "Email address", placeholder: "you@example.com" },
  sessionPreference("Virtual sessions over Zoom"),
  T("Street address"),
  { type: "tel", label: "Phone number", placeholder: "Best number to reach you" },
  T("Age"),
  R("Sex", ["F", "M"]),
  T("Height"),
  T("Weight"),
  T("Marital status"),
  T("Education"),
  T("Occupation"),
  P("Favourite hobbies"),
  T("Do you enjoy your work?"),
  T("Are you satisfied with your income?"),
  P("Do you feel stress? Why?"),
  P("Are you currently taking medication? Please list"),
  T("Physician's name and office?"),
  R("Can we communicate with your physician regarding your program?", YN),
  R("Do you have light sensitive epilepsy?", YN),
  R("Have you been hypnotized before?", YN),
  P("What do you expect from hypnosis?"),
  T("How long have you been overweight?"),
  T("How much weight have you decided to lose?"),
  P("How many times have you failed at weight loss?"),
  P("What methods failed to help you lose weight?"),
  P("Does your weight problem make you physically uncomfortable? Explain"),
  P("How many times a year do you diet?"),
  P("Do you suffer from uncontrollable cravings? Explain", { required: false }),
  P("Do you feel out of control?"),
  P("Do you eat because of emotions? Explain"),
  P("Are you embarrassed about your weight?"),
  P("Is successful weight loss a top priority? Explain"),
  P("Will you purchase a new wardrobe when you lose weight?"),
  P("What new activities will you become involved in after losing weight?"),
  R("Do you know that hypnosis is 100% safe?", YN),
  T("What is the exact weight you're going to be?"),
  P("Are other members of your family overweight?"),
  P("Briefly describe your eating behaviour (frequent snacking, late night eating, binge eating, processed food etc.)"),
  P("Do you believe weight loss has to be painful?"),
  P("Do you believe weight loss can be enjoyable?"),
  P("How fast do you want to lose weight and be in-shape?"),
  P("Do you feel your eating behaviour is normal?"),
  R("Does your family support your weight loss efforts?", ["Yes", "No", "I don't know", "Not Applicable"], {
    required: false,
  }),
  P("Does being overweight limit your social life?", { required: false }),
  P("Do you feel tired, run down, out of energy?"),
  P("Can you remember being your ideal weight?"),
  P("Has being overweight caused you pain and suffering? Describe physical and emotional pain"),
  R("Do you exercise?", YN),
  R("How often do you exercise?", ["Daily", "3-5 days/week", "1-2 days/week", "I do not exercise"]),
  P("What type of exercise do you do?"),
  T("How did you hear about Rewire Hypnosis?"),
  P("Is there anything else you would like to share?", { required: false }),
  ...closingQuestions,
  waiverConsent(
    "I hereby understand that the training I am purchasing from Rewire Hypnosis is for self-hypnosis and educational purposes only. It is not therapy, and is not meant as a replacement for any other interventions.\n\nI understand that Rewire Hypnosis uses light and sound technology to enhance my hypnotic experience. I understand that I can refuse or stop the light and sound technology at any time for any reason.\n\nI am aware that the Rewire Hypnosis facility is under video and audio surveillance for the safety of all parties, and for quality assurance and training purposes.\nI hereby release Rewire Hypnosis and Rachel Moore of any and all liability in this matter."
  ),
  guaranteeConsent(),
]);

// --- Stop Smoking -----------------------------------------------------------
const stopSmokingFields = withIds([
  sessionPreference("Online"),
  T("Full name"),
  D("Today's date"),
  { type: "email", label: "Email address", placeholder: "you@example.com" },
  { type: "tel", label: "Phone number", placeholder: "Best number to reach you" },
  P("Current address"),
  T("Age"),
  T("Sex"),
  T("Education"),
  T("Occupation"),
  T("Favourite hobbies"),
  T("Marital status"),
  T("Do you enjoy your work?"),
  P("Do you feel stress? why?"),
  P("Are you currently taking any medications? Please list"),
  T("Physician's name and office"),
  R("Can we communicate with your physician regarding your hypnosis program?", YN),
  R("Do you have light sensitive epilepsy?", YN),
  R("Do you exercise?", ["Yes", "No", "Sometimes"]),
  R("How often do you exercise?", ["Daily", "3-5 days/week", "1-2 days/week", "I do not exercise weekly"]),
  T("What type of exercise do you do?"),
  R("Have you been hypnotized before?", YN),
  T("How did you hear about Rewire Hypnosis?", {
    hint: "If you were referred by a former client, please tell us who we can send a thank you note to",
  }),
  T("How long have you been smoking?"),
  T("How much do you smoke?"),
  R("Have you tried to stop before?", YN),
  T("How many times have you tried to stop smoking?"),
  T("What methods failed to help you stop smoking?"),
  P("Is your smoking habit making you physically uncomfortable? Explain"),
  R("Are you embarrassed by your need to smoke?", YN),
  P("Does your smoking limit you or your activities? Please explain"),
  P("Do you feel smoking controls you? Please explain"),
  P("Is successfully quitting smoking a top priority? Please explain"),
  P("What new activities will you become involved in after you stop smoking?"),
  R("Did you know that hypnosis is 100% safe?", YN),
  R("Do other members of your family smoke?", YN),
  R("Does your family support your stop smoking efforts?", ["Yes", "No", "I don't know"]),
  R("Is your family excited about your stopping smoking with hypnosis?", ["Yes", "No", "I don't know"]),
  P("Do you feel tired, run down and out of energy? Please explain"),
  R("Can you remember when you did not smoke?", YN),
  P("What do you remember about not smoking?"),
  P("Has smoking caused you pain or suffering yet? Describe physical and emotional pain"),
  P("What is the number one reason why you want to stop smoking?"),
  R("What is the most important element in deciding to use our services?", IMPORTANT_SMOKING),
  { type: "scale", label: "On a scale of 1-10, how ready are you to create real change in this area of your life?", options: READINESS },
  R(
    "If we decide that this is a good fit, are you financially and emotionally ready to invest in meaningful support to create lasting change?",
    READY_TO_INVEST
  ),
  R("Which level of investment feels realistic for you right now?", INVESTMENT),
  T("What made you decide to book this call today?"),
  waiverConsent(
    "I hereby understand that the training I am purchasing from Rewire Hypnosis is for self-hypnosis and educational purposes only. It is not therapy, and is not meant as a replacement for any other interventions.\n\nRewire Hypnosis uses light and sound technology to enhance my hypnotic experience. I understand that I can choose not to use light and sound technology at any time for any reason.\n\nI understand that the Rewire Hypnosis facility is under video and audio surveillance for the safety of all parties, and for quality assurance and training purposes.\nI hereby release Rewire Hypnosis and Rachel Moore of any and all liability in this matter."
  ),
  guaranteeConsent(),
]);

// --- Stress Management / Other (shared Google Form) -------------------------
const stressFields = withIds([
  T("Full Name"),
  D("Current Date"),
  { type: "email", label: "Email Address", placeholder: "you@example.com" },
  sessionPreference("Virtual over Zoom"),
  { type: "tel", label: "Phone Number", placeholder: "Best number to reach you" },
  T("Age"),
  T("Sex"),
  T("Marital status"),
  T("Education"),
  T("Occupation"),
  T("Hobbies"),
  T("Do you enjoy your work?"),
  P("Do you feel stress? Why?"),
  P("Are you currently taking medication? Please list"),
  R("Do you have light sensitive epilepsy?", YN),
  R("Do you exercise?", YN),
  R("How often do you exercise?", ["Daily", "3-5 days/week", "1-2 days/week", "I do not exercise"]),
  P("What type of exercise do you do?"),
  R("Have you been hypnotized before?", YN),
  T("How did you hear about Rewire Hypnosis?"),
  P("What problem would you like to solve with hypnosis?"),
  P("How long have you had this problem?"),
  P("What do you experience with this problem physically, mentally, emotionally?"),
  P("What methods have you tried to solve it?"),
  P("What were the results?"),
  P("Do you feel out of control?"),
  P("What worries you most?"),
  P("Is solving your problem a top priority? Explain why"),
  R("Do you know that hypnosis is 100% safe?", YN),
  P("How will your life change once you have solved this problem?"),
  P("Do you feel that having this problem is normal?"),
  R("Does your family support your efforts to solve this problem?", ["Yes", "No", "I don't know"]),
  P("Does having this problem limit your social life?"),
  P("Do you feel tired, run down, out of energy?"),
  P("Can you remember not having this problem? Explain"),
  P("Has this problem caused you pain and suffering? Describe physical and emotional pain"),
  P("Is there anything else you would like to share?", { required: false }),
  ...closingQuestions,
  waiverConsent(
    "I hereby understand that the training I am purchasing from Rewire Hypnosis is for self-hypnosis and educational purposes only. It is not therapy, and is not meant as a replacement for any other interventions.\n\nI understand that the facility is under video and audio surveillance for the safety of all parties, and for quality assurance and training purposes.\nI hereby release Rewire Hypnosis and Rachel Moore of any and all liability in this matter."
  ),
  guaranteeConsent(),
]);

export const intakeServices: Record<IntakeServiceId, IntakeService> = {
  "weight-loss": {
    id: "weight-loss",
    label: "Weight Loss",
    description: "Please complete this confidential intake before choosing a free screening time.",
    fields: weightLossFields,
  },
  "stop-smoking": {
    id: "stop-smoking",
    label: "Stop Smoking",
    description: "Please complete this confidential intake before booking your free screening.",
    fields: stopSmokingFields,
  },
  "stress-management": {
    id: "stress-management",
    label: "Stress Management",
    description: "Please complete this confidential intake before booking a free screening.",
    fields: stressFields,
  },
  other: {
    id: "other",
    label: "Other",
    description: "Please complete this confidential intake before choosing a free screening time.",
    fields: stressFields,
  },
};

export const intakeServiceIds = Object.keys(intakeServices) as IntakeServiceId[];

// --- Cal.com booking config -------------------------------------------------
// These are public booking URLs (not secrets) and rarely change, so the live
// account values are the hardcoded defaults. An env var can still override each
// one (e.g. in Vercel) without a code change.
export const calUsername = process.env.NEXT_PUBLIC_CAL_USERNAME || "rewirehypnosis";

export const calEventSlugs: Record<IntakeServiceId, string> = {
  "weight-loss": process.env.NEXT_PUBLIC_CAL_EVENT_WEIGHT_LOSS || "free-screening-weight-loss",
  "stop-smoking": process.env.NEXT_PUBLIC_CAL_EVENT_STOP_SMOKING || "free-screening-stop-smoking",
  "stress-management":
    process.env.NEXT_PUBLIC_CAL_EVENT_STRESS_MANAGEMENT || "free-screening-stress-management",
  other: process.env.NEXT_PUBLIC_CAL_EVENT_OTHER || "free-screening-other",
};

/** Builds the embeddable Cal.com booking URL for a service, or null if unset.
 *  Optionally prefills the booker's name/email from the intake responses. */
export function getCalUrl(
  serviceId: IntakeServiceId,
  prefill?: { name?: string; email?: string }
): string | null {
  const slug = calEventSlugs[serviceId];

  if (!calUsername || !slug) {
    return null;
  }

  const params = new URLSearchParams({ embed: "true", theme: "light" });

  const name = prefill?.name?.trim();
  const email = prefill?.email?.trim();
  if (name) params.set("name", name);
  if (email) params.set("email", email);

  return `https://cal.com/${calUsername}/${slug}?${params.toString()}`;
}
