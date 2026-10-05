"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { calUsername, calEventSlugs, getCalUrl, intakeServices, intakeServiceIds, type IntakeServiceId } from "@/lib/intake";
import ScreeningQuestions from "@/components/ScreeningQuestions";

type CalEvent = { detail: { data: { status?: string } } };
type CalApi = ((...args: unknown[]) => void) & { q: unknown[][]; ns: Record<string, unknown> };
declare global { interface Window { Cal?: CalApi } }

let embedLoader: Promise<void> | null = null;
// Cal's official inline embed queue; the vendor owns cross-origin communication.
function loadEmbed() {
  if (embedLoader) return embedLoader;
  embedLoader = new Promise<void>((resolve, reject) => {
    if (!window.Cal) {
      const queue = Object.assign((...args: unknown[]) => { queue.q.push(args); }, { q: [] as unknown[][], ns: {} });
      window.Cal = queue;
    }
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { embedLoader = null; script.remove(); reject(new Error("Calendar could not load")); };
    document.head.appendChild(script);
  });
  return embedLoader;
}

function BookingCalendar({ serviceId, onBooked }: { serviceId: IntakeServiceId; onBooked: (status?: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const notifyBooked = useEffectEvent((status?: string) => onBooked(status));
  useEffect(() => {
    let disposed = false;
    const target = container.current;
    const timeout = setTimeout(() => setFallback(true), 15000);
    const ready = () => { if (!disposed) { clearTimeout(timeout); setFallback(false); } };
    const failed = () => { if (!disposed) setFallback(true); };
    const booked = (event: CalEvent) => { if (!disposed) notifyBooked(event.detail.data.status); };
    loadEmbed().then(() => {
      if (disposed || !target || !window.Cal) return;
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("on", { action: "bookerReady", callback: ready });
      window.Cal("on", { action: "linkFailed", callback: failed });
      window.Cal("on", { action: "bookingSuccessfulV2", callback: booked });
      window.Cal("inline", { elementOrSelector: target, calLink: `${calUsername}/${calEventSlugs[serviceId]}`, config: { theme: "light", layout: "month_view" } });
    }).catch(failed);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      for (const [action, callback] of [["bookerReady", ready], ["linkFailed", failed], ["bookingSuccessfulV2", booked]]) window.Cal?.("off", { action, callback });
      target?.replaceChildren();
    };
  }, [serviceId]);
  const url = getCalUrl(serviceId);
  return <div>
    <div ref={container} className="min-h-[680px] w-full overflow-auto rounded-xl border border-sage/20 bg-white" aria-label={`${intakeServices[serviceId].label} booking calendar`} />
    {fallback ? <p role="status" className="mt-3 text-text-secondary">The calendar is taking longer to load. Use the direct booking link below or contact Rachel.</p> : null}
    <p className="mt-3 text-sm text-text-secondary">
      {url ? <a className="font-semibold text-forest underline" href={url.split("?")[0]} target="_blank" rel="noopener noreferrer">Open calendar in a new tab</a> : null}
      {" · "}<a className="underline" href="mailto:rachel@rewirehypnosis.ca">Contact Rachel</a>
    </p>
  </div>;
}

export default function FreeScreeningBooking() {
  const [serviceId, setServiceId] = useState<IntakeServiceId | null>(null);
  const [booking, setBooking] = useState<"confirmed" | "received" | null>(null);
  const [questions, setQuestions] = useState(false);
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    try { window.localStorage.removeItem("rewire-intake-progress-v1"); } catch { /* Storage may be unavailable. */ }
  }, []);
  return <div className="rounded-2xl border border-sage/20 bg-white/80 p-5 shadow-sm md:p-8">
    <h3 className="font-heading text-3xl font-bold text-forest md:text-4xl">Book a Free Screening</h3>
    <p className="mt-3 text-text-secondary">Choose your focus, then book a 60-minute screening. Screening questions come afterward and are optional, but highly recommended.</p>
    <fieldset className="my-6" disabled={booking !== null}>
      <legend className="mb-3 font-semibold text-forest">Choose your focus</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {intakeServiceIds.map((id) => <label key={id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-sage/30 bg-white p-4 text-forest has-checked:border-sage-dark has-checked:bg-sage/10">
          <input type="radio" name="screening-focus" checked={serviceId === id} onChange={() => setServiceId(id)} className="h-4 w-4 accent-forest" />
          {intakeServices[id].label}
        </label>)}
      </div>
    </fieldset>
    {serviceId ? <div className="space-y-6">
      <h4 className="text-xl font-semibold text-forest">1. Choose a time and complete your booking</h4>
      <p className="text-text-secondary">Name, email, phone number, screening location, and acceptance of the guarantee and waiver are required to book. Choose in person at 257 Division Street, Cobourg, unit 104, or virtual over Zoom.</p>
      <BookingCalendar key={serviceId} serviceId={serviceId} onBooked={(status) => setBooking((current) => current || (status?.toLowerCase() === "accepted" ? "confirmed" : "received"))} />
      {booking ? <section className="space-y-4 rounded-xl border border-sage/30 bg-cream p-5" aria-labelledby="optional-screening-heading">
        <p role="status" className="font-semibold text-forest">{booking === "confirmed" ? "Your booking is complete." : "Your booking request was received. Please check Cal.com for confirmation."}</p>
        <h4 id="optional-screening-heading" className="text-xl font-semibold text-forest">2. Optional screening questions</h4>
        <p className="text-text-secondary">Please complete this short screening so we can better serve you. You can skip it without affecting your booking.</p>
        {!questions && !skipped ? <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded-lg bg-forest px-5 py-3 font-semibold text-white focus-visible:ring-2 focus-visible:ring-sage" onClick={() => setQuestions(true)}>Complete screening questions</button>
          <button type="button" className="rounded-lg border border-forest px-5 py-3 font-semibold text-forest focus-visible:ring-2 focus-visible:ring-sage" onClick={() => setSkipped(true)}>Skip for now</button>
        </div> : null}
        {questions ? <><ScreeningQuestions serviceId={serviceId} /><button type="button" className="font-semibold text-forest underline" onClick={() => { setQuestions(false); setSkipped(true); }}>Skip for now</button></> : null}
        {skipped ? <p role="status" className="text-text-secondary">You skipped the optional questions. Your booking is unaffected.</p> : null}
      </section> : null}
      <p className="text-sm text-text-secondary">Please complete this short screening so we can better serve you. <a className="font-semibold text-forest underline" href={`/screening?serviceId=${serviceId}`}>Screening link</a></p>
    </div> : null}
  </div>;
}
