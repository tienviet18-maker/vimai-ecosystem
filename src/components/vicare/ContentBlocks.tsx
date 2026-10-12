import { Info } from "lucide-react";
import type { ContentSection } from "@/lib/vicare/types";

/** Renders one guide or policy section: paragraphs, bullets, steps, table, note. */
export function ContentBlock({ section, level = 2 }: { section: ContentSection; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`} className="mt-12 scroll-mt-24">
      <Heading
        id={`${section.id}-heading`}
        className={level === 2 ? "text-xl font-semibold tracking-tight sm:text-2xl" : "text-lg font-semibold tracking-tight"}
      >
        {section.heading}
      </Heading>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-8 text-slate-600">
          {paragraph}
        </p>
      ))}

      {section.table ? (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
          <table className="w-full min-w-[32rem] text-left text-sm leading-6">
            <thead className="border-b border-slate-200/80 bg-navy-50/80 text-slate-600">
              <tr>
                {section.table.head.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-slate-100 last:border-0 align-top">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row" className="px-4 py-3 font-medium text-slate-900">
                        {cell}
                      </th>
                    ) : (
                      <td key={index} className="px-4 py-3 text-slate-600">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.bullets ? (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-3 leading-7 text-slate-600">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.steps ? (
        <ol className="mt-6 space-y-4">
          {section.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100 text-sm font-semibold text-primary"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold text-slate-900">{step.title}</span>
                <span className="mt-1.5 block leading-7 text-slate-600">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      {section.note ? (
        <p className="mt-5 flex gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-5 py-4 text-sm leading-7 text-amber-900">
          <Info className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{section.note}</span>
        </p>
      ) : null}
    </section>
  );
}
