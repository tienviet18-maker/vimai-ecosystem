import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 no-underline transition-opacity duration-300 hover:opacity-80",
        className,
      )}
      aria-label="ViMai home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-white shadow-sm">
        V
      </span>
      <span className="leading-none">
        <span className="block text-[1.2rem] font-semibold tracking-tight">
          <span className="text-[#1D4ED8]">Vi</span>
          <span className="text-[#15803D]">Mai</span>
        </span>
        {!compact ? (
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:block">
            Ecosystem
          </span>
        ) : null}
      </span>
    </Link>
  );
}
