import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
  tagline,
}: {
  className?: string;
  compact?: boolean;
  tagline?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex min-h-11 shrink-0 items-center gap-3 no-underline",
        className,
      )}
      aria-label={tagline ? `ViMai — ${tagline}` : "ViMai home"}
    >
      <Image
        src="/brand/vimai-logo-trim.png"
        alt="ViMai"
        width={compact ? 120 : 148}
        height={compact ? 120 : 148}
        className={cn(
          "w-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-80",
          compact ? "h-9" : "h-11 sm:h-12",
        )}
        priority
      />
      {tagline ? (
        <span
          className={cn(
            "max-w-[9.5rem] text-[11px] font-medium leading-snug tracking-wide text-slate-500 sm:max-w-[12.5rem] sm:text-xs",
            compact && "hidden",
          )}
        >
          {tagline}
        </span>
      ) : null}
    </Link>
  );
}
