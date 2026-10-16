import type { Metadata } from "next";
import Link from "next/link";
import ScreeningQuestions from "@/components/ScreeningQuestions";
import { isIntakeServiceId } from "@/lib/intake";

export const metadata: Metadata = {
  title: "Screening Questions",
  robots: { index: false, follow: false },
  alternates: { canonical: "/screening" },
};

export default async function ScreeningPage({ searchParams }: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;
  return <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
    <h1 className="mb-4 font-heading text-4xl font-bold text-forest">Screening questions</h1>
    {isIntakeServiceId(serviceId) ? <>
      <p className="mb-8 text-text-secondary">Please complete your screening questions before your appointment so Rachel can better understand your goals.</p>
      <ScreeningQuestions key={serviceId} serviceId={serviceId} />
    </> : <div className="space-y-4 text-text-secondary">
      <p>Please complete your booking through the website calendar to open the screening questions for your appointment.</p>
      <p>If you have not booked yet, <Link className="font-semibold text-forest underline" href="/#contact-form">book your free screening</Link>.</p>
      <p>For help finding your questions, <a className="font-semibold text-forest underline" href="mailto:rachel@rewirehypnosis.ca">contact Rachel</a>.</p>
    </div>}
    <Link className="mt-8 inline-block font-semibold text-forest underline" href="/">Return to the website</Link>
  </section>;
}
