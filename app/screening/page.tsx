import type { Metadata } from "next";
import Link from "next/link";
import ScreeningQuestions from "@/components/ScreeningQuestions";
import { intakeServices, intakeServiceIds, isIntakeServiceId } from "@/lib/intake";

export const metadata: Metadata = {
  title: "Optional Screening Questions",
  robots: { index: false, follow: false },
  alternates: { canonical: "/screening" },
};

export default async function ScreeningPage({ searchParams }: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;
  return <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
    <h1 className="mb-4 font-heading text-4xl font-bold text-forest">Optional screening questions</h1>
    <p className="mb-8 text-text-secondary">Highly recommended after booking your 60-minute screening. You may skip these questions without affecting your appointment.</p>
    {isIntakeServiceId(serviceId) ? <ScreeningQuestions key={serviceId} serviceId={serviceId} /> : <div className="grid gap-3 sm:grid-cols-2">
      {intakeServiceIds.map((id) => <Link className="rounded-xl border border-sage/30 p-4 font-semibold text-forest hover:bg-sage/10" key={id} href={`/screening?serviceId=${id}`}>{intakeServices[id].label}</Link>)}
    </div>}
    <Link className="mt-8 inline-block font-semibold text-forest underline" href="/">Skip for now and return to the website</Link>
  </section>;
}
