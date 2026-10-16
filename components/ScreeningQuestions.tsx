"use client";

import { FormEvent, useRef, useState } from "react";
import { getScreeningFields, intakeServices, type IntakeField, type IntakeServiceId } from "@/lib/intake";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

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
        {field.hint ? <p className="text-xs text-text-secondary mb-2">{field.hint}</p> : null}

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
                        ? "border-sage bg-forest text-white"
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
      {field.hint ? <p className="text-xs text-text-secondary mb-2">{field.hint}</p> : null}

      {field.type === "textarea" ? (
        <textarea
          id={fieldId}
          required={field.required}
          aria-required={field.required}
          rows={4}
          maxLength={4000}
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
          maxLength={field.id === "name" ? 200 : field.id === "email" ? 254 : 4000}
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


export default function ScreeningQuestions({ serviceId }: { serviceId: IntakeServiceId }) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("submitting");
    setError("");
    try {
      const recaptchaToken = await getRecaptchaToken("intake_submit");
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, responses, recaptchaToken }),
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Delivery could not be confirmed. Please try again.");
      setResponses({});
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" ? cause.message : "Delivery could not be confirmed. Please contact Rachel before sending again.");
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "success") return (
    <div role="status" className="rounded-xl bg-green-50 p-5 text-green-900">
      Your screening answers were received. Thank you for helping Rachel prepare.
      <p className="mt-2 text-sm">Your appointment is managed separately through Cal.com.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <h3 className="font-heading text-2xl font-bold text-forest">{intakeServices[serviceId].label} screening questions</h3>
      <p className="text-text-secondary">Share what you can about your goals and what brought you here. Only fields marked * are required. Please use the name and email from your booking so Rachel can match your answers to your appointment.</p>
      <p className="text-sm text-text-secondary">Sending this form does not book, cancel or change an appointment. Unsent answers are kept only while this page stays open.</p>
      {getScreeningFields(serviceId).map((field) => (
        <FieldControl key={field.id} field={field} value={responses[field.id] || ""}
          onChange={(value) => setResponses((current) => ({ ...current, [field.id]: value }))} />
      ))}
      <button disabled={status === "submitting"} type="submit"
        className="w-full rounded-lg bg-forest px-6 py-3 font-semibold text-white focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50">
        {status === "submitting" ? "Sending answers..." : "Send screening answers"}
      </button>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error} Your booking is unaffected. You can contact <a className="underline" href="mailto:rachel@rewirehypnosis.ca">Rachel</a> for help.</p> : null}
    </form>
  );
}
