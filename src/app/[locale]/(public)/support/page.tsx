import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { getSupportFaqs } from "@/lib/faqs";
import type { Locale } from "@/types";

export const runtime = "edge";

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("support");
  const faqs = await getSupportFaqs(locale as Locale);

  return (
    <section className="container max-w-3xl py-16 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-500">{t("lead")}</p>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">{t("faqTitle")}</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="mt-12 text-sm leading-7 text-slate-500">{t("contactCta")}</p>
      <Button asChild className="mt-5">
        <Link href="/contact">{t("contactButton")}</Link>
      </Button>
    </section>
  );
}
