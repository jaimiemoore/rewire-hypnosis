"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { calUsername, calEventSlugs, intakeServices, intakeServiceIds, type IntakeServiceId } from "@/lib/intake";

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
  const [retry, setRetry] = useState(0);
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
  }, [serviceId, retry]);
  return <div>
    <div ref={container} className="min-h-[680px] w-full overflow-auto rounded-xl border border-sage/20 bg-white" aria-label={`${intakeServices[serviceId].label} booking calendar`} />
    {fallback ? <div className="mt-3 space-y-3">
      <p role="status" className="text-text-secondary">The calendar could not load. Please try again or contact Rachel for help booking.</p>
      <button type="button" className="rounded-lg border border-forest px-5 py-3 font-semibold text-forest focus-visible:ring-2 focus-visible:ring-sage" onClick={() => { setFallback(false); setRetry((current) => current + 1); }}>Retry calendar</button>
    </div> : null}
    <p className="mt-3 text-sm text-text-secondary"><a className="underline" href="mailto:rachel@rewirehypnosis.ca">Contact Rachel</a></p>
  </div>;
}

export default function FreeScreeningBooking() {
  const router = useRouter();
  const [serviceId, setServiceId] = useState<IntakeServiceId | null>(null);
  const [booking, setBooking] = useState<"confirmed" | "received" | null>(null);
  useEffect(() => {
    try { window.localStorage.removeItem("rewire-intake-progress-v1"); } catch { /* Storage may be unavailable. */ }
  }, []);
  return <div className="rounded-2xl border border-sage/20 bg-white/80 p-5 shadow-sm md:p-8">
    <h3 className="font-heading text-3xl font-bold text-forest md:text-4xl">Book a Free Screening</h3>
    <p className="mt-3 text-text-secondary">Choose your focus, then book a 60-minute screening. After your booking is confirmed, you’ll be taken to your screening questions.</p>
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
      <BookingCalendar key={serviceId} serviceId={serviceId} onBooked={(status) => {
        if (status?.toLowerCase() === "accepted") {
          setBooking("confirmed");
          router.push(`/screening?serviceId=${serviceId}`);
        } else {
          setBooking((current) => current || "received");
        }
      }} />
      {booking ? <section className="space-y-4 rounded-xl border border-sage/30 bg-cream p-5" aria-labelledby="screening-follow-up-heading">
        <p role="status" className="font-semibold text-forest">{booking === "confirmed" ? "Your booking is complete." : "Your booking request was received. Please check Cal.com for confirmation."}</p>
        <h4 id="screening-follow-up-heading" className="text-xl font-semibold text-forest">Your screening questions</h4>
        <p className="text-text-secondary">{booking === "confirmed"
          ? "Opening your screening questions…"
          : "Your appointment is not yet confirmed. Please check your booking confirmation or contact Rachel for your next steps."}</p>
        <p className="text-sm text-text-secondary">For help, <a className="font-semibold text-forest underline" href="mailto:rachel@rewirehypnosis.ca">contact Rachel</a>.</p>
      </section> : null}
    </div> : null}
  </div>;
}
