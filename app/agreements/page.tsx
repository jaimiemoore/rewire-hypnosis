import type { Metadata } from "next";
import { intakeServices, isIntakeServiceId } from "@/lib/intake";

export const metadata: Metadata = {
  title: "Screening Booking Agreements",
  robots: { index: false, follow: false },
  alternates: { canonical: "/agreements" },
};

export default async function AgreementsPage({ searchParams }: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;
  const id = isIntakeServiceId(serviceId) ? serviceId : "other";
  return <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
    <h1 className="mb-4 font-heading text-4xl font-bold text-forest">Booking agreements</h1>
    <p className="mb-8 text-text-secondary">{intakeServices[id].label}: please read both agreements before accepting them in the booking calendar. Reading this page does not record acceptance.</p>
    {intakeServices[id].fields.filter((field) => field.type === "consent").map((field) => (
      <article id={field.id} key={field.id} className="mb-8 rounded-xl border border-sage/30 bg-white p-6">
        <h2 className="mb-4 font-heading text-2xl font-bold text-forest">{field.title}</h2>
        <p className="whitespace-pre-line leading-relaxed text-text-secondary">{field.body}</p>
      </article>
    ))}
  </section>;
}
