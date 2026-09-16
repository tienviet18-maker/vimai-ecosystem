import { Check } from "lucide-react";

export function FeatureList({ features }: { features: string[] }) {
  if (!features.length) return null;

  return (
    <ul className="space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3.5 text-sm leading-7 sm:text-[0.95rem]">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-100 text-primary">
            <Check className="h-3.5 w-3.5" />
          </span>
          <span className="text-slate-600">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
