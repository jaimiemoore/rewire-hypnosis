"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Brain,
  Check,
  CheckCircle2,
  CigaretteOff,
  LockKeyhole,
  Scale,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getCalUrl,
  intakeServices,
  intakeServiceIds,
  type IntakeField,
  type IntakeServiceId,
} from "@/lib/intake";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type IntakeStatus = "idle" | "submitting" | "success" | "error";

// Where in-progress intake answers are saved so a client can resume later
// (client-side only, per device — no server/database involved).
const STORAGE_KEY = "rewire-intake-progress-v1";

function hasAnyAnswer(responses: Record<string, string>) {
  return Object.values(responses).some((value) => value && value.trim() !== "");
}

const serviceIcons: Record<IntakeServiceId, LucideIcon> = {
  "weight-loss": Scale,
  "stop-smoking": CigaretteOff,
  "stress-management": Brain,
  other: Sparkles,
};

const bookingSteps = [
  { step: 1, label: "Focus" },
  { step: 2, label: "Details" },
  { step: 3, label: "Time" },
];

function buildInitialResponses(serviceId: IntakeServiceId) {
  return intakeServices[serviceId].fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});
}

const CONSENT_YES = "Yes, I agree";

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: IntakeField;
  value: string;
  onChange: (value: string) => void;
}) {
  const fieldId = `intake-${field.id}`;
  const baseClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-soft/30 bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:glow-sage transition-all";

  // Waiver / guarantee agreements: title + paragraph + required checkbox.
  if (field.type === "consent") {
    const agreed = value === CONSENT_YES;
    return (
      <div className="rounded-xl border border-sage/20 bg-cream/60 p-4 md:p-5">
        {field.title ? (
          <h5 className="font-heading text-lg font-bold text-forest mb-2">{field.title}</h5>
        ) : null}
        {field.body ? (
          <p className="text-sm text-gray-soft whitespace-pre-line mb-4 leading-relaxed">{field.body}</p>
        ) : null}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id={fieldId}
            type="checkbox"
            required={field.required}
            aria-required={field.required}
            checked={agreed}
            onChange={(event) => onChange(event.target.checked ? CONSENT_YES : "")}
            className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-gray-soft/40 text-sage focus:ring-sage"
          />
          <span className="text-sm font-semibold text-forest">
            {field.label}
            {field.required ? <span className="text-sage-dark"> *</span> : null}
          </span>
        </label>
      </div>
    );
  }

  const requiredMark = field.required ? (
    <span className="text-sage-dark">
      {" *"}
      <span className="sr-only"> (required)</span>
    </span>
  ) : null;

  // Multiple choice and 1-10 scale render as radio groups.
  if (field.type === "radio" || field.type === "scale") {
    return (
      <fieldset>
        <legend className="block text-sm font-semibold text-forest mb-2">
          {field.label}
          {requiredMark}
        </legend>
        {field.hint ? <p className="text-xs text-gray-soft mb-2">{field.hint}</p> : null}

        {field.type === "scale" ? (
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={field.label}>
            {field.options?.map((option) => {
              const checked = value === option;
              return (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name={fieldId}
                    value={option}
                    checked={checked}
                    required={field.required}
                    onChange={() => onChange(option)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-sage peer-focus-visible:ring-offset-2 ${
                      checked
                        ? "border-sage bg-sage text-white"
                        : "border-gray-soft/30 bg-white text-forest hover:border-sage/50"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {field.options?.map((option) => {
              const checked = value === option;
              return (
                <label
                  key={option}
                  className={`flex items-start gap-3 cursor-pointer rounded-lg border px-4 py-3 transition-all ${
                    checked ? "border-sage bg-sage/5" : "border-gray-soft/30 bg-white hover:border-sage/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={fieldId}
                    value={option}
                    checked={checked}
                    required={field.required}
                    onChange={() => onChange(option)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage focus:ring-sage"
                  />
                  <span className="text-sm text-forest">{option}</span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>
    );
  }

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-semibold text-forest mb-2">
        {field.label}
        {requiredMark}
      </label>
      {field.hint ? <p className="text-xs text-gray-soft mb-2">{field.hint}</p> : null}

      {field.type === "textarea" ? (
        <textarea
          id={fieldId}
          required={field.required}
          aria-required={field.required}
          rows={4}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClasses} resize-none`}
        />
      ) : field.type === "select" ? (
        <select
          id={fieldId}
          required={field.required}
          aria-required={field.required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={baseClasses}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={field.type}
          required={field.required}
          aria-required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Booking progress">
      {bookingSteps.map(({ step, label }, index) => {
        const isDone = currentStep > step;
        const isActive = currentStep === step;

        return (
          <li key={step} className="flex items-center gap-2 sm:gap-3">
            <span
              aria-current={isActive ? "step" : undefined}
              className={`flex items-center gap-2 text-sm font-semibold ${
                isActive || isDone ? "text-sage-dark" : "text-gray-soft"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  isActive
                    ? "bg-sage text-white"
                    : isDone
                    ? "bg-sage/20 text-sage-dark"
                    : "bg-gray-soft/15 text-gray-soft"
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : step}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </span>
            {index < bookingSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className={`h-px w-4 sm:w-8 ${isDone ? "bg-sage/40" : "bg-gray-soft/20"}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default function FreeScreeningBooking() {
  const [selectedServiceId, setSelectedServiceId] = useState<IntakeServiceId | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<IntakeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumed, setResumed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const selectedService = selectedServiceId ? intakeServices[selectedServiceId] : null;
  const calendarUrl = selectedServiceId
    ? getCalUrl(selectedServiceId, { name: responses.name, email: responses.email })
    : null;

  const currentStep = status === "success" ? 3 : selectedServiceId ? 2 : 1;

  // Restore any saved in-progress intake once, on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { serviceId?: IntakeServiceId; responses?: Record<string, string> };
        if (parsed.serviceId && intakeServices[parsed.serviceId] && parsed.responses && hasAnyAnswer(parsed.responses)) {
          setSelectedServiceId(parsed.serviceId);
          setResponses(parsed.responses);
          setResumed(true);
        }
      }
    } catch {
      // ignore malformed/unavailable storage
    }
    setLoaded(true);
  }, []);

  // Auto-save progress (and clear it once the intake is submitted).
  useEffect(() => {
    if (!loaded) return;
    try {
      if (status === "success") {
        window.localStorage.removeItem(STORAGE_KEY);
      } else if (selectedServiceId && hasAnyAnswer(responses)) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ serviceId: selectedServiceId, responses }));
      }
    } catch {
      // ignore storage write failures (e.g. private mode)
    }
  }, [selectedServiceId, responses, status, loaded]);

  const handleServiceChange = (serviceId: IntakeServiceId) => {
    if (serviceId === selectedServiceId) {
      return;
    }
    setSelectedServiceId(serviceId);
    setResponses(buildInitialResponses(serviceId));
    setStatus("idle");
    setErrorMessage("");
    setResumed(false);
  };

  const handleStartOver = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSelectedServiceId(null);
    setResponses({});
    setStatus("idle");
    setErrorMessage("");
    setResumed(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedServiceId) {
      return;
    }
    setStatus("submitting");
    setErrorMessage("");

    try {
      const recaptchaToken = await getRecaptchaToken("intake_submit");
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedServiceId, responses, recaptchaToken }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Please check the form and try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Please check the form and try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-sage/20 bg-white/80 p-5 md:p-8 shadow-sm"
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-2 text-sm font-semibold text-sage-dark mb-4">
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          Intake required before booking
        </div>
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-forest mb-2">
          Book a Free Screening
        </h3>
        <p className="text-gray-soft leading-relaxed max-w-lg">
          Choose your focus, complete a short intake, then pick a time on the calendar.
        </p>
      </div>

      {resumed && status !== "success" ? (
        <div className="mt-6 flex flex-col gap-2 rounded-lg bg-sage/10 p-4 text-sm text-forest sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold">Welcome back — we restored your saved answers.</span>
          <button
            type="button"
            onClick={handleStartOver}
            className="self-start font-semibold text-sage-dark underline hover:no-underline sm:self-auto"
          >
            Start over
          </button>
        </div>
      ) : null}

      <div className="mt-6 border-t border-sage/10 pt-6">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Step 1 — choose focus */}
      <fieldset className="mt-6">
        <legend className="block text-sm font-semibold text-forest mb-3">
          <span className="text-sage-dark">Step 1</span> — Choose your focus
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {intakeServiceIds.map((serviceId) => {
            const Icon = serviceIcons[serviceId];
            const checked = selectedServiceId === serviceId;

            return (
              <label key={serviceId} className="cursor-pointer">
                <input
                  type="radio"
                  name="screening-focus"
                  value={serviceId}
                  checked={checked}
                  onChange={() => handleServiceChange(serviceId)}
                  className="peer sr-only"
                />
                <span className="flex items-center gap-3 rounded-xl border border-gray-soft/30 bg-white p-4 transition-all peer-hover:border-sage/50 peer-checked:border-sage peer-checked:bg-sage/5 peer-checked:ring-2 peer-checked:ring-sage/50 peer-focus-visible:ring-2 peer-focus-visible:ring-sage peer-focus-visible:ring-offset-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sage/10 text-sage-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-forest">{intakeServices[serviceId].label}</span>
                  <CheckCircle2
                    aria-hidden="true"
                    className={`ml-auto h-5 w-5 text-sage transition-opacity ${
                      checked ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Step 2 — intake (slides down once a focus is chosen) */}
      <AnimatePresence initial={false}>
        {selectedService && status !== "success" ? (
          <motion.div
            key="intake"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-forest">
                    <span className="text-sage-dark">Step 2</span> — Confidential intake
                  </h4>
                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="text-xs font-semibold text-gray-soft underline hover:text-sage-dark"
                  >
                    Start over
                  </button>
                </div>
                <p className="text-sm text-gray-soft">{selectedService.description}</p>
                <p className="mt-2 mb-5 inline-flex items-center gap-1.5 text-xs text-sage-dark">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Your progress saves automatically on this device — you can close the page and finish later.
                </p>
                <div className="space-y-5">
                  {selectedService.fields.map((field) => (
                    <FieldControl
                      key={field.id}
                      field={field}
                      value={responses[field.id] || ""}
                      onChange={(value) =>
                        setResponses((current) => ({ ...current, [field.id]: value }))
                      }
                    />
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === "submitting"}
                className="w-full px-6 py-3 bg-sage text-white rounded-lg font-semibold glow-sage disabled:opacity-50 transition-all"
                whileHover={{ y: -2, boxShadow: "0 0 30px rgba(86, 134, 115, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "submitting" ? "Sending intake..." : "Submit intake & choose a time"}
              </motion.button>

              {status === "error" ? (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
                  {errorMessage}
                </div>
              ) : null}
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Step 3 — calendar (slides in after a successful intake) */}
      <AnimatePresence initial={false}>
        {status === "success" ? (
          <motion.div
            key="calendar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-8">
              <div className="mb-5 rounded-lg bg-green-50 p-4 text-green-800 flex gap-3">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Your intake was sent.</p>
                  <p className="text-sm">
                    Choose a free screening time below. Cal.com will email your appointment
                    confirmation after booking.
                  </p>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-forest mb-3">
                <span className="text-sage-dark">Step 3</span> — Pick your time
              </h4>

              {calendarUrl ? (
                <iframe
                  title={`${selectedService?.label ?? "Free screening"} booking calendar`}
                  src={calendarUrl}
                  loading="lazy"
                  className="h-[680px] sm:h-[720px] w-full rounded-xl border border-sage/20 bg-white"
                />
              ) : (
                <div className="rounded-xl border border-sage/20 bg-cream p-6 text-center">
                  <p className="font-semibold text-forest mb-2">The booking calendar is being connected.</p>
                  <p className="text-gray-soft mb-4">
                    Your intake has been received. Please try booking again later.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
